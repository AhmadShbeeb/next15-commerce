'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';
interface UserProfileProps {
  user: Session['user'];
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          {user.image ? (
            <div className="relative mb-4 h-24 w-24">
              <Image src={user.image} alt={user.name || 'User'} fill className="rounded-full object-cover" />
            </div>
          ) : (
            <User className="h-24 w-24 rounded-full bg-slate-100" />
          )}
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="mt-1 text-muted-foreground">{user.email}</p>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="pt-6">
        <Button variant="destructive" className="w-full" onClick={() => signOut()}>
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
}
