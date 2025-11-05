export class Animalito {
  constructor(
    public id: number,
    public nombre: string,
    public especie: string,
    public edad: number,
    public raza: string,
    public descripcion: string
  ) {}
}

// Angular en automático cuando reciba el JSON del backend, En lugar de darme un JSON, me dará una instancia de esta clase Animalito.