class XFLEdgeParser{

    constructor(ctx){

        this.ctx = ctx;

        this.scale = 0.05;

    }

    dibujar(cadena){

        let i = 0;

        while(i < cadena.length){

            const c = cadena[i];

            if(c=="!"){

                i++;

                const r = this.leerLinea(cadena,i);

                i = r.pos;

                this.linea(r);

            }

            else if(c=="["){

                i++;

                const r = this.leerCurva(cadena,i);

                i = r.pos;

                this.curva(r);

            }

            else{

                i++;

            }

        }

    }

    leerNumero(txt,pos){

        while(txt[pos]==" ") pos++;

        let n="";

        while(pos<txt.length){

            const c=txt[pos];

            if(
                c=="-" ||
                (c>="0" && c<="9")
            ){

                n+=c;
                pos++;

            }

            else{

                break;

            }

        }

        return{

            valor:Number(n),

            pos

        };

    }

    leerLinea(txt,pos){

        const x1=this.leerNumero(txt,pos);

        const y1=this.leerNumero(txt,x1.pos);

        pos=y1.pos;

        while(txt[pos]!="|") pos++;

        pos++;

        const x2=this.leerNumero(txt,pos);

        const y2=this.leerNumero(txt,x2.pos);

        return{

            x1:x1.valor,

            y1:y1.valor,

            x2:x2.valor,

            y2:y2.valor,

            pos:y2.pos

        };

    }

    leerCurva(txt,pos){

        const cx=this.leerNumero(txt,pos);

        const cy=this.leerNumero(txt,cx.pos);

        const x=this.leerNumero(txt,cy.pos);

        const y=this.leerNumero(txt,x.pos);

        return{

            cx:cx.valor,

            cy:cy.valor,

            x:x.valor,

            y:y.valor,

            pos:y.pos

        };

    }

    linea(d){

        this.ctx.beginPath();

        this.ctx.moveTo(

            d.x1*this.scale,

            -d.y1*this.scale

        );

        this.ctx.lineTo(

            d.x2*this.scale,

            -d.y2*this.scale

        );

        this.ctx.stroke();

    }

    curva(d){

        console.log("Curva encontrada",d);

    }

          }
