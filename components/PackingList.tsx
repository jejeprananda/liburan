"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PACKING_SOURCE_LABELS,
  sortPackingItems,
  type PackingItem,
  type PackingItemSource,
} from "@/lib/types";

const SOURCE_OPTIONS: PackingItemSource[] = ["sewa", "beli", "sudah_punya"];

type FormState = {
  namaBarang: string;
  sumber: PackingItemSource;
  sudahAda: boolean;
};

type ViewMode = "closed" | "mini" | "full";

const emptyForm: FormState = {
  namaBarang: "",
  sumber: "sewa",
  sudahAda: false,
};

function applySort(items: PackingItem[]) {
  return sortPackingItems(items);
}

function WindowHeader({
  readyCount,
  totalCount,
  viewMode,
  onExpand,
  onMinimize,
  onClose,
}: {
  readyCount: number;
  totalCount: number;
  viewMode: "mini" | "full";
  onExpand: () => void;
  onMinimize: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-emerald-100 px-4 py-3">
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-zinc-900">List Bawaan</h2>
        {totalCount > 0 && (
          <p className="text-xs text-emerald-700">
            {readyCount} dari {totalCount} sudah siap
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {viewMode === "mini" ? (
          <button
            type="button"
            onClick={onExpand}
            aria-label="Perbesar"
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
            title="Perbesar"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path d="M3 3h5v1.5H5.62l4.19 4.19-1.06 1.06L4.5 5.62V8H3V3zm14 0v5h-1.5V5.62l-4.19 4.19-1.06-1.06L15.38 4.5H13V3h4zM3 17v-5h1.5v2.38l4.19-4.19 1.06 1.06L5.62 15.5H8V17H3zm14 0h-5v-1.5h2.38l-4.19-4.19 1.06-1.06L15.5 14.38V12H17v5z" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={onMinimize}
            aria-label="Perkecil"
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
            title="Perkecil"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path d="M7 10h6v1.5H7V10zm6-4H7V4.5h6V6zM4.5 4.5H3V3h1.5v1.5zM17 3v1.5h-1.5V3H17zm0 13.5V17h-1.5v-1.5H17zM4.5 17H3v-1.5h1.5V17z" />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
          title="Tutup"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function PackingList() {
  const [viewMode, setViewMode] = useState<ViewMode>("closed");
  const [items, setItems] = useState<PackingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const loadItems = useCallback(async () => {
    setError(null);
    const response = await fetch("/api/packing-items");
    if (!response.ok) {
      throw new Error("Gagal memuat daftar barang");
    }
    const data = (await response.json()) as PackingItem[];
    setItems(applySort(data));
  }, []);

  useEffect(() => {
    loadItems()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [loadItems]);

  useEffect(() => {
    if (viewMode !== "full") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setViewMode("mini");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [viewMode]);

  async function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!form.namaBarang.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/packing-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Gagal menambah barang");
      }

      const item = (await response.json()) as PackingItem;
      setItems((current) => applySort([...current, item]));
      setForm(emptyForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menambah barang");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggle(id: number) {
    setError(null);

    try {
      const response = await fetch(`/api/packing-items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle" }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui status");
      }

      const updated = (await response.json()) as PackingItem;
      setItems((current) =>
        applySort(current.map((item) => (item.id === id ? updated : item))),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memperbarui status");
    }
  }

  function startEdit(item: PackingItem) {
    setEditingId(item.id);
    setEditForm({
      namaBarang: item.namaBarang,
      sumber: item.sumber,
      sudahAda: item.sudahAda,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyForm);
  }

  async function handleSaveEdit(id: number) {
    if (!editForm.namaBarang.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/packing-items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Gagal menyimpan perubahan");
      }

      const updated = (await response.json()) as PackingItem;
      setItems((current) =>
        applySort(current.map((item) => (item.id === id ? updated : item))),
      );
      cancelEdit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan perubahan");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    setError(null);

    try {
      const response = await fetch(`/api/packing-items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus barang");
      }

      setItems((current) => current.filter((item) => item.id !== id));
      if (editingId === id) cancelEdit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus barang");
    }
  }

  const readyCount = items.filter((item) => item.sudahAda).length;
  const pendingCount = items.length - readyCount;
  const isCompact = viewMode === "mini";

  const listContent = (
    <div className="flex h-full min-h-0 flex-col">
      {error && (
        <div className="mx-4 mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleAdd}
        className={`shrink-0 border-b border-emerald-50 p-4 ${
          isCompact ? "space-y-2" : "grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]"
        }`}
      >
        <input
          type="text"
          placeholder="Nama barang"
          value={form.namaBarang}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              namaBarang: event.target.value,
            }))
          }
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
        <div className={isCompact ? "grid grid-cols-2 gap-2" : "contents"}>
          <select
            value={form.sumber}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                sumber: event.target.value as PackingItemSource,
              }))
            }
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          >
            {SOURCE_OPTIONS.map((source) => (
              <option key={source} value={source}>
                {PACKING_SOURCE_LABELS[source]}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm">
            <input
              type="checkbox"
              checked={form.sudahAda}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  sudahAda: event.target.checked,
                }))
              }
              className="size-4 rounded border-zinc-300 text-emerald-600"
            />
            Sudah ada
          </label>
        </div>
        <button
          type="submit"
          disabled={submitting || !form.namaBarang.trim()}
          className={`rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 ${
            isCompact ? "w-full" : ""
          }`}
        >
          Tambah
        </button>
      </form>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {loading ? (
          <p className="text-center text-sm text-zinc-500">Memuat...</p>
        ) : items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-emerald-200 px-4 py-8 text-center text-sm text-zinc-500">
            Belum ada barang.
          </p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => {
              const isEditing = editingId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-3 ${
                    item.sudahAda
                      ? "border-emerald-100 bg-emerald-50/50"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.namaBarang}
                        onChange={(event) =>
                          setEditForm((current) => ({
                            ...current,
                            namaBarang: event.target.value,
                          }))
                        }
                        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={editForm.sumber}
                          onChange={(event) =>
                            setEditForm((current) => ({
                              ...current,
                              sumber: event.target.value as PackingItemSource,
                            }))
                          }
                          className="rounded-lg border border-zinc-200 px-2 py-2 text-sm"
                        >
                          {SOURCE_OPTIONS.map((source) => (
                            <option key={source} value={source}>
                              {PACKING_SOURCE_LABELS[source]}
                            </option>
                          ))}
                        </select>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={editForm.sudahAda}
                            onChange={(event) =>
                              setEditForm((current) => ({
                                ...current,
                                sudahAda: event.target.checked,
                              }))
                            }
                            className="size-4 rounded text-emerald-600"
                          />
                          Sudah ada
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(item.id)}
                          disabled={submitting}
                          className="flex-1 rounded-lg bg-emerald-700 px-3 py-1.5 text-sm text-white hover:bg-emerald-800 disabled:opacity-50"
                        >
                          Simpan
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-start gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggle(item.id)}
                          aria-label={
                            item.sudahAda
                              ? "Tandai belum ada"
                              : "Tandai sudah ada"
                          }
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border text-xs transition ${
                            item.sudahAda
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-zinc-300 bg-white hover:border-emerald-400"
                          }`}
                        >
                          {item.sudahAda ? "✓" : ""}
                        </button>
                        <div className="min-w-0">
                          <p
                            className={`truncate text-sm font-medium ${
                              item.sudahAda
                                ? "text-zinc-400 line-through"
                                : item.sumber === "sudah_punya"
                                  ? "text-emerald-700"
                                  : "text-zinc-900"
                            }`}
                          >
                            {item.namaBarang}
                          </p>
                          <p
                            className={`text-xs ${
                              item.sumber === "sudah_punya"
                                ? "text-emerald-600"
                                : "text-zinc-500"
                            }`}
                          >
                            {PACKING_SOURCE_LABELS[item.sumber]}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          className="rounded px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-100"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {viewMode === "closed" && (
        <button
          type="button"
          onClick={() => setViewMode("mini")}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-800 hover:shadow-xl"
        >
          List Bawaan
          {items.length > 0 && (
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium">
              {pendingCount > 0 ? pendingCount : "✓"}
            </span>
          )}
        </button>
      )}

      {viewMode === "mini" && (
        <div className="fixed bottom-6 right-6 z-50 flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl shadow-black/15">
          <WindowHeader
            readyCount={readyCount}
            totalCount={items.length}
            viewMode="mini"
            onExpand={() => setViewMode("full")}
            onMinimize={() => setViewMode("mini")}
            onClose={() => setViewMode("closed")}
          />
          <div className="h-[min(24rem,55vh)]">{listContent}</div>
        </div>
      )}

      {viewMode === "full" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Tutup overlay"
            onClick={() => setViewMode("mini")}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative flex max-h-[min(90vh,48rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl">
            <WindowHeader
              readyCount={readyCount}
              totalCount={items.length}
              viewMode="full"
              onExpand={() => setViewMode("full")}
              onMinimize={() => setViewMode("mini")}
              onClose={() => setViewMode("closed")}
            />
            <div className="min-h-0 flex-1">{listContent}</div>
          </div>
        </div>
      )}
    </>
  );
}
