import React from 'react';
import { Link } from 'react-router-dom';

const SupportContact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-white mb-8">Contact</h1>
      
      <div className="space-y-8">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm text-gray-300">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First name"
                className="w-full px-3 py-2 bg-[#0E051B] border border-[#6A11CB] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm text-gray-300">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last name"
                className="w-full px-3 py-2 bg-[#0E051B] border border-[#6A11CB] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm text-gray-300">
                Phone number
              </label>
              <div className="flex">
                <select className="px-3 py-2 bg-[#0E051B] border border-[#6A11CB] rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>US</option>
                </select>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone"
                  className="flex-1 px-3 py-2 border-l-0 bg-[#0E051B] border border-[#6A11CB] rounded-r-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 bg-[#0E051B] border border-[#6A11CB] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-3 py-2 bg-[#0E051B] border border-[#6A11CB] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 w-96 py-2  bg-purple-600 hover:bg-purple-700 mt-5 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Send message
            </button>
          </div>
        </form>

        {/* FAQ Section */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700">
          <h3 className="text-xl text-white">
            For any questions or assistance, please visit our FAQ section
          </h3>
          <Link to='/faq' className="px-4 py-2 border border-[#6A11CB] text-white rounded-md hover:bg-purple-500 hover:text-white transition-colors duration-200">
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupportContact;