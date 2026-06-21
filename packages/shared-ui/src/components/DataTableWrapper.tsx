// ============================================
// DATA TABLE WRAPPER - Reusable Table Component
// ============================================

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../src/app/components/ui/table';
import { Button } from '../../../../src/app/components/ui/button';
import { Input } from '../../../../src/app/components/ui/input';
import { Search } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableWrapperProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  emptyState?: React.ReactNode;
  actions?: React.ReactNode;
  onRowClick?: (row: T) => void;
}

export function DataTableWrapper<T extends { id: string }>({
  data,
  columns,
  searchable,
  searchPlaceholder = 'Search...',
  onSearch,
  emptyState,
  actions,
  onRowClick,
}: DataTableWrapperProps<T>) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as React.ReactNode;
  };

  return (
    <div className="space-y-4">
      {(searchable || actions) && (
        <div className="flex items-center justify-between gap-4">
          {searchable && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {data.length === 0 ? (
        emptyState || (
          <div className="text-center py-12 text-muted-foreground">
            No data available
          </div>
        )
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index} className={column.className}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  className={onRowClick ? 'cursor-pointer' : ''}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column, index) => (
                    <TableCell key={index} className={column.className}>
                      {getCellValue(row, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// Action Buttons for Tables
interface TableActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  editLabel?: string;
  deleteLabel?: string;
  viewLabel?: string;
}

export function TableActionButtons({
  onEdit,
  onDelete,
  onView,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
  viewLabel = 'View',
}: TableActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      {onView && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onView();
          }}
        >
          {viewLabel}
        </Button>
      )}
      {onEdit && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          {editLabel}
        </Button>
      )}
      {onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-destructive hover:text-destructive"
        >
          {deleteLabel}
        </Button>
      )}
    </div>
  );
}
