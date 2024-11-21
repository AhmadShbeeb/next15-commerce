import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInButton } from '@/app/sign-in/_components/sign-in-button';

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <SignInButton />
        </CardContent>
      </Card>
    </div>
  );
}
