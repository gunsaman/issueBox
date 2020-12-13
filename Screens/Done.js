// React Native Tab
// https://aboutreact.com/react-native-tab/
import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,

} from 'react-native';

const Done = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 , padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>
            Hello{'\n'}(You are on Done)
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => navigation.navigate('FirstPage')
            }>
            <Text>Go to Home Tab</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
        React Native Tab Navigation
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default Done;