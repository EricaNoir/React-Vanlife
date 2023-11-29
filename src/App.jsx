import React from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import { loader as vansLoader } from "./loaders/vansLoader";
import VanDetail from "./pages/Vans/VanDetail";
import NotFound from "./pages/NotFound";

import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import HostVans from "./pages/Host/HostVans";
import HostVanDetail from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import HostVanPricing from "./pages/Host/HostVanPricing";
import Reviews from "./pages/Host/Reviews";

import "./App.scss";

import "../server";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route index element={<Home />} />

                <Route path="host" element={<HostLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="income" element={<Income />} />
                    <Route path="vans" element={<HostVans />} />
                    <Route path="vans/:id" element={<HostVanDetail />}>
                        <Route index element={<HostVanInfo />} />
                        <Route path="pricing" element={<HostVanPricing />} />
                        <Route path="photos" element={<HostVanPhotos />} />
                    </Route>
                    <Route path="reviews" element={<Reviews />} />
                </Route>

                <Route path="about" element={<About />} />
                <Route path="vans" element={<Vans />} loader={vansLoader} />
                <Route path="vans/:id" element={<VanDetail />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
