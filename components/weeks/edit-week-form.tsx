'use client';

import { useRef, useEffect, use } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { updateWeek } from '@/actions';
import InitializedMDXEditor from '@/components/InitializedMDXEditor';
import { toast } from 'sonner';
import { Week } from '@prisma/client';
import { useRouter } from 'next/navigation';

type EditWeekFormProps = {
  getWeekByIdPromise: Promise<Week | null>;
  subjectId: string;
};

const EditWeekForm = ({ getWeekByIdPromise, subjectId }: EditWeekFormProps) => {
  const week = use(getWeekByIdPromise);

  const router = useRouter();

  const [state, updateWeekAction, isPending] = useActionState(
    updateWeek.bind(null, week?.id as string, subjectId),
    undefined
  );

  const markdownRef = useRef(week?.content || '');
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleMarkdownChange = (newMarkdown: string) => {
    markdownRef.current = newMarkdown;
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = newMarkdown;
    }
  };

  useEffect(() => {
    if (state?.success) {
      toast.success('Week updated successfully');
      router.push(`/dashboard/subjects/${week?.subjectId}/weeks`);
    }
  }, [state?.success, router, week?.subjectId]);

  return (
    <form action={updateWeekAction}>
      <div className="container space-y-4 max-w-md">
        <Label>Week Number</Label>
        <Input
          name="weekNumber"
          type="number"
          min={1}
          max={14}
          defaultValue={state?.inputs?.weekNumber ?? week?.weekNumber}
          className={cn(state?.errors?.weekNumber && 'border-destructive')}
        />
        {state?.errors?.weekNumber && (
          <p className="text-destructive text-sm">{state.errors.weekNumber}</p>
        )}

        <Label>Is Published</Label>
        <Input
          name="isPublished"
          type="checkbox"
          defaultChecked={week?.isPublished}
        />
      </div>

      <Label className="flex justify-center mt-8 text-xl">Content</Label>
      <InitializedMDXEditor
        className="container mx-auto mt-4 max-w-[90%] bg-white overflow-hidden"
        markdown={markdownRef.current || week?.content || ''}
        onChange={handleMarkdownChange}
      />

      <input
        type="hidden"
        name="content"
        ref={hiddenInputRef}
        defaultValue={markdownRef.current || week?.content || ''}
      />

      <Button type="submit" disabled={isPending} className="mt-8">
        {isPending ? <LoaderCircle className="animate-spin" /> : 'Update Week'}
      </Button>

      {state?.message && (
        <p className="text-destructive text-center text-sm">{state.message}</p>
      )}
    </form>
  );
};

export default EditWeekForm;
