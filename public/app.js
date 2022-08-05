createCatButton();
createOwnerButton();
// registerNewCatButton();

function cats() {
  fetch("/cats", {
    method: "GET",
    headers: { "Conent-Type": "application/json" },
    body: JSON.stringify(cats),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let h1 = document.createElement("h1");
        h1.innerText = JSON.stringify(data[i].name);
        document.body.appendChild(h1);
      }
    });
}

function owners() {
  fetch("/owners", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(owners),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let h2 = document.createElement("h2");
        h2.innerText = JSON.stringify(data[i].first_name);
        document.body.appendChild(h2);
      }
    });
}

function createCatButton() {
  let catButton = document.createElement("button");
  catButton.innerHTML = "Cats on file";
  catButton.type = "button";
  catButton.setAttribute("id", "catButton");
  catButton.addEventListener("click", () => {
    cats();
  });
  document.body.appendChild(catButton);
}

function createOwnerButton() {
  let ownerButton = document.createElement("button");
  ownerButton.innerHTML = "Owners on file";
  ownerButton.type = "button";
  ownerButton.setAttribute("id", "ownerButton");
  ownerButton.addEventListener("click", () => {
    owners();
  });
  document.body.appendChild(ownerButton);
}

function newCat() {
  fetch("/cats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCat),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// function registerNewCatButton() {
//   let newCatButton = document.createElement("button");
//   newCatButton.innerHTML = "Register Cat Here";
//   newCatButton.type = "button";
//   newCatButton.setAttribute("id", "Register Button");
//   newCatButton.addEventListener("click", () => {

//     newCat();
//   });
//   document.body.appendChild(newCatButton);
// }