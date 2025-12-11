import React from 'react';
import { CheckSquare, Users, BarChart3, Bell, Calendar, Folder, Upload, Zap } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const Features = () => {
  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Create, organize, and prioritize tasks with our intuitive interface. Set deadlines and track progress effortlessly.',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates, comments, and task assignments for your entire team.',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Gain insights into your team\'s productivity with comprehensive analytics and visual reports.',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Stay informed with intelligent notifications for deadlines, updates, and team activities.',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    },
    {
      icon: Calendar,
      title: 'Deadline Management',
      description: 'Never miss a deadline with our powerful calendar integration and automated reminders.',
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30'
    },
    {
      icon: Folder,
      title: 'Project Organization',
      description: 'Organize tasks into projects and categories for better workflow management and clarity.',
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30'
    },
    {
      icon: Upload,
      title: 'File Attachments',
      description: 'Attach files, documents, and images directly to tasks for easy access and collaboration.',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Experience lightning-fast synchronization across all devices with instant updates.',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for <span className="text-blue-600 dark:text-blue-400">Modern Teams</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to manage tasks efficiently and boost your team's productivity
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800"
              >
                <CardContent className="p-6">
                  <div className={`${feature.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;