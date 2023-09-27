import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation'
import { getUser } from "@/lib/actions/user.actions";
import PostThread from "@/components/forms/PostThread";

async function Page(){

  const user = await currentUser();

  if(!user) return null;

  const userInfo = await getUser(user.id);

  if(!userInfo?.onboarded) redirect('/onboarding');
  return (
    <>
      <h1 className="text-white text-2xl font-semibold">Create Threads</h1>
      <PostThread userId={userInfo._id}/>
    </>
  )
}

export default Page;