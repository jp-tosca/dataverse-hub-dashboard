import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AgCharts } from 'ag-charts-react';

function InstalltionMetrics() {
    const [installations, setInstallations] = useState<{ dvHubId: string; name: string }[]>([]);
    const [selectedInstallation, setSelectedInstallation] = useState("");
    const [chartData, setChartData] = useState<{ date: string; fileCount: number }[]>([]);
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        async function fetchData() {
            try {
                //const response = await fetch("./metrics.json");
                const response = await fetch("https://hub.dataverse.org/api/installation/metrics/monthly");
                const data = await response.json();
                setData(data);
                const installations = data.map((installation: any) => ({
                    dvHubId: installation.dvHubId,
                    name: installation.name
                }));
                setInstallations(installations);
            } catch (error) {
                console.error("Error fetching metrics data:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchChartData() {
            if (selectedInstallation) {
                try {
                    //const response = await fetch(`https://hub.dataverse.org/api/installation/metrics/monthly/${selectedInstallation}`);
                    //const data = await response.json();
                    
                    const selectedData = data.find((installation: any) => installation.dvHubId === selectedInstallation);
                    const chartData = selectedData ? selectedData.metrics
                        // Filter for December
                                .map((entry: any) => ({
                                    date: new Date(entry.recordDate).getFullYear().toString(), // Extract year
                            fileCount: entry.files
                        })) : [];
                    setChartData(chartData);
                } catch (error) {
                    console.error("Error fetching chart data:", error);
                }
            }
        }
        fetchChartData();
    }, [selectedInstallation]);

    const options = {
        data: chartData,
        series: [{
            type: 'bar',
            xKey: 'date',
            yKey: 'fileCount',
            title: 'File Count',
            tooltip: {
                renderer: ({ datum }: { datum: { date: string; fileCount: number } }) => {
                    return {
                        title: `${datum.fileCount.toLocaleString()}`
                    };
                }
            }
        }],
        axes: [
            {
                type: 'category',
                position: 'bottom',
                title: { text: 'Date' }
            },
            {
                type: 'number',
                position: 'left',
                title: { text: 'File Count' }
            }
        ]
    };

    return (
        <div>
            <h1>Installation Metrics</h1>
            <Form.Group controlId="installationSelect">
                <Form.Label>Select Installation</Form.Label>
                <Form.Control
                    as="select"
                    onChange={(e: React.ChangeEvent<any>) => setSelectedInstallation(e.target.value)}
                >
                    {installations.map((installation) => (
                        <option key={installation.dvHubId} value={installation.dvHubId}>
                            {installation.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            {selectedInstallation && (
                <div>
                    <h2>Files Over Time for {installations.find(inst => inst.dvHubId === selectedInstallation)?.name}</h2>
                    <AgCharts options={options} />
                </div>
            )}
        </div>
    );
}

export default InstalltionMetrics;