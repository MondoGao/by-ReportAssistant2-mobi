<template>
  <section class="result-container"
    @scroll="loadMore">
    <div class="result-item-container">
      <list-item v-for="item in listData.result" :meta="item"></list-item>
      <div class="load-more-container"
           v-show="!isFirstLoad && !isListEmpty && isListNotEnd">
        <a href="javascript:;" class="load-more-report">努力加载中...</a>
      </div>
      <div class="end-line"
           v-show="!isFirstLoad && !isListEmpty && !isListNotEnd">
        <span class="end-line-info">END</span>
      </div>
    </div>
    <img src="~src/assets/not-found-report.png" class="not-found-report"
         v-show="!isFirstLoad && isListEmpty">
    <div class="mask-layer"
         v-if="isFirstLoad && isLoading">
      <img src="~assets/loading.gif" class="loading-icon">
    </div>
  </section>
</template>

<script>
  import ReportMeta from '../ReportMeta/ReportMeta'

  export default {
    name: 'report-list',
    data () {
      return {
        listData: {},
        isListNotEnd: true,
        isLoading: true,
        postOptions: {
          begin: 1,
          count: 10,
          sortType: 'downloads',
          sortDir: 'desc',
          keyword: ''
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$el.scrollTop = sessionStorage.scrollTop
      })
    },
    beforeRouteLeave (to, from, next) {
      sessionStorage.scrollTop = this.$el.scrollTop
      next()
    },
    computed: {
      isListEmpty: function () {
        return this.isFirstLoad ? true : (this.listData.result.length === 0)
      },
      isFirstLoad: function () {
        return !this.listData.result
      }
    },
    components: {
      'list-item': ReportMeta
    },
    methods: {
      getData: function (searchValue) {
        this.isLoading = true
        searchValue = searchValue || ''
        this.postOptions.keyword = searchValue
        this.$http.post('/list', this.postOptions, {emulateJSON: true})
          .then(function (response) {
            if (response.data.result.length > 0 && response.data.result[0].downloads < response.data.result[response.data.result.length - 1].downloads) {
              response.data.result.reverse()
            }
            if (this.isFirstLoad) {
              this.listData = response.data
            } else {
              this.listData.result = this.listData.result.concat(response.data.result)
            }
            if (this.listData.pageSize <= this.postOptions.begin) {
              this.isListNotEnd = false
            } else {
              this.postOptions.begin++
            }
            this.isLoading = false
          })
          .catch(function (err) {
            this.isLoading = false
            this.listData.result = []
            console.log(err)
          })
      },
      loadMore: function (e) {
        this.$root._bus.$emit('blur')
        if (this.isListNotEnd && !this.isLoading) {
          let itemsHeight = document.getElementsByClassName('result-item-container')[0].scrollHeight
          let containerHeight = e.currentTarget.offsetHeight
          let containerScrollTop = Math.abs(e.currentTarget.scrollTop)
          let diffH = 150
          if (itemsHeight - containerHeight - containerScrollTop < diffH) {
            this.getData(this.postOptions.keyword)
          }
        }
      },
      search (searchValue) {
        this.listData = {}
        this.isListNotEnd = true
        this.postOptions.begin = 1
        this.$nextTick(function () {
          this.getData(searchValue)
        })
      }
    },
    mounted: function () {
      this.getData('')
      let self = this
      this.$root._bus.$on('search', this.search)
      this.$root._bus.$on('reset', function () {
        self.search('')
      })
    }
  }
</script>

<style lang="scss" src="./ReportList.scss"></style>
