import Image from 'next/image'
import { profileTabs } from '@/constants'
import ThreadsTab from '@/components/shared/ThreadsTab'
import { currentUser } from '@clerk/nextjs'
import { getUser, getUserActivty } from '@/lib/actions/user.actions'
import { getUsers } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import UserCard from '@/components/cards/UserCard'
import Link from 'next/link';

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

  // // get activity

  const activity = await getUserActivty(userInfo?._id);

  return (
    <section>
      <h1 className='text-4xl font-bold mb-10 text-white'>Activity</h1>
      <section className='mt-10 flex flex-col gap-5'>
        {activity && activity.length > 0 ? (
          <>
            {activity.map((act)=>(
              <Link key={act.id} href={`/thread/${act.parentId}`}>
                <article className='flex items-center gap-2 rounded-md bg-slate-950 px-7 py-4'>
                  <Image src={act.author.image} alt='profile picture' width={50} height={50} className='rounded-full object-cover'/>
                  <p className='text-gray-100'><span className='mr-1 text-violet-500'>{act.author.name}</span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className='text-gray-400 text-xl font-semibold px-2'>No activity</p>
        )}
      </section>
    </section>
  )
}

export default Page
