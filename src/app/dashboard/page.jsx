
import React from 'react'
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
import { redirect } from "next/navigation";
import { signOut } from 'next-auth/react';
import DashboardClient from "./DashboardClient"
import "./Dashboard.css"
const prisma= new PrismaClient()
const Dashboard = async() => {
  const session=await getServerSession()
  return <DashboardClient session={session} />
}

export default Dashboard