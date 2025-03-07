"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  HelpCircle, 
  Bell, 
  FileText,
  Filter, 
  ChevronDown,
  ArrowUpDown,
  Eye,
  Play,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart2,
  Settings,
  PlusCircle,
  Home,
  FileInput,
  FileSearch,
  Calculator,
  CheckSquare,
  User,
  Menu,
  Calendar,
  Download
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client: string;
  dueDate: string;
  status: string;
  progress: number;
  confidence: number;
}

interface Activity {
  id: number;
  timestamp: string;
  type: 'system' | 'user' | 'notification' | 'status';
  description: string;
  project: string;
  projectName: string;
  user: string | null;
}

export function MainDashboard() {
  // Mock data for demonstration purposes
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'J-1025',
      name: 'Mountain View Kitchen',
      client: 'Axis Developers',
      dueDate: '2025-03-15',
      status: 'In Analysis',
      progress: 45,
      confidence: 85,
    },
    {
      id: 'J-1026',
      name: 'Eastside Office Fit-out',
      client: 'Westpac Corporate',
      dueDate: '2025-03-22',
      status: 'Awaiting Review',
      progress: 75,
      confidence: 92,
    },
    {
      id: 'J-1027',
      name: 'Riverside Apartments',
      client: 'Meriton Group',
      dueDate: '2025-04-05',
      status: 'Document Processing',
      progress: 15,
      confidence: 70,
    },
    {
      id: 'J-1028',
      name: 'Hillside Residence',
      client: 'Private Client',
      dueDate: '2025-03-30',
      status: 'In Estimation',
      progress: 60,
      confidence: 88,
    },
    {
      id: 'J-1029',
      name: 'Central Mall Kiosks',
      client: 'Scentre Group',
      dueDate: '2025-04-10',
      status: 'Quoted',
      progress: 100,
      confidence: 95,
    },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      timestamp: '2025-03-04T10:30:00',
      type: 'system',
      description: 'Document processing completed for Riverside Apartments',
      project: 'J-1027',
      projectName: 'Riverside Apartments',
      user: null,
    },
    {
      id: 2,
      timestamp: '2025-03-04T09:45:00',
      type: 'user',
      description: 'Quote approved for Central Mall Kiosks',
      project: 'J-1029',
      projectName: 'Central Mall Kiosks',
      user: 'Jane Doe',
    },
    {
      id: 3,
      timestamp: '2025-03-04T09:15:00',
      type: 'notification',
      description: 'RFI response received for Mountain View Kitchen',
      project: 'J-1025',
      projectName: 'Mountain View Kitchen',
      user: null,
    },
    {
      id: 4,
      timestamp: '2025-03-03T16:20:00',
      type: 'status',
      description: 'Eastside Office Fit-out moved to Awaiting Review stage',
      project: 'J-1026',
      projectName: 'Eastside Office Fit-out',
      user: 'John Smith',
    },
    {
      id: 5,
      timestamp: '2025-03-03T14:35:00',
      type: 'system',
      description: 'Supplier prices updated for Hillside Residence',
      project: 'J-1028',
      projectName: 'Hillside Residence',
      user: null,
    },
    {
      id: 6,
      timestamp: '2025-03-03T11:10:00',
      type: 'user',
      description: '3 specification issues addressed for Eastside Office Fit-out',
      project: 'J-1026',
      projectName: 'Eastside Office Fit-out',
      user: 'Sarah Johnson',
    },
  ]);

  // Mock metrics
  const metrics = {
    activeProjects: 5,
    needingReview: 2,
    recentlyCompleted: 3,
    winLossRatio: '68%'
  };

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'Document Processing':
        return 'bg-blue-100 text-blue-800';
      case 'In Analysis':
        return 'bg-purple-100 text-purple-800';
      case 'Awaiting Review':
        return 'bg-amber-100 text-amber-800';
      case 'In Estimation':
        return 'bg-indigo-100 text-indigo-800';
      case 'Quoted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch(type) {
      case 'system':
        return <Settings className="h-4 w-4 text-blue-500" />;
      case 'user':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'notification':
        return <Bell className="h-4 w-4 text-amber-500" />;
      case 'status':
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatRelativeTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    
    if (diffSec < 60) {
      return 'just now';
    } else if (diffSec < 3600) {
      const min = Math.floor(diffSec / 60);
      return `${min} ${min === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffSec < 86400) {
      const hours = Math.floor(diffSec / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(diffSec / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  // State to control sidebar expansion
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      {/* Header - Now sticky */}
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AI Estimator</h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative max-w-md w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center text-gray-600 space-x-4">
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">AI Ready</span>
            </div>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <HelpCircle className="h-5 w-5" />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Download className="h-5 w-5" />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto w-full">
        <div className="w-full px-2">
          {/* Project Overview Section - Full Width */}
          <div className="mb-8 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Project Overview</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                <PlusCircle className="h-5 w-5 mr-2" />
                New AI Estimation
              </button>
            </div>
            
            <div className="flex flex-row space-x-6 overflow-x-auto pb-2 w-full">
              <div className="bg-white rounded-lg shadow-sm p-6 min-w-[240px] flex-1">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 mr-4">
                    <BarChart2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{metrics.activeProjects}</div>
                    <div className="text-sm text-gray-500">Active Projects</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 min-w-[240px] flex-1">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-amber-100 mr-4">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{metrics.needingReview}</div>
                    <div className="text-sm text-gray-500">Awaiting Review</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 min-w-[240px] flex-1">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{metrics.recentlyCompleted}</div>
                    <div className="text-sm text-gray-500">Recently Completed</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 min-w-[240px] flex-1">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-purple-100 mr-4">
                    <BarChart2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{metrics.winLossRatio}</div>
                    <div className="text-sm text-gray-500">Win/Loss Ratio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Active Projects Grid - Full Width */}
          <div className="mb-8 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Active Projects</h2>
              <div className="flex space-x-3">
                <div className="flex items-center">
                  <button className="inline-flex items-center gap-x-1.5 text-sm font-medium text-gray-700 rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    Filter
                  </button>
                </div>
                
                <div className="flex items-center">
                  <button className="inline-flex items-center gap-x-1.5 text-sm font-medium text-gray-700 rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Project Name
                          <ArrowUpDown className="ml-1 h-4 w-4 cursor-pointer" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Client
                          <ArrowUpDown className="ml-1 h-4 w-4 cursor-pointer" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Due Date
                          <ArrowUpDown className="ml-1 h-4 w-4 cursor-pointer" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Confidence
                          <ArrowUpDown className="ml-1 h-4 w-4 cursor-pointer" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {projects.map((project, index) => (
                      <tr 
                        key={project.id}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-gray-900">{project.name}</div>
                              <div className="text-xs text-gray-500">{project.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">{project.client}</td>
                        <td className="py-4 px-4 text-sm text-gray-500">{formatDate(project.dueDate)}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{project.progress}%</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${getConfidenceColor(project.confidence)}`}></div>
                            <span className="text-sm">{project.confidence}%</span>
                          </div>
                        </td>
                          <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100" title="View Details">
                              <Eye className="h-4 w-4" />
                            </button>
                            
                            <Link 
                              href={`/project/${project.id}`}
                              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                              title="Open Project Workspace"
                            >
                              <Play className="h-4 w-4" />
                            </Link>
                            
                            <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100" title="Export">
                              <FileText className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Recent Activity Feed - Full Width */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <div className="flex space-x-3">
                <button className="inline-flex items-center gap-x-1.5 text-sm font-medium text-gray-700 rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50">
                  All Activities
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm">
              <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {activities.map((activity) => (
                  <li key={activity.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">{activity.description}</div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="truncate">{activity.projectName}</span>
                          {activity.user && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{activity.user}</span>
                            </>
                          )}
                          <span className="mx-1">•</span>
                          <span>{formatRelativeTime(activity.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {activities.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No recent activity found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
