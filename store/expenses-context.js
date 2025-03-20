import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses:[],
    addExpense : ({description, amount, date})=>{},
    deleteExpense : (id) =>{},
    updateExpense : (id, {description, amount, date}) =>{} 
});

const DUMMY_EXPENSES=[
    {id:'e1', amount:50, description:'A pair of shoe', date:new Date('2025-01-20')},
    {id:'e2', amount:100, description:'A pair of trouser', date:new Date('2025-02-20')},
    {id:'e3', amount:200, description:'A book', date:new Date('2025-03-20')},
    {id:'e4', amount:150, description:'One dozan Mangos', date:new Date('2025-03-29')},
    {id:'e5', amount:250, description:'Bike servicing', date:new Date('2025-04-01')},
    {id:'e6', amount:50, description:'A pair of shoe', date:new Date('2025-01-20')},
    {id:'e7', amount:100, description:'A pair of trouser', date:new Date('2025-02-20')},
    {id:'e8', amount:200, description:'A book', date:new Date('2025-03-20')},
    {id:'e9', amount:150, description:'One dozan Mangos', date:new Date('2025-03-29')},
    {id:'e10', amount:250, description:'Bike servicing', date:new Date('2025-04-01')}
];

function expensesReducer(state, action){
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() +  Math.random().toString();
            return [{...action.payload, id:id},...state]

        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense)=> expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];    
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;

        case 'DELETE':
            return state.filter((expense)=> expense.id != action.payload);

            default:
            return state;
    } 

}


function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({type : 'ADD', payload:expenseData});
    }

    function deleteExpense(id){
        dispatch({type:'DELETE', payload:id})
    }

    function updateExpense(id, expenseData){
        dispatch({type:'UPDATE', payload:{id:id,data:expenseData}});
    }


    const value={
        expenses : expensesState,
        addExpense : addExpense,
        deleteExpense : deleteExpense,
        updateExpense : updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;
