import { Card, CardContent } from "../components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import {
  Transaction,
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  formatCurrency,
} from "@/utils/calculations";

interface SummaryCardsProps {
  transactions: Transaction[];
}

export const SummaryCards = ({ transactions }: SummaryCardsProps) => {
  const balance = calculateBalance(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Balance
              </p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  balance >= 0 ? "text-income" : "text-expense"
                }`}
              >
                {formatCurrency(balance)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Income
              </p>
              <p className="text-2xl font-bold mt-1 text-income">
                {formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-income-muted flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-income" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </p>
              <p className="text-2xl font-bold mt-1 text-expense">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-expense-muted flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-expense" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
