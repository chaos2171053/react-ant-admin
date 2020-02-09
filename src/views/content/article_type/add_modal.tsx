import React, { useCallback } from 'react';
import { ArticleTypeProps, apiCreateArticleType, apiUpdateArticleType } from './service';
import Form, { FormComponentProps } from 'antd/lib/form';
import { Modal, Input, message } from 'antd';

export interface AddMoadlProps extends FormComponentProps {
  visible: boolean;
  articleType: ArticleTypeProps | null;
  onClose: () => void;
  onConfirm: () => void;
}

interface FromProps {
  id?: number;
  name: string;
  icon: string;
}

function AddMoadl(props: AddMoadlProps) {
  const { articleType, visible } = props;
  const { getFieldDecorator } = props.form;
  const onOk = useCallback(() => {
    props.form.validateFields((err, values: FromProps) => {
      if (!err) {
        const type: ArticleTypeProps = {
          ...values,
        };
        if (type.id) {
          apiUpdateArticleType(type).then(() => {
            message.success('修改成功');
            props.onConfirm();
          });
        } else {
          apiCreateArticleType(type).then(() => {
            message.success('创建成功');
            props.onConfirm();
          });
        }
      }
    });
  }, []);
  return (
    <>
      <Modal
        maskClosable={false}
        visible={visible}
        title={`${articleType && articleType.id ? '编辑' : '新增'}文章类别`}
        onCancel={props.onClose}
        onOk={onOk}
      >
        <Form
          labelCol={{
            sm: { span: 5 },
          }}
          wrapperCol={{
            sm: { span: 16 },
          }}
        >
          {articleType && articleType.id ? (
            <Form.Item label="文章类别Id">
              {getFieldDecorator('id', { initialValue: articleType.id })(<Input disabled />)}
            </Form.Item>
          ) : null}
          <Form.Item label="类别名称">
            {getFieldDecorator('name', {
              initialValue: articleType && articleType.name,
              rules: [{ required: true, message: '请输入类别名称' }],
            })(<Input maxLength={5} />)}
          </Form.Item>
          <Form.Item label="类别icon">
            {getFieldDecorator('icon', {
              initialValue: articleType && articleType.icon,
              rules: [{ required: true, message: '请输入类别icon' }],
            })(<Input maxLength={10} />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default Form.create<AddMoadlProps>()(AddMoadl);
