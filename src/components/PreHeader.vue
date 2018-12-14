<template>
    <div class="preHeader_wrap">
        <div class="preHeader">
            <div class="loading" v-if="!api.length"><span>Loading...</span></div>
            <div class="header_coin_wrap" v-for="coin in apiData" :key="coin">
                <div class="header_icon_wrap">
                    <img class="header_icon" :src="coin.icon">
                </div>
                <div class="header_coin">
                    <span>1 {{coin.name}} = </span>
                    <span id="header_price">{{coin.buy}}€</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PreHeader',
    props: [
        'api'
    ],

    data(){
        return{
            apiData: [],
            icon:'',
            name:'',
            buy: 1,
        }
    },
    
    watch:{
        api(newVal, oldVal){
            this.apiData = newVal;
        
            this.api.map((coin)=>{
                this.icon = coin.icon;
                this.name = coin.name;
                this.buy = coin.buy;
            });
        } 
    }
}
</script>
<style>
    .preHeader_wrap{
        background-color: #000;
    }
    .preHeader{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .loading{
        color: #fff;
    }
    .header_coin_wrap{
        display: flex;
        align-items: center;
        padding: 0.3% 2%;
        color: #fff;
    }
    .header_coin{
        padding-left: 5px;
    }
    .header_icon{
        height: 20px;
        margin-right: 1%,
    }

</style>