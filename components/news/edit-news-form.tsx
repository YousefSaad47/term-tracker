'use client';

import { use, useRef, useEffect } from 'react';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import { updateNews } from '@/actions';
import InitializedMDXEditor from '@/components/InitializedMDXEditor';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { News } from '@prisma/client';

type EditNewsFormProps = {
  getNewsByIdPromise: Promise<News | null>;
};

const EditNewsForm: React.FC<EditNewsFormProps> = ({ getNewsByIdPromise }) => {
  const newsItem = use(getNewsByIdPromise);

  const [state, updateNewsAction, isPending] = useActionState(
    updateNews.bind(null, newsItem?.id as string),
    undefined
  );

  const router = useRouter();

  const markdownRef = useRef(newsItem?.content || '');
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleMarkdownChange = (newMarkdown: string) => {
    markdownRef.current = newMarkdown;
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = newMarkdown;
    }
  };

  useEffect(() => {
    if (state?.success) {
      toast.success('News updated successfully');
      router.push('/dashboard/news');
    }
  }, [state?.success, router]);

  return (
    <form action={updateNewsAction}>
      <div className="space-y-4">
        <Label>Content</Label>
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
        <div className="flex items-center gap-2">
          <Label>Published</Label>
          <Input
            name="isPublished"
            type="checkbox"
            defaultChecked={newsItem?.isPublished}
          />
        </div>
      </div>
      <Button type="submit" disabled={isPending} className="mt-8">
        {isPending ? <LoaderCircle className="animate-spin" /> : 'Update News'}
      </Button>
      {state?.message && (
        <p className="text-destructive text-center text-sm">{state.message}</p>
      )}
    </form>
  );
};

export default EditNewsForm;
