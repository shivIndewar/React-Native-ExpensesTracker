import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit, isEditing, defaultValues}) {

const [inputs, setInputs] = useState({
    amount: 
    {
        value : defaultValues ? defaultValues.amount.toString():'',
        isValid : true
    },
    date:
    {
        value : defaultValues ? defaultValues.date.toISOString().slice(0,10):'',
        isValid : true
    },
    description:
    {
        value : defaultValues ? defaultValues.description:'',
        isValid : true
    },
  });

  function onInputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputVlaues)=>{
        return {
            ...currentInputVlaues,
            [inputIdentifier] : {value : enteredValue, isValid : true},
        };
    })
  }

  function onSubmitHandler(){

    const expensesData = {
        amount: parseInt(inputs.amount.value),
        date: new Date(inputs.date.value),
        description: inputs.description.value
    }

    const amountIsValid = !isNaN(expensesData.amount) && expensesData.amount > 0; 
    const dateIsValid = expensesData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expensesData.description.trim().length > 0;

    if(!amountIsValid || !dateIsValid ||!descriptionIsValid){
        // Alert.alert('Invalid Input', 'Please check your input values');

        setInputs((curentInput)=>{
            return {
                amount : {value : curentInput.amount.value, isValid: amountIsValid},
                date : {value : curentInput.date.value, isValid: dateIsValid},
                description : {value : curentInput.description.value, isValid: descriptionIsValid}
            };
        });

        return;
    }

    onSubmit(expensesData);
  }


  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid; 

  return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          invalid = {!inputs.amount.isValid}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: onInputChangeHandler.bind(this, 'amount'),
            value : inputs.amount.value
          }}
          style={styles.rowInput}
        />
        <Input
          invalid = {!inputs.date.isValid}      
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: onInputChangeHandler.bind(this, 'date'),
            value : inputs.date.value
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        invalid = {!inputs.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCorrect : false
        onChangeText: onInputChangeHandler.bind(this, 'description'),
        value : inputs.description.value
        }}
      />
        {formIsInvalid && (<Text style={styles.errorText}>Invalid input values! Please check your enterd data!</Text>)}
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={onSubmitHandler}>{isEditing ? 'Update' : 'Add'}</Button>
        </View>
        
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop:40
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical : 24,
        textAlign:'center'
    },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
},
button:{
    minWidth : 120,
    marginHorizontal : 8
},
errorText:{
    textAlign:'center',
    color : GlobalStyles.colors.error500,
    margin : 8
}
});
