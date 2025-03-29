"use client"

import type React from "react"
import { ClipboardCheck, Upload } from "lucide-react"

interface PropsTarjetaSubidaArchivo { titulo: string, descripcion: string, archivo: File | null, alCambiar: (e: React.ChangeEvent<HTMLInputElement>) => void, color: "azul" | "verde", }

export function TarjetaSubidaArchivo({ titulo, descripcion, archivo, alCambiar, color, }: PropsTarjetaSubidaArchivo) {
    const clasesColorBorde = { azul: "border-blue-200", verde: "border-green-200", }
    const clasesIconoColor = { azul: "text-blue-500", verde: "text-green-500", }

    return (
        <div className={`shadow-md border-l-4 ${color === "azul" ? "border-l-blue-500" : "border-l-green-500"} bg-white rounded-lg overflow-hidden`} >
            <div className="p-6 pb-3">
                <div className="flex items-center gap-2 mb-1">
                    <ClipboardCheck className={`h-5 w-5 ${clasesIconoColor[color]}`} />
                    <h2 className="text-lg font-semibold">{titulo}</h2>
                </div>
                <p className="text-sm text-gray-500">{descripcion}</p>
            </div>

            <div className="p-6 pt-0">
                <div className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center ${clasesColorBorde[color]}`}>
                    <div className="mb-4">
                        <Upload className={`h-10 w-10 mx-auto mb-2 ${clasesIconoColor[color]}`} />
                        <p className="text-sm text-gray-500 mb-1">
                            {archivo ? archivo.name : "Arrastra y suelta o haz clic para cargar"}
                        </p>
                        {archivo && (<p className="text-xs text-gray-500">{(archivo.size / 1024).toFixed(2)} KB</p>)}
                    </div>

                    <div className="flex justify-center">
                        <label className={`cursor-pointer inline-block border text-sm px-4 py-2 rounded hover:bg-gray-100 transition-all ${color === "azul" ? "text-blue-600 border-blue-300" : "text-green-600 border-green-300"}`}>
                            Seleccionar Archivo
                            <input type="file" className="hidden" onChange={alCambiar} accept=".txt,.md,.json,.csv,.html,.pdf,.doc,.docx,.xml,.hl7" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
