const API_URL = " https://68c99a25ceef5a150f657abc.mockapi.io/Mascotas";
let todasLasMascotas = [];

const filtroNombre = document.querySelector("#seccionFiltro input"); // input del nombre
const filtroRaza = document.querySelector("#selectRaza");
const filtroSexo = document.querySelector("#selectSexo");

async function obtenerUsuarios() {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const datos = await response.json();
     todasLasMascotas = datos; 
    mostrarUsuariosEnDOM(datos);
    actualizarSelectRazas();
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}
const seccionCards = document.querySelector("#seccionCards")

function mostrarUsuariosEnDOM(datos) {
  if (datos.length === 0) {
    seccionCards.innerHTML = "<p>No hay datos para mostrar.</p>";
    return;
  }
  seccionCards.innerHTML = "";
  datos.forEach(({ job, raza, country, name, Sexo, avatar, id }) => {
    // const {job, country, name, avatar, id} = dato

    const userCard = document.createElement("div");
    userCard.className = "column is-4-table is-6-mobile mb-3";
    userCard.innerHTML = `<div class="card has-background-light has-shadow">
         <div class="card-content has-text-centered">
          <h2 class="title has-text-success mb-3">${name || "Max"}</h2>

            <div class="card-image is-flex is-justify-content-center mb-4">
                <figure class="image is-128x128  ">
                   <img src="${avatar || "https://via.placeholder.com/150"}" onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwQaIC41yiY6MMU9KawcQ3r_mz7hSbqnWZA&s' " style="width:128px; height:128px; object-fit:cover; border-radius:50%;">
                </figure>
            </div>
            <div class="tags is-centered mb-3">
                <span class="tag is-warning is-light">${Sexo || "N/A"}</span>
                <span class="tag is-success is-light">${raza || "Desconocida"}</span>
            </div>

         
          <footer class="card-footer">
            <a href="#" onclick="editarUsuario('${id}')" class="button card-footer-item button is-small is-info">Editar</a>
            <a href="#" onclick="eliminarUsuario('${id}')" class="button card-footer-item button is-small is-danger">Eliminar</a>
          </footer>

        
        
  </div>
    `;
    seccionCards.appendChild(userCard);
  });
}
