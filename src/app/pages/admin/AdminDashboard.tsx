import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, UsersRound, GraduationCap, Calendar, IndianRupee, ClipboardList, Video, MessageSquare } from 'lucide-react';
import { api } from '../../lib/api';

interface Stats {
  totalStudents: number; totalTeachers: number; totalCourses: number;
  totalBatches: number; totalTests: number; pendingFees: number;
  upcomingClasses: number; pendingDoubts: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.admin.dashboard().then((r) => { if (r.success) setStats(r.data); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { name: 'Total Students', value: stats.totalStudents, icon: Users, color: 'from-blue-600 to-blue-400' },
    { name: 'Total Teachers', value: stats.totalTeachers, icon: UsersRound, color: 'from-green-600 to-green-400' },
    { name: 'Active Courses', value: stats.totalCourses, icon: GraduationCap, color: 'from-purple-600 to-purple-400' },
    { name: 'Active Batches', value: stats.totalBatches, icon: Calendar, color: 'from-orange-600 to-orange-400' },
    { name: 'Pending Fees (₹)', value: '₹' + Number(stats.pendingFees).toLocaleString('en-IN'), icon: IndianRupee, color: 'from-red-600 to-red-400' },
    { name: 'Tests Created', value: stats.totalTests, icon: ClipboardList, color: 'from-indigo-600 to-indigo-400' },
    { name: 'Upcoming Classes', value: stats.upcomingClasses, icon: Video, color: 'from-pink-600 to-pink-400' },
    { name: 'Open Doubts', value: stats.pendingDoubts, icon: MessageSquare, color: 'from-yellow-600 to-yellow-400' },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening today.</p>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <Card key={i}><CardContent className="p-6"><div className="h-16 bg-gray-100 rounded animate-pulse" /></CardContent></Card>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((s) => (
            <Card key={s.name} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{s.name}</p>
                    <h3 className="text-2xl font-bold mt-2">{s.value}</h3>
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
      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Manage Students', href: '/admin/students' },
              { label: 'Manage Teachers', href: '/admin/teachers' },
              { label: 'Manage Courses', href: '/admin/courses' },
              { label: 'Manage Batches', href: '/admin/batches' },
              { label: 'Study Materials', href: '/admin/materials' },
              { label: 'Tests', href: '/admin/tests' },
              { label: 'Fees & Payments', href: '/admin/fees' },
              { label: 'Settings', href: '/admin/settings' },
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
