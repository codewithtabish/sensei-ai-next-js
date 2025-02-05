"use server"
import { getIndustryInsights } from '@/actions/dashboard';
import { getUserOnboardingStatus } from '@/actions/users';
import { redirect } from 'next/navigation';
import React from 'react'
import DashboardView from './_components/dashboard-view';

const IndustryInsights =async () => {
    const { isOnBoarded } = await getUserOnboardingStatus();

    // If not onboarded, redirect to onboarding page
    // Skip this check if already on the onboarding page
    if (!isOnBoarded) {
      redirect("/onboarding");
    }

    const insights = await getIndustryInsights();

    

    // console.log('The insights are', JSON.stringify(insights));

  
  return (
    <div>
        {/* {JSON.stringify(insights)} */}
        <DashboardView insights={insights} />

     
      
    </div>
  )
}

export default IndustryInsights
