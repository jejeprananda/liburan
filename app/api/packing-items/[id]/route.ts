import { NextResponse } from "next/server";
import {
  deletePackingItem,
  togglePackingItem,
  updatePackingItem,
} from "@/lib/queries";
import type { PackingItemSource } from "@/lib/types";

const VALID_SOURCES: PackingItemSource[] = ["sudah_punya", "sewa", "beli"];

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const itemId = Number(id);

    if (Number.isNaN(itemId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const body = await request.json();

    if (body.action === "toggle") {
      const item = await togglePackingItem(itemId);
      if (!item) {
        return NextResponse.json({ error: "Barang tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json(item);
    }

    const input: {
      namaBarang?: string;
      sumber?: PackingItemSource;
      sudahAda?: boolean;
    } = {};

    if (body.namaBarang !== undefined) {
      const namaBarang = String(body.namaBarang).trim();
      if (!namaBarang) {
        return NextResponse.json(
          { error: "Nama barang wajib diisi" },
          { status: 400 },
        );
      }
      input.namaBarang = namaBarang;
    }

    if (body.sumber !== undefined) {
      if (!VALID_SOURCES.includes(body.sumber)) {
        return NextResponse.json({ error: "Sumber tidak valid" }, { status: 400 });
      }
      input.sumber = body.sumber;
    }

    if (body.sudahAda !== undefined) {
      input.sudahAda = Boolean(body.sudahAda);
    }

    const item = await updatePackingItem(itemId, input);
    if (!item) {
      return NextResponse.json({ error: "Barang tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("PATCH /api/packing-items/[id]", error);
    return NextResponse.json(
      { error: "Gagal memperbarui barang" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const itemId = Number(id);

    if (Number.isNaN(itemId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const deleted = await deletePackingItem(itemId);
    if (!deleted) {
      return NextResponse.json({ error: "Barang tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/packing-items/[id]", error);
    return NextResponse.json(
      { error: "Gagal menghapus barang" },
      { status: 500 },
    );
  }
}
