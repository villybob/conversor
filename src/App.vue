<template>
  <div id="body_wrap" class="body_wrap">
    <Header/>
    <div class="content_body_wrap">
      <div class="content_body">
        <Title/>
        <div id="converter_template_wrap" class="converter_template_wrap">
          <converter/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Title from './components/Title.vue'
import converter from './components/converter.vue'
import VueAutonumeric from 'vue-autonumeric'

require('@/../dist/css/styles.css');

export default {
  name: 'App',
  components: {
    Header,
    converter,
    Title,
    VueAutonumeric
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
