export interface ApiKeyService {
  create(api: { key: string; secret: string }, accessToken: string): Promise<string>;
  delete(accessToken: string): Promise<string>;
}
