import Vue from 'vue'
import App from './App'
import router from './router'
import semantic from 'semantic'
import axios from 'axios'
import '../node_modules/semantic-ui-css/semantic.min.css'
import './assets/css/index.css'
import './assets/css/typo.css'
import './assets/css/admin_input.css'

// 富文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(semantic)
Vue.use(mavonEditor)

Vue.prototype.$base_url = 'http://localhost:8081';
Vue.prototype.$http=axios;
Vue.config.productionTip = false;

// JWT 用户权限校验，判断 TOKEN 是否在 localStorage 当中
router.beforeEach((to, from, next) => {
  // 获取 JWT Token
  if (to.path.includes('admin')) {
    if (localStorage.getItem('token')) {
      // 如果用户在login页面
      next();
    } else {
      if (name === 'login') {
        next();
      } else {
        next({name: 'login'});
      }
    }
  } else {
    next();
  }

});


// http request 拦截器

axios.interceptors.request.use(
config => {
  if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = localStorage.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data === 401) {
      localStorage.removeItem("token")
      this.$router.go(0)

    }
    return response;
  });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
