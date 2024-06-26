import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
  let userToken="78|UIPKrQnEXSxLwqKMqYeAXReKClvrNswaILSvZINB46005999";

    let token = req.clone({
      setHeaders: {
        Authorization: "Bearer" + userToken,
      }
    })
    return next.handle(token);
  }
}
