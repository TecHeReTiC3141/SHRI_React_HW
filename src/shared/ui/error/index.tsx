import { useRouteError } from "react-router-dom";

export function Error() {
    const error = useRouteError();
    console.log(error);
    return <div>Error: {error.message}</div>;
}