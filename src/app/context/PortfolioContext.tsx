import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Investment {
  id: string;
  fundName: string;
  fundType: string;
  initialBalance: number;
  monthlyInvestment: number;
  returnRate: number;
  startDate: string;
  isTaxFiler: boolean;
}

interface PortfolioContextType {
  investments: Investment[];
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  updateInvestment: (id: string, investment: Partial<Investment>) => void;
  deleteInvestment: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [investments, setInvestments] = useState<Investment[]>(() => {
    const stored = localStorage.getItem('meezan-portfolio');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('meezan-portfolio', JSON.stringify(investments));
  }, [investments]);

  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment: Investment = {
      ...investment,
      id: Date.now().toString(),
    };
    setInvestments((prev) => [...prev, newInvestment]);
  };

  const updateInvestment = (id: string, updatedData: Partial<Investment>) => {
    setInvestments((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, ...updatedData } : inv))
    );
  };

  const deleteInvestment = (id: string) => {
    setInvestments((prev) => prev.filter((inv) => inv.id !== id));
  };

  return (
    <PortfolioContext.Provider
      value={{ investments, addInvestment, updateInvestment, deleteInvestment }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
}
