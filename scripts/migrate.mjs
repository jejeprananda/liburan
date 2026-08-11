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

const kolegaCampingFiles = [
  "285b0f8d-5711-4652-814b-8715979a613b.jpeg",
  "6c730131-a2bc-4760-85ee-5c556edb2ddb.jpeg",
  "ada4eda0-0267-42b7-9d50-22b1ea6a6f2b.jpeg",
  "9e04fa8f-a28d-4b21-b921-133baee47ad3.jpeg",
  "604ba757-e652-4e01-b90b-21f8d7ba7593.jpeg",
  "85c1cd92-86d5-4f7e-80bb-3630c083f624.jpeg",
  "402cbd19-cbd2-4e4c-90cf-a0bb75197b2f.jpeg",
  "3b7bac2b-f35a-47a2-88a4-900c2083cc1d.jpeg",
  "c641b9d7-413b-4ad3-940c-10cc5c2a1dd5.jpeg",
  "5eb86ff9-edf9-4351-9df5-d32677c30b6e.jpeg",
  "12ae914b-1414-48cd-8487-092426168193.jpeg",
  "541961b6-e544-46ac-9682-fd378651ef29.jpeg",
];

const kolegaCampingMedia = kolegaCampingFiles.map((file, index) => ({
  type: "image",
  src: `/image/kolegaCamping/${file}`,
  alt: `Kolega Prioritas foto ${index + 1}`,
}));

const cibuluhMediaFiles = [
  "cibuluh1.jpeg",
  "cibuluh2.jpeg",
  "cibuluh3.webp",
  "cibuluh4.jpg",
  "cibuluh5.jpeg",
  "cibuluh6.jpg",
  "cibuluh7.jpg",
  "cibuluh8.jpeg",
  "cibuluh9.png",
];

const cibuluhMedia = cibuluhMediaFiles.map((file, index) => ({
  type: "image",
  src: `/image/Cibuluh/${file}`,
  alt: `Cibuluh Camping foto ${index + 1}`,
}));

const titiknolMediaFiles = [
  "titiknol1.png",
  "titiknol2.png",
  "titiknol3.png",
  "titiknol4.png",
  "titiknol5.png",
  "titiknol.png",
];

