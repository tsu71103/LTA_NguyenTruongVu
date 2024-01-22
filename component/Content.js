import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity, View, Text, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

function Content() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);

  const handleSearch = () => {
    const filteredProducts = products.filter(item =>
      item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const resetProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json));
  };

  const clearSearch = () => {
    setSearchKeyword('');
    setShowClearButton(false);
    // Optionally, you can also reset the product list when clearing the search
    resetProducts();
  };
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
  const getAllProducts = () => {
    // Load all products initially
    resetProducts();
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);
  

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
      {/* Search Input */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TextInput
          placeholder="Tìm kiếm sản phẩm"
          value={searchKeyword}
          onChangeText={text => {
            setSearchKeyword(text);
            setShowClearButton(!!text); // Show the "x" button if there is text
          }}
          style={{
            flex: 1,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 15,
            marginRight: 10,
          }}
        />
        {showClearButton && (
          <TouchableOpacity
            onPress={clearSearch}
            style={{ backgroundColor: 'white', borderRadius: 20, marginLeft: 10, paddingVertical: 8, paddingHorizontal: 15 }}
          >
            <Text style={{ color: 'red' }}>cancel </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleSearch}
         
        >
           <Icon name="search" size={25} color="black" />
        </TouchableOpacity>
 
        
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
        <TouchableOpacity onPress={() => getAllProducts()}>
          <Text>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => getCategoryProducts(["men's clothing"])}
            >
          <Text>Nam</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getCategoryProducts(["women's clothing"])}>
          <Text>Nữ</Text>
        </TouchableOpacity>
        <TouchableOpacity    onPress={() => getCategoryProducts(["electronics", "jewelery"])}>
          <Text>Khác</Text>
        </TouchableOpacity>
      </View>

    {/* Product List */}
      <FlatList
        keyExtractor={(item) => item.name}
        numColumns={2}
        data={products}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetail', {
                name: item.title,
                url: item.image,
                price: item.price,
                // Make sure addToCart is defined
              })
            }
            style={{
              flex: 1,
              marginLeft: index % 2 === 0 ? 8 : 2,
              marginTop: 5,
              marginRight: index % 2 === 0 ? 2 : 8,
              marginBottom: 5,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: 'black',
              overflow: 'hidden',
            }}
          >
            <View style={{ overflow: 'hidden', borderRadius: 10 }}>
              <Image
                source={{ uri: item.image }}
                style={{ height: 100, width: '100%', borderRadius: 10 }}
              />
            </View>
            <Text style={{ color: 'red', marginTop: 5 }}>
              ${item.price}
            </Text>
            <Text numberOfLines={2} style={{ color: 'black', marginTop: 5 }}>
              {item.title}
            </Text>
          </TouchableOpacity>
          
        )}
        
      />
       {/* Navigation Menu */}
       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart',{ addedItems: global.mycart })}>
          <Icon name="shopping-bag" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Content;
