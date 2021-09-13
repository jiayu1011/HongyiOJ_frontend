import React from "react";
import {IProps} from "../config/interfaces";

export const Mobile:React.FC<IProps> = (props) => {
    const {history} = props;

    return(
        <div>
            <div>Hongyi OJ目前只支持PC端哦~</div>
        </div>
    )
}

