import { useContext } from "react";
import { useRouter } from "next/router";

import StyledButton from "src/common/components/UI/StyledButton";

import AuthContext from "src/common/store/auth-context";

import classes from "./Profile.module.css";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const handleRedirectWithOrigin = () => {
    router.push("/login?origin=profile");
  };

  if (!authCtx.isLoggedIn) {
    return (
      <div className={classes.actionContainer}>
        <h2>You must signed in to view your profile</h2>
        <StyledButton size="large" onClick={handleRedirectWithOrigin}>
          Sign In
        </StyledButton>
      </div>
    );
  }

  return (
    <>
        <div>
            {authCtx.username}
        </div>
    </>
  );
};

export default Profile;
