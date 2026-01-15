# Construction Project Quick Reference Guide

## Project Status Flow

```
draft → quoted → active → completed
         ↓         ↓
      rejected  on-hold
```

## Project Phases

```
structural → finishing → final-review → completed
```

## Room Types Available

- bathroom
- kitchen
- powder-room
- living-room
- bedroom
- dining-room
- basement
- garage
- laundry-room
- hallway
- office
- other

## Material Categories

### Building Materials (Structural Phase)
- Cement
- Steel Rebar
- Bricks
- Sand & Gravel
- Drywall
- Screws & Hardware
- 2x4 Lumber
- Wood Planks

### Finishing Materials (Finishing Phase)
- Paint
- Tiles
- Baseboards
- Bathroom Faucets
- Toilets
- Kitchen Faucets
- Kitchen Sinks

## Trades & Categories

### Essential Trades
- Plumbing
- Electrical

### Construction Trades
- Carpentry
- Masonry

### Finishing Trades
- Painting
- Flooring

## Additional Costs

### Permits
- City Building Permit ($15,000)
- Electrical Permit ($5,000)
- Plumbing Permit ($4,000)

### Inspections
- City Inspection Fee ($3,000)
- Electrical Inspection ($2,000)
- Plumbing Inspection ($2,000)

### Waste & Equipment
- Waste Bin Rental ($8,000)
- Equipment Rental ($10,000)
- Disposal Fee ($3,000)
- Site Cleanup ($5,000)

## Typical Project Workflow

### 1. Initial Consultation (iPad)
- [ ] Create new project
- [ ] Enter client CRM info
- [ ] Set target end date and budget
- [ ] Status: `draft`

### 2. Structural Phase Tour
For each room:
- [ ] Select room type
- [ ] Enter dimensions (width × length)
- [ ] Add demolition cost if needed
- [ ] Select materials (auto-suggested)
- [ ] Assign labor (auto-calculated hours)
- [ ] Phase: `structural`

### 3. Finishing Phase
- [ ] Client selects finishing materials
- [ ] Choose paint colors
- [ ] Select fixtures and hardware
- [ ] Choose flooring
- [ ] Phase: `finishing`

### 4. Quote Finalization
- [ ] Review all rooms
- [ ] Adjust pricing
- [ ] Add special instructions
- [ ] Add additional costs
- [ ] Generate PDF
- [ ] Send to client
- [ ] Status: `quoted`

### 5. Quote Acceptance
- [ ] Client reviews quote
- [ ] Electronic signature (optional)
- [ ] Status: `active`

### 6. Project Execution
- [ ] Track actual material usage
- [ ] Log actual labor hours
- [ ] Document extras/changes
- [ ] Status: `active`

### 7. Invoice Generation
- [ ] Compare quoted vs. actual
- [ ] Add approved adjustments
- [ ] Generate invoice (by phase or full)
- [ ] Send to client
- [ ] Track payment

### 8. Project Completion
- [ ] All invoices paid
- [ ] Final walkthrough
- [ ] Status: `completed`

## Calculation Formulas

### Room Calculations
```
Square Feet = Width × Length

Material Quantity = Square Feet × Default Qty/SqFt

Labor Hours = Square Feet × Estimated Hours/SqFt

Room Cost = Σ(Materials) + Σ(Labor) + Demolition + Waste Bin
```

### Project Calculations
```
Subtotal = Σ(All Rooms) + Σ(Additional Costs)

Tax Amount = Subtotal × Tax Rate

Total = Subtotal + Tax Amount - Discount
```

### Invoice Adjustments
```
Invoice Total = Quoted Total + Approved Extras - Credits + Adjustments
```

## API Quick Reference

### Fetch Data
```
GET /api/projects       - All projects
GET /api/clients        - All clients
GET /api/materials      - All materials
GET /api/labor          - All labor types
GET /api/rooms          - Room templates
GET /api/trades         - All trades with providers
GET /api/additional-costs - Additional cost templates
GET /api/quotations     - All quotations
GET /api/invoices       - All invoices
```

## Data File Locations

```
data/
  ├── clients.json           - Client information
  ├── projects.json          - Projects with rooms & phases
  ├── materials.json         - Materials with vendor links
  ├── labor.json             - Labor types with providers
  ├── rooms.json             - Room templates
  ├── trades.json            - Trades with multiple providers
  ├── additional-costs.json  - Permits, inspections, etc.
  ├── quotations.json        - Generated quotes
  └── invoices.json          - Generated invoices
```

## Vendor Integration

### Supported Vendors
- Home Depot
- Home Hardware
- Canadian Tire

### Price Comparison
When clicking on a material (e.g., "2x4"):
```
Default Price: $380
─────────────────────────
Home Depot:    $365 ← Cheapest (auto-selected)
Home Hardware: $375
Canadian Tire: $380
```

## Tips for Using the System

1. **Always start in draft status** - Complete data entry before generating quote
2. **Use room templates** - They provide good starting defaults
3. **Review vendor prices** - System auto-selects cheapest but you can override
4. **Add detailed notes** - Helps during quote review and execution
5. **Track actual usage** - Makes invoicing accurate and transparent
6. **Use phase invoicing** - Helps with cash flow for large projects
7. **Document all extras** - Ensure client approval before adding to invoice

## Common Workflows

### Quick Bathroom Renovation Quote
1. Create project (draft)
2. Add "Master Bathroom" room
3. Enter dimensions: 10 × 8 = 80 sq ft
4. System suggests: tiles, drywall, screws, faucet, toilet
5. System assigns: plumber, electrician (with estimated hours)
6. Add waste bin cost
7. Review and send quote

### Multi-Room Finishing Phase
1. Open active project (structural phase complete)
2. Change phase to "finishing"
3. For each room, add:
   - Paint (color selection)
   - Baseboards
   - Flooring (if applicable)
   - Light fixtures
4. Assign painters, floor installers
5. Generate finishing phase quote

### Invoice with Extras
1. Open active project
2. Generate invoice
3. Compare quoted vs. actual
4. Add extra items:
   - "Unforeseen plumbing repair - $5,000 (approved 2026-01-10)"
5. Adjust totals
6. Send invoice

## Keyboard Shortcuts (Future Enhancement)
- `Ctrl+N` - New Project
- `Ctrl+R` - Add Room
- `Ctrl+Q` - Generate Quote
- `Ctrl+I` - Generate Invoice
- `Ctrl+S` - Save Progress

## Mobile/iPad Optimizations
- Large touch targets for room selection
- Swipe between rooms
- Quick add materials button
- Voice-to-text for notes
- Photo capture for room documentation
- Offline mode with sync
