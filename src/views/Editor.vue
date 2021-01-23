<template>
<div id="editor"></div>
</template>

<script>

export default {
  name: 'Editor',
  data () {
    return {
      docEditor: {}
    }
  },
  mounted () {
    this.option = this.$route.query.option
    console.log(this.option)
    this.setEditor(this.option)
  },
  methods: {
    setEditor (option) {
      const config = {
        document: {
          fileType: 'docx',
          title: 'an.docx',
          url: option.url
        },
        documentType: 'word',
        editorConfig: {
          callbackUrl: option.callbackUrl,
          lang: 'zh-CN',
          mode: 'edit'
        },
        height: '100%',
        width: '100%'
      }
      console.log(option)
      if (option.history) {
        config.events = {
          onRequestHistory () {
            docEditor.refreshHistory(option.history)
          },
          onRequestHistoryData (event) {
            var ver = event.data
            docEditor.setHistoryData(option.histData[ver])
          },
          onRequestHistoryClose () {
            document.location.reload()
          }
        }
      }
      // eslint-disable-next-line
      const docEditor = new DocsAPI.DocEditor('editor', config)
    }
  },
  watch: {
    option: {
      handler (n, o) {
        console.log('数据变化', n)
        this.setEditor(n)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
