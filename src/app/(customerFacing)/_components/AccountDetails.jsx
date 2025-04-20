
import prisma from '@/src/db/db'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { formatIndianCurrency, formatIndianNumber } from '@/src/lib/formatter';
import AddressCard from './AddressCard';

async function AccountDetails ({ userData }) {

  const address = userData.streetAddress ? {
    mobile: userData.mobile || '',
    streetAddress: userData.streetAddress || '',
    city: userData.city || '',
    state: userData.state || '',
    pinCode: userData.pinCode || '',
  } : null;
  const salesData = await getSalesData(userData.id);
  return (
    // <div className="container mx-auto p-4 w-[50%]"> 
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
      {/* <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form> */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <b>Name:</b> <span>{userData?.username || userData?.name}</span>
        </CardContent>
        <CardContent>
          <b>Email:</b> <span>{userData?.email}</span>
        </CardContent>
      </Card>
      <AddressCard address={address}/>
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
        <b>Amount:</b> <span>{`${formatIndianCurrency(salesData.amount)}` ||  'No Money Spent'}</span>
        </CardContent>
        <CardContent>
          <b>Total Orders:</b> <span>{`${formatIndianNumber(salesData.numberOfSales)}` || 'Please order first'}</span>
        </CardContent>
        <CardContent>
          For more detail: visit <a href='my-orders' className='text-blue-300 hover:underline'>My Orders</a>.
        </CardContent>
      </Card>

    </div>
  );
};


async function getSalesData (userId) {
  const data = await prisma.orders.aggregate({
    where: {
      user_id: userId, // Filter for specific user's orders
    },
   _sum: { total_price: true},
   _count: true
  })
  return {
   amount: (data._sum.total_price || 0),
   numberOfSales: data._count
  }
 }

export default AccountDetails;