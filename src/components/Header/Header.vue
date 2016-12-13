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
                    :key="index + 1"
                    v-show="isShowCatalog"
                    :style="{ transitionDelay: 0.02 * index + 's' }"
                    @click="clickCatalog"
                    :data-search="value.searchStr">{{ value.name }}</li>
              </transition-group>
            </div>
          </transition>
        </div>
      </transition>分类</div>
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
  let Catalog = function (name, searchStr) {
    this.name = name
    this.searchStr = searchStr
  }

  export default {
    name: 'header-search',
    data () {
      return {
        showSubmit: false,
        searchStr: '',
        isShowCatalog: false,
        catalog: [
          new Catalog('全部', ''),
          new Catalog('公选课', '公选课'),
          new Catalog('实验报告', '实验报告'),
          new Catalog('自动化学院', '自动化学院'),
          new Catalog('电子信息与通信学院', '电子信息与通信学院'),
          new Catalog('软件学院', '软件学院'),
          new Catalog('光学与电子信息学院', '光学与电子信息学院'),
          new Catalog('计算机科学与技术学院', '计算机学院'),
          new Catalog('电气与电子工程学院', '电气与电子工程学院'),
          new Catalog('材料科学与工程学院', '材料科学与工程学院'),
          new Catalog('生命科学与技术学院', '生命科学与技术学院'),
          new Catalog('化学与化工学院', '化学与化工学院'),
          new Catalog('物理学院', '物理学院'),
          new Catalog('数学与统计学院', '数学与统计学院'),
          new Catalog('新闻与信息传播学院', '新闻与信息传播学院'),
          new Catalog('建筑与城市规划学院', '建筑与城市规划学院'),
          new Catalog('土木科学与工程学院', '土木科学与工程学院'),
          new Catalog('能源与动力工程学院', '能源与动力工程学院')
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
        this.searchStr = e.srcElement.dataset.search
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
