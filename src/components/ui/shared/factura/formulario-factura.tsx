"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { facturaSchema, FacturaSchema } from "./schema";
import { crearFactura } from "@/action/factura";

export default function FormularioFactura() {
  const form = useForm<FacturaSchema>({
    resolver: zodResolver(facturaSchema),
    defaultValues: {
      numeroFactura: "",
      fechaFactura: "",
      total: 0,
      formaPago: undefined,
      usuarioAsociado: "",
    },
  });

  const onSubmit = async (values: FacturaSchema) => {
    const res = await crearFactura({
      fechaFactura: values.fechaFactura,
      formaPago: values.formaPago,
      total: values.total,
      numeroFactura: values.numeroFactura,
      usuarioAsociado: values.usuarioAsociado,
    });

    if (res.ok) {
      Swal.fire("Registró correstamente!", "", "success");
      form.reset();
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Formulario de Factura
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="numeroFactura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Factura</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el número de factura"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fechaFactura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Factura</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese el total"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="formaPago"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de Pago</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione la forma de pago" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                      <SelectItem value="tarjeta">
                        Tarjeta de Crédito
                      </SelectItem>
                      <SelectItem value="transferencia">
                        Transferencia Bancaria
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usuarioAsociado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario Asociado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el usuario asociado"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Guardar Factura
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
