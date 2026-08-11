-- Destinations: data tujuan liburan
CREATE TABLE IF NOT EXISTS destinations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  province TEXT NOT NULL DEFAULT '',
  travel_time TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  hours TEXT NOT NULL DEFAULT '',
  maps_url TEXT NOT NULL DEFAULT '',
  pricing TEXT NOT NULL DEFAULT '[]',
  facilities TEXT NOT NULL DEFAULT '[]',
  views TEXT NOT NULL DEFAULT '[]',
  notes TEXT NOT NULL DEFAULT '[]',
  example_calculation TEXT NOT NULL DEFAULT '',
  availability_note TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  media TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Packing list: barang yang harus dibawa
CREATE TABLE IF NOT EXISTS packing_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_barang TEXT NOT NULL,
  sumber TEXT NOT NULL CHECK (sumber IN ('sudah_punya', 'sewa', 'beli')),
  sudah_ada INTEGER NOT NULL DEFAULT 0 CHECK (sudah_ada IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
