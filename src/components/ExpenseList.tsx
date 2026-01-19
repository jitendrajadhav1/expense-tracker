import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Transaction } from "@/utils/calculations";
import { ExpenseItem } from "./ExpenseItem";
import { Receipt } from "lucide-react";

interface ExpenseListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const ExpenseList = ({ transactions, onDelete }: ExpenseListProps) => {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg font-semibold">
            Recent Transactions
          </CardTitle>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs px-3">
                All
              </TabsTrigger>
              <TabsTrigger value="income" className="text-xs px-3">
                Income
              </TabsTrigger>
              <TabsTrigger value="expense" className="text-xs px-3">
                Expense
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {sortedTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Receipt className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-sm">No transactions yet</p>
            <p className="text-xs mt-1">Add your first transaction above</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {sortedTransactions.map((transaction) => (
                <ExpenseItem
                  key={transaction.id}
                  transaction={transaction}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
