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
import moment from 'moment';

const Members = ({ location, dispatch, member, loading}) => {
  location.query = queryString.parse(location.search)
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = member
  //const { pageSize } = pagination


  const modalProps = {
    item: modalType === 'create' ? {'type':1,'begin_at':moment().format('YYYY-MM-DD HH:mm:ss')} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['member/update'],
    title: `${modalType === 'create' ? '創建積分牆任務訂單' : '修改積分牆任務訂單'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `member/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'member/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
      loading: loading.effects['member/query'],
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
            pageSize: page.pageSize,
          }),
        }))
      },
    onEditItem (item) {

      dispatch({
        type: `member/update`,
        payload: item,
      })
    }
  }

  const handleRefresh = (state) =>{
    if(state&&state.refresh){
      dispatch({
        type: 'member/query'
      })
    }
  }

  const filterProps = {
    onAdd () {
      dispatch({
        type: 'member/showModal',
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
    <List {...listProps} />
    {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

Members.propTypes = {
  Members: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ member, loading }) => ({ member, loading }))(Members)
