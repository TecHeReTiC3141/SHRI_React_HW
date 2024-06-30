export function setSearchParams(searchParams, name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "0") {
        params.set(name, value);
    } else {
        params.delete(name);
    }
    return params.toString();
}