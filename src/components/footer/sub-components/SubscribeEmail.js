import PropTypes from "prop-types";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import cogoToast from "cogo-toast";
import { useState } from "react";

const CustomForm = ({ status, message, onValidated }) => {
  const [emailId, setEmailId] = useState(null);
  const submit = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailId.trim() === "") {
      cogoToast.error("Enter a vaild email", { position: "bottom-left" });
    } else if (!emailRegex.test(emailId)) {
      cogoToast.error("Enter a vaild email", { position: "bottom-left" });
    } else {
      cogoToast.success(
        "Done, new updates about our latest shop and special offers will sent to your mail.",
        { position: "bottom-left" }
      );
    }
  };

  return (
    <div className="subscribe-form">
      <div className="mc-form">
        <div>
          <input
            id="mc-form-email"
            className="email"
            value={emailId}
            onChange={(e) => {
              setEmailId(e.target.value);
            }}
            type="email"
            placeholder="Enter your email address..."
          />
        </div>
        <div className="clear">
          <button className="button" onClick={submit}>
            SUBSCRIBE
          </button>
        </div>
      </div>

      {status === "sending" && (
        <div style={{ color: "#3498db", fontSize: "12px" }}>sending...</div>
      )}
      {status === "error" && (
        <div
          style={{ color: "#e74c3c", fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "#2ecc71", fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  );
};

const SubscribeEmail = ({ mailchimpUrl }) => {
  return (
    <div>
      <MailchimpSubscribe
        url={mailchimpUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
};

SubscribeEmail.propTypes = {
  mailchimpUrl: PropTypes.string,
};

export default SubscribeEmail;
