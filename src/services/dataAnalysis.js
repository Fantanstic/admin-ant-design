import { request, config } from 'utils'

const { api } = config
const {MemberDataAnalysis } = api

export async function query (data) {
  return request({
    url: MemberDataAnalysis,
    method: 'get',
    data,
  })
}


