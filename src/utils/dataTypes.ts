export type NoteResponseType = {
  body: string;
  created_at: string;
  id: string;
  title: string;
  updated_at: string;
};

export interface IResponse {
  data: IResponseData;
}

export interface IResponseData {
  notes: NoteResponseType[];
  page: number;
  page_size: number;
}

export interface request {
  body: string;
  title: string;
  id: string | null;
}

export type DebouncedFunction<F extends (...args: any[]) => any> = (
  ...args: Parameters<F>
) => void;
