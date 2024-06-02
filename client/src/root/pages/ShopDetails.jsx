import axios from "axios";
import $ from "jquery";
import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { useParams } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";

export const ShopDetails = () => {
    const option = {
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        animateOut: "slideOutUp",
        nav: false,
        dots: false,
        margin: 0,
        responsive: {
            1100: {
                items: 4,
            },
            724: {
                items: 1,
            },
            500: {
                items: 1,
            },
            370: {
                items: 1,
                innerWidth: "100%",
                outerWidth: "100%",
            },
        },
    };
    const handleOnClickInc = () => {
        const button = $(".value");
        const check = $(".qtybtn");
        const oldValue = button.val();
        let newVal = parseFloat(oldValue);
        if (check.hasClass("inc")) {
            newVal = newVal + 1;
        }
        button.val(newVal);
    };
    const handleOnClickDec = () => {
        const button = $(".value");
        const check = $(".qtybtn");
        const oldValue = button.val();
        let newVal = parseFloat(oldValue);
        if (check.hasClass("dec")) {
            if (oldValue > 0) {
                newVal = newVal - 1;
            } else {
                newVal = 0;
            }
        }
        button.val(newVal);
    };

    const { userData } = useAuth();
    console.log(userData);

    const id = useParams();

    const [product, setProduct] = useState([]);

    const getProduct = async () => {
        await axios
            .get(`http://localhost:3002/api/product/${id.id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setProduct(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    useEffect(() => {
        getProduct();
    }, []);

    const handleAddToCart = async () => {
        const button = $(".value");
        const value = button.val();
        await axios
            .post(
                "http://localhost:3002/api/cart/",
                {
                    userId: userData._id,
                    products: [
                        { productId: product._id },
                        { promotion: product.promotion },
                        { price: product.price },
                        { quantity: value },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    return (
        <div>
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    <img
                                        className="product__details__pic__item--large"
                                        src={`http://localhost:3002/assets/${product.image}`}
                                        alt=""
                                    ></img>
                                </div>
                                <OwlCarousel
                                    className="product__details__pic__slider owl-carousel"
                                    {...option}
                                >
                                    <img
                                        data-imgbigurl="../../../public/assets/img/product/details/product-details-2.jpg"
                                        src="../../../public/assets/img/product/details/thumb-1.jpg"
                                        alt=""
                                    ></img>
                                    <img
                                        data-imgbigurl="../../../public/assets/img/product/details/product-details-3.jpg"
                                        src="../../../public/assets/img/product/details/thumb-2.jpg"
                                        alt=""
                                    ></img>
                                    <img
                                        data-imgbigurl="../../../public/assets/img/product/details/product-details-5.jpg"
                                        src="../../../public/assets/img/product/details/thumb-3.jpg"
                                        alt=""
                                    ></img>
                                    <img
                                        data-imgbigurl="../../../public/assets/img/product/details/product-details-4.jpg"
                                        src="../../../public/assets/img/product/details/thumb-4.jpg"
                                        alt=""
                                    ></img>
                                </OwlCarousel>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                                <h3>{product.name}</h3>
                                <div className="product__details__rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                                    {/* <span>(18 reviews)</span> */}
                                </div>
                                <div className="product__details__price">
                                    {new Intl.NumberFormat("de-DE").format(
                                        product.price
                                    )}
                                    đ
                                </div>
                                <p>{product.desc}</p>
                                <div className="product__details__quantity">
                                    <div className="quantity">
                                        <div className="pro-qty">
                                            <span
                                                className="dec qtybtn"
                                                onClick={handleOnClickDec}
                                            >
                                                -
                                            </span>
                                            <input
                                                className="value"
                                                type="input"
                                                value="1"
                                            />
                                            <span
                                                className="inc qtybtn"
                                                onClick={handleOnClickInc}
                                            >
                                                +
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="primary-btn"
                                >
                                    ADD TO CARD
                                </button>
                                <a href="#" className="heart-icon">
                                    <span className="icon_heart_alt"></span>
                                </a>
                                <ul>
                                    <li>
                                        <b>Availability</b>{" "}
                                        {product.quantity > 0 ? (
                                            <span>In Stock</span>
                                        ) : (
                                            <span>Out Stock</span>
                                        )}
                                    </li>
                                    {/* <li>
                                        <b>Shipping</b>{" "}
                                        <span>
                                            01 day shipping.{" "}
                                            <samp>Free pickup today</samp>
                                        </span>
                                    </li>
                                    <li>
                                        <b>Weight</b> <span>0.5 kg</span>
                                    </li> */}
                                    <li>
                                        <b>Share on</b>
                                        <div className="share">
                                            <a href="#">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-instagram"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-pinterest"></i>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="product__details__tab">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            data-toggle="tab"
                                            href="#tabs-1"
                                            role="tab"
                                            aria-selected="true"
                                        >
                                            Description
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            data-toggle="tab"
                                            href="#tabs-2"
                                            role="tab"
                                            aria-selected="false"
                                        >
                                            Information
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            data-toggle="tab"
                                            href="#tabs-3"
                                            role="tab"
                                            aria-selected="false"
                                        >
                                            Reviews <span>(1)</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div
                                        className="tab-pane active"
                                        id="tabs-1"
                                        role="tabpanel"
                                    >
                                        <div className="product__details__tab__desc">
                                            <h6>Products Infomation</h6>
                                            <p>
                                                Vestibulum ac diam sit amet quam
                                                vehicula elementum sed sit amet
                                                dui. Pellentesque in ipsum id
                                                orci porta dapibus. Proin eget
                                                tortor risus. Vivamus suscipit
                                                tortor eget felis porttitor
                                                volutpat. Vestibulum ac diam sit
                                                amet quam vehicula elementum sed
                                                sit amet dui. Donec rutrum
                                                congue leo eget malesuada.
                                                Vivamus suscipit tortor eget
                                                felis porttitor volutpat.
                                                Curabitur arcu erat, accumsan id
                                                imperdiet et, porttitor at sem.
                                                Praesent sapien massa, convallis
                                                a pellentesque nec, egestas non
                                                nisi. Vestibulum ac diam sit
                                                amet quam vehicula elementum sed
                                                sit amet dui. Vestibulum ante
                                                ipsum primis in faucibus orci
                                                luctus et ultrices posuere
                                                cubilia Curae; Donec velit
                                                neque, auctor sit amet aliquam
                                                vel, ullamcorper sit amet
                                                ligula. Proin eget tortor risus.
                                            </p>
                                            <p>
                                                Praesent sapien massa, convallis
                                                a pellentesque nec, egestas non
                                                nisi. Lorem ipsum dolor sit
                                                amet, consectetur adipiscing
                                                elit. Mauris blandit aliquet
                                                elit, eget tincidunt nibh
                                                pulvinar a. Cras ultricies
                                                ligula sed magna dictum porta.
                                                Cras ultricies ligula sed magna
                                                dictum porta. Sed porttitor
                                                lectus nibh. Mauris blandit
                                                aliquet elit, eget tincidunt
                                                nibh pulvinar a. Vestibulum ac
                                                diam sit amet quam vehicula
                                                elementum sed sit amet dui. Sed
                                                porttitor lectus nibh.
                                                Vestibulum ac diam sit amet quam
                                                vehicula elementum sed sit amet
                                                dui. Proin eget tortor risus.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane"
                                        id="tabs-2"
                                        role="tabpanel"
                                    >
                                        <div className="product__details__tab__desc">
                                            <h6>Products Infomation</h6>
                                            <p>
                                                Vestibulum ac diam sit amet quam
                                                vehicula elementum sed sit amet
                                                dui. Pellentesque in ipsum id
                                                orci porta dapibus. Proin eget
                                                tortor risus. Vivamus suscipit
                                                tortor eget felis porttitor
                                                volutpat. Vestibulum ac diam sit
                                                amet quam vehicula elementum sed
                                                sit amet dui. Donec rutrum
                                                congue leo eget malesuada.
                                                Vivamus suscipit tortor eget
                                                felis porttitor volutpat.
                                                Curabitur arcu erat, accumsan id
                                                imperdiet et, porttitor at sem.
                                                Praesent sapien massa, convallis
                                                a pellentesque nec, egestas non
                                                nisi. Vestibulum ac diam sit
                                                amet quam vehicula elementum sed
                                                sit amet dui. Vestibulum ante
                                                ipsum primis in faucibus orci
                                                luctus et ultrices posuere
                                                cubilia Curae; Donec velit
                                                neque, auctor sit amet aliquam
                                                vel, ullamcorper sit amet
                                                ligula. Proin eget tortor risus.
                                            </p>
                                            <p>
                                                Praesent sapien massa, convallis
                                                a pellentesque nec, egestas non
                                                nisi. Lorem ipsum dolor sit
                                                amet, consectetur adipiscing
                                                elit. Mauris blandit aliquet
                                                elit, eget tincidunt nibh
                                                pulvinar a. Cras ultricies
                                                ligula sed magna dictum porta.
                                                Cras ultricies ligula sed magna
                                                dictum porta. Sed porttitor
                                                lectus nibh. Mauris blandit
                                                aliquet elit, eget tincidunt
                                                nibh pulvinar a.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane"
                                        id="tabs-3"
                                        role="tabpanel"
                                    >
                                        <div className="product__details__tab__desc">
                                            <h6>Products Infomation</h6>
                                            <p>
                                                Vestibulum ac diam sit amet quam
                                                vehicula elementum sed sit amet
                                                dui. Pellentesque in ipsum id
                                                orci porta dapibus. Proin eget
                                                tortor risus. Vivamus suscipit
                                                tortor eget felis porttitor
                                                volutpat. Vestibulum ac diam sit
                                                amet quam vehicula elementum sed
                                                sit amet dui. Donec rutrum
                                                congue leo eget malesuada.
                                                Vivamus suscipit tortor eget
                                                felis porttitor volutpat.
                                                Curabitur arcu erat, accumsan id
                                                imperdiet et, porttitor at sem.
                                                Praesent sapien massa, convallis
                                                a pellentesque nec, egestas non
                                                nisi. Vestibulum ac diam sit
                                                amet quam vehicula elementum sed
                                                sit amet dui. Vestibulum ante
                                                ipsum primis in faucibus orci
                                                luctus et ultrices posuere
                                                cubilia Curae; Donec velit
                                                neque, auctor sit amet aliquam
                                                vel, ullamcorper sit amet
                                                ligula. Proin eget tortor risus.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="related-product">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title related__product__title">
                                <h2>Related Product</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product__item">
                                <div
                                    className="product__item__pic set-bg"
                                    data-setbg="../../../public/assets/img/product/product-1.jpg"
                                >
                                    <img src="../../../public/assets/img/product/product-1.jpg"></img>
                                    <ul className="product__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product__item">
                                <div
                                    className="product__item__pic set-bg"
                                    data-setbg="../../../public/assets/img/product/product-2.jpg"
                                >
                                    <img src="../../../public/assets/img/product/product-2.jpg"></img>
                                    <ul className="product__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product__item">
                                <div
                                    className="product__item__pic set-bg"
                                    data-setbg="../../../public/assets/img/product/product-3.jpg"
                                >
                                    <img src="../../../public/assets/img/product/product-3.jpg"></img>
                                    <ul className="product__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product__item">
                                <div
                                    className="product__item__pic set-bg"
                                    data-setbg="../../../public/assets/img/product/product-7.jpg"
                                >
                                    <img src="../../../public/assets/img/product/product-7.jpg"></img>
                                    <ul className="product__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
