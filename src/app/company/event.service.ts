import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DayPilot} from "daypilot-pro-angular";
import {environment} from "../../environments/environment";
import {DtoInputEvents} from "./dtos/dto-input-events";
import {ManagementService} from "../util/management/management.service";
import {DtoOutputUpdateEvents} from "./dtos/dto-output-update-events";
import {DtoOutputCreateEvents} from "./dtos/dto-output-create-events";
import {DtoInputEmployee} from "../util/management/dtos/dto-input-employee";
import {DtoOutputDeleteEvents} from "./dtos/dto-output-delete-events";
import {DtoInputEventTypes} from "./dtos/dto-input-eventTypes";
import {DtoInputEmployeeOfCompany} from "./dtos/dto-input-employee-of-company";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private static readonly ENTRY_POINT = environment.apiUrlEvents;

  constructor(private _httpClient: HttpClient) {
  }

  createEvent(dto: DtoOutputCreateEvents, idCompanies: string): Observable<DtoInputEvents> {
    return this._httpClient.post<DtoInputEvents>(`${EventService.ENTRY_POINT}/create/${idCompanies}`, {events: dto});
  }

  updateEvent(dto: DtoOutputUpdateEvents, idCompanies: string): Observable<any> {
    return this._httpClient.put(EventService.ENTRY_POINT + "/update/" + idCompanies, dto);
  }

  deleteEvent(dto: DtoOutputDeleteEvents, idCompanies: string): Observable<any> {
    return this._httpClient.delete(`${EventService.ENTRY_POINT}/delete/` + dto.idEventsEmployee + "/" + idCompanies);
  }

  fetchEventById(id: string): Observable<DtoInputEvents> {
    return this._httpClient.get<DtoInputEvents>(EventService.ENTRY_POINT + "/fetch/" + id);
  }

  fetchAllEventTypes(): Observable<DtoInputEventTypes[]> {
    return this._httpClient.get<DtoInputEventTypes[]>(environment.apiUrlEventTypes + "/fetch/all");
  }

  fetchEventsFromTo(id: number, from: DayPilot.Date, to: DayPilot.Date): Observable<DtoInputEvents[]> {
    return this._httpClient.get<DtoInputEvents[]>(EventService.ENTRY_POINT + "/fetch/" + id + "/" + from + "/" + to);
  }

    fetchEventsFromToAccount(id: number, idAccount: number, from: DayPilot.Date | undefined, to: DayPilot.Date): Observable<DtoInputEvents[]> {
    return this._httpClient.get<DtoInputEvents[]>(EventService.ENTRY_POINT + "/fetch/" + id + "/" + idAccount + "/" + from + "/" + to);
  }

  fetchAllEmployees(id: number): Observable<DtoInputEmployeeOfCompany[]> {
    return this._httpClient.get<DtoInputEmployeeOfCompany[]>(environment.apiUrlHas + "/fetchCompanies/" + id);
  }

  fetchEmployeeById(id: number): Observable<DtoInputEmployee> {
    return this._httpClient.get<DtoInputEmployee>(`${ManagementService.ENTRY_POINT}/fetch/${id}`);
  }

  fetchByEmployee(id: number): Observable<DtoInputEvents> {
    return this._httpClient.get<DtoInputEvents>(EventService.ENTRY_POINT + "/fetch/employee/" + id);
  }

  fetchHasAccount(id: number): Observable<any>{
    return this._httpClient.get<any>(environment.apiUrlHas + "/fetchAccount/" + id);
  }
}
