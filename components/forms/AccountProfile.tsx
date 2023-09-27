"use client"

import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from '@/components/ui/form'
import { Input,Button,Textarea } from '../ui/'
import Image from 'next/image'
import useAccountProfile from '@/hooks/useAccountProfile'

interface Props{
  user:{
    id:string
    objectId:string
    username:string
    name:string
    bio:string
    image:string
  },
  btnTitle:string
}

const AccountProfile = ({user,btnTitle}:Props) => {

  const { form, handleImage, onSubmit} = useAccountProfile(user)
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-start gap-10'>
      <FormField
          control={form.control}
          name='profile_photo'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='flex h-24 w-24 items-center justify-center rounded-full bg-gray-950'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 font-medium text-gray-100'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add profile photo'
                  className='cursor-pointer border-none bg-transparent outline-none file:text-blue-600 font-semibold'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='font-semibold text-gray-200 hover:cursor-pointer'>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='border border-gray-950 bg-gray-300 text-light-1
                   focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-gray-500'
                   placeholder='Add your name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='font-semibold text-gray-300 hover:cursor-pointer'>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='border border-gray-950 bg-gray-300 text-light-1
                  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-gray-500'
                  placeholder='Agree your username'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='font-semibold text-gray-300 hover:cursor-pointer'>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className='border border-gray-950 bg-gray-300 text-light-1
                  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 resize-none placeholder:text-gray-500'
                  placeholder='Agree a bio'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile
