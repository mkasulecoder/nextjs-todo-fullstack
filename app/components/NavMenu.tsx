import React from 'react';
import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, SignOutButton, UserButton} from "@clerk/nextjs";

const NavMenu = () => {
    // @ts-ignore
    return (
        <>
            <nav className="flex flex-row items-center justify-between w-full h-16 bg-white border-b-2 border-gray-200 px-4">
                <div className="w-1/5 py-2">
                    <a href="/" className="font-bold text-xl text-gray-800 font-extrabold">
                        SupaTodo
                    </a>
                </div>
                <div className="flex flex-row justify-end items-center w-4/5 py-2">
                    <SignedIn>
                            <Link href={"/todos"} className="text-black hover:text-gray-600 mx-1 font-bold capitalize">
                                Recent Tasks
                            </Link>
                        </SignedIn>
                        <div className="flex flex-row space-x-2 justify-between items-center">
                            <SignedIn>
                                <Link href={"add-task"} className="text-black hover:text-gray-600 mx-1 font-bold capitalize">Add Task</Link>
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal" className="text-black hover:text-gray-600 mx-1 font-bold capitalize"/>
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