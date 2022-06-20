import React from 'react';

export default function Product(props){
    let price = null;
    if(props.price !== null && props.price !== ""){
        price = (
            <Link to={{
                pathname: '/buy',
                state: {
                    title: props.title,
                    description:props.description,
                    img:props.src,
                    price:props.price,
                    info:props.info
                }
            }}
                  className={"product__link"} >
                <span>
                    {props.price}
                </span>
            </Link>
        )
    }

    return (
        <div className={"product"}>
            <img src={props.src} className={"product__image"} alt="logo" />
            <div className={"product__info"}>
                <h1 className={"product__name"}>{props.title} </h1>
                <h4 className={"product__description"}>{props.description} </h4>
                <p className={"product__descriptionLong"}>{props.info.description} </p>
                {price}
            </div>
        </div>
    )
}

Product.defaultProps={
    title:"Test title",
    description:"This is the test description",
    img:null,
    price:"test price",
    info:{size:"test size",weight:"test weight"}
}
export default Restaurant;