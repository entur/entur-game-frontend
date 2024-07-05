export function isTruthy<T>(thing: T | undefined | null): thing is T {
    return !!thing
}
