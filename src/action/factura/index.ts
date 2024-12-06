"use server";

import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export interface Factura {
  id: string;
  numeroFactura: string;
  fechaFactura: string;
  total: number;
  formaPago: string;
  usuarioAsociado: string;
}

// Initial in-memory data
const initialFacturas: Factura[] = [
  {
    id: uuidv4(),
    numeroFactura: "F001",
    fechaFactura: "2023-06-01",
    total: 1500.0,
    formaPago: "Tarjeta de Crédito",
    usuarioAsociado: "Juan Pérez",
  },
  {
    id: uuidv4(),
    numeroFactura: "F002",
    fechaFactura: "2023-06-02",
    total: 2000.5,
    formaPago: "Efectivo",
    usuarioAsociado: "María García",
  },
  {
    id: uuidv4(),
    numeroFactura: "F003",
    fechaFactura: "2023-06-03",
    total: 1750.75,
    formaPago: "Transferencia Bancaria",
    usuarioAsociado: "Carlos Rodríguez",
  },
];

// Mutable data store
let dataFacturas: Factura[] = [...initialFacturas];

// Read (Consultar) - Get all facturas
export async function consultarFacturas(): Promise<Factura[]> {
  return dataFacturas;
}

// Read (Consultar) - Get factura by ID
export async function consultarFacturaPorId(
  id: string
): Promise<Factura | undefined> {
  return dataFacturas.find((factura) => factura.id === id);
}

// Create (Crear) - Add new factura
export async function crearFactura(nuevaFactura: Omit<Factura, "id">) {
  const facturaConId: Factura = {
    id: uuidv4(),
    ...nuevaFactura,
  };

  dataFacturas.push(facturaConId);
  return {
    ok: true,
    facturaConId,
  };
}

// Update (Actualizar) - Update existing factura
export async function actualizarFactura(
  id: string,
  facturaActualizada: Partial<Factura>
): Promise<Factura | null> {
  const index = dataFacturas.findIndex((factura) => factura.id === id);

  if (index === -1) {
    return null;
  }

  dataFacturas[index] = {
    ...dataFacturas[index],
    ...facturaActualizada,
  };

  return dataFacturas[index];
}

// Delete (Eliminar) - Remove factura by ID
export async function eliminarFactura(id: string): Promise<boolean> {
  const initialLength = dataFacturas.length;
  dataFacturas = dataFacturas.filter((factura) => factura.id !== id);
  revalidatePath("/facturas");
  return dataFacturas.length < initialLength;
}

// Buscar (Search) - Find facturas by criteria
export async function buscarFacturas(
  criterios: Partial<Factura>
): Promise<Factura[]> {
  return dataFacturas.filter((factura) =>
    Object.entries(criterios).every(
      ([key, value]) => factura[key as keyof Factura] === value
    )
  );
}
