import cogoToast from "cogo-toast";
import { apiProduct } from "../../service/api";
import { getApi, postApi, putApi } from "../../service/axiosCall";
import { userinfo } from "../../service/UserCheck";
let data = sessionStorage.getItem("user");
console.log(data);
export const orderCODPayment = async (
  totalAmount,
  products,
  user,
  orderaddress,
  updatepaymentid
) => {
  let orderid;
  const sentData = {
    userId: user?.userid,
    phone: user?.phone,
    address: orderaddress,
    orderstatus: "Payment Pending",
    products: products,
    amount: totalAmount,
    paymentmode: "COD",
    email: user?.email,
    name: user?.firstname + " " + user?.lastname,
    razorpayPaymentId: "",
    razorpayOrderId: "",
    razorpaySignature: "",
  };
  await postApi(sentData, apiProduct.placeorder)
    // .then((res) => window.location.replace(`/orders`))
    .then((res) => (orderid = res.id))
    .catch((err) =>
      cogoToast.error(
        `Something went wrong, kindly contact us rather than making a payment.`
      )
    );
  const data = {
    orderid: updatepaymentid ? updatepaymentid : orderid,
    paymentmode: "COD",
    razorpayPaymentId: "",
    razorpayOrderId: "",
    razorpaySignature: "",
  };
  await putApi(data, apiProduct.updatepaymentorder)
    .then((res) => {
      if (userinfo) {
        window.location.replace(`/orders`);
      } else {
        window.location.replace(`/`);    
      }
    })
    .catch((err) => cogoToast.error(`Something went worng, Please contact us`));
};
