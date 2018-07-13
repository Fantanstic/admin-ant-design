import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Button,Tag } from 'antd'
import {ip_check} from 'services/ipCheck'
const FormItem = Form.Item

const MainPage =({
    Address,
    userData,
  onIpLookup,
  initFromUrl,
  testDataFun,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...mainPageProps
}) => {

  const handleIpLookUp = (e) => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onIpLookup(data)

  })


      //initFromUrl(window.location.href,userData);
      //<a download="test.txt" href={"data:text/plain," + getContent()}>test</a>
}

  return (
  <div><Form layout="inline">

      <FormItem label="用户ID: ">
          {
              getFieldDecorator('userId',{
                  initialValue: '',
                  rules:[{
                      required: false,
                  }]
              })
              (<Input style = {{width:160}}/>)
          }
      </FormItem>

      <FormItem label="邮件地址：" >
          {getFieldDecorator('ipaddress', {
              initialValue: '',
              rules: [
                  {
                      required: false,
                  },
              ],
          })(  <Input style={{width:160}}/>)}
      </FormItem>

      <FormItem>
          <Button onClick={(e)=>handleIpLookUp(e)} >查询</Button>
      </FormItem>
      <FormItem >
          <Tag style={{display:( Address=='')?'none':''}} key={Address} >
              {Address}
          </Tag>
      </FormItem>

  </Form>{initFromUrl(window.location.href,userData)}{testDataFun(userData)}</div>

  )
}


MainPage.propTypes = {
  form: PropTypes.object,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(MainPage)
