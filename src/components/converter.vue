<template>
    <div id="template_wrap">
        <p>{{coinSelected}}</p>
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
                        <input ref="amount_left" class="amount" type="number" v-model="n1" @focus="operation(); oper=true">
                    </div>
                    <div class="coin_wrap">
                        <div v-if="dropdown">
                            <vue-single-select 
                                option-label="name"
                                :options="api"
                                v-model="coinSelected"
                                >
                                    <template slot="option" slot-scope="{option}">
                                        <div class="select_coin_wrap">
                                            <div class="coin_logo">
                                                <img class="select_logo" :src="option.icon">
                                            </div>
                                            <div class="coin_symbol">
                                                <span class="select_symbol">{{ option.symbol }}</span>
                                            </div>
                                            <div class="coin_separator">
                                                <span class="separator">-</span>
                                            </div>
                                            <div class="coin_name">
                                                <span class="name">{{ option.name }}</span>
                                            </div>
                                        </div>
                                    </template>
                            </vue-single-select>
                        </div>
                        <br>
                        <div class="coin_wrap" @click="handleSelectCoin()">
                            <div class="coin_logo" v-if="!dropdown">
                                <img class="logo" :src="logo">
                            </div>
                            <div class="coin_symbol" v-if="!dropdown">
                                <span class="symbol">{{ symbol1 }}</span>
                            </div>
                            <div class="coin_separator" v-if="!dropdown">
                                <span class="separator">-</span>
                            </div>
                            <div class="coin_name" v-if="!dropdown">
                                <span class="name">{{ name1 }}</span>
                            </div>
                            <div class="selector_arrow_wrap" v-if="!dropdown">
                                <div class="selector_arrow">
                                    <img class="arrow_down" src="../../dist/img/arrow_down.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="equal_wrap">
                    <img class="equal" src="../../dist/img/equal.png">
                </div>
                <div class="converter_wrap">
                    <div class="amount_wrap">
                        <!-- <vue-autonumeric id="amount_right" class="amount"
                            :options="{
                                allowDecimalPadding: false,
                                digitGroupSeparator: '',
                                minimumValue: '0',
                            }"
                            v-model="n2" value=1>
                        </vue-autonumeric> -->
                        <input class="amount" type="number" v-model="n2" @focus="operation(); oper=false">
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
const urlApi = 'https://api.bit2me.com/v1/ticker2';

export default {
    name: 'converter',

    components: {
        VueAutonumeric,
        VueSingleSelect,
    },

    props: {

    },

    data(){
        return {
            dropdown: false,
            oper: true,
            n1: 1,
            symbol1: 'BTC',
            symbol2: 'EUR',
            name1: 'Bitcoin',
            name2: 'Euro',
            logo: '',
            //coinValue: 3000,
            n2: 3000,
            coin:[],
            api: {},
            apiCoin:{},
            coinSelected: {}
        }
    },

    watch: {
        coinSelected(){
            if(this.coinSelected.hasOwnProperty('name')){
                this.dropdown=!this.dropdown;
                this.logo=this.coinSelected.icon;
                this.symbol1=this.coinSelected.symbol;
                this.name1=this.coinSelected.name;
                this.coin=this.coinSelected.buy;

            }
        }
    },

    mounted () {
        this.$refs.amount_left.focus();
        setInterval(() => {
            if(this.oper){
                this.n2 = this.n1*this.coin;     
            }else{
                this.n1 = this.n2/this.coin;
            }
        }, 5000);
    },

    created (){
        axios
            .get(urlApi)
            .then(response => (
                this.coin = response.data.data[0].buy,
                this.n2 = response.data.data[0].buy,
                this.logo = response.data.data[0].icon,
                this.api = response.data.data
            ))
        setInterval(() => { axios
            .get(urlApi)
            .then(response => (this.coin = response.data.data[0].buy, this.api = response.data.data))
        }, 5000)
        
    },

    methods: {
        operation: function(){     
            setInterval(() => {
                if(this.oper){
                    this.n2 = this.n1*this.coin;     
                }else{
                    this.n1 = this.n2/this.coin;
                }
            }, 1);
        },
        handleSelectCoin(){
            this.dropdown = true;
            this.coinSelected = {};
        }
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