import React, {useState} from 'react';
import './Product.scss';

const Product = ({product, addToDeleted}) => {
    const [deleted, setDeleted] = useState(false);

    const inputChangeHandler = e => {
        setDeleted(!deleted);
        addToDeleted(product.id);
    }

    return (
        <div className={'Product'}>
            <div className="Product__checkbox">
                <input checked={deleted} className={'delete-checkbox'} onChange={inputChangeHandler} type="checkbox"/>
            </div>
            <div className="Product__body">
                <p className={'Product__sku'}>{product.sku}</p>
                <p className={'Product__name'}>{product.name}</p>
                <p className={'Product__price'}>{product.price}</p>
                {product.size > 0 && <p className={'Product__size'}>Size: {product.size}</p>}
                {product.weight > 0 && <p className={'Product__weight'}>Weight: {product.weight}</p>}
                {product.height > 0 && <p className={'Product__dimension'}>Dimension: {product.height} * {product.length} * {product.width} </p>}
            </div>
        </div>
    );
};

export default Product;