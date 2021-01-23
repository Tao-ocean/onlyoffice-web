import request from '@/utils/request'

export function getFileList () {
  return request({
    url: '/office/list',
    method: 'get'
  })
}
