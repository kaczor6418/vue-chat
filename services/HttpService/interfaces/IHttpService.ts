import {HttpServiceResponse} from "./HttpServiceResponse";

export interface IHttpService {
    get<T>(url: string, options?: RequestInit): Promise<HttpServiceResponse<T>>
    post<T>(url: string, options?: RequestInit): Promise<HttpServiceResponse<T>>
}
