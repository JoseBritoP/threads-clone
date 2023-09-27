import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { OrganizationSwitcher, SignedIn,SignOutButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
const Topbar = () => {
  return (
    <nav className='fixed top-0 z-30 flex w-full items-center justify-between px-6 py-3 bg-gray-950 border-b-2 border-b-gray-900'>
      <Link href="/" className='flex items-center gap-4'>
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28}/>
        <p className='text-2xl font-bold text-gray-100'>Threads</p>
      </Link>
      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <Image src="/assets/logout.svg" alt="logout" width={24} height={24 }/>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher appearance={{
          baseTheme:dark,
          elements:{
            organizationSwitcherTrigger:"py-2 px-4"
          }
        }}/>
      </div>
    </nav>
  )
}

export default Topbar
