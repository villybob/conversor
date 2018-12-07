<template>
    <div id="template_wrap">
        <div class="full_converter_wrap">
            <div class="converter">
                <div class="converter_wrap">
                    <div class="amount_wrap">
                        <!-- <vue-autonumeric id="amount_left" class="amount" 
                            :options="{
                                allowDecimalPadding: false,
                                digitGroupSeparator: '',
                                minimumValue: '0',
                            }"
                            v-model="n1">
                        </vue-autonumeric> -->
                        <input ref="amount_left" class="amount" type="number" v-model="n1" @focus="operation1" @focusout="clearInterval1">
                    </div>
                    <div class="coin_wrap">
                        <div class="coin_logo">
                            <img class="logo" src= "../../dist/img/bitcoin.png">
                        </div>
                        <div class="coin_symbol">
                            <span class="symbol">{{ symbol1 }}</span>
                        </div>
                        <div class="coin_separator">
                            <span class="separator">-</span>
                        </div>
                        <div class="coin_name">
                            <span class="name">{{ name1 }}</span>
                        </div>
                        <div class="selector_arrow_wrap">
                            <div class="selector_arrow">
                                <img class="arrow_down" src="../../dist/img/arrow_down.svg">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="equal_wrap">
                    <img class="equal" src="../../dist/img/equal.png">
                </div>
                <div class="converter_wrap">
                    <div class="amount_wrap">
                        <vue-autonumeric id="amount_right" class="amount"
                            :options="{
                                allowDecimalPadding: false,
                                digitGroupSeparator: '',
                                minimumValue: '0',
                            }"
                            v-model="n2" value=1>
                        </vue-autonumeric>
                        <!-- <input class="amount" type="number" v-model="n2" @focus="operation2" @focusout="clearInterval2"> -->
                    </div>
                    <div class="coin_wrap">
                        <div class="coin_logo">
                            <img class="logo" src= "../../dist/img/euro.png">
                        </div>
                        <div class="coin_symbol">
                            <span class="symbol">{{ symbol2 }}</span>
                        </div>
                        <div class="coin_separator">
                            <span class="separator">-</span>
                        </div>
                        <div class="coin_name">
                            <span class="name">{{ name2 }}</span>
                        </div>
                        <div class="selector_arrow_wrap">
                            <div class="selector_arrow">
                                <img  class="arrow_down" src="../../dist/img/arrow_down.svg">
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div> {{coin}}
    </div>       
</template>

<script>
import VueAutonumeric from 'vue-autonumeric';
import VueSingleSelect from "vue-single-select";
const axios = require('axios');

export default {
    name: 'converter',

    components: {
        VueAutonumeric,
        VueSingleSelect
    },

    props: {

    },

    data(){
        return {
            n1: 1,
            symbol1: 'BTC',
            symbol2: 'EUR',
            name1: 'Bitcoin',
            name2: 'Euro',
            //coinValue: 3000,
            n2: 3000,
            interval1:'',
            interval2:'',
            coin:[],
        }
    },

    mounted () {
        this.$refs.amount_left.focus();
        console.log('hola')
        axios
            .get('https://api.bit2me.com/v1/ticker2')
            .then(response => (this.coin = response.data.data[0].buy, this.n2 = response.data.data[0].buy ))
        setInterval(() => { axios
            .get('https://api.bit2me.com/v1/ticker2')
            .then(response => (this.coin = response.data.data[0].buy ))
        }, 5000)
    },

    methods: {
        operation1: function(){
            this.interval1 = setInterval(() => {
                this.n2 = this.n1*this.coin;     
            }, 1);
        },
        operation2: function(){
            this.interval2 = setInterval(() => {
                this.n1 = this.n2/this.coin;
            }, 1);
        },
        clearInterval1: function(){
            clearInterval(this.interval1)   
        },
        clearInterval2: function(){
            clearInterval(this.interval2)  
         },
    // directives: {
    //     focus: {
    //         // directive definition
    //         inserted: function (el) {
    //         el.focus()
    //         }
    //     }
    }
}
</script>