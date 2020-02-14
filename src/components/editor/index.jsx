import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { Icon, Button } from 'antd';
import Upload from '../upload';
import Markdown from 'braft-extensions/dist/markdown';

const options = {
  // includeEditors: [], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  // excludeEditors: []  // 指定该模块对哪些BraftEditor无效
};
BraftEditor.use(Markdown(options));

export default class Editor extends React.PureComponent {
  onUploadChange(url) {
    const contentVal = this.editorInstance.getValue();
    this.editorInstance.setValue(ContentUtils.insertText(contentVal, `![alt 图片描述](${url})`));
  }
  buildPreviewHtml() {
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.editorInstance.getValue().toHTML()}</div>
        </body>
      </html>
    `;
  }
  componentWillReceiveProps(nextProps) {
    const { initialValue } = nextProps;
    if (!this.props.initialValue && initialValue) {
      this.editorInstance.setValue(BraftEditor.createEditorState(initialValue));
    }
  }
  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }

    window.previewWindow = window.open();
    window.previewWindow.document.write(this.buildPreviewHtml());
    window.previewWindow.document.close();
  };

  render() {
    const { upload = false, name, token, extendControls = [], ...otherProps } = this.props;
    let defualtExtends = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview,
      },
    ].concat(extendControls);
    if (upload) {
      defualtExtends = defualtExtends.concat([
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
      ]);
    }
    return (
      <>
        <BraftEditor
          id={`editor-${name}`}
          extendControls={defualtExtends}
          ref={instance => (this.editorInstance = instance)}
          {...otherProps}
        />
      </>
    );
  }
}
