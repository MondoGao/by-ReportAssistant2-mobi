<template>
  <div id="app">
    <header-search></header-search>
    <report-list></report-list>
  </div>
</template>

<script>
import Header from './components/Header/Header'
import ReportList from './components/ReportList/ReportList'

export default {
  name: 'app',
  components: {
    'header-search': Header,
    'report-list': ReportList
  }
}
</script>

<style lang="scss" src="./scss/App.scss"></style>
