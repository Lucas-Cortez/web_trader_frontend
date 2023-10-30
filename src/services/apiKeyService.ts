export interface ApiKeyService {
  create(key: string, accessToken: string): Promise<string>;
  delete(accessToken: string): Promise<string>;
}
