import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';

const checkcircle = require("../../assets/checkcircle.png")

export default function RememberMe({onPress}) {
    return (
        <Pressable style={{flexDirection: "row"}}>
            <View style={{paddingRight: 5, paddingTop: 2.5}}>
                <Image source={checkcircle}/>
            </View>
            <View>
                <Text>Remember Me</Text>
            </View>
        </Pressable>
 
    );

}

const styles = StyleSheet.create({
    example: {

    },
});