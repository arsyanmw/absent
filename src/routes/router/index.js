import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../index,js";

export default function Router () {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((item, idx) => (
                    <Route key={idx} path={item.path} element={item.element} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}