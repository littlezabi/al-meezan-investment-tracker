import { NavLink } from 'react-router';
import { TrendingUp, Wallet, LineChart, Banknote, Scale, Building2, Settings, LayoutDashboard, BriefcaseBusiness } from 'lucide-react';

const funds = [
  { name: 'Income Fund', path: '/income-fund', icon: TrendingUp },
  { name: 'Cash Fund', path: '/cash-fund', icon: Wallet },
  { name: 'Equity Fund', path: '/equity-fund', icon: LineChart },
  { name: 'Money Market Fund', path: '/money-market-fund', icon: Banknote },
  { name: 'Balanced Fund', path: '/balanced-fund', icon: Scale },
  { name: 'Islamic Fund', path: '/islamic-fund', icon: Building2 },
];

export function Sidebar() {
  return (
    <aside className="w-72 lg:w-72 md:w-64 bg-[#6e054e] text-white min-h-screen p-6 flex flex-col overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Al Meezan Investor</h2>
        <div className="w-12 h-1 bg-pink-300 rounded"></div>
      </div>

      {/* Dashboard Links */}
      <div className="mb-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-2 ${
              isActive
                ? 'bg-[#5a0440] shadow-lg'
                : 'hover:bg-[#5a0440]'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/my-portfolio"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? 'bg-[#5a0440] shadow-lg'
                : 'hover:bg-[#5a0440]'
            }`
          }
        >
          <BriefcaseBusiness className="w-5 h-5" />
          <span>My Portfolio</span>
        </NavLink>
      </div>

      <div className="border-t border-pink-900 pt-6 mb-4">
        <h3 className="text-sm font-semibold mb-3 text-pink-200">Investment Programs</h3>
      </div>
      
      <nav className="flex-1 space-y-2">
        {funds.map((fund) => {
          const Icon = fund.icon;
          return (
            <NavLink
              key={fund.path}
              to={fund.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#5a0440] shadow-lg'
                    : 'hover:bg-[#5a0440]'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{fund.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <NavLink
        to="/configuration"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-6 border-t border-pink-900 pt-6 ${
            isActive
              ? 'bg-[#5a0440] shadow-lg'
              : 'hover:bg-[#5a0440]'
          }`
        }
      >
        <Settings className="w-5 h-5" />
        <span>Configuration</span>
      </NavLink>
    </aside>
  );
}