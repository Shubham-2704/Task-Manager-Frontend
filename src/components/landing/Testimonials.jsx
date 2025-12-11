import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager at TechCorp',
      avatar: 'SJ',
      content: 'Task Manager has completely transformed how our team works. We\'ve seen a 40% increase in productivity and our project delivery times have improved significantly.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CEO at StartupHub',
      avatar: 'MC',
      content: 'The best task management tool we\'ve used. The interface is intuitive, collaboration features are excellent, and the analytics help us make better decisions.',
      rating: 5
    },
    {
      name: 'Emma Williams',
      role: 'Team Lead at DesignStudio',
      avatar: 'EW',
      content: 'I love how easy it is to organize tasks and track progress. The real-time updates keep everyone on the same page, and the mobile app is fantastic!',
      rating: 5
    },
    {
      name: 'David Martinez',
      role: 'Operations Director at GlobalCo',
      avatar: 'DM',
      content: 'Switching to Task Manager was the best decision for our team. The customer support is outstanding, and the features are exactly what we needed.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by <span className="text-blue-600 dark:text-blue-400">Thousands</span> of Teams
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            See what our customers have to say about their experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4 opacity-50" />
                
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <div className="text-2xl font-bold text-gray-400">TechCorp</div>
            <div className="text-2xl font-bold text-gray-400">StartupHub</div>
            <div className="text-2xl font-bold text-gray-400">DesignStudio</div>
            <div className="text-2xl font-bold text-gray-400">GlobalCo</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;