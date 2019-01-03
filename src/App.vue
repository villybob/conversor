<template>
  <div id="body_wrap" class="body_wrap">
    <!-- <PreHeader :api="api"/> -->
    <Header/>
    <div class="content_body_wrap">
      <div class="content_body">
        <div id="plus_wrap" class="plus_wrap">
          <div class="plus">
            <button @click="addConverter()" class="plus_button">+ NEW</button>
          </div>
        </div>
        <div id="converter_template_wrap" class="converter_template_wrap" v-if="api.length">
          <converter :api="api" v-for="converted in orderedConverters" :key="converted"/>  
          <converter :api="api"/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import converter from "./components/converter.vue";
import Footer from "./components/Footer.vue";
// import axios from "axios";
require("@/assets/css/styles.css");

import newApi from "./components/api.js";
import currenciesJson from "./assets/currencies.json";

export default {
  name: "App",
  components: {
    Header,
    converter,
    Footer
  },
  data() {
    return {
      converters: [],
      urlApi: "https://api.bit2me.com/v1/ticker2",
      urlNamesFiat: "./assets/currencies.json",
      refreshTimeInterval: 5000,
      api: {},
      fiatRates: {},
      fiatNames: {},
      crypoRates: {},
      currencySymbols: [],
      names: {}
    };
  },
  computed: {
     orderedConverters(){
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.converters.reverse();
    }
  },
  /* watch:{
    converters(newConverters){
      localStorage.converters = newConverters;
    }
  }, */
  created() {
    // axios.get(this.urlApi).then(response => {
    //   this.api = response.data.data;
    // });

    // setInterval(() => {
    //   axios.get(this.urlApi).then(response => {
    //     this.api = response.data.data;
    //   });
    // }, this.refreshTimeInterval);
   
    this.fiatNames = currenciesJson;
    this.currencySymbols = Object.keys(this.fiatNames);
  },
  mounted() {
    this.callApi();
    /* if(localStorage.converters) this.converters = localStorage.converters; */
  },

  methods: {
    addConverter() {
      this.converters.push(this.converters.length + 1);
    },
    async callApi() {
      try {
        const fiatRatesResponse = await newApi.getLatestFiatExchangeRates();
        if (fiatRatesResponse.data) {
          this.fiatRates = fiatRatesResponse.data.rates;
        }
        const crypoRatesResponse = await newApi.getLatestCryptoExchangeRates();
        if (crypoRatesResponse.data) {
          this.crypoRates = crypoRatesResponse.data;
        }
        
        this.api = this.crypoRates.map(crypto => {
          return {
            name: crypto.name,
            symbol:  crypto.symbol.toUpperCase(),
            rate: crypto.current_price,
            icon: crypto.image
          };
        });
        this.currencySymbols.map(symbol => {
          const fiatCoins = {
            name: this.fiatNames[symbol],
            symbol: symbol,
            rate: 1/this.fiatRates[symbol],
            icon: "http://pngimg.com/uploads/coin/coin_PNG36943.png"
          };
          this.api.push(fiatCoins);
        });
        
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }
};
</script>
<style>
  .plus_wrap{
    text-align: right;
    padding: 5em 0 1.5em 0;
  }
  .plus_button{
    color: rgba(255,255,255,0.9);
    font-weight: 600;
    background-color: #044e97;
    padding: 12px 22px;
    border: none;
  }
  .plus_button:hover{
    color: rgba(255,255,255,1);
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.4));
    cursor:pointer; 
    cursor: hand;
  }
  .plus_button:active{
    background-color: #0f335b;
    border: none;
  }
  .plus_button:focus{
    outline: 0;
  }
</style>

