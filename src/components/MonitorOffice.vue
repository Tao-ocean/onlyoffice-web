<template>
  <div class="monitorOffice">
  </div>
</template>

<script>
import { handleDocType } from '@/utils/docType'
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      doctype: ''
    }
  },
  mounted () {
    if (this.option.url) { this.setEditor(this.option) }
  },
  methods: {
    setEditor (option) {
      this.doctype = handleDocType(option.fileType)
      // office配置参数
      const config = {
        document: {
          fileType: option.fileType,
          key: '',
          title: option.title,
          permissions: {
            comment: false,
            download: false,
            modifyContentControl: true,
            modifyFilter: true,
            print: false,
            edit: option.isEdit// 是否可以编辑: 只能查看，传false
            // "fillForms": true,//是否可以填写表格，如果将mode参数设置为edit，则填写表单仅对文档编辑器可用。 默认值与edit或review参数的值一致。
            // "review": true //跟踪变化
          },
          url: option.url
        },
        documentType: this.doctype,
        editorConfig: {
          callbackUrl: option.editUrl, // "编辑word后保存时回调的地址，这个api需要自己写了，将编辑后的文件通过这个api保存到自己想要的位置
          lang: 'zh', // 语言设置
          customization: {
            autosave: false, // 是否自动保存
            chat: false,
            comments: false,
            help: false,
            // "hideRightMenu": false,//定义在第一次加载时是显示还是隐藏右侧菜单。 默认值为false
            logo: {
              image: 'https://file.iviewui.com/icon/viewlogo.png',
              imageEmbedded: 'https://file.iviewui.com/icon/viewlogo.png'
            },
            spellcheck: true// 拼写检查
          }
        },
        width: '100%',
        height: '100%'
      }
      // eslint-disable-next-line
      const docEditor = new DocsAPI.DocEditor('monitorOffice', config)
    }
  },
  watch: {
    option: {
      handler: function (n, o) {
        this.setEditor(n)
        this.doctype = handleDocType(n.fileType)
      },
      deep: true
    }
  }
}
</script>
