import React from "react";
import { ArrowRight, CheckCircle2, Users, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id ="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-10 w-72 h-72 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-6 text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>Trusted by 10,000+ teams worldwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Manage Tasks{" "}
              <span className="text-blue-600 dark:text-blue-400">Smarter</span>,
              Achieve <span className="text-orange-500">More Together</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Streamline your workflow with powerful task management designed
              for teams. Collaborate seamlessly, track progress in real-time,
              and never miss a deadline.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg cursor-pointer font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-2 border-gray-300 cursor-pointer dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 px-8 py-6 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div className="relative">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              {/* Mock Dashboard Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 mb-4 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">Welcome Back!</h3>
                    <p className="text-blue-100">You have 5 tasks due today</p>
                  </div>
                  <Users className="w-12 h-12 opacity-50" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-sm text-blue-100">Active</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold">8</div>
                    <div className="text-sm text-blue-100">Pending</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold">45</div>
                    <div className="text-sm text-blue-100">Done</div>
                  </div>
                </div>
              </div>

              {/* Task Cards */}
              <div className="space-y-3">
                <div className="border-l-4 border-purple-500 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">
                        High Priority
                      </span>
                      <h4 className="font-semibold text-gray-900 dark:text-white mt-2">
                        Social Media Campaign
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Due: Today, 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-l-4 border-cyan-500 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/30 px-2 py-1 rounded">
                        In Progress
                      </span>
                      <h4 className="font-semibold text-gray-900 dark:text-white mt-2">
                        Website Redesign
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Progress: 65%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-orange-500 text-white rounded-full p-4 shadow-xl animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div
              className="absolute -bottom-6 -left-6 bg-green-500 text-white rounded-full p-4 shadow-xl"
              style={{
                animation: "bounce 2s infinite",
                animationDelay: "0.5s",
              }}
            >
              <Users className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
