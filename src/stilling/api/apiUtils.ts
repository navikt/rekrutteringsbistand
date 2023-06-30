export class ApiError {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export const fetchGet = async (url: string): Promise<any> => {
    return request(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Cache-Control': 'no-cache, no-store',
        },
    });
};

export const fetchPost = async (url: string, body: object = {}) => {
    return request(url, {
        body: JSON.stringify(body),
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });
};

export const fetchPut = async (url: string, body: object) => {
    return request(url, {
        body: JSON.stringify(body),
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });
};

export const fetchDelete = async (url: string) => {
    return request(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });
};

const request = async (url: string, options?: RequestInit) => {
    let response: Response;

    try {
        response = await fetch(url, options);
    } catch (e) {
        throw new ApiError('Network Error', 0);
    }

    if (response.status === 401) {
        window.location.href = `/oauth2/login?redirect=${window.location.pathname}`;
    }

    if (response.status === 204) {
        return '';
    }

    if (response.status !== 200 && response.status !== 201) {
        throw new ApiError(response.statusText, response.status);
    }

    return response.json();
};
