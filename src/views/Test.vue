<template>
<div>
  <el-upload
    class="upload-demo"
    action="http://localhost:9520/office/save"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
  <hr>
  <el-table :data="fileList" style="width: 100%">
    <el-table-column prop="url" label="文件路径" align="center" width="380"></el-table-column>
    <el-table-column label="操作" width="340">
      <template v-slot="scope">
        <el-button type="success" @click="preview(scope.row)">预览</el-button>
        <el-button type="primary" @click="editor(scope.row)">编辑</el-button>
      </template>
   </el-table-column>
  </el-table>
</div>
</template>

<script>
import { getFileList } from '@/api/file'
import { getMessage } from '@/api/edit'

export default {
  name: 'Test',
  data () {
    return {
      fileList: []
    }
  },
  mounted () {
    this.getFileList()
  },
  methods: {
    getFileList () {
      getFileList().then(res => {
        this.fileList = res.data
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    preview (row) {
      this.$router.push({
        path: '/preview',
        query: {
          option: row
        }
      })
    },
    editor (row) {
      console.log(row)
      getMessage(row.id).then(res => {
        const option = {
          url: row.url,
          callbackUrl: res.data.callbackUrl + row.fileId,
          history: res.data.history,
          histData: res.data.histData
        }
        this.$router.push({
          path: '/edit',
          query: {
            option: option
          }
        })
      })
    },
    another (row) {
      console.log(row)
      this.$router.push({
        path: '/another'
      })
    }
  }
}
</script>

<style scoped>
.office {
  height: 100vh;
}
</style>
