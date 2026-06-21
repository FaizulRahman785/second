import React from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TablePaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  limitOptions?: number[];
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  pagination,
  onPageChange,
  onLimitChange,
  limitOptions = [10, 20, 50, 100],
  className = '',
}) => {
  const { page, limit, total, totalPages } = pagination;
  if (total === 0) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className={`flex items-center justify-between flex-wrap gap-3 pt-4 ${className}`}>
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{start}</span>–<span className="font-medium">{end}</span> of{' '}
        <span className="font-medium">{total}</span> results
      </p>

      <div className="flex items-center gap-2">
        {onLimitChange && (
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground">Per page:</span>
            <Select value={String(limit)} onValueChange={(v) => { onLimitChange(Number(v)); onPageChange(1); }}>
              <SelectTrigger className="h-8 w-16 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {limitOptions.map(o => <SelectItem key={o} value={String(o)}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onPageChange(1)} disabled={page === 1}>
            <ChevronsLeft className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="text-sm px-2 min-w-[80px] text-center">
            {page} / {totalPages}
          </span>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onPageChange(totalPages)} disabled={page >= totalPages}>
            <ChevronsRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
