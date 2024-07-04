type Maybe<T> = T | undefined | null

export function sortNumber(a: Maybe<number>, b: Maybe<number>) {
    if (typeof a !== 'number' && typeof b !== 'number') {
        return 0
    }

    if (typeof a !== 'number') {
        return -1
    }

    if (typeof b !== 'number') {
        return 1
    }

    return b - a
}
