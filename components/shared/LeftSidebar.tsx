"use client"
import React from 'react'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { OrganizationSwitcher, SignedIn,SignOutButton } from '@clerk/nextjs'

const LeftSidebar = () => {

  const router = useRouter();
  const pathname = usePathname()
  return (
    <section className='custom-scrollbar scrollbar-w-3 scrollbar-h-3 scrollbar-thumb-rounded-full scrollbar-thumb-gray-500 sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden bg-gray-950'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
         {/* <Link ></Link> */}
         {sidebarLinks.map((link)=>{
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
            return(
              <Link href={link.route} key={link.label} className={`relative flex justify-start gap-4 rounded-lg p-4 ${isActive && 'bg-violet-500'}`}>
              <Image src={link.imgURL} alt={link.label} width={24} height={24}/>
              <p className='text-gray-50 max-lg:hidden'>{link.label}</p>
            </Link>
            )
         })}
      </div>
      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton signOutCallback={()=>router.push('/sign-in')}>
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image src="/assets/logout.svg" alt="logout" width={24} height={24 }/>
              <p className='text-gray-100 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar
