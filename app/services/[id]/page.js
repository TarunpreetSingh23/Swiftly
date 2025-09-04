// app/services/[id]/page.js
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function ServiceDetail() {
  const params = useParams();
  const id = params.id;
  const [service, setService] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/service/${id}`);
        const data = await res.json();
        setService(data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };
    fetchService();
  }, [id]);

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading service details...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-20 px-6 md:px-20 overflow-hidden">
      {/* floating background circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-6xl mx-auto backdrop-blur-xl bg-white/70 shadow-[0_0_40px_rgba(255,0,128,0.2)] rounded-3xl overflow-hidden border border-white/40"
      >
        {/* Hero Image */}
        <div className="relative w-full h-[420px] group">
          <Image
            src={service.img || "/images/default.jpg"}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl tracking-wide">
              {service.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 relative z-10">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <span className="px-5 py-2 bg-gradient-to-r from-pink-100 to-red-100 text-pink-600 font-semibold rounded-full shadow-md border border-pink-200/70">
              Category: {service.category}
            </span>
            {service.price && (
              <span className="px-5 py-2 bg-gradient-to-r from-green-100 to-teal-100 text-green-600 font-semibold rounded-full shadow-md border border-green-200/70">
                Price: ₹{service.price}
              </span>
            )}
          </div>

          {/* Gradient divider */}
          <div className="w-full h-1 rounded-full bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 mb-12" />

          {/* Reviews */}
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
              ✨ Customer Reviews
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-6 rounded-2xl backdrop-blur-md bg-white/60 shadow-lg border border-gray-200/50 hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <FaStar
                          key={idx}
                          className="text-yellow-400 drop-shadow-sm"
                          size={18}
                        />
                      ))}
                  </div>
                  <p className="text-gray-700 italic mb-3">
                    “Absolutely loved the {service.title}! Highly recommend this
                    service.”
                  </p>
                  <p className="text-sm text-gray-500">– Customer {i}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-6">
            <Link href="/services">
              <button className="px-7 py-3 rounded-full bg-gray-200 hover:bg-gray-300 transition font-semibold shadow-md">
                ← Back to Services
              </button>
            </Link>
<Link href="/checkout">

            <button className="relative px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white shadow-lg font-semibold overflow-hidden group">
              <span className="relative z-10">🚀 Book Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
