import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/shared/Card';
import { Button } from '../../components/shared/Button';
import {
  BookOpen,
  Video,
  FileText,
  Trophy,
  Calendar,
  CreditCard,
  MessageCircle,
  Bell,
  LogOut,
  User,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Upcoming Classes', value: '3', icon: Video, color: 'bg-blue-500' },
    { label: 'Pending Tests', value: '2', icon: FileText, color: 'bg-orange-500' },
    { label: 'Materials', value: '24', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Avg Score', value: '85%', icon: Trophy, color: 'bg-purple-500' },
  ];

  const upcomingClasses = [
    {
      id: '1',
      subject: 'Mathematics',
      teacher: 'Mr. Kumar',
      time: 'Today, 10:00 AM',
      link: '#',
    },
    {
      id: '2',
      subject: 'Physics',
      teacher: 'Dr. Sharma',
      time: 'Today, 2:00 PM',
      link: '#',
    },
    {
      id: '3',
      subject: 'Chemistry',
      teacher: 'Mrs. Patel',
      time: 'Tomorrow, 11:00 AM',
      link: '#',
    },
  ];

  const pendingTasks = [
    { id: '1', task: 'Submit Physics Assignment', due: 'Due Today', type: 'assignment' },
    { id: '2', task: 'Math Chapter 5 Test', due: 'Due Tomorrow', type: 'test' },
    { id: '3', task: 'Chemistry Lab Report', due: 'Due in 2 days', type: 'assignment' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">Student Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
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
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600 mt-1">Here's what's happening with your courses today</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Live Classes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Live Classes</CardTitle>
                <CardDescription>Join your classes at the scheduled time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Video className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{classItem.subject}</h4>
                          <p className="text-sm text-gray-600">{classItem.teacher}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {classItem.time}
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Join Class</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Complete these before the deadline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <div>
                          <p className="font-medium text-gray-900">{task.task}</p>
                          <p className="text-xs text-orange-600">{task.due}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Study Materials
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Take Test
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Results
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask Doubt
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Fee Status
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Fee:</span>
                    <span className="font-semibold">₹50,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paid:</span>
                    <span className="font-semibold text-green-600">₹35,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-semibold text-orange-600">₹15,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <Button variant="primary" size="sm" className="w-full mt-4">
                    Pay Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
