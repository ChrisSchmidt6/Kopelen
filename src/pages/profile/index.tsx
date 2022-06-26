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
      <section className={classes.actionContainer}>
        <h2>You must be signed in to view your profile</h2>
        <StyledButton size="large" onClick={handleRedirectWithOrigin}>
          Sign In
        </StyledButton>
      </section>
    );
  }

  return (
    <>
      <section className={classes.container}>
        <h3>{authCtx.username}</h3>
        <div className={classes.containerBody}>
          <ul className={classes.info}>
            <li>Email: placeholder</li>
            <li>Authenticated: boolean</li>
            <li>Date joined: Date</li>
          </ul>
          <div className={classes.options}>
            <a>My Threads</a>
            <a>My Comments</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
