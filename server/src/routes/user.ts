/* eslint-disable indent */
/* eslint-disable consistent-return */
import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import User from '../models/user';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req?.params;

  const user = await User.findById(userId).select('-__v');

  if (user) {
    return res.status(200).json({
      data: user,
    });
  }

  return res.status(500).json({
    error_message: 'User not found',
  });
});

router.post('/signup', async (req, res) => {
  const {
    email, password, firstName, lastName,
  } = req?.body;

  const userExistsCheck = await User.find({ email });

  if (userExistsCheck?.length) {
    return res.status(500).json({
      error_message: 'Email already taken',
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      profilePic: 'https://res.cloudinary.com/dbukg7rbr/image/upload/v1634170489/a_j14mm4.jpg',
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await user.save();

    const privateKey = process.env.JWT_SECRET as string;

    const token = jwt.sign({
      email: user?.email,
      userId: user?._id,
    }, privateKey, {
      expiresIn: '1h',
    });

    return res.status(201).json({
      message: 'User created',
      data: {
        _id: user?._id,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error_message: 'Failed to create a user',
      error_data: error,
    });
  }
});

router.put('/:userId', async (req, res) => {
  const { userId } = req?.params;

  if (Object.keys(req.body).length === 0) {
    return res.status(500).json({
      error_message: 'Nothing was sent to the server',
    });
  }

  try {
    await User.findOneAndUpdate({ id: userId }, req?.body);

    return res.status(200).json({
      message: 'Updated user with success',
    });
  } catch (error) {
    return res.status(500).json({
      error_message: 'Update failed',
      error_data: error,
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req?.body;

  const user = await User.findOne({ email }).select('-__v');

  // check if user exists
  if (!user) {
    return res.status(500).json({
      error_message: 'Auth failed',
    });
  }

  try {
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    const privateKey = process.env.JWT_SECRET || '';

    if (isPasswordCorrect) {
      const token = jwt.sign({
        userId: user?._id,
        email: user?.email,
      }, privateKey,
        {
          expiresIn: '1h',
        });

      return res.status(200).json({
        token,
        data: user,
      });
    }

    return res.status(500).json({
      error_message: 'Auth failed',
    });
  } catch (error) {
    return res.status(500).json({
      error_message: 'Auth failed',
    });
  }
});

export default router;
