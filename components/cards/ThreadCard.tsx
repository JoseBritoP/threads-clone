import Image from 'next/image'
import Link from 'next/link'


interface Props {
  id: string
  currentUserId: string | ""
  parentId: string | null
  content: string
  author: {
    name:string
    image:string
    id:string
  }
  community: {
    id:string
    name:string
    image:string
  } | null
  createdAt: string
  comments: {
    author:{
      image:string
    }
  }[]
  isComment?:boolean
}

const ThreadCard = ({id, currentUserId, parentId, content, author, community, createdAt, comments,isComment}:Props) => {

  //TODO: Like buttom
  return (
    <article className={`flex w-full flex-col rounded-xl p-7 ${isComment ? 'px-0 sm:px-7' : 'bg-[#111]'}`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image src={author.image} alt="profile_image" fill className='hover:cursor-pointer rounded-full'/>
            </Link>
            <div className='relative mt-2 w-0.5 grow rounded-full bg-neutral-800'/>
          </div>
          <div className='flex flex-col w-full '>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='hover:cursor-pointer font-semibold text-gray-100 hover:shadow-sm'>{author.name}</h4>
            </Link>
            <p className='mt-2 text-base text-gray-100'>{content}</p>

           <div className={`${isComment && 'mb-10'}mt-5 flex flex-col gap-3`}>
            <div className='flex gap-3'>
              <Image src="/assets/heart-gray.svg" alt='heart' width={24} height={24} className='hover:cursor-pointer object-contain'/>
              <Link href={`/thread/${id}`}>
                <Image src="/assets/reply.svg" alt='reply' width={24} height={24} className='hover:cursor-pointer object-contain'/>
              </Link>
              <Image src="/assets/repost.svg" alt='repost' width={24} height={24} className='hover:cursor-pointer object-contain'/>
              <Image src="/assets/share.svg" alt='share' width={24} height={24} className='hover:cursor-pointer object-contain'/>
            </div>
            {/* {isComment && comments.length > 0 && (
              <Link href={`/thread/${id}`} className='bg-red-500 p-4'>
                <p className='mt-1 text-lg text-gray-300'>{comments.length} replies</p>
              </Link>
            ) } */}
           </div>
          </div>
        </div>
      </div>
    </article>
  )
};

export default ThreadCard