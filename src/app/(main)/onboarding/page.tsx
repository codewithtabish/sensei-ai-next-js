import { redirect } from 'next/navigation';
import React from 'react'
import OnboardingForm from './_components/OnboardingForm';
import { getUserOnboardingStatus } from '@/actions/users';
import {industries} from '../../../data/industries'

const OnBoardingPage = async() => {
      // Check if user is already onboarded
  const { isOnBoarded } = await getUserOnboardingStatus();

  if (isOnBoarded) {
    redirect("/dashboard");
    // alert()
  }
  return (
    <div>
        <OnboardingForm industrie={industries}/>

      
    </div>
  )
}

export default OnBoardingPage
