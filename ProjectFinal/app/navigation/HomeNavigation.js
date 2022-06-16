import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import PlayList from '../screens/PlayList';


const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown:false
        }}>
        <Tab.Screen 
            name='AudioList' 
            component={AudioList}
            options={{
                tabBarIcon:({size,color})=>(
                    <MaterialCommunityIcons name="headphones" size={size} color={color} />
                )
            }}/>
        <Tab.Screen
            name='Player'
            component={Player}
            options={{
                tabBarIcon:({size,color})=>(
                    <FontAwesome5 name="compact-disc" size={size} color={color} />
                )
            }}/>
        <Tab.Screen 
            name='PlayList' 
            component={PlayList}
            options={{
                tabBarIcon:({size,color})=>(
                    <MaterialIcons name="library-add-check" size={size} color={color} />
                )       
            }}/>
    </Tab.Navigator>
  )
}

export default HomeNavigation
