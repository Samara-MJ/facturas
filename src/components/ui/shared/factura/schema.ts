import * as z from "zod";

export const facturaSchema = z.object({
  numeroFactura: z.string().min(1, "El número de factura es requerido"),
  fechaFactura: z.string().min(1, "La fecha de factura es requerida"),
  total: z.number().min(0, "El total debe ser un número positivo"),
  formaPago: z.enum(["efectivo", "tarjeta", "transferencia"], {
    required_error: "Por favor seleccione una forma de pago",
  }),
  usuarioAsociado: z.string().min(1, "El usuario asociado es requerido"),
});

export type FacturaSchema = z.infer<typeof facturaSchema>;
