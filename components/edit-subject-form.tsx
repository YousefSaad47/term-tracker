'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { updateSubject } from '@/actions/subject-actions';
import InitializedMDXEditor from './InitializedMDXEditor';
import { Subject } from '@prisma/client';
import { use } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type EditSubjectFormProps = {
  getsubjectByIdPromise: Promise<Subject | null>;
};

const EditSubjectForm = ({ getsubjectByIdPromise }: EditSubjectFormProps) => {
  const subject = use(getsubjectByIdPromise);

  const [state, updateSubjectAction, isPending] = useActionState(
    updateSubject.bind(null, subject?.id as string),
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
      toast.success('Subject updated successfully');
      router.push('/dashboard/subjects');
    }
  }, [state?.success, router]);

  return (
    <form action={updateSubjectAction}>
      <div className="container space-y-4 max-w-md">
        <Label>Name</Label>
        <Input
          name="name"
          defaultValue={state?.inputs?.name || subject?.name}
          className={cn(state?.errors?.name && 'border-destructive')}
        />
        {state?.errors?.name && (
          <p className="text-destructive text-sm">{state.errors.name}</p>
        )}
        <Label>Description</Label>
        <Input
          name="description"
          defaultValue={state?.inputs?.description || subject?.description}
          className={cn(state?.errors?.description && 'border-destructive')}
        />
        {state?.errors?.description && (
          <p className="text-destructive text-sm">{state.errors.description}</p>
        )}
        <Label>Slug</Label>
        <Input
          name="slug"
          defaultValue={state?.inputs?.slug || subject?.slug}
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
        markdown={markdownRef.current || (subject?.intro as string)}
        onChange={handleMarkdownChange}
      />

      <input type="hidden" name="intro" ref={hiddenInputRef} defaultValue="" />

      <Button type="submit" disabled={isPending} className="mt-8">
        {isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          'Update Subject'
        )}
      </Button>

      {state?.message && (
        <p className="text-destructive text-center text-sm">{state.message}</p>
      )}
    </form>
  );
};

export default EditSubjectForm;
