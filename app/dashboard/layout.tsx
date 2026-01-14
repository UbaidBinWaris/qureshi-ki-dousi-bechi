'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  Users, 
  FolderKanban, 
  Package, 
  Settings, 
  LogOut,
  Menu,
  X,
  Building2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { User } from '@/types'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userStr))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Quotations', href: '/dashboard/quotations', icon: FileText },
    { name: 'Invoices', href: '/dashboard/invoices', icon: Receipt },
    { name: 'Clients', href: '/dashboard/clients', icon: Users },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Materials', href: '/dashboard/materials', icon: Package },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-slate-200 
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Qureshi</h1>
                <p className="text-xs text-slate-500">Construction</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-slate-200">
            <div className="mb-3 px-2">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded">
                {user.role}
              </span>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-500 rounded">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold">Qureshi Construction</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
