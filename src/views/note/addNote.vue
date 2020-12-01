<template>
    <div class="main-content">
        <a-spin :spinning="loading">
            <a-form :model="form" ref="ruleForm">
                <a-row type="flex" justify="center">
                    <a-col>
                        <a-form-item name="title" :rules="{required:true,message:'请输入标题'}">
                            <a-input class="title-input" v-model:value="form.title"
                                     size="large" placeholder="请输入标题"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row type="flex" justify="center">
                    <a-col>
                        <a-form-item name="content" :rules="{required:true,message:'请输入内容'}">
                            <div ref="editor" v-show="!visible"></div>
                            <a-input v-show="false" v-model:value="form.content"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row class="btn-content" type="flex" justify="center" :gutter="8">
                    <a-col>
                        <a-button @click="back">返回</a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" @click="submit" :loading="confirmLoading">
                            提交
                        </a-button>
                    </a-col>
                </a-row>
            </a-form>
        </a-spin>
    </div>
</template>

<script lang="ts">
    import Editor from 'wangeditor';
    import {reactive, defineComponent, onMounted, getCurrentInstance, toRefs, ref, onBeforeUnmount} from 'vue';
    import {btoa, atob} from '@/util/helper';
    import {Form, addNote, uploadimg, getNoteDetail, upDataNote} from '@/api/note';
    import config from '@/config';
    import {useRouter} from 'vue-router';
    import {message} from 'ant-design-vue';

    const upLoadUrl = config.get('UPLOADURL');

    export default defineComponent({
        name: 'addNote',
        setup() {
            const ruleForm = ref(null);
            const {push, replace, currentRoute} = useRouter();
            const id = String(currentRoute.value.query.id || '');
            const editor = ref();
            let resultFile = ref<any>(null);
            const state = reactive({
                editor: {} as any,
                titleValue: '',
                widthValue: 0,
                heightValue: 0,
                defaultSlca: 100,
                files: '',
                loading: false,
                isEdit: false,
                noteId: null,
                visible: false,
                confirmLoading: false,
            });
            const form: Form = reactive({
                title: '',
                content: '',
                textValue: '',
                id: null
            });
            onMounted(async () => {
                await init();
                if (id) {
                    getData();
                }
            });
            const getData = () => {
                state.loading = true;
                getNoteDetail({id}).then((res) => {
                    form.title = res.data.title;
                    state.editor.txt.html(atob(res.data.content));
                }).catch((err) => {
                    message.error(err.msg || '获取详情错误');
                }).finally(() => {
                    state.loading = false;
                });
            };
            let instance: any = {
                config: {
                    showLinkImg: false,
                    zIndex: -10,
                    uploadImgServer: '/note/uploadimg',
                    uploadImgShowBase64: true,
                    menus: [
                        'head',  // 标题
                        'bold',  // 粗体
                        'fontSize',  // 字号
                        'fontName',  // 字体
                        'italic',  // 斜体
                        'underline',  // 下划线
                        'strikeThrough',  // 删除线
                        'foreColor',  // 文字颜色
                        'backColor',  // 背景颜色
                        'link',  // 插入链接
                        'list',  // 列表
                        'justify',  // 对齐方式
                        'quote',  // 引用
                        'emoticon',  // 表情
                        'image',  // 插入图片
                        'video',  // 插入视频
                        'code',  // 插入代码
                        'undo',  // 撤销
                        'redo'  // 重复
                    ]
                }
            };
            const init = () => {
                instance = new Editor(editor.value);
                instance.config = Object.assign(instance.config, {});
                instance.config.customUploadImg = customUploadImg;
                state.editor = instance;
                instance.create();
            };
            let customUploadImg = (resultFiles: File, insertImgFn: Function) => {
                if (resultFiles) {
                    resultFile = resultFiles;
                    loadImg(resultFile[0], (url: string) => {
                        insertImgFn(upLoadUrl + url);
                    });
                }
            };

            let path = '';
            const loadImg = (file: File, cb: Function) => {
                let ready = new FileReader();
                /*开始读取指定的Blob对象或File对象中的内容.
                当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.
                同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
                ready.readAsDataURL(file);
                ready.onload = function () {
                    let re = this.result;
                    let img = new Image();
                    img.src = String(re);
                    img.onload = (e: any) => {
                        path = e['path'][0];
                        state.widthValue = e['path'][0]['width'];
                        state.heightValue = e['path'][0]['height'];
                        canvasDataURL(path, cb);
                    };
                };
            };
            const canvasDataURL = (path: string, cb: Function) => {
                try {
                    // 默认按比例压缩
                    let w = state.widthValue * state.defaultSlca / 100,
                        h = state.heightValue * state.defaultSlca / 100;
                    //生成canvas
                    let canvas = document.createElement('canvas');
                    let canvasCtx: any = canvas.getContext('2d');
                    // 创建属性节点
                    let anw: any = document.createAttribute('width');
                    anw.nodeValue = w;
                    let anh: any = document.createAttribute('height');
                    anh.nodeValue = h;
                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);
                    canvasCtx.drawImage(path, 0, 0, w, h);
                    let base64 = canvas.toDataURL('image/jpeg', 1);
                    let file = convertBase64UrlToBlob(base64);
                    sendFile(file, cb);
                } catch (e) {
                    console.log(e);
                    message.error('压缩图片错误：' + e);
                }
            };
            const convertBase64UrlToBlob = (urlData: string) => {
                let arr: string[] = urlData.split(','),
                    str = arr[0],
                    mstr: any = str.match(/:(.*?);/),
                    mime = mstr[1],
                    bstr = atob(arr[1]),
                    n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type: mime});
            };
            const sendFile = (files: Blob, cb: Function) => {
                let data = new FormData();
                data.append('imageData', files, 'filename.jpg');
                uploadimg(data).then((res) => {
                    state.visible = false;
                    cb(res.data.imgUrl);
                }).catch((err) => {
                    message.error(err || '上传错误');
                });
            };
            const back = () => {
                push({
                    name: '/home'
                });
            };
            const submit = () => {
                form.content = btoa(state.editor.txt.html());
                form.textValue = btoa(state.editor.txt.text());
                (ruleForm as any).value
                    .validate()
                    .then(() => {
                        state.confirmLoading = true;
                        if (id) {
                            //编辑
                            form.id = id;
                            upDataNote(form).then(() => {
                                message.success('编辑成功');
                                replace({
                                    name: '/home'
                                });
                            }).catch((err) => {
                                message.error(err.msg || '提交错误');
                            }).finally(() => {
                                state.confirmLoading = false;
                            });
                            return;
                        }
                        addNote(form).then(() => {
                            message.success('添加成功');
                            push({
                                name: '/home'
                            });
                        }).catch((err) => {
                            message.error(err.msg || '提交错误');
                        }).finally(() => {
                            state.confirmLoading = false;
                        });
                    }).catch(() => {
                    message.error('表单未填项完整');
                });
            };
            onBeforeUnmount(() => {
                (instance as Editor).destroy();
                instance = null;
            });
            return {
                ...toRefs(state),
                form,
                ruleForm,
                submit,
                editor,
                back
            };
        }
    });
</script>

<style scoped>
    .title-input {
        border: none;
        width: 50vw;
        height: 40px;
        font-size: 20px;
        border-bottom: 1px solid #ddd;
    }

    .btn-content {
        margin-top: 16px;
    }
</style>
