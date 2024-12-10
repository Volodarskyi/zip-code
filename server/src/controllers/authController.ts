import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AppError } from '../utils/errorHandler';

// 'api/auth/signup' register new user to DB
interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

const signupController = async (
  req: Request<object, object, SignUpRequestBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with this email already exists
    const candidate = await User.findOne({ email });
    console.log('AUTH_SING_UP_candidate:', candidate);

    if (candidate) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPass,
    });

    // Save the new user to the database
    const saveRes = await newUser.save();

    // Send a success response
    res.status(201).json({
      result: 'SUCCESS',
      data: { name: saveRes.name, userId: saveRes._id },
      message: 'New user added',
    });
  } catch (error) {
    console.error('ERROR (SingUp):', error);

    next(error); // Forward error to the global error handler
  }
};

// 'api/auth/signin'
interface SignInRequestBody {
  email: string;
  password: string;
}

const signinController = async (
  req: Request<object, object, SignInRequestBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    console.log('Signin user:', user);

    if (!user) {
      throw new AppError('User is not found', 400);
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError('Invalid password', 400);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '48h' },
    );

    const data = { token, userId: user.id };

    res.status(201).json({
      result: 'SUCCESS',
      data,
      message: 'Sing In complete',
      details: '',
    });
  } catch (error) {
    console.error('Sign In error:', error);
    next(error); // Forward error to the global error handler
  }
};

export default {
  signupController,
  signinController,
};
