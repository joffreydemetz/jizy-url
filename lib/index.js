export default class jUrl {
    constructor(basePath) {
        this.setBasePath(basePath || '/');
    }

    setBasePath(basePath) {
        this.basePath = basePath ? basePath.replace(/\/+$/, '') + '/' : '/';
        return this;
    }

    make(path = '', vars = null) {
        path = typeof path === 'string' ? path.replace(/^\/+|\/+$/g, '') : '';

        let url = this.basePath + path;

        if (vars) {
            url += this.toQueryString(vars);
        }

        return url;
    }

    toQueryString(vars) {
        const params = [];
        for (let key in vars) {
            if (Array.isArray(vars[key])) {
                for (let val of vars[key]) {
                    params.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`);
                }
            } else {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(vars[key])}`);
            }
        }
        return params.length ? '?' + params.join('&') : '';
    }
};
