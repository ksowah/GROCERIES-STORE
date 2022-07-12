import { View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { MaterialCommunityIcons, AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons'; 
import tw from "twrnc"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Callendar from '../screens/Callendar';
import Applications from '../screens/Applications';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';

const Tabs = () => {

    const Tab = createBottomTabNavigator();

    const [item, setItem] = useState([])  

    const getPhoneNumber = async () => {
      try {
        const number = await AsyncStorage.getItem('user')
        return number
      } catch(e) {
        console.log(e)
      }
    }


  
	useLayoutEffect(async () => {
		const unsubscribe = onSnapshot(
			query(collection(db, "carts", getPhoneNumber, "items"), orderBy("timeStamp", "asc")),
			(snapshot) => {
				setItem(snapshot.docs)
			}
			)

		return unsubscribe;
	}, []);

  return (

    <Tab.Navigator 
    screenOptions={{
        tabBarShowLabel: false, 
        headerShown: false,
        
      }}
    >
      <Tab.Screen name="TabsHome" component={Home}
        options={{
            tabBarActiveTintColor: "black",
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home-variant" size={size} color= {color}/>
            )
        }}
      />
      <Tab.Screen name="Apps" component={Applications} 
      options={{
        tabBarActiveTintColor: "black",
        tabBarIcon: ({color, size}) => (
            <AntDesign name="appstore1" size={size} color= {color}/>
        )
    }}
      />
      <Tab.Screen name="Cart" component={Cart} 
      options={{
        tabBarBadge: item.length,
        tabBarBadgeStyle: tw`${item.length <= 0 && "hidden"}`,
        
        tabBarIcon: ({color, size}) => (
            <View style={tw`bg-[#009959] border-2 border-gray-100 rounded-100 w-12 h-12 items-center justify-center`}>
                <FontAwesome5 name="shopping-basket" size={size} style={tw`text-gray-100`}/>
            </View>
        )
    }}
      />
      <Tab.Screen name="Callendar" component={Callendar} 
        options={{
            tabBarActiveTintColor: "black",
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="calendar-text-outline" size={size} color= {color}/>
            )
        }}
      />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
            tabBarActiveTintColor: "black",
            tabBarIcon: ({color, size}) => (
                <FontAwesome name="user" size={size} color= {color}/>
            )
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs