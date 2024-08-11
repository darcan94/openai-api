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
    transition: { type: 'spring', stiffness: 500, damping: 50 },
  },
  closed: {
    x: '-100%',
    width: '80%',
    transition: { type: 'spring', stiffness: 500, damping: 50 },
  },
};

const desktopVariants = {
  open: {
    width: '20rem',
  },
  closed: {
    width: '4rem',
  },
};

export default function Sidebar({ children }: Props) {
  const { isSidebarOpen, isLoading } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  const state = isSidebarOpen && !isLoading ? "open" : "closed";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <motion.aside
      animate={state}
      variants={isMobile ? mobileVariants : desktopVariants}
      data-state={isMobile ? "mobile" : "desktop"}
      className="data-[state=mobile]:absolute data-[state=mobile]:h-full data-[state=mobile]:shadow-xl flex flex-col gap-2 justify-between bg-secondary-alpha backdrop-blur-md pt-16 p-2 text-font data-[state=desktop]:w-80 z-20">
    
        <Link 
          href="/"
          className="flex items-center no-underline text-font p-2 rounded-full w-max bg-background-alpha hover:bg-background">
            <IconClearChat />
            <span data-state={state} className="mr-2 md:data-[state=closed]:hidden">
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