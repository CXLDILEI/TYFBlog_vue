<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
  import {defineComponent,onMounted} from 'vue';
  import {useStore} from 'vuex';
  export default defineComponent({
    setup(){
      const store = useStore();
      onMounted(()=>{
        store.dispatch('/user/setUserInfo')
      })
    }
  })
</script>
<style>
#app {
  font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #314659;
}
.main-content{
  min-height: 100vh;
  padding: 16px;
  background: transparent;
  font-size: 15px;
}
.backgound {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: url("./assets/backgound-img.jpg");
  zoom: 1;
  background-color: #ffff;
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-attachment: fixed;
  opacity: .7;
}
.margin-b-default {
  margin-bottom: 8px;
}
</style>
