import axios from "axios";

export default class HttpRequests{

    getProducts(){

        return axios.get('products')

    }


}