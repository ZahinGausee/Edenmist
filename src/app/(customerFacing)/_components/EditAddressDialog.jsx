import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { z } from "zod";
import prisma from "@/src/db/db";

const addressSchema = z.object({
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pinCode: z.string().regex(/^\d{6}$/, "Invalid pin code"),
});

const EditAddressDialog = ({ address, isOpen, onClose, onUpdate }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: address || {
      mobile: '',
      streetAddress: '',
      city: '',
      state: '',
      pinCode: '',
    },
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/update-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        onUpdate(); // Call the update function to refresh the AddressCard
        onClose(); // Close the dialog
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert("An error occurred while updating the address.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Phone</label>
            <input
              {...register("mobile")}
              className={`w-full border ${errors.mobile ? "border-red-500" : "border-gray-300"} rounded p-2`}
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Street Address</label>
            <input
              {...register("streetAddress")}
              className={`w-full border ${errors.streetAddress ? "border-red-500" : "border-gray-300"} rounded p-2`}
            />
            {errors.streetAddress && <p className="text-red-500 text-sm">{errors.streetAddress.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">City</label>
            <input
              {...register("city")}
              className={`w-full border ${errors.city ? "border-red-500" : "border-gray-300"} rounded p-2`}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">State</label>
            <input
              {...register("state")}
              className={`w-full border ${errors.state ? "border-red-500" : "border-gray-300"} rounded p-2`}
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Pin Code</label>
            <input
              {...register("pinCode")}
              className={`w-full border ${errors.pinCode ? "border-red-500" : "border-gray-300"} rounded p-2`}
            />
            {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode.message}</p>}
          </div>
          <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            Update Address
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressDialog;
