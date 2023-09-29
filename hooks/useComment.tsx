"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId:string
  currentUserId:string
}
const useComment = ({threadId,currentUserId}:Props) => {

  const pathname = usePathname();
  
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    console.log(values)
    await addCommentToThread({
      threadId,
      commentText:values.thread,
      userId:JSON.parse(currentUserId),
      path:pathname
    });

    form.reset();
  };

  return {form, onSubmit}
};

export default useComment