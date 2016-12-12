<template>
  <div class="detail-container">
    <section class="loading-icon"
    v-if="!meta">
      <img src="~assets/loading.gif">
    </section>
    <template v-else>
      <ReportMeta
        :meta="meta"></ReportMeta>
      <section :class="{ 'report-preview-container': true, fullscreen: isFullScreen }">
        <template v-if="meta.preview">
          <div id="btn-type-info" :class="{ 'report-type-info': true, scroll: isScrolling }">{{ meta.type }}文档预览</div>
          <div id="btn-fullscreen" :class="{ 'report-type-info': true, scroll: isScrolling }"
            @click="isFullScreen = !isFullScreen"></div>
          <iframe :src="meta.preview" id="ifr-container"></iframe>
        </template>
        <img src="~assets/report-preview-miss.png" v-else>
      </section>
      <section class="report-download">
        <a href="javascript:;" class="download-btn"
           @click="isShowDownload = true"
           v-if="!isShowDownload">立即下载</a>
        <div class="report-download-container" v-else>
          <p>请你在“iKnow华科”公众号回复该编号以获取下载链接，文档仅供参考。</p>
          <p class="report-download-id">
            <span>{{ meta.code }}</span>
          </p>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
  import ReportMeta from '../ReportMeta/ReportMeta'
  export default {
    data () {
      return {
        meta: null,
        isShowDownload: false,
        isFullScreen: false,
        isScrolling: false
      }
    },
    components: {
      ReportMeta
    },
    methods: {
      getData (id) {
        this.$http.get('/document_detail/' + id + '/mobi', {emulateJSON: true})
          .then(function (response) {
            let data = response.data
            this.meta = data.result
            console.log(this.meta)
            document.title = '我在"报告菌"上找到了' + data.result.document_name + ',这下不用担心了'
          })
      }
    },
    watch: {},
    created () {
      this.getData(this.$route.params.id)
    }
  }
</script>

<style lang="scss" src="./ReportDetail.scss"></style>
<style lang="scss" src="./ReportDetailScoped.scss" scoped></style>
