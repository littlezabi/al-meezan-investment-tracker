import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { MyPortfolio } from "./pages/MyPortfolio";
import { IncomeFund } from "./pages/IncomeFund";
import { CashFund } from "./pages/CashFund";
import { EquityFund } from "./pages/EquityFund";
import { MoneyMarketFund } from "./pages/MoneyMarketFund";
import { BalancedFund } from "./pages/BalancedFund";
import { IslamicFund } from "./pages/IslamicFund";
import { Configuration } from "./pages/Configuration";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "my-portfolio", Component: MyPortfolio },
      { path: "income-fund", Component: IncomeFund },
      { path: "cash-fund", Component: CashFund },
      { path: "equity-fund", Component: EquityFund },
      { path: "money-market-fund", Component: MoneyMarketFund },
      { path: "balanced-fund", Component: BalancedFund },
      { path: "islamic-fund", Component: IslamicFund },
      { path: "configuration", Component: Configuration },
    ],
  },
]);