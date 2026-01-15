# Construction Project Workflow - Visual Diagrams

## Project Lifecycle Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                    CONSTRUCTION PROJECT LIFECYCLE                     │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────┐      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   DRAFT     │─────▶│   QUOTED    │─────▶│   ACTIVE    │─────▶│  COMPLETED  │
│             │      │             │      │             │      │             │
│ • Creating  │      │ • Sent to   │      │ • Work in   │      │ • All work  │
│ • Data      │      │   client    │      │   progress  │      │   done      │
│   entry     │      │ • Pending   │      │ • Tracking  │      │ • Paid      │
└─────────────┘      └─────────────┘      └─────────────┘      └─────────────┘
                            │                     │
                            ▼                     ▼
                     ┌─────────────┐      ┌─────────────┐
                     │  REJECTED   │      │   ON-HOLD   │
                     └─────────────┘      └─────────────┘
```

## Project Phases

```
┌──────────────────────────────────────────────────────────────────────┐
│                         PROJECT PHASES                                │
└──────────────────────────────────────────────────────────────────────┘

 ┌─────────────┐      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
 │ STRUCTURAL  │─────▶│  FINISHING  │─────▶│FINAL REVIEW │─────▶│  COMPLETED  │
 └─────────────┘      └─────────────┘      └─────────────┘      └─────────────┘
       │                    │                     │                     │
       │                    │                     │                     │
       ▼                    ▼                     ▼                     ▼
 • Framing           • Paint              • Quality         • Project
 • Drywall           • Fixtures             checks            closed
 • Plumbing          • Flooring           • Punch list      • Final
 • Electrical        • Trim               • Client            invoice
 • Rough-in          • Baseboards           walkthrough       paid
```

## iPad Consultation Workflow

```
┌──────────────────────────────────────────────────────────────────────┐
│               ON-SITE CONSULTATION (iPad Workflow)                    │
└──────────────────────────────────────────────────────────────────────┘

START
  │
  ▼
┌─────────────────────────┐
│ 1. Create New Project   │
│    • Project name       │
│    • Client info        │
│    • Budget             │
│    • Target date        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ 2. Tour House           │
│    (Room by Room)       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐         ┌──────────────────────────┐
│ 3. Select Room Type     │────────▶│ System Auto-Loads:       │
│    • Bathroom           │         │ • Default materials      │
│    • Kitchen            │         │ • Default labor          │
│    • Living Room        │         │ • Estimated hours        │
│    • etc.               │         └──────────────────────────┘
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐         ┌──────────────────────────┐
│ 4. Enter Dimensions     │────────▶│ System Calculates:       │
│    Width:  12 ft        │         │ • Square feet            │
│    Length: 10 ft        │         │ • Material quantities    │
│    Height:  9 ft        │         │ • Labor hours            │
└────────┬────────────────┘         └──────────────────────────┘
         │
         ▼
┌─────────────────────────┐         ┌──────────────────────────┐
│ 5. Add Demolition?      │────────▶│ If YES:                  │
│    □ Yes  □ No          │         │ • Enter demo cost        │
│                         │         │ • Add waste bin cost     │
└────────┬────────────────┘         └──────────────────────────┘
         │
         ▼
┌─────────────────────────┐         ┌──────────────────────────┐
│ 6. Review Materials     │────────▶│ For each material:       │
│    ☑ Drywall (4 sheets) │         │ • Click to see vendors   │
│    ☑ Tiles (132 sqft)   │         │ • Adjust quantity        │
│    ☑ Paint (3 gallons)  │         │ • Select vendor          │
└────────┬────────────────┘         └──────────────────────────┘
         │
         ▼
┌─────────────────────────┐         ┌──────────────────────────┐
│ 7. Assign Labor         │────────▶│ For each trade:          │
│    ☑ Plumber (40 hrs)   │         │ • Select provider        │
│    ☑ Electrician (30)   │         │ • Adjust hours           │
│    ☑ Painter (25 hrs)   │         │ • View provider rates    │
└────────┬────────────────┘         └──────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│ 8. Add Notes            │
│    (Optional)           │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ 9. More Rooms?          │
│    ◉ Yes  ○ No          │
└────┬────────────┬───────┘
     │            │
    YES           NO
     │            │
     │            ▼
     │   ┌─────────────────────────┐
     │   │ 10. Add Additional      │
     │   │     Costs               │
     │   │     • Permits            │
     │   │     • Inspections        │
     │   │     • Equipment          │
     │   └────────┬────────────────┘
     │            │
     │            ▼
     │   ┌─────────────────────────┐
     │   │ 11. Review & Generate   │
     │   │     Quote               │
     │   │     • Print PDF          │
     │   │     • Email client       │
     │   └────────┬────────────────┘
     │            │
     └────────────▼
                END
