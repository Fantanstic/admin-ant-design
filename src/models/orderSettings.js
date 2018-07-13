/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update ,query,newOnly,pause,releaseTask,rankTop,queryIDFA} from 'services/orderSettings'
import queryString from 'query-string'
import { pageModel } from './common'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'orderSettings',

  state: {
    keywordVisible: true,
    starVisible:false,
    urlVisible:false,
    currentItem: {},
    modalVisible: false,
    confirmLoading: false,
    filterTaskType:'all',
    filterAppId:'',
    filterKeyWord:'',
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    DWFile:null,
    DWName:null,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/main.html') {
          dispatch({
            type: 'query',
            payload: queryString.parse(location.search),
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put,select }) {
      const data = yield call(query, payload)
      const {items} = data.data

      yield put({ type: 'loading',payload:{confirmLoading:false} })

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: items,
            pagination: {
              current: Number(data.data.page) || 1,
              pageSize: Number(payload.pageSize) || 20,
              total: data.data.total,
            },
          },
        })
      }

    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.orderSettings)
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
      const id = yield select(({ orderSettings }) => orderSettings.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * newOnly ({ payload }, { select, call, put }) {

      const data = yield call(newOnly, payload)
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * pause ({ payload }, { select, call, put }) {
        console.log(payload)
        const data = yield call(pause, payload)
        if (data.success) {
            yield put({ type: 'query' })
        } else {
            throw data
        }
    },
    * changeGuideStatus ({ payload }, { select, call, put }) {

      const data = yield call(changeGuideStatus, payload)

      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * releaseTask ({ payload }, { select, call, put }) {

        const data = yield call(releaseTask, payload)

        if (data.success) {
            yield put({ type: 'query' })
        } else {
            throw data
        }
    },
    * rankTop({payload},{select, call, put}){
        const data = yield call(rankTop, payload)
        if(data.success){
            yield put({ type: 'hideConfirm'})
            yield  put({type: 'query'})
        }
        else
        {
            throw  data;
        }
    },

    * changeFilter({payload},{select,call,put}){
        yield put({
            type:'loading',
            payload:payload
        });
      },
    * questIDFA({payload},{select,call,put}){
        const data = yield call(queryIDFA,payload)
        if(data.success)
        {
            var index = 0;
            var txtValue = "";
            data.data.list.forEach((device)=>{
                {
                    index ++;
                    var additional = JSON.parse(device.additional);
                    txtValue = txtValue + index + "," + additional.IDFA + "\n";
                }

            })
            yield put({
               type:'loading',
                payload:{DWFile:txtValue,DWName:payload.id}
            });

        }

    },
  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true}
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showConfirm(state,{payload})
    {
      return {...state,...payload, confirmVisible:true}
    },

    hideConfirm(state)
    {
      return {...state,confirmVisible:false}
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
    changeKeywordVisible(state,{payload}){

      switch (payload.type) {
        case '1':
            return { ...state, keywordVisible: true ,starVisible: false, urlVisible: false}
          case '4':
            return { ...state, keywordVisible: false ,starVisible: false, urlVisible: true}
        default:
            return  { ...state, keywordVisible: false,starVisible: true, urlVisible: false}
      }
    },
    loading (state,{payload}) {
      return { ...state, ...payload }
    },
  },
})
