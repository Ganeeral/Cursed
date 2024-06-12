import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sling as Hamburger } from "hamburger-react";
import Link from "next/link";
import {
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/ui/icons";

const data = [
  {
    id: 1,
    name: "Новости",
    href: "/",
  },
  {
    id: 2,
    name: "Профиль",
    href: "/",
  },
];

export const SidebarAbout = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div className="flex justify-end w-full tablet-lg:hidden transition-all duration-300 z-[100]">
      <Hamburger toggled={isOpen} toggle={setOpen} size={24} color="white" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 shadow-4xl right-0 top-[8.5rem] p-5 z-50 backdrop-blur-2xl border-b border-b-white/20"
          >
            <ul className="grid gap-2">
              {data.map((item) => {
                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 / 10,
                    }}
                    key={item.name}
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-700 via-neutral-950 to-neutral-700"
                  >
                    <Link
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        "flex items-center justify-between w-full p-5 rounded-xl bg-backgroundAbout text-white"
                      }
                      href={item.href}
                    >
                      <span className="flex gap-1 text-lg font-bold text-yellow-cream">{item.name}</span>
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 / 10,
                }}
                className="w-full mt-4 flex justify-center items-center gap-x-8"
              >
                <TwitterIcon className="svghover transition-all duration-300 hover:-translate-y-2 hover:fill-yellow-cream cursor-pointer" />
                <InstagramIcon className="svghover transition-all duration-300 hover:-translate-y-2 hover:fill-yellow-cream cursor-pointer" />
                <DiscordIcon className="svghover transition-all duration-300 hover:-translate-y-2 hover:fill-yellow-cream cursor-pointer" />
                <FacebookIcon className="svghover transition-all duration-300 hover:-translate-y-2 hover:fill-yellow-cream cursor-pointer" />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
