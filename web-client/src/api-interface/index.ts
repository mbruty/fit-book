import { reactive } from 'vue';

interface dependencyState<T> {
  loading: boolean,
  errors: string,
  ok: boolean,
  data: T | null
}

// Eslint doesn't like these enums

// eslint-disable-next-line
enum RequestTypes {
  get,
  post,
  put,
  delete
}

interface IEndpoint {
  type: RequestTypes,
  slug: string,
}

export const Endpoints: Record<string, IEndpoint> = {
  me: { type: RequestTypes.get, slug: 'auth/me' },
  login: { type: RequestTypes.post, slug: 'auth/login' },
  signup: { type: RequestTypes.post, slug: 'auth/create' },
};

function getResolver<T>(endpoint: IEndpoint, state: dependencyState<T>, _: unknown) {
  const reactiveState = reactive<dependencyState<T>>(state);
  const fetchData = async () => {
    state.loading = true;
    try {
      const raw = await fetch(`http://localhost:4000/api/${endpoint.slug}`, { credentials: 'include' });
      const json = await raw.json();
      state.errors = '';
      state.ok = true;
      state.data = json;
    } catch (e) {
      state.errors = e;
      state.ok = false;
    }
    state.loading = false;
  };
  return { state: reactiveState, fetchData };
}

function postResolver<T>(endpoint: IEndpoint, state: dependencyState<T>, data: unknown) {
  const reactiveState = reactive<dependencyState<T>>(state);
  const fetchData = async () => {
    state.loading = true;
    await fetch(`http://localhost:4000/api/${endpoint.slug}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    });
  };
  return { state: reactiveState, fetchData };
}

function getRequestFunction(type: RequestTypes) {
  switch (type) {
    case RequestTypes.get:
      return getResolver;
    case RequestTypes.post:
      return postResolver;
    case RequestTypes.put:
      return getResolver;
    case RequestTypes.delete:
      return getResolver;
    default:
      return getResolver; // We sould not hit this, but eslint isn't liking a missing default
  }
}

export function dependencyResolver<T>(endpoint: IEndpoint, data?: unknown) {
  const reactiveState: dependencyState<T> = {
    loading: false,
    errors: '',
    ok: false,
    data: null,
  };

  const func = getRequestFunction(endpoint.type);
  return func<T>(endpoint, reactiveState, data);
}
