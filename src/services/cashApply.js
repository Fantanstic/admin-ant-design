import { request, config } from 'utils'

const { api } = config
const { Cash, CashOption,ipCheck, markCashApply,CashCompleteAll} = api

export async function query (data) {
  return request({
    url: Cash,
    method: 'get',
    data,
  })
}

export async function update (data) {
  return request({
    url: CashOption,
    method: 'put',
    data,
  })
}

export async function create (data) {

  return request({
    url: Cash,
    method: 'post',
    data,
  })
}

export async function remove (data) {
  return request({
    url: CashOption,
    method: 'delete',
    data,
  })
}

export async function cashIp(data) {
    return request({
        url: ipCheck,
        method: 'get',
        data,
    })
}

export async function markApplyCall() {
    return request({
        url: markCashApply,
        method: 'get',
    });
}

export async function cashCompleteAll() {
    return request({
       url: CashCompleteAll,
        method:'post',
    });
}
