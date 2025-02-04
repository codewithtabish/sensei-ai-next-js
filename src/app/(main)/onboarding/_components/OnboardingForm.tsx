"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from '@/lib/schema';
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from '@/hooks/use-fetch';
import { updateUser } from '@/actions/users';


const OnboardingForm = ({industrie}:any) => {
    const router = useRouter();
    const [selectedIndustry, setSelectedIndustry] = useState(null);
  
    const {
      loading: updateLoading,
      fn: updateUserFn,
      data: updateResult,
    } = useFetch(updateUser);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
    } = useForm({
      resolver: zodResolver(onboardingSchema),
    });
    const watchIndustry = watch("industry");

    useEffect(() => {
        if (updateResult && !updateLoading) {
          toast.success("Profile completed successfully!");
          router.push("/dashboard");
          router.refresh();
        }
      }, [updateResult, updateLoading]);


    const onSubmit = async (values:any) => {
        try {
            const formattedIndustry = `${values.industry}-${values.subIndustry
            .toLowerCase()
            .replace(/ /g, "-")}`;
         
    
          await updateUserFn({
            ...values,
            industry: formattedIndustry,
          });
        } catch (error) {
            toast.error("Failed to update user. Please try again.");
            console.error("Update error:", error);
          console.error("Onboarding error:", error);
        }
      };

  
    return (
        <div className="flex items-center justify-center bg-background">
          <Card className="w-full max-w-lg mt-10 mx-2">
            <CardHeader>
              <CardTitle className="gradient-title text-4xl">
                Complete Your Profile
              </CardTitle>
              <CardDescription>
                Select your industry to get personalized career insights and
                recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form 
              onSubmit={handleSubmit(onSubmit)}
               className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("industry", value);
                      setSelectedIndustry(
                        industrie.find((ind:any) => ind.id === value)
                      );
                      setValue("subIndustry", "");
                    }}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Industries</SelectLabel>
                        {industrie.map((ind:any) => (
                          <SelectItem key={ind.id} value={ind.id}>
                            {ind.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-sm text-red-500">
                        {/* @ts-ignore */}
                      {errors.industry.message}
                    </p>
                  )}
                </div>
    
                {watchIndustry && (
                  <div className="space-y-2">
                    <Label htmlFor="subIndustry">Specialization</Label>
                    <Select
                      onValueChange={(value) => setValue("subIndustry", value)}
                    >
                      <SelectTrigger id="subIndustry">
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Specializations</SelectLabel>
                       {/* @ts-ignore */}
                          {selectedIndustry?.subIndustries.map((sub:any) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.subIndustry && (
                      <p className="text-sm text-red-500">
                        {/* @ts-ignore */}
                        {errors.subIndustry.message}
                      </p>
                    )}
                  </div>
                )}
    
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="Enter years of experience"
                    {...register("experience")}
                  />
                  {errors.experience && (
                    <p className="text-sm text-red-500">
                    {/* @ts-ignore */}
                      {errors.experience.message}
                    </p>
                  )}
                </div>
    
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., Python, JavaScript, Project Management"
                    {...register("skills")}
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate multiple skills with commas
                  </p>
                  {errors.skills && (
                    
                    <p className="text-sm text-red-500">
                    {/* @ts-ignore */}

                        {errors.skills.message}</p>
                  )}
                </div>
    
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your professional background..."
                    className="h-32"
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500">
                                                {/* @ts-ignore */}

                        {errors.bio.message}</p>
                  )}
                </div>
    
                <Button type="submit" className="w-full" disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      );
}

export default OnboardingForm
