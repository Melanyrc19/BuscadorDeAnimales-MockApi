const API_URL = "https://68c99a25ceef5a150f657abc.mockapi.io/Mascotas";
let todasLasMascotas = [];

const filtroNombre = document.querySelector("#filtroNombre");
const filtroRaza = document.querySelector("#selectRaza");
const filtroSexo = document.querySelector("#selectSexo");

let botonAñadirNav = document.querySelector("#botonAñadir")
let botonParaAñadir = document.querySelector("#botonParaAñadir")
let botonLimpiar = document.querySelector("#botonLimpiar")
let seccionAñadirMascotas = document.querySelector("#seccionAñadirMascota")

let idMascotaEditando = null;

const inputNombre = document.querySelector("#nombreMascota");
const inputRaza = document.querySelector("#razaMascota");
const inputSexo = document.querySelector("#sexoMascota");
const inputAvatar = document.querySelector("#imagenMascota");

let btnSubmit = document.querySelector("#btnSubmit");
let tituloFormulario = document.querySelector("#tituloFormulario")



async function obtenerMascotas() {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const datos = await response.json();
     todasLasMascotas = datos; 
    mostrarMascotasEnDOM(datos);
    actualizarSelectRazas();
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}
const seccionCards = document.querySelector("#seccionCards")

function mostrarMascotasEnDOM(datos) {
  if (datos.length === 0) {
    seccionCards.innerHTML = "<p>No hay datos para mostrar.</p>";
    return;
  }
  seccionCards.innerHTML = "";
  datos.forEach(({ raza, name, Sexo, avatar, id }) => {
   

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
                <span class="tag is-warning is-light">${Sexo || "Desconocido"}</span>
                <span class="tag is-success is-light">${raza || "Desconocida"}</span>
            </div>

         
          <footer class="card-footer">
            <a href="#" id="botonParaEditar" onclick="editarMasc('${id}')" class="button card-footer-item button is-small is-info">Editar</a>
            <a href="#" onclick="eliminarMascotas('${id}')" class="button card-footer-item button is-small is-danger">Eliminar</a>
          </footer>

        
        
  </div>
    `;
    seccionCards.appendChild(userCard);
  });
}

window.eliminarMascotas= async function (id) {
  if (confirm(`¿Estás seguro de eliminar el estudiante con ID ${id}?`)) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      alert("Estudiante eliminado correctamente");
      obtenerMascotas();
    } catch (error) {
      alert(`Error al eliminar estudiante: ${error.message}`);
      console.error("Error al eliminar estudiante:", error);
    }
  }
}


obtenerMascotas();

botonAñadirNav.addEventListener("click", ()=>{
seccionAñadirMascotas.classList.toggle("is-hidden")
 tituloFormulario.textContent = "Añadir Mascota";
 btnSubmit.textContent = "Añadir";
 btnSubmit.dataset.accion= "add";
})


const formMascota = document.querySelector("#formMascota");


formMascota.addEventListener("submit", async (e) => {
  e.preventDefault(); 

 const accion = btnSubmit.dataset.accion;  


  try {
    if (accion === "edit") {
      const id = btnSubmit.dataset.id;
      await editarMascotaApi(id);
  } else {
       await añadirMascotaApi();
  }

    obtenerMascotas();

    formMascota.reset();

    seccionAñadirMascotas.classList.add("is-hidden");
    

  } catch (error) {
    console.error("Error al guardar:", error);
    alert("No se pudo guardar la mascota");
  }
});

window.editarMasc = async function(id){
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const mascota = await response.json();
    inputNombre.value = mascota.name;
    inputRaza.value = mascota.raza;
    inputSexo.value = mascota.Sexo;
    inputAvatar.value = mascota.avatar;
    seccionAñadirMascotas.classList.remove("is-hidden");
    tituloFormulario.textContent = "Editar mascota";
    btnSubmit.textContent = "Guardar cambios";
    btnSubmit.dataset.accion = "edit";
    btnSubmit.dataset.id = id;
  } catch (error) {
    console.error(error);
    alert("No se pudo cargar la mascota para editar");
  }
};
 async function editarMascotaApi (id) {
  try {
     const mascotaEditada = {
        name: inputNombre.value,
        raza: inputRaza.value,
        Sexo: inputSexo.value,
        avatar: inputAvatar.value,
    };
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mascotaEditada),
    });
    if (!response.ok) throw new Error("Error al editar mascota");
    
    alert("Mascota editada correctamente ✅");
    

  } catch (error) {
    console.error(error);
    alert("No se pudo cargar la mascota para editar");
  }
};
async function  añadirMascotaApi() {
  try{
     const nuevaMascota = {
      name: document.querySelector("#nombreMascota").value,
      raza: document.querySelector("#razaMascota").value,
      Sexo: document.querySelector("#sexoMascota").value,
      avatar: document.querySelector("#imagenMascota").value,
    };
      const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaMascota),
    });
     if (!response.ok) throw new Error("Error al añadir mascota");

    alert("Mascota añadida correctamente 🎉");

  } catch (error) {
    console.error(error);
    alert("No se pudo añadir la mascota");
  }

}

function aplicarFiltros() {
  let filtradas = todasLasMascotas;

const nombre = filtroNombre.value.toLowerCase();
if (nombre){
  filtradas = filtradas.filter(n=>n.name.toLowerCase().startsWith(nombre));
}

  const sexo = filtroSexo.value.toLowerCase();
  if (sexo && sexo !== "todos") {
    filtradas = filtradas.filter(m => m.Sexo?.toLowerCase() === sexo);
  }


const raza = filtroRaza.value.toLowerCase();
if  (raza){
  filtradas = filtradas.filter(r=>r.raza?.toLowerCase()===raza)
}

mostrarMascotasEnDOM(filtradas);
actualizarSelectRazas();

}


filtroNombre.addEventListener("input", aplicarFiltros);
filtroRaza.addEventListener("change", aplicarFiltros);
filtroSexo.addEventListener("change", aplicarFiltros);



botonLimpiar.addEventListener("click", (e) => {
  e.preventDefault();
  filtroNombre.value = "";
  filtroRaza.value = "";
  filtroSexo.value = "todos";
  mostrarMascotasEnDOM(todasLasMascotas);
  actualizarSelectRazas();
});




function actualizarSelectRazas() {
  
}
