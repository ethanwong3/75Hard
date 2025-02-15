import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

const googlelogo = require('../../assets/googlelogo.png');

export default function SignInWithGoogle() {
    return (
        <Pressable>
            <View style={{flexDirection: "row"}}>
                <Image source={googlelogo}/>
                <View style={styles.text}>
                    <Text> Sign in with Google</Text>
                </View>
            </View>
        </Pressable>

    );

}

const styles = StyleSheet.create({
    text: {
        paddingTop: 5,
        paddingLeft: 5
    },
});