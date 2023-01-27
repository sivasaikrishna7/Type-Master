import React, { ReactElement, useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    console.log('Success:', values)
    navigate('/type')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <div className="w-[60%] flex flex-col items-center justify-center p-12">
        <div className="text-[18px] mb-4 font-semibold">Login</div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="w-full flex flex-col items-center justify-center "
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            className="w-full"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            className="w-full"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" className="w-full">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="w-full flex items-end">
        <span className="font-semibold text-[26px] absolute text-white m-10">
          Type Master
        </span>
        <img
          src="https://i.postimg.cc/fyX0Mq7t/istockphoto-657069962-612x612.jpg"
          className="object-cover w-[100%] h-[100%]"
        />
      </div>
    </div>
  )
}

export default Login
