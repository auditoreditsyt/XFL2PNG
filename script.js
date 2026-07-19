function leerXML(){

    const archivo =
    document.getElementById("xmlFile").files[0];

    if(!archivo){

        alert("Selecciona un XML");

        return;

    }

    const lector =
    new FileReader();

    lector.onload = function(e){

        const parser =
        new DOMParser();

        const xml =
        parser.parseFromString(
            e.target.result,
            "text/xml"
        );

        console.log(xml);

        document.getElementById("salida").textContent =
        e.target.result;

    };

    lector.readAsText(archivo);

}
