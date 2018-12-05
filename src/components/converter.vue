<template>
    <div id="template_wrap">
        <div class="full_converter_wrap">
            <div class="converter">
                <div class="converter_wrap">
                    <div class="amount_wrap">
                        <vue-autonumeric id="amount_left" class="amount" 
                            :options="{
                                allowDecimalPadding: false,
                                digitGroupSeparator: '',
                                minimumValue: '0',
                            }"
                            v-model="n1">
                        </vue-autonumeric>
                    </div>
                    <div class="coin_wrap">
                        <div class="coin_logo">
                            <img class="logo" src="../../dist/img/bitcoin.png">
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
                            v-model="n2">
                        </vue-autonumeric>
                    </div>
                    <div class="coin_wrap">
                        <div class="coin_logo">
                            <img class="logo" src="../../dist/img/euro.png">
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
                                <img class="arrow_down" src="../../dist/img/arrow_down.svg">
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>       
</template>

<script>
import VueAutonumeric from 'vue-autonumeric'

export default {
    name: 'converter',

    components: {VueAutonumeric},

    props: {

    },

    data(){
        return {
            n1: 1,
            n2: 1,
            symbol1: 'BTC',
            symbol2: 'EUR',
            name1: 'Bitcoin',
            name2: 'Euro',
        }
    },

    computed:{

    },

    methods: {
        
    
    }
}
</script>