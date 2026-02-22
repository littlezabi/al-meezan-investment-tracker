import { usePortfolio } from '../context/PortfolioContext';
import { Wallet, TrendingUp, DollarSign, PieChart as PieChartIcon, Calendar, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

export function Dashboard() {
  const { investments } = usePortfolio();

  // Calculate dashboard metrics
  const calculateMetrics = () => {
    let totalInvested = 0;
    let totalCurrentValue = 0;
    let totalMonthlyIncome = 0;

    investments.forEach((inv) => {
      const monthsElapsed = calculateMonthsElapsed(inv.startDate);
      const taxRate = inv.isTaxFiler ? 0.15 : 0.25;
      const netReturnRate = inv.returnRate * (1 - taxRate);
      const monthlyRate = netReturnRate / 100 / 12;

      // Calculate current value
      let currentValue = inv.initialBalance * Math.pow(1 + monthlyRate, monthsElapsed);
      for (let i = 0; i < monthsElapsed; i++) {
        currentValue += inv.monthlyInvestment * Math.pow(1 + monthlyRate, monthsElapsed - i - 1);
      }

      const invested = inv.initialBalance + inv.monthlyInvestment * monthsElapsed;
      const profit = currentValue - invested;
      const monthlyIncome = profit / (monthsElapsed || 1);

      totalInvested += invested;
      totalCurrentValue += currentValue;
      totalMonthlyIncome += monthlyIncome;
    });

    const totalProfit = totalCurrentValue - totalInvested;

    return {
      totalInvested,
      totalCurrentValue,
      totalProfit,
      totalMonthlyIncome,
      activeInvestments: investments.length,
    };
  };

  const calculateMonthsElapsed = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    return Math.max(0, months);
  };

  const metrics = calculateMetrics();

  // Prepare data for charts
  const fundDistribution = investments.reduce((acc: any[], inv) => {
    const existing = acc.find((item) => item.name === inv.fundType);
    const monthsElapsed = calculateMonthsElapsed(inv.startDate);
    const invested = inv.initialBalance + inv.monthlyInvestment * monthsElapsed;
    
    if (existing) {
      existing.value += invested;
    } else {
      acc.push({ name: inv.fundType, value: invested });
    }
    return acc;
  }, []);

  const COLORS = ['#6e054e', '#8b0662', '#a81d7d', '#c53498', '#e24bb3'];

  const monthlyGrowthData = investments.length > 0 ? generateMonthlyGrowthData() : [];

  function generateMonthlyGrowthData() {
    const data = [];
    for (let i = 0; i <= 12; i++) {
      let totalValue = 0;
      investments.forEach((inv) => {
        const taxRate = inv.isTaxFiler ? 0.15 : 0.25;
        const netReturnRate = inv.returnRate * (1 - taxRate);
        const monthlyRate = netReturnRate / 100 / 12;
        
        let value = inv.initialBalance * Math.pow(1 + monthlyRate, i);
        for (let j = 0; j < i; j++) {
          value += inv.monthlyInvestment * Math.pow(1 + monthlyRate, i - j - 1);
        }
        totalValue += value;
      });
      
      data.push({
        month: `Month ${i}`,
        value: Math.round(totalValue),
      });
    }
    return data;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (investments.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-[#6e054e] rounded-full flex items-center justify-center mx-auto mb-6">
            <PieChartIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Investments Yet
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start building your portfolio by adding your first investment in the "My Portfolio" section.
          </p>
          <a
            href="/my-portfolio"
            className="inline-flex items-center gap-2 bg-[#6e054e] hover:bg-[#5a0440] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Target className="w-5 h-5" />
            Add Your First Investment
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Investment Dashboard</h2>
        <p className="text-gray-600">Overview of your investment portfolio</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#6e054e]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Invested</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{formatCurrency(metrics.totalInvested)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-[#6e054e]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Value</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{formatCurrency(metrics.totalCurrentValue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-emerald-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Profit</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-600">{formatCurrency(metrics.totalProfit)}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{formatCurrency(metrics.totalMonthlyIncome)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Investments</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{metrics.activeInvestments}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Return Rate</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">
                {metrics.totalInvested > 0 
                  ? ((metrics.totalProfit / metrics.totalInvested) * 100).toFixed(2) 
                  : 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fund Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Fund Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fundDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {fundDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Growth Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Portfolio Growth (12 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#6e054e" strokeWidth={2} name="Portfolio Value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Investment Breakdown */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={fundDistribution}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: any) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="value" fill="#6e054e" name="Amount Invested" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Active Investments List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Active Investments</h3>
        <div className="space-y-4">
          {investments.map((inv) => {
            const monthsElapsed = calculateMonthsElapsed(inv.startDate);
            const taxRate = inv.isTaxFiler ? 0.15 : 0.25;
            const netReturnRate = inv.returnRate * (1 - taxRate);
            const monthlyRate = netReturnRate / 100 / 12;

            let currentValue = inv.initialBalance * Math.pow(1 + monthlyRate, monthsElapsed);
            for (let i = 0; i < monthsElapsed; i++) {
              currentValue += inv.monthlyInvestment * Math.pow(1 + monthlyRate, monthsElapsed - i - 1);
            }

            const invested = inv.initialBalance + inv.monthlyInvestment * monthsElapsed;
            const profit = currentValue - invested;

            return (
              <div key={inv.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg">{inv.fundName}</h4>
                    <p className="text-sm text-gray-600">{inv.fundType}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Invested</p>
                      <p className="font-semibold text-gray-800">{formatCurrency(invested)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Current Value</p>
                      <p className="font-semibold text-gray-800">{formatCurrency(currentValue)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Profit</p>
                      <p className="font-semibold text-emerald-600">{formatCurrency(profit)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Return Rate</p>
                      <p className="font-semibold text-[#6e054e]">{netReturnRate.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
