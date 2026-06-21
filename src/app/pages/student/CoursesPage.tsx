import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Loader2, GraduationCap } from 'lucide-react';
import { api } from '../../lib/api';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.student.getCourses().then((r) => { if (r.success) setCourses(r.data); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-muted-foreground mt-2">Courses you are enrolled in</p>
      </div>
      {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <Card key={c.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg"><GraduationCap className="h-6 w-6 text-blue-600" /></div>
                  <Badge variant={c.status === 'active' ? 'default' : 'secondary'}>{c.status}</Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">{c.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{c.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{c.classLevel || 'All Levels'}</span>
                  <span className="font-medium text-green-600">₹{Number(c.fee || 0).toLocaleString('en-IN')}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {courses.length === 0 && <div className="col-span-3 text-center py-12 text-muted-foreground">No courses enrolled yet</div>}
        </div>
      )}
    </div>
  );
};
