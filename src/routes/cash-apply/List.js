import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Popover,Switch,Button } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import ip_check from 'services/ipCheck'

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

  const handlerCheckIp = (record) =>
  {
      onEditItem({"mail":record.account_name,'status':3})
  }

  const columns = [
    {
      title: '申请ID',
      dataIndex: 'id',
      key: 'id',
      width: 30,
    },{
      title: '用户ID',
      dataIndex: 'user_id',
      key: 'user_id',
      width: 30,

          render:(text)=>{
              return <Link to={'/ip-lookup.html?user_id='+text}>{text}</Link>
          }
    }, {
      title: '提現积分',
      dataIndex: 'creditcashs.credit',
      key: 'creditcashs.credit',
      width: 60,
    }, {
      title: '账户名称',
      dataIndex: 'account_name',
      key: 'account_name',
      width: 60,
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 60,
      render: (text) => { switch(text) {
        case 0:
          return '待處理';
        case 1:
          return <span style={{color:'#00ff00'}}>打款成功</span>;
        case 2:
          return <span style={{color:'#FF0000'}}>打款失敗</span>;
      }}
    },{
      title: '申请时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 60,
    }, {
      title: '操作时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 60,
    },{
          title:'国家',
          dataIndex:'country',
          key:'country',
          width:60,
          render:(text,record)=>{
            if(text == null)
            {
               return <Button onClick={e => handlerCheckIp(record)}>查看国家</Button>
            }
            else
            {
              return <span>{text}</span>;
            }
          }
      },
      {
      title: '配置',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        switch (record.status) {
          case 0:
            return  <div><Button  onClick={e => handleCashClick(record, 1)}>打款成功</Button>
              <Button  onClick={e => handleCashClick(record, 2)}>打款失败</Button></div>

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
