<template>
  <header class="content_header">
    <div class="header_wrap">
      <div ref="header_scroll" class="full_header" v-on:scroll.passive="onScroll">
        <div class="logo_header">
          <img src="../assets/img/bit2me-white.svg" alt="bit2me">
        </div>
        <input type="checkbox" id="btn_menu">
      <label for="btn_menu">
        <img class="menu_icon" src="../assets/img/menu.png" alt="Menu">
      </label>
    <nav class="nav_header_responsive">
      <ul id="menu_main_responsive">
        <li id="menu_converter_responsive">
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
      <span>
        Crypto
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
    onScroll: function() {
      this.$refs.header_scroll.classList.add("header_scroll");
    }
  }
};
</script>


<style>
.header_wrap {
  width: 100%;
  position: fixed;
  background: linear-gradient(to bottom, #09417a 0, #064685 100%);
  justify-content: center;
}
.title_header {
  padding: 8rem 0 2rem 0;
  text-align: center;
  color: #fff;
  font-size: 35px;
  text-shadow: 1px 1px 1px #000;
}
.content_header {
  background: linear-gradient(to bottom, #09417a 0, #044e97 100%) !important;
}
.header_scroll {
  background-color: #044e97;
}
.full_header {
  width: 100%;
  max-width: 1170px;
  display: block;
  margin: 0 auto;
}
.logo_header{
  float: left;
}
.logo_header img {
  height: 50px;
  padding-top: 1em;
  /*padding-left: 20%;*/
}
.menu_header {
  float: right;
}
#menu_main {
  vertical-align: middle;
  display: flex;
  justify-content: flex-end;
}
li {
  list-style: none;
  padding: 1em 0 0 2em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
#menu_main a, #menu_main_responsive a {
  font-style: normal;
  text-transform: none;
  letter-spacing: 0px;
  text-decoration: none;
  color: #ddd;
}
#menu_main a:hover, #menu_main_responsive a:hover {
  color: #fff;
}
#menu_converter a, #menu_converter_responsive a {
  color: #fff;
  font-weight: 600;
}
#menu_converter a:hover, #menu_converter_responsive a:hover {
  color: #fff;
}

/* Responsive */
.nav_header_responsive{
  display: none;
}
#btn_menu {
  display: none;
}
header label {
  height: 20px;
  padding: 10px;
  display: none;
}
.menu_icon {
  height: 20px;
}

@media (max-width: 576px){
  .full_header{
    max-width: 576px;
  }
  .title_header {
    display: none;  }
}
@media (max-width: 768px) {
  .full_header{
    max-width: 768;
  }
  header label {
    display: block;
    float: right;
    padding: 2em 1.5em 0 0;
  }
  .nav_header{
    display: none;
  }
  .nav_header_responsive {
    position: absolute;
    width: 100%;
    display: none;
    margin: 4em auto 0 auto;
    background-color: #064685;
  }
  .nav_header_responsive ul {
    display: block;
    margin: 0 auto;
    padding: 0 1em 1em 0;
    width: 100%;
  }
  #btn_menu:checked ~ .nav_header_responsive{
    display: block;
  }
  .full_header {
    padding: 0;
  }
  .logo_header {
    padding-left: 2rem;
  }
  .menu_header {
    flex: none;
    padding-right: 2rem;
  }
  li {
    padding: 1em 0 0 0;
    text-align: center;
  }
  .title_header {
    padding: 1rem 0 1rem 2rem;
    position: relative;
    font-size: 25px;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }
}
@media (max-width: 1200px) {
  .full_header {
    max-width: 970px;
  }
}
@media (max-width: 992px) {
  .logo_header{
    padding-left: 1em;
  }
  .menu_header {
    padding-right: 1em;
}
  .full_header {
    max-width: 768px;
  }
  li {
    padding: 1em 0 0 1.5em;
  }
}
</style>
