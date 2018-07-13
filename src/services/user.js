import { request, config } from 'utils'

const { api } = config
const { user,userInfo } = api

export async function query (params) {
  return request({
    url: userInfo,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
