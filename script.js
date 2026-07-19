async function leerZIP(){

    const archivo =
    document.getElementById("zipFile").files[0];

    if(!archivo){

        alert("Selecciona un ZIP");

        return;

    }

    const zip =
    await JSZip.loadAsync(archivo);

    let salida = "";

    let encontrado = false;

    zip.forEach(function(ruta, archivo){

        if(ruta.startsWith("LIBRARY/")){

            encontrado = true;

            salida += ruta + "\n";

        }

    });

    if(encontrado){

        document.getElementById("salida").textContent =
        salida;

    }else{

        document.getElementById("salida").textContent =
        "No se encontró la carpeta LIBRARY";

    }

}
