import { FundCalculator } from '../components/FundCalculator';

export function BalancedFund() {
  return (
    <FundCalculator
      fundName="Balanced Fund"
      baseReturnRate={14.2}
      fundDescription="A diversified portfolio balancing equity and fixed-income securities"
    />
  );
}
