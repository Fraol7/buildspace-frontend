import React from 'react'
import Header from '@/components/Auth/Header';
import SignUpForm from '@/components/Auth/SignUpForm';
import Image from 'next/image';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-indigo-100 via-purple-50 to-white min-h-[100vh]">
        <Header />
        <div className="flex flex-row space-x-8 items-center justify-evenly mt-10">
            <SignUpForm />
            <Image src="/images/signup-art.png" alt="signup-art" width="250" height="250" />
        </div>
    </div>
  )
}

export default SignUp