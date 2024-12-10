'use client';
import { FC } from 'react';

import { Button, Form, Input } from 'antd';

import apiClient from '@/api/apiClient';

import type { FormProps } from 'antd';

type FieldType = {
  email?: string;
  password?: string;
};

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

interface ISignInProps {
  onClose: () => void;
  signIn: (token: string) => void;
}

export const SignIn: FC<ISignInProps> = ({ onClose, signIn }) => {
  // FORM func
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { email, password } = values;
    const requestUrl = '/api/auth/signin';

    try {
      const res = await apiClient.post(requestUrl, {
        email,
        password,
      });

      console.log('RES:', res);
      const token = res.data.data.token;
      console.log('token:', token);

      signIn(token);

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="mt-1">
      <h2>Sign Up</h2>
      <Form
        className="mt-05"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              pattern: passwordRegex,
              message:
                'Password must be 8+ chars, with upper, lower, number, and symbol',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
