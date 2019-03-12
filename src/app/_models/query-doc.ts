export class QueryDoc {
    serieId?: number;
    direccionId?: number;
    direccionesDestinos?: number[];
    usuarioCreadorId?: number;
    estadoId?: number;
    usuarioPendienteId?: number;
    fechaInicio?: Date;
    fechaFin?: Date;
    searchTerm?: string;

    constructor() {
        this.direccionesDestinos = [];
    }
}
