import { StyleSheet, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";



function ExpensesOutput({expenses, periodName, fallbackText}) {

    let content = <Text style={styles.infoText}>{fallbackText}</Text>
    if(expenses.length > 0){
        content =   <ExpensesList expenses={expenses} />;
    }
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={periodName} />
           {content}
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:12,
        paddingVertical:12,
        paddingBottom:0,
        backgroundColor : GlobalStyles.colors.primary700
    },
    infoText:{
        color:'white',
        fontSize:16,
        textAlign:'center',
        marginTop:32
    }
});