import React from 'react';
import {StyleSheet, Text, View, WebView} from 'react-native';

class SmartApp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>hello world</Text>
        <Text>hello @keith</Text>
        <Text>hello @hufeng</Text>
        <Text style={{fontSize: 20}}>hello cloudNativeApp</Text>
        <WebView
          source={{uri: 'https://www.google.com'}}
          style={{width: 200, height: 400}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

global.__registry = SmartApp;
