import React from "react";
import {
  Clock,
  Shield,
  Sparkles,
  Headphones,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save 10+ Hours Weekly",
      description:
        "Automate repetitive tasks and streamline your workflow to focus on what matters most.",
      stat: "10hrs",
    },
    {
      icon: TrendingUp,
      title: "Boost Productivity by 40%",
      description:
        "Proven methods and tools to help your team accomplish more in less time.",
      stat: "+40%",
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description:
        "Your data is protected with bank-level encryption and regular security audits.",
      stat: "100%",
    },
    {
      icon: Globe,
      title: "Work From Anywhere",
      description:
        "Access your tasks from any device, anywhere in the world with cloud sync.",
      stat: "24/7",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description:
        "Get intelligent suggestions and predictions to optimize your workflow.",
      stat: "AI",
    },
    {
      icon: Headphones,
      title: "World-Class Support",
      description: "Our dedicated team is available 24/7 to help you succeed.",
      stat: "24/7",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Task Manager
              </span>
              ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of successful teams who have transformed their
              productivity and workflow with our platform.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  10K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Active Teams
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  500K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Tasks Completed
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  98%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Satisfaction
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Start Free Trial
                </button>
              </Link>
              <button className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold  cursor-pointer transition-all duration-200">
                Contact Sales
              </button>
            </div>
          </div>

          {/* Right Content - Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {benefit.stat}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
