import UnoteContext from "./unotecontext";
import { useState } from "react";
const UnoteState = (props) => {
    const [unote, setUnote] = useState("");
    return (
        <UnoteContext.Provider value={{unote, setUnote}} >
            {props.children}
        </UnoteContext.Provider>
    );
}
export default UnoteState;