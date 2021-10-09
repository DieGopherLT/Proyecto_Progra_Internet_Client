type Domains =
    | 'https://samdt.000webhostapp.com/'
    | 'http://localhost:4000/'
    | 'https://progra-internet-server.herokuapp.com/'
    | 'https://cuceimobile.tech/Escuela/'

type Methods =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'

interface FetchConfig{
    domain: Domains
    path: string;
    method: Methods;
    headers?: any;
    isString?: boolean;
}


const useFetch = <T = string>(config: FetchConfig) => {

    const { domain, path, method, isString = false, headers } = config;

    type PromiseType = T extends string ? string : T; //This is a conditional data type.
    type FetchBody = string | FormData | undefined;

    const fetchData = async (body: FetchBody = undefined): Promise<PromiseType> => {
        const request = await fetch(`${domain}${path}`, {
            method,
            body,
            headers
        });

        return (isString) ? await request.text() : await request.json();
    }

    return [
        fetchData
    ];
}

export default useFetch;
