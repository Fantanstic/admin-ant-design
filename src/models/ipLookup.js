/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update ,query,newOnly,pause } from 'services/orderSettings'
import queryString from 'query-string'
import { pageModel } from './common'
import { ip_check,user_detail} from 'services/ipCheck'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'ipLookup',

  state: {
    ipaddress:'',
      data:'1234',
  },

  effects: {

    * lookup ({ payload = {} }, { call, put,select }) {
      //const data = yield call(query, payload)
        const response = yield call(user_detail,{mail:payload.ipaddress,userId:payload.userId})
        console.log(response);
        if(response.success)
        {
            yield put({
                type: 'queryIpaddress',
                payload: {
                    userData:response.data
                },
            })
        }
        else
        {
            yield put({
                type: 'queryIpaddress',
                payload: {
                    userData:null
                },
            })
        }
    }
  },

  reducers: {
    queryIpaddress (state, { payload }) {
      return { ...state, ...payload }
    },
  },
})
