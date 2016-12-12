<template>
  <div id="app">
    <router-view name="header"></router-view>
    <keep-alive>
      <router-view name="reportList"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from './components/Header/Header'
import ReportList from './components/ReportList/ReportList'

export default {
  name: 'app',
  components: {
    'header-search': Header,
    'report-list': ReportList
  },
  created: function () {
    this.$root._bus = new Vue()
  }
}
</script>

<style lang="scss" src="./scss/App.scss"></style>
