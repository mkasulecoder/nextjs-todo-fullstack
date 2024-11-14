import React from 'react';
import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, SignOutButton, UserButton} from "@clerk/nextjs";

const NavMenu = () => {
    // @ts-ignore
    return (
        <>
            <nav className="flex flex-row items-center justify-between w-full h-16 bg-white border-b-2 border-gray-200 px-4">
                    <a href="/" className="font-bold text-xl text-gray-800 font-extrabold">
                        SupaTodo
                    </a>
                    <div className="flex flex-row justify-between items-center py-4 w-4/5 px-2">
                        <div className="w-3/5">
                            <p>Recent Tasks</p>
                        </div>
                        <div className="flex flex-row w-1/5 space-x-2 justify-between items-center">
                            <Link href={"add-task"}
                                  className="hover:bg-blue-900 px-1 py-3 font-bold capitalize bg-blue-700 rounded">Add Task
                            </Link>
                            <SignedOut>
                                <SignInButton mode="modal" className="text-blue-900 px-2 py-3 font-bold capitalize"/>
                            </SignedOut>
                            <SignedIn>
                                <UserButton/>
                                <SignOutButton className="text-blue-900 px-2 py-3 font-bold capitalize"/>
                            </SignedIn>
                        </div>
                    </div>
            </nav>
            </>
            );
            };

            export default NavMenu;