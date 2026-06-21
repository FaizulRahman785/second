import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/shared/Card';
import { Button } from '../../components/shared/Button';
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  UserPlus,
  FolderPlus,
  Settings,
  LogOut,
  User,
  Bell,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Total Students', value: '1,234', change: '+12%', trend: 'up', icon: Users, color: 'bg-blue-500' },
    { label: 'Total Teachers', value: '48', change: '+3', trend: 'up', icon: GraduationCap, color: 'bg-green-500' },
    { label: 'Active Courses', value: '15', change: '+2', trend: 'up', icon: BookOpen, color: 'bg-purple-500' },
    { label: 'Monthly Revenue', value: '₹12.5L', change: '+8%', trend: 'up', icon: DollarSign, color: 'bg-orange-500' },
  ];

  const recentEnrollments = [
    { id: '1', name: 'Amit Sharma', course: 'JEE Preparation', date: 'Today', fee: '₹50,000' },
    { id: '2', name: 'Neha Patel', course: 'Class 10 CBSE', date: 'Today', fee: '₹30,000' },
    { id: '3', name: 'Rajesh Kumar', course: 'NEET Batch', date: 'Yesterday', fee: '₹60,000' },
  ];

  const pendingFees = [
    { id: '1', student: 'Priya Singh', amount: '₹15,000', due: 'Due Today', status: 'urgent' },
    { id: '2', student: 'Vikram Reddy', amount: '₹10,000', due: 'Due in 3 days', status: 'warning' },
    { id: '3', student: 'Anjali Gupta', amount: '₹20,000', due: 'Due in 7 days', status: 'normal' },
  ];

  const quickActions = [
    { label: 'Add Student', icon: UserPlus, color: 'bg-blue-500' },
    { label: 'Add Teacher', icon: GraduationCap, color: 'bg-green-500' },
    { label: 'Create Course', icon: FolderPlus, color: 'bg-purple-500' },
    { label: 'Create Batch', icon: BookOpen, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-purple-600" />
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
          <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h2>
          <p className="text-gray-600 mt-1">Complete control and oversight of your coaching institute</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="h-24 flex-col">
                <div className={`${action.color} p-3 rounded-lg mb-2`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Enrollments */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Enrollments</CardTitle>
                    <CardDescription>New student admissions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEnrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{enrollment.name}</h4>
                          <p className="text-sm text-gray-600">{enrollment.course}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {enrollment.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{enrollment.fee}</p>
                        <Button size="sm" variant="ghost" className="mt-1">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Overview */}
            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Platform statistics and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-xs text-blue-600 font-medium">+15%</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">234</p>
                    <p className="text-sm text-gray-600">Total Tests</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">+8%</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">45</p>
                    <p className="text-sm text-gray-600">Active Batches</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span className="text-xs text-purple-600 font-medium">Today</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                    <p className="text-sm text-gray-600">Live Classes</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="h-5 w-5 text-orange-600" />
                      <span className="text-xs text-orange-600 font-medium">+22%</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">856</p>
                    <p className="text-sm text-gray-600">Study Materials</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Fees */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Fees</CardTitle>
                <CardDescription>Students with outstanding payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingFees.map((fee) => (
                    <div
                      key={fee.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        fee.status === 'urgent' ? 'border-red-500 bg-red-50' :
                        fee.status === 'warning' ? 'border-orange-500 bg-orange-50' :
                        'border-blue-500 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-gray-900 text-sm">{fee.student}</p>
                        <p className="font-bold text-gray-900 text-sm">{fee.amount}</p>
                      </div>
                      <p className={`text-xs ${
                        fee.status === 'urgent' ? 'text-red-600' :
                        fee.status === 'warning' ? 'text-orange-600' :
                        'text-blue-600'
                      }`}>
                        {fee.due}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Fees
                </Button>
              </CardContent>
            </Card>

            {/* Management Menu */}
            <Card>
              <CardHeader>
                <CardTitle>Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Students
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Manage Teachers
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Manage Courses
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Batches
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Fee Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
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
