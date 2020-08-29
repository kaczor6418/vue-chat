export namespace UTILS {
    export function isNullOrUndefined(value: unknown): value is null | undefined {
        return value == null;
    }
}
