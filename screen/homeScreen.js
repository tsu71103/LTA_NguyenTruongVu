import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Header,Footer,Content} from "../component"

function homeScreen(props){
   return(
   <View style={{
        flex:100
      }}>
        
        <Header />
        <Content/>
        <Footer />
  
      </View>
   )
}
export default homeScreen