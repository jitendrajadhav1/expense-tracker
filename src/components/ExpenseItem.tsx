import { Transaction, formatCurrency } from "@/utils/calculations";
import { Button } from "../components/ui/button";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";

interface ExpenseItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export const ExpenseItem = ({ transaction, onDelete }: ExpenseItemProps) => {
  const isIncome = transaction.type === "income";
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/50 hover:border-border">
      <div className="flex items-center gap-4">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center ${
            isIncome ? "bg-income-muted" : "bg-expense-muted"
          }`}
        >
          {isIncome ? (
            <TrendingUp className="h-5 w-5 text-income" />
          ) : (
            <TrendingDown className="h-5 w-5 text-expense" />
          )}
        </div>
        <div>
          <p className="font-medium text-foreground">{transaction.title}</p>
          <p className="text-sm text-muted-foreground">
            {transaction.category} • {formattedDate}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p
          className={`font-semibold ${
            isIncome ? "text-income" : "text-expense"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(transaction.id)}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
