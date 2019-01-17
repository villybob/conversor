<template>
  <div id="template_wrap">
    <div class="full_converter_wrap" v-if="!isDelete">
      <div class="remake_wrap" v-if="!remake">
        <div class="remake">
          <span @click="remakeConverter()">REMAKE</span>
        </div>
      </div>
      <div ref="converter" class="converter" v-if="remake">
        <div ref="converter_left" class="converter_wrap converter_left">
          <div class="amount_wrap" v-if="!openedDropdown1">
            <input
              ref="amount_left"
              class="amount"
              type="number"
              min="0"
              v-model="valueInput1"
              @focus="isInput1Focus=true"
              @blur="outFocus()"
              @click="onFocus()"
              step="0.00000001"
            >
          </div>
          <div class="full_coin_wrap">
            <div v-if="openedDropdown1">
              <vue-single-select
                :inputId="uuid1"
                :options="apiData"
                v-model="coinSelected1"
                placeholder="search"
                :filterBy="customFilter()"
                @customblur="outFocusSelect1"
              >
                <template slot="option" slot-scope="{option}">
                  <div class="select_coin_wrap">
                    <div class="coin_logo">
                      <img class="select_logo" :src="option.icon">
                    </div>
                    <div class="coin_symbol">
                      <span class="select_symbol">{{ option.symbol }}</span>
                    </div>
                    <div class="coin_name">
                      <span class="name">{{ option.name }}</span>
                    </div>
                  </div>
                </template>
              </vue-single-select>
            </div>
            <div class="coin_wrap" @click="handleSelectCoin1()">
              <div class="coin_logo" v-if="!openedDropdown1">
                <img class="logo" :src="coinSelected1.icon">
              </div>
              <div class="coin_symbol" v-if="!openedDropdown1">
                <span class="symbol">{{ coinSelected1.symbol }}</span>
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
        <div ref="converter_right" class="converter_wrap converter_right">
          <div class="amount_wrap" v-if="!openedDropdown2">
            <input
              ref="amount_right"
              class="amount"
              type="number"
              v-model="valueInput2"
              @focus="isInput1Focus=false"
              @blur="outFocus()"
              @click="onFocus()"
              step="0.00000001"
              min="0"
            >
          </div>
          <div class="full_coin_wrap">
            <div v-if="openedDropdown2">
              <vue-single-select
                :inputId="uuid2"
                :options="apiData"
                v-model="coinSelected2"
                placeholder="search"
                :filterBy="customFilter()"
                @customblur="outFocusSelect2"
              >
                <template slot="option" slot-scope="{option}">
                  <div class="select_coin_wrap">
                    <div class="coin_logo">
                      <img class="select_logo" :src="option.icon">
                    </div>
                    <div class="coin_symbol">
                      <span class="select_symbol">{{ option.symbol }}</span>
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
              <div class="selector_arrow_wrap" v-if="!openedDropdown2">
                <div class="selector_arrow">
                  <img class="arrow_down" src="../assets/img/arrow_down.svg">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="delete_converter_wrap">
          <div class="delete_converter" @click="deleteConverter()">
            <svg class="delete_cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
              <g>
              <path d="M15,0A15,15,0,1,0,30,15,15,15,0,0,0,15,0Zm0,29A14,14,0,1,1,29,15,14.01589,14.01589,0,0,1,15,29Z"/>
              <path d="M19.78516,10.21484a.49983.49983,0,0,0-.707,0L15,14.293l-4.07812-4.07813a.5.5,0,0,0-.707.707L14.293,15l-4.07813,4.07812a.5.5,0,1,0,.707.707L15,15.707l4.07812,4.07813a.5.5,0,1,0,.707-.707L15.707,15l4.07813-4.07812A.49983.49983,0,0,0,19.78516,10.21484Z"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSingleSelect from './select.js';

