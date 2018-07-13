import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Popover,Switch } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
//import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem,newOnly,isMotion, ...tableProps }) => {

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
        onEditItem(record);
    } else if (e.key === '2') {
      confirm({
        title: '确定删除?',
        onOk () {
            onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '规则ID',
      dataIndex: 'id',
      key: 'id',
      width: 30,
    },{
      title: '金额',
      dataIndex: 'money',
      key: 'money',
      width: 30,
      render: (text,record) => {
          return text+'(美元)'
      },
    }, {
      title: '积分',
      dataIndex: 'credit',
      key: 'credit',
      width: 60,
    }, {
      title: '火热中',
      dataIndex: 'hot',
      key: 'hot',
      width: 60,
      render: (text,record) => {
          switch(text){
              case 0:
                  return '是'
              case 1:
                  return '否'
          }
      },
    },{
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 60,
    },{
        title: '修改时间',
        dataIndex: 'updated_at',
        key: 'updated_at',
        width: 60,
    },
  ]

  const getBodyWrapperProps = {
   page: tableProps.location.query.page,
   current: tableProps.pagination.current,
 }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
      {...tableProps}
       className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
       bordered
       scroll={{ x: 1250 }}
       columns={columns}
       simple
       rowKey={record => record.id}
       getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
}

export default List
