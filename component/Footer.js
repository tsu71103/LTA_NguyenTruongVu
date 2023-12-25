
import React from "react";
import {View,Text,TouchableOpacity} from "react-native"
function Footer(props){
    return(
        <View style={{
            marginVertical:20,
            width:'100%',
            flex:20,
            backgroundColor:"blue",
            justifyContent:'center'
        }}>
            <Text style={{
                color:'black',
                backgroundColor:'purple'
            }}> app!</Text>
            
          </View>

    ); 
}
export default Footer