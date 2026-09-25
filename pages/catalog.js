// INITIAL ARRAY OF OBJECTS (Virtue Fit Garments)
let garments = [
  {
    id: 1,
    name: "Monochrome Tailored Blazer",
    category: "Haute Couture",
    price: 850,
    score: 98,
    inStock: true,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Silk Runway Evening Gown",
    category: "Evening Wear",
    price: 1200,
    score: 99,
    inStock: true,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Oversized Cyber Street Trench",
    category: "Streetwear",
    price: 420,
    score: 94,
    inStock: false,
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Cashmere Atelier Pullover",
    category: "Casual",
    price: 310,
    score: 96,
    inStock: true,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
  }
];

let currentFilter = 'All';

// 5 IF-ELSE LOGIC CONDITIONS
function evaluateGarmentStatus(item) {
  let accuracyBadge = "";
  if (item.score >= 98) {
    accuracyBadge = `<span class="bg-fashiongold text-black text-[9px] px-2 py-0.5 font-bold uppercase">Perfect Mesh</span>`;
  } else if (item.score >= 95) {
    accuracyBadge = `<span class="bg-gray-800 text-fashiongold border border-fashiongold/50 text-[9px] px-2 py-0.5 font-bold uppercase">High Precision</span>`;
  } else {
    accuracyBadge = `<span class="bg-darkplum text-gray-400 text-[9px] px-2 py-0.5 font-bold uppercase">Standard Fit</span>`;
  }

  let priceTier = "";
  if (item.price > 800) {
    priceTier = "Couture Tier";
  } else if (item.price > 400) {
    priceTier = "Atelier Tier";
  } else {
    priceTier = "Ready-To-Wear";
  }

  let stockStatus = "";
  if (item.inStock === true) {
    stockStatus = `<span class="text-emerald-400 text-[10px] font-bold"><i class="fa-solid fa-circle text-[7px] mr-1"></i>Available</span>`;
  } else {
    stockStatus = `<span class="text-rose-500 text-[10px] font-bold"><i class="fa-solid fa-circle text-[7px] mr-1"></i>Backorder</span>`;
  }

  return { accuracyBadge, priceTier, stockStatus };
}

// RENDER GRID CARDS (Array.map)
function renderGridCards() {
  const grid = document.getElementById('garment-grid');
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

  const filtered = garments.filter(item => {
    const matchesCategory = (currentFilter === 'All') || (item.category === currentFilter);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  document.getElementById('garment-count').innerText = garments.length;
  document.getElementById('filtered-count').innerText = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500 text-xs uppercase tracking-widest border border-gray-800 bg-cardplum">No matching garments found in collection.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const status = evaluateGarmentStatus(item);

    return `
      <div class="border border-gray-800 bg-cardplum overflow-hidden flex flex-col justify-between group shadow-lg">
        <div>
          <div class="relative h-64 overflow-hidden">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute top-3 left-3">${status.accuracyBadge}</div>
            <div class="absolute top-3 right-3 bg-darkplum/90 border border-gray-800 px-2 py-1 text-[10px] uppercase font-bold text-fashiongold">${item.category}</div>
          </div>
          <div class="p-5 space-y-3">
            <div class="flex justify-between items-start">
              <h3 class="text-sm font-bold uppercase tracking-wide text-white">${item.name}</h3>
              <span class="text-xs text-fashiongold font-serif font-bold">$${item.price}</span>
            </div>
            <div class="flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-800/80 pt-3">
              <span>Tier: <strong class="text-gray-200 uppercase">${status.priceTier}</strong></span>
              <span>Fit Score: <strong class="text-fashiongold">${item.score}%</strong></span>
            </div>
            <div class="pt-1">${status.stockStatus}</div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-800 bg-darkplum/50 flex space-x-2">
          <button onclick="openEditModal(${item.id})" class="flex-1 py-2 border border-gray-700 text-gray-300 text-[10px] uppercase font-bold tracking-widest hover:border-fashiongold hover:text-fashiongold transition">
            <i class="fa-solid fa-pen mr-1"></i>Edit
          </button>
          <button onclick="deleteGarment(${item.id})" class="flex-1 py-2 border border-rose-900/50 text-rose-400 text-[10px] uppercase font-bold tracking-widest hover:bg-rose-950 transition">
            <i class="fa-solid fa-trash mr-1"></i>Delete
          </button>
        </div>
      </div>
    `;
  }).join('');

  runLoopDemonstrations();
}

