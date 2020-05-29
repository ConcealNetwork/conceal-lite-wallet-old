// Angular Core
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isFullScreen: boolean;
  isLoggedIn: boolean;
}