/**
 * Created by cly on 26/06/2018.
 */
import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { queryURL } from 'utils'
import { ExceptLogin} from 'services/exception'
import * as userService from 'services/user'
import { pageModel } from './common'

export default modelExtend(pageModel,{
    namespace: 'exceptionLogin',
    state: {
        type:'all',
        show:'all',
        data:null,
    },

    effects: {
        *query({ payload }, { call, put, select }){

            const data = yield call(ExceptLogin,{page:1,limit:20,...payload})
            let items = [];
            let itemKV = {};
            data.data.data.forEach((udid)=>{
                let item = {};
                item.key = udid;
                item.records = [];
                itemKV[udid] = item;
                item.udid = udid;
                item.user_id = null;
                items.push(item)
            })
            data.data.users.forEach((user)=>{
                let item = itemKV[user.udid];
                item.user_id = user.id;
                item.phone = user.phone;
                item.credit = user.credit_balance;
                item.frozen = user.credit_frozen;
                item.country = user.country;
                item.ip = user.ip;
            });
            data.data.records.forEach((record)=>{
                let item = itemKV[record.udid];
                item.records.push(record);
            });
            yield put({
                type:'loading',
                payload:{
                    data:items,
                    type:data.data.type,
                    pagination: {
                        current: Number(data.data.page) || 1,
                        pageSize: Number(data.data.limit) || 20,
                        total: data.data.total,
                    }
                }})
        }
    },
    reducers: {
        loading(state,{payload})
        {
            return {...state,...payload};
        },
    },
})
