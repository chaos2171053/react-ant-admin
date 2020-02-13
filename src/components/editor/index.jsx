import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { Icon, Button } from 'antd';
import Upload from '../upload';

export default class Editor extends React.Component {
  onUploadChange(url) {
    const contentVal = this.editorInstance.getValue();
    this.editorInstance.setValue(ContentUtils.insertText(contentVal, `![alt 图片描述](${url})`));
    this.setState({ imgUlr: url });
  }

  render() {
    const { upload = false, token, ...otherProps } = this.props;

    const extendControls = upload
      ? [
          {
            key: 'antd-uploader',
            type: 'component',
            component: (
              <>
                <Upload type="image" onUploadChange={this.onUploadChange.bind(this)}>
                  <Button
                    type="button"
                    className="control-item button upload-button"
                    data-title="插入图片"
                  >
                    <Icon type="picture" theme="filled" />
                  </Button>
                </Upload>
              </>
            ),
          },
        ]
      : [];
    return (
      <>
        <BraftEditor
          extendControls={extendControls}
          {...otherProps}
          ref={instance => (this.editorInstance = instance)}
        />
      </>
    );
  }
}
