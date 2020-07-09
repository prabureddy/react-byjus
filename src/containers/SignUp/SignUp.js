import React, { useState, useEffect } from "react";
import classes from "./SignUp.css";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import swal from "sweetalert";
import PasswordStrengthBar from "react-password-strength-bar";
import { useForm as studentUseForm } from "react-hook-form";
import iziToast from "izitoast";

const SignUp = (props) => {
  const [fetched, setFetched] = useState(false);
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [availableGrades, setAvailableGrades] = useState([]);
  const [studentEmailExists, setStudentEmailExists] = useState(true);

  var passwordValidator = require("password-validator");

  const { register, handleSubmit, errors, getValues } = studentUseForm({
    mode: "onBlur",
  });
  const studentRegister = register;
  const studentHandleSubmit = handleSubmit;
  const studentErrors = errors;
  const studentGetValues = getValues;

  const getGradesAndPrograms = async () => {
    try {
      const [{ data: allPrograms }, { data: allGrades }] = await Promise.all([
        axios.get("/api/v1/program/"),
        axios.get("/api/v1/grade/"),
      ]);
      setAvailablePrograms(allPrograms);
      setAvailableGrades(allGrades);
      setFetched(true);
    } catch (err) {
      swal({
        title: err.message,
        text: "If Error Persists, Please contact Us.",
        icon: "error",
        buttons: {
          contact: "Contact Us",
          ok: "OK!",
        },
      }).then((value) => {
        switch (value) {
          case "contact":
            props.history.push("/contact/");
            break;

          default:
            break;
        }
      });
    }
  };

  const studentFormValues = studentGetValues();

  const checkStudentEmailExists = async (email) => {
    let message;
    await axios
      .get(`/api/v1/user/email/?email=${email}`)
      .then(function (response) {
        let receivedEmail = response?.data[0]?.email;
        if (email !== receivedEmail) {
          setStudentEmailExists(false);
          return true;
        }
        setStudentEmailExists(true);
        message = "Email Already Exists";
      })
      .catch(function (err) {
        swal({
          title: err.response.data,
          text: "If Error Persists, Please contact Us.",
          icon: "error",
          buttons: {
            contact: "Contact Us",
            ok: "OK!",
          },
        }).then((value) => {
          switch (value) {
            case "contact":
              props.history.push("/contact/");
              break;

            default:
              break;
          }
        });
      });

    return message;
  };

  const validateStudentPassword = async (password) => {
    var schema = new passwordValidator();

    schema
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .not()
      .spaces()
      .is()
      .not()
      .oneOf([
        studentFormValues.studentFirstName,
        studentFormValues.studentLastName,
        studentFormValues.studentEmail,
      ]);
    const validatePassword = schema.validate(password, { list: true });
    if (validatePassword.length === 0) {
      return true;
    } else {
      let errorTypes = [
        {
          name: "uppercase",
          message: "Password should contain atleast one Uppercase letter",
        },
        {
          name: "lowercase",
          message: "Password should contain atleast one lowercase letter",
        },
        {
          name: "digits",
          message: "Password should contain atleast one digit",
        },
        {
          name: "spaces",
          message: "Password should not contain space",
        },
        {
          name: "oneOf",
          message: "Password should not be similar to your name or email",
        },
      ];

      let message;

      validatePassword.forEach((errorList) => {
        errorTypes.forEach((errorType) => {
          if (errorList === errorType.name) {
            message = errorType.message;
          }
        });
      });
      return message;
    }
  };

  const validateStudentConfirmPassword = (confirmPassword) => {
    let password = studentFormValues.studentPassword;
    if (password === confirmPassword) return true;
    return "Password and Confirm Password are not same.";
  };

  // onSubmit Method
  const postStudentSignUp = async (data) => {
    let studentData = {
      email: data.studentEmail,
      password: data.studentPassword,
      first_name: data.studentFirstName,
      last_name: data.studentLastName,
    };
    let userId;
    await axios
      .post("/api/v1/signup/usersignup/", studentData)
      .then(function (response) {
        userId = response.data.user;

        if (userId > 0 && response.data.status == "SUCCESS") {
          let grade = availableGrades.find(
            (grade) => grade.grade_text === data.studentGrade
          );
          let studentData = {
            user: userId,
            grade: grade.id,
          };
          if (data.studentMobile.length === 10)
            studentData["studentMobile"] = data.studentMobile;

          axios
            .post("/api/v1/signup/usersignup/student/", studentData)
            .then(function (response) {
              iziToast.success({
                title: "Successfully Registered",
                message: "Please Verify your Email Address!",
              });
            })
            .catch(function (err) {
              swal({
                title: err.response.data,
                text: "If Error Persists, Please contact Us.",
                icon: "error",
                buttons: {
                  contact: "Contact Us",
                  ok: "OK!",
                },
              }).then((value) => {
                switch (value) {
                  case "contact":
                    props.history.push("/contact/");
                    break;

                  default:
                    break;
                }
              });
            });
        }
      })
      .catch(function (err) {
        swal({
          title: err.response.data,
          text: "If Error Persists, Please contact Us.",
          icon: "error",
          buttons: {
            contact: "Contact Us",
            ok: "OK!",
          },
        }).then((value) => {
          switch (value) {
            case "contact":
              props.history.push("/contact/");
              break;

            default:
              break;
          }
        });
      });
  };

  useEffect(() => {
    if (fetched === false) {
      getGradesAndPrograms();
    }
  }, [fetched]);

  if (fetched === false)
    return (
      <div
        className={[...["container-fluid"]].join(" ")}
        style={{ backgroundColor: "#235368" }}
      >
        <div className={[...["row"], ...[classes.gap]].join(" ")}>
          <Spinner />
        </div>
      </div>
    );

  let studentGrades;

  studentGrades = availablePrograms.map((program, index) => {
    let options = [];
    availableGrades.filter((grade) => {
      if (grade.program === program.id) {
        let grade_text =
          grade.grade_text.charAt(0).toUpperCase() + grade.grade_text.slice(1);
        options.push(
          <option key={grade_text} value={grade_text}>
            {grade_text}
          </option>
        );
      }
    });
    if (options.length === 0) return;
    let program_text =
      program.program_text.charAt(0).toUpperCase() +
      program.program_text.slice(1);
    return (
      <optgroup key={program_text} label={program_text}>
        {options}
      </optgroup>
    );
  });
  return (
    <div className={[...["container-fluid"], ...[classes.register]].join(" ")}>
      <div className={[...["row"], ...[classes.gap]].join(" ")}>
        <div className={[...["col-md-3"], ...[classes.registerLeft]].join(" ")}>
          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
          <h3>Welcome</h3>
          <p>You are 30 seconds away from earning your own money!</p>
          <input type="submit" name="" value="Login" />
          <br />
        </div>
        <div
          className={[...["col-md-9"], ...[classes.registerRight]].join(" ")}
        >
          <ul
            className={[
              ...["nav"],
              ...[classes.navTabs],
              ...["nav-justified"],
            ].join(" ")}
            id="myTab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className={[...[classes.navLink], ...["active"]].join(" ")}
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Student
              </a>
            </li>
            <li className="nav-item">
              <a
                className={[...[classes.navLink]].join(" ")}
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Teacher
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <h3 className={[...[classes.registerHeading]].join(" ")}>
                Student Sign Up
              </h3>
              <div className={[...[classes.registerForm]].join(" ")}>
                <form
                  id="studentSignUpForm"
                  onSubmit={studentHandleSubmit(postStudentSignUp)}
                >
                  <div
                    className={[...["row"], ...[classes.inputStyling]].join(
                      " "
                    )}
                  >
                    <div className="col-8">
                      <div className="row">
                        <div className={[...["col-6"]].join(" ")}>
                          <div className="form-group">
                            <input
                              type="text"
                              className={
                                studentErrors?.studentFirstName
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              placeholder="First Name *"
                              name="studentFirstName"
                              ref={studentRegister({
                                required: {
                                  value: true,
                                  message: "This field is required ",
                                },
                                minLength: {
                                  value: 4,
                                  message: "Enter minimum 4 letters",
                                },
                                maxLength: {
                                  value: 15,
                                  message: "Maximum 15 letters allowed",
                                },
                              })}
                            />
                            {studentErrors?.studentFirstName && (
                              <div className="invalid-feedback">
                                {studentErrors.studentFirstName.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className={
                                studentErrors?.studentLastName
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              placeholder="Last Name *"
                              name="studentLastName"
                              ref={studentRegister({
                                required: {
                                  value: true,
                                  message: "This field is required ",
                                },
                                minLength: {
                                  value: 4,
                                  message: "Enter minimum 4 letters",
                                },
                                maxLength: {
                                  value: 15,
                                  message: "Maximum 15 letters allowed",
                                },
                              })}
                            />
                            {studentErrors?.studentLastName && (
                              <div className="invalid-feedback">
                                {studentErrors.studentLastName.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={[...["row"], ...[classes.inputStyling]].join(
                      " "
                    )}
                  >
                    <div className="col-8">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <input
                              type="email"
                              className={
                                studentErrors?.studentEmail
                                  ? "form-control is-invalid"
                                  : !studentEmailExists
                                  ? "form-control is-valid"
                                  : "form-control"
                              }
                              placeholder="Your Email *"
                              name="studentEmail"
                              ref={studentRegister({
                                required: {
                                  value: true,
                                  message: "This field is required ",
                                },
                                pattern: {
                                  value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                                  message: "Enter a Valid Email",
                                },
                                validate: {
                                  checkEmailExist: (email) =>
                                    checkStudentEmailExists(email),
                                },
                              })}
                            />
                            {studentErrors?.studentEmail && (
                              <div className="invalid-feedback">
                                {studentErrors.studentEmail.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={[...["row"], ...[classes.inputStyling]].join(
                      " "
                    )}
                  >
                    <div className="col-8">
                      <div className="row">
                        <div className={[...["col-6"]].join(" ")}>
                          <div className="form-group">
                            <input
                              type="password"
                              className={
                                studentErrors?.studentPassword
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              placeholder="Password *"
                              name="studentPassword"
                              ref={studentRegister({
                                required: {
                                  value: true,
                                  message: "This field is required ",
                                },
                                minLength: {
                                  value: 8,
                                  message:
                                    "Password length should be minimum 8",
                                },
                                maxLength: {
                                  value: 15,
                                  message:
                                    "Password length should be maximum 15",
                                },
                                validate: {
                                  validatePassword: (password) =>
                                    validateStudentPassword(password),
                                },
                              })}
                            />
                            {studentFormValues?.studentPassword?.length > 0 && (
                              <PasswordStrengthBar
                                style={{ width: "92%" }}
                                password={studentFormValues.studentPassword}
                              />
                            )}
                            {studentErrors?.studentPassword && (
                              <div className="invalid-feedback">
                                {studentErrors.studentPassword.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={[...["col-6"]].join(" ")}>
                          <div className="form-group">
                            <div style={{ flexDirection: "column" }}>
                              <input
                                type="password"
                                className={
                                  studentErrors?.studentConfirmPassword
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                placeholder="Confirm Password *"
                                name="studentConfirmPassword"
                                ref={studentRegister({
                                  required: {
                                    value: true,
                                    message: "This field is required ",
                                  },
                                  validate: (confirmPassword) =>
                                    validateStudentConfirmPassword(
                                      confirmPassword
                                    ),
                                })}
                              />
                              {studentErrors?.studentConfirmPassword && (
                                <div className="invalid-feedback">
                                  {studentErrors.studentConfirmPassword.message}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={[...["row"], ...[classes.inputStyling]].join(
                      " "
                    )}
                  >
                    <div className="col-8 form-inline">
                      <div className="row">
                        <div className={[...["col-6"]].join(" ")}>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <div className="input-group-text">+91</div>
                            </div>
                            <input
                              type="tel"
                              minLength="10"
                              maxLength="10"
                              name="txtEmpPhone"
                              className={
                                studentErrors?.studentMobile
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              placeholder="Your Phone"
                              name="studentMobile"
                              ref={studentRegister({
                                minLength: {
                                  value: 10,
                                  message: "Mobile length should be minimum 10",
                                },
                                maxLength: {
                                  value: 10,
                                  message: "Mobile length should be maximum 10",
                                },
                                pattern: {
                                  value: /^(0|[1-9][0-9]*)$/,
                                  message: "It should contain only numbers",
                                },
                              })}
                            />
                            {studentErrors?.studentMobile && (
                              <div className="invalid-feedback">
                                {studentErrors.studentMobile.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <select
                              className="form-control"
                              name="studentGrade"
                              ref={studentRegister}
                            >
                              <option
                                className="hidden"
                                value="Please select your Grade"
                                disabled
                              >
                                Please select your Grade
                              </option>
                              {studentGrades}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={[...["row"], ...[classes.inputStyling]].join(
                      " "
                    )}
                  >
                    <div className="col-8">
                      <div className="row justify-content-end">
                        <div className="col-8">
                          <input
                            type="submit"
                            className={[...[classes.btnRegister]].join(" ")}
                            value="Register"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="tab-pane fade show"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <h3 className={[...[classes.registerHeading]].join(" ")}>
                Apply as a Hirer
              </h3>
              <div
                className={[...["row"], ...[classes.registerForm]].join(" ")}
              >
                <div className="col-md-6">
                  <div className="form-group pt-3 pb-3 pr-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name *"
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                  <div className="form-group pt-3 pb-3 pr-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name *"
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                  <div className="form-group pt-3 pb-3 pr-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email *"
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                  <div className="form-group pt-3 pb-3 pr-3">
                    <input
                      type="text"
                      maxLength="10"
                      minLength="10"
                      className="form-control"
                      placeholder="Phone *"
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group pt-3 pb-3 pr-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password *"
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                  <div className="form-group pt-3 pb-3 pr-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password *"
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                  <div className="form-group pt-3 pb-3 pr-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="`Answer *"
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btnRegister"
                    value="Register"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
