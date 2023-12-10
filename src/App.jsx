import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import CreatePage from "./pages/CreatePage";
import PostsPage from "./pages/PostsPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UpdatePage from "./pages/UpdatePage";

function App() {
    const [showLoader, setShowLoader] = useState(true); // default value of the loader is true (loader displayed)
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); // default value comes from localStorage

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
                //user is authenticated / signed in
                console.log(user);
                setIsAuth(true); // set isAuth to true
                localStorage.setItem("isAuth", true); // also, save isAuth in localStorage
            } else {
                // user is not authenticated / not signed in
                setIsAuth(false); // set isAuth to false
                localStorage.removeItem("isAuth"); // remove isAuth from localStorage
            }
        });
    }, []);

    return (
        <main>
            {showLoader && <Loader />} {/* if showLoader is true, display the loader */}
            {isAuth && <Nav />} {/* if isAuth is true, display the nav */}
            <Routes>
                <Route
                    path="/"
                    // if isAuth is true, display the PostsPage, else redirect to sign-in
                    element={isAuth ? <PostsPage showLoader={setShowLoader} /> : <Navigate to="/sign-in" />}
                />
                <Route
                    path="/create"
                    // if isAuth is true, display the CreatePage, else redirect to sign-in
                    element={isAuth ? <CreatePage showLoader={setShowLoader} /> : <Navigate to="/sign-in" />}
                />
                <Route
                    path="/posts/:id"
                    // if isAuth is true, display the UpdatePage, else redirect to sign-in
                    element={isAuth ? <UpdatePage showLoader={setShowLoader} /> : <Navigate to="/sign-in" />}
                />
                <Route
                    path="/profile"
                    // if isAuth is true, display the ProfilePage, else redirect to sign-in
                    element={isAuth ? <ProfilePage showLoader={setShowLoader} /> : <Navigate to="/sign-in" />}
                />
                <Route
                    path="/sign-in"
                    // if isAuth is true, redirect to home, else display the SignInPage
                    element={isAuth ? <Navigate to="/" /> : <SignInPage showLoader={setShowLoader} />}
                />
                <Route
                    path="/sign-up"
                    // if isAuth is true, redirect to home, else display the SignUpPage
                    element={isAuth ? <Navigate to="/" /> : <SignUpPage showLoader={setShowLoader} />}
                />
                <Route
                    path="*"
                    // if no route matches, redirect to home
                    element={<Navigate to="/" />}
                />
            </Routes>
        </main>
    );
}

export default App;
