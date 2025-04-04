import { signin } from '@/actions';
import AuthForm from '@/components/auth-form';

export default function SigninPage() {
  return <AuthForm variant="SIGNIN" action={signin} />;
}
