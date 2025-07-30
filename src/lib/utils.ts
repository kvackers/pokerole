type Mode = 'sm' | 'md' | 'lg' | 'xl';

export const getMode = (width: any): Mode => {
    if (width >= 1280) { return 'xl'; }
    if (width >= 980) { return 'lg'; }
    if (width >= 800) { return 'md'; }
    return 'sm';
}

export const getWidth = (mode: Mode): string => {
    switch (mode) {
        case 'sm': return '360px';
        case 'md': return '720px';
        case 'lg': return '960px';
        case 'xl': return '1280px';
        default: return '100%';
    }
}

export const capitalize = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const sort = <T>(arr: Array<T>): Array<T> => {
    const copy = [...arr];
    copy.sort();

    return copy;
}