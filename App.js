import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ManageExpenses from "./screens/ManageExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import {Ionicons} from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const BottonTabs = createBottomTabNavigator();

function ExpensesOverView() {
  return (
    <BottonTabs.Navigator
      screenOptions={({navigation})=> ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight : ({tintColor})=>(
          <IconButton icon="add" color={tintColor} size={24} onPress={()=>{
            navigation.navigate("ManageExpense");
          }}/>
        )
      })}
    >
      <BottonTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
        title:'Recent Expenses',
        tabBarLabel:'Recent',
        tabBarIcon:({color, size})=>(
          <Ionicons name='hourglass' color={color} size={size} />
        ),
      }} />
      <BottonTabs.Screen name="AllExpenses" component={AllExpenses} options={{
        title:'All Expenses',
        tabBarLabel:'All Expenses',
        tabBarIcon:({color, size})=>(
          <Ionicons name='calendar' color={color} size={size} />
        ),
      }} />
    </BottonTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle : { backgroundColor:GlobalStyles.colors.primary500},
          headerTintColor :'white'
        }}>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverView}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpenses} options={{
            presentation :'modal'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
