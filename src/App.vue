<template>
  <div id="body_wrap" class="body_wrap">
    <!-- <PreHeader :api="api"/> -->
    <Header/>
    <div class="content_body_wrap">
      <div class="content_body">
        <Title/>
        <div id="converter_template_wrap" class="converter_template_wrap" v-if="api.length">
          <converter :api="api"/>
          <converter :api="api" v-for="converted in converters" :key="converted"/>
          <div id="plus_wrap" class="plus_wrap">
            <div class="plus">
              <img @click="addConverter()" class="plus_img" src="./assets/img/plus.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Title from "./components/Title.vue";
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
    Title,
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
        this.api = this.currencySymbols.map(symbol => {
          return {
            name: this.fiatNames[symbol],
            symbol: symbol,
            rate: this.fiatRates[symbol],
            icon: "../assets/img/coin.png"
          };
        });
        this.crypoRates.map(crypto => {
          const cryptoParsed = {
            name: crypto.name,
            symbol:  crypto.symbol.toUpperCase(),
            rate: crypto.current_price,
            icon: crypto.image
          };

          this.api.push(cryptoParsed);
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }
};
</script>
