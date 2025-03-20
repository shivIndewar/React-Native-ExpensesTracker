import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({invalid, label, textInputConfig, style}) {

    let inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles = [styles.input, styles.inputMultiline];
    }

    return(
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={[inputStyles, invalid && styles.errorBorder]} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal : 4,
        marginVertical : 8,
    },
    label:{
        fontSize:12,
        color : GlobalStyles.colors.primary100
    },
    input:{
        backgroundColor : GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius:6,
        fontSize:18,
        color:GlobalStyles.colors.primary700
    },
    inputMultiline:{
        minHeight : 100,
        textAlignVertical:'top'
    },
    errorBorder : {
        backgroundColor : GlobalStyles.colors.error500,
    }
});