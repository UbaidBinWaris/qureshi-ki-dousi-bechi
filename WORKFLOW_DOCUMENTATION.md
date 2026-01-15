# Construction Project Lifecycle Management System

## Overview
This system implements an automated tool for managing the complete lifecycle of a construction project, from initial quote to final invoice, following a structured workflow designed for iPad-based on-site consultations.

## System Architecture

### Database Structure

#### 1. Room Templates (`data/rooms.json`)
Defines default templates for different room types with associated materials and labor.
- **Room Types**: bathroom, kitchen, powder-room, living-room, bedroom, dining-room, basement, garage, laundry-room, hallway, office, other
- **Properties**:
  - Default materials list
  - Default labor requirements
  - Estimated hours per square foot

#### 2. Materials (`data/materials.json`)
Enhanced material database with vendor integration and room-specific defaults.
- **Material Types**:
  - **Building Materials**: Structural components (cement, drywall, lumber, etc.)
  - **Finishing Materials**: Paint, tiles, fixtures, baseboards, etc.
- **Key Features**:
  - Room type associations
  - Default quantity per square foot
  - Vendor links with pricing (Home Depot, Home Hardware, Canadian Tire)
  - Automatic vendor price comparison
  - Editable default prices

#### 3. Labor/Trades (`data/labor.json` & `data/trades.json`)
Comprehensive trade management with multiple provider options.
- **Trades**: Plumbing, Electrical, Carpentry, Painting, Masonry, Flooring
- **Provider Information**:
  - Multiple providers per trade
  - Hourly and job-based rates
  - Contact information
  - Rating system
  - Automatic selection of best-priced provider

#### 4. Additional Costs (`data/additional-costs.json`)
System-wide cost templates for permits, inspections, and equipment.
- **Categories**: permit, inspection, waste, equipment, other
- **Examples**:
  - Building permits
  - City inspection fees
  - Waste bin rental
  - Equipment rental
- All costs are editable with default values

### Project Workflow

#### Phase 1: Structural Phase (Initial Consultation)

**Scenario**: Owner meets client on-site with iPad

1. **Project Initialization**
   ```typescript
   {
     status: 'draft',
     currentPhase: 'structural',
     rooms: [],
     additionalCosts: []
   }
   ```

2. **CRM Data Entry**
   - Client name, address, email, phone
   - Target end date
   - Budget constraints

3. **Room-by-Room Tour**
   For each room:
   - Select room type (triggers default template loading)
   - Enter dimensions (width × length)
   - Calculate square footage automatically
   - Enter demolition costs (based on volume)
   - Add waste bin cost (from additional costs database)
   
4. **Material Selection**
   - System presents room-specific materials
   - Owner selects required materials
   - Quantities auto-calculated based on sq ft
   - Prices pulled from vendor database (defaults to cheapest)
   - Manual adjustments allowed

5. **Labor Assignment**
   - Default labor for room type presented
   - Hours estimated based on square footage
   - Provider selection (auto-suggests best-priced)
   - Manual hour adjustments

#### Phase 2: Finishing Phase

**Scenario**: Client design input for finishing materials

1. **Finishing Materials Selection**
   - Paint colors
   - Flooring types
   - Trim and baseboards
   - Fixtures (faucets, toilets, sinks)
   - Cabinet hardware
   - Light fixtures

2. **Material Customization**
   - Client preferences
   - Upgrade options
   - Alternative vendor selection

#### Phase 3: Quote Finalization

1. **Review and Adjustment**
   ```typescript
   {
     phase: 'structural' | 'finishing' | 'full',
     rooms: Room[],
     additionalCosts: ProjectAdditionalCost[],
     items: QuotationItem[],
     subtotal: number,
     taxRate: number,
     discount: number,
     total: number
   }
   ```

2. **Fine-Tuning**
   - Pricing adjustments
   - Special instructions
   - Add/remove materials
   - Modify quantities

3. **Quote Delivery**
   - Print PDF
   - Email to client
   - Electronic signature integration
   - Acceptance tracking

#### Phase 4: Post-Acceptance Workflow

1. **Project Activation**
   When quote is approved:
   ```typescript
   {
     status: 'active',
     currentPhase: 'structural' | 'finishing'
   }
   ```

2. **Progress Tracking**
   - Validate actual material usage vs. quoted
   - Track actual labor hours vs. estimated
   - Add extras and adjustments
   ```typescript
   {
     actualMaterialUsage: RoomMaterial[],
     actualLaborHours: RoomLabor[],
     extrasAndAdjustments: InvoiceAdjustment[]
   }
   ```

3. **Invoice Generation**
   - Phase-based invoicing (structural, finishing, final)
   - Automatic calculation including extras
   - Track payment status
   - Electronic delivery

### Key Features Implementation

#### 1. Price Control System

**Vendor Integration**:
```typescript
interface VendorLink {
  vendorName: string
  url: string
  lastPrice?: number
  lastUpdated?: string
}
```

**Usage**:
- Clicking material name shows price grid
- Displays default price and all vendor prices
- System defaults to cheapest vendor
- Manual vendor selection available
- URLs link directly to vendor product pages

#### 2. Automatic Calculations

