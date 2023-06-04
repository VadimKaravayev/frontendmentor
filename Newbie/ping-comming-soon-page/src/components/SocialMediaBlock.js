import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
} from "react-icons/io5";

function SocialMediaBlock() {
  return (
    <div className="social-media-block-cmp">
      <a className="social-media-link" href="#">
        <IoLogoFacebook />
      </a>
      <a className="social-media-link" href="#">
        <IoLogoTwitter />
      </a>
      <a className="social-media-link" href="#">
        <IoLogoInstagram />
      </a>
    </div>
  );
}

export default SocialMediaBlock;
