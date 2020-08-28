export interface HttpServiceResponse<T> {
    response: Response;
    resource: T | null;
}
