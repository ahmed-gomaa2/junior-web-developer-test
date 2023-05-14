import React from 'react';
import './AddProductHeader.scss';
import {NavLink} from "react-router-dom";

const AddProductHeader = ({submitHandler}) => {
    return (
        <div className={'AddProductHeader'}>
            <div className="AddProductHeader__container">
                <div className="AddProductHeader__header">Product Add</div>
                <div className="AddProductHeader__btns">
                    <button onClick={() => submitHandler()} className="AddProductHeader__save">Save</button>
                    <NavLink to={'/'} className="AddProductHeader__cancel">Cancel</NavLink>
                </div>
            </div>
        </div>
    );
};

export default AddProductHeader;