import { getDb } from "@/lib/db";
import {
  rowToDestination,
  rowToPackingItem,
  type Destination,
  type DestinationRow,
  type PackingItem,
  type PackingItemRow,
  type PackingItemSource,
} from "@/lib/types";

export async function getDestinations(): Promise<Destination[]> {
  const db = getDb();
  const result = await db.execute("SELECT * FROM destinations ORDER BY name ASC");
  return (result.rows as unknown as DestinationRow[]).map(rowToDestination);
}

export async function getDestinationById(id: string): Promise<Destination | null> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM destinations WHERE id = ?",
    args: [id],
  });

  const row = result.rows[0] as unknown as DestinationRow | undefined;
  return row ? rowToDestination(row) : null;
}

export async function getPackingItems(): Promise<PackingItem[]> {
  const db = getDb();
  const result = await db.execute(`
    SELECT * FROM packing_items
    ORDER BY
      sudah_ada ASC,
      CASE sumber
        WHEN 'sewa' THEN 0
        WHEN 'beli' THEN 1
        WHEN 'sudah_punya' THEN 2
      END,
      created_at ASC
  `);
  return (result.rows as unknown as PackingItemRow[]).map(rowToPackingItem);
}

export async function createPackingItem(input: {
  namaBarang: string;
  sumber: PackingItemSource;
  sudahAda?: boolean;
}): Promise<PackingItem> {
  const db = getDb();
  const result = await db.execute({
    sql: `INSERT INTO packing_items (nama_barang, sumber, sudah_ada)
          VALUES (?, ?, ?)
          RETURNING *`,
    args: [input.namaBarang, input.sumber, input.sudahAda ? 1 : 0],
  });

  return rowToPackingItem(result.rows[0] as unknown as PackingItemRow);
}

export async function updatePackingItem(
  id: number,
  input: Partial<{
    namaBarang: string;
    sumber: PackingItemSource;
    sudahAda: boolean;
  }>,
): Promise<PackingItem | null> {
  const db = getDb();
  const current = await db.execute({
    sql: "SELECT * FROM packing_items WHERE id = ?",
    args: [id],
  });

  const row = current.rows[0] as unknown as PackingItemRow | undefined;
  if (!row) return null;

  const namaBarang = input.namaBarang ?? row.nama_barang;
  const sumber = input.sumber ?? row.sumber;
  const sudahAda = input.sudahAda !== undefined ? (input.sudahAda ? 1 : 0) : row.sudah_ada;

  const result = await db.execute({
    sql: `UPDATE packing_items
          SET nama_barang = ?, sumber = ?, sudah_ada = ?, updated_at = datetime('now')
          WHERE id = ?
          RETURNING *`,
    args: [namaBarang, sumber, sudahAda, id],
  });

  return rowToPackingItem(result.rows[0] as unknown as PackingItemRow);
}

export async function deletePackingItem(id: number): Promise<boolean> {
  const db = getDb();
  const result = await db.execute({
    sql: "DELETE FROM packing_items WHERE id = ?",
    args: [id],
  });

  return result.rowsAffected > 0;
}

export async function togglePackingItem(id: number): Promise<PackingItem | null> {
  const db = getDb();
  const current = await db.execute({
    sql: "SELECT * FROM packing_items WHERE id = ?",
    args: [id],
  });

  const row = current.rows[0] as unknown as PackingItemRow | undefined;
  if (!row) return null;

  const nextValue = row.sudah_ada === 1 ? 0 : 1;
  const result = await db.execute({
    sql: `UPDATE packing_items
          SET sudah_ada = ?, updated_at = datetime('now')
          WHERE id = ?
          RETURNING *`,
    args: [nextValue, id],
  });

  return rowToPackingItem(result.rows[0] as unknown as PackingItemRow);
}
