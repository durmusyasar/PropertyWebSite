import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  public success(message: string): void {
    alertyfy.success(message);
  }

  public warning(message: string): void {
    alertyfy.warning(message);
  }

  public error(message: string): void {
    alertyfy.error(message);
  }

}
