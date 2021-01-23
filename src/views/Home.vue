<template>
  <div class="monitor-report">
    <h1>试一试</h1>
    <Upload ref="upload" accept=".doc,.docx" :action="action" :headers="header" :format="['doc','docx']"
            :on-success="handleSuccess"
            :show-upload-list="false" :before-upload="handleBeforeUpload" :on-format-error="handleFormatError">
      <Button :loading="loading" class="up-class">上传</Button>
      <span>（文件格式为：doc,docx）</span>
    </Upload>
    <div>
      <monitor-office :option="option"></monitor-office>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import MonitorOffice from '@/components/MonitorOffice'
export default {
  components: { MonitorOffice },
  data () {
    return {
      header: {
        Authorization: `bearer ${sessionStorage.getItem('token')}`
      },
      action: axios.defaults.baseURL + '/report/document/template',
      file: null,
      loading: false,
      option: {
        url: '',
        isEdit: false,
        fileType: '',
        title: ''
      },
      pageLoading: false
    }
  },
  methods: {
    init () {
      this.GetMonitorReport()
    },
    // 上传文件的格式验证
    handleFormatError (file) {
      this.$Message.warning(file.name + '格式不正确')
      this.loading = false
    },
    // 上传之前
    handleBeforeUpload (file) {
      this.file = file
      this.onUpload()
      return false
    },
    onUpload () {
      this.loading = true
      const _baseURL = axios.defaults.baseURL
      this.action = `${_baseURL}/report/document/template`
      setTimeout(() => {
        this.$refs.upload.post(this.file)
      }, 1000)
    },
    // 导入成功时
    handleSuccess (res) {
      this.loading = false
      if (res.status) {
        this.$Message.success('上传成功')
        // 这里重新上传文件，only office不会覆盖，所以先刷新解决
        // location.reload();
        this.GetMonitorReport()
      }
    }
    // 获取项目下监察报告模板
    // GetMonitorReport () {
    //   this.pageLoading = false
    //   GetMonitorReport().then(res => {
    //     if (res.status) {
    //       const data = res.data
    //       if (data) {
    //         this.option = {
    //           url: data.fileViewPath,
    //           fileType: data.fileType,
    //           title: '',
    //           isEdit: false
    //         }
    //       }
    //       this.pageLoading = true
    //     }
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
.monitor-report {
  .up-class {
    margin-bottom: 10px;
  }

  .office {
    height: 100vh;
  }
}
</style>
