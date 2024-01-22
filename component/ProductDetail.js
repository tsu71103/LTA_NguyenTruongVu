import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ProductDetail({ route }) {
  const navigation = useNavigation();
  const { name, url, price } = route.params;
  const [count, setCount] = useState(1);

  const addToCart = () => {
    global.mycart = global.mycart || [];

    // Check if the product is already in the cart
    const existingItemIndex = global.mycart.findIndex(
      (item) => item.name === name
    );

    if (existingItemIndex !== -1) {
      // If yes, increase the quantity by 1
      global.mycart[existingItemIndex].quantity += count;
    } else {
      // If not, add the new product to the cart
      const newItem = {
        name,
        url,
        price,
        quantity: count,
        image: url,
      };
      global.mycart.push(newItem);
    }

    setCount(1);
    console.log("Cart after adding item:", global.mycart);
  };

  const increaseQuantity = () => {
    setCount(count + 1);
  };

  const decreaseQuantity = () => {
    // Ensure the quantity never goes below 1
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const goToCart = () => {
    navigation.navigate("Cart", { addedItems: global.mycart });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, margin: 10 }}>
        <Image
          source={{ uri: url }}
          style={{ height: 200, width: "100%", resizeMode: "cover", borderRadius: 10 }}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
          <Text style={{ fontSize: 16, color: "gray" }}>Price: ${price}</Text>
        </View>
      </View>

      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Quantity:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginHorizontal: 10 }}>{count}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
        <Text style={{ color: "white", fontSize: 18 }}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToCart} style={styles.viewCartButton}>
        <Text style={{ color: "white", fontSize: 18 }}>View Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  button: {
    backgroundColor: "#3498db",
    borderRadius: 15,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  addToCartButton: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    height: 40,
    marginHorizontal: 10,
    marginTop: 10,
  },
  viewCartButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    height: 40,
    marginHorizontal: 10,
    marginTop: 10,
  },
};

export default ProductDetail;
