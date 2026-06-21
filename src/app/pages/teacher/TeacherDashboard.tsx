import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, ClipboardList, Video, MessageSquare, BookOpen, FileText, ExternalLink } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.teacher.dashboard().then((r) => { if (r.success) setStats(r.data); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { name: 'My Batches', value: stats.myBatches ?? 0, icon: Users, color: 'from-blue-600 to-blue-400' },
    { name: 'Materials Uploaded', value: stats.materialsUploaded ?? 0, icon: FileText, color: 'from-purple-600 to-purple-400' },
    { name: 'Tests Created', value: stats.testsCreated ?? 0, icon: ClipboardList, color: 'from-orange-600 to-orange-400' },
    { name: 'Open Doubts', value: stats.pendingDoubts ?? 0, icon: MessageSquare, color: 'from-yellow-600 to-yellow-400' },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
        <p className="text-muted-foreground mt-2">Here's your teaching overview for today.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <Card key={i}><CardContent className="p-6"><div className="h-16 bg-gray-100 rounded animate-pulse" /></CardContent></Card>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((s) => (
            <Card key={s.name} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{s.name}</p>
                    <h3 className="text-3xl font-bold mt-2">{s.value}</h3>
                  </div>
                  <div className={'p-3 rounded-xl bg-gradient-to-br ' + s.color}>
                    <s.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {stats?.upcomingClasses?.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Upcoming Live Classes</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.upcomingClasses.map((c: any) => (
                <div key={c.id} className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-sm text-muted-foreground">{c.batchName} • {c.scheduledDate ? new Date(c.scheduledDate).toLocaleDateString() : ''} {c.scheduledTime || ''}</p>
                  </div>
                  {c.meetingLink && (
                    <a href={c.meetingLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                      Join <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'My Batches', href: '/teacher/batches' },
              { label: 'Upload Material', href: '/teacher/materials' },
              { label: 'Schedule Live Class', href: '/teacher/classes' },
              { label: 'Create Test', href: '/teacher/tests' },
              { label: 'Assignments', href: '/teacher/assignments' },
              { label: 'Answer Doubts', href: '/teacher/doubts' },
            ].map((a) => (
              <a key={a.label} href={a.href} className="p-3 text-center text-sm font-medium border rounded-lg hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors">
                {a.label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
