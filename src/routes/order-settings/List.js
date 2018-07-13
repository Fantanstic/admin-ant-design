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

const List = ({ onDeleteItem, onEditItem,newOnly,pause,isMotion,onRelease,rankTop,questIDFA, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
        onEditItem(record);
    } else if (e.key === '200') {

    }else if(e.key === '2'){
        //提示
        confirm({
            title: '确定释放?',
            onOk () {
                onRelease(record.id)
            },
        })
    }else if(e.key === '3'){
        //提示
        confirm({
            title: '确定释放?',
            onOk () {
                onRelease(record.id, 'allday')
            },
        })
    }else if(e.key === '4'){
        questIDFA(record.id);
    }
  }

  const handlerRankTop = (record,e) =>{
    rankTop(1,record);
  }

  const handlerCancelRankTop = (record,e)=>{
      rankTop(0,record);
  }

  const columns = [
      {
          title: '排序操作',
          dataIndex: 'client_rank',
          key: 'client_rank',
          width: 100,
          render: (text,record) => {

              return  <div>
                  {text == null?null:<Button  onClick={e => handlerCancelRankTop(record, 1)}>撤销置顶</Button>}

                  <Button  onClick={e => handlerRankTop(record, 2)}>置顶</Button>
              </div>

          }
      },

    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
      width: 30,
    },{
      title: '应用ID',
      dataIndex: 'store_id',
      key: 'store_id',
      width: 130,
          render:(text) =>
          {
              function click() {
                  window.open('https://itunes.apple.com/us/app/id'+text+'?mt=8');
              }
              return <a onClick={click}>{text}</a>
          }
    },{
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 80,
      render: (src,record) =>
      {
          function click() {
              window.open('https://itunes.apple.com/us/app/id'+record.store_id+'?mt=8');
          }
          return (<img src={(src)} onClick={click}/>)
      }


    }, {
      title: '任务类型',
      dataIndex: 'type',
      key: 'type',
      width: 60,
      render: (text,record) => {
        switch(text){
          case 1:
            return 'ASO任务';
          case 2:
            return '用户评论任务';
          case 3:
            return '系统评论任务';
          case 4:
              return '直接下载任务';
        }
      },
    }, {
      title: '需求量',
      dataIndex: 'total',
      key: 'total',
      width: 60,
    }, {
      title: '已释放量',
      dataIndex: 'now_release',
      key: 'now_release',
      width: 60,
    },{
      title: '每日释放量',
      dataIndex: 'release',
      key: 'release',
      width: 60,
    },{
      title: '积分数',
      dataIndex: 'credit',
      key: 'credit',
      width: 60,
    }, {
      title: '完成量',
      dataIndex: 'done',
      key: 'done',
      width: 60,
      render: (text,record) => (<span style={{color: text==record.total?'#00ff22':'#ff0000'}}>{text}</span>),
    },
    {
      title: '国家',
      dataIndex: 'country',
      key: 'country',
      width: 60,
    },
    {
      title: '关键词',
      dataIndex: 'keyword',
      key: 'keyword',
      width: 60,
      render: (text,record) => {return record.type !=1?'/':text},
    },
    {
      title: '星级',
      dataIndex: 'star',
      key: 'star',
      width: 60,
      render: (text,record) => {return record.type ==1?'/':text},
    }, {
      title: '任务开始时间',
      dataIndex: 'begin_at',
      key: 'begin_at',
      width: 60,
    },
      {
      title: '新用户任务',
      dataIndex: 'difference_show',
      key: 'difference_show',
      width: 60,
      render: (text,record) => (<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={text?true:false} onChange={(e)=>{newOnly(e,record)}} />),
    }, {
      title: '状态',
      dataIndex: 'pause',
      key: 'pause',
      width: 60,
      render: (text, record) => (
          <Switch checkedChildren="暂停" unCheckedChildren="正常" defaultChecked={text ? true : false} onChange={(e) => {
              pause(e, record)
          }}/>),
    },
      {
          title: '配置',
          key: 'operation',
          width: 100,
          render: (text, record) => {
              return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{key: '1', name: '修改订单'},{key: '2', name: '释放一天'},{key: '3', name: '释放所有'},{key:'4',name:'下载IDFA'}]}/>//,{ key: '2', name: '删除订单' } 去掉刪除功能
          }
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
       scroll={{x:1250,y:1500 }}
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
