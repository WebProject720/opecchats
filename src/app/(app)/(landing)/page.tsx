'use client'
import Image from 'next/image';
import '../globals.css'
import { LinkButton } from '@/components/custom/LinkButton';
import { useEffect } from 'react';
import axios from 'axios';
import { state } from '@/store/poxy';


export default function Page() {
  useEffect(() => {
    try {
      // axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/logout`, {},
      //   {
      //     withCredentials: true,
      //     headers: {
      //       'Content-Type': 'application/json',  // Ensure the content type is correct
      //     }
      //   }).then((res) => {
      //     console.log(res);
      //   }).catch((err) => {
      //     console.log(err);
      //   })
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/GuestLogout`, {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',  // Ensure the content type is correct
          }
        }).then((res) => {
          state.loggedUser = {};
          state.isActive = false
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
    } catch (error) {
      console.log(error);
    }
  }, [])
  return (
    <div className=" bg-slate-700 text-white
    w-full min-h-screen  bg-gradient-to-t from-[#969697] to-[#2e2c5c]
    p-3 flex justify-center flex-col items-center
    bg-radient 
    ">
      <div className='w-full h-full mt-7'>
        <div className='w-full h-3/4 
        flex justify-center flex-col gap-10 items-center'>
          <Image alt='Logo' width={200} height={200} src='/logo-black.svg'
            className='rounded-full'
          ></Image>
          <div>
            <h1 className='text-4xl font-bold font-serif hover:scale-110
            transition-all duration-700 phone:text-xl  animate-pulse  text-center
            '>
              Welcome
              <span className='text-[#1ef519] text-5xl'> To
              </span>
              <span>  OpecChats </span>
            </h1>
          </div>
          <div className='flex flex-row gap-4 justify-center w-3/4'>
            {/* <LinkButton className='w-52 font-bold' text='Login' url='/auth'></LinkButton> */}
            <LinkButton className='w-52 font-bold' text='Join Group as Guest' url='/auth/guest'></LinkButton>
            <LinkButton className='w-52 font-bold' url='/dashboard' text='Get Started ->'></LinkButton>
          </div>
        </div>
      </div>
      <div className='w-full laptop:w-2/3 p-4 bg-white bg-opacity-10 rounded mt-6'>
        <div className="heading">
          <div>
            <h1 className='text-3xl font-bold font-serif'>
              About OpecChats
            </h1>
            <hr className='mt-2 mb-2' />
          </div>
          <div>
            <p className='font-light p-2 indent-5'>
              <strong> OpecChats</strong> not only brings advanced messaging capabilities but also focuses on providing a more personalized and enriched communication experience. It introduces features like multi-device sync, allowing users to access their chats across devices without interruption. The app also supports larger group capacities, making it ideal for businesses, communities, and large social circles. With enhanced media sharing options and integrated file support, users can collaborate more effectively. OpecChats ensures a secure, smooth, and tailored experience, with intuitive design elements that let users interact more comfortably. It’s built for those who need more than just messaging—it's a communication hub.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

