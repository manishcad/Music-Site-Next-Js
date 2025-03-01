"use client"; // Mark as a client component

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const NavbarClient = ({ session }) => {
    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo">
                <Link href="/">MyApp</Link>
            </div>

            {/* Show links only if user is authenticated */}
            {session ? (
                <div className="nav-content">
                    <ul className="nav-links">
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/music">Music</Link></li>
                    </ul>

                    {/* Profile + Logout */}
                    <div className="profile-section">
                        <img 
                            src={session.user?.image || "/avatar.png"} 
                            alt="Profile" 
                            className="profile-avatar"
                        />
                        <button className="logout-btn" onClick={() => signOut({callbackUrl:"/auth/signin"})}>
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <>
                <Link href="/auth/signin" className="login-btn">Login</Link>
               
                </>
            )}
        </nav>
    );
};

export default NavbarClient;
