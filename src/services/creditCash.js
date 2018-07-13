import { request, config } from 'utils'

const { api } = config
const { CreditCash, CreditCashOption } = api

export async function query (data) {
  return request({
    url: CreditCash,
    method: 'get',
    data,
  })
}

export async function update (data) {
  return request({
    url: CreditCashOption,
    method: 'put',
    data,
  })
}

export async function create (data) {

  return request({
    url: CreditCash,
    method: 'post',
    data,
  })
}

