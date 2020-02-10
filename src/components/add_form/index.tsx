import React, { memo, useState } from 'react';
import {
  Form,
  Button,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  Checkbox,
  Radio,
  Cascader,
  Switch,
  DatePicker,
  TimePicker,
  Transfer,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import Password from 'antd/lib/input/Password';

export interface AddFormItemProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  rules?: object[];
  render?: React.ReactNode;
}

export interface AddFormProps extends FormComponentProps {
  formList: AddFormItemProps[];
  onCancel?: (values: any) => Promise<any>;
  onSubmit: (index: number) => Promise<any>;
}

/**
 * input
 * @param type
 * @returns {boolean}
 */
function isInputLikeElement(type: string) {
  return ['input', 'hidden', 'number', 'textarea', 'password', 'mobile', 'email', 'json'].includes(
    type,
  );
}

function AddForm(props: AddFormProps) {
  const { getFieldDecorator } = props.form;
  const [loading, setLoading] = useState<boolean>(false);

  const reset = () => {
    props.form.resetFields();
    props.onCancel && props.onCancel({});
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

  function getElement(item: any) {
    const { type = 'input', render, ...props } = item;

    const commonProps = {
      size: 'default',
    };

    if (render) {
      return typeof render === 'function' ? render() : render;
    }

    if (isInputLikeElement(type)) {
      if (type === 'number') return <InputNumber {...commonProps} {...props} />;
      if (type === 'textarea') return <TextArea {...commonProps} {...props} />;
      if (type === 'password') return <Password {...commonProps} {...props} />;
      return <Input {...commonProps} type={type} {...props} />;
    }

    if (type === 'select') {
      const { options = [], ...others } = props;

      return (
        <Select {...commonProps} {...others}>
          {options.map((opt: { [key: string]: any }) => (
            <Select.Option key={opt.value} {...opt}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      );
    }

    if (type === 'select-tree')
      return <TreeSelect {...commonProps} {...props} treeData={props.options} />;

    if (type === 'checkbox')
      return (
        <Checkbox {...commonProps} {...props}>
          {props.label}
        </Checkbox>
      );
    if (type === 'checkbox-group') return <Checkbox.Group {...commonProps} {...props} />;

    if (type === 'radio')
      return (
        <Radio {...commonProps} {...props}>
          {props.label}
        </Radio>
      );
    if (type === 'radio-group') return <Radio.Group {...commonProps} {...props} />;
    if (type === 'radio-button') {
      const { options = [], ...others } = props;
      return (
        <Radio.Group buttonStyle="solid" {...commonProps} {...others}>
          {options.map((opt: { [key: string]: any }) => (
            <Radio.Button key={opt.value} {...opt}>
              {opt.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      );
    }

    if (type === 'cascader') return <Cascader {...commonProps} {...props} />;

    if (type === 'switch')
      return <Switch {...commonProps} {...props} style={{ ...props.style, width: 'auto' }} />;

    if (type === 'date') return <DatePicker {...commonProps} {...props} />;

    if (type === 'date-time') return <DatePicker {...commonProps} showTime {...props} />;

    if (type === 'date-range') return <DatePicker.RangePicker {...commonProps} {...props} />;

    if (type === 'month') return <DatePicker.MonthPicker {...commonProps} {...props} />;

    if (type === 'time') return <TimePicker {...commonProps} {...props} />;

    if (type === 'transfer') return <Transfer {...commonProps} {...props} />;

    throw new Error(`no appropriate component type: ${type}`);
  }

  return (
    <Form onSubmit={submit}>
      {props.formList.map((item: AddFormItemProps) => {
        return (
          <Form.Item label={item.label} key={item.name}>
            {getFieldDecorator(item.name, {
              rules: item.rules,
            })(getElement(item))}
          </Form.Item>
        );
      })}
      <Form.Item>
        <Button htmlType="submit" type="primary" loading={loading}>
          提交
        </Button>
        <Button htmlType="reset" onClick={reset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(
  Form.create<AddFormProps>({ name: 'AddForm' })(AddForm),
);
