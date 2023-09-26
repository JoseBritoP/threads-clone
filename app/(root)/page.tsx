import { UserButton } from "@clerk/nextjs";
 
export default function Home() {
  return (
    <div className="bg-slate-700">
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}