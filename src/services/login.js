import { request, config } from 'utils'

const { api } = config
const { userLogin } = api

export async function login (data) {
  return request({
    url: userLogin,
    method: 'post',
    data,
  })
}
export async function qqlogin (data) {
    return request({
        url: userLogin,
        method: 'get',
        data,
    })
}