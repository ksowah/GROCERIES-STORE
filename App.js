import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import GetStarted from './screens/GetStarted';
import SignUp from './screens/SignUp';
import VerifyCode from './screens/VerifyCode';
import { RecoilRoot } from 'recoil';
import UpdateProfile from './screens/UpdateProfile';
import Category from './screens/Category';
import ProductDetails from './screens/ProductDetails';
import Tabs from './components/Tabs';


const Stack = createNativeStackNavigator();
console.disableYellowBox = true;

export default function App() {
  return (
    <RecoilRoot>
    <NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{headerShown: false}} name="Start" component={GetStarted} />
				<Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
				<Stack.Screen options={{headerShown: false}} name="Verify" component={VerifyCode} />
				<Stack.Screen options={{headerShown: false}} name="ProfileUpdate" component={UpdateProfile} />
				<Stack.Screen options={{headerShown: false}} name="Home" component={Tabs} />
				<Stack.Screen options={{headerShown: false}} name="Category" component={Category} />
				<Stack.Screen options={{headerShown: false}} name="ProductDetails" component={ProductDetails} />
			</Stack.Navigator>
		</NavigationContainer>
    </RecoilRoot>
  );
}

// +1 650-555-3434 || 654321
