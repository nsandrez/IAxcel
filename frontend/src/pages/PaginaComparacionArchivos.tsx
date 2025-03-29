"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { TarjetaSubidaArchivo } from "../components/TarjetaSubidaArchivo"
import { Encabezado } from "../components/Encabezado"

export default function PaginaComparacionArchivos() {
    const [archivos, setArchivos] = useState<{ archivo1: File | null; archivo2: File | null }>({ archivo1: null, archivo2: null, })

    const [contenidoArchivos, setContenidoArchivos] = useState<{ archivo1: string; archivo2: string }>({ archivo1: "", archivo2: "", })

    const manejarCambioArchivo = (e: React.ChangeEvent<HTMLInputElement>, clave: "archivo1" | "archivo2") => {
        if (e.target.files && e.target.files[0]) {
            const archivo = e.target.files[0]
            setArchivos((prev) => ({ ...prev, [clave]: archivo }))

            const lector = new FileReader()
            lector.onload = (evento) => {
                if (evento.target?.result) { setContenidoArchivos((prev) => ({ ...prev, [clave]: evento.target?.result as string, })) }
            }
            lector.readAsText(archivo)
        }
    }

    const compararArchivos = () => {
        if (!contenidoArchivos.archivo1 || !contenidoArchivos.archivo2) return

        const lineas1 = contenidoArchivos.archivo1.split("\n")
        const lineas2 = contenidoArchivos.archivo2.split("\n")

        const lineasDiferentes: number[] = []
        const maxLineas = Math.max(lineas1.length, lineas2.length)

        for (let i = 0; i < maxLineas; i++) {
            if (i >= lineas1.length || i >= lineas2.length || lineas1[i] !== lineas2[i]) { lineasDiferentes.push(i) }
        }

    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Encabezado />

            <div className="container mx-auto py-10 px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <h1 className="text-3xl font-bold text-center text-blue-500">
                            Comparador de Documentos
                        </h1>
                    </div>

                    <p className="text-center text-gray-500 mb-8"> Compare archivos excel  </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <TarjetaSubidaArchivo titulo="Documento Original" descripcion="Expediente o documento de referencia" archivo={archivos.archivo1} alCambiar={(e) => manejarCambioArchivo(e, "archivo1")} color="azul" />

                        <TarjetaSubidaArchivo titulo="Documento Comparativo" descripcion="Nueva versión o documento a comparar" archivo={archivos.archivo2} alCambiar={(e) => manejarCambioArchivo(e, "archivo2")} color="verde" />
                    </div>

                    <div className="flex justify-center mb-8">
                        <button onClick={compararArchivos} disabled={!archivos.archivo1 || !archivos.archivo2} className="gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded">
                            Comparar Documentos
                            <ArrowRight className="h-4 w-4 inline ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
