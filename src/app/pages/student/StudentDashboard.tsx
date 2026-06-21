import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Video, ClipboardList, FileText, ExternalLink, IndianRupee, TrendingUp } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.student.dashboard().then((r) => { if (r.success) setStats(r.data); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
        <p className="text-muted-foreground mt-2">Track your learning progress and upcoming sessions.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <Card key={i}><CardContent className="p-6"><div className="h-24 bg-gray-100 rounded animate-pulse" /></CardContent></Card>)}
        </div>
      ) : (
        <>
          {stats?.feeStatus && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <IndianRupee className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-800">Fee Due</p>
                    <p className="text-sm text-orange-600">₹{Number(stats.feeStatus.finalAmount).toLocaleString('en-IN')} due by {stats.feeStatus.dueDate ? new Date(stats.feeStatus.dueDate).toLocaleDateString() : '—'}</p>
                  </div>
                  <a href="/student/fees" className="ml-auto">
                    <Button size="sm" variant="outline" className="border-orange-400 text-orange-700">View Fees</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )}

          {stats?.upcomingClasses?.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Video className="h-5 w-5 text-blue-600" />Upcoming Live Classes</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.upcomingClasses.map((c: any) => (
                    <div key={c.id} className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                      <div>
                        <p className="font-medium">{c.title}</p>
                        <p className="text-sm text-muted-foreground">{c.teacherName} • {c.scheduledDate ? new Date(c.scheduledDate).toLocaleDateString() : ''} {c.scheduledTime || ''}</p>
                      </div>
                      {c.meetingLink && (
                        <a href={c.meetingLink} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-blue-600"><ExternalLink className="h-3 w-3 mr-1" />Join</Button>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {stats?.recentResults?.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" />Recent Test Results</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.recentResults.map((r: any) => {
                    const pct = Number(r.percentage);
                    const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';
                    return (
                      <div key={r.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{r.testTitle}</p>
                          <p className="text-sm text-muted-foreground">{r.marksObtained}/{r.totalMarks} marks • {r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : ''}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{pct}%</span>
                          <Badge variant={pct >= 70 ? 'default' : 'secondary'}>{grade}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {stats?.recentMaterials?.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-purple-600" />Recent Study Materials</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {stats.recentMaterials.map((m: any) => (
                    <div key={m.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="p-2 bg-purple-100 rounded"><FileText className="h-4 w-4 text-purple-600" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{m.title}</p>
                        <p className="text-xs text-muted-foreground">{m.uploaderName}</p>
                      </div>
                      {m.fileUrl && <a href={m.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline shrink-0">Open</a>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Card>
        <CardHeader><CardTitle>Quick Navigation</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'My Courses', href: '/student/courses' },
              { label: 'Study Materials', href: '/student/materials' },
              { label: 'Live Classes', href: '/student/classes' },
              { label: 'Tests', href: '/student/tests' },
              { label: 'Assignments', href: '/student/assignments' },
              { label: 'My Doubts', href: '/student/doubts' },
              { label: 'Results', href: '/student/results' },
              { label: 'Fees', href: '/student/fees' },
            ].map((a) => (
              <a key={a.label} href={a.href} className="p-3 text-center text-sm font-medium border rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">
                {a.label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
