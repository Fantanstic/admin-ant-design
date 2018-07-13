import { request, config } from 'utils'

const { api } = config
const { Member, MemberOption } = api

export async function query (data) {
  return request({
    url: Member,
    method: 'get',
    data,
  })
}

export async function update (data) {
  return request({
    url: MemberOption,
    method: 'put',
    data,
  })
}

export async function create (data) {

  return request({
    url: Member,
    method: 'post',
    data,
  })
}

export async function remove (data) {
  return request({
    url: MemberOption,
    method: 'delete',
    data,
  })
}
