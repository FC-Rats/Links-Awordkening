import LogsTemplate from "../templates/LogsTemplate"
import { getLogs } from "../../services/LogServices";
import { useEffect, useState } from "react";
import { LogProps } from "../types/LogProps";

export const LogsPage = () => {
    const [logs, setLogs] = useState<LogProps[]>([]);
    const [status, setStatus] = useState<number | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLogs();
                if (Array.isArray(response)) {
                    setLogs(response);
                } else if (typeof response === 'number') {
                    setStatus(response);
                } else {
                    setError(new Error('Unknown response format'));
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des logs : ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {status !== null ? (
                <p>Statut de la réponse : {status}</p>
            ) : (error !== null) ? (
                <p>Erreur lors de la récupération des logs : {error.toString()}</p>
            ) : (
                <LogsTemplate logs={logs} />
            )}
        </>
    )
}