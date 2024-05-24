import { CircularProgress } from "@mui/material";
import "../../assets/css/Loader.css"

export const Loader = () => {
    return (
        <div className="loader-container">
            <CircularProgress color="success" className="loader" />
        </div>
    );
};
