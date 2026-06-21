import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Loader2, Search, FileText, Video, Image, File } from 'lucide-react';
import { api } from '../../lib/api';

const typeIcon = (t: string = '') => ({ pdf: FileText, video: Video, image: Image })[t.toLowerCase()] || File;
const typeBadge = (t: string = '') => ({ pdf: 'bg-red-100 text-red-700', video: 'bg-blue-100 text-blue-700', image: 'bg-green-100 text-green-700' })[t.toLowerCase()] || 'bg-gray-100 text-gray-700';

export const MaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.student.getMaterials().then((r) => { if (r.success) setMaterials(r.data); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = materials.filter(m => m.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
        <p className="text-muted-foreground mt-2">Access all materials shared by your teachers</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search materials..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => {
            const Icon = typeIcon(m.type);
            return (
              <Card key={m.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={'p-2 rounded-lg ' + typeBadge(m.fileType || m.type)}><Icon className="h-5 w-5" /></div>
                    <Badge variant="outline">{(m.fileType || m.type)?.toUpperCase()}</Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{m.title}</h3>
                  {m.description && <p className="text-sm text-muted-foreground mb-3">{m.description}</p>}
                  {(m.fileUrl || m.url) && <a href={m.fileUrl || m.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline font-medium">Open Material →</a>}
                </CardContent>
              </Card>
            );
          })}
          {filtered.length === 0 && <div className="col-span-3 text-center py-12 text-muted-foreground">No materials available yet</div>}
        </div>
      )}
    </div>
  );
};
