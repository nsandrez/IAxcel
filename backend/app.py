from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from io import BytesIO

# Inicializar la aplicación Flask
app = Flask(__name__)
# Permitir peticiones desde el frontend (React)
CORS(app)  

# Ruta para subir los archivos Excel
@app.route('/subir', methods=['POST'])
def subir_archivos():
    archivos = request.files.getlist('archivos')  # Obtener los archivos subidos desde el frontend

    if len(archivos) != 2:
        return jsonify({'error': 'Debes subir exactamente 2 archivos Excel'}), 400

    try:
        # Leer ambos archivos en memoria con pandas
        excel_uno = pd.read_excel(BytesIO(archivos[0].read()))
        excel_dos = pd.read_excel(BytesIO(archivos[1].read()))

        # Obtener las columnas que ambos archivos tienen en común
        columnas_comunes = list(set(excel_uno.columns) & set(excel_dos.columns))

        # Convertir los DataFrames a JSON para enviarlos de vuelta al frontend
        excel_uno_json = excel_uno.to_json()
        excel_dos_json = excel_dos.to_json()

        # Devolver columnas comunes y los datos en JSON
        return jsonify({'columnas': columnas_comunes, 'archivoUno': excel_uno_json, 'archivoDos': excel_dos_json})

    except Exception as error:
        return jsonify({'error': f'Ocurrió un error al leer los archivos: {str(error)}'}), 500

# Ruta para comparar los archivos por la columna seleccionada
@app.route('/comparar', methods=['POST'])
def comparar_columnas():
    try:
        datos = request.json

        # Obtener la columna seleccionada y los archivos en formato JSON
        columna = datos.get('columna')
        excel_uno = pd.read_json(datos.get('archivoUno'))
        excel_dos = pd.read_json(datos.get('archivoDos'))

        # Validar que la columna exista en ambos archivos
        if columna not in excel_uno.columns or columna not in excel_dos.columns:
            return jsonify({'error': f'La columna "{columna}" no existe en ambos archivos'}), 400

        # Obtener los valores únicos de esa columna en cada archivo
        valores_uno = set(excel_uno[columna].dropna())
        valores_dos = set(excel_dos[columna].dropna())

        # Calcular diferencias y coincidencias
        solo_en_uno = list(valores_uno - valores_dos)
        solo_en_dos = list(valores_dos - valores_uno)
        en_ambos = list(valores_uno & valores_dos)

        # Devolver el resultado de la comparación
        return jsonify({'solo_en_uno': solo_en_uno,'solo_en_dos': solo_en_dos, 'en_ambos': en_ambos})

    except Exception as error:
        return jsonify({'error': f'Error al comparar: {str(error)}'}), 500

# Ejecutar la aplicación en modo debug
if __name__ == '__main__':
    app.run(debug=True)
