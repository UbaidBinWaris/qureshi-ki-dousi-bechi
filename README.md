# Construction Project Lifecycle Management System

An automated tool for managing the complete lifecycle of construction projects from initial quote to final invoice. Built with Next.js, TypeScript, and optimized for iPad-based on-site consultations.

## Vision

Create an automated tool for the lifecycle of a construction project from initial quote to final invoice. The software allows owners to:

- Enter client information (name, address, email)
- Perform a full intake of project specifications
- Generate quotes and finalize invoicing seamlessly
- Track material usage and labor hours
- Manage vendors and trade providers
- Generate phase-based invoices

## Core Features

### 📊 Comprehensive Database
- **Room Templates**: All possible room types (bathroom, kitchen, living room, etc.) with default material and labor assignments
- **Building Materials**: Structural materials (cement, drywall, lumber) with editable default prices and vendor links
- **Finishing Materials**: Paint colors, flooring, fixtures, baseboards with vendor integration
- **Additional Costs**: Default costs for permits, inspections, waste bins (all editable)
- **Trades**: Multiple provider options for each trade with hourly/job-based rates

### 💰 Price Control
- Built-in pricing chart (user-generated)
- Integration with vendor websites (Home Depot, Home Hardware, Canadian Tire)
- Real-time market price comparison
- Automatic selection of cheapest vendor
- Manual override capability

### 🔄 Three-Phase Workflow

#### Phase 1: Structural Phase
- iPad-based on-site consultation
- CRM data entry
- Room-by-room walkthrough
- Dimension entry (auto-calculates square footage)
- Material selection (auto-suggests based on room type)
- Labor assignment (auto-calculates hours)
- Demolition and waste costs

#### Phase 2: Finishing Phase
- Client design input
- Paint colors and flooring selection
- Fixture selection (faucets, toilets, sinks)
- Trim and baseboard choices

#### Phase 3: Quote Finalization
- Review and fine-tune pricing
- Add special instructions
- Add/remove materials
- Generate PDF
- Email with one click
- Electronic signature integration

### 📄 Post-Acceptance Workflow
1. **Project Activation**: Quote approval triggers "Active" status
2. **Progress Tracking**: Validate actual material usage and labor hours
3. **Invoice Generation**: Phase-based or full project invoicing with extras and adjustments

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS, Radix UI
- **PDF Generation**: jsPDF with autotable
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js (planned)

## Project Structure

```
app/
  ├── api/                    # API routes
  │   ├── auth/              # Authentication
  │   ├── clients/           # Client management
  │   ├── projects/          # Project management
  │   ├── materials/         # Material database
  │   ├── rooms/             # Room templates
  │   ├── trades/            # Trade providers
  │   ├── additional-costs/  # Permits & inspections
  │   ├── quotations/        # Quote generation
  │   └── invoices/          # Invoice generation
  ├── dashboard/             # Dashboard pages
  └── login/                 # Authentication pages

components/
  ├── forms/                 # Form components
  ├── pdf/                   # PDF generation
  ├── tables/                # Data tables
  └── ui/                    # Reusable UI components

data/                        # JSON data files
  ├── clients.json
  ├── projects.json          # Enhanced with rooms & phases
  ├── materials.json         # Enhanced with vendor links
  ├── labor.json             # Enhanced with providers
  ├── rooms.json             # Room templates
  ├── trades.json            # Trade providers
  ├── additional-costs.json  # Permits, inspections, etc.
  ├── quotations.json        # Phase-based quotes
  └── invoices.json          # Invoices with adjustments

types/
  └── index.ts               # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/UbaidBinWaris/qureshi-ki-dousi-bechi.git

# Navigate to project directory
cd qureshi-ki-dousi-bechi

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Documentation

- **[Workflow Documentation](WORKFLOW_DOCUMENTATION.md)** - Complete system architecture and workflow guide
- **[Quick Reference](QUICK_REFERENCE.md)** - Quick reference for daily usage

## Key Features Explained

### 1. Room-Based Estimating
Select a room type, enter dimensions, and the system automatically:
- Calculates square footage
- Suggests appropriate materials
- Estimates material quantities
- Assigns relevant trades
- Calculates estimated labor hours

### 2. Vendor Price Integration
Click on any material (e.g., "2x4 Lumber") to see:
```
Default Price: $380
─────────────────────────
Home Depot:    $365 ← Auto-selected (cheapest)
Home Hardware: $375
Canadian Tire: $380
```
System defaults to cheapest vendor with option to override.

### 3. Multi-Phase Project Management
Projects progress through phases:
```
draft → quoted → active → completed
  ↓       ↓        ↓
structural → finishing → final-review
```

### 4. Flexible Invoicing
Generate invoices:
- By phase (structural, finishing, final)
- With actual vs. quoted comparison
- Including approved extras and adjustments
- With payment tracking

### 5. Trade Provider Management
For each trade (plumbing, electrical, etc.):
- Multiple provider options
- Hourly and job-based rates
- Contact information and ratings
- Automatic best-price suggestion

## Data Models

### Project
```typescript
{
  status: 'draft' | 'quoted' | 'active' | 'completed' | 'on-hold'
  currentPhase: 'structural' | 'finishing' | 'final-review' | 'completed'
  rooms: Room[]
  additionalCosts: ProjectAdditionalCost[]
  budget: number
  targetEndDate: string
}
```

### Room
```typescript
{
  type: RoomType
  width: number
  length: number
  squareFeet: number
  materials: RoomMaterial[]
  labor: RoomLabor[]
  demolitionCost?: number
  wasteBinCost?: number
}
```

### Material (Enhanced)
```typescript
{
  materialType: 'building' | 'finishing'
  roomTypes: string[]
  defaultQuantityPerSqFt?: number
  vendorLinks: VendorLink[]
}
```

See [types/index.ts](types/index.ts) for complete type definitions.

## API Endpoints

### Core Endpoints
- `GET /api/clients` - Client management
- `GET /api/projects` - Projects with rooms and phases
- `GET /api/materials` - Materials with vendor links
- `GET /api/labor` - Labor with trade providers
- `GET /api/quotations` - Phase-based quotations
- `GET /api/invoices` - Invoices with adjustments

### New Endpoints
- `GET /api/rooms` - Room templates
- `GET /api/trades` - All trades with provider options
- `GET /api/additional-costs` - Permits, inspections, equipment

## Future Enhancements

- [ ] Real-time vendor API integration
- [ ] Photo attachments for rooms
- [ ] Enhanced iPad/mobile interface
- [ ] Client portal for progress tracking
- [ ] Inventory management
- [ ] Schedule and milestone tracking
- [ ] Subcontractor portal
- [ ] Analytics dashboard
- [ ] Profit margin tracking
- [ ] Material usage trends

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.

---

Built with ❤️ for construction project management

