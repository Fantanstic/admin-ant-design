import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

    const columns = [
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            width: 60,
        }, {
            title: '日活',
            dataIndex: 'active',
            key: 'active',
            width: 60,
        }, {
            title: '邀请日活',
            dataIndex: 'active_invite',
            key: 'active_invite',
            width: 60,
        }, {
            title: '总新增',
            dataIndex: 'new',
            key: 'new',
            width: 60,
        }, {
            title: '邀请新增',
            dataIndex: 'invite_new',
            key: 'invite_new',
            width: 60,
        }, {
            title: '总任务完成数',
            dataIndex: 'total_tasks',
            key: 'total_tasks',
            width: 60,
        }, {
            title: '邀请用户完成任务数',
            dataIndex: 'invite_tasks',
            key: 'invite_tasks',
            width: 60,
        }, {
            title: '做任务人数',
            dataIndex: 'do_task_user',
            key: 'do_task_user',
            width: 60,
        },{
            title: '平均做任务数',
            dataIndex: 'avg_task',
            key: 'avg_task',
            width: 60,
        },
        {
            title: '做Fyber任务人数',
            dataIndex: 'do_fyber_user',
            key:'do_fyber_user',
            width: 60,
        },
        {
            title: '完成Fyber任务数',
            dataIndex: 'fyber_tasks',
            key: 'fyber_tasks',
            width: 60,
        },
        {
            title: '完成任务总积分',
            dataIndex: 'task_credits',
            key: 'task_credits',
            width: 60,
        },
        {
            title: '完成Fyber总积分',
            dataIndex: 'fyber_credits',
            key: 'fyber_credits',
            width: 60,
        },
        {
            title: '总积分',
            dataIndex: 'total_credits',
            key: 'total_credits',
            width: 60,
        },

        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 60,
        },
    ]
  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
      {...tableProps}
      className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.id}
      components={{
        body: { wrapper: isMotion ? AnimateBody : CommonBody },
      }}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
