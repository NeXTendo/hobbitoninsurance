'use client'

import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useParallax } from '@/hooks/useParallax'
import { ShieldCheckIcon, BoltIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import gsap from 'gsap'
import { Carousel, Rate, Collapse, Progress, Button, Card } from 'antd'
import { CarOutlined, CheckCircleOutlined, FireOutlined, LeftOutlined, RightOutlined, SafetyCertificateOutlined, TeamOutlined } from '@ant-design/icons'
import { AnimatePresence, motion, useScroll,useTransform } from 'framer-motion'
import ReadMoreModals from '@/components/UI/ReadMoreModals'
import QuoteModal from '@/components/Form/QuoteForm'
import ParallaxBackground from '@/components/ParallaxBackground'
import Image from 'next/image'
import ScrollTrigger from 'gsap/ScrollTrigger'



gsap.registerPlugin(ScrollTrigger)

const countersData = [
  { label: 'Quotes Generated', value: 82 },
  { label: 'Vehicles Covered', value: 53 },
  { label: 'Customer Satisfaction', value: 98, suffix: '%' },
];
const step1Icons = {
  'Private Vehicle': <CarOutlined style={{ fontSize: 48, color: '#4ade80' }} />,
  'Business Fleet': <TeamOutlined style={{ fontSize: 48, color: '#60a5fa' }} />,
  Motorbike: <CarOutlined style={{ fontSize: 48, color: '#fbbf24' }} />,
  Taxi: <CarOutlined style={{ fontSize: 48, color: '#f87171' }} />,
}

const step2Icons = {
  'Lowest Price': <FireOutlined style={{ fontSize: 48, color: '#facc15' }} />,
  'Fire & Theft Cover': <FireOutlined style={{ fontSize: 48, color: '#f97316' }} />,
  'Comprehensive Protection': <SafetyCertificateOutlined style={{ fontSize: 48, color: '#34d399' }} />,
  'Quick Approval': <CheckCircleOutlined style={{ fontSize: 48, color: '#22d3ee' }} />,
}
const faqItems = [
  {
    key: '1',
    question: 'What documents do I need to get a quote?',
    answer: `You’ll need your NRC or driver's license, vehicle details, and previous insurance info (if any).`,
  },
  {
    key: '2',
    question: 'How long does it take to get insured?',
    answer: `Most users are insured within minutes after submitting required details and making payment.`,
  },
  {
    key: '3',
    question: 'Can I insure multiple vehicles?',
    answer: `Yes! Our Fleet Insurance plan is designed for businesses or individuals managing multiple vehicles.`,
  },
]

const insuranceTypes = [
  {
    title: 'Comprehensive Insurance',
    description: 'Covers you, your vehicle, and third parties in case of accidents, theft, or damage.',
    details:
      'Comprehensive insurance covers your own vehicle and property, as well as any third parties involved in an incident. It includes cover for theft, fire, natural disasters, and vandalism.',
    image: '/images/documentinsu.jpg',
  },
  {
    title: 'Third Party Only',
    description: 'Meets legal minimum requirements and covers others if you’re at fault.',
    details:
      'Third Party Only (TPO) insurance is the most basic form of car insurance. It covers damage to other people’s property or injury to others if you cause an accident. It does not cover your vehicle.',
    image: '/images/third-party.jpeg',
  },
  {
    title: 'Fire & Theft Only',
    description: 'Protects your vehicle against fire and theft without full accident cover.',
    details:
      'Third Party, Fire and Theft covers your vehicle if it’s stolen or damaged by fire. It also provides the same protection as TPO for any third-party claims.',
    image: '/images/fire-theft.jpg',
  },
  {
    title: 'Fleet Insurance',
    description: 'Best for businesses managing multiple vehicles.',
    details:
      'Fleet Insurance allows businesses to insure multiple vehicles under one policy. This is ideal for logistics companies, service fleets, or sales teams.',
    image: '/images/fleet.jpg',
  },
]

const chooseData = [
  {
    title: 'Trusted Coverage',
    text: 'We partner with leading insurers to provide comprehensive, reliable coverage options tailored to you.',
    Icon: ShieldCheckIcon,
  },
  {
    title: 'Instant Online Quotes',
    text: 'Skip the paperwork — get your motor insurance quote in minutes from any device.',
    Icon: BoltIcon,
  },
  {
    title: 'Local Expertise',
    text: 'We understand the Zambian market and offer localized solutions for Lusaka, Copperbelt, and beyond.',
    Icon: GlobeAltIcon,
  },
]

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<number | null>(null)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -300])
  const carouselRef = useRef<any>(null)
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({ vehicleType: '', priority: '' })
  const [recommendation, setRecommendation] = useState('')
  const faqRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
  if (!faqRef.current) return

  gsap.fromTo(
    faqRef.current.querySelectorAll('.faq-item'),
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: faqRef.current,
        start: 'top 85%',
      },
    }
  )
}, [])

