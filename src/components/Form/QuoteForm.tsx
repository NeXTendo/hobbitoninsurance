'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
  Spin,
  Row,
  Col,
  Button,
} from 'antd'
import {
  InboxOutlined,
  CheckCircleFilled,
  CreditCardOutlined,
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
  CarOutlined,
  NumberOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import gsap from 'gsap'

const { Option } = Select
const { Dragger } = Upload

type Props = {
  isOpen: boolean
  onClose: () => void
}

const CARD_LOGOS: Record<string, string> = {
  Visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
  Mastercard: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
  Amex: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg',
  Discover: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Discover_Card_logo.svg',
}

function detectCardType(number: string): string | null {
  if (/^4/.test(number)) return 'Visa'
  if (/^5[1-5]/.test(number)) return 'Mastercard'
  if (/^3[47]/.test(number)) return 'Amex'
  if (/^6(?:011|5)/.test(number)) return 'Discover'
  return null
}

export default function QuoteModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [cardType, setCardType] = useState<string | null>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const prevCardTypeRef = useRef<string | null>(null)

  useEffect(() => {
    if (!logoRef.current) return
    if (cardType === prevCardTypeRef.current) return

    const el = logoRef.current
    const tl = gsap.timeline()
    tl.to(el, { opacity: 0, duration: 0.3, ease: 'power1.out' })
      .call(() => {
        prevCardTypeRef.current = cardType
      })
      .set(el, { src: cardType ? CARD_LOGOS[cardType] : '' })
      .to(el, { opacity: 1, duration: 0.3, ease: 'power1.in' })

    return () => {
      tl.kill()
    }
  }, [cardType])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    value = value.replace(/(.{4})/g, '$1 ').trim()
    form.setFieldsValue({ cardNumber: value })
    setCardType(detectCardType(value.replace(/\s/g, '')))
  }

  const handleExpiryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2, 4)
    form.setFieldsValue({ expiry: value })
  }

  const disabledStartDate = (current: any) => {
    return current && current < dayjs().startOf('day')
  }

  const disabledEndDate = (current: any) => {
    const startDate = form.getFieldValue('coverStartDate')
    if (!startDate) return current && current < dayjs().startOf('day')
    return current && current < dayjs(startDate).startOf('day')
  }

  const handleFinish = (values: any) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      message.success('Quote submitted successfully')
      form.resetFields()
      setSelectedPaymentMethod(null)
      setCardType(null)
      prevCardTypeRef.current = null
      setTimeout(() => {
        setSubmitted(false)
        onClose()
      }, 2000)
    }, 2500)
  }

  const uploadProps = {
    multiple: false,
    beforeUpload: () => false,
    showUploadList: { showPreviewIcon: false },
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      className="quote-glass-modal"
      width="100%"
      style={{
        maxWidth: 620,
        background: 'transparent',
        boxShadow: 'none',
      }}
    >
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-2xl text-black max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out">
        {/* Close Button */}
        <Button
          type="text"
          onClick={onClose}
          className="absolute top-4 right-4 z-50"
          aria-label="Close modal"
          icon={<CloseOutlined style={{ fontSize: '18px', color: 'black' }} />}
        />

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
            <p className="mt-2 text-sm">{loading ? 'Submitting your quote...' : ''}</p>
          </div>
        ) : (
          <Form
            layout="vertical"
            form={form}
            onFinish={handleFinish}
            scrollToFirstError
            className="space-y-4"
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
                  <Input placeholder="e.g. Pumulo Mubiana" prefix={<UserOutlined />} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true },
                    { type: 'email' },
                  ]}
                >
                  <Input placeholder="e.g. email@example.com" prefix={<MailOutlined />} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="carMake" label="Car Make" rules={[{ required: true }]}>
                  <Input placeholder="e.g. Toyota" prefix={<CarOutlined />} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item name="carModel" label="Car Model" rules={[{ required: true }]}>
                  <Input placeholder="e.g. Corolla" prefix={<CarOutlined />} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="year" label="Year" rules={[{ required: true }]}>
                  <Input type="number" placeholder="e.g. 2022" prefix={<NumberOutlined />} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="paymentMethod"
                  label="Preferred Payment Method"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Choose method"
                    onChange={(val) => setSelectedPaymentMethod(val)}
                  >
                    <Option value="airtel">Airtel Money</Option>
                    <Option value="mtn">MTN Mobile Money</Option>
                    <Option value="card">Debit/Credit Card</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Conditional payment inputs */}
            {['airtel', 'mtn'].includes(selectedPaymentMethod || '') && (
              <Form.Item
                name="mobileNumber"
                label="Mobile Money Number"
                rules={[{ required: true, message: 'Enter your mobile number' }]}
              >
                <Input
                  placeholder="e.g. 0978123456"
                  maxLength={10}
                  prefix={<PhoneOutlined />}
                  type="tel"
                />
              </Form.Item>
            )}

            {selectedPaymentMethod === 'card' && (
              <div className="transition-all space-y-4 relative">
                <Form.Item
                  name="cardName"
                  label="Cardholder Name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="e.g. Pumulo Mubiana" prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item name="cardNumber" label="Card Number" rules={[{ required: true }]}>
                  <div className="relative">
                    <Input
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      onChange={handleCardInput}
                      prefix={<CreditCardOutlined />}
                      className="pr-16"
                    />
                    {cardType && (
                      <img
                        ref={logoRef}
                        src={CARD_LOGOS[cardType]}
                        alt={cardType}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-auto opacity-100"
                        style={{ opacity: 1 }}
                      />
                    )}
                  </div>
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="expiry"
                      label="Expiry Date"
                      rules={[{ required: true }]}
                    >
                      <Input
                        placeholder="MM/YY"
                        maxLength={5}
                        onChange={handleExpiryInput}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item name="cvv" label="CVV" rules={[{ required: true }]}>
                      <Input placeholder="123" maxLength={4} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="coverStartDate"
                  label="Insurance Cover Start Date"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    className="w-full"
                    format="DD/MM/YYYY"
                    disabledDate={disabledStartDate}
                    onChange={() => form.validateFields(['coverEndDate'])}
                    inputReadOnly
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="coverEndDate"
                  label="Insurance Cover End Date"
                  dependencies={['coverStartDate']}
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const start = getFieldValue('coverStartDate')
                        if (!value || !start || value.isAfter(start)) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('End date must be after start date'))
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    className="w-full"
                    format="DD/MM/YYYY"
                    disabledDate={disabledEndDate}
                    inputReadOnly
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="vehicleImage"
                  label="Upload Vehicle Image"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                  rules={[{ required: true }]}
                >
                  <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p>Click or drag to upload vehicle image</p>
                  </Dragger>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="nrcUpload"
                  label="Upload NRC / Driver’s License"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                  rules={[{ required: true }]}
                >
                  <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p>Click or drag to upload NRC / License</p>
                  </Dragger>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className="pt-4">
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
              >
                Submit Quote
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </Modal>
  )
}
