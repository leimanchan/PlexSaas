# Database Structure - Paper Inventory System

## Tables
1. raw_materials (existing)
   - Base table for materials like paper types

2. stock_sizes
   - Stores standard paper sizes (23x35, 25x38, etc.)
   - Fields: id, name, width, height, created_at

3. packaging_units
   - How materials are sold (Single Sheet, Ream, Case)
   - Fields: id, name, quantity, created_at

4. material_variants
   - Links materials with sizes and packaging
   - Stores pricing information
   - Fields: id, material_id, stock_size_id, packaging_unit_id, supplier_sku, unit_cost, min_order_quantity, created_at

## SQL Commands Used

### Create Tables

sql
-- Create stock_sizes table
CREATE TABLE stock_sizes (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name TEXT NOT NULL,
width DECIMAL(10,2) NOT NULL,
height DECIMAL(10,2) NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Create packaging_units table
CREATE TABLE packaging_units (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name TEXT NOT NULL,
quantity INTEGER NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Create material_variants table
CREATE TABLE material_variants (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
material_id UUID REFERENCES raw_materials(id),
stock_size_id UUID REFERENCES stock_sizes(id),
packaging_unit_id UUID REFERENCES packaging_units(id),
supplier_sku TEXT,
unit_cost DECIMAL(10,2) NOT NULL,
min_order_quantity INTEGER DEFAULT 1,
created_at TIMESTAMPTZ DEFAULT NOW()
);
Data
sql
-- Insert stock sizes
INSERT INTO stock_sizes (name, width, height) VALUES
('23x35', 23, 35),
('25x38', 25, 38),
('26x40', 26, 40),
('28x40', 28, 40),
('23x29', 23, 29);
-- Insert packaging units
INSERT INTO packaging_units (name, quantity) VALUES
('Single Sheet', 1),
('Half Ream', 250),
('Ream', 500),
('Case', 2000),
('Carton', 5000);
-- Insert material variants
INSERT INTO material_variants (
material_id,
stock_size_id,
packaging_unit_id,
supplier_sku,
unit_cost
)
SELECT
rm.id,
ss.id,
pu.id,
CONCAT('SKU-', UPPER(REPLACE(rm.name, ' ', '-')), '-', ss.name, '-', UPPER(REPLACE(pu.name, ' ', '-'))),
CASE
WHEN rm.name = 'Satin' AND pu.name = 'Ream' THEN 175.00
WHEN rm.name = 'Satin' AND pu.name = 'Case' THEN 650.00
WHEN rm.name = 'Satin AQ' AND pu.name = 'Ream' THEN 225.00
WHEN rm.name = 'Satin AQ' AND pu.name = 'Case' THEN 850.00
WHEN rm.name = 'Uncoated Textured' AND pu.name = 'Ream' THEN 200.00
WHEN rm.name = 'Uncoated Textured' AND pu.name = 'Case' THEN 750.00
WHEN rm.name = 'Uncoated' AND pu.name = 'Ream' THEN 150.00
WHEN rm.name = 'Uncoated' AND pu.name = 'Case' THEN 550.00
END
FROM raw_materials rm
CROSS JOIN stock_sizes ss
CROSS JOIN packaging_units pu
WHERE rm.type = 'paper'
AND ss.name IN ('23x35', '25x38', '26x40')
AND pu.name IN ('Ream', 'Case');
Data
sql
SELECT
rm.name as material_name,
ss.name as stock_size,
CONCAT(ss.width, 'x', ss.height) as dimensions,
pu.name as packaging_unit,
pu.quantity as sheets_per_unit,
mv.supplier_sku,
mv.unit_cost as package_cost,
(mv.unit_cost / pu.quantity)::DECIMAL(10,4) as cost_per_sheet
FROM material_variants mv
JOIN raw_materials rm ON mv.material_id = rm.id
JOIN stock_sizes ss ON mv.stock_size_id = ss.id
JOIN packaging_units pu ON mv.packaging_unit_id = pu.id
ORDER BY
rm.name,
ss.name,
pu.quantity;

## Next Steps
- [ ] Add more pricing tiers
- [ ] Add supplier information
- [ ] Create API endpoints