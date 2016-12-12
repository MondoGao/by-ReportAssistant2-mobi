<template>
  <header id="search">
    <a href="#" class="back-home"></a>
    <div class="search-input-field">
      <input type="text" id="search-input" placeholder="搜索学院或文档"
      @focus="toggleSubmit"
      @blur="toggleSubmit"
      @keyup.enter="search"
      v-model="searchStr">
    </div>
    <div
       @click="toggleSubmit(), search()"
       :class="{'cancel-btn':true, show: showSubmit}">搜索</div>
  </header>
</template>

<script>
  export default {
    name: 'header-search',
    data () {
      return {
        showSubmit: false,
        searchStr: ''
      }
    },
    computed: {
    },
    methods: {
      toggleSubmit: function () {
        this.showSubmit = (document.activeElement === document.getElementById('search-input'))
      },
      search: function () {
        this.$router.push({
          path: '/search'
        })
        this.$root._bus.$emit('search', this.searchStr)
      }
    },
    mounted: function () {
      var self = this
      this.$root._bus.$on('blur', function () {
        document.getElementById('search-input').blur()
        self.toggleSubmit()
      })
      this.$root._bus.$on('reset', function () {
        self.searchStr = ''
      })
    }
  }
</script>

<style lang="scss" src="./Header.scss"></style>
