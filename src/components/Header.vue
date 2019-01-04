<template>
  <header class="content_header">
    <div class="header_wrap">
      <div ref="header_scroll" class="full_header" v-on:scroll.passive="onScroll">
        <div class="logo_header">
          <img src="../assets/img/bit2me-white.svg" alt="bit2me">
        </div>
        <div class="menu_header">
          <nav class="nav_header">
            <ul id="menu_main">
              <li id="menu_converter">
                <a href="index.html">
                  <span>CONVERTER</span>
                </a>
              </li>
              <li>
                <a href="https://bit2me.com">
                  <span>BIT2ME.COM</span>
                </a>
              </li>
              <li>
                <a href="https://bit2me.com/es/comprar-bitcoins.php">
                  <span>COMPRAR</span>
                </a>
              </li>
              <li>
                <a href="https://bit2me.com/es/vender-bitcoins.php">
                  <span>VENDER</span>
                </a>
              </li>
              <li>
                <a href="https://academy.bit2me.com">
                  <span>ACADEMY</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="title_header">
        <span>Crypto
          <b>converter</b>
        </span>
    </div>
  </header>
</template>

<script>

export default {
  name: "Header",
  props: {},
  methods: {
    onScroll:function(){
      this.$refs.header_scroll.classList.add('header_scroll');
    },
  },
};
</script>


<style>
.header_wrap{
  width: 100%;
  position: fixed;
  background: linear-gradient(to bottom, #09417a 0, #064685 100%);
  justify-content: center;
}
.title_header{
  padding: 8rem 25rem 2rem 25rem;
  text-align: center;
  color: #fff;
  font-size: 35px;
  text-shadow: 1px 1px 1px #000;
}
.content_header {
  background: linear-gradient(to bottom, #09417a 0, #044e97 100%) !important;
}
.header_scroll{
  background-color: #044e97;
}
.full_header {
  display: flex;
  margin: auto;
  vertical-align: center;
  padding: 0 25em 0 25em;
}
.logo_header {
 flex: 2;
}
.logo_header img {
  height: 50px;
  padding-top: 1em;
  /*padding-left: 20%;*/
}
.menu_header {
  flex: 6;
  align-content: flex-end;
  text-align: right;
}
#menu_main {
  vertical-align: middle;
  display: inline-flex;
}
li {
  list-style: none;
  padding: 1em 0 0 3em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
#menu_main a {
  font-style: normal;
  text-transform: none;
  letter-spacing: 0px;
  text-decoration: none;
  color: #ddd;
}
#menu_main a:hover {
  color: #fff;
}
#menu_converter a {
  color: #fff;
  font-weight: 600;
}
#menu_converter a:hover {
  color: #fff;
}

/* Responsive */

</style>
