import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFromCart, clearCart, addOrder } from '../localStore/localStore';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import uuid from 'react-native-uuid';

const CheckoutScreen = ({ navigation }) => {
    const cartItems = useSelector(getFromCart);
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        const getLocationPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log('Location permission status:', status); // Debugging log
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                maximumAge: 10000,
                timeout: 5000
            });
            console.log('Location:', location); // Debugging log
            const { latitude, longitude } = location.coords;
            setRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });

            // Reverse geocode to get address
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setAddress(data.display_name || '');
                        setCity(data.address.city || data.address.town || data.address.village || '');
                        setPostalCode(data.address.postcode || '');
                    } else {
                        Alert.alert('Error', 'Unable to fetch address. Please try again.');
                    }
                })
                .catch(error => {
                    console.log(error);
                    Alert.alert('Error', 'Unable to fetch address. Please try again.');
                });
        };

        getLocationPermission();
    }, []);

    const handleRegionChange = (region) => {
        setRegion(region);
        // Reverse geocode to get address
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${region.latitude}&lon=${region.longitude}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setAddress(data.display_name || '');
                    setCity(data.address.city || data.address.town || data.address.village || '');
                    setPostalCode(data.address.postcode || '');
                } else {
                    Alert.alert('Error', 'Unable to fetch address. Please try again.');
                }
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Error', 'Unable to fetch address. Please try again.');
            });
    };

    const handlePayment = () => {
        // Calculate total
        const total = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

        // Create order
        const order = {
            id: uuid.v4(),
            items: cartItems,
            total: total,
            address: address,
            city: city,
            postalCode: postalCode,
            date: new Date().toISOString(),
        };

        // Add order to the store
        dispatch(addOrder(order));

        // Clear the cart after successful payment
        dispatch(clearCart());

        // Send push notification
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Payment Successful!',
                body: 'Your order has been placed successfully.',
            },
            trigger: null,
        });

        // Navigate to a success screen
        navigation.navigate('Success');
    };

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
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={handleRegionChange}
            >
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            </MapView>
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
            />
            <TextInput
                style={styles.input}
                placeholder="Postal Code"
                value={postalCode}
                onChangeText={setPostalCode}
            />
            <TouchableOpacity onPress={handlePayment} style={styles.button}>
                <Text style={styles.buttonText}>Proceed to Payment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        backgroundColor: 'green',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});

export default CheckoutScreen;
