<template>
<div id="preview">
</div>
</template>

<script>
export default {
  name: 'PreviewOffice',
  mounted () {
    this.option = this.$route.query.option
    this.setEditor(this.option)
  },
  methods: {
    setEditor (option) {
      const config = {
        document: {
          fileType: 'docx',
          title: 'an.docx',
          url: option.url,
          permissions: {
            comment: false,
            download: true,
            edit: false,
            fillForms: false,
            modifyContentControl: true,
            modifyFilter: true,
            review: false
          }
        },
        documentType: 'word',
        editorConfig: {
          lang: 'zh-CN',
          mode: 'view'
        },
        height: '100%',
        width: '100%'
      }
      // eslint-disable-next-line
      const docEditor = new DocsAPI.DocEditor('preview', config)
    }
  },
  watch: {
    option: {
      handler (n, o) {
        this.setEditor(n)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
#preview {
  height: 400px;
  width: 100vh;
}

</style>
