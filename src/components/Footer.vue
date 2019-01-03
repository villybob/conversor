<template>
    <footer id = "footer">
    <div>
      <p>
        <a href="https://bit2me.com/aviso-legal#">Legal    </a>|
        <a href="https://bit2me.com/privacidad#">  Privacidad    </a>|
        <a href="https://bit2me.com/terminos-y-condiciones#">    Términos y condiciones</a>
        <br>
        <br>
        Copyright© 2018. All rights reserved. Bit2Me - BitcoinForMe S.L. B54835301. Germán Bernacer, 65, 03203, Elche, Alicante, España. 
      </p>
    </div>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>
<style>
#footer {
  text-align: center;
  color: #a3a3a3;
  background-color: #222;
  padding: 1%;
  flex-shrink: 0;
}
#footer a{
  color: #a3a3a3;
}
#footer a:hover{
  color: #ff8800;
}
</style>