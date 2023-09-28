import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation'
import { getUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";

const page = async ({params}:{params:{id:string}}) => {
  
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await getUser(params.id);

  if(!userInfo?.onboarded) redirect('/onboarding');
  
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
       <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='flex min-h-[50px] flex-1 items-center gap-3 bg-slate-950 text-gray-200 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-gray-100'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-full bg-gray-900 px-2 py-1 text-base text-gray-200'>
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full text-gray-100'
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'
              />
            </TabsContent>
          ))}
        </Tabs>
    </section>
  )
}

export default page; 