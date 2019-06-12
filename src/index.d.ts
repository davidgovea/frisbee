interface FrisbeeFetchOpts {
  headers?: object;
  body?: object;
  raw?: boolean;
  cache?: string; // "default"
  credentials?: string; // "same-origin"
  redirect?: string; // "follow"
  referrer?: string; // "client"
  signal?: any;
  mode?: string; // "same-origin"
}

type FetchArgs = [string, FrisbeeFetchOpts | undefined];

interface FrisbeeResponse extends Omit<Response, 'body'> {
  originalResponse: Response;
  data: object;
  body: string | object;
}

interface FrisbeeInterceptor {
  request?: (
    path: string,
    options: FrisbeeFetchOpts
  ) => [string, FrisbeeFetchOpts];
  requestError?: (err: Error) => any;
  response?: (response: FrisbeeResponse) => any;
  responseError?: (err: Error) => any;
}

interface FrisbeeOptions {
  baseURI: string;
  logRequest?: (path: string, opts: FrisbeeFetchOpts) => void;
  logResponse?: (
    path: string,
    opts: FrisbeeFetchOpts,
    response: FrisbeeResponse
  ) => void;
  auth?: any;
  parse?: {
    ignoreQueryPrefix?: boolean; // true
  };
  stringify?: {
    addQueryPrefix?: boolean; // true
    format?: string; // "RFC1738"
    arrayFormat?: string; // "indices"
  };
  preventBodyOnMethods?: string[] | false;
  interceptableMethods?: string[];
  abortToken?: Symbol;
}

type AuthArgs = [[string, string]] | [object] | [string] | [];

declare class Frisbee {
  public auth: (...args: AuthArgs) => this;
  public setOptions: (opts: FrisbeeOptions) => this;
  public jwt: (token: string) => this;
  public abort: (token: any) => this;
  public abortAll: () => this;

  public post: (
    path: string,
    options?: FrisbeeFetchOpts
  ) => Promise<FrisbeeResponse>;
  public get: (
    path: string,
    options?: FrisbeeFetchOpts
  ) => Promise<FrisbeeResponse>;
  put: (path: string, options?: FrisbeeFetchOpts) => Promise<FrisbeeResponse>;
  del: (path: string, options?: FrisbeeFetchOpts) => Promise<FrisbeeResponse>;
  delete: (
    path: string,
    options?: FrisbeeFetchOpts
  ) => Promise<FrisbeeResponse>;
  patch: (
    path: string,
    options?: FrisbeeFetchOpts
  ) => Promise<FrisbeeResponse>;
  public interceptor: {
    register: (interceptor: FrisbeeInterceptor) => void;
    unregister: (interceptor: FrisbeeInterceptor) => void;
    clear: () => void;
  };
  constructor(opts: FrisbeeOptions & FrisbeeFetchOpts);
}

export default Frisbee;
