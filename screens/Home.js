import { useNavigation } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import HttpRequests from "../httpRequests/httpRequests";
import { getFromCart, getLang } from "../localStore/localStore";
import * as Locales from "../locale/locale"
import {I18n} from "i18n-js";

const httpRequests = new HttpRequests()

const Home = () => {

    // არის ჰუკი რომელიც არსებობს react navigation native-ში
    const navigation = useNavigation()

    const [searchText, setSearchText] = useState('')

    const [products, setProducts] = useState([])

    const cartItems = useSelector(getFromCart)
    const currentLang = useSelector(getLang)
    const i18n = new I18n(Locales)
    i18n.locale=currentLang

    useEffect(() => {

        httpRequests.getProducts().then(response => {

            setProducts(response.data.products)

        }).catch(error => {
            console.log(error.response.data)
        })

    }, [])



    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={{ width: '20%' }}>

                    <TouchableOpacity style={styles.myDrawerBtn} onPress={() => {

                        // ეშვება arrow function - რომ გახსნას მენიუ
                        navigation.openDrawer()

                    }}>

                        <IoniconsIcons name='menu-outline' size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '80%', position: 'relative', justifyContent: 'center' }}>
                    <IoniconsIcons name="search" size={30} style={{ position: 'absolute', left: 5 }} />
                    <TextInput onChangeText={(text) => {
                        setSearchText(text)
                    }} style={styles.mySearch} placeholder={i18n.t('searchProduct')} />


                </View>
            </View>

            <FlatList
                data={products.filter(o => o.title.toLowerCase().includes(searchText.toLocaleLowerCase()))}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (


                    <Pressable onPress={() => {
                        navigation.navigate('ProductDetails', { product: item })
                    }}>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 10 }} >
                            <Image source={{
                                uri: item.thumbnail
                            }}
                                style={{ width: '100%', height: 200, marginBottom: 5 }}
                            />

                            <View style={{ padding: 10 }} >
                                <Text  >{item.title}</Text>
                                <Text  >{item.brand}</Text>
                                <Text  >{item.price} $</Text>
                            </View>

                        </View>
                    </Pressable>


                )}

            />

            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>

                <TouchableOpacity style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: 'orange',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,

                    elevation: 8,
                    justifyContent: 'center',
                    alignItems: 'center'

                }}

                    onPress={() =>
                        navigation.navigate('Cart')
                    // {
                    //     Notifications.scheduleNotificationAsync({
                    //         content: {
                    //             title: 'Look at that notification',
                    //             body: "I'm so proud of myself!",
                    //         },
                    //         trigger: null,
                    //     });
                    // }
                }>



                    <FontAwesomeIcons name="shopping-cart" size={50} color={'white'} />

                    {
                        cartItems.length > 0 && (


                            <View style={{
                                position: 'absolute',
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: 'red',
                                top: -10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{cartItems.length}</Text>
                            </View>

                        )
                    }

                </TouchableOpacity>

            </View>


        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    myDrawerBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
        backgroundColor: 'white',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'


    },
    mySearch: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 10,
        paddingLeft: 40




    }




})
