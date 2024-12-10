'use client';
import { FC } from 'react';

import { Button, Form, Input } from 'antd';

import apiClient from '@/api/apiClient';

import type { FormProps } from 'antd';

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
};

const usernameRegex = /^[a-zA-Z0-9_]{1,15}$/;

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// FORM func
const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  const { name, email, password } = values;
  const requestUrl = '/api/auth/signup';

  try {
    const res = await apiClient.post(requestUrl, {
      name,
      email,
      password,
    });

    console.log('RES:', res);
  } catch (error) {
    console.error(error);
  }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export const SignUp: FC = () => {
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
        <Form.Item<FieldType>
          label="Username"
          name="name"
          rules={[
            { required: true, message: 'Please input correct username!' },
            {
              pattern: usernameRegex,
              message:
                'Username must be 1-15 characters, with letters, numbers, or underscores.',
            },
          ]}
        >
          <Input />
        </Form.Item>

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
