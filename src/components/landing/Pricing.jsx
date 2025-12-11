import React from 'react';
import { Check, Zap, Building, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: 'Free',
      period: 'Forever',
      description: 'Perfect for individuals and small teams getting started',
      features: [
        'Up to 5 team members',
        '50 tasks per month',
        'Basic task management',
        'Mobile app access',
        'Email support',
        '1GB file storage'
      ],
      cta: 'Get Started',
      popular: false,
      color: 'blue'
    },
    {
      name: 'Professional',
      icon: Building,
      price: '$12',
      period: 'per user/month',
      description: 'Ideal for growing teams and businesses',
      features: [
        'Unlimited team members',
        'Unlimited tasks',
        'Advanced analytics',
        'Priority support',
        'Custom workflows',
        '50GB file storage',
        'Team collaboration tools',
        'API access'
      ],
      cta: 'Start Free Trial',
      popular: true,
      color: 'orange'
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      price: 'Custom',
      period: 'Contact us',
      description: 'For large organizations with specific needs',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security features',
        'SLA guarantee',
        'Unlimited file storage',
        'On-premise deployment option',
        'Training & onboarding'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'purple'
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, <span className="text-blue-600 dark:text-blue-400">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your team. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={index}
                className={`border-2 transition-all duration-300 transform hover:scale-105 ${
                  plan.popular 
                    ? 'border-orange-500 dark:border-orange-400 shadow-2xl' 
                    : 'border-gray-200 dark:border-gray-700 hover:shadow-xl'
                } bg-white dark:bg-gray-800 relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    plan.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    plan.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      plan.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      plan.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                      'text-purple-600 dark:text-purple-400'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{plan.period}</div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <Button 
                    className={`w-full py-6 rounded-lg font-semibold text-lg mb-6 transition-all duration-200 ${
                      plan.popular
                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include SSL encryption, regular backups, and GDPR compliance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;