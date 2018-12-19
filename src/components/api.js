const axios = require('axios');

const urlApiFiat = 'https://openexchangerates.org/api/latest.json?app_id=4fcad6283836407c9e404ca0189039c5';

const urlApiCrypto = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';


export default {

    getLatestFiatExchangeRates(){
        return axios.get(urlApiFiat);
    },
    
    getLatestCryptoExchangeRates(){
        return axios.get(urlApiCrypto);
    },

};