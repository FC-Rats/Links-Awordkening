import { useEffect, useState } from "react";
import { SoloGameTemplate } from "../templates/SoloGameTemplate";
import { Loader } from "../atoms/Loader";


export const SoloGamePage = () => {
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    /*     useEffect(() => {
            setIsDataLoading(true);
            fetch("http://localhost/Links-Awordkening/Includes/test.php")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setData(data);
                    setIsDataLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setIsDataLoading(false);
                });
        }, []);
     */

    useEffect(() => {
        async function fetchData() {
            setIsDataLoading(true)
            try {
                const response = await fetch(`http://localhost/Links-Awordkening/api/Log/test.php`)
                const data = await response.json()
                setData(data)
                console.log(data)
            } catch (err) {
                console.log('===== error =====', err)
                setError(true)
            } finally {
                setIsDataLoading(false)
            }
        }
        fetchData()
    }, [])

    if (error) {
        return <span>Oups il y a eu un problème</span>
    }

    return (
        <>
            {isDataLoading ? (
                <Loader />
            ) : (
                <SoloGameTemplate />
            )}
        </>

    );
};
