<template>
  <div id="body_wrap" class="body_wrap">
    <PreHeader :api="api"/>
    <Header/>
    <div class="content_body_wrap">
      <div class="content_body">
        <Title/>
        <div id="converter_template_wrap" class="converter_template_wrap" v-if="api.length">
          <converter :api="api"/>
          <converter :api="api" v-for="converted in converters" :key="converted"/>
          <div id="plus_wrap" class="plus_wrap">
            <div class="plus">
                <img @click="addConverter()" class="plus_img" src="../dist/img/plus.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import PreHeader from './components/PreHeader.vue'
import Header from './components/Header.vue'
import Title from './components/Title.vue'
import converter from './components/converter.vue'
import Footer from './components/Footer.vue'
import VueAutonumeric from 'vue-autonumeric'
import axios from 'axios'

require('@/../dist/css/styles.css');

export default {
  name: 'App',
  components: {
    PreHeader,
    Header,
    converter,
    Title,
    Footer,
    VueAutonumeric
  },
  data(){
    return {
      converters: [],
      urlApi: 'https://api.bit2me.com/v1/ticker2',
      refreshTimeInterval: 5000,
      api:{}
    }
  },
  created (){
    axios
      .get(this.urlApi)
      .then(response => {
          this.api = response.data.data
      });

    setInterval(() => { axios
      .get(this.urlApi)
      .then(response =>{
          this.api = response.data.data;
      });
    }, this.refreshTimeInterval);
  },
  methods: {
    addConverter(){
      this.converters.push(this.converters.length + 1);
    }
  }
}
</script>

<!--<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>-->
