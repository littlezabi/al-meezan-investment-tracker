import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { NumberInput } from '../components/NumberInput';

const fundOptions = [
  { name: 'Income Fund', type: 'Income Fund', rate: 12.5 },
  { name: 'Cash Fund', type: 'Cash Fund', rate: 8.5 },
  { name: 'Equity Fund', type: 'Equity Fund', rate: 18.5 },
  { name: 'Money Market Fund', type: 'Money Market Fund', rate: 9.8 },
  { name: 'Balanced Fund', type: 'Balanced Fund', rate: 14.2 },
  { name: 'Islamic Fund', type: 'Islamic Fund', rate: 13.5 },
];

export function MyPortfolio() {
  const { investments, addInvestment, updateInvestment, deleteInvestment } = usePortfolio();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fundName: '',
    fundType: '',
    initialBalance: '',
    monthlyInvestment: '',
    returnRate: '',
    startDate: new Date().toISOString().split('T')[0],
    isTaxFiler: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateInvestment(editingId, {
        ...formData,
        initialBalance: parseFloat(formData.initialBalance),
        monthlyInvestment: parseFloat(formData.monthlyInvestment),
        returnRate: parseFloat(formData.returnRate),
      });
      setEditingId(null);
    } else {
      addInvestment({
        ...formData,
        initialBalance: parseFloat(formData.initialBalance),
        monthlyInvestment: parseFloat(formData.monthlyInvestment),
        returnRate: parseFloat(formData.returnRate),
      });
    }

    resetForm();
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      fundName: '',
      fundType: '',
      initialBalance: '',
      monthlyInvestment: '',
      returnRate: '',
      startDate: new Date().toISOString().split('T')[0],
      isTaxFiler: true,
    });
  };

  const handleEdit = (investment: any) => {
    setFormData({
      fundName: investment.fundName,
      fundType: investment.fundType,
      initialBalance: investment.initialBalance.toString(),
      monthlyInvestment: investment.monthlyInvestment.toString(),
      returnRate: investment.returnRate.toString(),
      startDate: investment.startDate,
      isTaxFiler: investment.isTaxFiler,
    });
    setEditingId(investment.id);
    setShowAddForm(true);
  };

  const handleFundSelect = (fundName: string) => {
    const selected = fundOptions.find((f) => f.name === fundName);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        fundName: selected.name,
        fundType: selected.type,
        returnRate: selected.rate.toString(),
      }));
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">My Portfolio</h2>
          <p className="text-gray-600">Manage your investment portfolio</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingId(null);
            resetForm();
          }}
          className="bg-[#6e054e] hover:bg-[#5a0440] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
        >
          {showAddForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showAddForm ? 'Cancel' : 'Add Investment'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {editingId ? 'Edit Investment' : 'Add New Investment'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Fund
                </label>
                <select
                  value={formData.fundName}
                  onChange={(e) => handleFundSelect(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6e054e] focus:border-transparent"
                >
                  <option value="">Choose a fund...</option>
                  {fundOptions.map((fund) => (
                    <option key={fund.name} value={fund.name}>
                      {fund.name} ({fund.rate}% base return)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6e054e] focus:border-transparent"
                />
              </div>
            </div>

            <NumberInput
              id="portfolio-initial-balance"
              label="Initial Balance"
              value={formData.initialBalance}
              onChange={(value) => setFormData({ ...formData, initialBalance: value })}
              placeholder="Enter initial amount"
              helpText="Starting investment amount in PKR"
              min={0}
              step={1000}
            />

            <NumberInput
              id="portfolio-monthly-investment"
              label="Monthly Investment"
              value={formData.monthlyInvestment}
              onChange={(value) => setFormData({ ...formData, monthlyInvestment: value })}
              placeholder="Enter monthly amount"
              helpText="Monthly contribution in PKR"
              min={0}
              step={500}
            />

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTaxFiler}
                  onChange={(e) => setFormData({ ...formData, isTaxFiler: e.target.checked })}
                  className="w-5 h-5 text-[#6e054e] border-gray-300 rounded focus:ring-[#6e054e]"
                />
                <span className="text-sm font-medium text-gray-700">I am a Tax Filer</span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-[#6e054e] hover:bg-[#5a0440] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Update Investment' : 'Add Investment'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Investments List */}
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Investments</h3>
        {investments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No investments added yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="text-[#6e054e] hover:text-[#5a0440] font-semibold"
            >
              Add your first investment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {investments.map((investment) => (
              <div
                key={investment.id}
                className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      {investment.fundName}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Started on {new Date(investment.startDate).toLocaleDateString()}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Initial Balance</p>
                        <p className="font-semibold text-gray-800">
                          {formatCurrency(investment.initialBalance)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Monthly Investment</p>
                        <p className="font-semibold text-gray-800">
                          {formatCurrency(investment.monthlyInvestment)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Return Rate</p>
                        <p className="font-semibold text-[#6e054e]">{investment.returnRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tax Status</p>
                        <p className="font-semibold text-gray-800">
                          {investment.isTaxFiler ? 'Filer' : 'Non-Filer'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(investment)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this investment?')) {
                          deleteInvestment(investment.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
