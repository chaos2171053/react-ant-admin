import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor, { BraftEditorProps } from 'braft-editor';

export interface EditorProps extends BraftEditorProps {}

export default class Editor extends React.Component<BraftEditorProps> {
  render() {
    return (
      <>
        <BraftEditor {...this.props} />
      </>
    );
  }
}
