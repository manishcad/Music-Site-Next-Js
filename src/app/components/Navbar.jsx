
import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
 // Update path if necessary
import { signOut } from "next-auth/react";
import "./Navbar.css"
import NavbarClient from "./NavbarClient"; 

const Navbar = async () => {
    // Fetch session on the server side
    const session = await getServerSession();

    return <NavbarClient session={session} />;
};

export default Navbar;
