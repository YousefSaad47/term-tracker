'use client';

import { useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { createNews } from '@/actions/news-actions';
import InitializedMDXEditor from '@/components/InitializedMDXEditor';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CreateNewsForm = () => {
  const [state, createNewsAction, isPending] = useActionState(
    createNews,
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
      toast.success('News created successfully');
      router.push('/dashboard/news');
    }
  }, [state?.success, router]);

  return (
    <form action={createNewsAction}>
      <div className="space-y-4">
        <Label>News Content</Label>
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
        <div className="flex items-center justify-center gap-2">
          <Label>Is Published</Label>
          <Input name="isPublished" type="checkbox" />
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="mt-8">
        {isPending ? <LoaderCircle className="animate-spin" /> : 'Create News'}
      </Button>
      {state?.message && (
        <p className="text-destructive text-center text-sm">{state.message}</p>
      )}
    </form>
  );
};

export default CreateNewsForm;
