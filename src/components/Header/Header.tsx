'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Dropdown, Button, Drawer } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  onLoginClick?: () => void;
};

export default function Header({ onLoginClick }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const productMenu = {
    items: [
      { key: '1', label: <Link href="/insurance">Insurance</Link> },
      { key: '2', label: <Link href="/savings">Savings</Link> },
      { key: '3', label: <Link href="/loans">Loans</Link> }
    ],
    placement: 'bottom'
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/hobbiton2.png"
            alt="Hobbiton Logo"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`hover:text-hobbiton-primary transition ${
              pathname === '/' ? 'text-hobbiton-primary font-semibold' : 'text-gray-700'
            }`}
          >
            Home
          </Link>

          <Dropdown menu={productMenu} trigger={['hover']} placement="bottom">
            <span className="text-gray-700 hover:text-hobbiton-primary cursor-pointer transition">
              Products
            </span>
          </Dropdown>

          <Link
            href="/quote"
            className={`hover:text-hobbiton-primary transition ${
              pathname === '/quote' ? 'text-hobbiton-primary font-semibold' : 'text-gray-700'
            }`}
          >
            Get Quote
          </Link>

          {/* Login/Signup Buttons */}
          <div className="flex gap-4 items-center ml-6">
            <button
              onClick={onLoginClick}
              className="text-gray-700 hover:text-hobbiton-primary transition flex items-center"
            >
              <LoginOutlined className="mr-1" />
              Login
            </button>
            <button
              onClick={onLoginClick}
              className="bg-hobbiton-primary hover:bg-hobbiton-hover text-white py-1.5 px-4 rounded-lg transition"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <UserOutlined
            className="text-lg text-gray-700 cursor-pointer"
            onClick={onLoginClick}
          />
          <Button
            icon={<MenuOutlined />}
            type="text"
            className="text-gray-700"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          />
        </div>

        {/* Drawer for Mobile Navigation */}
        <Drawer
          title={
            <div className="flex items-center gap-2 text-hobbiton-primary font-bold text-lg">
              <Image src="/hobbiton2.png" alt="Hobbiton Logo" width={24} height={24} />
              Hobbiton
            </div>
          }
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
          width="85vw"
          className="md:hidden"
        >
          <Menu mode="vertical" selectable={false}>
            <Menu.Item key="home">
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.SubMenu key="products" title="Products">
              <Menu.Item key="insurance">
                <Link href="/insurance">Insurance</Link>
              </Menu.Item>
              <Menu.Item key="savings">
                <Link href="/savings">Savings</Link>
              </Menu.Item>
              <Menu.Item key="loans">
                <Link href="/loans">Loans</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="quote">
              <Link href="/quote">Get Quote</Link>
            </Menu.Item>
            <Menu.Item key="login" icon={<UserOutlined />}>
              <span onClick={onLoginClick}>Login</span>
            </Menu.Item>
            <Menu.Item key="signup">
              <span onClick={onLoginClick}>Sign Up</span>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </header>
  );
}
