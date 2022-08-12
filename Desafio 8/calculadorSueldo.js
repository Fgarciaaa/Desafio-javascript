function simulador() {
  const form = document.querySelector("#form");
  const inputsContainer = document.querySelector(".inputs-container");
  const btnAdd = document.querySelector("#btn-add");
  const btnDelete = document.querySelector("#btn-delete");

  btnDelete.addEventListener("click", clearStorage);
  btnAdd.addEventListener("click", addNewPerson);
  form.addEventListener("submit", handleSubmit);

  loadFromStorage();

  function addNewPerson() {
    const div = document.createElement("div");

    div.classList.add("person-container");
    div.innerHTML =
      '<div class="input-container"><label>Nombre:</label><input type="text" id="name" required /></div><div class="input-container"><label>Sueldo bruto acordado:</label><input type="number" id="salary" required /></div><div class="input-container"><label>Dias de ausencia:</label><input type="number" id="days-offs" required /></div>';

    inputsContainer.appendChild(div);
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.removeItem("personas");

    const personsDOM = document.querySelectorAll(".person-container");
    const personas = [];

    personsDOM.forEach((x) => {
      const persona = {};

      persona.nombre = x.querySelector("#name").value;
      persona.sueldoBrutoAcordado = parseInt(x.querySelector("#salary").value);
      persona.diasDeAusencia = parseInt(x.querySelector("#days-offs").value);

      personas.push(realizarCalculos(persona));
    });

    localStorage.setItem("personas", JSON.stringify(personas));

    mostrarResultados(personas);
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

  function mostrarResultados(personas) {
    Toastify({
      text: "Sueldos calculados correctamente",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();

    personas.forEach((persona) => {
      const ul = document.createElement("ul");
      const h3 = document.createElement("h3");

      h3.innerHTML = persona.nombre;

      ul.appendChild(
        document.createElement("li")
      ).innerHTML = `<strong>Jubilacion:</strong> $${persona.jubilacion}`;
      ul.appendChild(
        document.createElement("li")
      ).innerHTML = `<strong>Ley 27017:</strong> $${persona.ley27017}`;
      ul.appendChild(
        document.createElement("li")
      ).innerHTML = `<strong>Aporte a obra social:</strong> $${persona.obraSocial}`;
      ul.appendChild(
        document.createElement("li")
      ).innerHTML = `<strong>Sueldo bruto del mes:</strong> $${persona.sueldoBrutoDelMes}`;
      ul.appendChild(
        document.createElement("li")
      ).innerHTML = `<strong>Sueldo neto:</strong> $${persona.neto}`;

      document.querySelector("#result").appendChild(h3);
      document.querySelector("#result").appendChild(ul);
    });
  }

  function clearStorage() {
    localStorage.removeItem("personas");
    location.reload();
  }

  function loadFromStorage() {
    try {
      const personasStorage = localStorage.getItem("personas");
      if (!personasStorage) return;

      const personas = JSON.parse(personasStorage);

      personas.forEach(
        ({ sueldoBrutoAcordado, nombre, diasDeAusencia }, index) => {
          if (index !== 0) addNewPerson();

          const personsDOM = document.querySelectorAll(".person-container");

          personsDOM[index].querySelector("#name").value = nombre;
          personsDOM[index].querySelector("#salary").value =
            sueldoBrutoAcordado;
          personsDOM[index].querySelector("#days-offs").value = diasDeAusencia;
        }
      );

      mostrarResultados(personas);
    } catch (error) {
      console.error(
        "⛔️ Ups... hubo un problema al deserializar el localstorage.",
        error
      );
    }
  }
}

function contacto() {
  const form = document.querySelector("#form-contact");

  form.addEventListener("submit", handleSubmit);

  function sendEmail(email, consulta) {
    const data = {
      service_id: "service_ufmld2i",
      template_id: "template_hzr6fve",
      user_id: "IbyoP2cb6sFQbth8A",
      template_params: {
        email,
        consulta,
      },
    };

    return fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const btnSubmit = document.querySelector("#btn-submit-contact-form");
    const formData = new FormData(form);

    btnSubmit.textContent = "Procesando solicitud ...";
    btnSubmit.disabled = true;

    sendEmail(formData.get("email"), formData.get("consulta"))
      .then(() => {
        btnSubmit.textContent = "Enviar";
        btnSubmit.disabled = false;

        form.reset();
        alert(
          "Hemos recibido su consulta, nos podremos en contacto a la brevedad"
        );
      })
      .catch(() => {
        alert("Uppss, hubo un problema y no pudimos recibir tu consulta.");
      });
  }
}

simulador();
contacto();
