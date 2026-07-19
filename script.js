let zipActual = null;


// ==========================
// ABRIR ZIP XFL
// ==========================

async function leerZIP(){

    const archivo =
    document.getElementById("zipFile").files[0];


    if(!archivo){
        alert("Selecciona un ZIP");
        return;
    }


    zipActual =
    await JSZip.loadAsync(archivo);



    const selector =
    document.getElementById("simbolos");


    selector.innerHTML="";


    let cantidad=0;



    for(const ruta in zipActual.files){


        let archivoZip =
        zipActual.files[ruta];


        if(
            !archivoZip.dir &&
            (
            ruta.toLowerCase().endsWith(".png") ||
            ruta.toLowerCase().endsWith(".jpg") ||
            ruta.toLowerCase().endsWith(".jpeg")
            )
        ){


            let opcion =
            document.createElement("option");


            opcion.value=ruta;


            opcion.textContent=ruta;


            selector.appendChild(opcion);


            cantidad++;

        }

    }



    document.getElementById("salida").textContent =

    "Proyecto cargado correctamente\n\n"+
    "Imágenes encontradas: "+
    cantidad;



    if(cantidad===0){

        document.getElementById("salida").textContent +=

        "\n\nNo se encontraron imágenes.\n"+
        "Este XFL usa gráficos vectoriales.";

    }

}



// ==========================
// EXPORTAR PNG
// ==========================

async function convertirPNG(){


    if(!zipActual){

        alert("Primero abre un ZIP");
        return;

    }



    const ruta =

    document.getElementById("simbolos").value;



    if(!ruta){

        alert("Selecciona una imagen");
        return;

    }



    const datos =

    await zipActual
    .file(ruta)
    .async("blob");



    const url =

    URL.createObjectURL(datos);



    const imagen =
    new Image();



    imagen.onload=function(){



        const canvas =
        document.getElementById("canvas");


        const ctx =
        canvas.getContext("2d");



        canvas.width =
        imagen.width;


        canvas.height =
        imagen.height;



        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );



        ctx.drawImage(
            imagen,
            0,
            0
        );



        const enlace =
        document.createElement("a");



        enlace.download =

        ruta
        .split("/")
        .pop();



        enlace.href =

        canvas.toDataURL(
            "image/png"
        );



        enlace.click();



        URL.revokeObjectURL(url);


    };



    imagen.src=url;


}
