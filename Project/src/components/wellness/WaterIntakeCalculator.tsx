import React, { useState, useEffect } from 'react';
import { Droplets, Activity, Scale } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface WaterIntakeResult {
  dailyIntake: number;
  reminder: boolean;
}

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [result, setResult] = useState<WaterIntakeResult | null>(null);
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  useEffect(() => {
    checkReminderPermission();
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('health_records')
        .select('*')
        .eq('user_id', user.id)
        .eq('record_type', 'water_intake')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (data && data.length > 0) {
        setWeight(data[0].data.weight.toString());
        setActivityLevel(data[0].data.activity_level);
        setRemindersEnabled(data[0].data.reminders_enabled);
      }
    }
  };

  const checkReminderPermission = () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setRemindersEnabled(true);
      }
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setRemindersEnabled(true);
        scheduleReminders();
      }
    }
  };

  const scheduleReminders = () => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    // Schedule reminders every 2 hours between 8 AM and 8 PM
    const now = new Date();
    const startHour = 8;
    const endHour = 20;
    
    for (let hour = startHour; hour <= endHour; hour += 2) {
      const reminderTime = new Date(now);
      reminderTime.setHours(hour, 0, 0, 0);
      
      if (reminderTime > now) {
        const timeout = reminderTime.getTime() - now.getTime();
        setTimeout(() => {
          new Notification('Water Intake Reminder', {
            body: 'Time to drink water! Stay hydrated.',
            icon: '/water-drop.png'
          });
        }, timeout);
      }
    }
  };

  const calculateWaterIntake = async () => {
    const weightNum = parseFloat(weight);
    
    if (weightNum > 0) {
      let baseIntake = weightNum * 0.033; // 33ml per kg of body weight

      // Adjust based on activity level
      switch (activityLevel) {
        case 'sedentary':
          baseIntake *= 1;
          break;
        case 'moderate':
          baseIntake *= 1.2;
          break;
        case 'active':
          baseIntake *= 1.4;
          break;
      }

      const result = {
        dailyIntake: Math.round(baseIntake),
        reminder: remindersEnabled
      };

      setResult(result);

      // Save to database if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('health_records').insert({
          user_id: user.id,
          record_type: 'water_intake',
          record_date: new Date().toISOString().split('T')[0],
          data: {
            weight: weightNum,
            activity_level: activityLevel,
            daily_intake: result.dailyIntake,
            reminders_enabled: remindersEnabled
          }
        });
      }

      if (remindersEnabled) {
        scheduleReminders();
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Droplets className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
        Water Intake Calculator
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter weight in kg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Activity Level
          </label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="sedentary">Sedentary (Little or no exercise)</option>
            <option value="moderate">Moderate (Exercise 3-5 times/week)</option>
            <option value="active">Active (Daily exercise)</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="reminders"
            checked={remindersEnabled}
            onChange={() => {
              if (!remindersEnabled) {
                requestNotificationPermission();
              } else {
                setRemindersEnabled(false);
              }
            }}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="reminders"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            Enable water intake reminders
          </label>
        </div>

        <button
          onClick={calculateWaterIntake}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Calculate Daily Water Intake
        </button>

        {result && (
          <div className="mt-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {result.dailyIntake} L
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Recommended daily water intake
            </div>
            {result.reminder && (
              <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                Reminders set for every 2 hours (8 AM - 8 PM)
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterIntakeCalculator;