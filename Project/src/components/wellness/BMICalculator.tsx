import React, { useState, useEffect } from 'react';
import { Scale, Ruler } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
}

const BMICalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('health_records')
        .select('*')
        .eq('user_id', user.id)
        .eq('record_type', 'bmi')
        .order('record_date', { ascending: false })
        .limit(5);
      
      if (data) setHistory(data);
    }
  };

  const calculateBMI = async () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to meters
    
    if (weightNum > 0 && heightNum > 0) {
      const bmiValue = weightNum / (heightNum * heightNum);
      const result = getBMICategory(bmiValue);
      setResult(result);

      // Save to database if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('health_records').insert({
          user_id: user.id,
          record_type: 'bmi',
          record_date: new Date().toISOString().split('T')[0],
          data: {
            weight: weightNum,
            height: heightNum * 100,
            bmi: bmiValue,
            category: result.category
          }
        });
        fetchHistory();
      }
    }
  };

  const getBMICategory = (bmi: number): BMIResult => {
    if (bmi < 18.5) {
      return { bmi, category: 'Underweight', color: 'text-blue-500' };
    } else if (bmi < 25) {
      return { bmi, category: 'Normal', color: 'text-green-500' };
    } else if (bmi < 30) {
      return { bmi, category: 'Overweight', color: 'text-yellow-500' };
    } else {
      return { bmi, category: 'Obese', color: 'text-red-500' };
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Scale className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
        BMI Calculator
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter weight in kg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter height in cm"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Calculate BMI
        </button>

        {result && (
          <div className="mt-6 text-center">
            <div className="text-3xl font-bold mb-2">
              {result.bmi.toFixed(1)}
            </div>
            <div className={`text-xl font-semibold ${result.color}`}>
              {result.category}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              History
            </h3>
            <div className="space-y-2">
              {history.map((record: any) => (
                <div
                  key={record.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(record.record_date).toLocaleDateString()}
                  </div>
                  <div className="font-medium">
                    BMI: {record.data.bmi.toFixed(1)}
                  </div>
                  <div className={`text-sm ${getBMICategory(record.data.bmi).color}`}>
                    {record.data.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;