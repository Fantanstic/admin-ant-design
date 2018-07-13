/**
 * Created by cly on 26/06/2018.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import AnimTableBody from 'components/DataTable/AnimTableBody'

const List=({data,type,...tableProps})=>{
    const columnsAll = [
        {
            title: 'udid',
            dataIndex: 'udid',
            key: 'udid',
            width: 50,
        },
        {
            title: '用户ID',
            dataIndex: 'user_id',
            key: 'user_id',
            width:50,
        },
        {
            title: '',
            dataIndex:'other',
            key: 'other',
            width:600,
        },
    ]
    const columnsRegister = [
        {
            title: 'udid',
            dataIndex: 'udid',
            key: 'udid',
            width: 50,
        },
        {
            title: '用户ID',
            dataIndex: 'user_id',
            key: 'user_id',
            width:50,
            render:(text)=>{
                return <Link to={'/ip-lookup.html?user_id='+text}>{text}</Link>
            }
        },
        {
            title: '国家',
            dataIndex: 'country',
            key: 'country',
            width: 50,
        },
        {
            title: '手机',
            dataIndex: 'phone',
            key: 'phone',
            width:50,
        },
        {
            title: '积分',
            dataIndex: 'credit',
            key: 'credit',
            width: 50,
        },
        {
            title: '冻结积分',
            dataIndex: 'frozen',
            key: 'frozen',
            width:50,
        },
        {
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip',
            width:50,
        }
    ];

    const expandedRowRender = (e) => {
        let records = e.records;
        const columns = [
            { title: '类型', dataIndex: 'exception', key: 'exception',
                render:(text)=>{
                    if(text == 0)
                        return <span style={{color:'#00ff00'}}>正常</span>;
                    if(text == 1)
                        return <span style={{color:'#FF0000'}}>越狱</span>;
                    if(text == 2)
                        return <span style={{color:'#FF0000'}}>VPN</span>;
                    if(text == 3)
                        return <span style={{color:'#FF0000'}}>时区</span>;
                    if(text == 4)
                        return <span style={{color:'#FF0000'}}>国家</span>;
                }},
            { title: 'ip', dataIndex: 'ip', key: 'ip' },
            { title: 'ip国家', dataIndex: 'ipregion', key: 'ipregion' },
            { title: '是否越狱', dataIndex: 'jailbreak', key: 'jailbreak'},
            { title: '语言', dataIndex: 'language', key: 'language' },
            { title: '时区', dataIndex: 'timezone', key: 'timezone' },
            { title: '登录时间', dataIndex: 'created_at', key: 'created_at' },
        ];

        return (
            <Table
                columns={columns}
                dataSource={records}
                pagination={false}
            />
        );
    };

    const getBodyWrapperProps = {
        page: tableProps.pagination.total / tableProps.pagination.pageSize,
        current: tableProps.pagination.current,
    }

    const getBodyWrapper = (body) => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }
//
    return (<Table {...tableProps}
        className={classnames({ [styles.table]: true})}
        dataSource={data}
        columns={type=='all'?columnsAll:columnsRegister}
                   expandedRowRender={expandedRowRender}
                   getBodyWrapper={getBodyWrapper}

    />)

}

export default List