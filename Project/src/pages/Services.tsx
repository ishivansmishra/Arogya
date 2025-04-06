import React from 'react';
import { Wrench } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      icon: <Wrench className="w-8 h-8 text-blue-500" />
    },
    {
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications',
      icon: <Wrench className="w-8 h-8 text-green-500" />
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment',
      icon: <Wrench className="w-8 h-8 text-purple-500" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Our Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
              {service.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;