```

## Material Selection Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                    MATERIAL SELECTION WORKFLOW                        │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐
│ Click Material          │
│ (e.g., "2x4 Lumber")    │
└────────┬────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Material Details Panel                  │
│                                          │
│  Name: 2x4 Lumber - 8 ft                │
│  Unit: piece                             │
│  Qty:  24  [+] [-]                      │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │    VENDOR PRICE COMPARISON         │ │
│  ├────────────────────────────────────┤ │
│  │ Default Price:      $380           │ │
│  ├────────────────────────────────────┤ │
│  │ ✓ Home Depot       $365  [Select]  │ │◀── Cheapest (Auto-selected)
│  │   Home Hardware    $375  [Select]  │ │
│  │   Canadian Tire    $380  [Select]  │ │
│  └────────────────────────────────────┘ │
│                                          │
│  Selected: Home Depot @ $365            │
│  Total: $8,760                          │
│                                          │
│  [View Product Page] [Add to Quote]     │
└──────────────────────────────────────────┘
```

## Quote to Invoice Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                    QUOTE TO INVOICE WORKFLOW                          │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│  QUOTE CREATED  │
│  Status: draft  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────────┐
│  Review Quote   │─────▶│ • Edit pricing       │
│                 │      │ • Add instructions   │
│                 │      │ • Adjust materials   │
└────────┬────────┘      └──────────────────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────────┐
│  Send to Client │─────▶│ • Generate PDF       │
│  Status: quoted │      │ • Email              │
└────────┬────────┘      │ • Track delivery     │
         │               └──────────────────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────────┐
│ Client Reviews  │─────▶│ Client Options:      │
│                 │      │ ○ Accept             │
│                 │      │ ○ Reject             │
│                 │      │ ○ Request Changes    │
└────────┬────────┘      └──────────────────────┘
         │
         │ ACCEPTED
         ▼
┌─────────────────┐      ┌──────────────────────┐
│ Project Active  │─────▶│ • Signature captured │
│ Status: active  │      │ • Work authorized    │
└────────┬────────┘      │ • Materials ordered  │
         │               └──────────────────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────────┐
│ Work Progress   │─────▶│ Track:               │
│                 │      │ • Material usage     │
│                 │      │ • Labor hours        │
│                 │      │ • Extras/changes     │
└────────┬────────┘      └──────────────────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────────────────────────┐
│Generate Invoice │─────▶│ Invoice Components:                  │
│                 │      │ ┌──────────────────────────────────┐ │
└────────┬────────┘      │ │ QUOTED          ACTUAL           │ │
         │               │ │ Materials:      Materials:       │ │
         │               │ │ $50,000         $52,000          │ │
         │               │ │                                  │ │
         │               │ │ Labor:          Labor:           │ │
         │               │ │ $30,000         $28,500          │ │
         │               │ └──────────────────────────────────┘ │
         │               │                                      │
         │               │ Extras & Adjustments:                │
         │               │ + Unforeseen repair    $5,000        │
         │               │ - Credit (early comp.) -$2,000       │
         │               │                                      │
         │               │ TOTAL DUE: $83,500                   │
         │               └──────────────────────────────────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────────┐
│ Send Invoice    │─────▶│ • Email to client    │
│                 │      │ • Track payment      │
│                 │      │ • Payment reminder   │
└────────┬────────┘      └──────────────────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────────┐
│ Payment         │─────▶│ Payment Options:     │
│                 │      │ ○ Full payment       │
│                 │      │ ○ Partial payment    │
└────────┬────────┘      └──────────────────────┘
         │
         │ PAID IN FULL
         ▼
┌─────────────────┐
│    COMPLETED    │
│  Project closed │
└─────────────────┘
```

## Room Cost Calculation

```
┌──────────────────────────────────────────────────────────────────────┐
│                    ROOM COST CALCULATION                              │
└──────────────────────────────────────────────────────────────────────┘

ROOM: Master Bathroom
Dimensions: 12 ft × 10 ft × 9 ft

