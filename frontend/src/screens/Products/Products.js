import React, {useState} from 'react';
import './Products.scss';
import axios from "axios";
import Header from "../../components/UI/Header/Header";
import {connect} from "react-redux";
import Product from "./Product/Product";


const Products = (props) => {
    const [deleted, setDeleted] = useState([]);

    const addToDeleted = (id) => {
        const exists = deleted.findIndex(p => p.id == id) !== -1;
        if(exists) {
               setDeleted([
                   ...deleted.filter(p => p.id != id)
               ]);
        } else {
            const added = props.products.filter(p => p.id == id)[0];
            setDeleted([
                ...deleted,
                {...added}
            ]);
        }
    }

    return (
        <div className={'Products'}>
            <Header setDeleted={setDeleted} deleted={deleted} />
            <div className="Products__container">
                {
                    props.products.map((product, index) => (
                        <Product addToDeleted={addToDeleted} key={product.sku} product={product}/>
                    ))
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        products: state.products.products
    }
}

export default connect(mapStateToProps) (Products);