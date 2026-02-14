import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Chrome, Linkedin, ArrowLeft } from 'lucide-react';
import {Link} from 'react-router-dom';

const Register = ({ onBackToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    // Handle registration logic here
    console.log('Registration attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob-delay"></div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20">
        {/* Back Button */}
        <button
          onClick={onBackToLogin}
          className="flex items-center text-white/80 hover:text-white transition-colors mb-4 font-plus-jakarta"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Login
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-plus-jakarta">
            Create Account
          </h1>
          <p className="text-white/80 font-plus-jakarta">
            Join Talent Pulse and start your career journey
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2 font-plus-jakarta">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 
                            backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent
                            transition-all duration-200 font-plus-jakarta"
                  placeholder="First name"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2 font-plus-jakarta">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 
                            backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent
                            transition-all duration-200 font-plus-jakarta"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2 font-plus-jakarta">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 
                          backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent
                          transition-all duration-200 font-plus-jakarta"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2 font-plus-jakarta">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 
                          backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent
                          transition-all duration-200 font-plus-jakarta"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white 
                          transition-colors duration-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2 font-plus-jakarta">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 
                          backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent
                          transition-all duration-200 font-plus-jakarta"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white 
                          transition-colors duration-200"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 mt-1 text-indigo-600 bg-white/10 border-white/20 rounded 
                        focus:ring-indigo-500 focus:ring-2"
              required
            />
            <label htmlFor="agreeToTerms" className="ml-3 text-sm text-white/80 font-plus-jakarta">
              I agree to the{' '}
              <a href="#" className="text-white hover:text-white/80 transition-colors underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-white hover:text-white/80 transition-colors underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg
                      font-medium hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 font-plus-jakarta
                      transform hover:scale-105"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 flex items-center">
          <div className="flex-1 border-t border-white/20"></div>
          <div className="px-4 text-white/60 text-sm font-plus-jakarta">Or sign up with</div>
          <div className="flex-1 border-t border-white/20"></div>
        </div>

        {/* Social Registration Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-lg
                      bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 
                      transition-all duration-200 font-plus-jakarta group"
          >
            <Chrome className="w-5 h-5 text-white/70 group-hover:text-white mr-2" />
            <span className="text-white/70 group-hover:text-white">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-lg
                      bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 
                      transition-all duration-200 font-plus-jakarta group"
          >
            <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white mr-2" />
            <span className="text-white/70 group-hover:text-white">LinkedIn</span>
          </button>
        </div>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-white/60 font-plus-jakarta">
            Already have an account?{' '}
            <button 
              onClick={onBackToLogin}
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;