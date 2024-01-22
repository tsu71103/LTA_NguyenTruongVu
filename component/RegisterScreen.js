import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Cart = ({ route, navigation }) => {
  const { addedItems } = route.params || {};
  const [cartData, setCartData] = useState(addedItems || []);

  const removeFromCart = (item) => {
    // Implement logic to remove the item from the cart
    // For simplicity, let's assume global.mycart is your cart data
    const updatedCart = global.mycart.filter(cartItem => cartItem.name !== item.name);
    global.mycart = updatedCart;

    // Update the cart data to trigger a re-render
    setCartData(updatedCart);
  };

  useEffect(() => {
    // Set the initial cart data when the component mounts
    setCartData(addedItems || []);
  }, [addedItems]);

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
      {cartData.length > 0 && (
        <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Your existing styles remain unchanged
});

export default Cart;
