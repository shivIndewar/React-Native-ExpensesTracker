import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinus } from "../util/date";

function RecentExpenses(){

    const expensesCntx = useContext(ExpensesContext);

    const recentExpenses = expensesCntx.expenses.filter((expense)=>{
        const today = new Date();
        const date7daysago = getDateMinus(today, 7);
        return expense.date > date7daysago;
    });


    return(
        <ExpensesOutput expenses={recentExpenses} periodName="Last 7 day's" fallbackText='No expenses registered for the last 7 days' />
    ); 
}

export default RecentExpenses;