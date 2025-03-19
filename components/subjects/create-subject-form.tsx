'use client';

import { useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { createSubject } from '@/actions';
import InitializedMDXEditor from '@/components/InitializedMDXEditor';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CreateSubjectForm = () => {
  const [state, createSubjectAction, isPending] = useActionState(
    createSubject,
    undefined
  );

  const router = useRouter();

  const markdownRef = useRef('');
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleMarkdownChange = (newMarkdown: string) => {
    markdownRef.current = newMarkdown;
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = newMarkdown;
    }
  };

  useEffect(() => {
    if (state?.success) {
      toast.success('Subject created successfully');
      router.push('/dashboard/subjects');
    }
  }, [state?.success, router]);

  return (
    <form action={createSubjectAction}>
      <div className="container space-y-4 max-w-md">
        <Label>name</Label>
        <Input
          name="name"
          defaultValue={state?.inputs?.name}
          className={cn(state?.errors?.name && 'border-destructive')}
        />
        {state?.errors?.name && (
          <p className="text-destructive text-sm">{state.errors.name}</p>
        )}
        <Label>description</Label>
        <Input
          name="description"
          defaultValue={state?.inputs?.description}
          className={cn(state?.errors?.description && 'border-destructive')}
        />
        {state?.errors?.description && (
          <p className="text-destructive text-sm">{state.errors.description}</p>
        )}
        <Label>Slug</Label>
        <Input
          name="slug"
          defaultValue={state?.inputs?.slug}
          className={cn(
            state?.errors?.slug &&
              'border-destructive focus-visible:border-ring focus-visible:ring-destructive focus-visible:ring-[2px]'
          )}
        />
        {state?.errors?.slug && (
          <p className="text-destructive text-sm">{state.errors.slug}</p>
        )}
      </div>

      <Label className="flex justify-center mt-8 text-xl">Intro</Label>
      <InitializedMDXEditor
        className="container mx-auto mt-4 max-w-[90%] bg-white overflow-hidden"
        markdown={markdownRef.current}
        onChange={handleMarkdownChange}
      />

      <input
        type="hidden"
        name="intro"
        ref={hiddenInputRef}
        defaultValue={markdownRef.current}
      />

      <Button type="submit" disabled={isPending} className="mt-8">
        {isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          'Create Subject'
        )}
      </Button>
      {state?.message && (
        <p className="text-destructive text-center text-sm">{state.message}</p>
      )}
    </form>
  );
};

export default CreateSubjectForm;
