import React from "react";
import {IProps} from "../../../../config/interfaces";

export const ManageUsers:React.FC<IProps> = (props) => {

    return (
        <>
            <div>
                <b>管理用户</b>
                <div className={'body'}>
                    <div className={'body-title'}>用户列表</div>

                </div>
            </div>
        </>
    )
}