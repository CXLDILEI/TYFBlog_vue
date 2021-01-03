<template>
    <div class="main-content">
        <a-spin :spinning="loading">
            <a-row type="flex" justify="center">
                <a-col>
                    <a-card :title="data.title" v-if="data" class="card">
                        <template #extra>
                            <a-tooltip placement="top">
                                <template #title>
                                    <span>编辑</span>
                                </template>
                                <EditOutlined @click="toEdit" class="edit-actions"/>
                            </a-tooltip>
                            <a-tooltip placement="top">
                                <template #title>
                                    <span>删除</span>
                                </template>
                                <a-popconfirm
                                        title="确定删除笔记?"
                                        ok-text="删除"
                                        cancel-text="取消"
                                        @confirm="deleteNote"
                                        @cancel="()=>{}"
                                >
                                    <DeleteOutlined class="edit-actions" :style="{'color': 'red'}"/>
                                </a-popconfirm>
                            </a-tooltip>
                        </template>
                        <div v-html="atob(data.content)"></div>
                    </a-card>
                    <!-- 评论 -->
                    <a-card>
                        <h4>评论</h4>
                        <!-- 评论列表 -->
                        <CommentList></CommentList>
                    </a-card>
                </a-col>
            </a-row>
        </a-spin>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, getCurrentInstance, toRefs, reactive} from 'vue';
    import {getNoteDetail, noteDelete} from '@/api/note';
    import {atob} from '@/util/helper';
    import {DeleteOutlined, EditOutlined} from '@ant-design/icons-vue';
    import {useRouter} from 'vue-router';
    import {message} from 'ant-design-vue';
    import CommentList from './components/CommentList.vue';

    interface NoteData {
        content: string
        createTime: string
        imgList: Array<string>
        textValue: string
        title: string
        user: { avatar: string, _id: string, userName: string }
        _id: string
    }

    export default defineComponent({
        name: 'noteDetailBase',
        components: {
            DeleteOutlined,
            EditOutlined,
            CommentList
        },
        setup() {
            const {push, currentRoute} = useRouter();
            const id = String(currentRoute.value.query.id);
            const state = reactive({
                data: null as NoteData | null,
                atob: atob,
                loading: false
            });
            onMounted(() => {
                getData();
            });
            const getData = () => {
                state.loading = true;
                getNoteDetail({id}).then((res) => {
                    state.data = res.data.data;
                }).catch((err) => {
                    message.error(err.msg || '获取详情错误');
                }).finally(() => {
                    state.loading = false;
                });
            };
            const toEdit = () => {
                push({
                    name: '/editeNote',
                    query: {
                        id,
                    }
                });
            };
            const deleteNote = async () => {
                noteDelete({id}).then((res) => {
                    message.success('删除成功');
                    push({
                        name: '/home'
                    })
                }).catch((err) => {
                    message.error(err.msg || '删除失败');
                });

            }
            return {
                ...toRefs(state),
                toEdit,
                deleteNote
            };
        }
    });
</script>

<style scoped>
    .card {
        width: 80vw;
        margin-bottom: 16px;
    }

    .edit-actions {
        padding: 0 12px;
    }
</style>
