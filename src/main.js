import Vue from 'vue'
import axios from 'axios'
import ViewUI from 'view-design'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'


// import  './utils/rem'
import './common/font/iconfont.css'
import './common/fontIcon/iconfont.css'
import './common/font-login/iconfont.css'
import './common/font-tab/iconfont.css'
Vue.config.productionTip = false
Vue.use(ViewUI)
import "lib-flexible-computer";


import 'element-ui/lib/theme-chalk/index.css'
import element from './plugins/element'
Vue.use(element)

import * as echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件

Vue.prototype.$axios = axios

import qs from 'qs';
Vue.prototype.$qs = qs;

/* 取色器 */
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
/* 富文本输入器 */
import 'tinymce/skins/content/default/content.min.css'
import 'tinymce/skins/ui/oxide/skin.min.css'
// import 'tinymce/skins/ui/oxide/content.min.css'
//主题
import 'tinymce/themes/silver'
//插件
import 'tinymce/plugins/link' //链接插件
import 'tinymce/plugins/image' //图片插件
import 'tinymce/plugins/media' //媒体插件
import 'tinymce/plugins/table' //表格插件
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/quickbars' //快速栏插件
import 'tinymce/plugins/fullscreen' //全屏插件

import 'tinymce/icons/default/icons'

//本地化
import './utils/tinymce/langs/zh_CN.js'


Vue.prototype.$tinymce = tinymce
Vue.use(VueTinymce)


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
