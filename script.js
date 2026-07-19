async function leerZIP(){

    const archivo =
    document.getElementById("zipFile").files[0];


    if(!archivo){

        alert("Selecciona un ZIP");

        return;

    }


    const zip =
    await JSZip.loadAsync(archivo);


    let simbolos = [];


    for (const ruta in zip.files){


        if(
            ruta.startsWith("LIBRARY/") &&
            ruta.endsWith(".xml") &&
            !ruta.includes("/")
                .toString()
        ){

            simbolos.push(ruta);

        }


    }


    // Buscar todos los XML dentro de LIBRARY
    simbolos = [];


    for (const ruta in zip.files){

        if(
            ruta.startsWith("LIBRARY/") &&
            ruta.endsWith(".xml")
        ){

            simbolos.push(ruta);

        }

    }


    let salida = "";

    salida += "PROYECTO XFL DETECTADO\n\n";

    salida += "Símbolos encontrados:\n\n";


    simbolos.forEach(function(nombre){

        salida += "✔ " + nombre + "\n";

    });


    salida += "\n\nTotal XML: " + simbolos.length;


    document.getElementById("salida").textContent =
    salida;


}
