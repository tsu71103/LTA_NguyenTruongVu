import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      

      if (response.ok) {
        const data = await response.json();
        console.log('Đăng nhập thành công. Token:', data.token);
        navigation.navigate('Home');
        // Lưu token vào trạng thái ứng dụng hoặc AsyncStorage để sử dụng sau này
        // Ví dụ: AsyncStorage.setItem('token', data.token);
        // Sau đó, bạn có thể điều hướng người dùng đến màn hình chính hoặc thực hiện các thao tác khác.
      } else {
        console.log('Đăng nhập thất bại');
        Alert.alert('Đăng nhập thất bại', 'Vui lòng kiểm tra lại thông tin đăng nhập.');
        // Xử lý khi đăng nhập thất bại, ví dụ: hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
    }
   


  };
   
  const handleRegister = () => {
    // Navigate to the Register screen
    navigation.navigate('Register')};
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    margin: 10,
    padding: 8,
  },
});

export default LoginScreen;