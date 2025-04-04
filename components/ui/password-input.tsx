'use client';

import { useId, useMemo, useState } from 'react';
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface PasswordInputProps {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string[];
  disabled?: boolean;
}

export default function PasswordInput({
  name,
  value,
  onChange,
  error,
  disabled,
}: PasswordInputProps) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(value);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-border';
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-orange-500';
    if (score === 3) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return 'Enter a password';
    if (score <= 2) return 'Weak password';
    if (score === 3) return 'Medium password';
    return 'Strong password';
  };

  return (
    <div>
      <div className="*:not-first:mt-2">
        <Label htmlFor={id}>
          Password <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Input
            id={id}
            name={name}
            className={cn('pe-9 rounded-full', error && 'border-destructive')}
            placeholder="********"
            type={isVisible ? 'text' : 'password'}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
          >
            {isVisible ? (
              <EyeOffIcon
                className="hover:text-muted-foreground cursor-pointer"
                size={16}
              />
            ) : (
              <EyeIcon
                className="hover:text-muted-foreground cursor-pointer"
                size={16}
              />
            )}
          </button>
        </div>
        {error && <p className="text-destructive text-sm mt-2">{error}</p>}
      </div>

      {/* Password strength indicator */}
      <div
        className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
      >
        <div
          className={`h-full ${getStrengthColor(
            strengthScore
          )} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>

      <p className="text-foreground mb-2 text-sm font-medium">
        {getStrengthText(strengthScore)}. Should contain:
      </p>
      <ul className="space-y-1.5">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <CheckIcon size={16} className="text-emerald-500" />
            ) : (
              <XIcon size={16} className="text-muted-foreground/80" />
            )}
            <span
              className={`text-xs ${
                req.met ? 'text-emerald-600' : 'text-muted-foreground'
              }`}
            >
              {req.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
