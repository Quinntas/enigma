export class Logger {
    debug<T extends object>(obj: T): void {
        console.dir(obj, {depth: 5});
    }

    error<T extends Error>(error: T): void {
        console.error(error);
    }

    info(message: string, ...values: any[]): void {
        console.log(message, ...values);
    }

    warn(message: string, ...values: any[]): void {
        console.warn(message, ...values);
    }
}
