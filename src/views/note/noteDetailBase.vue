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
                                <DeleteOutlined class="edit-actions" :style="{'color': 'red'}"/>
                            </a-tooltip>
                        </template>
                        <div v-html="atob(data.content)"></div>
                    </a-card>
                </a-col>
            </a-row>
        </a-spin>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, getCurrentInstance, toRefs, reactive} from 'vue';
    import {getNoteDetail} from '@/api/note';
    import {atob} from '@/util/helper';
    import {DeleteOutlined, EditOutlined} from '@ant-design/icons-vue';
    import {useRouter} from 'vue-router';
    import {message} from 'ant-design-vue';

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
            EditOutlined
        },
        setup() {
            const {ctx} = getCurrentInstance() as any;
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
                    state.data = res.data;
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
                        id
                    }
                });
            };
            return {
                ...toRefs(state),
                toEdit
            };
        }
    });
</script>

<style scoped>
    .card {
        width: 80vw;
    }

    .edit-actions {
        padding: 0 12px;
    }
</style>
