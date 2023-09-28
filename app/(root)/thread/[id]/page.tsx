import ThreadCard from "@/components/cards/ThreadCard"
import { getThreadById } from "@/lib/actions/thread.actions";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";
const Page = async ({params}:{params:{id:string}}) => {

  if(!params.id) return null;

  const user = await currentUser();
  if(!user) return null;

  const userInfo = await getUser(user.id);
  // console.log(userInfo)
  if(userInfo?.onboarded === false) redirect('/onboarding');

  const thread = await getThreadById(params.id);

  return (
    <section className="relative">
      <div>
       <ThreadCard
          key={thread.id}
          id={thread.id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.comments}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
         {thread.children.map((childItem:any)=>(
         <ThreadCard
            key={childItem.id}
            id={childItem.id}
            currentUserId={childItem?.id || ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.comments}
            isComment={true}
          />
         ))}
      </div>
    </section>
  )
}

export default Page
