export function constructFullPath(prefix: string, routePath: string): string {
    return prefix === '/' || prefix === '' ? routePath : routePath === '/' ? prefix : `${prefix}${routePath}`;
}