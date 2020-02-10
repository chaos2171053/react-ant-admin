import React, { memo, useState } from 'react';
import { Form, Button, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

export interface AddFormItemProps {
  name: string;
  label: string;
  placeholder?: string;
  rules?: object[];
  render?: React.ReactNode;
}

interface AddFormProps extends FormComponentProps {
  formList: AddFormItemProps[];
  onCancel: (values: any) => Promise<any>;
  onSubmit: (index: number) => Promise<any>;
}

function AddForm(props: AddFormProps) {
  const { getFieldDecorator } = props.form;
  const [loading, setLoading] = useState<boolean>(false);

  const reset = () => {
    props.form.resetFields();
    props.onCancel({});
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields(async (err, values: any) => {
      if (!err) {
        setLoading(true);
        await props.onSubmit(values);
        setLoading(false);
      }
    });
  };

  return (
    <Form onSubmit={submit}>
      {props.formList.map((item: AddFormItemProps) => (
        <Form.Item label={item.label} key={item.name}>
          {getFieldDecorator(item.name, {
            rules: item.rules,
          })(item.render ? item.render : <Input placeholder={item.placeholder} />)}
        </Form.Item>
      ))}
      <Form.Item>
        <Button htmlType="submit" type="primary" loading={loading}>
          提交
        </Button>
        <Button htmlType="reset" onSubmit={reset}>
          重置
        </Button>
      </Form.Item>
      <Form.Item></Form.Item>
    </Form>
  );
}

export default memo(
  Form.create<AddFormProps>({ name: 'AddForm' })(AddForm),
);
