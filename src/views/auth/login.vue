<template>
    <div class="content">
        <div class="login-content">
            <a-form
                    class="form"
                    name="custom-validation"
                    ref="formRef"
                    :model="ruleForm"
                    :labelCol="{span: 8}"
            >
                <h3 class="title">登录</h3>
                <a-form-item :wrapper-col="{ span: 24 }" :rules="{required:true,message:'登录名不能为空'}" has-feedback
                             name="userName">
                    <a-input v-model:value="ruleForm.userName" placeholder="请输入登录名" allowClear/>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 24 }" has-feedback name="password"
                             :rules="{required:true,message:'密码不能为空'}">
                    <a-input v-model:value="ruleForm.password" type="password" placeholder="请输入密码" allowClear/>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 24 }">
                    <a-button type="primary" html-type="submit" block @click="toLogin" :loading="loading">
                        提交
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script lang="ts">
    import {reactive, defineComponent, toRefs, getCurrentInstance, ref} from 'vue';
    import {LoginInfo, login} from '@/api/auth';
    import {setToken} from '@/util/auth';
    import {useRouter} from 'vue-router';
    import {message} from 'ant-design-vue';
    import {useStore} from 'vuex'

    export default defineComponent({
        name: "login",
        setup() {
            const {push} = useRouter();
            const formRef = ref(null);
            const store = useStore();
            const state = reactive({
                loading: false,
                ruleForm: {
                    userName: '',
                    password: ''
                } as LoginInfo
            })
            const toLogin = () => {
                (formRef as any).value.validate()
                    .then((value: LoginInfo) => {
                        state.loading = true;
                        login(value).then((res) => {
                            setToken(res.data.token);
                            store.commit('user/setToken', res.data.token);
                            store.commit('user/setInfo', res.data.userInfo);
                            push({
                                name: '/home'
                            });
                        }).catch((err) => {
                            message.error(err.msg || '登录失败')
                        }).finally(() => {
                            state.loading = false;
                        })
                    }).catch(() => {
                    message.error('请填写用户名和密码');
                })
            }
            return {
                ...toRefs(state),
                toLogin,
                formRef
            }
        }
    })
</script>

<style scoped>
    .content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: aliceblue;
    }

    .login-content {
        padding: 2rem;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 0 10px #ddd;
        z-index: 99;
    }

    .form {
        min-width: 340px;
    }

    .title {
        width: 100%;
        text-align: center;
        font-weight: 900;
    }
</style>
