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
import Confirm from './Confirm'
import Download from './Download'

const OrderSetting = ({ location, dispatch, orderSettings, loading }) => {
  location.query = queryString.parse(location.search)
  const { list, pagination, currentItem, modalVisible, modalType, isMotion,
      selectedRowKeys,keywordVisible,starVisible,confirmLoading,urlVisible,confirmVisible,DWFile,DWName} = orderSettings
  const { pageSize } = pagination
  const { query } = location
  const modalProps = {
    item: modalType === 'create' ? {'type':1,'begin_at':moment().format('YYYY-MM-DD HH:mm:ss')} : currentItem,
    keywordVisible: keywordVisible,
    confirmVisible:confirmVisible,
    starVisible: starVisible,
    urlVisible:urlVisible,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: confirmLoading,
    title: `${modalType === 'create' ? '創建積分牆任務訂單' : '修改積分牆任務訂單'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
          type: 'orderSettings/loading',
          payload: {confirmLoading:true},
      })
      dispatch({
        type: `orderSettings/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'orderSettings/hideModal',
      })
    },
    onChange (e){
      dispatch({
        type: 'orderSettings/changeKeywordVisible',
        payload: {type:e},
      })
    }
  }

  const listProps = {
    dataSource: list,
      loading: loading.effects['orderSettings/query'],
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
        type: 'orderSettings/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'orderSettings/showModal',
        payload: {
          modalType: 'update',
            keywordVisible:item.type == 1?true:false,
            urlVisible:item.type == 4?true:false,
          currentItem: item,
        },
      })
    },
      onRelease (id, dayType) {
        dispatch({
            type: 'orderSettings/releaseTask',
            payload: {
                id: id,
                release: dayType,
            },
        })
    },
    newOnly(e,item) {

      dispatch({
        type: 'orderSettings/newOnly',
        payload: {id:item.id,status:e?1:0},
      })
    },
    pause(e,item) {

        dispatch({
            type: 'orderSettings/pause',
            payload: {id:item.id,status:e?1:0},
        })
    },
    rankTop(status,item){
        if(status == 0)
        {
            dispatch({
                type: 'orderSettings/rankTop',
                payload: {id: item.id,status:status}
            })
        }
        else {
            dispatch({
                type: 'orderSettings/showConfirm',
                payload: {currentItem: item}
            })
        }
    },
      questIDFA(id)
      {
          dispatch({
              type: 'orderSettings/questIDFA',
              payload: {id:id}
          })
      },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'orderSettings/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  const handleRefresh = (state) =>{
    if(state&&state.refresh){
      dispatch({
        type: 'orderSettings/query'
      })
    }
  }

  const filterProps = {
      onAdd () {
          dispatch({
              type: 'orderSettings/showModal',
              payload: {
                  modalType: 'create',
              },
          })
      },
      isMotion,
      search(data)
      {
          dispatch({
             type:'orderSettings/query',
              payload:{
                  ...query,
                  ...data,
              }
          });
      },

      filter: {
          ...query,
      },
  }

    const confirmProps = {
        visible:confirmVisible,
        // item: modalType === 'create' ? {'type':1,'begin_at':moment().format('YYYY-MM-DD HH:mm:ss')} : currentItem,
        // maskClosable: true,
        // confirmLoading: loading.effects['cashApply/update'],
        //  title: `${modalType === 'create' ? '創建積分牆任務訂單' : '修改積分牆任務訂單'}`,
        //  wrapClassName: 'vertical-center-modal',
        onOk(data){
            console.log(data);
            dispatch({
             type: 'orderSettings/rankTop',
             payload: {
                 id: currentItem.id,
                 status:1,
                 rank:data.text,
             }
             })

        },
        onCancel(){
            dispatch({
                type: 'orderSettings/hideConfirm',
                payload: {
                    modalType: 'create',
                },
            })
        }
    }

    const downloadProps = {
      visible:DWFile != null,
      DWFile,
      DWName,
        onOk(data){
            dispatch({
                type: 'orderSettings/loading',
                payload: {
                    DWFile:null,
                    DWName:null,
                }
            })

        },
        onCancel(){
            dispatch({
                type: 'orderSettings/loading',
                payload: {
                    DWFile:null,
                    DWName:null,
                }
            })
        }
    }
/*  <!--



-->*/
  return (
    <Page inner>
    <Filter {...filterProps} />
    <Confirm {...confirmProps}/>
    <List {...listProps} />
        <Download {...downloadProps} />
    {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

OrderSetting.propTypes = {
  OrderSetting: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ orderSettings, loading }) => ({ orderSettings, loading }))(OrderSetting)
