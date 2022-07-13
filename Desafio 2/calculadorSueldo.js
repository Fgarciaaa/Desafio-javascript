function calcularBruto(sueldo, diasDeAusencia) {
    return sueldo / 30 * (30 - diasDeAusencia)
}

function iniciarSimulador() {
    let sueldoBrutoAcordado = parseInt(prompt("Ingrese su sueldo Bruto acordado"));
    let diasDeAusencia = parseInt(prompt("Ingrese ausencias, dias por enfermedad, dias de ausencia, etc"));

    const sueldoBrutoDelMes = calcularBruto(sueldoBrutoAcordado, diasDeAusencia);


    console.log("sueldoBrutoDelMes", sueldoBrutoDelMes);

    const jubilacion = sueldoBrutoDelMes / 100 * 11;
    const ley27017 = sueldoBrutoDelMes / 100 * 3;
    const obraSocial = sueldoBrutoDelMes / 100 * 3;
    const neto = sueldoBrutoDelMes - jubilacion - ley27017 - obraSocial;

    console.log("Tu aporte a la jubilacion es: ", jubilacion);
    console.log("Tu aporte a la ley 27017 es: ", ley27017);
    console.log("Tu aporte a la obra social es: ", obraSocial);
    console.log("El sueldo neto a cobrar es: ", neto);

    alert("El sueldo neto a cobrar es: " + neto);
}

iniciarSimulador();




