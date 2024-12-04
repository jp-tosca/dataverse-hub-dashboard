import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { DvMetricsService } from "./openapi/services/DvMetricsService";
import type { InstallationVersionInfo } from "./openapi";
import { AgGridReact } from "ag-grid-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid



				

function Test() {


	const [installationStatus, setInstallationStatus] = useState<
		InstallationVersionInfo[]
	>([]);

	const [filteredData, setfilteredData] = useState<InstallationVersionInfo[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("https://raw.githubusercontent.com/jp-tosca/dataverse-hub-dashboard/refs/heads/main/src/demo/status.json");
				const data = await response.json();
				//const data = await DvMetricsService.geInstallationsStatus();
				setInstallationStatus(data);
				setfilteredData(data);
			} catch (error) {
				console.error("Error fetching installation data:", error);
			}
		}

		fetchData();
	}, []);



	interface GridRef {
		api: {
			getRenderedNodes: () => Array<{ data: InstallationVersionInfo }>;
		};
	}

	const onFilterChanged = (gridRef: GridRef) => {
		const filteredNodes = gridRef.api.getRenderedNodes();
		const filteredData = filteredNodes?.map((node) => node.data);
		setfilteredData(filteredData || []);
	};

	useEffect(() => {
		console.log("filteredData", filteredData);
	}, [filteredData]);

	return (
		<>
			<MapContainer
				center={[51.505, -0.09]}
				zoom={1.5}
				scrollWheelZoom={false}
				className="h-[50vh]"
			>
				<TileLayer
					attribution='Dataverse-Hub'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{filteredData.map((status) => (
					<Marker
						key={status.installation.dvHubId}
						position={[
							status.installation.latitude,
							status.installation.longitude,
						]}
						icon={L.divIcon({
							className: "custom-icon",
							html: `<div 
								style="background-color: ${status.status === "OK" ? "green" : "red"}; 
                          		width: 2rem;
								height: 2rem;
								display: block;
								left: -1rem;
								top: -1rem;
								position: relative;
								border-radius: 3rem 3rem 0;
								transform: rotate(45deg);
								border: 1px solid #FFFFFF
								"></div>`,
						})}
					>
						<Popup>
							<div>
								<strong>ID:</strong> {status.installation.dvHubId}
								<br />
								<strong>Name:</strong> {status.installation.name}
								<br />
								<strong>Description:</strong> {status.installation.description}
								<br />
								<strong>Hostname:</strong> {status.installation.hostname}
								<br />
								<strong>Country:</strong> {status.installation.country}
								<br />
								<strong>Continent:</strong> {status.installation.continent}
								<br />
								<strong>Launch Year:</strong> {status.installation.launchYear}
								<br />
								<strong>GDCC Member:</strong>{" "}
								{status.installation.gdccMember ? "Yes" : "No"}
								<br />
								<strong>DOI Authority:</strong>{" "}
								{status.installation.doiAuthority}
								<br />
								<strong>Contact Email:</strong>{" "}
								{status.installation.contactEmail}
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>

		

			<div className="ag-theme-quartz" // applying the Data Grid theme
				style={{ height: 500 }} // the Data Grid will fill the size of the parent container
				>
				<AgGridReact
					rowData={installationStatus}
					columnDefs={[
						{ headerName: "Name", field: "installation.name", filter: true },
						{ headerName: "Description", field: "installation.description", filter: true },
						{ headerName: "Hostname", field: "installation.hostname", filter: true },
						{ headerName: "Country", field: "installation.country", filter: true },
						{ headerName: "Continent", field: "installation.continent", filter: true },
						{ headerName: "Launch Year", field: "installation.launchYear", filter: true },
						{ headerName: "GDCC Member", field: "installation.gdccMember", filter: true },
						{ headerName: "DOI Authority", field: "installation.doiAuthority", filter: true },
						{ headerName: "Contact Email", field: "installation.contactEmail", filter: true },
						{ headerName: "Status", field: "status", filter: true },
					]}
					defaultColDef={{ flex: 1 }}
					domLayout="autoHeight"
					animateRows={false}
					onFilterChanged={onFilterChanged}
				/>
			</div>
		</>
	);
}

export default Test;
