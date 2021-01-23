import request from '@/utils/request'

export function getMessage (id) {
  return request({
    url: '/test/editor/' + id,
    method: 'get'
  })
}