**Room Calculations**:
```typescript
squareFeet = width × length
estimatedMaterialQty = squareFeet × defaultQuantityPerSqFt
estimatedLaborHours = squareFeet × estimatedHoursPerSqFt
```

**Cost Calculations**:
```typescript
materialAmount = quantity × rate
laborAmount = hours × hourlyRate
roomTotal = sum(materials) + sum(labor) + demolitionCost + wasteBinCost
projectTotal = sum(rooms) + sum(additionalCosts)
```

#### 3. Status Tracking

**Project Statuses**:
- `draft`: Initial creation, data entry phase
- `quoted`: Quote generated and sent to client
- `active`: Quote approved, work in progress
- `completed`: All work finished, final invoice paid
- `on-hold`: Temporarily paused

**Project Phases**:
- `structural`: Framing, drywall, structural work
- `finishing`: Paint, fixtures, final touches
- `final-review`: Quality check, punch list
- `completed`: Project closed

#### 4. Multi-Phase Invoicing

Projects can be invoiced in phases:
```typescript
{
  phase: 'structural',  // First invoice for structural work
  phase: 'finishing',   // Second invoice for finishing work
  phase: 'final'        // Final invoice with adjustments
}
```

### API Endpoints

#### New Endpoints Created:
- `GET /api/rooms` - Fetch room templates
- `GET /api/trades` - Fetch all trades with providers
- `GET /api/additional-costs` - Fetch additional cost templates

#### Existing Endpoints (Enhanced):
- `/api/projects` - Now includes room details and phases
- `/api/materials` - Enhanced with vendor links and room associations
- `/api/quotations` - Now includes phase and room details
- `/api/invoices` - Enhanced with adjustment tracking

### Data Models

See `types/index.ts` for complete TypeScript interfaces:
- `Room` - Individual room with materials and labor
- `RoomTemplate` - Default room configurations
- `Material` - Enhanced with vendor links
- `Labor` - Enhanced with trade providers
- `Trade` - Trade categories with multiple providers
- `AdditionalCost` - Permit, inspection, equipment costs
- `Project` - Enhanced with phases and room details
- `Quotation` - Phase-based quoting
- `Invoice` - Enhanced with actual usage tracking

## UI/Dashboard Implementation

### Recommended Dashboard Pages

#### 1. Project Creation Wizard (for iPad)
- Step 1: Client information
- Step 2: Project details (budget, timeline)
- Step 3: Room-by-room walkthrough
  - Room selection
  - Dimension entry
  - Material selection
  - Labor assignment
- Step 4: Additional costs
- Step 5: Review and quote generation

#### 2. Material Management
- View all materials
- Edit default prices
- Manage vendor links
- Update market prices
- Filter by material type (building/finishing)
- Filter by room type

#### 3. Trade/Provider Management
- View all trades
- Manage providers per trade
- Update rates and contact info
- Provider ratings

#### 4. Quote Builder
- Select project
- Choose phase (structural/finishing/full)
- Review room details
- Add special instructions
- Adjust pricing
- Generate PDF
- Send for approval

#### 5. Invoice Generator
- Select project
- Compare quoted vs. actual
- Add extras and adjustments
- Generate invoice by phase
- Track payments

## Next Steps for Implementation

### Frontend Components Needed:

1. **Room Builder Component**
   - Room type selector
   - Dimension inputs
   - Material selector with quantities
   - Labor selector with hours
   - Cost calculator

2. **Material Selector Component**
   - Filterable material list
   - Vendor price comparison grid
   - Quantity input
   - Auto-calculation display

3. **Quote Review Component**
   - Room-by-room breakdown
   - Editable line items
   - Special instructions field
   - PDF preview

4. **Invoice Builder Component**
   - Quoted vs. actual comparison
   - Adjustment entry
   - Payment tracking

### Database Migration Notes:
- All data files have been updated with new structure
- Existing projects maintained backward compatibility
- New fields have defaults or are optional

## Testing Workflow

1. Create new project in 'draft' status
2. Add rooms with materials and labor
3. Generate quote (status → 'quoted')
4. Accept quote (status → 'active')
5. Track actual usage during construction
6. Generate invoice with adjustments
7. Track payments
8. Complete project

## Business Rules

1. **Vendor Selection**: System defaults to lowest price unless manually overridden
2. **Material Quantities**: Auto-calculated but always editable
3. **Labor Hours**: Estimated based on room size but adjustable
4. **Additional Costs**: Added at project level, not room level
5. **Phase Progression**: Projects must complete structural before finishing
6. **Invoice Timing**: Can be generated per phase or at completion
7. **Price Updates**: Manual price updates tracked with timestamps

## Future Enhancements

1. **Vendor API Integration**: Real-time price fetching from vendor websites
2. **Photo Attachments**: Add room photos during consultation
3. **Mobile Optimization**: Enhanced iPad interface
4. **Client Portal**: Allow clients to view progress and invoices
5. **Inventory Management**: Track material stock
6. **Schedule Management**: Timeline and milestone tracking
7. **Subcontractor Portal**: Provider time and material tracking
8. **Analytics Dashboard**: Profit margins, material usage trends
