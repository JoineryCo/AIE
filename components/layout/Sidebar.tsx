"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import {
  Home,
  FolderKanban,
  Clock,
  Calendar,
  Calculator,
  ChevronDown,
  ChevronRight,
  LineChart,
  FileText,
  Search,
  DollarSign,
  ClipboardCheck,
  Settings,
  Menu,
  X,
  Bell,
  User
} from 'lucide-react';

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  current?: boolean;
  submenu?: NavItem[];
};

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  type ExpandedMenus = {
    [key: string]: boolean;
  };
  
  const [expandedMenus, setExpandedMenus] = useState<ExpandedMenus>({
    projects: false,
    estimator: true, // Estimator menu expanded by default
  });

  // Navigation items structure
  const navigation: NavItem[] = [
    { name: 'Home', href: '/dashboard', icon: <Home size={20} /> },
    {
      name: 'Projects',
      href: '#',
      icon: <FolderKanban size={20} />,
      submenu: [
        { name: 'Project Tracker', href: '/projects/tracker', icon: <LineChart size={16} /> },
        { name: 'My Projects', href: '/projects/my-projects', icon: <FolderKanban size={16} /> },
      ]
    },
    { name: 'My Timesheets', href: '/timesheets', icon: <Clock size={20} /> },
    { name: 'Leave', href: '/leave', icon: <Calendar size={20} /> },
    {
      name: 'Estimator',
      href: '#',
      icon: <Calculator size={20} />,
      submenu: [
        { name: 'Dashboard', href: '/dashboard', icon: <LineChart size={16} /> },
        { name: 'Documents', href: '/documents', icon: <FileText size={16} /> },
        { name: 'Analysis', href: '/analysis', icon: <Search size={16} /> },
        { name: 'Estimation', href: '/estimation', icon: <DollarSign size={16} /> },
        { name: 'Review', href: '/review', icon: <ClipboardCheck size={16} /> },
        { name: 'Settings', href: '/settings', icon: <Settings size={16} /> },
      ]
    },
  ];

  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Toggle submenu expansion
  const toggleSubmenu = (menu: string) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu]
    });
  };

  // Check if a path is the current one
  const isCurrentPath = (path: string) => {
    return pathname === path;
  };

  return (
    <div 
      className={cn(
        "bg-white text-gray-700 flex flex-col h-screen transition-all duration-300 border-r border-gray-200 flex-shrink-0",
        expanded ? "w-64 min-w-[16rem]" : "w-16 min-w-[4rem]"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {expanded ? (
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-200 flex items-center justify-center font-semibold text-gray-700 mr-2">J</div>
            <span className="font-semibold text-gray-800">JOINERY CO</span>
          </div>
        ) : (
          <div className="h-8 w-8 bg-gray-200 flex items-center justify-center font-semibold text-gray-700 mx-auto">J</div>
        )}
        {expanded && (
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} className="text-gray-500" />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => (
            <li key={item.name}>
              {/* Main menu item */}
              <div className="flex flex-col">
                {item.submenu ? (
                  // With submenu
                  <button
                    onClick={() => toggleSubmenu(item.name.toLowerCase())}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-md",
                      "hover:bg-gray-100 transition-colors",
                      isCurrentPath(item.href) && "bg-blue-50 text-blue-600"
                    )}
                  >
                    <div className="flex items-center">
                      <span className={cn("text-gray-500", expanded && "mr-3")}>
                        {item.icon}
                      </span>
                      {expanded && <span>{item.name}</span>}
                    </div>
                    {expanded && (
                      <span className="text-gray-500">
                        {expandedMenus[item.name.toLowerCase()] 
                          ? <ChevronDown size={16} /> 
                          : <ChevronRight size={16} />}
                      </span>
                    )}
                  </button>
                ) : (
                  // Without submenu
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md",
                      "hover:bg-gray-100 transition-colors",
                      isCurrentPath(item.href) && "bg-blue-50 text-blue-600"
                    )}
                  >
                    <span className={cn("text-gray-500", expanded && "mr-3")}>
                      {item.icon}
                    </span>
                    {expanded && <span>{item.name}</span>}
                  </Link>
                )}

                {/* Submenu items */}
                {item.submenu && (expandedMenus[item.name.toLowerCase()] || !expanded) && (
                  <ul className={cn(
                    "mt-1",
                    expanded ? "ml-7" : "space-y-1",
                    !expanded && "px-2"
                  )}>
                    {item.submenu.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.href}
                          className={cn(
                            "flex items-center px-3 py-1.5 rounded-md text-gray-700",
                            "hover:bg-gray-100 transition-colors",
                            isCurrentPath(subItem.href) && "bg-blue-50 text-blue-700",
                            !expanded && "justify-center"
                          )}
                        >
                          <span className={cn(
                            "text-gray-500",
                            expanded && "mr-2",
                            isCurrentPath(subItem.href) && "text-blue-500"
                          )}>
                            {subItem.icon}
                          </span>
                          {expanded && <span>{subItem.name}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile and Notifications */}
      <div className="border-t border-gray-200 py-2">
        {expanded ? (
          <>
            <Link href="#" className="flex items-center py-3 px-4 hover:bg-gray-100">
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">3</span>
              </div>
              <span className="ml-3">Notifications</span>
            </Link>
            <Link href="#" className="flex items-center py-3 px-4 hover:bg-gray-100">
              <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                <span className="text-xs font-semibold">V</span>
              </div>
              <span className="ml-3">Vincent Mayer</span>
            </Link>
          </>
        ) : (
          <>
            <div className="flex justify-center py-3">
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">3</span>
              </div>
            </div>
            <div className="flex justify-center py-3">
              <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                <span className="text-xs font-semibold">V</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
