import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Header from './components/Header/Header'
import ReportList from './components/ReportList/ReportList'
import ReportMeta from './components/ReportMeta/ReportMeta'
import ReportDetail from './components/ReportDetail/ReportDetail'

import FastClick from 'fastclick'

document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body)
})

Vue.use(VueResource)
Vue.use(VueRouter)

let vm

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      components: {
        header: Header,
        reportList: ReportList
      },
      beforeEnter: (to, from, next) => {
        if (from.path === '/search') {
          vm._bus.$emit('reset')
        }
        next()
      }
    },
    {
      path: '/reportDetail/:id',
      name: 'reportDetail',
      components: {
        header: ReportDetail
      }
    },
    {
      path: '/search',
      name: 'search',
      components: {
        header: Header,
        reportList: ReportList
      }
    }
  ]
})

/* eslint-disable no-new */
vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  router: router
})
