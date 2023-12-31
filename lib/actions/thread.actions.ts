"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Thread from "../models/thread.model";
import Community from "../models/community.model";
import { threadId } from "worker_threads";

interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
}

connectToDB();

export async function createThread({ text, author, communityId, path }: Params) {
  try {
    // connectToDB();

    // const communityIdObject = await Community.findOne(
    //   { id: communityId },
    //   { _id: 1 }
    // );

    const createdThread = await Thread.create({
      text,
      author,
      // community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
      community: null, // Assign communityId if provided, or leave it null for personal account
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    // if (communityIdObject) {
    //   // Update Community model
    //   await Community.findByIdAndUpdate(communityIdObject, {
    //     $push: { threads: createdThread._id },
    //   });
    // }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
};

export async function getThreads(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "community",
      model: Community,
    })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

export async function getThreadById(id:string) {
  try {
    // TODO: Populate Community
    const thread = await Thread.findOne({id})
    .populate({
      path:'author',
      model:User,
      select:'_id id name image'
    })
    .populate({
      path:'children',
      populate:[
        {
          path:'author',
          model:User,
          select:'_id id name parentId image',
        },
        {
          path:'children',
          model:Thread,
          populate:{
            path:'author',
            model:User,
            select:'_id id name parentId image '
          }
        }
      ]
    }).exec();

    return thread;
  } catch (error:any) {
    throw new Error(`Error fetching thread: ${error.message}`)
  }
};

interface NewComment {
  threadId:string,
  commentText:string,
  userId:string,
  path:string
}

export async function addCommentToThread( {threadId,commentText,userId, path}:NewComment) {
  try {
    // Find the original thread by its ID
    // console.log(threadId)
    // console.log(commentText)
    // console.log(userId)
    // console.log(path)
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create the new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save();

    // Add the comment thread's ID to the original thread's children array
    originalThread.children.push(savedCommentThread._id);

    // Save the updated original thread to the database
    await originalThread.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}