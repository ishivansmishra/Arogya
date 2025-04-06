import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Calendar, 
  Users, 
  Brain,
  Calculator,
  Droplets,
  MessageSquare
} from 'lucide-react';

const Home = () => {
  const stats = [
    { label: 'Active Doctors', value: '500+', icon: Users },
    { label: 'Departments', value: '50+', icon: Activity },
    { label: 'Daily Appointments', value: '1000+', icon: Calendar },
    { label: 'Patient Success', value: '98%', icon: Brain },
  ];

  const features = [
    {
      icon: Calculator,
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and get personalized health insights.',
      link: '/tools#bmi'
    },
    {
      icon: Droplets,
      title: 'Water Intake Tracker',
      description: 'Stay hydrated with personalized water intake recommendations.',
      link: '/tools#water'
    },
    {
      icon: Brain,
      title: 'Mental Health Support',
      description: 'Access resources and support for mental well-being.',
      link: '/services#mental-health'
    },
    {
      icon: MessageSquare,
      title: 'Health Assistant',
      description: 'Get instant answers to your health-related questions.',
      link: '/services#chatbot'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Experience modern healthcare solutions with ArogyaMitr
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/appointment"
                className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition duration-300"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                <feature.icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;