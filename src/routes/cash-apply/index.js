import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page, Refresh} from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import moment from 'moment'
import Confirm from './Confirm'

const CashApply = ({ location, dispatch, cashApply, loading }) => {
  location.query = queryString.parse(location.search)
  const { list, pagination, currentItem, modalVisible,confirmVisible, modalType, isMotion, selectedRowKeys,menu } = cashApply
  const { pageSize } = pagination


  const modalProps = {
    item: modalType === 'create' ? {'type':1,'begin_at':moment().format('YYYY-MM-DD HH:mm:ss')} : currentItem,
    visible: modalVisible,
    maskClosable: false,
      menu:menu,
    confirmLoading: loading.effects['cashApply/update'],
    title: `${modalType === 'create' ? '創建積分牆任務訂單' : '修改積分牆任務訂單'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `cashApply/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cashApply/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
      loading: loading.effects['cashApply/query'],
      pagination,
      location,
      isMotion,
      onChange (page) {
        const { query, pathname } = location
        dispatch(routerRedux.push({
          pathname,
          search: queryString.stringify({
            ...query,
            page: page.current,
            limit: page.pageSize,
              pageSize:page.pageSize,
          }),
        }))
      },
    onEditItem (item) {
          if(item.status == 3)
          {

              dispatch({type:`cashApply/cashIp`,
                payload:item.mail})
          }
          else
          {
              dispatch({
                  type: `cashApply/update`,
                  payload: item,
              })
          }

    }
  }

  const handleRefresh = (state) =>{
    if(state&&state.refresh){
      dispatch({
        type: 'cashApply/query'
      })
    }
  }

  const filterProps = {
    onMark() {
      /*dispatch({
        type: `cashApply/markApply`,
      })*/
        dispatch({
            type: 'cashApply/showConfirm',
            payload: {
                modalType: 'create',
                menu:'begin',
            },
        })
    },
      batchComplete(){
          dispatch({
              type: 'cashApply/showConfirm',
              payload: {
                  modalType: 'create',
                  menu:'complete',
              },
          })
      }
  }

  const confirmProps = {
    visible:confirmVisible,
      menu:menu,
     // item: modalType === 'create' ? {'type':1,'begin_at':moment().format('YYYY-MM-DD HH:mm:ss')} : currentItem,
     // maskClosable: true,
     // confirmLoading: loading.effects['cashApply/update'],
    //  title: `${modalType === 'create' ? '創建積分牆任務訂單' : '修改積分牆任務訂單'}`,
    //  wrapClassName: 'vertical-center-modal',
    onOk(e){
        console.log(menu);
        if(menu == 'begin')
        {
            dispatch({
                type: `cashApply/markApply`,
            })
        }
        else if(menu == 'complete')
        {
            dispatch({
                type: 'cashApply/completeAll'
            })
        }

    },
      onCancel(){
          dispatch({
              type: 'cashApply/hideConfirm',
              payload: {
                  modalType: 'create',
              },
          })
      }
  }
/*  <!--



-->*/
  return (
    <Page inner>
      <Filter {...filterProps} />
    <List {...listProps} />
    {modalVisible && <Modal {...modalProps} />}
    {confirmVisible && <Confirm {...confirmProps} />}
    </Page>
  )
}

CashApply.propTypes = {
  CashApply: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ cashApply, loading }) => ({ cashApply, loading }))(CashApply)
