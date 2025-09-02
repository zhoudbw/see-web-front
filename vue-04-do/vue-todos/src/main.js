import { createApp } from 'vue'
import App from './App.vue'     // 引入vue组件
import router from './router'   // 导入路由配置

createApp( App ).use( router ).mount( '#app' )
