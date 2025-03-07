import { SourceDocument } from '../types';

// Sample document content for development purposes
export const mockDocuments: SourceDocument[] = [
  {
    id: 'doc-1',
    title: 'Kitchen Specifications.pdf',
    pages: [
      {
        content: `# Kitchen Specifications

## General Requirements
The kitchen shall be designed and constructed according to the following specifications:

1. All cabinetry shall be constructed using high-quality plywood with a minimum thickness of 18mm.
2. All visible edges shall be finished with 2mm ABS edging.
3. Drawer boxes shall be constructed using 16mm solid timber with dovetail joints.
4. All hardware shall be Blum or equivalent quality.

## Dimensions
- Overall kitchen width: 3600mm
- Overall kitchen depth: 650mm
- Island dimensions: 2400mm x 1200mm
- Ceiling height: 2700mm
- Upper cabinet height: 900mm
- Space between upper cabinets and countertop: 600mm

## Materials
- Countertop: 20mm Quartz (Caesarstone Snow or equivalent)
- Cabinet doors: 2-pack polyurethane, matte finish
- Cabinet color: Dulux Natural White
- Handles: Brushed nickel, 128mm centers
- Splashback: 6mm toughened glass, back-painted in Dulux Silver Pearl

## Appliances
- Refrigerator: Fisher & Paykel RF610ADX5 or equivalent
- Oven: Miele H 7260 BP or equivalent
- Cooktop: Miele KM 7564 FL or equivalent
- Rangehood: Miele DA 3466 or equivalent
- Dishwasher: Miele G 7369 SCVi XXL or equivalent`,
        highlights: [
          {
            findingId: 'finding-1',
            rect: [100, 450, 400, 470]
          },
          {
            findingId: 'finding-2',
            rect: [100, 470, 400, 490]
          },
          {
            findingId: 'finding-3',
            rect: [100, 600, 400, 620]
          }
        ]
      },
      {
        content: `## Plumbing Fixtures
- Main sink: Franke Kubus KBX 110-55, stainless steel
- Prep sink: Oliveri Sonetto SN1063, stainless steel
- Main faucet: Grohe Minta, pull-out spray, chrome
- Filtered water tap: Zip HydroTap Classic, brushed chrome

## Electrical Requirements
- Power outlets: 10 double GPOs total
- Lighting: LED strip lighting under upper cabinets
- Pendant lights over island: 3 x Beacon Lighting Lunar pendants
- All power outlets to be positioned 150mm above countertop unless otherwise specified
- Dedicated circuits for refrigerator, oven, cooktop, and dishwasher

## Special Requirements
1. Island to include a breakfast bar with seating for 4 people
2. Pull-out waste bin system with recycling compartment
3. Corner cabinets to include Hafele corner optimizer systems
4. Pantry to include 4 pull-out drawers and adjustable shelving
5. Soft-close mechanisms on all doors and drawers

## Installation Notes
- Flooring to be installed prior to cabinetry installation
- Allowance for dishwasher and refrigerator spaces to include service gaps
- Rangehood to be vented externally through roof cavity
- Waterproofing required behind sink areas
- Toe kicks to be set back 50mm from cabinet faces`,
        highlights: [
          {
            findingId: 'finding-4',
            rect: [100, 150, 400, 170]
          },
          {
            findingId: 'finding-5',
            rect: [100, 250, 400, 270]
          },
          {
            findingId: 'finding-6',
            rect: [100, 450, 400, 470]
          }
        ]
      }
    ]
  },
  {
    id: 'doc-2',
    title: 'Electrical Layout.pdf',
    pages: [
      {
        content: `# Electrical Layout Specifications

## General Requirements
All electrical work shall comply with AS/NZS 3000:2018 Wiring Rules and local building codes.

## Power Outlets
- Kitchen area: 8 double GPOs
  - 2 above countertop on west wall
  - 2 above countertop on north wall
  - 2 above countertop on east wall
  - 2 in island bench (pop-up style)
- Pantry: 1 double GPO
- Refrigerator: 1 dedicated double GPO

## Lighting
- Ceiling: 6 x LED downlights, dimmable
- Under-cabinet: LED strip lighting on all upper cabinets
- Island pendants: 3 x pendant lights with separate switch
- Pantry: 1 x LED panel light with door switch

## Appliance Connections
- Oven: Dedicated 20A circuit
- Cooktop: Dedicated 32A circuit
- Rangehood: Connection above ceiling height
- Dishwasher: Dedicated circuit with isolating switch
- Refrigerator: Dedicated circuit

## Switching
- Main lighting: 3-way switching at both kitchen entrances
- Under-cabinet lighting: Switch at main entrance
- Pendant lighting: Dimmer switch at main entrance`,
        highlights: [
          {
            findingId: 'finding-7',
            rect: [100, 150, 400, 170]
          }
        ]
      }
    ]
  }
];
