import {DebouncedFunction, IResponse} from "./dataTypes";

const url:string = "http://127.0.0.1:5000/api/v1/";

export async function getFetchData<T>(path:string): Promise<T> {
    try {
        const response:Response = await fetch(`${url}${path}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data:IResponse = await response.json() as IResponse;
        return data as T;
    } catch (error) {
        throw error;
    }
}

export async function postFetchData<T, U>(path: string, data: U): Promise<T> {
    try {
        const response: Response = await fetch(`${url}${path}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: IResponse = await response.json() as IResponse;
        return responseData as T;
    } catch (error) {
        throw error;
    }
}

export async function patchFetchData<T, U>(path: string, data: U): Promise<T> {
    try {
        const response: Response = await fetch(`${url}${path}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: IResponse = await response.json() as IResponse;
        return responseData as T;
    } catch (error) {
        throw error;
    }
}
export async function deleteFetchData<T>(path: string): Promise<T> {
    try {
        const response: Response = await fetch(`${url}${path}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: IResponse = await response.json() as IResponse;
        return responseData as T;
    } catch (error) {
        throw error;
    }
}

export function formatDate(inputDate: string): string {
    const dateObject = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return dateObject.toLocaleDateString('en-US', options);
}


export function debounce<F extends (...args: any[]) => any>(func: F, delay: number): DebouncedFunction<F> {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return function debounced(...args: Parameters<F>): void {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = undefined;
        }, delay);
    };
}