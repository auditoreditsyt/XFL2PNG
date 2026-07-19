function leerXML() {

    const archivo = document.getElementById("xmlFile").files[0];

    if (!archivo) {
        alert("Selecciona un XML");
        return;
    }

    const lector = new FileReader();

    lector.onload = function (e) {

        const parser = new DOMParser();

        const xml = parser.parseFromString(
            e.target.result,
            "text/xml"
        );

        const formas = xml.getElementsByTagName("DOMShape");
        const colores = xml.getElementsByTagName("SolidColor");

        let texto = "";

        texto += "DOMShape encontrados: " + formas.length + "\n";
        texto += "Colores encontrados: " + colores.length + "\n\n";

        for (let i = 0; i < colores.length; i++) {

            texto += "Color " + (i + 1) + ": ";
            texto += colores[i].getAttribute("color") + "\n";

        }

        document.getElementById("salida").textContent = texto;

    };

    lector.readAsText(archivo);

}
