interface FetchConfig{
    url: string;
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
    headers?: any;
    isString?: boolean;
}

const useFetch = <T = string>(config: FetchConfig) => {

    const { url, method = 'GET', isString = false, headers } = config;

    type FetchBody = string | FormData | undefined;
    type PromiseType = T extends string ? string : T; //Esto es un tipo de dato condicional

    /** @param body Acepta un string o FormData */
    const fetchData = async (body: FetchBody = undefined): Promise<PromiseType> => {
        const request: Response = await fetch(url, {
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


