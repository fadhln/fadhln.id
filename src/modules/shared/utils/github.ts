const GITHUB_URL = "https://github.com/fadhln/fadhln.id";

export function githubFilePathGen(filePath: string) {
  return `${GITHUB_URL}/blob/main/${filePath}`;
}
