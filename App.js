import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Content } from './component';
import CartScreen from './component/CartScreen';
import ProductDetail from './component/ProductDetail';
import Footer from './component/Footer';
import Login from './component/LoginScreen';
import Register from './component/RegisterScreen';
import Checkout from './component/Checkout';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
       
      <Stack.Navigator initialRouteName="Login">
     
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Content} />
      <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Footer" component={Footer} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;