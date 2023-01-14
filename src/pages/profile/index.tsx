import { useRouter } from "next/router";

import StyledButton from "src/common/components/UI/StyledButton";

import classes from "./Profile.module.css";
import { useAppSelector } from "src/common/hooks/reduxHooks";

const Profile = () => {
  const authInfo = useAppSelector((state) => state.authSlice);
  const router = useRouter();

  const handleRedirectWithOrigin = () => {
    router.push("/login?origin=profile");
  };

  if (!authInfo.isLoggedIn) {
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
        <h3>{authInfo.username}</h3>
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
