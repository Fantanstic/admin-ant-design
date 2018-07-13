/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update ,query,cashIp,markApplyCall,cashCompleteAll} from 'services/cashApply'
import queryString from 'query-string'
import { pageModel } from './common'
//import { call } from 'redux-saga/effects'
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'cashApply',

  state: {
    currentItem: {},
    modalVisible: false,
    confirmVisible:false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/cash.html') {
          dispatch({
            type: 'query',
            payload: queryString.parse(location.search),
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)

      const {items} = data.data
      console.log(data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: items,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 20,
              total: data.data.total,
            },
          },
        })
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.cashApply)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {

      const data = yield call(update, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

      *cashIp({ payload }, { select, call, put }) {
          const response = yield call(cashIp,{mail:payload})
          if(response.success)
          {
              alert(response.data.country);
          }
          else
          {
              alert("not find");
          }

      },

      *markApply({ payload }, { select, call, put }){
        const response = yield call(markApplyCall);
         if(response.success)
         {
             history.go();
             yield put({type:'hideConfirm'})
            alert("sum:" + (response.data.sum / 1000));
         }
         else
         {
            alert("failed");
         }
      },

      *completeAll({payload},{select,call,put}){
        const response = yield call(cashCompleteAll);
        if(response.success)
        {
            history.go();
            yield put({type:'hideConfirm'})
            alert("更新了"+response.data.sum+"条记录");
        }
        
      }
  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showConfirm (state,{payload}){
      return {...state,...payload,confirmVisible:true}
    },

    hideConfirm(state){
      return {...state,confirmVisible:false}
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },



  },
})
