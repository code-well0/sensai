"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });

    if (!user) throw new Error("User not found");
    try {
        const result = await db.$transaction(
            async (tx) => {

                // find if the industry exists
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry
                    }
                })

                //if the industry does not exist, create it with deafult values - will replace it with ai later
                if (!industryInsight) {
                        const insights = await generateAIInsights(data.industry);
                
                        industryInsight = await tx.industryInsight.create({
                            data: {
                                industry: data.industry,
                                ...insights,
                                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //1 week from now
                            },
                        });
                    }

                // update the user
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

                return { updatedUser, industryInsight};
            },
            {
                timeout: 20000, // default: 5000
            }
        );

        return { success: true, ...result };
        
    } catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile: " + error.message);
    }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      id: true,
      industry: true,
    },
  });

  // If user does not exist → create one
  if (!user) {
    const clerkUser = await currentUser();

    if (!clerkUser) throw new Error("Clerk user not found");

    user = await db.user.create({
      data: {
        clerkUserId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress,
      },
      select: {
        id: true,
        industry: true,
      },
    });
  }

  return {
    isOnboarded: !!user.industry,
  };
}
