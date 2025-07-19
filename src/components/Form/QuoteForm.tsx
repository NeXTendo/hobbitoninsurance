'use client'

import { useState, useEffect } from 'react'
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
  Spin
} from 'antd'
import {
  InboxOutlined,
  CheckCircleFilled
} from '@ant-design/icons'
import dayjs from 'dayjs'

const { Option } = Select
const { Dragger } = Upload
const { RangePicker } = DatePicker

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handleFinish = (values: any) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      message.success('Quote submitted successfully')
      form.resetFields()
      setTimeout(() => {
        setSubmitted(false)
        onClose()
      }, 2000)
    }, 2500)
  }

  const uploadProps = {
    multiple: false,
    beforeUpload: () => false,
    showUploadList: { showPreviewIcon: false }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      className="quote-glass-modal"
      styles={{ body: { padding: 0 } }}
      width="100%"
      style={{
        maxWidth: 620,
        background: 'transparent',
        boxShadow: 'none'
      }}
    >
      <div
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-2xl text-black max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-black text-center">
          Request a Motor Insurance Quote
        </h2>

        {loading || submitted ? (
          <div className="flex flex-col items-center justify-center py-16">
            {loading ? (
              <Spin size="large" />
            ) : (
              <>
                <CheckCircleFilled className="text-green-400 text-6xl animate-bounce" />
                <p className="mt-4 text-lg">Submission Successful!</p>
              </>
            )}
            <p className="mt-2 text-sm opacity-100">
              {loading ? 'Submitting your quote...' : ''}
            </p>
          </div>
        ) : (
          <Form
            layout="vertical"
            form={form}
            onFinish={handleFinish}
            scrollToFirstError
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter your full name' }]}
              >
                <Input placeholder="e.g. Pumulo Mubiana" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Invalid email' }
                ]}
              >
                <Input placeholder="e.g. pumulomubiana@example.com" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="carMake"
                label="Car Make"
                rules={[{ required: true, message: 'Please enter car make' }]}
              >
                <Input placeholder="e.g. Toyota" />
              </Form.Item>

              <Form.Item
                name="carModel"
                label="Car Model"
                rules={[{ required: true, message: 'Please enter car model' }]}
              >
                <Input placeholder="e.g. Corolla" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="year"
                label="Year"
                rules={[{ required: true, message: 'Enter the car year' }]}
              >
                <Input type="number" placeholder="e.g. 2022" />
              </Form.Item>

              <Form.Item
                name="paymentMethod"
                label="Preferred Payment Method"
                rules={[{ required: true, message: 'Select payment method' }]}
              >
                <Select placeholder="Choose method">
                  <Option value="airtel">Airtel Money</Option>
                  <Option value="mtn">MTN Mobile Money</Option>
                  <Option value="card">Debit/Credit Card</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="coverDates"
              label="Insurance Cover Dates"
              rules={[{ required: true, message: 'Select start and end date' }]}
            >
              <RangePicker
                className="w-full"
                format="DD/MM/YYYY"
                placeholder={['Start Date', 'End Date']}
                disabledDate={(date) =>
                  date && dayjs(date).isBefore(dayjs().startOf('day'))
                }
                inputReadOnly
              />
            </Form.Item>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="vehicleImage"
                label="Upload Vehicle Image"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                rules={[{ required: true, message: 'Upload vehicle image' }]}
              >
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p>Click or drag to upload vehicle image</p>
                </Dragger>
              </Form.Item>

              <Form.Item
                name="nrcUpload"
                label="Upload NRC / Driver’s License"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                rules={[{ required: true, message: 'Upload NRC or license' }]}
              >
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p>Click or drag to upload NRC / License</p>
                </Dragger>
              </Form.Item>
            </div>

            <Form.Item className="pt-4">
              <button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-lg font-semibold hover:bg-opacity-30 transition duration-200"
              >
                Submit Quote
              </button>
            </Form.Item>
          </Form>
        )}
      </div>
    </Modal>
  )
}
