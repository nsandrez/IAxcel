"use client"

import { Heart, Stethoscope } from "lucide-react"

export function Encabezado() {
    return (
        <header className="bg-teal-600 dark:bg-teal-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex items-center justify-center">
                <Heart className="h-6 w-6 mr-2 text-red-300" />
                <h1 className="text-2xl font-bold">Hospital</h1>
                <Stethoscope className="h-6 w-6 ml-2" />
            </div>
        </header>
    )
}
