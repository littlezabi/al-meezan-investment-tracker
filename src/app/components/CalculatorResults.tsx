import { TrendingUp, Calendar, DollarSign, PiggyBank, Wallet, CreditCard, Target, Clock } from 'lucide-react';

interface StandardResults {
  type: 'standard';
  duration: string;
  netReturnsRate: number;
  totalInvested: number;
  totalProfit: number;
  finalValue: number;
  monthlyNetProfit: number;
}

interface GoalResults {
  type: 'goal';
  targetMonthlyProfit: number;
  requiredBalance: number;
  duration: string;
  monthlyInvestment: number;
  totalInvested: number;
  netReturnsRate: number;
  finalValue: number;
}

interface CalculatorResultsProps {
  results: StandardResults | GoalResults;
}

export function CalculatorResults({ results }: CalculatorResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const displayItems = results.type === 'standard' ? [
    {
      label: 'Duration',
      value: results.duration,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Net Returns Rate (After Tax)',
      value: `${results.netReturnsRate.toFixed(2)}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Total You Invested',
      value: formatCurrency(results.totalInvested),
      icon: PiggyBank,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Total Profit Earned',
      value: formatCurrency(results.totalProfit),
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Final Account Value',
      value: formatCurrency(results.finalValue),
      icon: Wallet,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Monthly Net Profit',
      value: formatCurrency(results.monthlyNetProfit),
      icon: CreditCard,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
  ] : [
    {
      label: 'Target Monthly Profit',
      value: formatCurrency(results.targetMonthlyProfit),
      icon: Target,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
    {
      label: 'Required Balance',
      value: formatCurrency(results.requiredBalance),
      icon: Wallet,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      label: 'Time Needed',
      value: results.duration,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Monthly Investment',
      value: formatCurrency(results.monthlyInvestment),
      icon: PiggyBank,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      label: 'Total You\'ll Invest',
      value: formatCurrency(results.totalInvested),
      icon: CreditCard,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
    },
    {
      label: 'Net Return Rate (After Tax)',
      value: `${results.netReturnsRate.toFixed(2)}%`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        {results.type === 'goal' ? 'Goal Finder Results' : 'Investment Results'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`${item.bgColor} rounded-xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-4">
                <div className={`${item.color} p-3 rounded-xl bg-white shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1 font-medium">{item.label}</p>
                  <p className="text-xl font-bold text-gray-900 leading-none">{item.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-6 h-6 text-[#6e054e]" />
          <h4 className="text-lg font-semibold text-gray-900">Summary & Projection</h4>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {results.type === 'standard' ? (
            <>
              By investing <span className="font-semibold text-gray-900">{formatCurrency(results.totalInvested)}</span> over{' '}
              <span className="font-semibold text-gray-900">{results.duration}</span>, you will earn a total profit of{' '}
              <span className="font-semibold text-emerald-600">{formatCurrency(results.totalProfit)}</span>, achieving a final balance of{' '}
              <span className="font-semibold text-[#6e054e]">{formatCurrency(results.finalValue)}</span>.
            </>
          ) : (
            <>
              To achieve a monthly profit of <span className="font-semibold text-rose-600">{formatCurrency(results.targetMonthlyProfit)}</span>,
              you need a total balance of <span className="font-semibold text-gray-900">{formatCurrency(results.requiredBalance)}</span>.
              With a monthly investment of <span className="font-semibold text-gray-900">{formatCurrency(results.monthlyInvestment)}</span>,
              this goal will be reached in <span className="font-semibold text-[#6e054e]">{results.duration}</span>.
            </>
          )}
        </p>
      </div>
    </div>
  );
}