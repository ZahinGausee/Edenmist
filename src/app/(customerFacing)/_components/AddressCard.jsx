'use client';

import React, { useState } from "react";
import EditAddressDialog from "./EditAddressDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const AddressCard = ({ address }) => {
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAddress = () => {
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    // Logic to refresh the address card could go here
    window.location.reload();
  };

  return (
    <>
    {/* <div className="p-4 border rounded">
       <h3 className="text-lg font-bold">{address ? 'Your Address' : 'No Address'}</h3>
      <p>{address ? address.mobile : 'Add Phone Number'}</p>
      <p>{address ? address.streetAddress : 'Add Street Address'}</p>
      <p>
        {address ? `${address.city}, ${address.state}, ${address.pinCode}` : ''}
      </p>
      <button
        className="mt-2 px-4 py-2 text-white bg-blue-500 rounded"
        onClick={handleAddAddress}
      >
        {address ? 'Edit' : 'Add Address'}
      </button> */}
      <Card>
              <CardHeader>
                <CardTitle>{address ? 'Your Address' : 'No Address'}</CardTitle>
              </CardHeader>
              <CardContent>
                <b>Phone:</b> <span>+91 {address ? address.mobile : 'Add Phone Number'}</span>
              </CardContent>
              <CardContent>
                <b>Address:</b> <span>{address ? address.streetAddress : 'Add Street Address'}{address ? `, ${address.city}, ${address.state}, ${address.pinCode}` : ''}</span>
              </CardContent>
               <CardContent>
               <button
        className="mt-2 px-4 py-2 text-white bg-blue-500 rounded"
        onClick={handleAddAddress}
      >
        {address ? 'Edit' : 'Add Address'}
      </button>
               </CardContent>
            </Card>

      {isDialogOpen && (
        <EditAddressDialog
          address={address}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onUpdate={handleUpdate} // Handle UI update after address update
        />
      )}
    </>
  );
};

export default AddressCard;
