import { FundCalculator } from '../components/FundCalculator';

export function EquityFund() {
  return (
    <FundCalculator
      fundName="Equity Fund"
      baseReturnRate={20.0}
      fundDescription="High-growth potential fund investing in stock markets with higher risk"
    />
  );
}
