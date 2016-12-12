<template>
  <header id="search">
    <div :class="{ catalog: true, 'show-catalog': isShowCatalog }"
      @click="isShowCatalog = !isShowCatalog">
      <transition name="fade">
        <div class="black-layout" v-show="isShowCatalog">
          <transition name="slide">
            <div v-show="isShowCatalog">
              <transition-group tag="ul" name="list">
                <li v-for="(value, index) of catalog"
                    :key="index"
                    v-show="isShowCatalog"
                    :style="{ transition-delay: 0.3 * index + 's' }"
                    @click="clickCatalog">{{ value }}</li>
              </transition-group>
            </div>
          </transition>
        </div>
      </transition>分类<!--
      --></div>
    <div class="search-input-field">
      <input type="text" id="search-input" placeholder="搜索学院或文档"
      @focus="toggleSubmit"
      @blur="toggleSubmit"
      @keyup.enter="search"
      v-model="searchStr">
    </div>
    <div
       @click="toggleSubmit(), search()"
       :class="{'search-btn':true, show: showSubmit}">搜索</div>
  </header>
</template>

<script>
  export default {
    name: 'header-search',
    data () {
      return {
        showSubmit: false,
        searchStr: '',
        isShowCatalog: false,
        catalog: [
          '公选课',
          '实验报告',
          '自动化学院',
          '电子信息与通信学院',
          '软件学院',
          '光学与电子信息学院',
          '计算机科学与技术学院',
          '电气与电子工程学院',
          '材料科学与工程学院',
          '生命科学与技术学院',
          '化学与化工学院',
          '物理学院',
          '数学与统计学院',
          '新闻与信息传播学院',
          '建筑与城市规划学院',
          '土木科学与工程学院',
          '能源与动力工程学院'
        ]
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
      },
      clickCatalog (e) {
        this.searchStr = e.srcElement.innerText
        this.search()
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
