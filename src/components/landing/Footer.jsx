import React from 'react';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, Github, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      // { name: 'Pricing', href: '#pricing' },
      { name: 'FAQ', href: '#faq' },
      { name: 'How It Works', href: '#how-it-works' },
      // { name: 'Changelog', href: '#' }
    ],

    resources: [
      { name: 'Why Choose Us', href: '#benefits' },
      { name: 'Watch a Demo', href: '#hero' },
      { name: 'Testimonials', href: '#testimonials' },
      // { name: 'Tutorials', href: '#' },
      // { name: 'API Reference', href: '#' }
    ],
    legal: [
      { name: 'Sign In', href: '/signup' },
      { name: 'Sign Up', href: '/login' },
      { name: 'Forgot Password', href: '/forgot-password' },
      // { name: 'GDPR', href: '#' },
      // { name: 'Security', href: '#' }
    ]
  };



  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 ml-8">
            <div className="flex items-center  space-x-3 mb-6">
              <Link to="/" className="flex items-center gap-2">
            <Zap className="w-7 h-7 text-primary" />
            <span className="text-2xl font-bold">TaskFlow</span>
          </Link>

            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Streamline your workflow with powerful task management designed for modern teams. Achieve more together.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">support@taskflow.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">123 Business Ave, Suite 100<br />San Francisco, CA 94107</span>
              </div>
            </div>

          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          {/* <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Accounts</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Task Flow. All rights reserved.
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;