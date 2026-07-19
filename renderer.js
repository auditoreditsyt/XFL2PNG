class XFLRenderer{

    constructor(){

        this.canvas = new XFLCanvas();

    }

    async renderXML(parser,ruta){

        const xml = await parser.leerXML(ruta);

        if(!xml){

            console.log("No se pudo leer",ruta);

            return null;

        }

        const shapes = parser.obtenerDOMShapes(xml);

        if(shapes.length==0){

            console.log("Sin DOMShape",ruta);

            return null;

        }

        this.canvas.limpiar();

        for(let i=0;i<shapes.length;i++){

            this.renderShape(shapes[i]);

        }

        return this.canvas.canvas;

    }

    renderShape(shape){

        const fills = shape.getElementsByTagName("FillStyle");

        if(fills.length){

            const solid =
            fills[0].getElementsByTagName("SolidColor");

            if(solid.length){

                const color =
                solid[0].getAttribute("color");

                if(color){

                    this.canvas.color(color);

                }else{

                    this
