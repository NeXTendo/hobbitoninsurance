'use client';

import { useState } from 'react';
import AuthModal from '@/components/auth/AuthModal';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { message } from 'antd';

type User = {
  name?: string;
  role: 'admin' | 'user';
  avatarUrl?: string;
};

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <Header
        onLoginClick={() => setShowAuth(true)}
        onLogout={() => {
          setUser(null);
          message.success('Logged out');
        }}
        user={user}
      />
      <main className="min-h-[80vh] pt-4 sm:pt-8 px-2 sm:px-6">{children}</main>
      <Footer />
      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setShowAuth(false);
        }}
      />
    </>
  );
}
