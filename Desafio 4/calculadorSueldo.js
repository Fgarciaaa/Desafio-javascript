function realizarCalculos(persona) {
    persona.sueldoBrutoDelMes = persona.sueldoBrutoAcordado / 30 * (30 - persona.diasDeAusencia);
    persona.jubilacion = persona.sueldoBrutoDelMes / 100 * 11;
    persona.ley27017 = persona.sueldoBrutoDelMes / 100 * 3;
    persona.obraSocial = persona.sueldoBrutoDelMes / 100 * 3;
    persona.neto = persona.sueldoBrutoDelMes - persona.jubilacion - persona.ley27017 - persona.obraSocial;
  
    return persona;
  }
  
  function mostrarResultados(persona) {
    console.log(`[${persona.nombre}]: Aporte a la jubilacion es: `, persona.jubilacion);
    console.log(`[${persona.nombre}]: Aporte a la ley 27017 es: `, persona.ley27017);
    console.log(`[${persona.nombre}]: Aporte a la obra social es: `, persona.obraSocial);
    console.log(`[${persona.nombre}]: Sueldo bruto acordado: `, persona.sueldoBrutoAcordado);
    console.log(`[${persona.nombre}]: Sueldo bruto del mes: `, persona.sueldoBrutoDelMes);
    console.log(`[${persona.nombre}]: Sueldo neto a cobrar es: `, persona.neto);
    console.log(`--------------------------------------------------`);
  
  }
  
  function iniciarSimulador() {
    const personas = [];
  
    let continuar = true;
  
    while (continuar) {
      const persona = {}
  
      persona.nombre = prompt("Ingrese su nombre");
      persona.sueldoBrutoAcordado = parseInt(prompt(`[${persona.nombre}]: Ingrese su sueldo Bruto acordado`));
      persona.diasDeAusencia = parseInt(prompt(`[${persona.nombre}]: Ingrese ausencias, dias por enfermedad, dias de ausencia, etc`));
  
      personas.push(realizarCalculos(persona));
  
      continuar = prompt("Desea agregar otra persona? Ingrese 'SI' para continuar").toLocaleUpperCase() === 'SI';
    }
  
    alert('Abri la consola para ver el detalle')
  
    personas.forEach((persona) => {
      mostrarResultados(persona);
    })
  
  }
  
  iniciarSimulador();
  
  
  
  
  