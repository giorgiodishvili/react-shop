import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFromCart, updateQuantity } from '../localStore/localStore'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'

const CartScreen = ({ navigation }) => {
    const cartItems = useSelector(getFromCart)
    const dispatch = useDispatch()

    const handleQuantityChange = (id, count) => {
        dispatch(updateQuantity({ id, count }))
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
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ padding: 10, backgroundColor: 'red' }}
                                onPress={() => handleQuantityChange(item.id, item.count - 1)}
                                disabled={item.count <= 1}
                            >
                                <Text style={{ color: 'white' }}>-</Text>
                            </TouchableOpacity>
                            <Text style={{ padding: 10 }}>{item.count}</Text>
                            <TouchableOpacity
                                style={{ padding: 10, backgroundColor: 'green' }}
                                onPress={() => handleQuantityChange(item.id, item.count + 1)}
                            >
                                <Text style={{ color: 'white' }}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <Text>Total: {item.price * item.count} $</Text>
                    </View>
                )}
            />
            {cartItems.length > 0 && (
                <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={{ backgroundColor: 'green', padding: 20, borderRadius: 10, marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>Proceed to Checkout</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default CartScreen
