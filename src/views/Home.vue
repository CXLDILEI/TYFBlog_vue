<template>
    <div class="main-content">
    </div>
</template>

<script lang="ts">
  import {getNoteList} from '@/api/note';
  import {reactive, ref, defineComponent, onMounted} from 'vue';

  export default defineComponent({
    setup(props, context) {
      onMounted(() => {
        getNoteList({
          pageSize:10,
          page:1
        }).then((res)=>{
          console.log(res);
        })
      });
    }
  });
</script>
