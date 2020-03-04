const listItems = [];
const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page"
];
const draggable_list = document.getElementById("list");
const check = document.getElementById("check");
let dragStartIndex;

const createList = () => {
  richestPeople
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span>${index + 1}:&nbsp;</span>
        <div draggable="true">
          <p>${person}</p>
        </div>
      `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
  addEventListeners();
}

const dragStart = (e) => dragStartIndex = +e.target.closest("li").getAttribute("data-index");

const dragOver = (e) => e.preventDefault();

const dragDrop = (e) => {
  const dragEndIndex = +e.currentTarget.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
}

const swapItems = (fromIndex, toIndex) => {
  const itemOne = listItems[fromIndex].querySelector(`[draggable="true"]`);
  const itemTwo = listItems[toIndex].querySelector(`[draggable="true"]`);
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

const checkOrder = () => {
  listItems.forEach((listItem, index) => {
    const personName = listItem
      .querySelector(`[draggable="true"]`)
      .innerText.trim();
    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

const addEventListeners = () => {
  const draggables = document.querySelectorAll(`[draggable="true"]`);
  const dragListItems = document.querySelectorAll("li");
  draggables.forEach(draggable => draggable.addEventListener("dragstart", dragStart));
  dragListItems.forEach(item => (item.addEventListener("dragover", dragOver),item.addEventListener("drop", dragDrop)));
}

check.addEventListener("click", checkOrder);

createList();
