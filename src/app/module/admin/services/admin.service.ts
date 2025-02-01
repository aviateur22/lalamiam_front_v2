import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfessionalToActivate } from '../models/admin.model';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/store/state';
import backendUrl from 'src/misc/backend.url';
import { IProfessionalsToActivateListDto } from '../models/admin.dto';
import { ProfessionalToActivateMapper } from '../mappers/model.mapper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient, private _store: Store<IAppState>, private _mapper: ProfessionalToActivateMapper) { }

  /**
   * Récupération liste des professionnels a activer
   * @returns
   */
  public professionalToActivateList(): Observable<ProfessionalToActivate[]> {
    return this._http.get<IProfessionalsToActivateListDto>(this.apiPath(backendUrl.adminGetProfessionalToActivate)).pipe(
      map(dtos=>dtos.professionals.map(dto=>this._mapper.mapToProfessionalToActivate(dto)))
    )
  }

  private apiPath(endPoint: string): string {
      return environment.api_base + endPoint
    }
}
