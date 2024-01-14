import { DebouncedFunction, IResponse, NoteResponseType } from "./dataTypes";

const url: string = "https://flaskproject-note.onrender.com/api/v1/";

export async function getFetchData<T>(path: string): Promise<T> {
  try {
    const response: Response = await fetch(`${url}${path}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: IResponse = (await response.json()) as IResponse;
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData: IResponse = (await response.json()) as IResponse;
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData: IResponse = (await response.json()) as IResponse;
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
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData: IResponse = (await response.json()) as IResponse;
    return responseData as T;
  } catch (error) {
    throw error;
  }
}

export function formatDate(inputDate: string): string {
  const dateObject = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return dateObject.toLocaleDateString("en-US", options);
}

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number,
): DebouncedFunction<F> {
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

export function filterData(
  notes: NoteResponseType[] | undefined,
  index: number,
) {
  if (notes) {
    const navs = ["view", "edit", "important"];
    return notes.filter((value: NoteResponseType) => {
      if (index === 0) {
        return true;
      } else if (index > 0) {
        let item: string = localStorage.getItem(navs[index - 1]) ?? "[]";
        let parse: Array<string> = JSON.parse(item);
        return parse.includes(value.id);
      }
    });
  }
  return [];
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  const interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval === 1 ? '' : 's'} ago`;
  }

  const months = Math.floor(seconds / 2592000);
  if (months >= 1) {
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }

  const days = Math.floor(seconds / 86400);
  if (days >= 1) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  const hours = Math.floor(seconds / 3600);
  if (hours >= 1) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes >= 1) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }

  return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
}
