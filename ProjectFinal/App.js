import React,{Component, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AudioProvider from './app/context/AudioProvider';
import HomeNavigation from './app/navigation/HomeNavigation';
import * as MediaLibrary from 'expo-media-library';

export default function App(){
  return(
    <AudioProvider style={{flex:1,justifyContent:'center'}}>
      <NavigationContainer>
        <HomeNavigation/>
      </NavigationContainer>
    </AudioProvider>
  )
}
