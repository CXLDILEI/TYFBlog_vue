<template>
    <div class="public-layout-content">
        <div class="backgound" v-if="showBG"></div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
  import {defineComponent, getCurrentInstance, computed, reactive, toRefs} from 'vue';
  import router from '@/router';
  import {useRouter} from 'vue-router';

  export default defineComponent({
    name: 'PublicLayout',
    setup() {
      const {ctx} = getCurrentInstance() as any;
      const {currentRoute} = useRouter();
      const meta = currentRoute.value.meta;
      const state = reactive({
        showBG: computed(() => {
          return !meta.hideBG;
        })
      });
      return {
        ...toRefs(state),
      };
    }
  });
</script>

<style scoped>
    .public-layout-content {
        position: relative;
    }
</style>
