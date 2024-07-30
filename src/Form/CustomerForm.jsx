import { useState } from "react";
import "./CustomerForm.css";

import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValidPan, setIsValidPan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [postCode, setPostCode] = useState("");
  const [postCodeError, setPostCodeError] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressError, setAddressError] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const navigate = useNavigate();

  /**===================Validation of PAN================= */

  const validatePan = (value) => {
    const validateRule = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    value = value.toUpperCase();
    setPan(value);

    if (value === "") {
      setPanError("Pan number is required*");
      return false;
    } else if (!validateRule.test(value)) {
      setPanError("Please enter a valid PAN number");
      return false;
    } else {
      setPanError("");
      return true;
    }
  };

  const handlePanChange = (e) => {
    validatePan(e.target.value);
  };

  /**===================Validation of PAN================= */

  /**===================Validation of Full name================= */

  const validateFullName = (value) => {
    const maxLengthRule = 140;
    setFullName(value);

    if (value === "") {
      setFullNameError("Full name is required*");
      return false;
    } else if (value.length > maxLengthRule) {
      setFullNameError("Full name should be less than 140 characters");
      return false;
    } else {
      setFullNameError("");
      return true;
    }
  };

  const handleFullNameChange = (e) => {
    validateFullName(e.target.value);
  };

  /**===================Validation of full name================= */

  /**===================Validation of email================= */

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const maxLength = 255;
    setEmail(value);

    if (value === "") {
      setEmailError("Email is required*");
      return false;
    } else if (!emailRegex.test(value)) {
      setEmailError("Kindly enter a valid email");
      return false;
    } else if (value.length > maxLength) {
      setEmailError("Email must be no longer than 255 characters");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleEmailChange = (e) => {
    validateEmail(e.target.value);
  };

  /**===================Validation of email================= */

  /**===================Validation of Address================= */

  const validateAddress = (value) => {
    setAddressLine1(value);

    if (value === "") {
      setAddressError("Address line 1 is required*");
      return false;
    } else {
      setAddressError("");
      return true;
    }
  };

  const handleAddress1Change = (e) => {
    validateAddress(e.target.value);
  };

  /**===================Validation of Address================= */

  /**===================Validation of PostCode================= */

  const validatePostCode = (value) => {
    const postCodeRegex = /^\d{6}$/;
    setPostCode(value);

    if (value === "") {
      setPostCodeError("Post code is required*");
      return false;
    } else if (!postCodeRegex.test(value)) {
      setPostCodeError("Please enter a valid 6-digit post code");
      return false;
    } else {
      setPostCodeError("");
      return true;
    }
  };

  const handlePostCodeChange = (e) => {
    validatePostCode(e.target.value);
  };

  /**===================Validation of Post Code================= */

  /**==================Verify Pan number======================== */

  const verifyPan = async (e) => {
    e.preventDefault();
    if (!validatePan(pan)) {
      return;
    } else {
      setLoading(true);
      axios({
        method: "POST",
        url: `https://lab.pixel6.co/api/verify-pan.php`,
        data: {
          panNumber: pan,
        },
      })
        .then((response) => {
          console.log(response.data);
          setIsValidPan(response.data?.isValid);
          setFullName(response.data?.fullName);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  /**==================Verify Pan number======================== */

  /*===============================Verify post code==================== */

  const verifyPostCode = async () => {
    if (!validatePostCode(postCode)) {
      return;
    } else {
      setPostLoading(true);
      axios({
        method: "POST",
        url: `https://lab.pixel6.co/api/get-postcode-details.php`,
        data: {
          postcode: postCode,
        },
      })
        .then((response) => {
          console.log(response.data);
          setCity(response.data?.city[0]?.name);
          setState(response.data?.state[0]?.name);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setPostLoading(false);
        });
    }
  };

  /**=================================Verify postCode======================= */

  /**======================Form submit================================== */

  const handleSubmit = async () => {
    if (
      !validateEmail(email) ||
      !validateAddress(addressLine1) ||
      !validatePostCode(postCode)
    ) {
      return;
    } else {
      let userData = {
        panNumber: pan,
        fullName: fullName,
        email: email,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        postCode: postCode,
        city: city,
        state: state,
      };

      let existingData = JSON.parse(localStorage.getItem("allUser")) || [];

      const filteredExistingData = existingData.find(
        (user) => user.panNumber === pan
      );
      //   console.log(filteredExistingData);
      if (filteredExistingData) {
        alert("Pan Number already exist try with another one");
      } else {
        existingData.push(userData);
        localStorage.setItem("allUser", JSON.stringify(existingData));
        navigate("/customerlist");
      }
    }
  };

  /**======================Form submit================================== */

  return (
    <div className="container">
      <h2 className="logo">LOGO</h2>
      <div className="justify-content-end align-items-end d-flex">
        <Link className="btn btn-outline-primary" to="/customerlist">
          Customer List
        </Link>
      </div>
      <div className="customerForm">
        <h3 className="signup">Sign Up</h3>
        <div>
          <form className="form-field-pan" onSubmit={verifyPan}>
            <div>
              <TextField
                error={panError !== ""}
                id="filled-basic"
                label="Enter Pan Number"
                variant="filled"
                className="panField"
                required
                onChange={handlePanChange}
                disabled={isValidPan}
                value={pan}
              />
            </div>

            <Button
              color={panError !== "" ? "error" : "primary"}
              variant="outlined"
              className="verifyPan"
              type="submit"
              disabled={isValidPan}
            >
              Verify PAN
              {loading && <CircularProgress size={20} />}
            </Button>
          </form>
          {panError !== "" && (
            <p className="text-danger errorMessage">{panError}</p>
          )}
        </div>

        {isValidPan && (
          <>
            <div className="form-field-fullname">
              <TextField
                id="filled-basic"
                label="Enter Full Name"
                variant="filled"
                className="textField"
                required
                value={fullName}
                onChange={handleFullNameChange}
              />
              {fullNameError !== "" && (
                <p className="text-danger errorMessage">{fullNameError}</p>
              )}
            </div>
            <div className="form-field-email">
              <TextField
                type="email"
                id="filled-basic"
                label="Enter Email"
                variant="filled"
                className="textField"
                required
                value={email}
                onChange={handleEmailChange}
              />
              {emailError !== "" && (
                <p className="text-danger errorMessage">{emailError}</p>
              )}
              <div className="form-field-address">
                <TextField
                  id="filled-basic"
                  label="Address Line 1"
                  variant="filled"
                  className="addressField"
                  required
                  value={addressLine1}
                  multiline
                  rows={"3"}
                  onChange={handleAddress1Change}
                />
                <TextField
                  id="filled-basic"
                  label="Address Line 2"
                  variant="filled"
                  className="addressField"
                  value={addressLine2}
                  multiline
                  rows={"3"}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </div>
              {addressError !== "" && (
                <p className="text-danger errorMessage">{addressError}</p>
              )}
              <div className="form-field-postcode">
                <TextField
                  id="filled-basic"
                  label="Post code"
                  variant="filled"
                  className="postCode"
                  required
                  value={postCode}
                  onChange={handlePostCodeChange}
                  onBlur={verifyPostCode}
                />
                {postLoading && <CircularProgress size={20} />}
                <TextField
                  id="filled-basic"
                  label="City"
                  variant="filled"
                  className="postCode"
                  value={city}
                  required
                  disabled
                />
              </div>
              {postCodeError !== "" && (
                <p className="text-danger errorMessage">{postCodeError}</p>
              )}
              <div className="form-field-postcode">
                <TextField
                  id="filled-basic"
                  label="State"
                  variant="filled"
                  className="postCode"
                  value={state}
                  required
                  disabled
                />
                <Button
                  variant="outlined"
                  color="success"
                  className="submitButton"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerForm;
