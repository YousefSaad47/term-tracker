import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const markdownComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="text-3xl font-bold mb-4" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="text-2xl font-bold mb-3" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="text-xl font-bold mb-2" />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 {...props} className="text-lg font-bold mb-2" />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 {...props} className="text-base font-bold mb-1" />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 {...props} className="text-sm font-bold mb-1" />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mb-4" />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc mb-4 pr-6" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="list-decimal mb-4 pr-6" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="mb-2" />
  ),

  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const safeHref = href?.startsWith('http') ? href : `https://${href}`;
    return (
      <a
        {...props}
        href={safeHref}
        className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      />
    );
  },

  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} className="bg-muted px-1.5 py-0.5 rounded text-sm" />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto" />
  ),

  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      {...props}
      className="border-r-4 border-muted-foreground bg-muted pr-4 my-4"
    />
  ),

  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} className="my-4 rounded-lg max-w-full h-auto" />
  ),
};

interface MDWrapperProps {
  content: string;
}

export const MDWrapper: React.FC<MDWrapperProps> = ({ content }) => (
  <ReactMarkdown
    components={markdownComponents}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
  >
    {content}
  </ReactMarkdown>
);
