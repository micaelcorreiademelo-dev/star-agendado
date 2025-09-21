'use client'

import React from 'react'
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb'

interface TaskItem {
  id: string
  title: string
  description?: string
  completed?: boolean
}

interface PageSkeletonProps {
  title: string
  description?: string
  breadcrumbItems?: BreadcrumbItem[]
  tasks?: TaskItem[]
  children?: React.ReactNode
  className?: string
}

export function PageSkeleton({
  title,
  description,
  breadcrumbItems = [],
  tasks = [],
  children,
  className = ''
}: PageSkeletonProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Breadcrumb */}
            {breadcrumbItems.length > 0 && (
              <div className="mb-4">
                <Breadcrumb items={breadcrumbItems} />
              </div>
            )}
            
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="mt-2 text-sm text-gray-600">{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* TODO Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-yellow-800">
                  TODO - Página em Desenvolvimento
                </h3>
              </div>
            </div>
            
            {tasks.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">
                  Tarefas Pendentes:
                </h4>
                <ul className="space-y-2">
                  {tasks.map((task) => (
                    <li key={task.id} className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={task.completed || false}
                          readOnly
                          className="h-4 w-4 text-yellow-600 border-yellow-300 rounded focus:ring-yellow-500"
                        />
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm ${task.completed ? 'line-through text-yellow-600' : 'text-yellow-800'}`}>
                          <span className="font-medium">{task.title}</span>
                          {task.description && (
                            <span className="block text-yellow-700 mt-1">
                              {task.description}
                            </span>
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {children || (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Conteúdo em desenvolvimento
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Esta página será implementada em breve.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}