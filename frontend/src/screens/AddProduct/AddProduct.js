import React, {useState} from 'react';
import './AddProduct.scss';
import axios from "axios";
import AddProductHeader from "./AddProductHeader/AddProductHeader";
import {connect} from "react-redux";
import {addProduct} from "../../store/action/products.action";
import {useNavigate} from "react-router-dom";

const AddProduct = ({addProduct, products}) => {
    const [form, setForm] = useState({
        sku: {
            name: 'sku',
            value: '',
            rules: {
                required: true
            },
            valid: false,
            touched: false
        },
        name: {
            name: 'name',
            value: '',
            rules: {
                required: true
            },
            valid: false,
            touched: false
        },
        price: {
            name: 'price',
            value: 0,
            rules: {
                required: true,
                num: true
            },
            valid: false,
            touched: false
        },
        weight: {
            name: 'weight',
            value: 0,
            rules: {
                required: true,
                num: true
            },
            valid: false,
            touched: false
        },
        length: {
            name: 'length',
            value: 0,
            rules: {
                required: true,
                num: true
            },
            valid: false,
            touched: false
        },
        height: {
            name: 'height',
            value: 0,
            rules: {
                required: true,
                num: true
            },
            valid: false,
            touched: false
        },
        width: {
            name: 'width',
            value: 0,
            rules: {
                required: true,
                num: true
            },
            valid: false,
            touched: false
        },
        size: {
            name: 'size',
            value: 0,
            rules: {
                required: true,
                num: true
            },
            valid: false,
            touched: false
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [select, setSelect] = useState('dvd');
    const navigate = useNavigate();

    const inputs = {
        main: [
            {
                name: 'sku',
            },
            {
                name: 'name',
            },
            {
                name: 'price',
                unit: '$'
            }
        ],
        secondary: {
            dvd: [
                {
                    name: 'size',
                    unit: 'MB'
                }

            ],
            furniture: [
                {
                    name: 'height',
                    unit: 'CM'
                },
                {
                    name: 'width',
                    unit: 'CM'
                },
                {
                    name: 'length',
                    unit: 'CM'
                },
            ],
            book: [
                {
                    name: 'weight',
                    unit: 'KG'
                }

            ]
        }
    };

    const handleChange = (e) => {
        const changedField = e.target.name;
        const formCopy = {...form};
        // formCopy[changedField].value = e.target.value;
        const updatedFormElement = {
            ...formCopy[changedField]
        };

        updatedFormElement.value = e.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = formValidator(updatedFormElement.value, updatedFormElement.rules);

        formCopy[changedField] = updatedFormElement;

        let formIsValid = true;
        for(let inputKey of inputs.main) {
            formIsValid = formCopy[inputKey.name].valid && formIsValid;
        }

        for(let inputKey of inputs.secondary[select]) {
            formIsValid = formCopy[inputKey.name].valid && formIsValid;
        }

        setForm(formCopy);

        setFormIsValid(formIsValid);
    };

    const formValidator = (value, rules) => {
        let inputIsValid = true;
        if(!rules) {
            return true;
        }

        if(rules.required) {
            inputIsValid = value.trim() !== '' && value.trim() != 0 && inputIsValid;
        }

        if(rules.num) {
            inputIsValid = !isNaN(value.trim()) && inputIsValid;
        }

        return inputIsValid;
    }

    const submitHandler = async(e) => {

        const formData = {
            sku: form.sku.value,
            name: form.name.value,
            price: +form.price.value,
            size: +form.size.value,
            weight: +form.weight.value,
            length: +form.length.value,
            width: +form.width.value,
            height: +form.height.value
        };

        const res = await addProduct(formData);
        if(res == 200) {
            navigate('/');
        }else if(res == 400){
            alert('A product with the same sku exists!')
        }
    };

    return (
        <div className={'ProductAdd'}>
            <AddProductHeader submitHandler={submitHandler} />
            <form
                id={'product_form'}
            >
                {
                    inputs.main.map((inp, index) => (
                        <div key={index} className="Product__form-element">
                            <label htmlFor="name">{inp.name.toUpperCase()} {inp.unit && `(${inp.unit})`}</label>
                            <input
                                type="text"
                                id={inp.name}
                                name={inp.name}
                                placeholder={`Enter ${inp.name.toUpperCase()}`}
                                value={form[inp.name].value}
                                onChange={(event) => handleChange(event)}
                                className={`${!form[inp.name].valid && form[inp.name].touched && 'Product__form-input--valid'}`}
                            />
                        </div>

                    ))
                }

                <div className="Product__form-element">
                    <label htmlFor="switcher">Type Switcher: </label>
                    <select value={select} onChange={(e) => {
                        setSelect(() => e.target.value);
                        Object.keys(inputs.secondary).map((sec, i) => {
                            const formCopy = {...form};
                            inputs.secondary[sec].map((n, i) => {
                                formCopy[n.name].value = 0;
                                formCopy[n.name].valid = false;
                                formCopy[n.name].touched = false;
                            });
                            setForm(() => formCopy);
                            setFormIsValid(false);
                        })
                    }} name="switcher" id="productType">
                        <option value="dvd">DVD</option>
                        <option value="book">Book</option>
                        <option value="furniture">Furniture</option>
                    </select>
                </div>

                {
                    inputs.secondary[select].map((inp, index) => (
                        <div key={index} className="Product__form-element">
                            <label htmlFor="name">{inp.name.toUpperCase()} {inp.unit && `(${inp.unit})`}</label>
                            <input
                                type="text"
                                id={inp.name}
                                name={inp.name}
                                placeholder={`Enter ${inp.name.toUpperCase()}`}
                                value={form[inp.name].value}
                                onChange={(event) => handleChange(event)}
                                className={`${!form[inp.name].valid && form[inp.name].touched && 'Product__form-input--valid'}`}
                            />
                        </div>
                    ))
                }
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        products: state.products.products
    }
}

export default connect(mapStateToProps, {addProduct}) (AddProduct);