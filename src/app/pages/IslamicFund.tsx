import { FundCalculator } from '../components/FundCalculator';

export function IslamicFund() {
  return (
    <FundCalculator
      fundName="Islamic Fund"
      baseReturnRate={13.5}
      fundDescription="Shariah-compliant investments following Islamic financial principles"
    />
  );
}
