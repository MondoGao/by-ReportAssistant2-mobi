<template>
  <div class="result-item"
    @click="jumpDetail">
    <img class="result-filetype-icon"
         :src="fileType">
    <h3 class="filename">{{ meta.document_name }}</h3>
    <p class="file-thumb-info">
      {{ meta.grade }} {{ meta.institute }} {{ meta.class }} {{ meta.uploader }}
    </p>
    <p class="file-download-info">
      已有<span class="download-num">{{ meta.downloads }}</span>人下载
    </p>
    <p class="file-thumb-content"
      v-if="meta.document_thumb">
      {{ meta.document_thumb }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'list-item',
    props: ['meta'],
    data () {
      return {}
    },
    computed: {
      fileType: function () {
        let type = 'zip'
        switch (this.meta.type) {
          case 'doc':
          case 'docx':
            type = 'word'
            break
          case 'ppt':
          case 'pptx':
            type = 'ppt'
            break
          case 'pdf':
            type = 'pdf'
            break
          case 'zip':
          case 'rar':
            type = 'zip'
            break
          default:
            type = 'zip'
        }
        return require('../../../assets/' + type + '.png')
      }
    },
    methods: {
      jumpDetail: function (e) {
        window.sessionStorage.setItem('lastItem', this.getChildrenIndex(e.currentTarget))

        let url = './report_detail.html?document_id='
        let documentId = encodeURIComponent(this.meta.document_id)
        url = url + documentId
        window.location.href = url
      },
      getChildrenIndex: function (el) {
        // IE is simplest and fastest
        if (el.sourceIndex) {
          return el.sourceIndex - el.parentNode.sourceIndex - 1
        }
        // other browsers
        let i = 0
        while (el = el.previousElementSibling) {
          i++
        }
        return i
      }
    }
  }
</script>

<style lang="scss" src="./ListItem.scss"></style>
