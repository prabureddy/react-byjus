import React from "react";
import classes from "./SignUp.css";

const SignUp = (props) => {
    
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
                className={[...[classes.navLink]].join(
                  " "
                )}
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Employee
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
                Hirer
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
                Apply as a Employee
              </h3>
              <div
                className={[...["row"], ...[classes.registerForm]].join(" ")}
              >
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <div className="maxl">
                      <label className="radio inline">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked
                        />
                        <span> Male </span>
                      </label>
                      <label className="radio inline">
                        <input type="radio" name="gender" value="female" />
                        <span>Female </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      minlength="10"
                      maxlength="10"
                      name="txtEmpPhone"
                      className="form-control"
                      placeholder="Your Phone *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <select className="form-control">
                      <option className="hidden" selected disabled>
                        Please select your Sequrity Question
                      </option>
                      <option>What is your Birthdate?</option>
                      <option>What is Your old Phone Number</option>
                      <option>What is your Pet Name?</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Answer *"
                      value=""
                    />
                  </div>
                  <input
                    type="submit"
                    className={[...[classes.btnRegister]].join(" ")}
                    value="Register"
                  />
                </div>
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
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      maxlength="10"
                      minlength="10"
                      className="form-control"
                      placeholder="Phone *"
                      value=""
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password *"
                      value=""
                    />
                  </div>
                  <div className="form-group">
                    <select className="form-control">
                      <option className="hidden" selected disabled>
                        Please select your Sequrity Question
                      </option>
                      <option>What is your Birthdate?</option>
                      <option>What is Your old Phone Number</option>
                      <option>What is your Pet Name?</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="`Answer *"
                      value=""
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
