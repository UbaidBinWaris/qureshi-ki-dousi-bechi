'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CompanySettings } from '@/types'

export default function SettingsPage() {
  const [settings, setSettings] = useState<CompanySettings | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Failed to load settings:', err))
  }, [])

  if (!settings) return <div>Loading...</div>

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your company information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input value={settings.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Tax ID</Label>
              <Input value={settings.taxId || 'N/A'} readOnly />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={settings.email} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={settings.phone} readOnly />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input value={settings.address} readOnly />
          </div>

          <div className="space-y-2">
            <Label>City</Label>
            <Input value={settings.city} readOnly />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Input value={settings.bankName || 'N/A'} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input value={settings.accountNumber || 'N/A'} readOnly />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Default Tax Rate (%)</Label>
            <Input value={settings.defaultTaxRate} readOnly />
          </div>

          <div className="space-y-2">
            <Label>Default Payment Terms</Label>
            <Input value={settings.defaultPaymentTerms || 'N/A'} readOnly />
          </div>

          <Button className="bg-orange-500 hover:bg-orange-600" disabled>
            Edit Settings (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
