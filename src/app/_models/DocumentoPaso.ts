export class DocumentoPaso {
    id: number;
    usuario: string;
    nombreCompleto: string;
    paso: string;
    dias?: number;
    observacion: string;
    soyYo: boolean;
    fechaInicio: Date;
    fechaFin?: Date;
    estado: string;
}
