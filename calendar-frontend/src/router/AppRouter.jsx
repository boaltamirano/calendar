import { Navigate, Route, Routes } from "react-router-dom";
import { CalendarPages } from "../calendar";
import { LoginPage } from "../auth";

export const AppRouter = () => {

    const authStatus = 'not-authenticated';

    return (
        <Routes>
            {
                ( authStatus === 'not-authenticated')
                ? <Route path="/auth/*" element={ <LoginPage /> }/>
                : <Route path="/*" element={ <CalendarPages /> }/>
            }

            <Route path="/*" element={ <Navigate to="/auth/login"/> } />
            
        </Routes>
    )
}
