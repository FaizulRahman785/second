import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Loader2, RefreshCw, Users } from 'lucide-react';
import { api } from '../../lib/api';

export const MyBatchesPage: React.FC = () => {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.teacher.getBatches().then((r) => { if (r.success) setBatches(r.data); }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Batches</h1>
          <p className="text-muted-foreground mt-2">Batches assigned to you</p>
        </div>
        <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
      </div>
      {loading ? (
        <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((b) => (
            <Card key={b.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-lg">{b.name}</h3>
                  <Badge variant={b.status === 'active' ? 'default' : 'secondary'}>{b.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{b.courseName}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1"><Users className="h-4 w-4 text-muted-foreground" /><span>{b.studentCount ?? 0} students</span></div>
                </div>
                {b.timing && <p className="text-xs text-muted-foreground mt-2">🕒 {b.timing}</p>}
              </CardContent>
            </Card>
          ))}
          {batches.length === 0 && <div className="col-span-3 text-center py-12 text-muted-foreground">No batches assigned yet</div>}
        </div>
      )}
    </div>
  );
};
