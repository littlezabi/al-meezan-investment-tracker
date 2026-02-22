import { FundCalculator } from '../components/FundCalculator';

export function MoneyMarketFund() {
  return (
    <FundCalculator
      fundName="Money Market Fund"
      baseReturnRate={9.8}
      fundDescription="Short-term investments in money market instruments with low risk"
    />
  );
}
