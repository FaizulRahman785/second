import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Loader2, TrendingUp, Users, ClipboardList, MessageSquare, BookOpen, Video, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../../lib/api';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.teacher.analytics()
      .then((r) => { if (r.success) setData(r.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-3xl font-bold text-gray-900">Analytics</h1><p className="text-muted-foreground mt-2">Teaching performance overview</p></div>
        <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-green-600" /></div>
      </div>
    );
  }

  const resolutionRate = data?.totalDoubts ? Math.round((data.resolvedDoubts / data.totalDoubts) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-muted-foreground mt-2">Teaching performance overview</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { name: 'Total Students', value: data?.totalStudents ?? 0, icon: Users, color: 'text-blue-600 bg-blue-100' },
          { name: 'Active Batches', value: data?.totalBatches ?? 0, icon: TrendingUp, color: 'text-orange-600 bg-orange-100' },
          { name: 'Tests Created', value: data?.totalTests ?? 0, icon: ClipboardList, color: 'text-purple-600 bg-purple-100' },
          { name: 'Materials', value: data?.totalMaterials ?? 0, icon: BookOpen, color: 'text-teal-600 bg-teal-100' },
          { name: 'Live Classes', value: data?.totalLiveClasses ?? 0, icon: Video, color: 'text-pink-600 bg-pink-100' },
          { name: 'Doubts Resolved', value: data?.resolvedDoubts ?? 0, icon: MessageSquare, color: 'text-green-600 bg-green-100' },
        ].map((s) => (
          <Card key={s.name}>
            <CardContent className="p-4">
              <div className={'p-2.5 rounded-xl w-fit ' + s.color}><s.icon className="h-5 w-5" /></div>
              <h3 className="text-2xl font-bold mt-2">{s.value}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{s.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance indicators */}
        <Card>
          <CardHeader><CardTitle>Performance Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Doubt Resolution Rate</span>
                  <span className="font-bold text-green-600">{resolutionRate}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full transition-all" style={{ width: `${resolutionRate}%` }} />
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Doubts Resolved</span>
                </div>
                <span className="font-bold text-green-600">{data?.resolvedDoubts ?? 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Pending Doubts</span>
                </div>
                <span className="font-bold text-orange-600">{data?.pendingDoubts ?? 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Live Classes Conducted</span>
                </div>
                <span className="font-bold">{data?.totalLiveClasses ?? 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Batches overview */}
        <Card>
          <CardHeader><CardTitle>Batches Overview</CardTitle></CardHeader>
          <CardContent>
            {!data?.batches?.length ? (
              <p className="text-sm text-muted-foreground text-center py-6">No batches assigned yet</p>
            ) : (
              <div className="space-y-3">
                {data.batches.map((b: any) => {
                  const maxStudents = Math.max(...data.batches.map((x: any) => x.studentCount), 1);
                  const pct = Math.round((b.studentCount / maxStudents) * 100);
                  return (
                    <div key={b.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium truncate max-w-[180px]">{b.name}</span>
                        <span className="text-muted-foreground">{b.studentCount} students</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Results Summary */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Test Performance Summary</CardTitle></CardHeader>
          <CardContent>
            {!data?.testResultSummary?.length ? (
              <p className="text-sm text-muted-foreground text-center py-6">No test results yet — publish tests and let students attempt them</p>
            ) : (
              <div className="space-y-3">
                {data.testResultSummary.map((t: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{t.testTitle}</p>
                      <p className="text-xs text-muted-foreground">{t.attempts} attempt{t.attempts !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                        <p className={`text-sm font-bold ${t.avgScore >= 70 ? 'text-green-600' : t.avgScore >= 40 ? 'text-orange-600' : 'text-red-600'}`}>
                          {t.avgScore}%
                        </p>
                      </div>
                      <div className="w-20 bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${t.avgScore >= 70 ? 'bg-green-500' : t.avgScore >= 40 ? 'bg-orange-400' : 'bg-red-500'}`}
                          style={{ width: `${t.avgScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
