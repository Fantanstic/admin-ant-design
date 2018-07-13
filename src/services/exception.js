/**
 * Created by cly on 26/06/2018.
 */
import { request, config } from 'utils'

const { api } = config
const { ExceptionLogin,ExceptionOfferwall} = api

export async function ExceptLogin (data) {
    return request({
        url: ExceptionLogin,
        method: 'get',
        data,
    })
}

export async function ExceptOfferwall() {
    return request({
        url: ExceptionOfferwall,
        method: 'get',
        data,
    })
}