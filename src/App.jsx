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
import Income from "./pages/Host/Income";
import HostVans from "./pages/Host/HostVans";
import { loader as hostVansLoader } from "./loaders/hostVansLoader";
import HostVanDetail from "./pages/Host/HostVanDetail";
import { loader as hostVanDetailLoader } from "./loaders/hostVanDetailLoader";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import HostVanPricing from "./pages/Host/HostVanPricing";
import Reviews from "./pages/Host/Reviews";

import { requireAuth } from "./utils/requireAuth";

import "./App.scss";

import "../server";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />} errorElement={<Error />}>
                <Route path="login" element={<Login />} />
                <Route index element={<Home />} />
                <Route path="host" element={<HostLayout />}>
                    <Route
                        index
                        element={<Dashboard />}
                        loader={async () => await requireAuth()}
                    />
                    <Route
                        path="income"
                        element={<Income />}
                        loader={async () => await requireAuth()}
                    />
                    <Route
                        path="vans"
                        element={<HostVans />}
                        loader={hostVansLoader}
                    />
                    <Route
                        path="vans/:id"
                        element={<HostVanDetail />}
                        loader={hostVanDetailLoader}
                    >
                        <Route
                            index
                            element={<HostVanInfo />}
                            loader={async () => await requireAuth()}
                        />
                        <Route
                            path="pricing"
                            element={<HostVanPricing />}
                            loader={async () => await requireAuth()}
                        />
                        <Route
                            path="photos"
                            element={<HostVanPhotos />}
                            loader={async () => await requireAuth()}
                        />
                    </Route>
                    <Route path="reviews" element={<Reviews />} />
                </Route>
                <Route path="about" element={<About />} />
                <Route path="vans" element={<Vans />} loader={vansLoader} />
                <Route
                    path="vans/:id"
                    element={<VanDetail />}
                    loader={vanDetailLoader}
                />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
