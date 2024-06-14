import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState();

    const id = useParams();
    console.log(id);

    const removeFile = (file) => () => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    };

    const thumbs = files.map((file) => {
        return (
            <div key={file.name}>
                <div>
                    <img src={file.preview} alt={file.name} />
                </div>
                <button onClick={removeFile(file)}>Remove File</button>
            </div>
        );
    });

    const getUser = async () => {
        await axios
            .get(`http://localhost:3002/api/user/${id.id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    useEffect(() => {
        getUser();
    }, []);

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    useEffect(() => {
        if (isSuccess) navigate("/list-user");
    }, [isSuccess]);

    console.log(user);

    const initialRegister = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // password: user.password,
        address: user.address,
        picture: user.picturePath,
    };

    const validationRegister = yup.object({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        // password: yup.string().required("required"),
        address: yup.string().required("required"),
        picture: yup.string().required("required"),
    });

    const handleUpload = async () => {
        if (file == undefined) {
            setFile(user.picturePath);
        }
        const data = new FormData();
        console.log(file);
        data.append("image", file);
        await axios
            .post("http://localhost:3002/upload", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    return (
        <Formik
            enableReinitialize="true"
            initialValues={initialRegister}
            validationSchema={validationRegister}
            onSubmit={async (values, onSubmitProps) => {
                if (file == undefined) {
                    setFile(user.picturePath);
                }
                // const formData = new FormData();
                // for (let value in values) {
                //     formData.append(value, values[value]);
                // }
                // formData.append("picturePath", file);
                await axios
                    .put(
                        `http://localhost:3002/api/user/update/${user._id}`,
                        // formData,
                        {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.email,
                            // password,
                            address: values.address,
                            picturePath: file.name,
                        }
                    )
                    .then(function (response) {
                        console.log(response);
                        setIsSuccess(true);
                    })
                    .catch(function (error) {
                        onSubmitProps.setErrors({
                            email: "Email already exists",
                        });
                        console.log(error.response.data);
                        console.log(error.response);
                        console.log(error);
                    });
            }}
        >
            {({ handleSubmit, handleBlur, values, handleChange, errors }) => (
                <form onSubmit={handleSubmit} className="w-1/2 m-auto">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                    />
                    {errors.firstName ? (
                        <div className="text-red-500">{errors.firstName}</div>
                    ) : null}

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                    />
                    {errors.lastName ? (
                        <div className="text-red-500">{errors.lastName}</div>
                    ) : null}
                    <label htmlFor="image">New Image</label>
                    <input
                        name="image"
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                    <label htmlFor="oldImage">Old Image</label>
                    <img
                        src={`http://localhost:3002/assets/${user.picturePath}`}
                        alt=""
                    />
                    <aside>{thumbs}</aside>

                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                    />
                    {errors.email ? (
                        <div className="text-red-500">{errors.email}</div>
                    ) : null}

                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        name="address"
                        type="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                    />
                    {errors.address ? (
                        <div className="text-red-500">{errors.address}</div>
                    ) : null}

                    <div>
                        <button
                            onClick={() => {
                                handleUpload();
                            }}
                            type="submit"
                            className="w-full bg-blue-400 h-10 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default UpdateUser;