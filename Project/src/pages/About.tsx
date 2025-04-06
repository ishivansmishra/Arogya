import React from 'react';
import { Users, Award, Clock, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Patient-Centric Care',
      description: 'We put our patients first, ensuring personalized care and attention to every individual.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in healthcare delivery and patient satisfaction.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock healthcare support and assistance when you need it most.'
    },
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We treat every patient with empathy, understanding, and genuine care.'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About ArogyaMitr
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your trusted healthcare partner, committed to providing comprehensive medical services
            and promoting wellness across India.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
            >
              <value.icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-indigo-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              To make quality healthcare accessible to all through innovative technology
              and compassionate care. We envision a healthier future where everyone has
              access to the best medical resources and support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;