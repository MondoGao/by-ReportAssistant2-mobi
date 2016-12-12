<template>
  <section>
    <ReportMeta
      :meta="meta"></ReportMeta>
  </section>
</template>

<script>
  import ReportMeta from '../ReportMeta/ReportMeta'
  export default {
    data () {
      return {
        meta: {}
      }
    },
    components: {
      ReportMeta
    },
    methods: {
      getData (id) {
        this.$http.get('/document_detail/' + id + '/mobi', {emulateJSON: true})
          .then(function (response) {
            this.meta = response.data.result
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
