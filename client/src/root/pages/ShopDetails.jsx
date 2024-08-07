import axios from "axios";
import $ from "jquery";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";
import { useCart } from "/src/context/CartContext";

export const ShopDetails = () => {
    const [product, setProduct] = useState([]);
    const [isAddCart, setIsAddCart] = useState(false);

    const [categoryValue, setCategoryValue] = useState([]);
    const [count, setCount] = useState();

    const { userData, isAuthenticated } = useAuth();
    // console.log(userData);

    const { addCart, haveCart, createCart } = useCart();

    const id = useParams();

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

    const searchCategory = async (value) => {
        await axios
            .get(`http://localhost:3002/api/product/search?category=${value}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setCategoryValue(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const updateProduct = async (quantity) => {
        await axios
            .put(`http://localhost:3002/api/product/update/${id.id}`, {
                quantity: product.quantity - quantity,
            })
            .then((response) => {
                console.log(response.data.quantity);
            });
    };

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
                searchCategory(response.data.categoryId);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const handleAddToCart = async () => {
        if (isAuthenticated) {
            setCount(count + 1);
            const button = $(".value");
            const value = button.val();
            let cartId;
            if (JSON.parse(localStorage.getItem("user_cart"))) {
                cartId = JSON.parse(localStorage.getItem("user_cart")).cartId;
            }
            if (value > product.quantity) {
                toast("Kho không đủ số lượng sản phầm");
            } else {
                console.log(window.localStorage.getItem("haveCart"));
                console.log(haveCart);
                updateProduct(value);
                setIsAddCart(!isAddCart);
                if (window.localStorage.getItem("haveCart") === "true") {
                    addCart(userData, product, value, cartId);
                    console.log(window.localStorage.getItem("haveCart"));
                    console.log(haveCart);
                } else {
                    createCart(userData, product, value);
                    console.log(haveCart);
                }
                // window.localStorage.getItem("haveCart")
                //     ? addCart(userData, product, value)
                //     : createCart(userData, product, value);
                toast("Thêm sản phẩm thành công!");
            }
        } else {
            toast("Bạn cần đăng nhập để thêm sản phẩm");
        }
    };

    useEffect(() => {
        getProduct();
        searchCategory(product?.categoryId);
    }, [id, isAddCart]);

    return (
        <div>
            <section className="breadcrumb-section set-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Shop Detail</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                                <h3>{product.name}</h3>
                                <div className="product__details__price">
                                    {product.promotion > 0 ? (
                                        <>
                                            {new Intl.NumberFormat(
                                                "de-DE"
                                            ).format(
                                                product.price -
                                                    (product.price / 100) *
                                                        product.promotion
                                            )}
                                            đ{" "}
                                            <span className="line-through text-xl">
                                                {new Intl.NumberFormat(
                                                    "de-DE"
                                                ).format(product.price)}
                                                đ
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {new Intl.NumberFormat(
                                                "de-DE"
                                            ).format(product.price)}
                                            đ
                                        </>
                                    )}
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
                                    Thêm Vào Giỏ Hàng
                                </button>
                                <ul>
                                    <li>
                                        <b>Trạng thái</b>{" "}
                                        {product.quantity > 0 ? (
                                            <span>Còn Hàng</span>
                                        ) : (
                                            <span>Hết hàng</span>
                                        )}
                                    </li>
                                    {product.promotion > 0 ? (
                                        <li>
                                            <b>Khuyến mãi</b>
                                            <span className="text-red-500 font-bold">
                                                {product.promotion}%
                                            </span>
                                        </li>
                                    ) : (
                                        <></>
                                    )}
                                    <li>
                                        <b>Vận chuyển</b>{" "}
                                        <span>Vận chuyển trong 1 ngày.</span>
                                    </li>
                                    <li>
                                        <b>Chia sẻ</b>
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
                    </div>
                </div>
            </section>

            <section className="related-product">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title related__product__title">
                                <h2>Sản phẩm liên quan</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {categoryValue?.map((product, index) => {
                            if (product.promotion !== 0) {
                                return (
                                    <div
                                        key={index}
                                        className="col-lg-3 col-md-4 col-sm-6"
                                    >
                                        <div className="product__discount__item">
                                            <div className="product__discount__item__pic set-bg">
                                                <img
                                                    src={`http://localhost:3002/assets/${product.image}`}
                                                    className="product__discount__item__pic set-bg"
                                                />
                                                <div className="product__discount__percent">
                                                    -{product.promotion}%
                                                </div>
                                                <ul className="product__item__pic__hover">
                                                    <li>
                                                        <NavLink
                                                            to={`/shop-details/${product._id}`}
                                                        >
                                                            <i className="fa fa-shopping-cart"></i>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="product__discount__item__text">
                                                <h5>
                                                    <NavLink
                                                        to={`/shop-details/${product._id}`}
                                                    >
                                                        {product.name}
                                                    </NavLink>
                                                </h5>
                                                <div className="product__item__price">
                                                    {new Intl.NumberFormat(
                                                        "de-DE"
                                                    ).format(
                                                        product.price -
                                                            (product.price /
                                                                100) *
                                                                product.promotion
                                                    )}
                                                    đ{" "}
                                                    <span>
                                                        {new Intl.NumberFormat(
                                                            "de-DE"
                                                        ).format(product.price)}
                                                        đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        key={index}
                                        className="col-lg-3 col-md-4 col-sm-6"
                                    >
                                        <div className="product__item">
                                            <div
                                                className="product__item__pic set-bg"
                                                data-setbg="img/product/product-1.jpg"
                                            >
                                                <img
                                                    src={`http://localhost:3002/assets/${product.image}`}
                                                />
                                                <ul className="product__item__pic__hover">
                                                    <li>
                                                        <NavLink
                                                            to={`/shop-details/${product._id}`}
                                                        >
                                                            <i className="fa fa-shopping-cart"></i>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="product__item__text">
                                                <h6>
                                                    <NavLink
                                                        to={`/shop-details/${product._id}`}
                                                    >
                                                        {product.name}
                                                    </NavLink>
                                                </h6>
                                                <h5>
                                                    {new Intl.NumberFormat(
                                                        "de-DE"
                                                    ).format(product.price)}
                                                    đ
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            ></ToastContainer>
        </div>
    );
};
