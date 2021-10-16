//

import classes from './NavigationDrawer.module.css';

const NavigationDrawer = () => {
  return (
    <>
      <div className={classes.menu}>
          <ul className={classes.navigation}>
            <li>Account</li>
          </ul>
      </div>
    </>
  );
};

export default NavigationDrawer;
