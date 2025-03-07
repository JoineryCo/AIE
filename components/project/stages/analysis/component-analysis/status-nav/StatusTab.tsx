"use client";

import React from 'react';
import { cn } from '../../../../../../lib/utils';

interface StatusTabProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  color: string;
}

/**
 * StatusTab
 * 
 * A tab component for filtering components by status.
 * Displays a count badge and changes appearance when active.
 */
export default function StatusTab({
  label,
  count,
  isActive,
  onClick,
  color
}: StatusTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <span>{label}</span>
      {count > 0 && (
        <span className={cn(
          "ml-2 px-2 py-0.5 text-xs font-medium rounded-full",
          color
        )}>
          {count}
        </span>
      )}
    </button>
  );
}
