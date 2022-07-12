import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from 'recoil';
import Category from './screens/Category';
import UpdateProfile from "./screens/UpdateProfile"
import VerifyCode from "./screens/VerifyCode"
import ProductDetails from './screens/ProductDetails';
import Tabs from './components/Tabs';
import GetStarted from './screens/GetStarted';
import SignUp from './screens/SignUp';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator();
console.disableYellowBox = true;


export default function App() {

  
  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      return user.toString()
    } catch(e) {
      console.log(e)
    }
  }

  


  return (
    <RecoilRoot>
    <NavigationContainer>
			<Stack.Navigator>
        {getUser ?	
        <>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Tabs} />
        <Stack.Screen options={{headerShown: false}} name="ProductDetails" component={ProductDetails} />
        <Stack.Screen options={{headerShown: false}} name="Category" component={Category} />
        <Stack.Screen options={{headerShown: false}} name="Start" component={GetStarted} />
        </>
        :
        <>
      <Stack.Screen options={{headerShown: false}} name="Start" component={GetStarted} />
      <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
      <Stack.Screen options={{headerShown: false}} name="Verify" component={VerifyCode} />
      <Stack.Screen options={{headerShown: false}} name="ProfileUpdate" component={UpdateProfile} />
      <Stack.Screen options={{headerShown: false}} name="Home" component={Tabs} />
      <Stack.Screen options={{headerShown: false}} name="Category" component={Category} />
      <Stack.Screen options={{headerShown: false}} name="ProductDetails" component={ProductDetails} />
        </>
      }
			</Stack.Navigator>
		</NavigationContainer>
    </RecoilRoot>
  );
}

// +1 650-555-3434 || 654321
