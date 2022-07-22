const form = document.querySelector("#form");
const inputsContainer = document.querySelector(".inputs-container");
const btnAdd = document.querySelector("#btn-add");

function addNewPerson() {
  const div = document.createElement("div");

  div.classList.add("person-container");
  div.innerHTML =
    '<div class="input-container"><label>Nombre:</label><input type="text" id="name" required /></div><div class="input-container"><label>Sueldo bruto acordado:</label><input type="number" id="salary" required /></div><div class="input-container"><label>Dias de ausencia:</label><input type="number" id="days-offs" required /></div>';

  inputsContainer.appendChild(div);
}

function handleSubmit(event) {
  event.preventDefault();

  const personsDOM = document.querySelectorAll(".person-container");
  const personas = [];

  personsDOM.forEach((x) => {
    const persona = {};

    persona.nombre = x.querySelector("#name").value;
    persona.sueldoBrutoAcordado = parseInt(x.querySelector("#salary").value);
    persona.diasDeAusencia = parseInt(x.querySelector("#days-offs").value);

    personas.push(realizarCalculos(persona));
  });

  personas.forEach((persona) => {
    mostrarResultados(persona);
  });
}

function realizarCalculos(persona) {
  persona.sueldoBrutoDelMes =
    (persona.sueldoBrutoAcordado / 30) * (30 - persona.diasDeAusencia);
  persona.jubilacion = (persona.sueldoBrutoDelMes / 100) * 11;
  persona.ley27017 = (persona.sueldoBrutoDelMes / 100) * 3;
  persona.obraSocial = (persona.sueldoBrutoDelMes / 100) * 3;
  persona.neto =
    persona.sueldoBrutoDelMes -
    persona.jubilacion -
    persona.ley27017 -
    persona.obraSocial;

  return persona;
}

function mostrarResultados(persona) {
  const ul = document.createElement("ul");
  const h3 = document.createElement("h3");

  h3.innerHTML = persona.nombre;

  ul.appendChild(document.createElement("li")).innerHTML = `<strong>Jubilacion:</strong> $${persona.jubilacion}`;
  ul.appendChild(document.createElement("li")).innerHTML = `<strong>Ley 27017:</strong> $${persona.ley27017}`;
  ul.appendChild(document.createElement("li")).innerHTML = `<strong>Aporte a obra social:</strong> $${persona.obraSocial}`;
  ul.appendChild(document.createElement("li")).innerHTML =
    `<strong>Sueldo bruto del mes:</strong> $${persona.sueldoBrutoDelMes}`;
  ul.appendChild(document.createElement("li")).innerHTML = `<strong>Sueldo neto:</strong> $${persona.neto}`;

  document.querySelector("#result").appendChild(h3);
  document.querySelector("#result").appendChild(ul);
}

btnAdd.addEventListener("click", addNewPerson);
form.addEventListener("submit", handleSubmit);
