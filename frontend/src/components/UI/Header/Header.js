import React from 'react';
import './Header.scss';
import {NavLink} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import {deleteProducts} from "../../../store/action/products.action";

const Header = ({deleted, deleteProducts, setDeleted}) => {

    const deleteClickHandler = async e => {
        const ids = deleted.map(d => d.id);
        await deleteProducts(ids);
        setDeleted([]);
    }
    return (
        <div className={'Header'}>
            <div className="Header__container">
                <div className="Header__header">Product List</div>
                <div className="Header__btns">
                    <NavLink className={'Header__add'} to={'/add-product'}>ADD</NavLink>
                    <div className={`Header__delete`}>
                        <button onClick={deleteClickHandler} disabled={deleted.length == 0}>MASS DELETE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, {deleteProducts}) (Header);