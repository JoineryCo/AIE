"use client";

import React from 'react';
import { cn } from '../../../../../lib/utils';
import { ElementStatus } from '../types';

interface StatusTabsNavigationProps {
  activeStatus: ElementStatus | 'all';
  onStatusChange: (status: ElementStatus | 'all') => void;
  counts: {
    'all': number;
    'to-review': number;
    'approved': number;
    'modified': number;
    'discarded': number;
    'unclear': number;
  };
}

/**
 * StatusTabsNavigation
 * 
 * Tab navigation for filtering drawing elements by status.
 * Similar to the StatusTabs component in text-analysis but specifically for drawing elements.
 */
const StatusTabsNavigation: React.FC<StatusTabsNavigationProps> = ({ 
  activeStatus, 
  onStatusChange,
  counts
}) => {
  // Tab definitions with labels and colors
  const tabs = [
    { 
      id: 'to-review' as const, 
      label: 'To Be Reviewed', 
      activeColor: 'border-amber-500 text-amber-600',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    { 
      id: 'approved' as const, 
      label: 'Approved', 
      activeColor: 'border-green-500 text-green-600',
      badgeColor: 'bg-green-100 text-green-800'
    },
    { 
      id: 'modified' as const, 
      label: 'Modified', 
      activeColor: 'border-blue-500 text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    { 
      id: 'discarded' as const, 
      label: 'Discarded', 
      activeColor: 'border-red-500 text-red-600',
      badgeColor: 'bg-red-100 text-red-800'
    },
    { 
      id: 'unclear' as const, 
      label: 'Needs Clarification', 
      activeColor: 'border-purple-500 text-purple-600',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    { 
      id: 'all' as const, 
      label: 'All Elements', 
      activeColor: 'border-gray-500 text-gray-600',
      badgeColor: 'bg-gray-100 text-gray-800'
    }
  ];
  
  return (
    <div className="flex overflow-x-auto px-4 py-2 border-b border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onStatusChange(tab.id)}
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap mr-4",
            activeStatus === tab.id
              ? tab.activeColor
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          )}
        >
          {tab.label}
          <span className={cn(
            "ml-2 px-2 py-0.5 text-xs font-medium rounded-full",
            tab.badgeColor
          )}>
            {counts[tab.id]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default StatusTabsNavigation;
