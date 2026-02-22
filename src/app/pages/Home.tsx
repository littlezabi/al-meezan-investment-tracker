import { TrendingUp, Target, Shield, Award } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-[#6e054e] rounded-full flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to Al Meezan Investment Calculator
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Plan your financial future with our comprehensive investment calculator. 
          Select a fund from the sidebar to begin calculating your potential returns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <div className="w-12 h-12 bg-[#6e054e] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Goal-Based Planning</h3>
            <p className="text-gray-600">
              Calculate returns based on your financial goals and investment capacity
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tax-Optimized</h3>
            <p className="text-gray-600">
              Factor in your tax filer status for accurate return projections
            </p>
          </div>

          <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
            <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Multiple Funds</h3>
            <p className="text-gray-600">
              Choose from various investment funds tailored to your risk profile
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#6e054e] to-[#5a0440] text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-3">Get Started Today</h3>
          <p className="text-purple-100 mb-6">
            Select an investment program from the sidebar to calculate your potential returns
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}