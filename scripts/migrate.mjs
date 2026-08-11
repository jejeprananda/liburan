import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@libsql/client";

function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      if (key && rest.length) {
        process.env[key] = rest.join("=");
      }
    }
  } catch {
    // .env.local optional when vars already exported
  }
}

loadEnv();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
  process.exit(1);
}

const db = createClient({ url, authToken });

const highlandCampMedia = [
  { type: "video", src: "/image/HighlandCamp/Highland1.mp4", alt: "Highland Camp video 1" },
  { type: "video", src: "/image/HighlandCamp/Highland2.mp4", alt: "Highland Camp video 2" },
  ...Array.from({ length: 11 }, (_, i) => ({
    type: "image",
    src: `/image/HighlandCamp/Highland%5B${i + 1}%5D.jpeg`,
    alt: `Highland Camp foto ${i + 1}`,
  })),
];

const bukitGajahMedia = [
  { type: "video", src: "/image/BukitGajah/BukitGajah1.mp4", alt: "Bukit Gajah video 1" },
  { type: "video", src: "/image/BukitGajah/BukitGajah2.mp4", alt: "Bukit Gajah video 2" },
  { type: "image", src: "/image/BukitGajah/bukitGajah1.jpeg", alt: "Bukit Gajah foto 1" },
  { type: "image", src: "/image/BukitGajah/bukitGajah2.jpeg", alt: "Bukit Gajah foto 2" },
  { type: "image", src: "/image/BukitGajah/bukitGajah3.jpeg", alt: "Bukit Gajah foto 3" },
  { type: "image", src: "/image/BukitGajah/bukitGajah4.jpeg", alt: "Bukit Gajah foto 4" },
];

const seedDestinations = [
  {
    id: "highland-camp",
    name: "Highland Camp",
    tagline: "Gathering, camping & outbound",
    address:
      "Jl. Situhiang, Megamendung, Kec. Megamendung, Kabupaten Bogor, Jawa Barat 16770",
    province: "Jawa Barat",
    travel_time: "1 j 28 mnt",
    phone: "0811-140-996",
    hours: "Buka · Tutup pukul 17.00",
    maps_url:
      "https://www.google.com/maps/place/HIGHLAND+CAMP+-+for+gathering,+camping+and+outbound/@-6.6509797,106.9453656,17z/data=!3m1!4b1!4m9!3m8!1s0x2e69b7e3b30c0319:0xf5197c9a4dff9b0a!5m2!4m1!1i2!8m2!3d-6.6509797!4d106.9453656!16s%2Fg%2F11gz9vd1n?entry=ttu",
    pricing: [
      {
        label: "HTM Campervan",
        value: "Rp 69.500/orang/malam",
        note: "Gratis anak di bawah 3 tahun",
      },
      {
        label: "Parkir Campervan",
        value: "Rp 35.000/unit/malam",
      },
    ],
    facilities: [
      "Listrik",
      "Peminjaman electrical set (colokan & standing lamp)",
      "Area parkir",
    ],
    views: [],
    notes: [],
    example_calculation: "",
    availability_note: "",
    cover_image: "/image/HighlandCamp/Highland%5B1%5D.jpeg",
    media: highlandCampMedia,
  },
  {
    id: "bukit-gajah-cijeruk",
    name: "Bukit Gajah Cijeruk",
    tagline: "Camping dengan view Gunung Salak & city light Bogor",
    address: "Cijeruk, Kabupaten Bogor, Jawa Barat",
    province: "Jawa Barat",
    travel_time: "",
    phone: "0877-2064-2997",
    hours: "Batas jam malam sampai pukul 22.00",
    maps_url:
      "https://www.google.com/maps/search/Bukit+Gajah+Cijeruk+Bogor/@-6.715,106.785,15z",
    pricing: [
      {
        label: "Tiket Masuk Orang",
        value: "Rp 12.500/orang",
        note: "Anak di bawah 5 tahun gratis",
      },
      {
        label: "Tiket Masuk Motor",
        value: "Rp 5.000/motor",
      },
      {
        label: "Tiket Masuk Mobil",
        value: "Rp 10.000/mobil",
      },
      {
        label: "Sewa Lahan Tenda",
        value: "Rp 85.000/tenda/malam",
        note: "Tenda bawa sendiri",
      },
      {
        label: "Pasang Shelter Dome",
        value: "Rp 50.000/Shelter Dome/malam",
        note: "Bila mendirikan terpisah dari tenda",
      },
    ],
    facilities: [
      "9 kamar mandi (di 1 titik/lokasi)",
      "4 wastafel cuci piring",
      "2 warung",
      "1 mushola",
    ],
    views: [
      "Gunung Salak",
      "Gunung Gede Pangrango",
      "City light kota Bogor",
    ],
    notes: [
      "Listrik tersedia GRATIS. Disarankan bawa kabel sendiri sekitar 15–20 m (hanya ada 10 titik).",
      "Dari lokasi bisa pesan GoFood dan GoMart.",
      "Semua provider sinyal dapat.",
      "Batas jam malam sampai pukul 22.00. Lewat jam 22.00 dilarang ada aktivitas karaoke, musik, atau pengeras suara demi kenyamanan pengunjung lain.",
    ],
    example_calculation:
      "1 tenda Rp 85.000/malam (tenda sendiri)\n4 orang × Rp 12.500 = Rp 50.000\n1 mobil Rp 10.000\nTotal = Rp 145.000/malam\n\nUntuk 2 malam: cukup tambah sewa lahan 1 tenda Rp 85.000.\nOrang dan mobil dihitung 1× masuk saja.",
    availability_note:
      "Untuk Sabtu ini masih aman. Hanya sekitar 1/2 lokasi area yang menghadap Gunung Salak sudah dibooking komunitas mobil (35 mobil/tenda). Sisa area tengah dan citylight masih aman.",
    cover_image: "/image/BukitGajah/bukitGajah1.jpeg",
    media: bukitGajahMedia,
  },
];

