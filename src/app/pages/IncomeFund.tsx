import { FundCalculator } from '../components/FundCalculator';

export function IncomeFund() {
  return (
    <FundCalculator
      fundName="Income Fund"
      baseReturnRate={12.5}
      fundDescription="A stable income-generating fund focusing on fixed-income securities with moderate risk"
    />
  );
}
