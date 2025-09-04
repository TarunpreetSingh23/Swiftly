'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UserMap = dynamic(() => import("@/components/UseMap"), { ssr: false });

export default function Checkout() {
  const router = useRouter();
  const {data:session}=useSession();
  const [cart, setCart] = useState([]);
  const [showMap, setShowMap] = useState(false);

  // Customer Info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Address
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  // Scheduling
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const [errors, setErrors] = useState({});
  //  const [email, setemail] = useState("")

  // Generate next 5 days dynamically
  const next5Days = Array.from({ length: 5 }, (_, i) => addDays(new Date(), i));

  // Time slots
  const slots = [
    "09:00 - 10:00",
    "10:30 - 11:30",
    "12:00 - 13:00",
    "13:30 - 14:30",
    "15:00 - 16:00",
    "16:30 - 17:30",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    console.log("LocalStorage cart raw:", saved);
    if (saved) setCart(JSON.parse(saved));
    // console.log("LocalStorage cart raw:", cart);
  }, []);
  useEffect(() => {
  console.log("Updated cart state:", cart);
}, [cart]);

  useEffect(() => {
    if (address) {
      const pinMatch = address.match(/\b\d{6}\b/);
      if (pinMatch) setPincode(pinMatch[0]);
    }
  }, [address]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Enter a valid 10-digit phone";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!date) newErrors.date = "Please select a date";
    if (!timeSlot) newErrors.timeSlot = "Please select a time slot";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleConfirm = async () => {
  if (!validate()) return;
  if (!cart.length) return alert("Cart is empty");
  if(!session)
    {
      alert("Login Required")
      router.push("/register")}

const formattedCart = cart.map(item => ({
  name: item.title || item.serviceName,
  price: item.price || item.cost || 0,
  quantity: item.quantity || 1,
  category: item.category || item.Category || item.serviceCategory || "general"
}));

console.log(formattedCart);


  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart: formattedCart,
        subtotal,
        discount,
        total,
        customerName: name,
        email:session.user.email,  // ✅ include email here
        phone,
        address,
        pincode,
        date,
        timeSlot,
        paymentMethod: "Pay After Service",
        status: "pending",
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create order");

    alert(`✅ Order Placed Successfully! Order ID: ${data.orderId}`);
    localStorage.removeItem("cart");
    setCart([]);
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Failed to place order: " + err.message);
  }
};


  return (
    <div className="min-h-screen mt-[65px] bg-gray-100 py-10 px-4 md:px-20">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">Checkout</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="md:col-span-2 flex flex-col gap-8">

          {/* Customer Details */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-gray-700 mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={`p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 mb-2 font-medium">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={`p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="9876543210"
                />
                {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
              </div>
 {/* <div className="flex flex-col">
                <label className="text-gray-700 mb-2 font-medium">Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={e => setemail(e.target.value)}
                  className={`p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder=""
                />
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
              </div> */}

            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Delivery Address</h2>
            <div className="flex flex-col gap-4">
              <textarea
                rows={3}
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Complete Address"
                className={`p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none transition ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}

              <input
                type="text"
                value={pincode}
                placeholder="Pincode"
                readOnly
                className="p-3 rounded-lg border bg-gray-100 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="py-3 bg-[#5d7afc] text-white rounded-lg font-semibold shadow transition"
              >
                Use My Location
              </button>

              {showMap && <div className="mt-4 h-64 rounded-xl overflow-hidden shadow-inner"><UserMap setAddress={setAddress} /></div>}
            </div>
          </div>

          {/* Schedule Service */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Schedule Service</h2>

            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">Select Date</p>
              <div className="flex gap-3 flex-wrap">
                {next5Days.map((d, idx) => {
                  const formatted = format(d, "yyyy-MM-dd");
                  const label = format(d, "EEE, MMM d");
                  return (
                    <button
                      key={idx}
                      onClick={() => setDate(formatted)}
                    className={`px-4 py-2 rounded-lg border font-medium transition ${date === formatted ? 'bg-[#5d7afc] text-white border-[#5d7afc]' : 'bg-white border-gray-300 hover:bg-gray-100'}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {errors.date && <span className="text-red-500 text-sm mt-1 block">{errors.date}</span>}
            </div>

{slots
  .filter(slot => {
    // Only filter for today
    if (date !== format(new Date(), "yyyy-MM-dd")) return true;

    const now = new Date();
    const [start, end] = slot.split(" - ");
    const [endHour, endMinute] = end.split(":").map(Number);

    const slotEnd = new Date();
    slotEnd.setHours(endHour, endMinute, 0, 0);

    return slotEnd > now; // ✅ keep only if slot ends after current time
  })
  .map((slot, i) => (
    <button
      key={i}
      onClick={() => setTimeSlot(slot)}
      className={`px-4 py-2 rounded-lg  m-0.5 border font-medium transition ${
        timeSlot === slot
          ? "bg-[#5d7afc] text-white border-indigo-600"
          : "bg-white border-gray-300 hover:bg-gray-100"
      }`}
    >
      {slot}
    </button>
  ))}





          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full py-4 bg-[#5d7afc] text-white text-lg font-semibold rounded-2xl shadow  transition"
          >
            Confirm & Place Order
          </button>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">Order Summary</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 italic">Your cart is empty.</p>
            ) : (
              <>
                <ul className="divide-y divide-gray-200">
                  {cart.map((item, i) => (
                    <li key={i} className="flex justify-between py-3">
                      <span className="text-gray-700">{item.title}</span>
                      <span className="font-medium text-indigo-600">₹{item.price}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t pt-4 space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount (10%)</span>
                    <span>-₹{discount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 