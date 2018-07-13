import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const DataAnalysises = ({
  location, dispatch, dataAnalysis, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,
  } = dataAnalysis

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`dataAnalysis/${modalType}`],
    title: `${modalType === 'create' ? 'Create dataAnalysis' : 'Update dataAnalysis'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `dataAnalysis/${modalType}`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'dataAnalysis/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['dataAnalysis/query'],
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
        type: 'dataAnalysis/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onAdd () {
      dispatch({
        type: 'dataAnalysis/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'dataAnalysis/switchIsMotion' })
    },
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{ marginLeft: 8 }}>Remove</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

DataAnalysises.propTypes = {
    DataAnalysises: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ dataAnalysis, loading }) => ({ dataAnalysis, loading }))(DataAnalysises)
