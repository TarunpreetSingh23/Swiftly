"use client";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="relative py-28 bg-gradient-to-r from-gray-100 via-white to-gray-100 overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-40 h-40 bg-[#5d7afc]/20 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
        <div className="absolute w-56 h-56 bg-gray-400/20 rounded-full blur-3xl bottom-20 right-32 animate-pulse"></div>
        <div className="absolute w-28 h-28 bg-[#5d7afc]/30 rounded-full blur-2xl top-1/3 left-1/2 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-[#5d7afc] drop-shadow-sm">
          Let’s Connect
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-lg border border-gray-200"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h3>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
              />
              <textarea
                placeholder="Your Message..."
                rows={4}
                className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
              />
              <button className="mt-2 bg-gradient-to-r from-[#5d7afc] to-blue-600 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-md">
                Submit
              </button>
            </form>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-gray-900 p-10 rounded-3xl shadow-lg border border-gray-700"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Subscribe to Our Newsletter</h3>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
              />
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <input type="checkbox" className="w-4 h-4 accent-[#5d7afc]" />
                <span>Yes, subscribe me to your newsletter.</span>
              </div>
              <button className="mt-2 bg-gradient-to-r from-[#5d7afc] to-blue-600 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-md">
                Join
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
