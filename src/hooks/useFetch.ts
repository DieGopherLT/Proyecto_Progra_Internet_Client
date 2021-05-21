interface FetchConfig{
    url: string;
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
    headers?: any;
    isString?: boolean;
}

/**
    @param config Configuración para la petición HTTP
*/
const useFetch = <T = string>(config: FetchConfig) => {

    const { url, method = 'GET', isString = false, headers } = config;

    type FetchBody = string | FormData | undefined;
    type PromiseType = T extends string ? string : T; //Esto es un tipo de dato condicional

    /**
        @param body Información enviada al servidor
    */
    const fetchData = async (body: FetchBody = undefined): Promise<PromiseType> => {
        const request = await fetch(url, {
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
