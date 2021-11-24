export class SandboxService {
    async makeCallOnRoute(request) {
        let postParams = this.getRequestParams(request.postParams);
        let queryParams = this.getRequestParams(request.uriParams);
        let headers = this.getHeaders(request.headers);
        let options = {
            method: request.method,
            url: request.url,
            data: postParams,
            params: queryParams,
            headers: headers
        };

        return  axios(options);
    }
    getHeaders(headers)
    {
        let params = {};
        headers.forEach((param)=>{
            params[param.name] = param.value;
        })
        return params;
    }
    getRequestParams(requestParams)
    {
        let params = {};
        requestParams.forEach((param)=>{
            params[param.name] = param.example;
        })
        return params;
    }
}