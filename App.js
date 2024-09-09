
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TextInput,
  Platform,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

const getWindowDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return {
    width,
    height,
    isPortrait: height >= width,
  };
};

const App = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const onChange = () => {
      setWindowDimensions(getWindowDimensions());
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const imageWidth = windowDimensions.width * 0.8;
  const imageHeight = imageWidth * (windowDimensions.isPortrait ? 0.5 : 0.3);

  const getButtonContainerStyle = () => {
    return windowDimensions.isPortrait
      ? styles.buttonContainerVertical
      : styles.buttonContainerHorizontal;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={windowDimensions.isPortrait ? 'dark-content' : 'light-content'}
        backgroundColor={windowDimensions.isPortrait ? '#f3f3f3' : '#000'}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={getButtonContainerStyle()}>
          <View style={[styles.button, { width: windowDimensions.width / 2 - 20 }]}>
            <Button title="Button 1" onPress={() => {}} />
          </View>
          <View style={[styles.button, { width: windowDimensions.width / 2 - 20 }]}>
            <Button title="Button 2" onPress={() => {}} />
          </View>
        </View>

        <Image
          style={[
            styles.image,
            {
              width: imageWidth,
              height: imageHeight,
            },
          ]}
          source={{ uri: 'https://ikona.telesurenglish.net/content/uploads/2024/09/Yagi.jpeg.webp' }}
        />

        <TextInput style={styles.input} placeholder="Type here" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.select({
      ios: 20,
      android: 10,
    }),
  },
  keyboardView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: Platform.select({
      ios: 10,
      android: 5,
    }),
  },
  buttonContainerVertical: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 10,
    padding: Platform.select({
      ios: 15,
      android: 7,
    }),
  },
  button: {
    margin: 5,
    padding: Platform.select({
      ios: 12,
      android: 8,
    }),
  },
  image: {
    marginVertical: 20,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default App;
