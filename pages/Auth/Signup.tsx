import React from 'react'
import Header from '@/components/Auth/Header';
import SignUpForm from '@/components/Auth/SignUpForm';
import Image from 'next/image';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center">
        <Header />
        <div className="flex flex-row space-x-8 items-center w-[80%]">
            <SignUpForm />
            <Image src="/images/signup-art.png" alt="signup-art" width="300" height="300" />
        </div>
    </div>
  )
}

export default SignUp