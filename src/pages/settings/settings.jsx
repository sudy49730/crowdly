import "./settings.scss";
import { Button, Input, SelectPicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { notification, userService, auth } from "../../services";
import {
  CACHE_LOGGED_IN_USER,
  SIGN_OUT_USER,
} from "../../state-management/actions";

const SettingsPage = () => {
  const loggedInUser = useSelector((state) => state.user);
  const [bio, setBio] = useState(loggedInUser["bio"] || "");
  const [phone, setPhone] = useState(loggedInUser["phoneNumber"] || "");
  const [gender, setGender] = useState(loggedInUser["gender"] || "");

  const dispatch = useDispatch();

  const handelBioChange = (value) => {
    setBio(value);
  };
  const handelPhoneChange = (value) => {
    setPhone(value);
  };
  const handelGenderChange = (value) => {
    setGender(value || "na");
  };

  const refreshStoreWithUpdatedUserDetails = async () => {
    const response = await userService.getLoggedInUserExistingDetails(
      loggedInUser["uid"]
    );
    const token = loggedInUser["token"];
    dispatch(CACHE_LOGGED_IN_USER({ ...response, token }));
  };

  const signOutCurrentUser = async () => {
    await auth.signOutUser();
    dispatch(SIGN_OUT_USER());
  };

  const deleteAccount = () => {
    alert("Under development :)");
  };

  const updateDetails = async () => {
    const updatedUserDetails = {};
    updatedUserDetails["id"] = loggedInUser["id"];
    updatedUserDetails["bio"] = bio;
    updatedUserDetails["phoneNumber"] = phone;
    updatedUserDetails["gender"] = gender;
    const response = await userService.updateUserDetails(updatedUserDetails);
    if (response === null) {
      notification.error("Unable to update user details.");
    } else {
      notification.success("Details updated successfully!");
      await refreshStoreWithUpdatedUserDetails();
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="page-header">
          <h3>Settings</h3>
          <p>
            <i className="uil uil-info-circle"></i>&nbsp;This is the settings
            page from where you can change your account settings.
          </p>
        </div>
        <div className="settings-content">
          <div className="personal-details">
            <h6>Personal Details</h6>
            <table className="table">
              <tbody>
                <tr>
                  <td className="title">Name</td>
                  <td>{loggedInUser["displayName"]}</td>
                </tr>
                <tr>
                  <td className="title">Email</td>
                  <td>{loggedInUser["email"]}</td>
                </tr>
                <tr>
                  <td className="title">Bio</td>
                  <td>
                    <Input
                      onChange={handelBioChange}
                      value={bio}
                      placeholder={loggedInUser["bio"]}
                      as="textarea"
                      rows={3}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">Phone</td>
                  <td>
                    <Input
                      onChange={handelPhoneChange}
                      value={phone}
                      placeholder={"eg: 8123456712"}
                      min={0}
                      max={10}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">Gender</td>
                  <td>
                    <SelectPicker
                      onChange={handelGenderChange}
                      value={gender}
                      block
                      searchable={false}
                      appearance="subtle"
                      data={[
                        { label: "Male", value: "male", role: "Master" },
                        { label: "Female", value: "female", role: "Master" },
                        {
                          label: "Rather not say",
                          value: "na",
                          role: "Master",
                        },
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title"></td>
                  <td>
                    <Button
                      appearance="primary"
                      color="green"
                      onClick={updateDetails}
                    >
                      Update Details
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="privacy-details">
            <h6>Privacy</h6>
            <table className="table">
              <tbody>
                <tr>
                  <td className="title">Last login date</td>
                  <td>{loggedInUser["lastLoginTime"]}</td>
                </tr>
                <tr>
                  <td className="title">Revoke all access</td>
                  <td>
                    <a href="#" className="green" onClick={signOutCurrentUser}>
                      Log out of all devices
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="title">Delete account</td>
                  <td>
                    <a href="#" className="red" onClick={deleteAccount}>
                      Delete my account
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsPage };
