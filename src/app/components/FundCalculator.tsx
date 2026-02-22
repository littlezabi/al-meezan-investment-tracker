import { useState } from 'react';
import { HelpCircle, Calculator, Info, Target, TrendingUp } from 'lucide-react';
import { CalculatorResults } from './CalculatorResults';
import { NumberInput } from './NumberInput';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';

interface FundCalculatorProps {
  fundName: string;
  baseReturnRate: number;
  fundDescription: string;
}

type CalculationType = 'Fixed Savings' | 'Goal Finder' | 'Step-Up Journey';

export function FundCalculator({ fundName, baseReturnRate, fundDescription }: FundCalculatorProps) {
  const [initialBalance, setInitialBalance] = useState<string>('0');
  const [isTaxFiler, setIsTaxFiler] = useState(true);
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('10000');
  const [years, setYears] = useState<string>('5');
  const [targetMonthlyProfit, setTargetMonthlyProfit] = useState<string>('50000');
  const [calculationType, setCalculationType] = useState<CalculationType>('Fixed Savings');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Step-Up Modal State
  const [isStepUpModalOpen, setIsStepUpModalOpen] = useState(false);
  const [stepUpAmounts, setStepUpAmounts] = useState<string[]>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateInvestment = () => {
    const initial = parseFloat(initialBalance) || 0;
    const monthly = parseFloat(monthlyInvestment) || 0;
    const yearCount = parseInt(years) || 0;

    // Tax rates matching Python script: 15% for filers, 30% for non-filers
    const taxRate = isTaxFiler ? 0.15 : 0.30;
    const netReturnRate = baseReturnRate * (1 - taxRate);
    const monthlyRate = (netReturnRate / 100) / 12;

    if (calculationType === 'Fixed Savings') {
      const n = yearCount * 12;
      const fv = initial * Math.pow(1 + monthlyRate, n) +
        monthly * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
      const totalInvested = initial + (monthly * n);

      setResults({
        type: 'standard',
        duration: `${yearCount} Years`,
        netReturnsRate: netReturnRate,
        totalInvested,
        totalProfit: fv - totalInvested,
        finalValue: fv,
        monthlyNetProfit: fv * monthlyRate,
      });
      setShowResults(true);
    } else if (calculationType === 'Goal Finder') {
      const targetProfit = parseFloat(targetMonthlyProfit) || 0;
      if (monthlyRate === 0) return;

      const targetFv = targetProfit / monthlyRate;
      let curr = initial;
      let m = 0;

      while (curr < targetFv && m < 600) { // 50 year cap
        curr = (curr + monthly) * (1 + monthlyRate);
        m++;
      }

      setResults({
        type: 'goal',
        targetMonthlyProfit: targetProfit,
        requiredBalance: targetFv,
        duration: `${(m / 12).toFixed(1)} Years (${m} months)`,
        monthlyInvestment: monthly,
        totalInvested: initial + (monthly * m),
        netReturnsRate: netReturnRate,
        finalValue: curr,
      });
      setShowResults(true);
    } else if (calculationType === 'Step-Up Journey') {
      const numYears = parseInt(years) || 0;
      if (numYears <= 0) return;

      const defaultAmounts = Array.from({ length: numYears }, (_, i) => (monthly * (i + 1)).toString());
      setStepUpAmounts(defaultAmounts);
      setIsStepUpModalOpen(true);
    }
  };

  const processStepUp = () => {
    const initial = parseFloat(initialBalance) || 0;
    const taxRate = isTaxFiler ? 0.15 : 0.30;
    const netReturnRate = baseReturnRate * (1 - taxRate);
    const monthlyRate = (netReturnRate / 100) / 12;

    let curr = initial;
    let totalInvested = initial;

    stepUpAmounts.forEach((amtStr) => {
      const amt = parseFloat(amtStr) || 0;
      for (let i = 0; i < 12; i++) {
        curr = (curr + amt) * (1 + monthlyRate);
        totalInvested += amt;
      }
    });

    setResults({
      type: 'standard',
      duration: `${stepUpAmounts.length} Years`,
      netReturnsRate: netReturnRate,
      totalInvested,
      totalProfit: curr - totalInvested,
      finalValue: curr,
      monthlyNetProfit: curr * monthlyRate,
    });
    setIsStepUpModalOpen(false);
    setShowResults(true);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#6e054e] rounded-lg flex items-center justify-center flex-shrink-0">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{fundName} Calculator</h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">{fundDescription}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Fund Info Banner */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <p className="text-sm text-blue-700 italic">
              Expected Annual Return: ~{baseReturnRate}% | Safest: Cash Fund | High Growth: Equity Fund
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Initial Balance */}
            <NumberInput
              id="initial-balance"
              label="Current Balance (Rs)"
              value={initialBalance}
              onChange={setInitialBalance}
              placeholder="0"
              min={0}
              step={1000}
            />

            {/* Tax Filer Status */}
            <div className="flex flex-col justify-center">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isTaxFiler}
                  onChange={(e) => setIsTaxFiler(e.target.checked)}
                  className="w-5 h-5 text-[#6e054e] border-gray-300 rounded focus:ring-[#6e054e]"
                />
                <span className="text-sm font-medium text-gray-700">
                  I am a Tax Filer (15% Tax)
                </span>
              </label>
              {!isTaxFiler && (
                <p className="text-xs text-red-500 mt-1">Non-filers are taxed at 30%</p>
              )}
            </div>
          </div>

          {/* Calculation Type Toggle */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Calculation Type</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {(['Fixed Savings', 'Goal Finder', 'Step-Up Journey'] as CalculationType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setCalculationType(type);
                    setShowResults(false);
                  }}
                  className={`py-2 px-4 rounded-md border text-sm font-medium transition-all ${calculationType === type
                    ? 'bg-[#6e054e] text-white border-[#6e054e] shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#6e054e] hover:text-[#6e054e]'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 space-y-6">
            {calculationType === 'Fixed Savings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NumberInput
                  id="monthly-investment"
                  label="Monthly Investment (Rs)"
                  value={monthlyInvestment}
                  onChange={setMonthlyInvestment}
                  min={0}
                  step={500}
                />
                <NumberInput
                  id="years"
                  label="Number of Years"
                  value={years}
                  onChange={setYears}
                  min={1}
                  max={50}
                />
              </div>
            )}

            {calculationType === 'Goal Finder' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NumberInput
                  id="monthly-investment"
                  label="Monthly Investment (Rs)"
                  value={monthlyInvestment}
                  onChange={setMonthlyInvestment}
                  min={1000}
                  step={1000}
                />
                <NumberInput
                  id="target-profit"
                  label="Target Monthly Profit (Rs)"
                  value={targetMonthlyProfit}
                  onChange={setTargetMonthlyProfit}
                  min={1000}
                  step={5000}
                />
              </div>
            )}

            {calculationType === 'Step-Up Journey' && (
              <div className="space-y-4">
                <NumberInput
                  id="years"
                  label="Duration (Years)"
                  value={years}
                  onChange={setYears}
                  min={1}
                  max={20}
                />
                <div className="flex items-start gap-2 text-sm text-gray-500 bg-white p-3 rounded-lg border border-gray-200">
                  <Info className="w-4 h-4 text-[#6e054e] mt-0.5 flex-shrink-0" />
                  <p>You can enter specific monthly amounts for each year in the next step.</p>
                </div>
              </div>
            )}
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateInvestment}
            className="w-full bg-[#6e054e] hover:bg-[#5a0440] text-white py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <Calculator className="w-5 h-5" />
            {calculationType === 'Step-Up Journey' ? 'Setup Plan & Calculate' : 'Calculate Investment Returns'}
          </button>
        </div>
      </div>

      {/* Results */}
      {showResults && results && (
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
          <CalculatorResults results={results} />
        </div>
      )}

      {/* Step-Up Inputs Modal */}
      <Dialog open={isStepUpModalOpen} onOpenChange={setIsStepUpModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#6e054e]" />
              Step-Up Investment Plan
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 py-4">
            <p className="text-sm text-gray-500 mb-2">Enter monthly deposit amount for each year:</p>
            {stepUpAmounts.map((amt, idx) => (
              <NumberInput
                key={idx}
                id={`year-${idx}`}
                label={`Year ${idx + 1} Monthly Deposit`}
                value={amt}
                onChange={(val) => {
                  const newAmts = [...stepUpAmounts];
                  newAmts[idx] = val;
                  setStepUpAmounts(newAmts);
                }}
                min={0}
                step={1000}
              />
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStepUpModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#6e054e] hover:bg-[#5a0440]"
              onClick={processStepUp}
            >
              Calculate Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}