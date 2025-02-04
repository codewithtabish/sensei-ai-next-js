"use server"
import { getUserOnboardingStatus } from '@/actions/users';
import { redirect } from 'next/navigation';
import React from 'react'

const IndustryInsights =async () => {
    const { isOnBoarded } = await getUserOnboardingStatus();

    // If not onboarded, redirect to onboarding page
    // Skip this check if already on the onboarding page
    if (!isOnBoarded) {
      redirect("/onboarding");
    }
  
  return (
    <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, doloremque voluptates? Amet eveniet minus eius minima excepturi id sunt, maxime corporis debitis facere accusantium provident officiis saepe adipisci, in autem?
      
    </div>
  )
}

export default IndustryInsights
