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
  {
    id: 9,
    title: "2023 MERSEDES-AMG GT",
    category: "luxury",
    image: "img/mers1.png",
    mileage: "10000 miles",
    vin: "5MA**5688",
    priceUsd: 90000,
    auctionEnd: "2025-11-28T12:00:00",
  },
  {
    id: 10,
    title: "2024 MERSEDES BRABUS G63",
    category: "luxury",
    image: "img/brabus.png",
    mileage: "3000 miles",
    vin: "7H7***7777",
    priceUsd: 140000,
    auctionEnd: "2025-09-28T12:00:00",
  },
  {
    id: 11,
    title: "2022 RAM 5500",
    category: "clean",
    image: "img/ram.png",
    mileage: "10000 miles",
    vin: "3C7WRNDL9NG******",
    priceUsd: 46000,
    auctionEnd: "2025-11-28T12:00:00",
  },
  {
    id: 12,
    title: "2022 JEEP WRANGLER SPORT",
    category: "salvage",
    image: "img/jeep.png",
    mileage: "78000 miles",
    vin: "1C4GJXAN9NW******",
    priceUsd: 8900,
    auctionEnd: "2025-09-28T12:00:00",
  },
  {
    id: 13,
    title: "2018 TESLA MODEL X",
    category: "clean",
    image: "img/teslaX.png",
    mileage: "59000 miles",
    vin: "5MA**5688",
    priceUsd: 30000,
    auctionEnd: "2025-11-28T12:00:00",
  },
  {
    id: 14,
    title: "2024 TESLA MODEL Y",
    category: "clean",
    image: "img/teslaY.png",
    mileage: "16000 miles",
    vin: "7SAYGDEE9PA******",
    priceUsd: 36000,
    auctionEnd: "2025-09-28T12:00:00",
  },
  {
    id: 15,
    title: "2017 BUICK LACROSSE ESSENCE",
    category: "clean",
    image: "img/buick.png",
    mileage: "85000 miles",
    vin: "1G4ZP5SS4HU******",
    priceUsd: 16000,
    auctionEnd: "2025-11-28T12:00:00",
  },
  {
    id: 16,
    title: "2023 LINCOLN AVIATOR RESERVE",
    category: "luxury",
    image: "img/lincoln.png",
    mileage: "40000 miles",
    vin: "5LM5J7XC5PG******",
    priceUsd: 30000,
    auctionEnd: "2025-09-28T12:00:00",
  },
];

// Текущий курс SOL
const solRate = 161;

// Глобальный объект для хранения времени окончания аукциона
const auctionEndTimes = {};

// Функция для генерации случайного времени окончания аукциона
function generateAuctionEndTime() {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * 7) + 1; // 1-7 дней
  const randomHours = Math.floor(Math.random() * 24); // 0-23 часа
  const randomMinutes = Math.floor(Math.random() * 60); // 0-59 минут

  const endTime = new Date(now);
  endTime.setDate(now.getDate() + randomDays);
  endTime.setHours(now.getHours() + randomHours);
  endTime.setMinutes(now.getMinutes() + randomMinutes);

  return endTime;
}

// Получаем или генерируем время окончания аукциона
function getAuctionEndTime(carId) {
  if (!auctionEndTimes[carId]) {
    const savedTime = localStorage.getItem(`auctionEndTime_${carId}`);
    if (savedTime) {
      auctionEndTimes[carId] = new Date(savedTime);
    } else {
      auctionEndTimes[carId] = generateAuctionEndTime();
      localStorage.setItem(
        `auctionEndTime_${carId}`,
        auctionEndTimes[carId].toISOString()
      );
    }
  }
  return auctionEndTimes[carId];
}

// Функция для форматирования оставшегося времени
function formatTimeRemaining(endTime) {
  const now = new Date();
  const diff = endTime - now;

  if (diff <= 0) {
    return "⏳ The auction has ended";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `⏳ Ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Функция для запуска таймера
function startTimer(timerElement, carId) {
  // Очищаем предыдущий интервал, если он есть
  if (timerElement.dataset.intervalId) {
    clearInterval(parseInt(timerElement.dataset.intervalId));
  }

  const update = () => {
    const endTime = getAuctionEndTime(carId);
    timerElement.textContent = formatTimeRemaining(endTime);
  };

  // Обновляем сразу
  update();

  // Запускаем интервал и сохраняем ID
  const intervalId = setInterval(update, 1000);
  timerElement.dataset.intervalId = intervalId;
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

// Отображение карточек автомобилей
function displayCars(cars) {
  const carsGrid = document.getElementById("carsGrid");
  carsGrid.innerHTML = "";

  cars.forEach((car) => {
    const solPrice = (car.priceUsd / solRate).toFixed(2);
    const endTime = getAuctionEndTime(car.id);
    const timeRemaining = formatTimeRemaining(endTime);

    const carCard = document.createElement("div");
    carCard.className = `car-card ${car.category}`;
    carCard.innerHTML = `
                    <img src="${car.image}" alt="${
      car.title
    }" class="car-image">
                    <div class="car-info">
                        <h3 class="car-title">${car.title}</h3>
                        <span class="car-category">${getCategoryIcon(
                          car.category
                        )} ${car.category.toUpperCase()}</span>
                        <div class="car-price">${car.priceUsd} $</div>
                        <div class="car-price">${solPrice} SOL</div>
                        <div class="auction-timer" data-car-id="${
                          car.id
                        }">${timeRemaining}</div>
                        <button class="bid-btn" data-car-id="${
                          car.id
                        }">View / Bid</button>
                    </div>
                `;
    carsGrid.appendChild(carCard);
  });

  // Запускаем таймеры для всех карточек
  document.querySelectorAll(".auction-timer").forEach((timerElement) => {
    const carId = parseInt(timerElement.getAttribute("data-car-id"));
    startTimer(timerElement, carId);
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

// Показ попапа с автомобилем
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

  // Таймер аукциона в попапе
  const popupTimerElement = document.getElementById("popupAuctionTimer");
  popupTimerElement.setAttribute("data-car-id", carId);
  startTimer(popupTimerElement, carId);

  // Функция для закрытия попапа
  function closeCarPopup() {
    popup.style.display = "none";
    // Очищаем таймер попапа
    if (popupTimerElement.dataset.intervalId) {
      clearInterval(parseInt(popupTimerElement.dataset.intervalId));
    }
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
    alert("Wallet connected successfully!");
  });

  popup.style.display = "flex";
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

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  displayCars(carsData);
  setupFilters();
});
