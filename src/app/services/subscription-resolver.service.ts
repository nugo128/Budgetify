import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SubscriptionService } from './subscription.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionResolver implements Resolve<any> {
  constructor(private subscriptionService: SubscriptionService) {}

  resolve(): Observable<any> {
    return this.subscriptionService.getSubscriptions();
  }
}
