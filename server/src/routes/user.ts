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
    return res.status(200).json(user);
  }

  return res.status(500).json({
    error_message: 'User not found',
  });
});

router.post('/signup', async (req, res) => {
  const {
    email, password, firstName, lastName, description,
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
      profilePic:
        'https://res.cloudinary.com/dbukg7rbr/image/upload/v1634170489/a_j14mm4.jpg',
      email,
      firstName,
      lastName,
      description,
      password: hashedPassword,
    });

    await user.save();

    const privateKey = process.env.JWT_SECRET as string;

    const token = jwt.sign(
      {
        email: user?.email,
        userId: user?._id,
      },
      privateKey,
      {
        expiresIn: '1h',
      },
    );

    return res
      .cookie('socialMediaTokenLogin', token, {
        expires: new Date(Date.now() + 900),
        secure: false,
        httpOnly: true,
      })
      .cookie('socialMediaIsLogged', 'true', {
        expires: new Date(Date.now() + 900),
        secure: false,
        httpOnly: false,
      })
      .status(201)
      .json({
        message: 'User created',
        data: {
          _id: user?._id,
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
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, req?.body);

    return res.status(200).json({
      message: 'Updated user with success',
      data: updatedUser,
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
      const token = jwt.sign(
        {
          userId: user?._id,
          email: user?.email,
        },
        privateKey,
        {
          expiresIn: '1h',
        },
      );

      return res
        .cookie('socialMediaTokenLogin', token, {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
          secure: false,
          httpOnly: true,
        })
        .cookie('socialMediaIsLogged', 'true', {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
          secure: false,
          httpOnly: false,
        })
        .status(200).json(user);
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

router.post('/signout', async (req, res) => res.status(200).clearCookie('socialMediaIsLogged').json({
  message: 'User signed out successfully',
}));

export default router;
