import './less/main.less';
import { View } from "./view";
import { Controller } from "./controller";

const view = new View('.age-calculator__form');
const constroller = new Controller(view);
constroller.init();
