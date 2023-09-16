import React, { useEffect, useState } from 'react'
import { signInWithPopup } from "firebase/auth";
import { auth, googleprovider } from "../../service/configFirebase";
import { useDispatch, useSelector } from 'react-redux';
import { loginModel, userLogin } from '../../store/slices/login-slice';
import { getApi, postApi } from '../../service/axiosCall';
import { apiAuth } from '../../service/api';
import cogoToast from 'cogo-toast';
import { addToCart } from '../../store/slices/cart-slice';
import { addToWishlist } from '../../store/slices/wishlist-slice';
export default function LoginModel() {

    const { ismodel, userdata } = useSelector((state) => state.login);
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch();
console.log(ismodel)
    const addinitdata = (userid) => {
        const url = `cart/${userid}`
        getApi(url)
            .then(res => dispatch(
                addToCart(res))).catch((err) => console.error(err))

    }
    const addwhishlistinitdata = (userid) => {
        const url = `wishlist/${userid}`
        getApi(url).then((res) => {
            if (res) {
                const wishlistData = {
                    product: res,
                    isdata: "dynamic",
                }
                dispatch(addToWishlist(wishlistData))
            }
        }).catch((err) => console.error(err))


    }
    const handleLoginApi = (user) => {
        const data = {
            firstname: user.displayName,
            email: user.email,
            phone: user.phoneNumber,
            photoURL: user.photoURL
        }
        postApi(data, apiAuth.login).then(res => {
            dispatch(userLogin(res))
            setLoader(false)
            addinitdata(res?.details?._id)
            addwhishlistinitdata(res?.details?._id)
            cogoToast.success(res.message, { position: 'bottom-left' });
            dispatch(loginModel())
        })
    }
    const handleLogin = () => {
        signInWithPopup(auth, googleprovider).then(res => handleLoginApi(res.user)).catch(err => console.error(err))
    }
    useEffect(() => {
        if (ismodel) {
            handleLogin()
        }
    }, [ismodel])

    return (
        <></>
    )
}
