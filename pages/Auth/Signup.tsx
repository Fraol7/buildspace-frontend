import React from 'react'
import Header from '@/components/Auth/Header';
import SignUpForm from '@/components/Auth/SignUpForm';
import Image from 'next/image';

const SignUp = () => {
  return (
    <div className='bg-gradient-to-b from-indigo-100 via-purple-50 to-white min-h-[100vh]'>
        <Header />
        <div className="flex flex-col md:flex-row items-center justify-evenly">
            <SignUpForm />
            <Image src="/images/signup--art.png" alt="signup-art" width="600" height="700" />
        </div>
    </div>
  )
}

export default SignUp