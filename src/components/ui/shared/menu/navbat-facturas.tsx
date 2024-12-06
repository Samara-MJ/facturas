"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, List, Plus, Search } from "lucide-react";

export default function NavbarFacturas() {
  const [usuarioFiltro, setUsuarioFiltro] = useState("");
  const pathname = usePathname();

  const handleConsultarFacturasPorUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica para consultar facturas por usuario
    console.log(`Consultar facturas para el usuario: ${usuarioFiltro}`);
    // Aquí podrías redirigir a una página de resultados, por ejemplo:
    // router.push(`/facturas/usuario/${usuarioFiltro}`)
  };

  return (
    <nav className="bg-background border-b mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <FileText className="h-8 w-8 text-primary" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    pathname === "/facturas/crear"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Factura
                </Link>
                <Link
                  href="/facturas"
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    pathname === "/facturas"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <List className="mr-2 h-4 w-4" />
                  Todas las Facturas
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <form
              onSubmit={handleConsultarFacturasPorUsuario}
              className="flex items-center"
            >
              <Input
                type="text"
                placeholder="Buscar por usuario"
                value={usuarioFiltro}
                onChange={(e) => setUsuarioFiltro(e.target.value)}
                className="mr-2"
              />
              <Button type="submit" size="sm">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </form>
          </div>
          <div className="md:hidden">
            {/* Aquí puedes agregar un botón de menú para dispositivos móviles */}
            <Button variant="ghost">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
