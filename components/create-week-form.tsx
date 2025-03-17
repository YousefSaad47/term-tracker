'use client';

import { useRef, useEffect, use } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { createWeek } from '@/actions/week-actions';
import InitializedMDXEditor from './InitializedMDXEditor';
import { toast } from 'sonner';
import { Week } from '@prisma/client';
import { useRouter } from 'next/navigation';

type CreateWeekFormProps = {
  subjectId: string;
  getWeeksBySubjectPromise: Promise<Week[]>;
};

const CreateWeekForm = ({
  subjectId,
  getWeeksBySubjectPromise,
}: CreateWeekFormProps) => {
  const [state, createWeekAction, isPending] = useActionState(
    createWeek.bind(null, subjectId),
    undefined
  );

  const router = useRouter();

  const weeksBySubject = use(getWeeksBySubjectPromise);

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
      toast.success('Week created successfully');
      router.push(`/dashboard/subjects/${subjectId}/weeks`);
    }
  }, [state?.success, router, subjectId]);

  return (
    <>
      <div className="container space-y-2 max-w-md mb-6">
        <Label>Existing Weeks</Label>
        {weeksBySubject.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {weeksBySubject.map((week) => (
              <span key={week.id} className="px-2 py-1 rounded text-sm">
                Week {week.weekNumber}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No weeks created yet.</p>
        )}
      </div>

      <form action={createWeekAction}>
        <div className="container space-y-4 max-w-md">
          <Label>Week Number</Label>
          <Input
            name="weekNumber"
            type="number"
            min={1}
            max={14}
            defaultValue={state?.inputs?.weekNumber}
            className={cn(state?.errors?.weekNumber && 'border-destructive')}
          />
          {state?.errors?.weekNumber && (
            <p className="text-destructive text-sm">
              {state.errors.weekNumber}
            </p>
          )}

          <Label>Is Published</Label>
          <Input name="isPublished" type="checkbox" />
        </div>

        <Label className="flex justify-center mt-8 text-xl">Content</Label>
        <InitializedMDXEditor
          className="container mx-auto mt-4 max-w-[90%] bg-white overflow-hidden"
          markdown={markdownRef.current}
          onChange={handleMarkdownChange}
        />

        <input
          type="hidden"
          name="content"
          ref={hiddenInputRef}
          defaultValue={markdownRef.current}
        />

        <Button type="submit" disabled={isPending} className="mt-8">
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            'Create Week'
          )}
        </Button>

        {state?.message && (
          <p className="text-destructive text-center text-sm">
            {state.message}
          </p>
        )}
      </form>
    </>
  );
};

export default CreateWeekForm;
