import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Topbar,Bottonbar,LeftSidebar,RightSidebar } from '@/components/shared'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Threads',
  description:"A Next.js 13 Meta Threads Application"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar/>
          <main>
            <LeftSidebar/>
            <section className='flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10 bg-black'>
              <div className='w-full max-w-4xl'>
                {children}
              </div>
            </section>
            <RightSidebar/>
          </main>
          <Bottonbar/>
          </body>
      </html>
    </ClerkProvider>
  )
}
