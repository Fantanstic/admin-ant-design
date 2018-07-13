import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, Input,Radio} from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const Filter = ({
  onAdd,
  onChange,
  search,
  filterTaskType,
  filterAppId,
  filterKeyWord,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
    const handlerSearch=(e)=>{
        const data = {
            ...getFieldsValue(),
        }
        search(data)
    }
    const options = [
        { label:'全部',value:'all'},
        { label: '进行中', value: 'progress' },
        { label: '已暂停', value: 'pause' },
        { label: '已完成', value: 'complete' },
    ];
  return (
      <div>
          <Form layout="inline">
              <FormItem label="状态: ">
                  {
                      getFieldDecorator('state',{
                          initialValue: 'all',
                          rules:[{
                              required: false,
                          }]
                      })
                      (<RadioGroup options={options} />)
                  }
              </FormItem><br/>
              <FormItem label="App Id">
                  {
                      getFieldDecorator('appId',{
                          initialValue: '',
                          rules:[{
                              required: false,
                          }]
                      })
                      ( <Input style={{width:160}}/>)
                  }
              </FormItem><br/>
              <FormItem label="关键词">
                  {
                      getFieldDecorator('keyword',{
                          initialValue: '',
                          rules:[{
                              required: false,
                          }]
                      })
                      ( <Input style={{width:160}}/>)
                  }
              </FormItem><br/>
              <FormItem>
                  <Button size="large" type="ghost" onClick={(e)=>handlerSearch(e)}>查找</Button>
              </FormItem>
          </Form>
    <Row gutter={24}>
      <Col  span= {21}></Col>
      <Col span={3} >
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{padding:10}}>
            <Button size="large" type="ghost" onClick={onAdd}>创建订单</Button>
          </div>
        </div>
      </Col>
    </Row>
      </div>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
}

export default Form.create()(Filter)
