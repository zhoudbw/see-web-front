import {createApp} from "vue"
import App from "./App.vue" // 引入vue组件
import router from "./router" // 导入路由配置
import Mock from "./mock";
import store from "./vuex/store"; //  引入vuex实例
Mock.start()

const app = createApp( App )
app.use( router )
app.use( store )
app.mount( "#app" )
