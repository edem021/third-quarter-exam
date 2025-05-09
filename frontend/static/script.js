const fetchData = async () => {
  const response = await fetch("/api/data");
  return response.json();
}

const petComponent = pet => `<span>${pet}</span>`;

const displayPets = pets => pets.map(pet => petComponent(pet)).join(", ");

const itemComponent = item => `
  <div class="item">
    <h3>${item.name}</h3>
    <p>Age: ${item.age}</p>
    ${item.pets.length > 0 ? `<p>Pets: ${displayPets(item.pets)}</p>` : ""}
  </div>
`;

const displayData = data => data.map(item => itemComponent(item)).join("");

const sendData = async form => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.age = Number(data.age);
  data.pets = data.pets.split(",").map(pet => pet.trim());

  const response = await fetch("/api/data/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    form.reset();
    document.querySelector(".data-container").innerHTML += itemComponent(data);
  } else {
    console.error("Error:", response.statusText);
  }
}

const createDOM = (root, data) => {
  root.insertAdjacentHTML("beforeend", `
    <div class="data-container">
      ${displayData(data)}
      </div>
      <div class="form-container">
        <h2>Form</h2>
        <form id="form">
          <input type="text" name="name" placeholder="Name" required>
          <input type="number" name="age" placeholder="Age" required>
          <input type="text" name="pets" placeholder="Pets" required>
          <button type="submit">Submit</button>
        </form>
      </div>
  `);
}

const loadEvent = async () => {
  const root = document.querySelector("#root");
  const data = await fetchData();
  createDOM(root, data);

  document.querySelector("#form").addEventListener("submit", async e => {
    e.preventDefault();
    sendData(e.target);
  });
}

window.addEventListener("load", loadEvent);