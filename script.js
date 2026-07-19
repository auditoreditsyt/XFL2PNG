async function leerZIP(){

    const archivo = document.getElementById("zipFile").files[0];

    if(!archivo){

        alert("Selecciona un ZIP");

        return;

    }

    const zip = await JSZip.loadAsync(archivo);

    const parser = new XFLParser(zip);

    const renderer = new XFLRenderer();

    const archivos = parser.obtenerArchivosXML();

    let salida = "";

    for(const item of archivos){

        salida += item.ruta + "\n";

        try{

            const canvas = await renderer.renderXML(
                parser,
                item.ruta
            );

            if(canvas){

                document.body.appendChild(document.createElement("hr"));

                const titulo = document.createElement("h3");

                titulo.textContent = item.nombre;

                document.body.appendChild(titulo);

                document.body.appendChild(canvas);

            }

        }

        catch(e){

            console.error(item.ruta,e);

        }

    }

    document.getElementById("salida").textContent = salida;

}
