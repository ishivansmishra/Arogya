import React from 'react';
import { Calculator, Droplets } from 'lucide-react';
import BMICalculator from '../components/wellness/BMICalculator';
import WaterIntakeCalculator from '../components/wellness/WaterIntakeCalculator';

const Tools = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Wellness Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Calculate and track your health metrics with our wellness tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BMICalculator />
          <WaterIntakeCalculator />
        </div>
      </div>
    </div>
  );
};

export default Tools;