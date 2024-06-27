import {useRoute} from '@react-navigation/native'
import {useState} from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {setTocart} from '../localStore/localStore'

const ProductDetails = () => {

    const route = useRoute()

    const [count, setCount] = useState(1)

    const dispatch = useDispatch()

    const addToCart = () => {

        route.params.product.count = count

        dispatch(setTocart(route.params.product))

    }

    return (
        <View>
            <Image source={{
                uri: route.params.product.thumbnail
            }}
                   style={{width: '100%', height: 200, marginBottom: 5}}
            />

            <View style={{padding: 10}}>
                <Text>{route.params.product.title}</Text>
                <Text>{route.params.product.brand}</Text>
                <Text>{route.params.product.price} $</Text>
                <Text>{route.params.product.description}</Text>
            </View>

            <ScrollView horizontal>

                {
                    route.params.product.images.map((image, i) => (

                        <Image key={i} source={{
                            uri: image
                        }} style={{width: 100, height: 100, marginRight: 5}}/>

                    ))
                }

            </ScrollView>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, alignItems: 'center'}}>

                <TouchableOpacity style={{
                    backgroundColor: 'red',
                    padding: 20
                }}
                                  onPress={() => {
                                      if (count > 1) {
                                          setCount(count - 1)
                                      }

                                  }}
                >
                    <Text>-</Text>
                </TouchableOpacity>


                <Text style={{fontSize: 20}}>{count}</Text>


                <TouchableOpacity style={{
                    backgroundColor: 'green',
                    padding: 20
                }}
                                  onPress={() => {
                                      setCount(count + 1)
                                  }}

                >
                    <Text>+</Text>
                </TouchableOpacity>

            </View>

            <Text
                style={{
                    textAlign: 'center',
                    marginTop: 10,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}
            >Total: {route.params.product.price * count} $</Text>

            <TouchableOpacity

                onPress={() => {
                    addToCart()
                }}

                style={{
                    backgroundColor: 'green',
                    padding: 20,
                    width: '80%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,
                    borderRadius: 10
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 20
                    }}
                >Add to Cart</Text>

            </TouchableOpacity>

        </View>
    )

}

export default ProductDetails
