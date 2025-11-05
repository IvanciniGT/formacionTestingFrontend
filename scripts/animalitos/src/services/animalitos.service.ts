import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Animalito } from "../models/animalito";
import { AnimalitoViewModel } from "../models/animalito.view.model";
import { AnimalitosMapper } from "../mappers/animalitos.mapper";
import { Injectable } from "@angular/core";


export abstract class AnimalitosService {
    abstract getAnimalitos(): Observable<AnimalitoViewModel[]>;
    abstract createAnimalito(animalito: Animalito): Observable<AnimalitoViewModel>;
    abstract deleteAnimalito(id: number): Observable<void>;
    abstract updateAnimalito(animalito: Animalito): Observable<AnimalitoViewModel>;
    abstract getAnimalitoById(id: number): Observable<AnimalitoViewModel>;
}

@Injectable({
    providedIn: 'root'
})
export class AnimalitosServiceImpl extends AnimalitosService {
    // Lógica de comunicación con el backend para el crud de animalitos
    // Angular me ofrece un cliente para hacer peticiones HTTP a un backend
    // llamado HttpClient, que se encuentra en el módulo @angular/common/http
    // puedo solicitar ese cliente inyectándolo en el constructor de este servicio
    static readonly API_URL = 'https://localhost:3000/animalitos';

    constructor(private readonly http: HttpClient) {
        super();
      } // Patrón de inyección de dependencias
        // Angular, por ser un framework IoC, se encargará de darme una instancia de HttpClient

    getAnimalitos(): Observable<AnimalitoViewModel[]> {
        return this.http.get<Animalito[]>(AnimalitosServiceImpl.API_URL).pipe(
            map(animalitos => animalitos.map(AnimalitosMapper.toViewModel))
        );
    }

    createAnimalito(animalito: Animalito): Observable<AnimalitoViewModel> {
        return this.http.post<Animalito>(AnimalitosServiceImpl.API_URL, animalito).pipe(
            map(AnimalitosMapper.toViewModel)
        );
    }

    deleteAnimalito(id: number): Observable<void> {
        return this.http.delete<void>(`${AnimalitosServiceImpl.API_URL}/${id}`);
    }

    updateAnimalito(animalito: Animalito): Observable<AnimalitoViewModel> {
        return this.http.put<Animalito>(`${AnimalitosServiceImpl.API_URL}/${animalito.id}`, animalito).pipe(
            map(AnimalitosMapper.toViewModel)
        );
    }

    getAnimalitoById(id: number): Observable<AnimalitoViewModel> {
        return this.http.get<Animalito>(`${AnimalitosServiceImpl.API_URL}/${id}`).pipe(
            map(AnimalitosMapper.toViewModel)
        );
    }

}