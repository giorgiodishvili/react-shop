import React from 'react'
import { useRoute } from '@react-navigation/native'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'

const OrderDetailsScreen = () => {
    const route = useRoute()
    const { order } = route.params

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.orderTitle}>Order ID: {order.id}</Text>
            <Text>Date: {order.date}</Text>
            <Text>Address: {order.address}</Text>
            <Text>City: {order.city}</Text>
            <Text>Postal Code: {order.postalCode}</Text>
            <Text>Total: ${order.total}</Text>
            <FlatList
                data={order.items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
                        <View style={styles.productDetails}>
                            <Text>{item.title}</Text>
                            <Text>Brand: {item.brand}</Text>
                            <Text>Price: ${item.price}</Text>
                            <Text>Quantity: {item.count}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
})

export default OrderDetailsScreen
