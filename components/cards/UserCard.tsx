"use client"

import Image from "next/image";
import { Button } from "../ui";
import { useRouter } from "next/navigation";
interface Props {
  id:string
  name:string
  username:string
  imgUrl:string
  personType:string
}

const UserCard = ({id,name,username,imgUrl,personType}:Props) => {

  const router = useRouter();

  return (
    <article className="flex flex-col justify-between gap-4 max-sm:rounded-xl max-xs:bg-slate-950 max-xs:p-4 sm:flex-row sm:items-center p-6 bg-gray-950 rounded-lg ">
      <div className="flex flex-1 items-start justify-start gap-3 sm:items-center">
        <Image src={imgUrl} alt="logo" width={48} height={48} className="rounded-full"/>
        
        <div className="flex-1 text-ellipsis">
          <h4 className="text-lg font-semibold text-gray-100">{name}</h4>
          <h4 className="text-base font-semibold text-gray-300">@{username}</h4>
        </div>
      </div>
      <Button className="h-auto min-w-[74px] rounded-lg bg-violet-600 hover:bg-violet-800 text-[12px] text-gray-100 font-semibold text-base" onClick={()=>router.push(`/profile/${id}`)}>View</Button>
    </article>
  )
}

export default UserCard
