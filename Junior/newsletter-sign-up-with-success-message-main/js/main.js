const model = new Model();
const view = new View(".form", ".newsletter", ".success-screen");
const controller = new Controller(view, model);
controller.init();
