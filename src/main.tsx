import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Link, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';
import {Container, Nav, Navbar} from "react-bootstrap";

import "./index.css";
import { ErrorBoundary } from "react-error-boundary";

import InstallationMap from "./InstallationMap.tsx";
import InstallationMetrics from "./InstallationMetrics.tsx";
import ErrorView from "./ErrorView.tsx";

import 'bootstrap/dist/css/bootstrap.min.css';


function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
    return <ErrorView error={error} resetErrorBoundary={resetErrorBoundary} />;
};

const PageIndex = () => {
    return (
				
		<>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand className="text-orange-500 p-1" href="/" >Dataverse Hub</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />       
				<Container>
				<Nav className="me-auto">
					<Nav.Link disabled>|</Nav.Link>
					<Nav.Link as={Link} to="/map">Map</Nav.Link>
					<Nav.Link disabled>|</Nav.Link>
					<Nav.Link as={Link} to="/metrics">Metrics</Nav.Link>
				</Nav>
				</Container>
			</Navbar>	
				
			<Outlet />
			</ErrorBoundary>
		</>
    );
};

const router = createHashRouter([
    {
        path: '/',
        element: <PageIndex />,
        children: [
			{
                index: true,
                element: <InstallationMetrics />,
            },
			{
				path: '/map',
				element: <InstallationMap />,
			},
            {
                path: '/metrics',
                element: <InstallationMetrics />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>						
		<RouterProvider router={router} />
	</StrictMode>
);
