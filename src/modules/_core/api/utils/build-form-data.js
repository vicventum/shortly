/**
 * Construye un objeto FormData de forma robusta a partir de un payload.
 * Soporta archivos, arrays de archivos, arrays normales, objetos (como JSON) y primitivos.
 * 
 * @param {Object} payload - El objeto con los datos a enviar
 * @returns {FormData} El FormData listo para ser enviado en el body de un request
 */
function buildFormData(payload = {}) {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined) return

    if (value === null) {
      formData.append(key, '')
      return
    }

    // Array de archivos
    if (Array.isArray(value) && value.every(v => v instanceof File)) {
      value.forEach(file => {
        formData.append(key, file)

        if (file.meta) {
          formData.append(`${key}_meta`, JSON.stringify(file.meta))
        }
      })
      return
    }

    // Archivo único
    if (value instanceof File) {
      formData.append(key, value)

      if (value.meta) {
        formData.append(`${key}_meta`, JSON.stringify(value.meta))
      }
      return
    }

    // Array normal
    if (Array.isArray(value)) {
      value.forEach(item => {
        formData.append(key, String(item))
      })
      return
    }

    // Objeto
    if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value))
      return
    }

    // Primitivos
    formData.append(key, String(value))
  })

  return formData
}

export { buildFormData }
