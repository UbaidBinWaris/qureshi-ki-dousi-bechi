'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/utils'
import { Material, Labor } from '@/types'

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [labor, setLabor] = useState<Labor[]>([])

  useEffect(() => {
    fetch('/api/materials')
      .then(res => res.json())
      .then(data => {
        setMaterials(data.materials)
        setLabor(data.labor)
      })
      .catch(err => console.error('Failed to load materials:', err))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Materials & Labor</h1>
        <p className="text-slate-500 mt-1">View construction materials and labor rates</p>
      </div>

      {/* Materials */}
      <Card>
        <CardHeader>
          <CardTitle>Construction Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>{material.category}</TableCell>
                    <TableCell>{material.unit}</TableCell>
                    <TableCell>{formatCurrency(material.rate)}</TableCell>
                    <TableCell className="max-w-xs truncate">{material.description || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Labor */}
      <Card>
        <CardHeader>
          <CardTitle>Labor Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Labor Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Hourly Rate</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labor.map((laborItem) => (
                  <TableRow key={laborItem.id}>
                    <TableCell className="font-medium">{laborItem.name}</TableCell>
                    <TableCell>{laborItem.category}</TableCell>
                    <TableCell>{formatCurrency(laborItem.hourlyRate)}/hr</TableCell>
                    <TableCell className="max-w-xs truncate">{laborItem.description || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
