import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

function Cart({ route, navigation }) {
  const { addedItems } = route.params || {};
  const [cartData, setCartData] = useState(addedItems || []);

  const removeFromCart = (item) => {
    // Update the local state to remove the item from the cart
    const updatedCart = cartData.filter(cartItem => cartItem.name !== item.name);
    setCartData(updatedCart);

    // Implement logic to remove the item from the global cart
    // For simplicity, let's assume global.mycart is your cart data
    const updatedGlobalCart = global.mycart.filter(cartItem => cartItem.name !== item.name);
    global.mycart = updatedGlobalCart;
  };

  useEffect(() => {
    // Update the local state when the component mounts or when global.mycart changes
    setCartData(global.mycart || []);
  }, [global.mycart]);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text>${item.price}</Text>
        <Text>Quantity: {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Shopping Cart</Text>
      <FlatList
        data={cartData}
        keyExtractor={(item) => item.name}
        renderItem={renderCartItem}
        style={styles.cartList}
      />
      {addedItems && addedItems.length > 0 && (
        <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  cartTitle: {
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
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Cart;
