import React, {useState, useEffect} from "react";

function NotFound (props){

    const history = props.history;

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

export default NotFound