┌────────────────────────────────────────┐
│ STEP 1: Calculate Square Footage      │
│ Square Feet = Width × Length          │
│             = 12 × 10                  │
│             = 120 sq ft                │
└────────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│ STEP 2: Calculate Material Quantities │
│                                        │
│ Tiles:                                 │
│   Qty = 120 sqft × 1.1 = 132 sqft     │
│   Cost = 132 × $250 = $33,000         │
│                                        │
│ Drywall:                               │
│   Qty = 120 × 0.03 = 3.6 ≈ 4 sheets   │
│   Cost = 4 × $800 = $3,200            │
│                                        │
│ Paint:                                 │
│   Qty = 120 × 0.01 = 1.2 ≈ 2 gallons  │
│   Cost = 2 × $2,500 = $5,000          │
│                                        │
│ Fixtures (manual entry):               │
│   Faucet: 1 × $8,500 = $8,500         │
│   Toilet: 1 × $12,000 = $12,000       │
└────────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│ STEP 3: Calculate Labor Hours         │
│                                        │
│ Estimated hrs/sqft: 2.5 hours         │
│ Total hours = 120 × 2.5 = 300 hours   │
│                                        │
│ Labor Distribution:                    │
│   Plumber:    40 hrs × $600 = $24,000 │
│   Electrician: 30 hrs × $650 = $19,500│
│   Tile Install: 25 hrs × $450 = $11,250│
│   Painter:     20 hrs × $400 = $8,000 │
└────────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│ STEP 4: Add Additional Costs          │
│                                        │
│ Demolition: $15,000                    │
│ Waste Bin:  $8,000                     │
└────────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│ STEP 5: Calculate Room Total          │
│                                        │
│ Materials:  $61,700                    │
│ Labor:      $62,750                    │
│ Demo:       $15,000                    │
│ Waste:      $8,000                     │
│ ─────────────────────                  │
│ ROOM TOTAL: $147,450                   │
└────────────────────────────────────────┘
```

## Multi-Phase Invoicing

```
┌──────────────────────────────────────────────────────────────────────┐
│                    MULTI-PHASE INVOICING                              │
└──────────────────────────────────────────────────────────────────────┘

                    TOTAL PROJECT: $500,000

                            │
           ┌────────────────┼────────────────┐
           │                │                │
           ▼                ▼                ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │  INVOICE 1  │  │  INVOICE 2  │  │  INVOICE 3  │
    │             │  │             │  │             │
    │ Structural  │  │ Finishing   │  │   Final     │
    │   Phase     │  │   Phase     │  │Adjustments  │
    │             │  │             │  │             │
    │  $250,000   │  │  $220,000   │  │  $30,000    │
    │             │  │             │  │             │
    │ • Framing   │  │ • Paint     │  │ • Extras    │
    │ • Drywall   │  │ • Fixtures  │  │ • Credits   │
    │ • Rough-in  │  │ • Flooring  │  │ • Final     │
    │ • Plumbing  │  │ • Trim      │  │   balance   │
    │ • Electrical│  │ • Cleanup   │  │             │
    │             │  │             │  │             │
    │ Due: Week 4 │  │ Due: Week 8 │  │Due: Week 10 │
    └─────────────┘  └─────────────┘  └─────────────┘
```

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                        DATA FLOW DIAGRAM                              │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│   iPad/Browser  │
│   (Frontend)    │
└────────┬────────┘
         │
         │ API Requests
         ▼
┌─────────────────────────────────────────────────┐
│              Next.js API Routes                 │
├─────────────────────────────────────────────────┤
│ /api/projects        /api/materials             │
│ /api/clients         /api/labor                 │
│ /api/quotations      /api/rooms                 │
│ /api/invoices        /api/trades                │
│                      /api/additional-costs      │
└────────┬────────────────────────────────────────┘
         │
         │ Read/Write
         ▼
┌─────────────────────────────────────────────────┐
│              JSON Data Files                    │
├─────────────────────────────────────────────────┤
│ data/clients.json        data/rooms.json        │
│ data/projects.json       data/trades.json       │
│ data/materials.json      data/additional-       │
│ data/labor.json          costs.json             │
│ data/quotations.json                            │
│ data/invoices.json                              │
└────────┬────────────────────────────────────────┘
         │
         │ Future: Migrate to
         ▼
┌─────────────────────────────────────────────────┐
│         Prisma + PostgreSQL                     │
│         (Production Database)                   │
└─────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
│
├─ Dashboard
│  │
│  ├─ Projects
│  │  ├─ ProjectList
│  │  ├─ ProjectDetail
│  │  └─ ProjectWizard ◄── iPad Optimized
│  │     ├─ ClientInfoStep
│  │     ├─ RoomBuilderStep
│  │     │  ├─ RoomSelector
│  │     │  ├─ DimensionInput
│  │     │  ├─ MaterialSelector ◄── With Vendor Prices
│  │     │  └─ LaborSelector ◄── With Providers
│  │     ├─ AdditionalCostsStep
│  │     └─ ReviewStep
│  │
│  ├─ Materials
│  │  ├─ MaterialList
│  │  ├─ MaterialDetail
│  │  ├─ VendorPriceGrid
│  │  └─ MaterialEditor
│  │
│  ├─ Quotes
│  │  ├─ QuoteList
│  │  ├─ QuoteBuilder
│  │  ├─ QuotePreview
│  │  └─ QuotePDF
│  │
│  ├─ Invoices
│  │  ├─ InvoiceList
│  │  ├─ InvoiceBuilder
│  │  ├─ ActualVsQuoted
│  │  ├─ AdjustmentEntry
│  │  └─ InvoicePDF
│  │
│  └─ Settings
│     ├─ TradeProviders
│     ├─ AdditionalCosts
│     └─ CompanySettings
│
└─ Components (Shared)
   ├─ RoomCard
   ├─ MaterialCard
   ├─ CostCalculator
   ├─ VendorComparison
   ├─ ProviderSelector
   └─ PhaseIndicator
```
