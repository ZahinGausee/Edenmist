"use client";
import { useState, useEffect } from 'react';
import AddressForm from './EditAddressDialog';
import AddressCard from './AddressCard';

const MyAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    // Fetch addresses from your data source (e.g., API, local storage)
    const fetchedAddresses = [
      {
        fullName: 'Zahin',
        phone: '+91 9328938055',
        streetAddress: '52eodpod',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380055',
      },
      // ... other addresses
    ];
    setAddresses(fetchedAddresses);
  }, []);

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
  };

  const handleEditAddress = (address) => {
    setIsEditing(true);
    setEditingAddress(address);
  };

  const handleUpdateAddress = (updatedAddress) => {
    const updatedAddresses = addresses.map((address) =>
      address.id === updatedAddress.id ? updatedAddress : address
    );
    setAddresses(updatedAddresses);
    setIsEditing(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (addressId) => {
    const updatedAddresses = addresses.filter((address) => address.id !== addressId);
    setAddresses(updatedAddresses);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsEditing(true)}
        >
          + New Address
        </button>
      </div>

      {isEditing ? (
        <AddressForm
          initialValues={editingAddress || {}}
          onSubmit={handleUpdateAddress}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => handleEditAddress(address)}
              onDelete={() => handleDeleteAddress(address.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddresses;