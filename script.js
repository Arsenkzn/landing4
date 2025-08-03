// Данные об автомобилях (можно заменить на JSON)
const carsData = [
  {
    id: 1,
    title: "2016 AUDI A6 PREMIUM PLUS",
    category: "clean",
    image: "img/audiA6.png",
    mileage: "32,000 miles",
    vin: "WBS***1234",
    priceUsd: 13320,
    auctionEnd: "2025-12-31T23:59:59",
  },
  {
    id: 2,
    title: "H2023 BMW M4 COMPETITION",
    category: "luxury",
    image: "img/m4.png",
    mileage: "6560 miles",
    vin: "2HG***5678",
    priceUsd: 79000,
    auctionEnd: "2023-12-25T18:00:00",
  },
  {
    id: 3,
    title: "BMW X5M 2016",
    category: "salvage",
    image: "img/bmwX5M.png",
    mileage: "85,000 miles",
    vin: "2HG***5678",
    priceUsd: 14500,
    auctionEnd: "2023-12-25T18:00:00",
  },
  {
    id: 4,
    title: "2021 Bugatti Centodieci",
    category: "luxury",
    image: "img/bugatti.png",
    mileage: "5,000 miles",
    vin: "1FA***9101",
    priceUsd: 180000,
    auctionEnd: "2023-12-28T12:00:00",
  },
  {
    id: 5,
    title: "2023 Rolls-Royce Sweptail",
    category: "luxury",
    image: "img/rolls.png",
    mileage: "2,000 miles",
    vin: "1FA***9101",
    priceUsd: 1200000,
    auctionEnd: "2023-12-28T12:00:00",
  },
];

// Текущий курс SOL (можно обновлять вручную)
const solRate = 161;

// Загрузка карточек на главную
document.addEventListener("DOMContentLoaded", () => {
  displayCars(carsData);
  setupFilters();
});

// Отображение карточек
function displayCars(cars) {
  const carsGrid = document.getElementById("carsGrid");
  carsGrid.innerHTML = "";

  cars.forEach((car) => {
    const solPrice = (car.priceUsd / solRate).toFixed(2);

    const carCard = document.createElement("div");
    carCard.className = `car-card ${car.category}`;
    carCard.innerHTML = `
            <img src="${car.image}" alt="${car.title}" class="car-image">
            <div class="car-info">
                <h3 class="car-title">${car.title}</h3>
                <span class="car-category">${getCategoryIcon(
                  car.category
                )} ${car.category.toUpperCase()}</span>
                <div class="car-price">${solPrice} SOL</div>
                <div class="auction-timer">⏳ Ends in: ${getRandomTime()}</div>
                <button class="bid-btn" data-car-id="${
                  car.id
                }">View / Bid</button>
            </div>
        `;
    carsGrid.appendChild(carCard);
  });

  // Навешиваем обработчики на кнопки
  document.querySelectorAll(".bid-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const carId = parseInt(btn.getAttribute("data-car-id"));
      showCarPopup(carId);
    });
  });
}

// Фильтрация авто
function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      if (filter === "all") {
        displayCars(carsData);
      } else {
        const filteredCars = carsData.filter((car) => car.category === filter);
        displayCars(filteredCars);
      }
    });
  });
}

// Показ поп-апа
function showCarPopup(carId) {
  const car = carsData.find((c) => c.id === carId);
  if (!car) return;

  const popup = document.getElementById("carPopup");
  const solPrice = (car.priceUsd / solRate).toFixed(2);

  document.getElementById("popupCarTitle").textContent = car.title;
  document.getElementById("popupCarCategory").textContent = `${getCategoryIcon(
    car.category
  )} ${car.category.toUpperCase()}`;
  document.getElementById("popupCarMileage").textContent = car.mileage;
  document.getElementById("popupCarVin").textContent = `VIN: ${car.vin}`;
  document.getElementById("popupCarSolPrice").textContent = `${solPrice} SOL`;
  document.getElementById(
    "popupCarUsdPrice"
  ).textContent = `$${car.priceUsd.toLocaleString()}`;
  document.getElementById("originalLink").href = car.sourceLink;

  // Галерея (можно добавить несколько фото)
  const carGallery = document.getElementById("carGallery");
  carGallery.innerHTML = `<img src="${car.image}" alt="${car.title}" style="width:100%;height:100%;object-fit:cover;">`;

  popup.style.display = "flex";

  // Закрытие поп-апа
  document.getElementById("closePopup").addEventListener("click", () => {
    popup.style.display = "none";
  });
}

// Вспомогательные функции
function getCategoryIcon(category) {
  const icons = {
    salvage: "🚗",
    clean: "🚙",
    luxury: "🏎",
  };
  return icons[category] || "";
}

function getRandomTime() {
  const hours = Math.floor(Math.random() * 24);
  const mins = Math.floor(Math.random() * 60);
  return `${hours}h ${mins}m`;
}
