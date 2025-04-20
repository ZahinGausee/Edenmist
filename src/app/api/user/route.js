import argon2 from "argon2";
import { NextResponse } from "next/server";
import prisma from "@/src/db/db";
import * as z from 'zod';

//  Define a schema for input validation
const UserSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  });

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, username, password } = UserSchema.parse(body);
    
    // Check if the user already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);
    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    // Respond with the created user (omit sensitive info like password)
    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
