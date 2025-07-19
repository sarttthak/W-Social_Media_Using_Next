import { getRandomUsers } from '@/actions/user.action';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';
import FollowButton from './FollowButton';

async function WhoToFollow() {
    const users=await getRandomUsers();

    if(users.length===0) return null;

  return (
    <Card>
        <CardHeader>
            <CardTitle>Recommendations</CardTitle>

        </CardHeader>
        <CardContent>
            <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex gap-2 items-center justify-between ">
              <div className="flex items-center gap-3">
                <Link href={`/profile/${user.username}`}>
                  <Avatar className='h-11 w-11'>
                    <AvatarImage src={user.image ?? "https://github.com/shadcn.png"} />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link href={`/profile/${user.username}`} className="font-medium cursor-pointer">
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">{user._count.followers} followers</p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
        </CardContent>
    </Card>
  )
}

export default WhoToFollow