// Fetch menu items from backend
fetch("http://localhost:5000/api/menu")
  .then(response => response.json())
  .then(data => {
    const menuContainer = document.getElementById("menu");
    if (!menuContainer) return;

    data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("menu-item");
      div.innerHTML = `
        <img src="https://source.unsplash.com/200x150/?${item.name},food" alt="${item.name}" style="border-radius:10px;">
        <h3>${item.name}</h3>
        <p><strong>₹${item.price}</strong></p>
        <button>Add to Cart</button>
      `;
      menuContainer.appendChild(div);
    });
  })
  .catch(err => console.error("Error fetching menu:", err));
