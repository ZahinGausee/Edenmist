import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import prisma from '@/src/db/db';
import { formatIndianCurrency, formatIndianNumber } from '@/src/lib/formatter';
import { resolve } from 'styled-jsx/css';

const AdminDashboard = async () => {
  const [salesData, userData, productData] = await Promise.all([getSalesData(), getUserData(), getProductData()])
  return <>
   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    <DashboardCard 
      title="Sales" 
      subtitle={`${formatIndianNumber(salesData.numberOfSales)} Orders`} 
      content={formatIndianCurrency(salesData.amount)}/>
    <DashboardCard 
      title="Customers" 
      subtitle={`${formatIndianNumber(userData.totalUsers)} Users`} 
      content={`${formatIndianCurrency(userData.avgUserSalesValue)}`}/>
    <DashboardCard 
      title="Products" 
      subtitle={`${formatIndianNumber(productData.inactiveProducts)} Inactive`} 
      content={formatIndianNumber(productData.activeProducts)}/>
   </div>
  </>
}

export default AdminDashboard



async function getSalesData () {
 const data = await prisma.orders.aggregate({
  _sum: { total_price: true},
  _count: true
 })
 return {
  amount: (data._sum.total_price || 0),
  numberOfSales: data._count
 }
}

async function getUserData() {
  try {
    // Count total users
    const totalUsers = await prisma.user.count();

    // Sum all order total_price values
    const totalSales = await prisma.orders.aggregate({
      _sum: { total_price: true },
    });

    // Calculate average user sales value
    const avgSalesValue = totalUsers > 0 ? totalSales._sum.total_price / totalUsers : 0;

    return {
      totalUsers,
      avgUserSalesValue: avgSalesValue.toFixed(2), // Rounded to 2 decimal places
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getProductData() {
  const activeProducts = await prisma.products.count({
    where: {
      stock: {
        gt: 0, // Products where stock is greater than 0
      },
    },
  });

  const inactiveProducts = await prisma.products.count({
    where: {
      stock: {
        lte: 0, // Products where stock is 0 or less
      },
    },
  });

  return {
    activeProducts,
    inactiveProducts,
  };
}

function DashboardCard ({ title, subtitle, content}) {
  return <Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{subtitle}</CardDescription>
  </CardHeader>
  <CardContent>
    <p>{content}</p>
  </CardContent>
</Card>
}
