import { Error404Template } from "../templates/Error404Template";
import { useLocation} from 'react-router-dom';

export const Error404Page = () => {
    const location = useLocation();

    return (
       <>
            <Error404Template url={location.pathname.toString()}/>
       </>
    );
};
