"use client";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel,} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useComment from "@/hooks/useComment";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ threadId, currentUserImg, currentUserId }: Props) {

  const { form, onSubmit } = useComment({threadId,currentUserId})

  return (
    <Form {...form}>
      <form className='mt-10 flex items-center gap-4 border-2 border-[#111] py-5 max-xs:flex-col p-4 rounded-lg' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt='current_user'
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comment...'
                  className='focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-gray-100 outline-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='rounded-3xl bg-violet-500 px-8 py-2 text-base text-gray-100 max-sm:w-full hover:bg-violet-700'>
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;