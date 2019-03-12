export class DiaObservaciones {
    dia: Date;
    abierto: boolean;
    observaciones: DocumentoObservacion[];
}

export class DocumentoObservacion {
    id?: number;
    observacion: string;
    respuesta: string;
    usuarioGestionId: number;
    usuarioGestion: string;
    seRespondio: boolean;
    usuarioRespuestaId?: number;
    usuarioRespuesta?: string;
    fechaRespuesta?: Date;
}
