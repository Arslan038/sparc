import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import BootstrapVue from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import store from './store'
import firebase from 'firebase'
import StarRating from 'vue-star-rating'
import Clipboard from 'v-clipboard'
import 'native-toast/dist/native-toast.css'

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
   //console.log(Vals) requiresAuth &&requiresAuth &&
  if ( requiresAuth &&  !localStorage.getItem("loggedUser")) {
    
      next('/login')
  } else if (requiresAuth && localStorage.getItem("loggedUser")) {
      next()
  } else {
      next()
  }
})

var firebaseConfig = {
  apiKey: "AIzaSyCqbvVcCTFMGK3AMGQ--zp0TWV8Jknrq5w",
  authDomain: "sparc-bd7b1.firebaseapp.com",
  databaseURL: "https://sparc-bd7b1.firebaseio.com",
  projectId: "sparc-bd7b1",
  storageBucket: "sparc-bd7b1.appspot.com",
  messagingSenderId: "742857539802",
  appId: "1:742857539802:web:ffeb73106f5a1293"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

// register globally
Vue.component('multiselect', Multiselect)
Vue.component('star-rating', StarRating)

 
Vue.use(Clipboard)
Vue.use(BootstrapVue)

Vue.config.productionTip = false;

Vue.use(NowUiKit);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
