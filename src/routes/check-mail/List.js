import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Popover,Switch,Button } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
//import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onEditItem,isMotion, ...tableProps }) => {

  const handleCashClick = (record, e) => {
      confirm({
        title: '確定嗎?',
        onOk () {
        //  record.status = e;
          onEditItem({"id":record.id, "status":e})
        },
      })

  }

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
      width: 30,
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 60,
    }, {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 60,
    }, {
      title: '可用积分',
      dataIndex: 'credit_balance',
      key: 'credit_balance',
      width: 60,
    }, {
      title: '冻结积分',
      dataIndex: 'credit_frozen',
      key: 'credit_frozen',
      width: 60,
    },{
      title: '注册时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 60,
    }, {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 60,
    }, {
      title: '配置',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        switch (record.status) {
          case 0:
            return  <div><Button  onClick={e => handleCashClick(record, 1)}>打款成功</Button>
              <Button  onClick={e => handleCashClick(record, 2)}>打款失败</Button>
              </div>
          default:
            return ''
        }
      },
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
