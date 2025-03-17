import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function TableSkeleton() {
  const shimmerClass =
    'bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 bg-[length:200%_100%] animate-shimmer rounded';

  return (
    <div className="w-full animate-shimmer">
      <div className="flex items-center py-4 space-x-4">
        <div className={`h-10 w-64 ${shimmerClass}`} />
        <div className="ml-auto h-10 w-32">
          <div className={`${shimmerClass} h-full w-full rounded-md`} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className={`h-4 w-20 ${shimmerClass}`} />
              </TableHead>
              <TableHead>
                <div className={`h-4 w-32 ${shimmerClass}`} />
              </TableHead>
              <TableHead>
                <div className={`h-4 w-24 ${shimmerClass}`} />
              </TableHead>
              <TableHead>
                <div className={`h-4 w-8 ${shimmerClass}`} />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className={`h-4 w-full ${shimmerClass}`} />
                </TableCell>
                <TableCell>
                  <div className={`h-4 w-full ${shimmerClass}`} />
                </TableCell>
                <TableCell>
                  <div className={`h-4 w-16 ${shimmerClass}`} />
                </TableCell>
                <TableCell>
                  <div className={`h-6 w-6 ${shimmerClass} rounded-full`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <div className={`h-4 w-20 ${shimmerClass}`} />
        </div>
        <div className="space-x-2">
          <div className={`h-8 w-16 ${shimmerClass} rounded-md`} />
          <div className={`h-8 w-16 ${shimmerClass} rounded-md`} />
        </div>
      </div>
    </div>
  );
}
