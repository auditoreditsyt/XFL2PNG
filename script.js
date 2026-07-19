let zipActual = null;



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



    let cantidad = 0;


    for(const ruta in zipActual.files){


        if(
            ruta.startsWith("LIBRARY/") &&
            ruta.endsWith(".xml")
        ){


            let opcion =
            document.createElement("option");


            opcion.value = ruta;

            opcion.textContent = ruta;


            selector.appendChild(opcion);


            cantidad++;


        }


    }



    document.getElementById("salida").textContent =

    "Proyecto cargado correctamente\n\n" +

    "XML encontrados: " + cantidad;



}





async function convertirPNG(){



    if(!zipActual){

        alert("Primero abre un ZIP");
        return;

    }



    const archivoXML =

    document.getElementById("simbolos").value;



    if(!archivoXML){

        alert("Selecciona un símbolo");
        return;

    }



    const contenido =

    await zipActual
    .file(archivoXML)
    .async("string");



    const canvas =

    document.getElementById("canvas");



    const ctx =

    canvas.getContext("2d");



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    ctx.fillStyle="black";

    ctx.font="20px Arial";


    ctx.fillText(
        "XFL2PNG",
        20,
        40
    );



    ctx.font="14px Arial";



    let lineas =
    contenido.substring(0,2000)
    .match(/.{1,80}/g);



    if(lineas){


        lineas.forEach(
            (linea,i)=>{

                ctx.fillText(
                    linea,
                    20,
                    80 + i*18
                );

            }
        );


    }



    const enlace =
    document.createElement("a");



    enlace.download =

    archivoXML
    .split("/")
    .pop()
    .replace(".xml",".png");



    enlace.href =

    canvas.toDataURL("image/png");



    enlace.click();



}
