import AccountProfile from "@/components/forms/AccountProfile";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function Page () {

  const user = await currentUser()
  if(!user) return null;
  
  const userInfo = await getUser(user.id);

  const userData = {
    id:user?.id || "",
    objectId: userInfo?._id || "",
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl
  }
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-10">
      <h1 className="text-2xl text-white">Onboarding</h1>
      <p className="mt-3 text-base text-slate-100">Complete your profile to use Threads</p>
      <section className="mt-9 bg-[#111] p-10 rounded-md">
        <AccountProfile user={userData} btnTitle="Continue"/>
      </section>
    </main>
  )
}

export default Page;