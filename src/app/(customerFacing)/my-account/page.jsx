import prisma from '@/src/db/db';
import { authOptions } from '@/src/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import AccountDetails from '../_components/AccountDetails';
import AddressCard from '../_components/AddressCard';

export default async function MyAccountPage() {
  const session = await getServerSession(authOptions);

  // Early return if no session
  if (!session?.user?.email) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] px-6 text-center text-gray-600">
        Please login to view your account.
      </div>
    );
  }

  const userData = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // If user not found in DB (edge case)
  if (!userData) {
    return (
      <p className="p-4 m-3 text-center">User not found. Please contact support.</p>
    );
  }

  return (
    <div>
      <h1 className="text-3xl m-4">
        Hello, {userData.name || userData.username}
      </h1>
      <AccountDetails userData={userData} />
      <p className="p-4 m-3 text-center">
        The following addresses can be used on the checkout page.
      </p>
      <AddressCard userId={userData.id} />
    </div>
  );
}
