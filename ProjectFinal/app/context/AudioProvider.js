
import { Alert, Text, View } from 'react-native';
import React, { Component,createContext } from 'react';
import * as MediaLibrary from 'expo-media-library';


export const AudioContext = createContext();
export class AudioProvider extends Component {

  
  constructor(props){
    super(props);
    this.state={
      audioFiles: []
    }
  }

  permissionAllert = () => {
    Alert.alert('Permission Required', 'This app needs to read audio files!', [
      {
        text: 'I am ready',
        onPress: () => this.getPermission(),
      },
      {
        text: 'cancle',
        onPress: () => this.permissionAllert(),
      },
    ]);
  };

  getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType:MediaLibrary.MediaType.audio,
    })
    media = await MediaLibrary.getAssetsAsync({
      mediaType:MediaLibrary.MediaType.audio,
      first: media.totalCount,
    })
    
    this.setState({...this.state,audioFiles:media.assets})
  }
  
  getPermission = async () =>{
  // {
  //   "canAskAgain": true,
  //   "expires": "never",
  //   "granted": false,
  //   "status": "undetermined",
  // }
    const permission = await MediaLibrary.getPermissionsAsync()
    if(permission.granted){
      //get all the file
      this.getAudioFiles();
    }

    if(!permission.granted && permission.canAskAgain){
      const {status,canAskAgain} = await MediaLibrary.requestPermissionsAsync();
      if(status === 'denied' && canAskAgain){
        //display alert
        this.permissionAlert()
      }

      if(status==='granted'){
        // get all the file
        this.getAudioFiles();
      }

      if(status === 'denied' && !canAskAgain){
        //display some error
      }
    }
  } 

  componentDidMounth(){
    this.getPermission()
  }

  render() {
    return (
      <AudioContext.Provider value={{audioFiles:this.state.audioFiles}}>
        {this.props.children}
      </AudioContext.Provider>
    )
  }
}

export default AudioProvider