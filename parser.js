class XFLParser {

    constructor(zip){

        this.zip = zip;

    }

    obtenerArchivosXML(){

        const archivos = [];

        this.zip.forEach((ruta, archivo)=>{

            if(
                ruta.startsWith("LIBRARY/") &&
                ruta.endsWith(".xml")
            ){

                archivos.push({
                    nombre:ruta.split("/").pop(),
                    ruta:ruta,
                    archivo:archivo
                });

            }

        });

        return archivos;

    }

    async leerXML(ruta){

        const archivo = this.zip.file(ruta);

        if(!archivo){

            return null;

        }

        const texto =
        await archivo.async("string");

        const parser =
        new DOMParser();

        return parser.parseFromString(
            texto,
            "text/xml"
        );

    }

    obtenerDOMShapes(xml){

        return xml.getElementsByTagName(
            "DOMShape"
        );

    }

    obtenerEdges(xml){

        return xml.getElementsByTagName(
            "Edge"
        );

    }

    obtenerSolidColors(xml){

        return xml.getElementsByTagName(
            "SolidColor"
        );

    }

    obtenerFillStyles(xml){

        return xml.getElementsByTagName(
            "FillStyle"
        );

    }

}
