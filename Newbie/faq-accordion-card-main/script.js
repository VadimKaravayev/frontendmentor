const accordion = document.querySelector(".accordion");
const items = Array.from(accordion.querySelectorAll(".accordion-item"));
const COLLAPSE_DELAY = 100;

const getButton = (item) => item.querySelector(".accordion-button");
const getCollapsable = (item) => item.querySelector(".accordion-collapse");

items.forEach((item) =>
  getButton(item).addEventListener("click", () => handleClick(item)(items))
);

const handleClick = (currentItem) => (allItems) => {
  collapseAnyOtherItem(currentItem)(allItems);
  toggleItem(currentItem);
};

const collapseAnyOtherItem = (currentItem) => (allItems) =>
  allItems.filter((thisItem) => thisItem != currentItem).forEach(collapseItem);

const toggleItem = (item) =>
  isExpanded(item) ? collapseItem(item) : expandItem(item);

const isExpanded = (item) => !getButton(item).classList.contains("collapsed");

const expandItem = (item) => {
  const button = getButton(item);
  const collapsable = getCollapsable(item);
  button.classList.remove("collapsed");
  button.setAttribute("aria-expanded", "true");
  collapsable.classList.add("show");
  setTimeout(() => {
    collapsable.style.maxHeight = `${collapsable.scrollHeight}px`;
  }, COLLAPSE_DELAY);
};

const collapseItem = (item) => {
  const button = getButton(item);
  const collapsable = getCollapsable(item);
  collapsable.style.maxHeight = "";
  setTimeout(() => {
    button.classList.add("collapsed");
    button.setAttribute("aria-expanded", "false");
    collapsable.classList.remove("show");
  }, 600);
};
