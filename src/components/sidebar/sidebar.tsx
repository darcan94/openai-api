"use client";
import React, { useEffect, useState } from "react";
import { useSidebar } from "@/components/sidebarProvider";
import { Link } from "next-view-transitions";
import { IconClearChat } from "@/components/ui/Icons";
import Settings from "@/components/ui/settings";
import { motion } from "framer-motion";

interface Props{
  children: React.ReactNode; 
}

const mobileVariants = {
  open: {
    x: 0,
    width: '80%',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    x: '-100%',
    width: '80%',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

const desktopVariants = {
  open: {
    width: '300px',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    width: '4.4rem',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export default function Sidebar({ children }: Props) {
  const { isSidebarOpen, isLoading } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  const state = isSidebarOpen && !isLoading ? "open" : "closed";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {
        isMobile 
          ? (
            <motion.aside
              initial="closed"
              animate={state}
              variants={mobileVariants}
              className="absolute flex flex-col gap-2 justify-between h-full inset-0 bg-secondary z-20 pt-16 p-2 border-r border-white/10 text-font md:hidden">
            
                <Link 
                  href="/"
                  className="flex items-center no-underline text-font p-2 rounded-full w-max bg-background-alpha hover:bg-background">
                <IconClearChat />
                <span
                    data-state={state}
                    className="mr-2 data-[state=closed]:hidden">
                    New Chat
                </span>
                <span className="sr-only">New Chat</span>
                </Link>
                <div data-state={state} className="md:data-[state=closed]:hidden grow">
                  {children}
                </div>
                <Settings />

            </motion.aside>
          )
          :(
            <motion.aside 
              id="sidebar"
              initial={isMobile ? 'closed' : 'open'}
              animate={state}
              variants={desktopVariants}
              className={`hidden md:static top-0 left-0 bottom-0 md:flex flex-col gap-2 justify-between h-full bg-secondary shadow-lg z-20 pt-16 p-2 border-r border-white/10 text-font
              ${isMobile ? 'hidden md:block' : ''}`}>

                  <Link 
                    href="/"
                    className="flex items-center no-underline text-font p-2 rounded-full w-max bg-background-alpha hover:bg-background">
                  <IconClearChat />
                  <span
                      data-state={state}
                      className="mr-2 data-[state=closed]:hidden">
                      New Chat
                  </span>
                  <span className="sr-only">New Chat</span>
                  </Link>
                  <div data-state={state} className="md:data-[state=closed]:hidden grow">
                    {children}
                  </div>
                  <Settings />
            </motion.aside>
          )
      }
      
      
    </>
  );
}

function SidebarContent({children}: Props){
  return (
    <>
    </>
  )
}
/**
 * 
 * "absolute flex flex-col gap-2 justify-between h-full top-0 left-0 bottom-0 w-10/12 bg-secondary shadow-lg z-20 pt-16 p-2 "
 * 
 * className="hidden absolute md:static md:flex flex-col justify-between gap-2 h-full z-20 data-[state=open]:flex w-10/12 md:w-[300px] 
      md:data-[state=closed]:w-16  border-r border-white/10 bg-secondary p-2 pt-16 text-font duration-300">
 */