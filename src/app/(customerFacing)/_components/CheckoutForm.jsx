"use client"
import Script from "next/script";
import { getUserAddress } from "../actions/checkout";

export default function CheckoutForm({ product, address }) {
    const createOrder = async () => {
        const res = await fetch("/api/createOrder", {
            method: "POST",
            body: JSON.stringify({
                product_id: product.product_id,
                amount: (product.price * 100),
            }),
        });
        const data = await res.json();
        if (data.id == null) {
            throw Error("Razorpay failed to create the order.");
          }
        const paymentData = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            order_id: data.id,
            name: "Eden Mist", 
            description: "Purchase of product",
            image: "/brand.jpg",
            prefill: {
                name: address?.name | 'Hello! guest', // Prefilled customer name
                email: address?.email | 'xyz@email.com', // Prefilled email
                contact: address?.mobile | '8888888888', // Prefilled phone number
            },
            theme: {
                color: "#3399cc", // Customize the color of the checkout modal
            },
            handler: async function (response){
                console.log(response, response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
                const res = await fetch("/api/verifyOrder", {
                    method: "POST",
                    body: JSON.stringify({
                        orderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    }),
                });
                const data = await res.json();
                console.log(data);
                if(data.isOk) {
                    //do waterver page transition;
                    alert("Payment Successfull");
                }
                else {
                    alert("Payment Failed");
                }
            },
        }
        const payment = new window.Razorpay(paymentData);
        payment.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        payment.open();
    }
  return (
    <div>
    <Script 
        type="text/javascript" 
        src="https://checkout.razorpay.com/v1/checkout.js" 
    />
    
    <button onClick={createOrder} className="bg-white">CheckoutForm</button>

    </div>
  )
}