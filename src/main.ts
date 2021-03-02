import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
router.isReady().then(() => {
  const body = document.querySelector('body');
  const preloader = document.querySelector('.preloader');
  (preloader as any).addEventListener('transitionend', () => {
    (preloader as any).className = 'preloader-hidden';
  });

  (preloader as any).className +=
    ' preloader-hidden-add preloader-hidden-add-active';
  (body as any).style.overflow = '';
  app.mount('#app');
});
export default app;
