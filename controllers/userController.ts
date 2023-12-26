import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import User, { IUser } from '../models/User'
import generateToken from '../utils/generateToken'

/**
 * @Desc Get all users
 * @Route /api/auth
 * @Method GET
 */

export const getAll = async (req: Request, res: Response) => {
  const users = await User.find({}).select('-password')
  return res.status(201).json(users)
}

/**
 * @Desc Login
 * @Route /api/auth/
 * @Method POST
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(401).send({ message: 'Invalid credentials.' })
  }

  const user = (await User.findOne({ email })) as IUser

  if (!user) {
    return res.status(401).send('User not found.')
  }
  const isValidPassword = await user?.comparePassword(password)
  if (isValidPassword) {
    return res.status(201).json({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      token: generateToken(user._id),
    })
  } else {
    return res.status(401).send('Email or password incorrect')
  }
}

/**
 * @Desc Register
 * @Route /api/auth/register
 * @Method POST
 */

export const register = async (req: Request, res: Response) => {
  const { email, fullName, password } = req.body
  if (!email || !fullName || !password) {
    return res
      .status(401)
      .json({ message: 'Email, Full Name or password required.' })
  }
  let user = new User({
    email,
    fullName,
    password,
  })
  user = await user.save()
  res.status(201).json({
    user: {
      fullName: user.fullName,
      token: generateToken(user.id),
    },
  })
}
