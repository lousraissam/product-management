export interface UseCase<IRequest, IResponse> {
    excute(request?: IRequest): Promise<IResponse>;
}