import { signup } from '@/actions/signup';
import AuthForm from '@/components/auth-form';

export default function SigninPage() {
  return (
    <>
      <AuthForm variant="SIGNUP" action={signup} />
    </>
  );
}
