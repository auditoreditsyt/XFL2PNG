class XFLCanvas{

    constructor(){

        this.canvas = document.createElement("canvas");

        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = 2048;

        this.canvas.height = 2048;

        this.ctx.imageSmoothingEnabled = false;

        this.limpiar();

    }

    limpiar(){

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }

    tamaño(ancho,alto){

        this.canvas.width = ancho;

        this.canvas.height = alto;

        this.ctx.imageSmoothingEnabled = false;

    }

    color(color){

        this.ctx.fillStyle = color;

        this.ctx.strokeStyle = color;

    }

    linea(x1,y1,x2,y2){

        this.ctx.beginPath();

        this.ctx.moveTo(x1,y1);

        this.ctx.lineTo(x2,y2);

        this.ctx.stroke();

    }

    curva(x1,y1,cx,cy,x2,y2){

        this.ctx.beginPath();

        this.ctx.moveTo(x1,y1);

        this.ctx.quadraticCurveTo(
            cx,
            cy,
            x2,
            y2
        );

        this.ctx.stroke();

    }

    poligono(puntos){

        if(puntos.length==0){

            return;

        }

        this.ctx.beginPath();

        this.ctx.moveTo(
            puntos[0].x,
            puntos[0].y
        );

        for(let i=1;i<puntos.length;i++){

            this.ctx.lineTo(
                puntos[i].x,
                puntos[i].y
            );

        }

        this.ctx.closePath();

        this.ctx.fill();

    }

    obtenerPNG(){

        return this.canvas.toDataURL("image/png");

    }

    descargar(nombre){

        const enlace =
        document.createElement("a");

        enlace.download =
        nombre;

        enlace.href =
        this.obtenerPNG();

        enlace.click();

    }

}
