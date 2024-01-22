import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

function Checkout({ route, navigation }) {
  const { addedItems } = route.params || {};
  const [cartData, setCartData] = useState(addedItems || []);

  const calculateTotalPrice = () => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const placeOrder = () => {
    // Clear the local cart state
    setCartData([]);

    // Clear the global cart state
    global.mycart = [];

    // Navigate to the order confirmation page or any other relevant screen
    navigation.navigate('Home');
    alert('Order placed!')
  };

  useEffect(() => {
    // Update the local state when the component mounts or when global.mycart changes
    setCartData(global.mycart || []);
  }, [global.mycart]);
  const getCategoryProducts = async (categories) => {
    try {
      const requests = categories.map((category) =>
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
      );
      const responses = await Promise.all(requests);
      const mergedProducts = responses.flatMap((response) => response.data);
      setProducts(mergedProducts);
    } catch (error) {
      alert(error.message);
    }
  };
  

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text>${item.price}</Text>
        <Text>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.checkoutTitle}>Checkout</Text>
      <FlatList
        data={cartData}
        keyExtractor={(item) => item.name}
        renderItem={renderCartItem}
        style={styles.cartList}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>${calculateTotalPrice()}</Text>
      </View>
      <TouchableOpacity onPress={placeOrder}  >
        <Text style={styles.placeOrderButton}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  checkoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartList: {
    marginBottom: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  cartItemImage: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
  },
  placeOrderButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#green',
    fontWeight: 'bold',
  },
});

export default Checkout;
