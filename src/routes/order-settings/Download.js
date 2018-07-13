/**
 * Created by cly on 25/06/2018.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal} from 'antd'
const Download = ({
                     DWFile,
                     DWName,
                     form: {
                         getFieldDecorator,
                         validateFields,
                         getFieldsValue,
                     },
                     ...downloadProps
                 })=> {


    return (<Modal {...downloadProps}>
        <div>
            <a style={{display:DWFile?'block':'none'} } download={DWName} href={"data:text/plain,"+DWFile}>点击这里下载</a>

        </div>
    </Modal>)
}

export default Form.create()(Download);