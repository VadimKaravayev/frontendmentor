import Logo from "./components/Logo";
import HeroMessage from "./components/HeroMessage";
import SubscribeCta from "./components/SubscribeCta";
import HeroImage from "./components/HeroImage";
import SocialMediaBlock from "./components/SocialMediaBlock";
import Copyright from "./components/Copyright";

function App() {
  return (
    <div className="app">
      <Logo />
      <HeroMessage>
        <span className="wording-1">We are launching </span>
        <span className="wording-2">soon!</span>
      </HeroMessage>
      <SubscribeCta />
      <HeroImage />
      <SocialMediaBlock />
      <Copyright />
    </div>
  );
}

export default App;
