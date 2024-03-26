import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ObligatoryService } from './obligatory.service';

@Injectable({
  providedIn: 'root',
})
export class ObligatoryResolver implements Resolve<any> {
  constructor(private obligatoryService: ObligatoryService) {}

  resolve(): Observable<any> {
    return this.obligatoryService.get();
  }
}
