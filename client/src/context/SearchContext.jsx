import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext();

// eslint-disable-next-line react/prop-types
export const SearchProvider = ({ children }) => {
    const [valueSearch, setValueSearch] = useState([]);
    const searchInput = async (inputs) => {
        await axios
            .get(`http://localhost:3002/api/product/search?name=${inputs}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setValueSearch(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
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
                setValueSearch(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const sortPrice = async (value) => {
        await axios
            .get(`http://localhost:3002/api/product/search?price=${value}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setValueSearch(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const sortDate = async () => {
        await axios
            .get(`http://localhost:3002/api/product/search?new=true`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setValueSearch(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const getAllProducts = async () => {
        await axios
            .get(`http://localhost:3002/api/product`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setValueSearch(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const value = {
        searchInput,
        searchCategory,
        sortPrice,
        sortDate,
        getAllProducts,
        valueSearch,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
export default SearchProvider;