const titiknolMedia = titiknolMediaFiles.map((file, index) => ({
  type: "image",
  src: `/image/titiknol/${file}`,
  alt: `Titiknol Adventure foto ${index + 1}`,
}));

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
  {
    id: "kolega-prioritas",
    name: "Kolega Prioritas Camping Ground",
    tagline: "Jongkon Highland — camping dekat Jabodetabek, 50 m dari jalan utama",
    address:
      "Jl. Gunung Batu, Bojong Koneng, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810",
    province: "Jawa Barat",
    travel_time: "1 j 16 mnt",
    phone: "0821-1000-3959",
    hours: "",
    maps_url:
      "https://www.google.com/maps/place/Kolega+Prioritas+Camping+Ground+~+Jongkon+Highland/data=!4m2!3m1!1s0x0:0x10cb9cfcdf922a5f?sa=X&ved=1t:2428&ictx=111",
    pricing: [
      {
        label: "Campervan Pinus Area",
        value: "Rp 200.000/kendaraan",
        note: "Termasuk biaya 2 orang. Tambahan dewasa Rp 50.000/org. Anak under 6th Rp 25.000/org",
      },
      {
        label: "Campervan Alun-Alun",
        value: "Rp 200.000/kendaraan",
        note: "Termasuk biaya 2 orang. Tambahan dewasa Rp 50.000/org. Anak under 6th Rp 25.000/org. Free listrik",
      },
    ],
    facilities: [
      "Camping Ground",
      "Campervan Area",
      "Glamping / Rumah Kayu",
      "Trekking Area Sentul",
      "The FourHands Cafe",
    ],
    views: [],
    notes: [
      "Campervan Pinus Area: power listrik di bawah pohon pinus, toilet & kran air ~5 meter. Kapasitas 2 kendaraan / 2 tenda (sharing).",
      "Campervan Alun-Alun: free listrik.",
      "Tidak jauh dari Jabodetabek, tidak jauh dari parkiran, hanya 50 meter dari jalan utama.",
    ],
    example_calculation: "",
    availability_note: "",
    cover_image: "/image/kolegaCamping/285b0f8d-5711-4652-814b-8715979a613b.jpeg",
    media: kolegaCampingMedia,
  },
  {
    id: "cibuluh-camping",
    name: "Cibuluh Camping Ground",
    tagline: "Camp & Adventure — sewa lahan 2 hari 1 malam di Bojong Koneng",
    address:
      "Bojong Koneng, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810",
    province: "Jawa Barat",
    travel_time: "1 j 13 mnt",
    phone: "0812-9902-5297",
    hours: "Tutup · Buka Sab pukul 06.00",
    maps_url:
      "https://www.google.com/maps/place/Cibuluh+Land+%22Camp+%26+Adventure%22/data=!4m2!3m1!1s0x0:0xe3874a46a12a6d8c?sa=X&ved=1t:2428&ictx=111",
    pricing: [
      {
        label: "Sewa Lahan Camping (Paket Standar)",
        value: "Rp 60.000",
        note: "2 hari 1 malam. Termasuk: musholla, toilet, listrik, security, akses listrik charging & lighting, wisata sungai dan pemandian.",
      },
      {
        label: "Sewa Lahan Camping (Paket Premium)",
        value: "Rp 200.000",
        note: "2 hari 1 malam. Termasuk: musholla, toilet, security, akses listrik charging & lighting, wisata sungai dan pemandian. Max 1 tenda berdampingan dengan mobil.",
      },
    ],
    facilities: [
      "Musholla",
      "Toilet",
      "Listrik",
      "Security",
      "Akses listrik untuk charging & lighting",
      "Wisata sungai dan pemandian",
    ],
    views: [],
    notes: [
      "Untuk menghindari tanjakan terjal dan ruas sempit di Jl. Raya Bojong Koneng:",
      "1. Arahkan map setelah exit tol Sentul Selatan/IKEA Sentul ke arah Bukit Pelangi/Kantor Desa Cijayanti (via Jl. Raya Cijayanti).",
      "2. Dari Bukit Pelangi/Kantor Desa Cijayanti baru lanjut arahkan map ke Cibuluh Land \"Camp & Adventure\".",
      "Noted: 600 m setelah KM 0 Sentul belok kiri (Sate Domba Hambalang) Jl. Sentul Paradise Park.",
      "Noted: 900 m setelah La'Pico Cafe/Sawah Segar Resto menuju Camping Ground Cibuluh Land.",
    ],
    example_calculation: "",
    availability_note: "",
    cover_image: "/image/Cibuluh/cibuluh1.jpeg",
    media: cibuluhMedia,
  },
  {
    id: "titiknol-adventure",
    name: "Titiknol Adventure",
    tagline: "Camping & adventure di Tajur Halang, Cijeruk",
    address: "Jalan Titik Nol, Tajur Halang, Cijeruk, Bogor 16740",
    province: "Jawa Barat",
    travel_time: "",
    phone: "0851-7318-9126",
    hours: "",
    maps_url:
      "https://www.google.com/maps?ll=-6.676098,106.784863&z=13&t=m&hl=en-US&gl=US&mapclient=embed&cid=15951089678948143402",
    pricing: [
      {
        label: "Camping",
        value: "Rp 50.000/org",
        note: "Anak di bawah 5 tahun gratis",
      },
      {
        label: "Campervan",
        value: "Rp 250.000/1 mobil",
        note: "Max. 5 org. Anak di bawah 5 tahun gratis",
      },
    ],
    facilities: [
      "Sewa lahan",
      "Parkir",
      "Kolam renang",
      "Lapangan bulu tangkis",
      "Kolam ikan",
      "Saung",
      "Gazebo",
      "Menara pandang",
      "Musholla",
      "Kamar mandi sharing",
    ],
    views: [],
    notes: [
      "Harga sudah termasuk sewa lahan, parkir, dan fasilitas TNAC.",
      "Kontak via WhatsApp: +62 851-7318-9126",
      "Email: info.titiknolcamp@gmail.com",
    ],
    example_calculation: "",
    availability_note: "",
    cover_image: "/image/titiknol/titiknol1.png",
    media: titiknolMedia,
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
