
import App from './App.vue';
import Vue from 'vue';
import vuetify from './plugins/vuetify.js';
import './assets/css/main.css';

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    vuetify
}).$mount('#app');
