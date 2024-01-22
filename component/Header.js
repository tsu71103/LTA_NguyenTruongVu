
import React from "react";
import {View,Text,TouchableOpacity} from "react-native"
function Header(props){
    return (<View style={{
      marginTop:20,
      flex:20,
      width:'100%',
      backgroundColor:'yellow',
      justifyContent:'center'
    }}   >
      <Text style={{
        color:"black",
        backgroundColor:'green'}}>Open up Aapp</Text>
      
    </View>);
}
export default Header