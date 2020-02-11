import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Upload, Icon } from 'antd';

export default class Editor extends React.Component {
  uploadHandler = param => {
    if (!param.file) {
      return false;
    }
  };
  render() {
    const { upload = false, ...otherProps } = this.props;
    const extendControls = upload
      ? [
          {
            key: 'antd-uploader',
            type: 'component',
            component: (
              <Upload accept="image/*" showUploadList={false} customRequest={this.uploadHandler}>
                {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                <button
                  type="button"
                  className="control-item button upload-button"
                  data-title="插入图片"
                >
                  <Icon type="picture" theme="filled" />
                </button>
              </Upload>
            ),
          },
        ]
      : [];
    return (
      <>
        <BraftEditor extendControls={extendControls} {...otherProps} />
      </>
    );
  }
}
