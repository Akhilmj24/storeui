import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postApi } from "../../utils/service/axiosCall";
import banner from "../../utils/images/loginBanner.png";

export default function Forgotpassword() {
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [ispasswordShow, setispasswordShow] = useState(false);
    const [isloading, setisLoading] = useState(false);
    const navigate = useNavigate();
    const { id, token } = useParams()

    const passwordRestHandler = (e) => {
        e.preventDefault();
        if (password.trim() === "") {
            toast.error("Please enter password");
        } else if (confirmpassword.trim() === "") {
            toast.error("Please enter confirm password");
        } else {
            const url = `auth/${id}/updatepassword/${token}`
            const data = {
                password: password,
            };
            setisLoading(true)
            postApi(data, url).then((res) => {
                toast.success(res.message)
                setisLoading(false)
                navigate("/auth/signin");
            })
                .catch((err) => {
                    toast.error(err.response.data.message)
                    setisLoading(false)
                    setTimeout(() => {
                        if (err.response.data.message === "Try again the link is expired.")
                            navigate("/auth/signin");
                    }, 200);
                })

        }
    };
    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl" src={banner} />
                </div>
                <div className="md:w-1/2 px-8 md:px-12">
                    <h2 className="font-bold text-2xl text-blueShade">Reset Password</h2>
                    <p className="text-xs mt-4 text-lightGry">Securely reset your password and regain access to your account.</p>
                    <form className="flex flex-col gap-3 mt-8" onSubmit={(e) => passwordRestHandler(e)}>

                        <div className="relative">
                            <label htmlFor="" className="text-xs mb-1 text-lightGry">New Password</label>
                            <input className="p-2 rounded-md border w-full" type={ispasswordShow ? `text` : `password`} placeholder="New Password" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <div className="absolute cursor-pointer top-11 right-3 -translate-y-1/2" onClick={() => setispasswordShow(!ispasswordShow)}>
                                <ion-icon name={ispasswordShow ? `eye-off-outline` : `eye-outline`} ></ion-icon>
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="" className="text-xs mb-1 text-lightGry">Confirm Password</label>
                            <input className="p-2 rounded-md border w-full"
                                type={ispasswordShow ? `text` : `password`}
                                name="password"
                                placeholder="Confirm Password"
                                value={confirmpassword}
                                onChange={(e) => setConfirmpassword(e.target.value)} />
                            <div className="absolute cursor-pointer top-11 right-3 -translate-y-1/2" onClick={() => setispasswordShow(!ispasswordShow)}>
                                <ion-icon name={ispasswordShow ? `eye-off-outline` : `eye-outline`} ></ion-icon>
                            </div>
                        </div>
                        <button className="bg-blueShade rounded-md text-white py-2" disabled={isloading} >{isloading ? 'Saving...' : 'Save'}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
