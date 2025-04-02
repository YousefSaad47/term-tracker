'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { FormState } from '@/types';
import PasswordInput from '@/components/ui/password-input';

interface AuthFormProps {
  variant: 'SIGNIN' | 'SIGNUP';
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}

const AuthForm: React.FC<AuthFormProps> = ({ action, variant }) => {
  const [password, setPassword] = useState('');

  const [state, authAction, isPending] = useActionState(action, undefined);

  return (
    <>
      <form
        className="container max-w-xs md:max-w-sm flex flex-col gap-4"
        action={authAction}
      >
        {variant === 'SIGNUP' && (
          <>
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              defaultValue={state?.inputs?.name}
              disabled={isPending}
              className={cn(state?.errors?.name && 'border-destructive')}
            />
            {state?.errors?.name && (
              <p className="text-destructive text-sm">{state.errors.name}</p>
            )}
          </>
        )}
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="johndoe@gmail.com"
          defaultValue={state?.inputs?.email}
          disabled={isPending}
          className={cn(state?.errors?.email && 'border-destructive')}
        />
        {state?.errors?.email && (
          <p className="text-destructive text-sm">{state.errors.email}</p>
        )}
        {variant === 'SIGNUP' ? (
          <PasswordInput
            name="password"
            value={password}
            onChange={setPassword}
            error={state?.errors?.password}
            disabled={isPending}
          />
        ) : (
          <>
            <Label htmlFor="password">
              Password <span className="text-destructive">*</span>
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="password"
              type="password"
              defaultValue={state?.inputs?.password}
              disabled={isPending}
              className={cn(state?.errors?.password && 'border-destructive')}
            />
            {state?.errors?.password && (
              <p className="text-destructive text-sm">
                {state.errors.password}
              </p>
            )}
          </>
        )}
        <Button type="submit" disabled={isPending} className="w-full mt-4">
          {isPending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {variant === 'SIGNIN' ? 'Sign in' : 'Sign up'}
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
    </>
  );
};

export default AuthForm;
