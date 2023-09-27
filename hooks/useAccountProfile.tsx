import { useState } from 'react'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { UserValidation } from '@/lib/validations/user.'
import { isBase64Image } from '@/lib/utils'
import z from 'zod'
import { useUploadThing } from '@/lib/uploadthing'

interface User {
  id:string
  objectId:string
  username:string
  name:string
  bio:string
  image:string
}

const useAccountProfile = (user:User) => {

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
  });

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
  };

  return { form, handleImage, onSubmit}
}

export default useAccountProfile;