// ADD NEW OBJECT (Array.push)
document.getElementById('add-garment-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const newObject = {
    id: Date.now(),
    name: document.getElementById('add-name').value,
    category: document.getElementById('add-category').value,
    price: Number(document.getElementById('add-price').value),
    score: Number(document.getElementById('add-score').value),
    inStock: true,
    image: document.getElementById('add-image').value
  };

  garments.push(newObject);
  renderGridCards();
  this.reset();
});

// DELETE OBJECT (Array.filter)
function deleteGarment(id) {
  if (confirm("Are you sure you want to remove this garment from the collection?")) {
    garments = garments.filter(item => item.id !== id);
    renderGridCards();
  }
}

// EDIT OBJECT MODAL
function openEditModal(id) {
  const item = garments.find(g => g.id === id);
  if (!item) return;

  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-category').value = item.category;
  document.getElementById('edit-price').value = item.price;
  document.getElementById('edit-score').value = item.score;

  document.getElementById('edit-modal').classList.remove('hidden');
}

function closeEditModal() {
  document.getElementById('edit-modal').classList.add('hidden');
}

document.getElementById('edit-garment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = Number(document.getElementById('edit-id').value);

  garments = garments.map(item => {
    if (item.id === id) {
      return {
        ...item,
        name: document.getElementById('edit-name').value,
        category: document.getElementById('edit-category').value,
        price: Number(document.getElementById('edit-price').value),
        score: Number(document.getElementById('edit-score').value)
      };
    }
    return item;
  });

  closeEditModal();
  renderGridCards();
});

// CATEGORY FILTER
function filterCategory(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('bg-fashiongold', 'text-black');
    btn.classList.add('bg-darkplum', 'text-gray-300');
  });
  event.target.classList.remove('bg-darkplum', 'text-gray-300');
  event.target.classList.add('bg-fashiongold', 'text-black');
  renderGridCards();
}

document.getElementById('search-input').addEventListener('input', renderGridCards);

// FOR LOOP & WHILE LOOP OUTPUT DEMOS
function runLoopDemonstrations() {
  const tableBody = document.getElementById('for-loop-table-body');
  tableBody.innerHTML = "";
  for (let i = 0; i < garments.length; i++) {
    tableBody.innerHTML += `
      <tr>
        <td class="p-2 font-bold text-fashiongold">0${i+1}</td>
        <td class="p-2 uppercase font-semibold text-white">${garments[i].name}</td>
        <td class="p-2 uppercase text-gray-400">${garments[i].category}</td>
      </tr>
    `;
  }

  const whileOutput = document.getElementById('while-loop-output');
  whileOutput.innerHTML = "";
  let index = 0;
  while (index < garments.length) {
    whileOutput.innerHTML += `<li class="border-b border-gray-800 pb-1"> Processing Mesh [${index+1}]: ${garments[index].name} ... READY</li>`;
    index++;
  }

  const combinedOutput = document.getElementById('combined-logic-output');
  combinedOutput.innerHTML = "";
  for (let j = 0; j < garments.length; j++) {
    let categoryClass = "";
    if (garments[j].price > 800) {
      categoryClass = "text-fashiongold font-bold";
    } else if (garments[j].score > 95) {
      categoryClass = "text-emerald-400 font-bold";
    } else {
      categoryClass = "text-gray-400";
    }

    combinedOutput.innerHTML += `
      <div class="border-b border-gray-800 pb-1 flex justify-between">
        <span>${garments[j].name}</span>
        <span class="${categoryClass}">$${garments[j].price}</span>
      </div>
    `;
  }
}

// Initial Call
renderGridCards();