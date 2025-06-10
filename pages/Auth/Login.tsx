import React from 'react'
import Header from '@/components/Auth/Header';
import LoginForm from '@/components/Auth/LoginForm';

const Login = () => {
  return (
    <div className='bg-gradient-to-b from-blue-100 via-purple-50 to-white min-h-[100vh]'>
      <Header />
      <LoginForm />
    </div>
  )
}

export default Login