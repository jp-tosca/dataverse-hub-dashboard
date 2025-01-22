import { useEffect } from "react";

function InstalltionMetrics(){

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://hub.dataverse.org/api/installations/status");
        }
    }, []);

    return (
        <div>
            <h1>Installation Metrics</h1>
        </div>
    )
}

export default InstalltionMetrics;