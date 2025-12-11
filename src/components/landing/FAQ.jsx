import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'How does the free trial work?',
      answer: 'You can start a 14-day free trial of any paid plan without entering a credit card. During the trial, you\'ll have access to all features of the selected plan. After the trial ends, you can choose to upgrade or continue with the free Starter plan.'
    },
    {
      question: 'Can I change my plan later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. When you upgrade, you\'ll get immediate access to new features. When you downgrade, changes take effect at the end of your current billing cycle, and you won\'t lose any data.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level 256-bit SSL encryption to protect your data. All data is backed up daily, and we\'re fully GDPR compliant. Our servers are hosted in secure facilities with 24/7 monitoring.'
    },
    {
      question: 'How many team members can I add?',
      answer: 'The Starter plan allows up to 5 team members. Professional and Enterprise plans support unlimited team members. You can add or remove team members at any time from your account settings.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise customers. All payments are processed securely through our payment partners.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with Task Manager within the first 30 days, contact our support team for a full refund, no questions asked.'
    },
    {
      question: 'Can I integrate Task Manager with other tools?',
      answer: 'Yes! Professional and Enterprise plans include API access and integrations with popular tools like Slack, Google Calendar, Microsoft Teams, Dropbox, and many more. We\'re constantly adding new integrations.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'Starter plan users get email support with 24-hour response time. Professional plan users get priority email support with 4-hour response time. Enterprise customers get dedicated account managers and 24/7 phone support.'
    }
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="text-blue-600 dark:text-blue-400">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about Task Manager
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white dark:bg-gray-900 border-0 rounded-lg shadow-md overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <span className="text-left font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
            Contact our support team →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;