<template>
  <router-link class="result-item"
               :to="{ name: 'reportDetail', params: { id: meta.document_id } }"
               tag="div">
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
  </router-link>
</template>

<script>
  export default {
    name: 'report-meta',
    props: {
      'meta': {
        required: true
      }
    },
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
        return require('../../assets/' + type + '.png')
      }
    },
    methods: {}
  }
</script>

<style lang="scss" src="./ReportMeta.scss"></style>
