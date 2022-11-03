import { createApp } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import YmapPlugin from 'vue-yandex-maps';
import App from './App.vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires

const settings = {
  apiKey: '2b0c376f-540a-4c64-b28c-b0f9db0f2bd3',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1',
};

const app = createApp(App);

app.use(YmapPlugin, settings);

app.mount('#app');
