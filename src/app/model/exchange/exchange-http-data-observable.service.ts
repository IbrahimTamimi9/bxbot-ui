import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {AppComponent} from "../../app.component";
import {ExchangeDataObservableService} from "./exchange-data-observable.service";
import {AuthenticationService} from "../../shared";
import {Exchange} from "./exchange.model";
import {Observable} from 'rxjs/Observable';
import {isObject} from "rxjs/util/isObject";

// Most RxJS operators are not included in Angular's base Observable implementation.
// The base implementation includes only what Angular itself requires.
// If you want more RxJS features, you need to explicitly import rxjs operators, else you get runtime error, e.g.
// 'Failed: this.http.put(...).map is not a function'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

/**
 * HTTP implementation of the Exchange Data Service.
 *
 * It demonstrates use of Observables in call responses.
 *
 * An Observable is a stream of events that can be processed with array-like operators.
 * Angular uses the RxJS library to provide basic support for Observables.
 *
 * Observables are useful if you start a request, cancel it, and then make a different request before the server has
 * responded to the first request. This request-cancel-new-request sequence is difficult to implement with Promises.
 *
 * @author gazbert
 */
@Injectable()
export class ExchangeHttpDataObservableService implements ExchangeDataObservableService {

    private exchangeUrl = AppComponent.REST_API_BASE_URL + 'exchanges';

    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getExchanges(): Observable<Exchange[]> {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });

        return this.http.get(this.exchangeUrl, {headers: headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    getExchange(id: string): Observable<Exchange> {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });

        return this.http
            .get(this.exchangeUrl + '/' + id, {headers: headers})
            .map((r: Response) => r.json().data as Exchange)
            // .map(this.extractData)
            .catch(this.handleError);
    }

    getExchangeByName(name: string): Observable<Exchange[]> {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });

        return this.http
            .get(this.exchangeUrl + '/?name=' + name, {headers: headers})
            .map(this.extractData)
            // .map((r: Response) => r.json().data as Exchange[])
            .catch(this.handleError);
    }

    update(exchange: Exchange): Observable<Exchange> {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });

        const url = `${this.exchangeUrl}/${exchange.id}`;
        let body = JSON.stringify(exchange);
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        // Redirect to friendly error page?
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        if (isObject(body)) { // vs // if (body !== undefined && body !== null) {
            return body.data || {};
        } else {
            return {};
        }
    }
}
