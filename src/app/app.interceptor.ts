import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AppService } from './app.service';
// import { Observable } from 'rxjs';


@Injectable()
export class AppInterceptor  {

    constructor(private appService: AppService) { }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     const copiedReq = req.clone({ setHeaders: { Authorization: 'Bearer ' +  } });
    //     return next.handle(copiedReq);
    // }
}
