/* eslint-disable max-len */
/* eslint-disable new-cap */
import mongoose from 'mongoose';
import { Request, Response } from 'express';

import Post from '../models/post';

const getPost = async (req: Request, res: Response) => {
  const { postId } = req?.params;

  const post = await Post.findById(postId).select('-__v');

  if (!post) {
    return res.status(500).json({
      error_message: 'Post not found',
    });
  }

  return res.status(200).json({
    data: post,
  });
};

const likePost = async (req: Request, res: Response) => {
  const { postId } = req?.params;
  const { userId } = req?.body;

  const post = await Post.findById(postId).select('-__v');

  if (!post) {
    return res.status(500).json({
      error_message: 'Post not found',
    });
  }

  try {
    if (post?.likes?.indexOf(userId) === -1) {
      post.likes = [...post?.likes, userId];
      await post.save();
    } else {
      const updatedLikes = post?.likes?.filter((user: any) => {
        const a = new mongoose.Types.ObjectId(userId);

        return !user.equals(a);
      });

      post.likes = updatedLikes;
      await post.save();
    }

    const updatedPost = await Post.findById(postId);

    return res.status(200).json({
      likes: updatedPost.likes,
    });
  } catch (error) {
    return res.status(500).json({
      error_message: 'Like failed',
      error_data: error,
    });
  }
};

const createPost = async (req: Request, res: Response) => {
  const { owner, content } = req?.body;

  try {
    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      owner,
      content,
      likes: [],
      comments: [],
      updatedAt: Date.now(),
    });

    await post.save();

    return res.status(201).json({
      message: 'Post created with success',
      _id: post?.id,
    });
  } catch (error) {
    return res.status(500).json({
      error_message: 'Post creation failed',
      error_data: error,
    });
  }
};

// TODO: Delete post - Comment Post - Get all posts by a user

export default {
  getPost,
  createPost,
  likePost,
};
