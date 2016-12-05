import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import FastClick from 'fastclick'

document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body)
})

Vue.use(VueResource)
Vue.use(VueRouter)

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
