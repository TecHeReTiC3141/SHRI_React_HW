import { useRouteError } from "react-router-dom";

export function Error() {
    const error = useRouteError();
    console.error(error);
    return <div>Error: {error.message}</div>;
}