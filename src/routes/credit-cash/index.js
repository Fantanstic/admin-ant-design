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

const CreditCash = ({ location, dispatch, creditCash, loading }) => {
  location.query = queryString.parse(location.search)
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,keywordVisible,starVisible } = creditCash
  const { pageSize } = pagination


  const modalProps = {
    item: modalType === 'create' ? {'type':1,'begin_at':moment().format('YYYY-MM-DD HH:mm:ss')} : currentItem,
    keywordVisible: keywordVisible,
    starVisible: starVisible,
    visible: modalVisible,//是否显示
    maskClosable: false,
    confirmLoading: loading.effects['creditCash/update'],
    title: `${modalType === 'create' ? '添加积分提现规则' : '修改积分提现规则'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `creditCash/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'creditCash/hideModal',
      })
    },
    onChange (e){
      dispatch({
        type: 'creditCash/changeKeywordVisible',
        payload: {type:e},
      })
    }
  }

  const listProps = {
    dataSource: list,
      loading: loading.effects['creditCash/query'],
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
    onDeleteItem (id) {
      dispatch({
        type: 'creditCash/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'creditCash/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    newOnly(e,item) {

      dispatch({
        type: 'creditCash/newOnly',
        payload: {id:item.id,status:e?1:0},
      })
    }
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'creditCash/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  const handleRefresh = (state) =>{
    if(state&&state.refresh){
      dispatch({
        type: 'creditCash/query'
      })
    }
  }

  const filterProps = {
    onAdd () {
      dispatch({
        type: 'creditCash/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }
/*  <!--



-->*/
  return (
    <Page inner>
    <Filter {...filterProps} />
    <List {...listProps} />
    {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

CreditCash.propTypes = {
    creditCash: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ creditCash, loading }) => ({ creditCash, loading }))(CreditCash)
