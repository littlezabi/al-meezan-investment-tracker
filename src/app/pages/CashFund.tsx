import { FundCalculator } from '../components/FundCalculator';

export function CashFund() {
  return (
    <FundCalculator
      fundName="Cash Fund"
      baseReturnRate={11.5}
      fundDescription="A highly liquid fund for short-term investments with minimal risk"
    />
  );
}
