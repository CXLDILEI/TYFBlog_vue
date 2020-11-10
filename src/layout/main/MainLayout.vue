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
                    <a-menu-item v-for="tab in componentList" :key="tab.key" @click="toMenu(tab.component)">
                        {{tab.name}}
                    </a-menu-item>
                </a-menu>
                <div class="userInfo-ctx">
                    <a-row type="flex" :gutter="8">
                        <a-col>
                            <a-avatar size="large" class="avatar" @click="authMenus">
                                登录
                            </a-avatar>
                        </a-col>
                    </a-row>
                </div>
            </a-layout-header>
            <a-layout-content class="main-layout-content">
                <div class="backgound"></div>
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script lang="ts">
    import {reactive, ref, defineComponent, getCurrentInstance} from 'vue';

    export default defineComponent({
        name: 'MainLayout',
        setup(props, context) {
            const selectedKeys = ref<String>('1');
            const {ctx} = getCurrentInstance() as any;
            const componentList = reactive([
                {
                    name: '首页',
                    component: '/home',
                    key: '1'
                },
                {
                    name: '新笔记',
                    component: '/addNote',
                    key: '2'
                }
            ]);
            const toMenu = ((name: string) => {
                ctx.$router.push({
                    name
                })
            })
            const authMenus = () => {
                ctx.$router.push({
                    name: '/login'
                })
            }
            return {
                selectedKeys,
                componentList,
                toMenu,
                authMenus
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


    .main-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 40;
    }

    .main-layout-content {
        position: relative;
        padding-top: 64px;
    }

    .userInfo-ctx {
        position: absolute;
        right: 0;
        top: 0;
    }

    .avatar {
        cursor: pointer;
    }
</style>
