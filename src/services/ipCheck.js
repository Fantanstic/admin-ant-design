/**
 * Created by cly on 25/05/2018.
 */
import { request, config } from 'utils'
const { api } = config
const { ipCheck,UserDetail} = api

export async function ip_check (data) {
    return request({
        url: ipCheck,
        method: 'get',
        data,
    })
}

export async function user_detail(data){
    console.log(UserDetail);
    return request({
       url:UserDetail,
        method: 'get',
        data,
    });
}