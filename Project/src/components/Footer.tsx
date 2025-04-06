import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
              ArogyaMitr
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your trusted partner in healthcare, providing comprehensive medical services
              and wellness solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Health Tools
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services#consultation" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Doctor Consultation
                </Link>
              </li>
              <li>
                <Link to="/services#mental-health" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Mental Health Support
                </Link>
              </li>
              <li>
                <Link to="/services#yoga" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Yoga & Meditation
                </Link>
              </li>
              <li>
                <Link to="/services#pharmacy" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Online Pharmacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-indigo-600 dark:text-indigo-400 w-5 h-5 mt-1" />
                <span className="text-gray-600 dark:text-gray-300">
                  123 Healthcare Avenue, Medical District, City - 100001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
                <span className="text-gray-600 dark:text-gray-300">
                  +91 123 456 7890
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
                <span className="text-gray-600 dark:text-gray-300">
                  contact@arogyamitr.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} ArogyaMitr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;