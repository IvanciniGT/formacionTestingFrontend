import { Animalito } from "../models/animalito";
import { AnimalitoViewModel } from "../models/animalito.view.model";

export class AnimalitosMapper {

    // Los mapeadores sirven de muralla de contención de cambios
    // Si hay un cambio en backend, con cambiar este archivo, controlo el 90% de los cambios que puedan producirse en la app

  static toViewModel(animalito: Animalito): AnimalitoViewModel {
    return new AnimalitoViewModel(
      animalito.id,
      animalito.nombre,
      animalito.especie,
      animalito.edad,
      animalito.raza,
      animalito.descripcion
    );
  }

  static toBackEnd(animalitoViewModel: AnimalitoViewModel): Animalito {
    return new Animalito(
      animalitoViewModel.id,
      animalitoViewModel.nombre,
      animalitoViewModel.especie,
      animalitoViewModel.edad,
      animalitoViewModel.raza,
      animalitoViewModel.descripcion
    );
  }

}