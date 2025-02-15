import {
  Image,
  TextInput,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

export default function MiniButton({ text, source }) {
  return (
    <Pressable style={styles.loginTextFrame}>
      <View style={{ flexDirection: 'column', alignItems:'center', }}>
        <View>
          <Text style={styles.loginText}>{text}</Text>
        </View>
        <Image style={styles.icon} source={source}></Image>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loginTextFrame: {
    width: 330,
    height: 45,
    borderColor: '#0077B6',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: '#0077B6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10

  },
  
  loginText: {
    fontSize: 20,
    color: 'white',
  },

  icon: {
    width: 15,
    height: 15,
  },
});
