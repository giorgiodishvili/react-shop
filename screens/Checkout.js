import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getFromCart, clearCart, addOrder} from '../localStore/localStore'
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native'
import * as Notifications from 'expo-notifications'
import uuid from 'react-native-uuid'

const CheckoutScreen = ({ navigation }) => {
    const cartItems = useSelector(getFromCart)
    const dispatch = useDispatch()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')

    const handlePayment = () => {
        // Calculate total
        const total = cartItems.reduce((sum, item) => sum + item.price * item.count, 0)

        // Create order
        const order = {
            id: uuid.v4(),
            items: cartItems,
            total: total,
            address: address,
            city: city,
            postalCode: postalCode,
            date: new Date().toISOString(),
        }

        // Add order to the store
        dispatch(addOrder(order))

        // Clear the cart after successful payment
        dispatch(clearCart())

        // Send push notification
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Payment Successful!',
                body: 'Your order has been placed successfully.',
            },
            trigger: null,
        })

        // Navigate to a success screen
        navigation.navigate('Success')
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={cartItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10 }}>
                        <Image source={{ uri: item.thumbnail }} style={{ width: '100%', height: 100, marginBottom: 5 }} />
                        <Text>{item.title}</Text>
                        <Text>{item.brand}</Text>
                        <Text>{item.price} $</Text>
                        <Text>Quantity: {item.count}</Text>
                        <Text>Total: {item.price * item.count} $</Text>
                    </View>
                )}
            />
            <TextInput
                style={{ borderColor: 'black', borderWidth: 1, marginBottom: 10, padding: 10 }}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={{ borderColor: 'black', borderWidth: 1, marginBottom: 10, padding: 10 }}
                placeholder="City"
                value={city}
                onChangeText={setCity}
            />
            <TextInput
                style={{ borderColor: 'black', borderWidth: 1, marginBottom: 10, padding: 10 }}
                placeholder="Postal Code"
                value={postalCode}
                onChangeText={setPostalCode}
            />
            <TouchableOpacity onPress={handlePayment} style={{ backgroundColor: 'green', padding: 20, borderRadius: 10, marginTop: 20 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>Proceed to Payment</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CheckoutScreen
