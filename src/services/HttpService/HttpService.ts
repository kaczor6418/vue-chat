import { IHttpService } from './interfaces/IHttpService';
import { HttpRequestMethods } from './interfaces/HttpRequestMethods';
import { HttpServiceResponse } from './interfaces/HttpServiceResponse';

export class HttpService implements IHttpService {
    private readonly baseUrl: string;
    private url = '';
    private options: RequestInit = {};

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get<T>(url: string, options: RequestInit = {}): Promise<HttpServiceResponse<T>> {
        options.method = HttpRequestMethods.GET;
        this.setRequestUrlAndOptions(url, options);
        return await this.getRequestResponse();
    }

    public async post<T>(url: string, options: RequestInit = {}): Promise<HttpServiceResponse<T>> {
        options.method = HttpRequestMethods.POST;
        this.setRequestUrlAndOptions(url, options);
        return await this.getRequestResponse();
    }

    private setRequestUrlAndOptions(url: string, options: RequestInit = {}): void {
        this.url = `${this.baseUrl}/${url}`;
        this.options = options;
    }

    private async getRequestResponse<T>(): Promise<HttpServiceResponse<T>> {
        const response: Response = await fetch(this.url, this.options);
        if (this.isValidResponse(response)) {
            const resource: T = await response.json();
            return {
                resource,
                response
            };
        }
        return {
            resource: null,
            response
        };
    }

    private isValidResponse({ status }: Response): boolean {
        if (status >= 200 && status < 400) {
            return true;
        }
        console.error(`Could not fetch data from url: ${this.url}. Request finished with status code: ${status}`);
        return false;
    }
}
