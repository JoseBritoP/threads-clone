"use server"

import User from "../models/user.model";
import Thread from "../models/thread.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from 'next/cache'

interface Params {
  userId: string;
  username:string;
  name:string,
  bio:string,
  image:string,
  path:string
}

export const updateUser = async ({userId,username,name,bio,image,path}:Params):Promise<void> => {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      {id:userId},
      {
        username:username.toLowerCase(),
        name,
        bio,
        image,
        onboarded:true
      },
      {upsert:true}
    );
  
    if(path === "/profile/edit"){
      revalidatePath(path)
    }
  } catch (error:any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
};

export const getUser = async (userId:string) => {
  connectToDB();
  try {
    const user = await User.findOne({id:userId})
    // .populate({
    //   path:'communities',
    //   model: "Community"
    // })
    return user;
  } catch (error:any) {
    console.log(error.message)
  }
}

export const getUserPosts = async (userId:string) => {
  connectToDB();
  try {
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        // {
        //   path: "community",
        //   model: Community,
        //   select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        // },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });

    return threads
  } catch (error:any) {
    console.log('Error: ', error.message)
  }
}