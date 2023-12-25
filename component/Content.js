import React, { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity, View, Text, Image } from 'react-native';
import axios from 'axios';

function Content() {
//   const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);


  return (
    <View style={{ width: '100%', backgroundColor: 'white', flex: 70 }}>
      <FlatList
        keyExtractor={(item) => item.name}
        numColumns={2}
        data={products}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('productDetail', {
                name: item.title,
                url: item.image,
                price: item.price,
                addToCart: addToCart, // Thêm hàm addToCart vào navigation params
              })
            }
            style={{
              flex: 1,
              marginLeft: index % 2 == 0 ? 8 : 2,
              marginTop: 5,
              marginRight: index % 2 == 0 ? 2 : 8,
              marginBottom: 5,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: 'black',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 10,
                  margin: 10,
                  resizeMode: 'cover',
                }}
              />
              <Text style={{ color: 'red', marginStart: 10 }}>
                ${item.price}
              </Text>
            </View>
            <Text style={{ color: 'black' }}>{item.title}</Text>
            <View style={{ flex: 1 }}>
              <View style={{ height: 30 }}></View>
             
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
export default Content;