import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Agenda } from '../domain/agenda';

@Injectable()
export class agendaServicio {

    constructor(private http: HttpClient) { }

    getAgendas() {
        return this.http.get<any>('assets/agenda.json')
        .toPromise()
        .then(res => <Agenda[]>res.data)
        .then(data => { return data; });
    }
    
}