import "../../assets/css/Link.css"
import { LinkProps } from "../types/LinkProps"; 

export const Link = (props:LinkProps) => {

    return (
        <>
            <br />
            <a className="link" href={props.url} target={props.newTab ? "_blank" : "_self"}>{props.text}</a>
        </> 
    );
};