useEffect(() => {
  if (!sectionRef.current) return

  gsap.fromTo(
    sectionRef.current.querySelectorAll('.fade-item'),
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    }
  )
}, [])
const milestones = [
    { year: '2019', event: 'Founded in Lusaka' },
    { year: '2020', event: 'Reached 1,000 Users' },
    { year: '2022', event: 'Introduced Digital Quotes' },
    { year: '2024', event: '15,000+ Customers Served' },
  ]

  const values = [
    { title: 'Transparency', text: 'We’re open, honest, and upfront about everything.' },
    { title: 'Empathy', text: 'We listen. We care. We serve real people.' },
    { title: 'Innovation', text: 'We’re building the future of African insurance.' },
  ]

  // handle answers
  const handleAnswer = (key: string, value: string) => {
    const updated = { ...answers, [key]: value }
    setAnswers(updated)

    if (step === 1) setStep(2)
    else if (step === 2) {
      let rec = 'Standard'
      if (updated.priority === 'Lowest Price') rec = 'Basic'
      if (updated.priority === 'Comprehensive Protection') rec = 'Comprehensive'
      setRecommendation(rec)
      setStep(3)
    }
  }

  // Motion variants for scroll up/down feel
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }
  return (
<main className="relative">
    <div className="absolute inset-0 -z-10">
       <ParallaxBackground />
    </div>
<section className="relative z-10">

   {/* Hero Section */}
  <section className="relative z-10 py-28 px-4 md:px-10 lg:px-20 text-white">
    <div className="absolute inset-0 -z-10">
      <motion.div style={{ y: useParallax(0.3).y }} className="absolute inset-0">
        <Image
          src="/images/people.jpg"
          alt="Hero Background"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12">
      <div className="space-y-6 text-center lg:text-left">
        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg hover:tracking-tight transition-all duration-300">
          Get Your Motor Insurance Quote Instantly
        </h1>
        <p className="text-lg text-white/90 max-w-xl mx-auto lg:mx-0">
          Hobbiton Technologies helps you find the right protection for your vehicle with simplicity and speed.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(255, 255, 255, 0.3)' }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => setShowQuoteModal(true)}
          className="bg-primary hover:bg-opacity-80 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
        >
          Start My Quote
        </motion.button>
      </div>
    </motion.div>
  </section>

{/* About Hobbiton */}
   <div className="text-white font-sans">
      {/* Hero Section */}
      <section className="relative py-32 px-6 md:px-16 lg:px-32 bg-[#101010] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/office.jpg"
                alt="Hobbiton Team"
                width={640}
                height={480}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-6 left-6 bg-primary text-white text-sm px-4 py-2 rounded-xl shadow-lg">
              15,000+ Drivers Protected
            </div>
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold leading-tight">
              Our Journey to Simplify Insurance
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Hobbiton Technologies began as a spark — a desire to fix insurance for Zambians.
              From late-night coffees and road trips to field tests and real drivers, we’ve always stayed true to one belief:
              <span className="text-accent font-semibold"> insurance should be easy, honest, and human.</span>
            </p>
            <p className="text-white/70 italic border-l-4 border-accent pl-4">
              "We're not here to sell you a policy — we're here to help you protect what you care about most."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-[#0f0f0f] py-24 px-6 md:px-16 lg:px-32 text-white">
        <h3 className="text-3xl font-bold text-center mb-12">From Then to Now</h3>
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {milestones.map(({ year, event }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur rounded-xl p-6 text-center"
            >
              <h4 className="text-xl font-bold text-accent mb-2">{year}</h4>
              <p className="text-white/80">{event}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-6 md:px-16 lg:px-32 bg-gradient-to-r from-[#0e1a1a] to-[#1c1c1c] text-white">
        <h3 className="text-3xl font-bold text-center mb-12">What Drives Us</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {values.map(({ title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center shadow-lg"
            >
              <h4 className="text-xl font-semibold mb-2 text-accent">{title}</h4>
              <p className="text-white/80 text-sm">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>

{/* Insurance Types Section */}
<section className="px-4 md:px-10 lg:px-20 py-16 md:py-20 overflow-hidden">
  <h2 className="text-3xl font-bold text-center mb-12 text-primary">
    Types of Insurance We Offer
  </h2>

  {/* Mobile Carousel */}
  <div className="md:hidden">
    <Carousel
      autoplay
      dots
      className="mx-auto"
      autoplaySpeed={5000}
      dotPosition="bottom"
    >
      {insuranceTypes.map((type, idx) => (
        <div key={idx} className="px-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-xl shadow-xl p-6 h-[320px] flex flex-col justify-between transition duration-300 cursor-pointer group hover:backdrop-blur-lg"
            onClick={() => setActiveModal(idx)}
          >
            <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-black transition">
              {type.title}
            </h3>
            <p className="text-black/80 text-sm flex-grow">
              {type.description}
            </p>
            <p className="text-black text-center text-sm mt-4 font-semibold cursor-pointer select-none transition-colors group-hover:text-accent/80">
              Read More
            </p>
          </motion.div>
        </div>
      ))}
    </Carousel>
  </div>

  {/* Desktop Grid */}
  <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {insuranceTypes.map((type, idx) => (
      <motion.div
        key={idx}
        whileHover={{ scale: 1.02 }}
        className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-xl shadow-xl p-6 h-[320px] flex flex-col justify-between transition duration-300 cursor-pointer group hover:backdrop-blur-lg"
        onClick={() => setActiveModal(idx)}
      >
        <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-accent transition">
          {type.title}
        </h3>
        <p className="text-black/80 text-sm flex-grow">{type.description}</p>
        <p className="text-black text-center text-sm mt-4 font-semibold cursor-pointer select-none transition-colors group-hover:text-accent/80">
          Read More
        </p>
      </motion.div>
    ))}
  </div>
</section>

    {/*Find the right insurance */}
    <section className="px-4 md:px-10 lg:px-20 py-20 bg-[#0f1a1a] text-white">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-12"
      >
        Find the Right Insurance Plan for You
      </motion.h2>

      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-8 space-y-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-white text-lg font-medium">What do you need insurance for?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(step1Icons).map(([option, icon]) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer('vehicleType', option)}
                    className="bg-white/20 hover:bg-white/30 text-white py-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105"
                  >
                    {icon}
                    <span className="font-semibold">{option}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-white text-lg font-medium">What's most important to you?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(step2Icons).map(([option, icon]) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer('priority', option)}
                    className="bg-white/20 hover:bg-white/30 text-white py-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105"
                  >
                    {icon}
                    <span className="font-semibold text-center">{option}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <p className="text-xl font-semibold">
                We recommend the{' '}
                <span className="text-primary">{recommendation}</span> plan for you.
              </p>
              <button
                onClick={() => {
                  setShowQuoteModal(true)
                  console.log('Prefilled Answers:', answers)
                }}
                className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
              >
                Request a Quote
              </button>
              <button
                onClick={() => {
                  setStep(1)
                  setAnswers({ vehicleType: '', priority: '' })
                  setRecommendation('')
                }}
                className="text-white underline text-sm hover:text-primary transition"
              >
                Start Over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>

    {/* Why Choose Us */}
 <section ref={sectionRef} className="bg-gradient-to-b from-[#0c1c1c] to-[#1a1f1f] text-white py-20 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Hobbiton Insurance?</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {chooseData.map(({ title, text, Icon }, idx) => (
          <div
            key={idx}
            className="fade-item relative group p-6 rounded-lg border border-white/10 shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md hover:shadow-2xl transition-all duration-300"
          >
            <Icon className="w-10 h-10 text-accent mb-4 animate-bounce" />
            <h4 className="font-semibold text-lg mb-2">{title}</h4>
            <p className="text-gray-300 text-sm">{text}</p>
          </div>
        ))}
      </div>
    </section>

{/* Ratings Section */}
 <section className="w-full bg-[#111516] text-white py-20 px-4 md:px-10 lg:px-20">
  <div className="max-w-4xl mx-auto text-center space-y-6">
    <h2 className="text-3xl font-bold">Customer Ratings</h2>
    <p className="text-gray-400">
      Our users trust us to protect their vehicles and make insurance simple.
    </p>
    <div className="flex justify-center items-center gap-3 mt-2">
      <Rate disabled defaultValue={5} style={{ color: '#f4a261', fontSize: '1.5rem' }} />
      <span className="bg-white text-primary text-sm font-medium px-3 py-1 rounded-md shadow">
        4.9/5 from 1,200+ Users
      </span>
    </div>
  </div>
</section>

{/* FAQ Section */}
 <section ref={faqRef} className="bg-gradient-to-t from-[#0e1a1a] to-[#151d1d] text-white py-20 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto">
        <Collapse
          accordion
          ghost
          expandIconPosition="end"
          className="[&_.ant-collapse-item]:bg-white/10 [&_.ant-collapse-item]:backdrop-blur-md [&_.ant-collapse-item]:border [&_.ant-collapse-item]:border-white/10 [&_.ant-collapse-item]:rounded-none [&_.ant-collapse-content]:!text-gray-200"
          items={faqItems.map((faq, idx) => ({
            key: faq.key,
            label: (
              <span className="faq-item font-medium text-white">{faq.question}</span>
            ),
            children: (
              <motion.div className="text-sm text-gray-200">{faq.answer}</motion.div>
            ),
          }))}
          onChange={(key) => {
            const target = document.getElementById(`faq-${key}`)
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        />
      </div>
    </section>

     <div className="relative overflow-hidden min-h-screen pb-60">

{/* Animated Background */}
  <motion.div
      className="absolute top-0 left-0 w-full h-[110%] bg-hobbiton-animated bg-[length:400%_400%] animate-gradient-x -z-10"
      style={{ y }}
    />

  <div className="relative z-10 flex flex-col space-y-32 py-32">

{/* CTA Section */}
   <section className="px-4 md:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl px-6 md:px-16 lg:px-32 py-20 text-center w-full"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Protect Your Vehicle?</h2>
            <p className="max-w-2xl mx-auto mb-6 text-white/90">
              Let Hobbiton guide you through motor insurance with confidence and ease. Your safety is our priority.
            </p>
            <button
              onClick={() => setShowQuoteModal(true)}
              className="bg-white text-primary px-6 py-3 font-medium hover:bg-opacity-90 transition"
            >
              Request My Quote
            </button>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="px-4 md:px-10 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-12"
          >
            What People Are Saying
          </motion.h2>

          <div className="relative max-w-3xl mx-auto">
            {/* Desktop-only buttons */}
            <button
              className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full shadow-lg"
              onClick={() => carouselRef.current?.prev()}
            >
              <LeftOutlined />
            </button>

            <button
              className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full shadow-lg"
              onClick={() => carouselRef.current?.next()}
            >
              <RightOutlined />
            </button>

            <Carousel
              ref={carouselRef}
              autoplay
              autoplaySpeed={8000}
              dots
              draggable
              className="pb-6"
            >
              {[
                {
                  name: 'Thandi Mwansa',
                  comment: 'I never knew insurance could be this quick and easy. I got my quote in under 3 minutes!',
                  rating: 5,
                },
                {
                  name: 'John Zulu',
                  comment: 'Their support team helped me understand what coverage I needed for my business fleet.',
                  rating: 4,
                },
                {
                  name: 'Rachel Banda',
                  comment: 'The whole process was smooth and completely online. Highly recommend Hobbiton!',
                  rating: 5,
                },
              ].map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5 }}
                  className="px-4"
                >
                  <Card
                    variant="borderless"
                    className="bg-white/10 backdrop-blur-md border border-white/10 text-white max-w-xl mx-auto shadow-xl"
                    styles={{ body: { padding: 24 } }}
                  >
                    <Rate disabled defaultValue={review.rating} style={{ color: '#f4a261', fontSize: '1.25rem' }} />
                    <p className="italic leading-relaxed mt-3">“{review.comment}”</p>
                    <h4 className="font-semibold mt-4">{review.name}</h4>
                  </Card>
                </motion.div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* By The Numbers */}
        <section className="px-4 md:px-10 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-16"
          >
            By The Numbers
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {countersData.map(({ label, value, suffix }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-48 h-48 shadow-lg">
                  <Progress
                    type="circle"
                    percent={value}
                    format={() => `${value}${suffix ?? ''}`}
                    strokeColor="#00b386"
                    trailColor="rgba(255, 255, 255, 0.15)"
                    strokeWidth={10}
                    size={140}
                  />
                </div>
                <p className="text-white font-semibold text-lg">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="px-4 md:px-10 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-12"
          >
            Compare Our Plans
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {[
              {
                title: 'Basic',
                price: 'ZMW 150/mo',
                features: ['Third Party Only', 'Legal Compliance', 'Quick Setup'],
              },
              {
                title: 'Standard',
                price: 'ZMW 300/mo',
                features: ['Fire & Theft', 'TPO Cover', 'Partial Own Damage'],
              },
              {
                title: 'Comprehensive',
                price: 'ZMW 500/mo',
                features: ['Full Vehicle Protection', 'Theft + Fire', 'Natural Disaster Cover'],
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card
                  variant="borderless"
                  className="bg-white/10 backdrop-blur-md border border-white/10 shadow-xl text-white h-full"
                  styles={{ body: { padding: 24 } }}
                >
                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-2xl font-semibold mb-4">{plan.price}</p>
                  <ul className="space-y-2 text-white/80 text-sm mb-4">
                    {plan.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="bg-white text-primary w-full py-2 mt-2 hover:bg-opacity-90 transition"
                  >
                    Choose Plan
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
       {/* Modals */}
  {activeModal !== null && (
    <ReadMoreModals
      contentList={insuranceTypes.map(({ title, details, image }) => ({
        title,
        text: details,
        image,
      }))}
      contentIndex={activeModal}
      isOpen={activeModal !== null}
      onClose={() => setActiveModal(null)}
      setIndex={setActiveModal}
    />
  )}
  {showQuoteModal && (
    <QuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
   
  )
}
 </section>
  </main>
  )
}
