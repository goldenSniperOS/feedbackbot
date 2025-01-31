"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar () {
    const pathname = usePathname();
    const isActiveClass = "border-blue-500 text-blue-500 dark:text-white dark:border-white";
    const isInactiveClass = "border-transparent";
    return (
        <div className="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10">
            <div className="flex h-full text-gray-600 dark:text-gray-400">
                <Link className={`cursor-pointer h-full border-b-2 ${pathname.endsWith("/questions") ? isActiveClass : isInactiveClass} inline-flex mr-8 items-center`} href={"/dashboard/questions"} key={"questions"}>Questions</Link>
                <Link className={`cursor-pointer h-full border-b-2 ${pathname.endsWith("/chats") ? isActiveClass : isInactiveClass} inline-flex mr-8 items-center`} href={"/dashboard/chats"} key={"chats"}>Chats</Link>
                <Link className={`cursor-pointer h-full border-b-2 ${pathname.endsWith("/reports") ? isActiveClass : isInactiveClass} inline-flex mr-8 items-center`} href={"/dashboard/reports"} key={"reports"}>Reports</Link>
            </div>
            <div className="ml-auto flex items-center space-x-7">
                <button className="flex items-center">
                <span className="relative flex-shrink-0">
                <Image className="w-7 h-7 rounded-full" src={require("../../public/BotLogo.png")} alt="profile" />
                <span className="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
                </span>
                <span className="ml-2">Diana Bedrinana</span>
                <svg viewBox="0 0 24 24" className="w-4 ml-1 flex-shrink-0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                </button>
            </div>
        </div>
    )
}
