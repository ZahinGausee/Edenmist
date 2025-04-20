"use client"

import Image from "next/image"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Script from "next/script"
import { Button } from "@/src/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/src/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { QuantitySelector } from "./quantity-selector"
import EditAddressDialog from "./EditAddressDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription }  from "@/src/components/ui/dialog"
import LoadingOverlay from "./LoadingOverlay"

export default function CheckoutPageClient({ initialAddress, initialProduct }) {
  const [isOpen, setIsOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [address, setAddress] = useState(initialAddress)
  const [product, setProduct] = useState(initialProduct)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddressRequiredDialogOpen, setIsAddressRequiredDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false);


  const router = useRouter()

  const handleAddAddress = () => {
    setIsDialogOpen(true)
  }

  const handleUpdate = () => {
    // Logic to refresh the address card could go here
    window.location.reload()
  }

  if (!product) {
    return <div>Product not found</div>
  }

  const total = product.price * quantity
  const rrpTotal = (product.RRP || product.price) * quantity
  const discount = rrpTotal - total
  const discountPercentage = ((discount / rrpTotal) * 100).toFixed(0)
  const shippingCost = 50

  const createOrder = async () => {
    if (!address || !address.streetAddress || !address.mobile) {
      setIsAddressRequiredDialogOpen(true);
      return;
    }
  
    setLoading(true); // Start loading
  
    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        body: JSON.stringify({
          product_id: product.product_id,
          amount: total * 100,
          quantity: quantity,
        }),
      });
  
      const data = await res.json();
  
      if (!data.id) {
        throw new Error("Razorpay failed to create the order.");
      }
  
      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.id,
        name: "Eden Mist",
        description: `Purchase of ${product.name}`,
        image: "/brand.jpg",
        prefill: {
          name: address?.name || "Guest",
          email: address?.email || "guest@example.com",
          contact: address?.mobile || "8888888888",
        },
        theme: { color: "#3399cc" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/verifyOrder", {
              method: "POST",
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                productId: product.product_id,
                quantity: quantity,
                totalPrice: total,
                address: address,
              }),
            });
  
            const verifyData = await verifyRes.json();
            if (verifyData.isOk) {
              router.push(`/order-confirmation/${paymentData.order_id}`);
            } else {
              alert("Payment verification failed.");
              setLoading(false);
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Something went wrong during verification.");
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            // User closed the modal manually
            setLoading(false);
          },
        },
      };
  
      const razorpay = new window.Razorpay(paymentData);
      razorpay.on("payment.failed", (response) => {
        alert(response.error.description);
        setLoading(false);
      });
  
      razorpay.open();
    } catch (err) {
      console.error("Create order error:", err);
      alert(err.message || "Something went wrong.");
      setLoading(false);
    }
  };
  
  

  return (
    <>
      <Script type="text/javascript" src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Address and Payment */}
          <div className="space-y-6">
            {/* Address Section */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Address</h2>
              </div>

              {address && address.streetAddress ? (
                <div className="border rounded-lg p-4 bg-white relative">
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <div className="h-2 w-2 bg-orange-400 rounded-full" />
                      <span className="font-semibold">{address?.username?.toUpperCase() || address?.name.toUpperCase() }</span>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>+91 {address?.mobile}</p>
                    <p>{address?.streetAddress},</p>
                    <p>{`${address?.city}, ${address?.state}, ${address?.pinCode}`}</p>
                    <p>{address?.email}</p>
                  </div>

                  <Button variant="secondary" className="mt-4" onClick={handleAddAddress}>
                    Edit
                  </Button>
                </div>
              ) : (
                <div className="border rounded-lg p-4 bg-white">
                  <p className="text-gray-600 mb-2">No address added yet.</p>
                  <Button variant="secondary" onClick={handleAddAddress}>
                    Add Address
                  </Button>
                </div>
              )}

              {isDialogOpen && (
                <EditAddressDialog
                  address={address}
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  onUpdate={handleUpdate}
                />
              )}
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <RadioGroup defaultValue="online" className="space-y-4">
                <div className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="font-medium">
                      Pay Online
                      <p className="text-sm text-gray-500">
                        Pay using credit/debit cards, net-banking, UPI, or digital wallets.
                      </p>
                    </Label>
                  </div>
                  <span className="font-semibold">₹{total}</span>
                </div>

                {/* <div className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="font-medium">
                      Partial Cash On Delivery
                      <p className="text-sm text-gray-500">
                        Pay ₹99 now (non-refundable). Rest ₹{total - 99} on delivery.
                      </p>
                    </Label>
                  </div>
                  <span className="font-semibold">₹{total}</span>
                </div> */}
              </RadioGroup>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <div className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-100 rounded-full">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Order Summary</h3>
                      <p className="text-green-600 text-sm">You Saved ₹{discount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">₹{total}</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="border-t p-4 space-y-4">
                    {/* Product Details */}
                    <div className="flex gap-4">
                      <Image
                        src="/product_image.jpg"
                        alt={product.name}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-semibold">₹{product.price * quantity}</span>
                          <span className="text-gray-500 line-through">₹{rrpTotal}</span>
                          <Badge variant="secondary">{discountPercentage}% Off</Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <QuantitySelector
                            quantity={quantity}
                            onIncrease={() => setQuantity((prev) => Math.min(prev + 1, product.stock))}
                            onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
                          />
                          <p className="text-sm text-gray-500">Qty: {quantity}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <div className="text-right">
                          <span className="text-gray-500 line-through mr-2">₹{rrpTotal}</span>
                          <span className="font-semibold">₹{total}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <div className="text-right">
                          <span className="text-gray-500 line-through mr-2">₹{shippingCost}</span>
                          <span className="text-green-600">Free</span>
                        </div>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-semibold">Total</span>
                        <div className="text-right">
                          <span className="font-semibold">₹{total.toFixed(2)}</span>
                          <p className="text-green-600 text-sm">You Saved ₹{discount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm">Estimated delivery within 5-7 days</p>

                    {/* Cashback Info */}
                    {/* <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">
                        You will earn ₹{(total * 0.1).toFixed(2)} cashback with this order.
                      </span>
                    </div> */}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-6" disabled={loading} onClick={createOrder}>
               {loading ? <LoadingOverlay>Processing your order...</LoadingOverlay> : "Place an order"}
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={isAddressRequiredDialogOpen} onOpenChange={setIsAddressRequiredDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Address Required</DialogTitle>
            <DialogDescription>
              Please provide your complete address and mobile number to proceed with the payment.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button
              onClick={() => {
                setIsAddressRequiredDialogOpen(false)
                handleAddAddress()
              }}
            >
              Add Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


