<template>
    <div id="components-layout-demo-basic">
        <a-layout>
            <a-layout-header class="main-header">
                <a-menu
                        class="menu"
                        theme="light"
                        mode="horizontal"
                        v-model:selectedKeys="selectedKeys"
                        :style="{ lineHeight: '64px' }"
                >
                    <a-menu-item v-for="tab in componentList" :key="tab.key">
                        {{tab.name}}
                    </a-menu-item>
                </a-menu>
            </a-layout-header>
            <a-layout-content class="main-layout-content">
                <div class="backgound"></div>
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script lang="ts">
  import {reactive, ref, defineComponent} from 'vue';

  export default defineComponent({
    name: 'MainLayout',
    setup(props, context) {
      const selectedKeys = ref<String>('1');
      const componentList = reactive([
        {
          name: '首页',
          component: '',
          key: '1'
        }
      ]);
      return {
        selectedKeys,
        componentList
      };
    }
  });
</script>

<style scoped>
    .ant-layout-header {
        background-color: #fff;
        padding: 0;
    }

    .menu {
        padding: 0 35vw;
    }

    .backgound {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background: url("../../assets/backgound-img.jpg");
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
    .main-header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 40;
    }
    .main-layout-content{
        position: relative;
        padding-top: 64px;
    }
</style>
