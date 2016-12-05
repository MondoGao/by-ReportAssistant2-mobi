<template>
  <header id="search">
    <a href="#" class="back-home"></a>
    <div class="search-input-field">
      <input type="text" id="search-input" placeholder="搜索学院或文档"
      @focus="toggleSubmit"
      @blur="toggleSubmit"
      @keyup="search">
    </div>
    <a href="javascript:;"
       @click="toggleSubmit"
       :class="{'cancel-btn':true, show: showSubmit}">搜索</a>
  </header>
</template>

<script>
  export default {
    name: 'header-search',
    data () {
      return {
        showSubmit: false
      }
    },
    computed: {
    },
    methods: {
      toggleSubmit: function () {
        this.showSubmit = (document.activeElement === document.getElementById('search-input'))
      },
      search: function (e) {
        if (e.keyCode === 13) {
          this.$root._bus.$emit('search', e.target.value)
        }
      }
    },
    mounted: function () {
    }
  }
</script>

<style lang="scss" src="./Header.scss"></style>
