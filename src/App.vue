<template>
  <div id="app">
    <router-view/>
    <scroll-to-top></scroll-to-top>
    <bottom></bottom>
  </div>
</template>

<script>
import bottom from "./components/bottom.vue";
import ScrollToTop from "./components/scrollToTop.vue";
export default {
  name: 'App',
  components:{
    ScrollToTop,
    bottom
  }
}
</script>

<style>
*{
  font-family: "SFMono-Regular",
  Consolas, "Liberation Mono",
  Menlo, Courier, monospace;
  font-size: 18px;
}
</style>
