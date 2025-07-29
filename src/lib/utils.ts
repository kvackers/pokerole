type Mode = 'sm' | 'md' | 'lg' | 'xl';

export const getMode = (width: any): Mode => {
    if (width >= 1280) { return 'xl'; }
    if (width >= 960) { return 'lg'; }
    if (width > 640) { return 'md'; }
    return 'sm';
}

export const getWidth = (mode: Mode): string => {
    switch (mode) {
        case 'sm': return '100%';
        case 'md': return '640px';
        case 'lg': return '960px';
        case 'xl': return '1280px';
        default: return '100%';
    }
}