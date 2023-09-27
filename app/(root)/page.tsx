import { getThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";
export default async function Home() {

  const user = await currentUser();
  const threads = await getThreads(1,30);
  // console.log(threads.posts);
  return (
    <>
      <h1 className="text-4xl font-bold text-white">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {threads.posts.length === 0 || !threads.posts.length ? (
          <p className="text-center text-lg text-gray-300">No threads found</p>
        ) : (
          <>
            {threads.posts.map((post)=>(
              <ThreadCard
                key={post.id}
                id={post.id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.comments}
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}