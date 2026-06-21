import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/shared/Card';
import { Button } from '../../components/shared/Button';
import {
  Users,
  FileText,
  Video,
  ClipboardList,
  MessageCircle,
  Upload,
  PlusCircle,
  LogOut,
  User,
  Bell,
  BookOpen,
  TrendingUp,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Total Students', value: '156', icon: Users, color: 'bg-blue-500' },
    { label: 'Batches', value: '4', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Pending Tests', value: '3', icon: FileText, color: 'bg-orange-500' },
    { label: 'Unresolved Doubts', value: '8', icon: MessageCircle, color: 'bg-purple-500' },
  ];

  const upcomingClasses = [
    { id: '1', batch: 'Class 10 - Morning', subject: 'Mathematics', time: 'Today, 10:00 AM' },
    { id: '2', batch: 'JEE Batch A', subject: 'Physics', time: 'Today, 2:00 PM' },
    { id: '3', batch: 'Class 12 - Evening', subject: 'Mathematics', time: 'Tomorrow, 4:00 PM' },
  ];

  const recentActivity = [
    { id: '1', action: 'Student Rahul submitted Physics assignment', time: '2 hours ago' },
    { id: '2', action: 'New doubt posted in Mathematics', time: '4 hours ago' },
    { id: '3', action: 'Test grading pending for Class 10', time: '1 day ago' },
  ];

  const topPerformers = [
    { id: '1', name: 'Priya Sharma', batch: 'JEE Batch A', score: '95%' },
    { id: '2', name: 'Rahul Verma', batch: 'Class 10', score: '92%' },
    { id: '3', name: 'Anita Kumar', batch: 'Class 12', score: '90%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">Teacher Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Good morning, {user?.name}!</h2>
          <p className="text-gray-600 mt-1">Manage your classes and track student progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button variant="outline" className="h-24 flex-col">
            <Upload className="h-6 w-6 mb-2" />
            <span>Upload Material</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col">
            <PlusCircle className="h-6 w-6 mb-2" />
            <span>Create Test</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col">
            <Video className="h-6 w-6 mb-2" />
            <span>Schedule Class</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col">
            <ClipboardList className="h-6 w-6 mb-2" />
            <span>View Analytics</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Classes */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Live Classes</CardTitle>
                <CardDescription>Your scheduled classes for today and tomorrow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Video className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{classItem.subject}</h4>
                          <p className="text-sm text-gray-600">{classItem.batch}</p>
                          <p className="text-xs text-gray-500 mt-1">{classItem.time}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm">Start</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((student, index) => (
                    <div key={student.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.batch}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-green-600">{student.score}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Pending Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Grade Tests</p>
                      <p className="text-xs text-gray-600">3 tests pending</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Answer Doubts</p>
                      <p className="text-xs text-gray-600">8 unresolved</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Assignments</p>
                      <p className="text-xs text-gray-600">12 submissions</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
