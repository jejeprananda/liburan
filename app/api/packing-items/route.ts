import { NextResponse } from "next/server";
import {
  createPackingItem,
  getPackingItems,
} from "@/lib/queries";
import type { PackingItemSource } from "@/lib/types";

const VALID_SOURCES: PackingItemSource[] = ["sudah_punya", "sewa", "beli"];

export async function GET() {
  try {
    const items = await getPackingItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/packing-items", error);
    return NextResponse.json(
      { error: "Gagal memuat daftar barang" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const namaBarang = String(body.namaBarang ?? "").trim();
    const sumber = body.sumber as PackingItemSource;
    const sudahAda = Boolean(body.sudahAda);

    if (!namaBarang) {
      return NextResponse.json(
        { error: "Nama barang wajib diisi" },
        { status: 400 },
      );
    }

    if (!VALID_SOURCES.includes(sumber)) {
      return NextResponse.json({ error: "Sumber tidak valid" }, { status: 400 });
    }

    const item = await createPackingItem({ namaBarang, sumber, sudahAda });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST /api/packing-items", error);
    return NextResponse.json(
      { error: "Gagal menambah barang" },
      { status: 500 },
    );
  }
}
