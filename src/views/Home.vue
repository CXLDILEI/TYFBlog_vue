<template>
    <div class="main-content">
        <a-spin :spinning="loading">
            <a-row type="flex" justify="center">
                <a-col :span="12">
                    <a-row v-for="note in noteList" :key="note._id" @click="toDetail(note)">
                        <a-col class="note-item">
                            <div class="note-item-content">
                                <div class="note-item-left">
                                    <p class="time"><span>发布于:</span><span>{{time(note.createTime)}}</span></p>
                                    <a class="note-item-title">{{note.title}}</a>
                                    <p class="note-item-left-content">
                                        {{toAtob(note.textValue)}}
                                    </p>
                                </div>
                                <div class="note-item-right">
                                    <img alt="" :src="getImgsrc(note.imgList)">
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </a-spin>
    </div>
</template>

<script lang="ts">
  import {getNoteList} from '@/api/note';
  import {reactive, defineComponent, onMounted, getCurrentInstance, toRefs} from 'vue';
  import moment from 'moment';
  import {atob} from '@/util/helper';
  import {useRouter} from 'vue-router';
  import {message} from 'ant-design-vue';

  interface NoteItem {
    content: string
    createTime: string
    imgList: Array<string>
    textValue: string
    title: string
    user: { avatar: string, _id: string },
    _id: string
  }

  export default defineComponent({
    setup() {
      const {push} = useRouter();
      let state = reactive({
        noteList: [] as Array<NoteItem>,
        loading: false
      });
      onMounted(() => {
        getData();
      });
      const getData = () => {
        state.loading = true;
        getNoteList({
          pageSize: 10,
          page: 1
        }).then((res) => {
          state.noteList = res.data.list;
        }).catch((err) => {
          message.error(err.msg || '获取列表错误');
        }).finally(() => {
          state.loading = false;
        });
      };
      const time = (time: moment.MomentInput) => {
        return moment(time).format('YYYY-MM-DD');
      };
      const toAtob = (str: string): string => atob(str).replace(/&nbsp;/g, '');
      const getImgsrc = (imgList: Array<{ imgUrl: string }>): string => {
        return imgList.length > 0 ? imgList[0].imgUrl : '';
      };
      const toDetail = (data: NoteItem) => {
        push({
          name: '/noteDetail',
          query: {
            id: data._id
          }
        });
      };
      return {
        ...toRefs(state),
        time,
        toAtob,
        getImgsrc,
        toDetail
      };
    }
  });
</script>
<style scoped>
    .note-item {
        width: 100%;
        padding: 8px;
        opacity: .9;
    }

    .note-item-content {
        display: flex;
        justify-content: space-between;
        padding: 16px;
        background-color: rgb(249, 249, 249);
        border-radius: 4px;
        cursor: pointer;
    }

    .note-item-title {
        display: block;
        font-size: 22px;
        font-weight: 800;
        margin-bottom: 12px;
        cursor: pointer;
    }

    .note-item-right {
        width: 122px;
        height: auto;
        margin-left: 35px;
    }

    .note-item-right img {
        width: 122px;
        height: auto;
        border-radius: 2px;
    }

    .note-item-left {
        max-width: 80%;
    }

    .note-item-left-content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        color: #555;
        font-size: 9pt;

    }

    .time {
        font-size: 7pt;
    }

    .more {
        width: 360px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
        background-color: #f8f8f8;
        border-radius: 4px;
        color: #669;
        cursor: pointer;
        font-size: 14px;
    }
</style>
