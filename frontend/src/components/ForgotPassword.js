import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';

export default function ForgotPasssword( {onPress}) {
    return (
        <Pressable style={{flexDirection: "row"}}>
            <View>
                <Text>Forgot Password</Text>
            </View>
        </Pressable>
 
    );

}

const styles = StyleSheet.create({
    example: {

    },
});