'use client';

import { useState } from 'react';
import {
  Modal,
  Tabs,
  Form,
  Input,
  DatePicker,
  Checkbox,
  Button,
  message,
  Select
} from 'antd';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useEnableAnimations } from '@/hooks/useDeviceCapabilities';

const { TabPane } = Tabs;
const NATIONALITIES = ['Zambian', 'Other'];

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

type LoginFormValues = {
  email: string;
  password: string;
};

type SignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nrc: string;
  occupation: string;
  nationality: string;
  dob: any;
  addCard?: boolean;
  cardNumber?: string;
  terms?: boolean;
  newsletter?: boolean;
};

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const enableEffects = useEnableAnimations();
  const [activeTab, setTab] = useState<'login' | 'signup' | 'forgot'>('login');
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const addCard = Form.useWatch('addCard', form);

  const close = () => {
    onClose();
    setLoading(false);
  };

  const onLogin = async (vals: LoginFormValues) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    if (vals.email === 'test@g.com' && vals.password === '1234') {
      message.success('Login successful');
      close();
    } else {
      message.error('Incorrect email or password');
    }
  };

  const onSignup = async (vals: SignupFormValues) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2500));
    setLoading(false);
    message.success('Account created! Logging in...');
    setTimeout(close, 1000);
  };

  return (
    <Modal
      open={open}
      onCancel={close}
      footer={null}
      centered
      destroyOnClose
      style={{ maxWidth: 500, width: '95%' }}
      bodyStyle={{
        backdropFilter: 'blur(12px)',
        background: 'rgba(28,28,28,0.85)',
        borderRadius: 12,
        padding: 0
      }}
      className="overflow-hidden"
    >
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="p-6 text-white"
      >
        <Tabs activeKey={activeTab} onChange={(key) => setTab(key as typeof activeTab)} centered>
          <TabPane key="login" tab="Login">
            <Form layout="vertical" onFinish={onLogin}>
              <FloatingInput name="email" label="Email" type="email" />
              <FloatingInput name="password" label="Password" type="password" />
              <Form.Item>
                <a onClick={() => setTab('forgot')} className="text-sm text-blue-400">
                  Forgot password?
                </a>
              </Form.Item>
              <Form.Item>
                <Button type="primary" loading={loading} block>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane key="signup" tab="Sign Up">
            <Form layout="vertical" form={form} onFinish={onSignup}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['firstName', 'lastName', 'email', 'phone', 'nrc', 'occupation'].map((field) => (
                  <FloatingInput key={field} name={field} label={field} />
                ))}
              </div>

              <Form.Item name="nationality" label="Nationality" rules={[{ required: true }]}>
                <Select
                  options={NATIONALITIES.map((x) => ({ label: x, value: x }))}
                />
              </Form.Item>

              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[
                  {
                    required: true,
                    validator: (_, val) =>
                      val && dayjs().diff(val, 'year') >= 18
                        ? Promise.resolve()
                        : Promise.reject('Must be 18+')
                  }
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item name="addCard" valuePropName="checked">
                <Checkbox>Add credit card?</Checkbox>
              </Form.Item>

              {addCard && (
                <FloatingInput name="cardNumber" label="Card Number" />
              )}

              <Form.Item
                name="terms"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, v) =>
                      v ? Promise.resolve() : Promise.reject('Agree to terms')
                  }
                ]}
              >
                <Checkbox>I agree to Terms & Conditions</Checkbox>
              </Form.Item>

              <Form.Item name="newsletter" valuePropName="checked">
                <Checkbox>Send news & updates</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" loading={loading} block>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane key="forgot" tab="Reset">
            <Form
              layout="vertical"
              onFinish={async (vals: { email: string }) => {
                message.success('Reset link sent');
                setTab('login');
              }}
            >
              <FloatingInput name="email" label="Email" />
              <Form.Item>
                <Button type="primary" loading={loading} block>
                  Send Reset Link
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </motion.div>
    </Modal>
  );
}

// FloatingInput reusable wrapper
const FloatingInput = ({
  name,
  label,
  type = 'text'
}: {
  name: string;
  label: string;
  type?: string;
}) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true }]}
      className="floating-label"
    >
      <Input
        type={type}
        className="peer placeholder-transparent bg-transparent border border-gray-600 text-white focus:border-blue-400 focus:ring-0"
        placeholder={label}
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-gray-300 left-3 -top-2.5 bg-hobbiton-dark px-1 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-white"
      >
        {label}
      </label>
    </Form.Item>
  );
};
