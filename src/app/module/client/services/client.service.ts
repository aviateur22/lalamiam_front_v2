import { Injectable } from '@angular/core';
import { IClientRegisterAsProfessionalDto } from '../models/client.dto';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IResponseDto } from 'src/app/model/response.dto';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/store/state';
import * as CommonActions from "../../common/store/action";
import { StorageService } from '../../common/service/storage.service';
import { UserStatusService } from '../../common/service/user.status.service';
import { apiPath, getFormData } from 'src/app/helpers/service.helper';
import backendUrl from 'src/misc/backend.url';
import { FlashMessage } from '../../common/model/common.model';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private _storageService: StorageService,
    private _http: HttpClient,
    private _store: Store<IAppState>,
    private _userStatustService: UserStatusService) { }

  clientRegisterAsProfessional(clientRegisterAsProfessionalDto: IClientRegisterAsProfessionalDto,  file1: File, file2: File): Observable<IResponseDto> {

      // Convertion données en formData
    const formData: FormData = getFormData(clientRegisterAsProfessionalDto, file1, file2);
debugger
    return this._http.post<IResponseDto>(apiPath(backendUrl.clientRegisterAsProfessional), clientRegisterAsProfessionalDto).pipe(
      map(responseDto=>{
        this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(responseDto.responseMessage, false)}));
        return responseDto;
      }),
      catchError(error => {
        const errorMessage: string = error.error.error;
        this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}))
        return throwError(() => error);
      })
    );
  }
}
