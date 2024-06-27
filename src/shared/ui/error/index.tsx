import { useRouteError } from "react-router-dom";

export function Error() {
    const error = useRouteError();
    return <div>Error: {error}</div>;
}