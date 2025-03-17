import { signin } from '@/actions/signin';
import AuthForm from '@/components/auth-form';

export default function SigninPage() {
  return <AuthForm variant="SIGNIN" action={signin} />;
}
