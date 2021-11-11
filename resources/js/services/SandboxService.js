export default {
    parseUrl(url, params) {
        _.forEach(params, (uriParameter) => {
            url = url.replace("[/:"+uriParameter.name+"]","/"+uriParameter.example);
            url = url.replace("[:"+uriParameter.name+"]",uriParameter.example);
        });
        return url;
    }
}
