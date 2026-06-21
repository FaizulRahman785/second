import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Loader2, RefreshCw, Shield, Search, X } from 'lucide-react';
import { api } from '../../lib/api';
import { TablePagination } from '../../components/shared/TablePagination';

const ACTION_COLORS: Record<string, string> = {
  CREATE: 'bg-green-100 text-green-700',
  UPDATE: 'bg-blue-100 text-blue-700',
  DELETE: 'bg-red-100 text-red-700',
  BROADCAST: 'bg-purple-100 text-purple-700',
  LOGIN: 'bg-gray-100 text-gray-700',
};

const ENTITY_OPTIONS = ['student', 'teacher', 'course', 'batch', 'subject', 'material', 'payment', 'notification', 'fee'];

const PAGE_SIZE = 20;

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [entity, setEntity] = useState('');
  const [search, setSearch] = useState('');
  const searchDebounce = useRef<ReturnType<typeof setTimeout>>();

  const load = useCallback((p = page, ent = entity, s = search) => {
    setLoading(true);
    api.admin.getAuditLogs({
      page: p,
      limit: PAGE_SIZE,
      entity: ent || undefined,
      search: s || undefined,
    })
      .then((r) => {
        if (r.success) {
          setLogs(r.data);
          setPagination(r.pagination);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, entity, search]);

  useEffect(() => { load(); }, [page, entity]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      setPage(1);
      load(1, entity, val);
    }, 400);
  };

  const handleEntityChange = (val: string) => {
    setEntity(val === 'all' ? '' : val);
    setPage(1);
  };

  const relativeTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    if (days > 0) return `${days}d ago`;
    if (hrs > 0) return `${hrs}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return 'just now';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="h-8 w-8 text-indigo-600" />
            Audit Logs
          </h1>
          <p className="text-muted-foreground mt-2">
            Track all admin actions · {pagination.total} total entries
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={entity || 'all'} onValueChange={handleEntityChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All entities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All entities</SelectItem>
              {ENTITY_OPTIONS.map((e) => (
                <SelectItem key={e} value={e} className="capitalize">{e}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search action or details..."
              className="pl-9 pr-8 w-52"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {search && (
              <button onClick={() => { setSearch(''); setPage(1); load(1, entity, ''); }} className="absolute right-2 top-2.5 text-muted-foreground hover:text-gray-900">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button variant="outline" onClick={() => load()}><RefreshCw className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-16"><Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{relativeTime(log.createdAt)}</TableCell>
                    <TableCell className="font-medium text-sm">{log.userName || '—'}</TableCell>
                    <TableCell><Badge variant="outline" className="capitalize text-xs">{log.userRole || '—'}</Badge></TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${ACTION_COLORS[log.action] || 'bg-gray-100 text-gray-700'}`}>
                        {log.action}
                      </span>
                    </TableCell>
                    <TableCell className="capitalize text-sm">{log.entity}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{log.details || '—'}</TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono">{log.ipAddress || '—'}</TableCell>
                  </TableRow>
                ))}
                {logs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      {entity || search ? 'No logs match your filters' : 'No audit logs found'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <TablePagination
        pagination={pagination}
        onPageChange={(p) => { setPage(p); load(p, entity, search); }}
      />
    </div>
  );
};
