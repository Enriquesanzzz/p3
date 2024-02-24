// URL de la API
const apiUrl = 'https://restcountries.com/v3.1/all';

// Llamada a la API utilizando fetch
fetch(apiUrl)
  .then(response => {
    // Verifica si la respuesta de la API es exitosa (código 200)
    if (!response.ok) {
      throw new Error(`Error de la API: ${response.status}`);
    }
    
    // Convierte la respuesta a formato JSON
    return response.json();
  })
  .then(data => {
    // Maneja los datos obtenidos de la API
    console.log(data);
    // Aquí puedes realizar acciones adicionales con los datos
  })
  .catch(error => {
    // Maneja los errores de la llamada a la API
    console.error(`Error al llamar a la API: ${error.message}`);
  });
