import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const SuccessScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Payment Successful!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ backgroundColor: 'green', padding: 20, borderRadius: 10 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SuccessScreen
