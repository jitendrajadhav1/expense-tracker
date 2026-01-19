import { useExpenses } from "../hooks/useExpenses";
import { SummaryCards } from "@/components/SummaryCards";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { Charts } from "@/components/Charts";
import { Wallet } from "lucide-react";

const Dashboard = () => {
  const { transactions, addTransaction, deleteTransaction, isLoaded } =
    useExpenses();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Expense Tracker
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your finances with ease
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <SummaryCards transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ExpenseForm onAdd={addTransaction} />
          </div>
          <div className="lg:col-span-2">
            <ExpenseList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          </div>
        </div>

        <Charts transactions={transactions} />
      </main>
    </div>
  );
};

export default Dashboard;
