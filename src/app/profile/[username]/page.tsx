import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from '@/actions/profile.action';
import { getUserByClerkId } from '@/actions/user.action';
import { notFound } from 'next/navigation';
import { title } from 'process';
import React from 'react'
import ProfilePageClient from './ProfilePageClient';

export async function generateMetadata({params,}: {  params: Promise<{ username: string }>}){
    const { username } = await params

    const user=await getProfileByUsername(username);

    if(!user) return {title: "Profile not found"};

    return{
        title: `Profile • ${user.name ?? user.username}`,
        description: user.bio ?? "No bio available",

    }


}

async function ProfilePageServer({params,}: {  params: Promise<{ username: string }>}) {

    const { username } = await params

    const user=await getProfileByUsername(username);

    if(!user) notFound();

    const [posts,likedPosts, isCurrentUserFollowing]=await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id),
    ])

  return <ProfilePageClient
  user={user}
  posts={posts}
  likedPosts={likedPosts}
  isFollowing={isCurrentUserFollowing}
  
  />
}

export default ProfilePageServer;