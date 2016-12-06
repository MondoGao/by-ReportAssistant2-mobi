import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Header from './components/Header/Header'
import ReportList from './components/ReportList/ReportList'

import FastClick from 'fastclick'

document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body)
})

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      components: {
        header: Header,
        content: ReportList
      }
    }
  ]
})

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  router: router
})
