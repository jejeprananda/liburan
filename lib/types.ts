export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

export type PricingItem = {
  label: string;
  value: string;
  note?: string;
};

export type Destination = {
  id: string;
  name: string;
  tagline: string;
  address: string;
  province: string;
  travelTime: string;
  phone: string;
  hours: string;
  mapsUrl: string;
  pricing: PricingItem[];
  facilities: string[];
  views: string[];
  notes: string[];
  exampleCalculation: string;
  availabilityNote: string;
  coverImage: string;
  media: MediaItem[];
};

export type PackingItemSource = "sudah_punya" | "sewa" | "beli";

export type PackingItem = {
  id: number;
  namaBarang: string;
  sumber: PackingItemSource;
  sudahAda: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DestinationRow = {
  id: string;
  name: string;
  tagline: string;
  address: string;
  province: string;
  travel_time: string;
  phone: string;
  hours: string;
  maps_url: string;
  pricing: string;
  facilities: string;
  views: string;
  notes: string;
  example_calculation: string;
  availability_note: string;
  cover_image: string;
  media: string;
};

export type PackingItemRow = {
  id: number;
  nama_barang: string;
  sumber: PackingItemSource;
  sudah_ada: number;
  created_at: string;
  updated_at: string;
};

export const PACKING_SOURCE_LABELS: Record<PackingItemSource, string> = {
  sudah_punya: "Sudah punya",
  sewa: "Sewa",
  beli: "Beli",
};

const PACKING_SOURCE_ORDER: Record<PackingItemSource, number> = {
  sewa: 0,
  beli: 1,
  sudah_punya: 2,
};

export function sortPackingItems(items: PackingItem[]): PackingItem[] {
  return [...items].sort((a, b) => {
    if (a.sudahAda !== b.sudahAda) {
      return a.sudahAda ? 1 : -1;
    }

    const sourceDiff =
      PACKING_SOURCE_ORDER[a.sumber] - PACKING_SOURCE_ORDER[b.sumber];
    if (sourceDiff !== 0) return sourceDiff;

    return a.id - b.id;
  });
}

export const tripDate = new Date("2026-08-15T00:00:00+07:00");

export function getWhatsAppUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

export function rowToDestination(row: DestinationRow): Destination {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    address: row.address,
    province: row.province,
    travelTime: row.travel_time,
    phone: row.phone,
    hours: row.hours,
    mapsUrl: row.maps_url,
    pricing: JSON.parse(row.pricing) as PricingItem[],
    facilities: JSON.parse(row.facilities) as string[],
    views: row.views ? (JSON.parse(row.views) as string[]) : [],
    notes: row.notes ? (JSON.parse(row.notes) as string[]) : [],
    exampleCalculation: row.example_calculation ?? "",
    availabilityNote: row.availability_note ?? "",
    coverImage: row.cover_image,
    media: JSON.parse(row.media) as MediaItem[],
  };
}

export function rowToPackingItem(row: PackingItemRow): PackingItem {
  return {
    id: row.id,
    namaBarang: row.nama_barang,
    sumber: row.sumber,
    sudahAda: row.sudah_ada === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
