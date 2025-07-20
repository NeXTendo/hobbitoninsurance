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
import { motion, AnimatePresence } from 'framer-motion';
import { useEnableAnimations } from '@/hooks/useDeviceCapabilities';

const { TabPane } = Tabs;
const NATIONALITIES = ['Zambian', 'Other'];

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: (user: { name: string; role: 'admin' | 'user'; avatarUrl: string }) => void;
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

export default function AuthModal({ open, onClose, onSuccess }: AuthModalProps) {
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
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);

    if (vals.email === 'test@g.com' && vals.password === '1234') {
      message.success('Login successful');
      onSuccess?.({
        name: 'Test User',
        role: 'user',
        avatarUrl: '/hobbiton2.png'
      });
    } else {
      message.error('Incorrect email or password');
    }
  };

  const onSignup = async (vals: SignupFormValues) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    message.success('Account created!');
    onSuccess?.({
      name: vals.firstName + ' ' + vals.lastName,
      role: 'user',
      avatarUrl: '/hobbiton2.png'
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onCancel={close}
          footer={null}
          centered
          destroyOnClose
          style={{ maxWidth: 500, width: '95%' }}
          bodyStyle={{
            background: '#1c1c1c',
            borderRadius: 12,
            padding: 0,
            color: 'white'
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
                    <a onClick={() => setTab('forgot')} className="text-sm text-blue-400 cursor-pointer">
                      Forgot password?
                    </a>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" loading={loading} htmlType="submit" block>
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
                    <Select options={NATIONALITIES.map((x) => ({ label: x, value: x }))} />
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

                  {addCard && <FloatingInput name="cardNumber" label="Card Number" />}

                  <Form.Item
                    name="terms"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, v) =>
                          v ? Promise.resolve() : Promise.reject('You must agree to terms')
                      }
                    ]}
                  >
                    <Checkbox>I agree to Terms & Conditions</Checkbox>
                  </Form.Item>

                  <Form.Item name="newsletter" valuePropName="checked">
                    <Checkbox>Send me updates</Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" loading={loading} htmlType="submit" block>
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane key="forgot" tab="Reset">
                <Form
                  layout="vertical"
                  onFinish={async (vals: { email: string }) => {
                    message.success('Reset link sent!');
                    setTab('login');
                  }}
                >
                  <FloatingInput name="email" label="Email" />
                  <Form.Item>
                    <Button type="primary" loading={loading} block htmlType="submit">
                      Send Reset Link
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
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
      label={label}
      rules={[{ required: true, message: `Please enter your ${label}` }]}
    >
      <Input type={type} />
    </Form.Item>
  );
};
