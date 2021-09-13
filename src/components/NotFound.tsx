import React, {useState, useEffect} from "react";
import {IProps} from "../config/interfaces";


export const NotFound:React.FC<IProps> = (props) => {
    const {history} = props;

    const [count, setCount] = useState(3);

    useEffect(() => {
        setTimeout(() => {
            if(count===1){
                history.push('/home');
            } else{
                setCount(count-1);
            }
        }, 1000)

    })

    return(
        <div>
            <div>404 Not Found</div>
            <div>{count}秒后会返回首页</div>
        </div>
    )
}

