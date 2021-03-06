import React, { useState, useEffect,useRef } from 'react';
import { Text, View, TouchableOpacity,StyleSheet,SafeAreaView ,Modal
          ,Image} from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';



export default function Cam() {
   const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto,setCapturedPhoto] = useState(null);
  const [open,setOpen] = useState(false);
  const [facesCount, setFaces] = React.useState(null);
  



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

 async function takePicture() {
   if(camRef) {
     const data =await camRef.current.takePictureAsync();
     setCapturedPhoto(data.uri);
     setOpen(true);
     console.log(data);
    //  detectFaces(data.uri).then(response =>
    // setFaces(response.faces.length));

   }

 }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={camRef}
        
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
              position:'absolute',
              bottom:20,
              left:20,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              ); 
                 
                     
            }}
           
            >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
         
        </View>
        </Camera>
            
        <TouchableOpacity style={styles.button} onPress={takePicture}>
            <FontAwesome name="camera" size={23} color="white" />
          </TouchableOpacity>

          { capturedPhoto && 
          <Modal
          animationType ="slide"
          transparent={false}
          visible={open}
          >
            <View style={{flex:1, justifyContent:'center',
                  alignItems:'center', margin:20}}>
            <TouchableOpacity style={{margin:10}} onPress = { () =>setOpen(false) }>
              <FontAwesome name="window-close" size={50} color="red" />
            </TouchableOpacity>
             <Image 
             style={{width: '100%', height:300, borderRadius: 20}}
             source= {{uri:capturedPhoto}}
             />
            </View>
            {facesCount && <Text>facesCount: {facesCount}</Text>}
          </Modal>

          }
        
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',

  },
  button : {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'orange',
    margin:20,
    borderRadius:10,
    height:50,
    marginBottom:10,

  }

});