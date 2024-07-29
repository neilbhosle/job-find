import React from 'react';
import './RightPanel.css';
// import GoogleSignIn from './GoogleSignIn';

const RightPanel = () => {
  return (
    <div className="right-panel">
      <h2>Welcome to JobFind</h2>
      {/* <GoogleSignIn /> */}
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <p>OR</p>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <label>
          <input type="checkbox" /> I want to receive updates from JobFind about latest job offers
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        By continuing, you agree to the JobFind <button className="link-button" onClick={() => {}}>Terms of Service</button> and <button className="link-button" onClick={() => {}}>Privacy Policy</button>
      </p>
      <p>
        Already a member? <button className="link-button" onClick={() => {}}>Sign in now</button>
      </p>
    </div>
  );
};

export default RightPanel;
