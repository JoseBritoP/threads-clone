import React from 'react'
import Image from 'next/image'
import { profileTabs } from '@/constants'
import ThreadsTab from '@/components/shared/ThreadsTab'
import { currentUser } from '@clerk/nextjs'
import { getUser } from '@/lib/actions/user.actions'
import { getUsers } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import UserCard from '@/components/cards/UserCard'

const Page = async () => {

  const user = await currentUser();
  if(!user) return null;

  const userInfo = await getUser(user.id);
  if(userInfo?.onboarded === false) redirect('/onboarding');
  
  const result = await getUsers({
    userId:user.id,
    searchString:'',
    pageNumber:1,
    pageSize:25
  });

  return (
    <section>
      <h1 className='text-4xl font-bold mb-10 text-white'>Search</h1>
      {/* Searchbar */}

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p className='text-center text-lg text-gray-300'>No users</p>
        ) : (
          <>
          {result.users.map((person)=>(
            <UserCard
              key={person.id}
              id={person.id}
              name={person.name}
              username={person.username}
              imgUrl= {person.image}
              personType = 'User'
            />
          ))}
          </>
        )}
      </div>
    </section>
  )
}

export default Page
