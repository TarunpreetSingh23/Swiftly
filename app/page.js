"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import HeroCarousel from "@/components/herocarosel";
import SaleSection from "@/components/salesection";
import Salemoving from "@/components/salemoving";

const categories = [
  { id: 1, name: "Waxing", image: "/waxing.jpg" },
  { id: 2, name: "Cleanup", image: "/cleanup.jpg" },
  { id: 3, name: "Manicure", image: "/manicure.jpg" },
  { id: 4, name: "Hair care", image: "/haircare.jpg" },
];
const cleaningCategories = [
  { id: 1, name: "Home Cleaning", image: "/images/cleaning-home.jpg" },
  { id: 2, name: "Office Cleaning", image: "/images/cleaning-office.jpg" },
  { id: 3, name: "Carpet Cleaning", image: "/images/cleaning-carpet.jpg" },
  { id: 4, name: "Window Cleaning", image: "/images/cleaning-window.jpg" },
];

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      setTimeout(() => {
        setLoading(false);
        setServices(data);
      }, 1000);
    }
    fetchServices();
  }, []);

  return (
    <>
      {/* Hero Carousel Section */}
      <div className="relative mt-[65px] w-full mb-4 z-0">
        <HeroCarousel />
      </div>

      {/* Categories Section */}
      <div className="relative max-w-7xl mx-auto px-4 py-12 z-0">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#5d7afc] drop-shadow-lg">
          Salon for Women
        </h1>
        <p className="text-center text-gray-500 mt-3 text-lg">
          Pick a category & step into luxury 💖
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-white/30 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer"
            >
              <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={500}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6 text-center relative z-10">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Experience world-class {cat.name.toLowerCase()}
                </p>
                <Link href="/facial">
                  <button className="mt-4 px-5 py-2 rounded-xl bg-[#5d7afc] text-white font-medium shadow-lg hover:shadow-2xl transition-all duration-300">
                    Explore →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cleaning Section */}
      <div className="relative max-w-7xl mx-auto px-4 py-12 z-0">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#5d7afc] drop-shadow-lg">
          Cleaning Services
        </h1>
        <p className="text-center text-gray-500 mt-3 text-lg">
          Pick a service & make your space shine ✨
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cleaningCategories.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-white/30 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer"
            >
              <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={500}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6 text-center relative z-10">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#5d7afc] transition">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Professional {cat.name.toLowerCase()} for spotless results
                </p>
                <Link href="/clean">
                  <button className="mt-4 px-5 py-2 rounded-xl bg-[#5d7afc] text-white font-medium shadow-lg hover:shadow-2xl transition-all duration-300">
                    Explore →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
