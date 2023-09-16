import cogoToast from "cogo-toast";
import { apiProduct } from "../../service/api";
import { getApi, postApi, putApi } from "../../service/axiosCall";
import { userinfo } from "../../service/UserCheck";

export const orderPayment = (
  totalAmount,
  products,
  user,
  orderaddress,
  updatepaymentid
) => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.onerror = () => {
    cogoToast.error("Razorpay SDK failed to load. Are you online?");
  };
  script.onload = async () => {
    try {
      const amoutData = {
        amount: totalAmount * 100,
      };
      const result = await postApi(amoutData, apiProduct.createorder);
      const { amount, id: order_id, currency } = result;
      const { key } = await getApi(apiProduct.getrazorpay);
      let orderid;
      if (key) {
        if (!updatepaymentid) {
          const sentData = {
            userId: user?.userid,
            phone: user?.phone,
            address: orderaddress,
            paymentmode: "ONLINE",
            orderstatus: "Payment Pending",
            products: products,
            amount: totalAmount,
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
        }
      }
      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: "Shopwer",
        order_id: order_id,
        handler: async function (response) {
          // const sentData = {
          //   userId: user?._id,
          //   phone: orderaddress?.mobile,
          //   address: orderaddress,
          //   orderstatus: "Order Placed",
          //   products: products,
          //   amount: totalAmount,
          //   paymentmode: "ONLINE",
          //   razorpayPaymentId: response.razorpay_payment_id,
          //   razorpayOrderId: response.razorpay_order_id,
          //   razorpaySignature: response.razorpay_signature,
          // };

          const data = {
            orderid: updatepaymentid ? updatepaymentid : orderid,
            paymentmode: "ONLINE",
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          await putApi(data, apiProduct.updatepaymentorder)
            .then((res) => {
              if (userinfo) {
                window.location.replace(`/orders`);
              } else {
                window.location.replace(`/`);
              }
            })
            .catch((err) =>
              cogoToast.error(`Something went worng, Please contact us`)
            );
        },
        prefill: {
          name: user?.firstname,
          email: user?.email,
          contact: user?.phone,
        },
        notes: {
          address: orderaddress,
        },
        // theme: {
        //   color: "#80c0f0",
        // },
      };

      // setLoading(false);
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert(err);
      // setLoading(false);
    }
  };
  document.body.appendChild(script);
};
