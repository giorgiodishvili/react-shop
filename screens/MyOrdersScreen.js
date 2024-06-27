import React from 'react'
import { useSelector } from 'react-redux'
import { getOrders } from '../localStore/localStore'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'

const MyOrdersScreen = ({ navigation }) => {
    const orders = useSelector(getOrders)

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={orders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', { order: item })}>
                        <View style={styles.orderContainer}>
                            <Text style={styles.orderTitle}>Order ID: {item.id}</Text>
                            <Text>Date: {item.date}</Text>
                            <Text>Total: ${item.total}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    orderContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingBottom: 10,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
})

export default MyOrdersScreen
