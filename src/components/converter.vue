<template>
  <div id="template_wrap">
    <div class="full_converter_wrap" v-if="!isDelete">
      <div class="remake_wrap" v-if="!remake">
        <div class="remake">
          <span @click="remakeConverter()">REMAKE</span>
        </div>
      </div>
      <div ref="converter" class="converter" v-if="remake">
        <div ref="converter_left" class="converter_wrap">
          <div class="amount_wrap" v-if="!openedDropdown1">
            <input
              ref="amount_left"
              class="amount"
              type="number"
              min=0
              v-model="valueInput1"
              @focus="isInput1Focus=true"
              @blur="outFocus()"
              @click="onFocus()"
            >
          </div>
          <div class="full_coin_wrap">
            <div v-if="openedDropdown1">
              <vue-single-select
                inputId="vueSingleSelect1"
                :options="apiData"
                v-model="coinSelected1"
                placeholder="insert coin"
                :filterBy="customFilter()"  
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
        <div ref="converter_right" class="converter_wrap">
          <div class="amount_wrap" v-if="!openedDropdown2">
            <input
              ref="amount_right"
              class="amount"
              type="number"
              v-model="valueInput2"
              @focus="isInput1Focus=false"
              @blur="outFocus()"
              @click="onFocus()"
            >
          </div>
          <div class="full_coin_wrap">
            <div v-if="openedDropdown2">
              <vue-single-select
                inputId="vueSingleSelect2"
                :options="apiData"
                v-model="coinSelected2"
                placeholder="insert coin"
                :filterBy="customFilter()"
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
import VueSingleSelect from "vue-single-select";

export default {
  name: "converter",

  components: {
    VueSingleSelect
  },

  props: {
    api: Object,
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
      coinSelected1: {
        name: "",
        symbol: "",
        icon: "",
        rate: 1,
        decimals: 8
      },
      coinSelected2: {
        name: "",
        symbol: "USD",
        icon: "http://pngimg.com/uploads/coin/coin_PNG36943.png",
        rate: 1,
        decimals: 2
      },
      apiData: []
    };
  },

  watch: {
    openedDropdown1() {
      setTimeout(() => {
        if (this.openedDropdown1) 
          document.getElementById("vueSingleSelect1").focus();
      }, 10);
    },
    openedDropdown2() {
      setTimeout(() => {
        if (this.openedDropdown2)
          document.getElementById("vueSingleSelect2").focus();
      }, 10);
    },
    coinSelected1() {
      if (this.coinSelected1.hasOwnProperty("name")) {
        this.openedDropdown1 = false;
        this.operation();
      }
    },
    coinSelected2() {
      if (this.coinSelected2.hasOwnProperty("name")) {
        this.openedDropdown2 = false;
        this.operation();
      }
    },
    valueInput1() {
      this.operation();
    },
    valueInput2() {
      this.operation();
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
    this.$refs.amount_left.focus();
    this.apiData = this.api;
    this.coinSelected1 = this.api[0];
    this.valueInput2 = this.api[0].rate;
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
        if(this.coinSelected2.decimals==2){
          this.valueInput2 =
            ((this.valueInput1 * this.coinSelected1.rate) /
            this.coinSelected2.rate).toFixed(2);
        }else{
          this.valueInput2 =
            ((this.valueInput1 * this.coinSelected1.rate) /
            this.coinSelected2.rate).toFixed(8);
        }
      } else {
        if(this.coinSelected1.decimals==2){
          this.valueInput1 =
            ((this.valueInput2 * this.coinSelected2.rate) /
            this.coinSelected1.rate).toFixed(2)
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
      // this.isInput1Focus = true;
      this.coinSelected1 = {};
    },
    handleSelectCoin2() {
      this.openedDropdown2 = true;
      // this.isInput1Focus = false;
      this.coinSelected2 = {};
    },
    deleteConverter() {
      this.remake = false;
      setTimeout(() => {
        if(this.remake==false)
        this.isDelete = true;
      }, 2500);
    },
    remakeConverter() {
      this.remake = true;
      setTimeout(() =>{
        this.$refs.converter.classList.add("new_converter");
        this.adjustInput();
        setTimeout(() => {
            this.$refs.converter.classList.remove("new_converter");
          }, 1000);
      }, 1);
    },
    adjustInput(){
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
    outFocusSelect1(){
      this.openedDropdown1 = false;
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
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: transparent;
  text-align: center;
  min-width: 100px;
  max-width: 255px;
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
  flex: auto;
}
.full_coin_wrap {
  padding: 0.8rem 0.6rem 0.6rem 0.6rem;
  border-left: 2px solid #91adcc;
  background-color: #e8edf4;
  width: -webkit-fill-available;
}
.full_coin_wrap:hover {
  cursor: pointer;
  cursor: hand;
}
.amount_wrap {
  padding: 0.6rem;
}
.coin_logo,
.coin_symbol {
  padding: 0 0.5rem;
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
  padding: 0 3rem;
  flex: 2;
  text-align: center;
}
.equal {
  height: 35px;
  background-color: #fff;
  border-radius: 5px;
}
.delete_converter_wrap {
  padding-left: 2rem;
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
</style>


