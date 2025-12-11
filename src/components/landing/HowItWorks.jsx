import React from 'react';
import { UserPlus, ListTodo, Users, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up Free',
      description: 'Create your account in seconds. No credit card required to get started.',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      stepNumber: '01'
    },
    {
      icon: ListTodo,
      title: 'Create Tasks',
      description: 'Add tasks, set priorities, assign deadlines, and organize your workflow.',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      stepNumber: '02'
    },
    {
      icon: Users,
      title: 'Invite Your Team',
      description: 'Collaborate with team members, assign tasks, and communicate in real-time.',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      stepNumber: '03'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor productivity, analyze performance, and achieve your goals faster.',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      stepNumber: '04'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get Started in <span className="text-blue-600 dark:text-blue-400">4 Simple Steps</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            From signup to success, we make task management effortless
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-orange-200 to-green-200 dark:from-blue-900 dark:via-purple-900 dark:via-orange-900 dark:to-green-900" style={{ top: '80px', width: 'calc(100% - 160px)', left: '80px' }}></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="text-center">
                  {/* Step Number */}
                  <div className="text-6xl font-bold text-gray-200 dark:text-gray-700 mb-4">
                    {step.stepNumber}
                  </div>
                  
                  {/* Icon */}
                  <div className={`${step.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10 bg-white dark:bg-gray-900`}>
                    <Icon className={`w-10 h-10 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;