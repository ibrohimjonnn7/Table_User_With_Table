import { add } from "./async.js";
import { deleteUser } from "./async.js";
import { editUser } from "./async.js";
import { search } from "./async.js";
let tbody = document.querySelector(".tbody");

//Add
let btnAdd = document.querySelector(".btnAdd");
let dialogAdd = document.querySelector(".dialogAdd");
let formAdd = document.querySelector(".formAdd");
let btnCloseAdd = document.querySelector(".btnCloseAdd");
btnAdd.onclick = () => {
  dialogAdd.showModal();
};
btnCloseAdd.onclick = () => {
  dialogAdd.close();
};
formAdd.onsubmit = (event) => {
  event.preventDefault();
  let newUser = {
    avatar: formAdd["avatar"].value,
    name: formAdd["name"].value,
    email: formAdd["email"].value,
    age: formAdd["age"].value,
    phone: formAdd["phone"].value,
  };
  add(newUser);
};

//Edit
let btnEdit = document.querySelector(".btnEdit");
let dialogEdit = document.querySelector(".dialogEdit");
let formEdit = document.querySelector(".formEdit");
let btnCloseEdit = document.querySelector(".btnCloseEdit");

btnCloseEdit.onclick = () => {
  dialogEdit.close();
};

function showEdit(el) {
  formEdit.onsubmit = () => {
    let updatedUser = {
      avatar: formEdit["avatar"].value,
      name: formEdit["name"].value,
      email: formEdit["email"].value,
      age: formEdit["age"].value,
      phone: formEdit["phone"].value,
    };
    editUser(el.id, updatedUser);
  };
}

//filter

export let option = document.querySelector(".option");
export let option1 = document.querySelector(".option1");

//formSearch
let formSearch = document.querySelector(".formSearch");

formSearch.onsubmit = (event) => {
  event.preventDefault();
  let searchValue = formSearch["search"].value;
  search(searchValue);
};

function getData(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    let tr = document.createElement("tr");

    let userName = document.createElement("td");
    let div1 = document.createElement("div");
    div1.className = "div1";
    let avatar = document.createElement("img");
    avatar.src = element.avatar;
    let div2 = document.createElement("div");
    avatar.className = "avatar";
    let name = document.createElement("p");
    name.innerHTML = element.name;
    let email = document.createElement("p");
    email.innerHTML = element.email;

    let city = document.createElement("td");
    city.innerHTML = element.city;

    let status = document.createElement("td");
    status.innerHTML = element.status ? "Active" : "Inactive";

    let phone = document.createElement("td");
    phone.innerHTML = element.phone;

    let action = document.createElement("td");
    let div3 = document.createElement("div");
    div3.className = "div3";

    let btnDelete = document.createElement("button");
    btnDelete.className = "btnDelete";
    btnDelete.innerHTML = "Delete";
    btnDelete.onclick = () => {
      deleteUser(element.id);
    };

    let btnEdit = document.createElement("button");
    btnEdit.className = "btnEdit";
    btnEdit.innerHTML = "Edit";
    btnEdit.onclick = () => {
      dialogEdit.showModal();
      formEdit["id"] = element.id;
      formEdit["avatar"].value = element.avatar;
      formEdit["name"].value = element.name;
      formEdit["email"].value = element.email;
      formEdit["age"].value = element.age;
      formEdit["phone"].value = element.phone;
      showEdit(element);
    };
    let btnInfo = document.createElement("button");
    btnInfo.className = "btnInfo";
    btnInfo.innerHTML = "Info";
    btnInfo.onclick = () => {};
    let chekbox = document.createElement("input");
    chekbox.type = "checkbox";
    chekbox.checked = element.status;

    action.append(btnDelete, btnEdit, btnInfo, chekbox);
    div1.appendChild(avatar);
    div1.appendChild(div2);
    div2.appendChild(name);
    div2.appendChild(email);
    tr.appendChild(div1);
    tr.appendChild(city);
    tr.appendChild(status);
    tr.appendChild(phone);
    tr.appendChild(action);
    tbody.appendChild(tr);
  });
}

export default getData;
