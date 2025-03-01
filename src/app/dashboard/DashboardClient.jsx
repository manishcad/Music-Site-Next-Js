"use client"
import React from 'react'
import { redirect } from 'next/navigation'
import YoutubeDownloader from '../components/YoutubeDownloder'
const DashboardClient = ({session}) => {
  if(!session){
    return redirect("/auth/signin")
    
  }
  console.log(session.user)
  return (
    <div className="box">
        <YoutubeDownloader></YoutubeDownloader>
    </div>
  )
}

export default DashboardClient