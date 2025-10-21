'use client';

import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  const icons = [
    { Icon: FaInstagram, href: "https://instagram.com/sehtaj.62", alt: "Instagram" },
    { Icon: FaLinkedin, href: "https://linkedin.com/in/sehtaj-singh", alt: "LinkedIn" },
    { Icon: FaGithub, href: "https://github.com/sehtaj", alt: "GitHub" },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-red-900/30 text-gray-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-white font-semibold text-lg mb-4">About Us</h3>
          <p className="text-sm leading-relaxed text-gray-500">
            Dive into a world of strategy and skill. Compete, connect, and conquer the deck with players worldwide.
          </p>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4">
            {icons.map(({ Icon, href, alt }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={alt}
                className="text-gray-500 hover:text-red-500 transition-colors text-2xl"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800 mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Bhabhi Deck. All rights reserved.</p>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-red-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-red-400 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}