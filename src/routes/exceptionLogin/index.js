/**
 * Created by cly on 26/06/2018.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input,DatePicker } from 'antd'
import { config } from 'utils'
import Filter from './Filter'
import List from './List'

const ExceptionLogin = ({ location, dispatch, loading,exceptionLogin}) => {
    const { data,type,pagination,pageSize} = exceptionLogin
    const FilterProps = {
        query(values){
            dispatch({
                type:"exceptionLogin/query",
                payload:{...values,page:1,
                    pageSize:pageSize}
            })
        }
    }

    const ListProps = {
        data,
        type,
        pagination,
        pageSize,
        onChange (page) {
            const { query, pathname } = location
            dispatch({
                type:"exceptionLogin/query",
                payload: {
                    page: page.current,
                    limit: page.pageSize}});
        },
    }
    return (
        <div>
            <p>一共有{data.length}条数据</p>
            <Filter {...FilterProps}/>
            <List {...ListProps}/>
        </div>
    )
}

ExceptionLogin.propTypes = {
    exceptionLogin: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default connect(({exceptionLogin, loading }) => ({exceptionLogin, loading }))(Form.create()(ExceptionLogin))
