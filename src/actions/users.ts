// "use server"
// import db from "@/lib/prisma"
// import { auth } from "@clerk/nextjs/server"
// import { generateAIInsights } from "./dashboard"

// export const updateUser=async(data:any):Promise<any>=>{
//     const {userId} = await auth()
//     if(!userId) throw new Error("unauthenticated user")
//      const checkUserInDB=await db.user.findUnique({
//             where:{
//                 clerkUserId:userId
//             }
//         })
//     if(!checkUserInDB) throw new Error("user not found")
//     try {
//        const results=await db.$transaction(async(tx)=>{
//         // check if the inducstry exists
//         // update the user
//         let industryInsigts=await tx.industryInsight.findUnique({
//             where:{
//                 industry:data.industry
//             }
//         })
//         // if the industry does not exist then create it with default values - will replcae it with ai later 
//              // If industry doesn't exist, create it with default values
//              if (!industryInsigts) {
//                 const insights = await generateAIInsights(data.industry);

//                 industryInsigts = await db.industryInsight.create({
//                     data: {
//                         industry: data.industry,
//                         ...insights,
//                         nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//                     },
//                 });
//             }

//         const updatedUser=await tx.user.update({
//             where:{
//                 id:checkUserInDB.id
//             },
//             data:{
//                 industry:data.industry,
//                 experience:data.experience,
//                 bio:data.bio,
//                 skills:data.skills
//             }
//         })

//         return {updatedUser,industryInsigts}



//        },{
//         timeout: 10000, // default: 5000

//         // timeout:10000
//        }
//     )

//     return results?.updatedUser;

        
//     } catch (error) {
//         if(error instanceof Error){
//             throw new Error(error?.message)
//         }
//         else{
//             throw new Error("Failed to update user")
//         }
        
//     }       

// }




// export const getUserOnboardingStatus=async():Promise<any>=>{
//     const {userId} = await auth()
//     if(!userId) throw new Error("unauthenticated user")
//     const user=await db.user.findUnique({
//         where:{
//             clerkUserId:userId
//         }
//     })
//     if(!user) throw new Error("user not found")
//     // return user?.onboardingStatus;
// try {
//     const checkUserWithIndustry=await db.user.findUnique({
//         where:{
//             clerkUserId:userId,
//         },
//         select:{
//             industry:true
//         }
//     })
//     return {
//         isOnBoarded:!!checkUserWithIndustry?.industry
//     }
    
// } catch (error) {
//     if(error instanceof Error){
//         // throw new Error(error?.message)
//     }
//     else{
//         // throw new Error("Failed to get onboarding status")
//     }
    
// }

// }



"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data:any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    try {
        // Start a transaction to handle both operations
        const result = await db.$transaction(
            async(tx) => {
                // First check if industry exists
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry,
                    },
                });

                // If industry doesn't exist, create it with default values
                if (!industryInsight) {
                    const insights = await generateAIInsights(data.industry);

                    industryInsight = await db.industryInsight.create({
                        data: {
                            industry: data.industry,
                            ...insights,
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        },
                    });
                }

                // Now update the user
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    },
                });

                return { updatedUser, industryInsight };
            }, {
                timeout: 10000, // default: 5000
            }
        );

        revalidatePath("/");
        // @ts-ignore
        return result.user;
    } catch (error) {
        // console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile");
    }
}

export async function getUserOnboardingStatus() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true,
            },
        });

        return {
            isOnBoarded: !!user ?.industry,
        };
    } catch (error) {
        console.error("Error checking onboarding status:", error);
        throw new Error("Failed to check onboarding status");
    }
}