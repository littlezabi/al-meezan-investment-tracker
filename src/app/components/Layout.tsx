import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#6e054e] text-white p-3 rounded-lg shadow-lg"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-72 h-full" onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      )}

      <main className="flex-1 w-full lg:w-auto">
        <header className="bg-gradient-to-r from-[#6e054e] to-[#5a0440] text-white py-6 md:py-8 px-4 md:px-12 shadow-lg">
          <h1 className="text-xl md:text-3xl font-bold text-center tracking-wide ml-0 lg:ml-0 md:ml-0">
            AL MEEZAN MULTI-FUND INVESTOR CALCULATOR 2026
          </h1>
        </header>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}