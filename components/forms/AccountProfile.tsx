"use client"
import { useState } from 'react'
import { ChangeEvent } from 'react'
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { UserValidation } from '@/lib/validations/user.'
import { Input } from '../ui/input'
import { Textarea } from "@/components/ui/textarea";
import { isBase64Image } from '@/lib/utils'
import z from 'zod'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useUploadThing } from '@/lib/uploadthing'

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
  
  const [files,setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media");
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues:{
      profile_photo: user?.image || "",
      name:user?.name || "",
      username: user?.username || "",
      bio: user?.bio || ""
    }
  })

  const handleImage = (e:ChangeEvent<HTMLInputElement>,fieldChange:(value:string)=>void) =>{
    e.preventDefault();

    const fileReader = new FileReader();
    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if(!file.type.includes('image')) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl)
      }
      fileReader.readAsDataURL(file);
    }
  }; 

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    console.log(values)
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if(hasImageChanged){
      const imgRes = await startUpload(files);
      if(imgRes && imgRes[0].url){
        values.profile_photo = imgRes[0].url
      }
    }

    // TODO: Update user profile
  }
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