export default {
  name: "converter",

  components: {
    VueSingleSelect,
  },

  props: {
    api: Array,
    value: {},
  },

  data() {
    return {
      openedDropdown1: false,
      openedDropdown2: false,
      isInput1Focus: true,
      remake: true,
      isDelete: false,
      valueInput1: 1,
      valueInput2: 1,
      uuid1: "",
      uuid2: "",
      uuid3: "",
      coinSelected1: {
        name: "",
        symbol: "",
        icon: "",
        rate: 1,
        decimals: 8
      },
      coinSelected2: {
        name: "United States Dollar",
        symbol: "USD",
        icon: "http://pngimg.com/uploads/coin/coin_PNG36943.png",
        rate: 1,
        decimals: 8
      },
      provisionalCoin1:{},
      provisionalCoin2: {},
      apiData: [],
    };
  },

  watch: {
    openedDropdown1() {
      setTimeout(() => {
        if (this.openedDropdown1) 
          document.getElementById(this.uuid1).focus();
      }, 10);
    },
    openedDropdown2() {
      setTimeout(() => {
        if (this.openedDropdown2)
          document.getElementById(this.uuid2).focus();
      }, 10);
    },
    coinSelected1() {
      if (this.coinSelected1.hasOwnProperty("name")) {
        this.openedDropdown1 = false;
        this.operation();
        this.saveStorage();
      }
    },
    coinSelected2() {
      if (this.coinSelected2.hasOwnProperty("name")) {
        this.openedDropdown2 = false;
        this.operation();
        this.saveStorage();
      }
    },
    valueInput1() {
      this.operation();
      this.saveStorage();
    },
    valueInput2() {
      this.operation();
      this.saveStorage();
    }
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

  mounted() {
    const uuidv4 = require('uuid/v4');
    this.uuid1 = uuidv4();
    this.uuid2 = uuidv4();
    this.uuid3 = uuidv4();
    this.$refs.amount_left.focus();
    this.apiData = this.api;
    this.restoreStorage();
    this.onFocus();
    this.adjustInput();
    setTimeout(() => {this.adjustInput();}, 10);
    this.$refs.converter.classList.add("new_converter");
    setTimeout(() => {
        this.$refs.converter.classList.remove("new_converter");
      }, 1000);
  },

  methods: {
    customFilter() {
      return function(option) {
        if (
          JSON.stringify(option)
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
        ) {
          return option;
        }
      };
    },
    operation() {
      if (this.isInput1Focus) {
        if(this.coinSelected2.decimals==8){
          this.valueInput2 =
            ((this.valueInput1 * this.coinSelected1.rate) /
            this.coinSelected2.rate).toFixed(8);
        }else{
          this.valueInput2 =
            ((this.valueInput1 * this.coinSelected1.rate) /
            this.coinSelected2.rate).toFixed(8);
        }
      } else {
        if(this.coinSelected1.decimals==8){
          this.valueInput1 =
            ((this.valueInput2 * this.coinSelected2.rate) /
            this.coinSelected1.rate).toFixed(8)
        }else{
          this.valueInput1 =
            ((this.valueInput2 * this.coinSelected2.rate) /
            this.coinSelected1.rate).toFixed(8)
        }
      }
      setTimeout(() => { this.adjustInput();}, 10)
    },
    onFocus() {
      if (this.isInput1Focus) {
        this.$refs.converter_right.classList.remove("converter_focus");
        this.$refs.converter_left.classList.add("converter_focus");
      } else {
        this.$refs.converter_left.classList.remove("converter_focus");
        this.$refs.converter_right.classList.add("converter_focus");
      }
    },
    outFocus() {
      if (!this.isInput1Focus) {
        this.$refs.converter_right.classList.remove("converter_focus");
      } else {
        this.$refs.converter_left.classList.remove("converter_focus");
      }
    },
    handleSelectCoin1() {
      this.openedDropdown1 = true;
      this.provisionalCoin1 = this.coinSelected1;
      this.coinSelected1 = {};
    },
    handleSelectCoin2() {
      this.openedDropdown2 = true;
      this.provisionalCoin2 = this.coinSelected2;
      this.coinSelected2 = {};
    },
    deleteConverter() {
      this.remake = false;
      setTimeout(() => {
        if(this.remake==false){
          this.isDelete = true;
          this.deleteStorage();
        }
      }, 2500)
    
    },
    remakeConverter() {
      this.remake = true;
      setTimeout(() => {
        this.$refs.converter.classList.add("new_converter");
        this.adjustInput();
        setTimeout(() => {
            this.$refs.converter.classList.remove("new_converter");
          }, 1000);
      }, 1);
    },
    adjustInput() {
      let textLeft = this.$refs.amount_left;
      let txtl = textLeft.value;
      let sizeLeft = txtl.length;
      sizeLeft *= 23;
      textLeft.style.width = sizeLeft+"px";
      let textRight = this.$refs.amount_right;
      let txtr = textRight.value;
      let sizeRight = txtr.length;
      sizeRight *= 23;
      textRight.style.width = sizeRight+"px";
    },
    outFocusSelect1(data) {
     if (data != 'item-selected') {
          this.coinSelected1 = this.provisionalCoin1;
          this.openedDropdown1 = false;
        }
    },
    outFocusSelect2(data) {
       if (data != 'item-selected'){
          this.coinSelected2 = this.provisionalCoin2;
          this.openedDropdown2 = false;
        }
    },
    saveStorage() {
        if(localStorage.getItem('miStorage')){
          let miStorage = JSON.parse(localStorage.getItem('miStorage'));
          let existUuid = false;
          for (let i = 0; i < miStorage.length; i++) {
            if(miStorage[i].uuid==this.uuid3){
              miStorage[i].coinSelected1 = this.coinSelected1,
              miStorage[i].coinSelected2 = this.coinSelected2,
              miStorage[i].valueInput1 = this.valueInput1,
              miStorage[i].valueInput2 = this.valueInput2
              miStorage[i].isInput1Focus = this.isInput1Focus,
              
              existUuid = true;
              const parsed = JSON.stringify(miStorage);
              localStorage.setItem('miStorage', parsed)
            }
          }
          if(!existUuid){
            miStorage.push({
              uuid: this.uuid3,
              coinSelected1: this.coinSelected1,
              coinSelected2: this.coinSelected2,
              valueInput1: this.valueInput1,
              valueInput2: this.valueInput2,
              isInput1Focus: this.isInput1Focus
            })
            const parsed = JSON.stringify(miStorage);
            localStorage.setItem('miStorage', parsed)  
          }
        } 
        else {
          let miStorage = []
          miStorage.push({
              uuid: this.uuid3,
              coinSelected1: this.coinSelected1,
              coinSelected2: this.coinSelected2,
              valueInput1: this.valueInput1,
              valueInput2: this.valueInput2,
              isInput1Focus: this.isInput1Focus
            })
          const parsed = JSON.stringify(miStorage);
          localStorage.setItem('miStorage', parsed)
        }
    },
    deleteStorage(){
      let miStorage = JSON.parse(localStorage.getItem('miStorage'));
      for (let i = 0; i < miStorage.length; i++) {
        if(miStorage[i].uuid==this.uuid3){
          miStorage.splice(i, 1);
        }
      }
      const parsed = JSON.stringify(miStorage);
      localStorage.setItem('miStorage', parsed);
    },
    restoreStorage(){
      if(this.value){
        if(this.value.uuid){
          this.uuid3 = this.value.uuid;
          this.coinSelected1 = this.value.coinSelected1;
          this.coinSelected2 = this.value.coinSelected2;
          if(this.value.isInput1Focus){
            this.valueInput1 = this.value.valueInput1;
          }else{
            this.valueInput2 = this.value.valueInput2;
            this.isInput1Focus = false;
          }
        }else{
          this.coinSelected1 = this.api[0];
          this.valueInput2 = this.api[0].rate;
        }
      }else{
        this.coinSelected1 = this.api[0];
          this.valueInput2 = this.api[0].rate;
      }
    }
  }
};
</script>
<style>
#vueSingleSelect2{
  min-width: 255px;
}
.new_converter{
  border: 2px solid #044e97 !important;
}
.converter_focus {
  border: 2px solid #044e97 !important;
}
input {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: transparent;
  text-align: center;
  min-width: 100px;
  max-width: 255px;
  background-color: #fff;
}
input:focus {
  outline: 0px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
.select_coin_wrap {
  display: flex;
}
.converter {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 3rem;
  margin: 2rem 0;
}

.full_converter_wrap,
.amount_coin_wrap,
.coin_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.converter_wrap {
  display: inline-flex;
  background-color: #fff;
  overflow: visible;
  border: 2px solid #91adcc;
  border-radius: 5px;
}
.full_coin_wrap {
  padding: 0.8rem 0.3rem 0.6rem 0.3rem;
  border-left: 2px solid #91adcc;
  background-color: #e8edf4;
  width: -webkit-fill-available;
}
.full_coin_wrap:hover {
  cursor: pointer;
  cursor: hand;
}
.amount_wrap {
  padding: 0.6rem 0.2rem;
}
.coin_logo,
.coin_symbol {
  padding: 0 0.2rem;
}
.amount {
  font-size: 2.5rem;
  width: 100px;
}
.logo {
  height: 40px;
}
.arrow_down {
  height: 15px;
}
.equal_wrap {
  padding: 0 1rem;
  flex: 2;
  text-align: center;
}
.equal {
  height: 35px;
  background-color: #fff;
  border-radius: 5px;
}
.delete_converter_wrap {
  padding-left: 1.5rem;
  flex: 2;
  align-content: flex-end;
}
.delete_converter {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
}
.delete_converter:hover {
  cursor: pointer;
  cursor: hand;
}
.delete_cross{
  fill: #91adcc;
}
.delete_cross:hover{
  fill: #044e97;
}
.delete_cross:active {
  fill: #0f335b;
}
.symbol {
  font-size: 2.5rem;
}
.selector_arrow {
  padding: 0 0.2rem;
}
.select_logo {
  height: 25px;
}
.remake_wrap{
  width: 100%;
  text-align: center;
  padding: 2rem 0;
  background-color: #edf1f6;
  color: #517caf;
  font-weight: 600;
}
.remake{
  cursor: pointer;
  cursor: hand;
}
.remake:hover{
  color: #044e97;
}
.delete_converter_wrap_responsive{
    display: none;
  }
.recently-updated {
  color: grey;
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

/* Responsive */
@media (max-width: 350px) {
  .converter{
    display: flex;
    flex-direction: column;
    padding: 0.8rem 1.2rem 1.2rem 1.2rem;
    max-width: 340px;
    margin: 2rem 1rem;
  }
  .amount_wrap{
    min-width: 125px;
    max-width: 125px;
  }
  .amount{
    min-width: 125px;
    max-width: 125px;
  }
  .amount, .symbol {
    font-size: 1.5rem;
  }
  .symbol {
    font-size: 1.5rem;
  }
  .logo {
    height: 30px;
  }
  .equal_wrap {
    order: 3;
    padding: 0 0.5rem;
  }
  .delete_converter_wrap{
    order: 1;
    align-self: flex-end;
    padding-bottom: 1rem;
    padding-left: 0.5rem;
  }
  .converter_left{
    order: 2;
  }
  .converter_right{
    order: 4;
  }
  .delete_converter {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
  .amount_wrap {
    padding: 0.5rem 0.2rem 0.2rem 0.2rem;
  }
  .full_coin_wrap {
    padding: 0.5rem 0 0.2rem 0;
  }
  .plus_wrap {
    padding: 6rem 1rem 0 0 !important;
  }
  .plus_button {
    padding: 8px 14px !important;
  }
}
@media (max-width: 576px) and (min-width: 350px) {
  .converter{
    display: flex;
    flex-direction: column;
    padding: 1.2rem 2.2rem 2.2rem 2.2rem;
    max-width: 340px;
    margin: 2rem 1rem;
  }
  .amount_wrap{
    min-width: 125px;
    max-width: 125px;
  }
  .amount{
    min-width: 125px;
    max-width: 125px;
  }
  .delete_converter_wrap{
    order: 1;
    align-self: flex-end;
    padding-bottom: 1rem;
  }
  .converter_left{
    order: 2;
  }
  .converter_right{
    order: 4;
  }
   .amount, .symbol {
    font-size: 1.5rem;
  }
  .symbol {
    font-size: 1.5rem;
  }
  .logo {
    height: 30px;
  }
  .equal_wrap {
    padding: 0 0.5rem;
    order: 3;
  }
  .delete_converter {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
  .amount_wrap {
    padding: 0.5rem 0.2rem 0.2rem 0.2rem;
  }
  .full_coin_wrap {
    padding: 0.5rem 0 0.2rem 0;
  }
  .delete_converter_wrap {
    padding-left: 0.5rem;
  }
  .plus_wrap {
    padding: 6rem 1rem 0 0 !important;
  }
  .plus_button {
    padding: 8px 14px !important;
  }
}
@media (max-width: 768px) and (min-width: 577px)  {
  .converter{
    display: flex;
    flex-direction: column;
    padding: 1.2rem 2.2rem 2.2rem 2.2rem;
    max-width: 540px;
  }
  .delete_converter_wrap{
    order: 1;
    align-self: flex-end;
    padding-bottom: 1rem;
  }
  .converter_left{
    order: 2;
  }
  .equal_wrap {
    order: 3;
  }
  .converter_right{
    order: 4;
  }
  .amount_wrap{
    min-width: 278px;
  }
  .amount{
    min-width: 278px;
  }
}
@media (max-width: 992px) and (min-width: 769px)  {
  .amount, .symbol {
    font-size: 1.5rem;
  }
  .symbol {
    font-size: 1.5rem;
  }
  .logo {
    height: 30px;
  }
  .converter {
    max-width: 740px;
    padding: 2rem 0 2rem 1rem;
    margin: 1rem 0;
  }
  .amount{
    max-width: 125px;
  }
  .equal_wrap {
    padding: 0 0.5rem;
  }
  .delete_converter {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
  .amount_wrap {
    padding: 0.5rem 0.2rem 0.2rem 0.2rem;
  }
  .full_coin_wrap {
    padding: 0.5rem 0 0.2rem 0;
  }
  .delete_converter_wrap {
    padding-left: 0.5rem;
  }
  .plus_wrap {
    padding: 3em 0 0 0 !important;
  }
  .plus_button {
    padding: 8px 14px !important;
  }
}
@media (max-width: 1200px) and (min-width: 993px) {
  .amount, .symbol {
    font-size: 2rem;
  }
  .symbol {
    font-size: 2rem;
  }
  .logo {
    height: 35px;
  }
  .converter {
    max-width: 970px;
  }
  .amount{
    max-width: 170px;
  }
  .equal_wrap {
    padding: 0 1rem;
  }
  .delete_converter {
    width: 35px;
    height: 35px;
    line-height: 35px;
  }
}
</style>


