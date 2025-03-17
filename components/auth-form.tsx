'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { FormState } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthFormProps {
  variant: 'SIGNIN' | 'SIGNUP';
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}

const AuthForm: React.FC<AuthFormProps> = ({ action, variant }) => {
  const [state, authAction, isPending] = useActionState(action, undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {variant === 'SIGNUP' ? 'Create account' : 'Sign in'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={authAction}>
          {variant === 'SIGNUP' && (
            <>
              <Label>Name</Label>
              <Input
                name="name"
                defaultValue={state?.inputs?.name}
                className={cn(state?.errors?.name && 'border-destructive')}
              />
              {state?.errors?.name && (
                <p className="text-destructive text-sm">{state.errors.name}</p>
              )}
            </>
          )}
          <Label>Email</Label>
          <Input
            name="email"
            defaultValue={state?.inputs?.email}
            className={cn(state?.errors?.email && 'border-destructive')}
          />
          {state?.errors?.email && (
            <p className="text-destructive text-sm">{state.errors.email}</p>
          )}
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            defaultValue={state?.inputs?.password}
            className={cn(
              state?.errors?.password &&
                'border-destructive focus-visible:border-ring focus-visible:ring-destructive focus-visible:ring-[2px]'
            )}
          />
          {state?.errors?.password && (
            <p className="text-destructive text-sm">{state.errors.password}</p>
          )}
          <Button type="submit" disabled={isPending} className="w-full mt-4">
            {isPending ? <LoaderCircle className="animate-spin" /> : 'Continue'}
          </Button>
          {state?.message && (
            <p className="text-destructive text-center text-sm">
              {state.message}
            </p>
          )}
          <p className="text-center">
            {variant === 'SIGNIN'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <Link
              href={variant === 'SIGNIN' ? '/signup' : '/signin'}
              className="hover:underline"
            >
              {variant === 'SIGNIN' ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </form>
        {variant === 'SIGNIN' && (
          <div className="flex flex-col justify-center items-center">
            <Button variant={'link'} asChild>
              <Link href="request-reset-password">Forgot password?</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthForm;
