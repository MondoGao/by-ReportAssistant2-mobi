<template>
  <div :class="{ 'detail-container': true, scrollable: isSmallScreen }">
    <section class="loading-icon"
    v-show="!meta || isLoading">
      <img src="~assets/loading.gif">
    </section>
    <template v-if="meta">
      <ReportMeta
        :meta="meta"></ReportMeta>
      <section :class="{ 'report-preview-container': true, fullscreen: isFullScreen }">
        <template v-if="meta.preview">
          <div id="btn-type-info" :class="{ 'report-type-info': true, scroll: isScrolling }">{{ meta.type }}文档预览</div>
          <div id="btn-fullscreen" :class="{ 'report-type-info': true, scroll: isScrolling }"
            @touchstart="isFullScreen = !isFullScreen"></div>
          <iframe :src="meta.preview" id="ifr-container"
            @load="previewLoad"></iframe>
        </template>
        <img src="~assets/report-preview-miss.png" v-else>
      </section>
      <section class="report-download">
        <a href="javascript:;" class="download-btn"
           @click="toggleDownload"
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
        isScrolling: false,
        isLoading: true,
        isSmallScreen: false
      }
    },
    components: {
      ReportMeta
    },
    methods: {
      getData (id) {
        this.$http.get('/document_detail/' + id + '/mobi', {emulateJSON: true})
          .then(function (response) {
            /* Todo: dev */
//            response.data.result.preview = response.data.result.preview.replace('report.hustonline.net', '192.168.1.116:8080')

            this.meta = response.data.result
            document.title = '我在"报告菌"上找到了' + this.meta.document_name + ',这下不用担心了'
            if (!this.meta.preview) {
              this.isLoading = false
            }
          })
      },
      isScroll: (function () {
        let _scrollTop = 0
        let deltaTop = 0
        return function (e) {
          deltaTop = e.target.scrollTop - _scrollTop
          _scrollTop = e.target.scrollTop
          if (deltaTop > 10) {
            this.isScrolling = true
          } else if (deltaTop < -4) {
            this.isScrolling = false
          }
        }
      })(),
      previewLoad (e) {
        let ifr = e.path[0]
        let ifrDoc = ifr.contentDocument || ifr.contentWindow.document
        let ifrHead = ifrDoc.getElementsByTagName('head')[0]
        let ifrStyle = document.createElement('style')
        let container = ifrDoc.getElementById('page-container')
        let pf = ifrDoc.getElementById('pf1')
        let scale = container.offsetWidth / pf.offsetWidth
        /* eslint-disable quotes */
        let scaleTxt = "div[id^='pf']{width:" + container.offsetWidth + "px;height:" + pf.offsetHeight * scale + "px}.pc{-webkit-transform: scale(" + scale + ");transform:scale(" + scale + ");}"

        let touchTxt = "#page-container{-webkit-overflow-scrolling: touch;}"
        ifrStyle.setAttribute('type', 'text/css')
        ifrHead.appendChild(ifrStyle)
        ifrStyle.innerHTML = scaleTxt + ' ' + touchTxt

        container.addEventListener('scroll', this.isScroll)

        this.isLoading = false
      },
      toggleDownload () {
        this.isShowDownload = true
      }
    },
    created () {
      this.getData(this.$route.params.id)
    }
  }
</script>

<style lang="scss" src="./ReportDetail.scss"></style>
<style lang="scss" src="./ReportDetailScoped.scss" scoped></style>
