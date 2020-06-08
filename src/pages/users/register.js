import React, { useEffect, useState } from "react";
import { RegisterForm } from "../../components/form/index";
import { userManager } from "../../modules/index";
import "../../styles/RegisterView.css"
const Register = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: null,
    lastName: "",
    address: "",
    phoneNumber: "",
  });
  const [failedLogin, setFailedLogin] = useState(false);
  const [failedLoginMessage, setFailedLoginMessage] = useState("false");

  const handleFieldChange = (evt) => {
    const stateToChange = { ...formData };
    stateToChange[evt.target.id] = evt.target.value;
    setFormData(stateToChange);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    for (let item in formData) {
      if (formData[item].trim() == "") {
        let newItem = [];
        [...item].forEach((element) => {
          if (element == element.toUpperCase()) {
            newItem.push(" ");
          }
          newItem.push(element.toLowerCase());
        });
        errors.push(newItem.join(""));
      }
    }

    if (errors.length > 0) {
      setFailedLogin(true);
      setFailedLoginMessage(
        "The following must not only contain spaces: " + errors.join(", ")
      );
    } else {
      const user = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        address: formData.address.trim(),
        phone_number: formData.phoneNumber.trim(),
      };

      userManager
        .register(user)
        .then((resp) => {
          if ("token" in resp) {
            props.setUserToken(resp);
            props.history.push("/");
          }
        })
        // With a 500 HTTP error, no response is given,
        // so the error must be handled with .catch
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
        .catch(() => {
          setFailedLogin(true);
          setFailedLoginMessage(
            "The username you entered is already in use, please try again."
          );
        });
    }
  };

  useEffect(() => {}, [failedLogin]);

  return (
    <div className="register-form-view">
      <RegisterForm
        handleFieldChange={handleFieldChange}
        failedLogin={failedLogin}
        failedLoginMessage={failedLoginMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;
