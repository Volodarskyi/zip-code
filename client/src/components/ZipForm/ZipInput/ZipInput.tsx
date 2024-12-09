'use client';

import React, { FC } from 'react';

import { Button, Form, Input } from 'antd';

import type { FormProps } from 'antd';

interface IZipInputProps {
  getAddressReq: (zipCode: string) => void;
}

type FieldType = {
  zipCode?: string;
};

const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;

const ZipInput: FC<IZipInputProps> = ({ getAddressReq }) => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.zipCode) {
      getAddressReq(values.zipCode);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Zip Code"
        name="zipCode"
        rules={[
          {
            required: true,
            pattern: postalCodeRegex,
            message: 'Please input correct ZIP CODE!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={false}>
          Get Address
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ZipInput;
