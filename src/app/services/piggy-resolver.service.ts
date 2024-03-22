import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PiggyService } from './piggy.service';

@Injectable({
  providedIn: 'root',
})
export class PiggyResolver implements Resolve<any> {
  constructor(private piggyService: PiggyService) {}

  resolve(): Observable<any> {
    return this.piggyService.getPiggy();
  }
}
