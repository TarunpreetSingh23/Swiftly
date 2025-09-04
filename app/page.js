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

const goals = [
  {
    title: "Innovation",
    text: "We aim to push the boundaries of technology, creating games that are unique, immersive, and unforgettable.",
    side: "left",
  },
  {
    title: "Community",
    text: "We believe in building a strong and passionate gaming community where everyone feels included and inspired.",
    side: "right",
  },
  {
    title: "Excellence",
    text: "From design to performance, our goal is to deliver nothing short of excellence in every experience we craft.",
    side: "left",
  },
];

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      setloading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      setTimeout(() => {
        setloading(false);
        setServices(data);
      }, 1000);
    }
    fetchServices();
  }, []);

  return (
    <>
      {/* Hero */}
      <div className="mt-[65px] w-full mb-6">
        <HeroCarousel />
      </div>

      {/* Salon Categories */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#5d7afc] drop-shadow-lg">
          Salon for Women
        </h1>
        <p className="text-center text-gray-500 mt-3 text-base sm:text-lg">
          Pick a category & step into luxury 💖
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-white/30 backdrop-blur-xl rounded-3xl shadow-md border border-white/20 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all"
            >
              <div className="relative w-full h-40 sm:h-56 md:h-64 overflow-hidden rounded-t-3xl">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-purple-700 transition">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Experience world-class {cat.name.toLowerCase()}
                </p>
                <Link href="/facial">
                  <button className="mt-4 px-4 sm:px-5 py-2 rounded-xl bg-[#5d7afc] text-white text-sm sm:text-base font-medium shadow hover:shadow-2xl transition">
                    Explore →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cleaning Categories */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#5d7afc] drop-shadow-lg">
          Cleaning Services
        </h1>
        <p className="text-center text-gray-500 mt-3 text-base sm:text-lg">
          Pick a service & make your space shine ✨
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {cleaningCategories.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-white/30 backdrop-blur-xl rounded-3xl shadow-md border border-white/20 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all"
            >
              <div className="relative w-full h-40 sm:h-56 md:h-64 overflow-hidden rounded-t-3xl">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-[#5d7afc] transition">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Professional {cat.name.toLowerCase()} for spotless results
                </p>
                <Link href="/clean">
                  <button className="mt-4 px-4 sm:px-5 py-2 rounded-xl bg-[#5d7afc] text-white text-sm sm:text-base font-medium shadow hover:shadow-2xl transition">
                    Explore →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#5d7afc] via-blue-500 to-indigo-600">
            Our Goals
          </h2>
          <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
            {goals.map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: goal.side === "left" ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col md:flex-row items-center gap-6 sm:gap-10 ${
                  goal.side === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-[#5d7afc] via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1 p-6 sm:p-8 md:p-10 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow hover:shadow-lg transition">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#5d7afc] to-blue-500">
                    {goal.title}
                  </h3>
                  <p className="text-gray-800 text-sm sm:text-base md:text-lg">
                    {goal.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
