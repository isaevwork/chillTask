export const classNames = (cls: string, mods: Record<string, string | boolean> = {}, additional: Array<string | undefined> = []) => {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([key]) => key)
    ]
        .filter(Boolean)
        .join(' ')
}
