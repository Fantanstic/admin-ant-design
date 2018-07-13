import { request, config } from 'utils'

const { api } = config
const { OrderSetting, OrderSettingOption,OrderSettingNew,OrderSettingPause,OrderSettingReleaseTask,OrderSettingRankTop,OrderQueryIDFA } = api

export async function query (data) {
  return request({
    url: OrderSetting,
    method: 'get',
    data,
  })
}

export async function update (data) {
  return request({
    url: OrderSettingOption,
    method: 'put',
    data,
  })
}

export async function newOnly (data) {
  return request({
    url: OrderSettingNew,
    method: 'put',
    data,
  })
}
export async function pause (data) {
    return request({
        url: OrderSettingPause,
        method: 'patch',
        data,
    })
}

export async function create (data) {

  return request({
    url: OrderSetting,
    method: 'post',
    data,
  })
}

export async function remove (data) {
  return request({
    url: OrderSettingOption,
    method: 'delete',
    data,
  })
}

export async function changeGuideStatus (data) {

  return request({
    url: OrderSettingOption,
    method: 'put',
    data,
  })
}

export async function releaseTask (data) {

    return request({
        url: OrderSettingReleaseTask,
        method: 'post',
        data,
    })
}

export async function rankTop (data) {
    return request({
        url: OrderSettingRankTop,
        method: 'post',
        data,
    })

}

export async function queryIDFA(data) {
    return request({
        url:OrderQueryIDFA,
        method: 'post',
        data,
    })
}