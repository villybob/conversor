<template>
    <div id="template_wrap">
        <div class="full_converter_wrap">
            <div class="converter">
                <div class="converter_wrap">
                    <div class="amount_wrap">
                        <input ref="amount_left" class="amount" type="number" v-model="valueInput1" @focus="isInput1Focus=true">
                    </div>
                    <div class="coin_wrap">
                        <div v-if="openedDropdown1">
                            <vue-single-select 
                                option-label="name"
                                :options="apiData"
                                v-model="coinSelected1"
                                placeholder="insert coin"
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
                            <div class="coin_logo" v-if="!openedDropdown1">
                                <img class="logo" :src="coinSelected1.icon">
                            </div>
                            <div class="coin_symbol" v-if="!openedDropdown1">
                                <span class="symbol">{{ coinSelected1.symbol }}</span>
                            </div>
                            <div class="coin_separator" v-if="!openedDropdown1">
                                <span class="separator">-</span>
                            </div>
                            <div class="coin_name" v-if="!openedDropdown1">
                                <span class="name">{{ coinSelected1.name }}</span>
                            </div>
                            <div class="selector_arrow_wrap" v-if="!openedDropdown1">
                                <div class="selector_arrow">
                                    <img class="arrow_down" src="../assets/img/arrow_down.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="equal_wrap">
                    <img class="equal" src="../assets/img/equal.png">
                </div>
                <div class="converter_wrap">
                    <div class="amount_wrap">
                        <input ref="amount_right" class="amount" type="number" v-model="valueInput2" @focus="isInput1Focus=false">
                    </div>
                    <div class="coin_wrap">
                        <div v-if="openedDropdown2">
                            <vue-single-select 
                                option-label="symbol"
                                :options="apiData"
                                v-model="coinSelected2"
                                placeholder="insert coin"
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
                        <div class="coin_wrap" @click="handleSelectCoin2()">
                            <div class="coin_logo" v-if="!openedDropdown2">
                                <img class="logo" :src="coinSelected2.icon">
                            </div>
                            <div class="coin_symbol" v-if="!openedDropdown2">
                                <span class="symbol">{{ coinSelected2.symbol }}</span>
                            </div>
                            <div class="coin_separator" v-if="!openedDropdown2">
                                <span class="separator">-</span>
                            </div>
                            <div class="coin_name" v-if="!openedDropdown2">
                                <span class="name">{{ coinSelected2.name }}</span>
                            </div>
                            <div class="selector_arrow_wrap" v-if="!openedDropdown2">
                                <div class="selector_arrow">
                                    <img  class="arrow_down" src="../assets/img/arrow_down.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>      
        </div>
        {{api}}
    </div>       
</template>

<script>
import VueSingleSelect from 'vue-single-select';

export default {
    name: 'converter',

    components: {
        VueSingleSelect,
    },

    props: [
        'api'
    ],

    data(){
        return {
            openedDropdown1: false,
            openedDropdown2: false,
            isInput1Focus: true,
            valueInput1: 1,
            valueInput2: 1,
            coinSelected1: {
                name: '',
                symbol: '',
                icon: '',
                rate: 1,
            },
            coinSelected2: {
                name: 'Euro',
                symbol: 'EUR',
                icon: 'http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/256/European-Union-Flag-icon.png',
                rate: 1,
            },
            apiData: [],
        }
    },

    watch: {
        coinSelected1(){ 
            if(this.coinSelected1.hasOwnProperty('name')){
                this.openedDropdown1=false;
                this.operation();
            }
        },
        coinSelected2(){ 
            if(this.coinSelected2.hasOwnProperty('name')){
                this.openedDropdown2=!this.openedDropdown2;
                this.operation();
            }
        },
        valueInput1(){
            if(this.isInput1Focus){
                this.valueInput2 = this.valueInput1*this.coinSelected1.rate/this.coinSelected2.rate;  
            }
       },
        valueInput2(){
            if(!this.isInput1Focus){
                this.valueInput1 = this.valueInput2*this.coinSelected2.rate/this.coinSelected1.rate;
            }
        },
        // api(newVal){
        //     this.apiData = newVal;
        
        //     this.api.map((coin)=>{
        //         if(this.coinSelected1.symbol === coin.symbol){
        //             this.coinSelected1.rate = coin.rate;
        //             }
        //         if(this.coinSelected2.symbol === coin.symbol){
        //             this.coinSelected2.rate = coin.rate;
        //         }
        //     });
            
        //     this.operation();
        //     if(this.isInput1Focus){
        //         this.$refs.amount_right.classList.add('recently-updated');
        //         setTimeout(()=>this.$refs.amount_right.classList.remove('recently-updated'), 300);
        //     }else{
        //         this.$refs.amount_left.classList.add('recently-updated');
        //         setTimeout(()=>this.$refs.amount_left.classList.remove('recently-updated'), 300);                                         
        //     }
        // } 
    },

    mounted () {
        this.$refs.amount_left.focus();
        this.apiData = this.api;
        this.coinSelected1 = this.api[0];
        this.valueInput2 = this.api[0].rate;
    },

    methods: {
        operation(){
            if(this.isInput1Focus){
                this.valueInput2 = this.valueInput1*this.coinSelected1.rate/this.coinSelected2.rate;     
            }else{
                this.valueInput1 = this.valueInput2*this.coinSelected2.rate/this.coinSelected1.rate;
            }
        },
        handleSelectCoin(){
            this.openedDropdown1 = true;
            this.coinSelected1 = {};
        },
        handleSelectCoin2(){
            this.openedDropdown2 = true;
            this.coinSelected2 = {};
        }
    }
}
</script>
<style>
.select_logo{
    height: 25px;
}
.recently-updated{
color:grey;
  animation: blink 0.2s alternate;
  transition: color 0.2s linear;
}

@keyframes blink {
   from {
      color: black;
   }
   to {
      color: grey;
   }
 }
</style>


