import React from 'react';
import {  Text, View } from 'react-native';
import {Header,Footer,Content} from "./component"
function App(){
  return (
<View style={{
        flex:100
      }}>
        
        <Header />
        <Content/>
        <Footer />
  
      </View>
  )
  
}export default App