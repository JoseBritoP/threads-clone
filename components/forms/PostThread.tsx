"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import usePostThread from "@/hooks/usePostThread";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";


interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
 
  const { form, onSubmit } = usePostThread(userId)

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='font-semibold text-xl text-gray-200 hover:cursor-pointer'>
                Content
              </FormLabel>
              <FormControl className='focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border border-gray-950 bg-gray-900 text-gray-100'>
                <Textarea rows={15} {...field} className="resize-none placeholder:text-gray-400" placeholder="What's going on??..."/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-violet-800 text-lg font-semibold hover:font-bold hover:bg-violet-600'>
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;