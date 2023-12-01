import React from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import { loader as vansLoader } from "./loaders/vansLoader";
import VanDetail from "./pages/Vans/VanDetail";
import { loader as vanDetailLoader } from "./loaders/vanDetailLoader";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";

import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import { loader as dashBoardLoader } from "./loaders/dashBoardLoader";
import Income from "./pages/Host/Income";
import { loader as incomeLoader } from "./loaders/incomeLoader";
import HostVans from "./pages/Host/HostVans";
import { loader as hostVansLoader } from "./loaders/hostVansLoader";
import HostVanDetail from "./pages/Host/HostVanDetail";
import { loader as hostVanDetailLoader } from "./loaders/hostVanDetailLoader";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import HostVanPricing from "./pages/Host/HostVanPricing";
import Reviews from "./pages/Host/Reviews";
import { loader as reviewsLoader } from "./loaders/reviewsLoader";

import { requireAuth } from "./utils/requireAuth";
import { loginLoader } from "./loaders/loginLoader";

import { action as loginAction } from "./pages/Login";

import "./App.scss";

import "../server";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />} errorElement={<Error />}>
                <Route
                    path="login"
                    element={<Login />}
                    loader={loginLoader}
                    action={loginAction}
                />
                <Route index element={<Home />} />
                <Route path="host" element={<HostLayout />}>
                    <Route
                        index
                        element={<Dashboard />}
                        loader={dashBoardLoader}
                    />
                    <Route
                        path="income"
                        element={<Income />}
                        loader={async ({ request }) =>
                            await requireAuth(request)
                        }
                    />
                    <Route
                        path="vans"
                        element={<HostVans />}
                        loader={hostVansLoader}
                        errorElement={<Error />}
                    />
                    <Route
                        path="vans/:id"
                        element={<HostVanDetail />}
                        loader={hostVanDetailLoader}
                        errorElement={<Error />}
                    >
                        <Route
                            index
                            element={<HostVanInfo />}
                            loader={async ({ request }) =>
                                await requireAuth(request)
                            }
                        />
                        <Route
                            path="pricing"
                            element={<HostVanPricing />}
                            loader={async ({ request }) =>
                                await requireAuth(request)
                            }
                        />
                        <Route
                            path="photos"
                            element={<HostVanPhotos />}
                            loader={async ({ request }) =>
                                await requireAuth(request)
                            }
                        />
                    </Route>
                    <Route
                        path="reviews"
                        loader={async ({ request }) =>
                            await requireAuth(request)
                        }
                        element={<Reviews />}
                    />
                </Route>
                <Route path="about" element={<About />} />
                <Route
                    path="vans"
                    element={<Vans />}
                    loader={vansLoader}
                    errorElement={<Error />}
                />
                <Route
                    path="vans/:id"
                    element={<VanDetail />}
                    loader={vanDetailLoader}
                    errorElement={<Error />}
                />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
