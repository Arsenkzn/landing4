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
    auctionEnd: "2025-10-31T23:59:59",
  },
  {
    id: 2,
    title: "H2023 BMW M4 COMPETITION",
    category: "luxury",
    image: "img/m4.png",
    mileage: "6560 miles",
    vin: "2HG***5678",
    priceUsd: 79000,
    auctionEnd: "2025-09-25T18:00:00",
  },
  {
    id: 3,
    title: "BMW X5M 2016",
    category: "salvage",
    image: "img/bmwX5M.png",
    mileage: "85,000 miles",
    vin: "2HG***5678",
    priceUsd: 14500,
    auctionEnd: "2025-09-25T18:00:00",
  },
  {
    id: 4,
    title: "2021 Bugatti Centodieci",
    category: "luxury",
    image: "img/bugatti.png",
    mileage: "5,000 miles",
    vin: "1FA***9101",
    priceUsd: 180000,
    auctionEnd: "2025-10-28T12:00:00",
  },
  {
    id: 5,
    title: "2023 Rolls-Royce Sweptail",
    category: "luxury",
    image: "img/rolls.png",
    mileage: "2,000 miles",
    vin: "1FA***9101",
    priceUsd: 1200000,
    auctionEnd: "2025-09-28T12:00:00",
  },
  {
    id: 6,
    title: "Lamborghini Urus Performante",
    category: "luxury",
    image: "img/urus.png",
    mileage: "500 miles",
    vin: "1FA***9101",
    priceUsd: 500000,
    auctionEnd: "2025-11-28T12:00:00",
  },
  {
    id: 7,
    title: "2012 PORSCHE CAYENNE S",
    category: "clean",
    image: "img/cayen.png",
    mileage: "58000 miles",
    vin: "1FA***9101",
    priceUsd: 40000,
    auctionEnd: "2025-11-28T12:00:00",
  },
  {
    id: 8,
    title: "2024 PORSCHE PANAMERA S",
    category: "luxury",
    image: "img/panamera.png",
    mileage: "8000 miles",
    vin: "2F7***7659",
    priceUsd: 90000,
    auctionEnd: "2025-09-28T12:00:00",
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
                <div class="car-price">${car.priceUsd} $</div>
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
  const walletPopup = document.getElementById("walletPopup");
  const solPrice = (car.priceUsd / solRate).toFixed(2);

  // Заполняем данные автомобиля
  document.getElementById("popupCarTitle").textContent = car.title;
  document.getElementById("popupCarCategory").textContent = `${getCategoryIcon(
    car.category
  )} ${car.category.toUpperCase()}`;
  document.getElementById("popupCarMileage").textContent = car.mileage;
  document.getElementById("popupCarVin").textContent = `VIN: ${car.vin}`;
  document.getElementById("popupCarSolPrice").textContent = `${solPrice} SOL`;
  document.getElementById(
    "popupCarUsdPrice"
  ).textContent = `${car.priceUsd.toLocaleString()} $`;
  document.getElementById("originalLink").href = car.sourceLink;

  // Галерея
  const carGallery = document.getElementById("carGallery");
  carGallery.innerHTML = `<img src="${car.image}" alt="${car.title}" style="width:100%;height:100%;object-fit:cover;">`;

  // Таймер аукциона
  const timerElement = document.getElementById("popupAuctionTimer");

  function updateTimer() {
    const now = new Date();
    const endDate = new Date(car.auctionEnd);
    const diff = endDate - now;

    if (diff <= 0) {
      timerElement.innerHTML = "⏳ The auction has ended";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerElement.innerHTML = `⏳ Ends: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Обновляем таймер каждую секунду
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);

  // Функция для закрытия попапа
  function closeCarPopup() {
    popup.style.display = "none";
    clearInterval(timerInterval);
  }

  // Функция для закрытия попапа кошелька
  function closeWalletPopup() {
    walletPopup.style.display = "none";
  }

  // Закрытие при клике на крестик
  document
    .getElementById("closePopup")
    .addEventListener("click", closeCarPopup);
  document
    .getElementById("walletCloseBtn")
    .addEventListener("click", closeWalletPopup);

  // Закрытие при клике вне области попапа
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closeCarPopup();
    }
  });

  walletPopup.addEventListener("click", (e) => {
    if (e.target === walletPopup) {
      closeWalletPopup();
    }
  });

  // Показ попапа кошелька при нажатии на "Place Bid"
  document.getElementById("placeBidBtn").addEventListener("click", (e) => {
    e.preventDefault();
    walletPopup.style.display = "flex";
  });

  // Демо-действие при "Connect Wallet"
  document.getElementById("connectWalletBtn").addEventListener("click", () => {
    closeWalletPopup();
  });

  popup.style.display = "flex";
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
