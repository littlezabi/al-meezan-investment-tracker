import { useState } from 'react';
import { Settings, Save, HelpCircle } from 'lucide-react';

export function Configuration() {
  const [defaultTaxFiler, setDefaultTaxFiler] = useState(true);
  const [calculationType, setCalculationType] = useState('fixed-savings');
  const [savedMessage, setSavedMessage] = useState('');

  const handleSave = () => {
    // In a real app, this would save to localStorage or backend
    setSavedMessage('Configuration saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#6e054e] rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Configuration</h2>
            <p className="text-gray-600 mt-1">Set default preferences for all calculators</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Default Tax Filer Status */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Default Tax Filer Status</h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={defaultTaxFiler}
                onChange={(e) => setDefaultTaxFiler(e.target.checked)}
                className="w-5 h-5 text-[#6e054e] border-gray-300 rounded focus:ring-[#6e054e]"
              />
              <span className="text-sm font-medium text-gray-700">
                Set as Tax Filer by default
              </span>
            </label>
            <div className="flex items-start gap-2 mt-3 ml-8">
              <HelpCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-500">
                When enabled, all calculators will start with "Tax Filer" status checked. Tax filers benefit from lower tax rates on investment returns.
              </p>
            </div>
          </div>

          {/* Calculation Type */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Calculation Type</h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="calculation-type"
                  value="fixed-savings"
                  checked={calculationType === 'fixed-savings'}
                  onChange={(e) => setCalculationType(e.target.value)}
                  className="w-5 h-5 text-[#6e054e] border-gray-300 mt-0.5 focus:ring-[#6e054e]"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-700 block">Fixed Savings</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Calculate returns based on fixed monthly contributions over time
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="calculation-type"
                  value="goal-finder"
                  checked={calculationType === 'goal-finder'}
                  onChange={(e) => setCalculationType(e.target.value)}
                  className="w-5 h-5 text-[#6e054e] border-gray-300 mt-0.5 focus:ring-[#6e054e]"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-700 block">Goal Finder</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Determine monthly investment needed to reach a specific financial goal
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="calculation-type"
                  value="step-up-journey"
                  checked={calculationType === 'step-up-journey'}
                  onChange={(e) => setCalculationType(e.target.value)}
                  className="w-5 h-5 text-[#6e054e] border-gray-300 mt-0.5 focus:ring-[#6e054e]"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-700 block">Step-Up Journey</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Gradually increase investment amounts over time for enhanced growth
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="calculation-type"
                  value="lump-sum"
                  checked={calculationType === 'lump-sum'}
                  onChange={(e) => setCalculationType(e.target.value)}
                  className="w-5 h-5 text-[#6e054e] border-gray-300 mt-0.5 focus:ring-[#6e054e]"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-700 block">Lump Sum Investment</span>
                  <p className="text-sm text-gray-500 mt-1">
                    One-time investment without regular monthly contributions
                  </p>
                </div>
              </label>
            </div>
            <div className="flex items-start gap-2 mt-4">
              <HelpCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-500">
                Select the default calculation method that best suits your investment strategy. This can be changed for individual calculations.
              </p>
            </div>
          </div>

          {/* Display Preferences */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Display Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={true}
                  className="w-5 h-5 text-[#6e054e] border-gray-300 rounded focus:ring-[#6e054e]"
                />
                <span className="text-sm font-medium text-gray-700">
                  Show detailed breakdown in results
                </span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={true}
                  className="w-5 h-5 text-[#6e054e] border-gray-300 rounded focus:ring-[#6e054e]"
                />
                <span className="text-sm font-medium text-gray-700">
                  Display investment summary
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  className="w-5 h-5 text-[#6e054e] border-gray-300 rounded focus:ring-[#6e054e]"
                />
                <span className="text-sm font-medium text-gray-700">
                  Show graphical representation of growth
                </span>
              </label>
            </div>
            <div className="flex items-start gap-2 mt-3">
              <HelpCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-500">
                Customize how calculation results are displayed to you
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full bg-[#6e054e] hover:bg-[#5a0440] text-white py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              Save Configuration
            </button>

            {savedMessage && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center">
                {savedMessage}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">About Configuration</h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  These settings will be applied as defaults across all investment calculators. 
                  You can still override these settings on individual calculator pages. 
                  Your preferences are saved locally in your browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}