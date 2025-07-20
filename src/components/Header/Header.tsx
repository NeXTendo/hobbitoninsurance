'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  Dropdown,
  Button,
  Drawer,
  Tag,
  Avatar,
  Space,
} from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  LoginOutlined,
  DownOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  onLoginClick?: () => void;
  onLogout?: () => void;
  user?: {
    name?: string;
    role: 'admin' | 'user';
    avatarUrl?: string;
  } | null;
};

export default function Header({ onLoginClick, onLogout, user }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const productItems = [
    { key: 'insurance', label: <Link href="/insurance">Insurance</Link> },
    { key: 'savings', label: <Link href="/savings">Savings</Link> },
    { key: 'loans', label: <Link href="/loans">Loans</Link> },
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="account" disabled>
        {user?.name}
      </Menu.Item>
      {user?.role === 'admin' && (
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link href="/dashboard">Admin Dashboard</Link>
        </Menu.Item>
      )}
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

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

          <Dropdown menu={{ items: productItems }} trigger={['hover']} placement="bottom">
            <span className="text-gray-700 hover:text-hobbiton-primary cursor-pointer transition flex items-center">
              Products <DownOutlined className="ml-1 text-xs" />
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

          {user?.role === 'admin' && (
            <Link
              href="/dashboard"
              className={`hover:text-hobbiton-primary transition ${
                pathname === '/dashboard' ? 'text-hobbiton-primary font-semibold' : 'text-gray-700'
              }`}
            >
              Dashboard
            </Link>
          )}

          {/* Auth Section */}
          <div className="ml-6">
            {user ? (
              <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar
                    src={user.avatarUrl}
                    size="small"
                    style={{ backgroundColor: '#1677ff' }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Tag color={user.role === 'admin' ? 'red' : 'blue'}>{user.role}</Tag>
                </div>
              </Dropdown>
            ) : (
              <Space>
                <Button icon={<LoginOutlined />} type="text" onClick={onLoginClick}>
                  Login
                </Button>
                <Button type="primary" onClick={onLoginClick}>
                  Sign Up
                </Button>
              </Space>
            )}
          </div>
        </div>

        {/* Mobile Section */}
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
          />
        </div>

        {/* Drawer for Mobile */}
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
        >
          {user && (
            <div className="px-4 pt-2 pb-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar src={user.avatarUrl} style={{ backgroundColor: '#1677ff' }}>
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-gray-800">{user.name}</div>
                  <Tag color={user.role === 'admin' ? 'red' : 'blue'}>{user.role}</Tag>
                </div>
              </div>
              <Button
                size="small"
                icon={<LogoutOutlined />}
                onClick={() => {
                  setOpen(false);
                  onLogout?.();
                }}
              >
                Logout
              </Button>
            </div>
          )}

          <Menu mode="vertical" selectable={false}>
            <Menu.Item key="home">
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.SubMenu key="products" title="Products">
              {productItems.map((item) => (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
              ))}
            </Menu.SubMenu>
            <Menu.Item key="quote">
              <Link href="/quote">Get Quote</Link>
            </Menu.Item>
            {user?.role === 'admin' && (
              <Menu.Item key="dashboard">
                <Link href="/dashboard">Admin Dashboard</Link>
              </Menu.Item>
            )}
            {!user && (
              <>
                <Menu.Item key="login" onClick={() => { setOpen(false); onLoginClick?.(); }}>
                  Login
                </Menu.Item>
                <Menu.Item key="signup" onClick={() => { setOpen(false); onLoginClick?.(); }}>
                  Sign Up
                </Menu.Item>
              </>
            )}
          </Menu>
        </Drawer>
      </div>
    </header>
  );
}