async function migrate() {
  console.log("Creating tables...");

  await db.batch([
    {
      sql: `CREATE TABLE IF NOT EXISTS destinations (
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
      )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS packing_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama_barang TEXT NOT NULL,
        sumber TEXT NOT NULL CHECK (sumber IN ('sudah_punya', 'sewa', 'beli')),
        sudah_ada INTEGER NOT NULL DEFAULT 0 CHECK (sudah_ada IN (0, 1)),
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
      args: [],
    },
  ]);

  const alterColumns = [
    "ALTER TABLE destinations ADD COLUMN views TEXT NOT NULL DEFAULT '[]'",
    "ALTER TABLE destinations ADD COLUMN notes TEXT NOT NULL DEFAULT '[]'",
    "ALTER TABLE destinations ADD COLUMN example_calculation TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE destinations ADD COLUMN availability_note TEXT NOT NULL DEFAULT ''",
  ];

  for (const sql of alterColumns) {
    try {
      await db.execute(sql);
    } catch {
      // Column already exists
    }
  }

  console.log("Seeding destinations...");

  for (const destination of seedDestinations) {
    await db.execute({
      sql: `INSERT INTO destinations (
        id, name, tagline, address, province, travel_time, phone, hours,
        maps_url, pricing, facilities, views, notes, example_calculation,
        availability_note, cover_image, media
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        tagline = excluded.tagline,
        address = excluded.address,
        province = excluded.province,
        travel_time = excluded.travel_time,
        phone = excluded.phone,
        hours = excluded.hours,
        maps_url = excluded.maps_url,
        pricing = excluded.pricing,
        facilities = excluded.facilities,
        views = excluded.views,
        notes = excluded.notes,
        example_calculation = excluded.example_calculation,
        availability_note = excluded.availability_note,
        cover_image = excluded.cover_image,
        media = excluded.media,
        updated_at = datetime('now')`,
      args: [
        destination.id,
        destination.name,
        destination.tagline,
        destination.address,
        destination.province,
        destination.travel_time,
        destination.phone,
        destination.hours,
        destination.maps_url,
        JSON.stringify(destination.pricing),
        JSON.stringify(destination.facilities),
        JSON.stringify(destination.views),
        JSON.stringify(destination.notes),
        destination.example_calculation,
        destination.availability_note,
        destination.cover_image,
        JSON.stringify(destination.media),
      ],
    });
  }

  const destinations = await db.execute("SELECT id, name FROM destinations");
  const packing = await db.execute("SELECT COUNT(*) as count FROM packing_items");

  console.log("Migration complete.");
  console.log("Destinations:", destinations.rows);
  console.log("Packing items:", packing.rows[0]);
}

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
