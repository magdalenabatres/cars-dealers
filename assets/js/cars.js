
const params = new URLSearchParams(window.location.search);
const search = params.get("search")?.toLowerCase() || "";


//===============
// EVENT LISTTENER
//==============


// CUANDO CAMBIA LA MARCA → limpiar searchInput

const brandFilter = document.getElementById("brandFilter");

brandFilter.addEventListener("change", () => {
    searchInput.value = "";   // limpia el input
  });


function applyFilters() {
  const container = document.querySelector('.inventory__row'); 
  container.innerHTML= ""; // LIMPIAMOS ANTES DE RENDERIZAR NUEVAMENTE

  let results= getCars() ; // SIEMPRE empezamos con TODOS los carros



  // 1. SEARCH GLOBAL (desde cars.html)
  const query = document.getElementById("searchInput").value.toLowerCase() || "";
  if (query) {
     brandFilter.value = "";   // limpia la marca
    console.log("Applying search filter with query:", query);
    results = results.filter(car =>
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.trim.toLowerCase().includes(query)
    );
  }

  
 
  // 2. BRAND FILTER (REGLA PRINCIPAL)
  const brand = document.getElementById("brandFilter").value;
  if (brand && brand !== "") {
    console.log("Applying brand filter with brand:", brand);
    results = results.filter(car => car.brand === brand);
    
  }

  // 3. PRICE FILTER
  const price = document.getElementById("priceFilter").value;
  if (price && price !== "") {
    console.log("Applying price filter with price:", price);
    const [min, max] = price.split("-").map(Number);
    results = results.filter(car => car.price >= min && car.price <= max);
  }

  // 4. YEAR FILTER
  const year = document.getElementById("yearSort").value;
  if (year && year !== "") {
    console.log("Applying year filter with year:", year);
    results = results.filter(car => car.year === parseInt(year));
  }

  // 5. SORT ORDER (A-Z / Z-A)
    const order = document.getElementById("sortOrderFilter").value;
  if (order === "A-Z" && order !== "all") {
     console.log("Applying sort order filter with order A-Z:", order); 
    results.sort((a, b) => a.model.localeCompare(b.model));
  }
  if (order === "Z-A" && order !== "all") {
      console.log("Applying sort order filter with order Z-A:", order);
    results.sort((a, b) => b.model.localeCompare(a.model));
  }

  renderCars(results);
 
}


// =========================
// 3. RENDERIZAR CARROS
// =========================

function renderCars(results) {
 const carsWrapper = document.querySelector('.inventory__row');
  if (!carsWrapper) return;

 
  const carsHtml = results.map(car => `
    <div class="car-card">
   <picture>
     <source srcset="${car.images[0]}" type="image/avif">
     <source srcset="${car.images[1]}" type="image/webp">
     <img src="${car.images[2]}" alt="${car.model}" class="car-image">
   </picture>
      <h3>${car.year} ${car.brand} ${car.model} ${car.trim}</h3>
      <p>Price: $${car.price}</p>
      <p>${car.engine} • ${car.drivetrain}</p>
      <p>${car.mpg_hwy} MPG Hwy • ${car.mpg_city} MPG City</p>
      <a href="detail.html?id=${car.id}" class="btn-details">View Details</a>
    </div>
  `).join("");

  carsWrapper.innerHTML = carsHtml;
}





//===========================================
function populateBrandFilter() {
  const cars = getCars();
  const brandFilter = document.getElementById("brandFilter");

  // Obtener marcas únicas
  const brands = [...new Set(cars.map(car => car.brand))].sort();
  console.log("Brand",brands);
  // Limpiar opciones
  brandFilter.innerHTML = `<option value="">All Brands</option>`;

  // Agregar marcas reales
brands.forEach(brand => {
  brandFilter.innerHTML += `<option value="${brand}">${brand}</option>`;
});

}

// pupulation price filter

function populatePriceFilter() {
  const cars = getCars();
  const priceFilter = document.getElementById("priceFilter");

  const prices = cars.map(car => car.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  priceFilter.innerHTML = `
    <option value="">All Prices</option>
    <option value="${min}-${min+10000}"> $${min.toLocaleString()}-$${(min+10000).toLocaleString()}</option>
    <option value="${min+10000}-${min+20000}"> $${(min+10000).toLocaleString()}-$${(min+20000).toLocaleString()}</option>
    <option value="${min+20000}-${max}"> $${(min+20000).toLocaleString()}-$${max.toLocaleString()}</option>
  `;

   
}


function populateSortOrderFilter() {
  const sortFilter = document.getElementById("sortOrderFilter");
  sortFilter.innerHTML = `
    <option value="">Sort by Order</option>
    <option value="A-Z">A-Z</option>
    <option value="Z-A">Z-A</option>
  `;
}

// Llamar de anos

function populateYearFilter() {
  const cars = getCars();
  
  const yearSort = document.getElementById("yearSort");

  const years = [...new Set(cars.map(car => car.year))].sort((a,b)=>b-a);

  yearSort.innerHTML = `<option value="">Order by Year</option>`;

  years.forEach(year => {
  yearSort.innerHTML += `<option value="${year}">${year}</option>`;
 });
}



// === 
// busqueda desde index.html
// ===

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("search");
 if (query) {
    document.getElementById("searchInput").value = query;
  } 
  
  populateBrandFilter();
  populatePriceFilter();
  populateYearFilter();
  populateSortOrderFilter();
  applyFilters() 

};





function getCars() {
 return [{
    "id": 1,
    "brand": "Toyota",
    "model": "Sequoia",
    "year": 2026,
    "trim": "Platinum",
    "msrp": 73500,
    "price": 71500,
    "engine": "3.4L Twin-Turbo V6 Hybrid",
    "drivetrain": "4WD",
    "transmission": "10-Speed Automatic",
    "mpg_city": 19,
    "mpg_hwy": 22,
    "seats": 7,
    "exterior_color": "Wind Chill Pearl",
    "interior_color": "Black Leather",
    "stock_number": "TYSQ26-PLAT-001",
    "vin": "JTJUAAAA0R1234567",
    "images": [
      "assets/images/cars/sequoia/1.jpeg",
      "assets/images/cars/sequoia/2.jpeg",
     "assets/images/cars/sequoia/2.jpeg"
    ],
    "features": [
      "Panoramic Moonroof",
      "12.3\" Digital Gauge Cluster",
      "Heated and Ventilated Front Seats",
      "Toyota Safety Sense 3.0"
    ],
    "status": "available",
    "location": "Queens, NY",
    "created_at": "2026-04-15"
  },
  {
    "id": 2,
    "brand": "Toyota",
    "model": "Highlander",
    "year": 2020,
    "trim": "XSE",
    "msrp": 47000,
    "price": 45500,
    "engine": "2.4L Turbo 4-Cyl",
    "drivetrain": "AWD",
    "transmission": "8-Speed Automatic",
    "mpg_city": 22,
    "mpg_hwy": 29,
    "seats": 7,
    "exterior_color": "Ruby Flare Pearl",
    "interior_color": "Black SofTex",
    "stock_number": "TYHL25-XSE-002",
    "vin": "5TDKAAAA0SS234567",
    "images": [
      "assets/images/cars/highlander/1.webp",
       "assets/images/cars/highlander/2.webp",
      "assets/images/cars/qx60/3.jpg"
   
    ],
    "features": [
      "Sport-Tuned Suspension",
      "Wireless Apple CarPlay",
      "12.3\" Touchscreen",
      "Blind Spot Monitor"
    ],
    "status": "available",
    "location": "Brooklyn, NY",
    "created_at": "2026-04-12"
  },
  {
    "id": 3,
    "brand": "Toyota",
    "model": "RAV4",
    "year": 2021,
    "trim": "Limited",
    "msrp": 39900,
    "price": 38500,
    "engine": "2.5L 4-Cyl",
    "drivetrain": "AWD",
    "transmission": "8-Speed Automatic",
    "mpg_city": 27,
    "mpg_hwy": 35,
    "seats": 5,
    "exterior_color": "Blueprint",
    "interior_color": "Beige SofTex",
    "stock_number": "TYRV25-LTD-005",
    "vin": "2T3AAAAA0SC345678",
    "images": [
      "assets/images/cars/rav4/1.jpg",
      "assets/images/cars/rav4/2.jpg",
      "assets/images/cars/rav4/3.jpg"
    ],
    "features": [
      "Digital Rearview Mirror",
      "Heated Seats",
      "Premium JBL Audio",
      "Toyota Safety Sense 2.5"
    ],
    "status": "available",
    "location": "Queens, NY",
    "created_at": "2026-04-08"
  },

  {
    "id": 4,
    "brand": "Honda",
    "model": "Pilot",
    "year": 2015,
    "trim": "Elite",
    "msrp": 52500,
    "price": 50900,
    "engine": "3.5L V6",
    "drivetrain": "AWD",
    "transmission": "10-Speed Automatic",
    "mpg_city": 19,
    "mpg_hwy": 25,
    "seats": 7,
    "exterior_color": "Platinum White Pearl",
    "interior_color": "Brown Leather",
    "stock_number": "HNPL25-ELT-003",
    "vin": "5FNYAAAA0SB123456",
    "images": [
      "assets/images/cars/pilot/1.webp",
      "assets/images/cars/pilot/2.webp",
      "assets/images/cars/pilot/3.webp"
    ],
    "features": [
      "Head-Up Display",
      "Heated Steering Wheel",
      "Tri-Zone Climate Control",
      "Honda Sensing Suite"
    ],
    "status": "reserved",
    "location": "Queens, NY",
    "created_at": "2026-03-30"
  },

  {
    "id": 5,
    "brand": "Honda",
    "model": "CR-V",
    "year": 2015,
    "trim": "Touring Hybrid",
    "msrp": 41000,
    "price": 39500,
    "engine": "2.0L Hybrid",
    "drivetrain": "AWD",
    "transmission": "e-CVT",
    "mpg_city": 40,
    "mpg_hwy": 34,
    "seats": 5,
    "exterior_color": "Sonic Gray Pearl",
    "interior_color": "Black Leather",
    "stock_number": "HNCR25-TRH-007",
    "vin": "7FARAAAA0SE456789",
    "images": [
      "assets/images/cars/crv/1.jpg",
      "assets/images/cars/crv/2.jpg",
      "assets/images/cars/crv/3.jpg"
    ],
    "features": [
      "Hands-Free Power Tailgate",
      "Wireless Charging",
      "Bose Premium Audio",
      "Adaptive Cruise Control"
    ],
    "status": "available",
    "location": "Bronx, NY",
    "created_at": "2026-04-01"
  },

  {
    "id": 6,
    "brand": "Ford",
    "model": "Explorer",
    "year": 2021,
    "trim": "ST-Line",
    "msrp": 48900,
    "price": 47500,
    "engine": "2.3L EcoBoost",
    "drivetrain": "RWD",
    "transmission": "10-Speed Automatic",
    "mpg_city": 21,
    "mpg_hwy": 28,
    "seats": 7,
    "exterior_color": "Rapid Red Metallic",
    "interior_color": "Black ActiveX",
    "stock_number": "FDEX25-STL-004",
    "vin": "1FMSAAAA0SG567890",
    "images": [
      "assets/images/cars/explorer/1.webp",
      "assets/images/cars/explorer/2.webp",
      "assets/images/cars/explorer/3.webp"
    ],
    "features": [
      "Sport Appearance Package",
      "12\" Touchscreen",
      "Lane Keeping System",
      "Ford Co-Pilot360"
    ],
    "status": "available",
    "location": "Queens, NY",
    "created_at": "2026-04-10"
  },

  {
    "id": 7,
    "brand": "Ford",
    "model": "Bronco Sport",
    "year": 2022,
    "trim": "Badlands",
    "msrp": 39900,
    "price": 38500,
    "engine": "2.0L EcoBoost",
    "drivetrain": "4x4",
    "transmission": "8-Speed Automatic",
    "mpg_city": 21,
    "mpg_hwy": 26,
    "seats": 5,
    "exterior_color": "Cactus Gray",
    "interior_color": "Black/Orange",
    "stock_number": "FDBS25-BDL-006",
    "vin": "3FMCAAAA0SR678901",
    "images": [
      "assets/images/cars/bronco-sport/1.webp",
      "assets/images/cars/bronco-sport/2.webp",
      "assets/images/cars/bronco-sport/3.webp"
    ],
    "features": [
      "Off-Road Suspension",
      "Terrain Management System",
      "Rubberized Flooring",
      "Trail Control"
    ],
    "status": "available",
    "location": "Brooklyn, NY",
    "created_at": "2026-04-05"
  },

  {
    "id": 8,
    "brand": "Chevrolet",
    "model": "Tahoe",
    "year": 2026,
    "trim": "Premier",
    "msrp": 71500,
    "price": 69500,
    "engine": "5.3L V8",
    "drivetrain": "4WD",
    "transmission": "10-Speed Automatic",
    "mpg_city": 15,
    "mpg_hwy": 20,
    "seats": 7,
    "exterior_color": "Black",
    "interior_color": "Maple Sugar Leather",
    "stock_number": "CHTA25-PMR-002",
    "vin": "1GNSAAAA0SR789012",
    "images": [
      "assets/images/cars/tahoe/1.webp",
      "assets/images/cars/tahoe/2.webp",
      "assets/images/cars/tahoe/3.webp"
    ],
    "features": [
      "Magnetic Ride Control",
      "Bose 10-Speaker Audio",
      "Heated 2nd Row Seats",
      "Surround Vision Camera"
    ],
    "status": "available",
    "location": "Queens, NY",
    "created_at": "2026-04-14"
  },

  {
    "id": 9,
    "brand": "Nissan",
    "model": "Pathfinder",
    "year": 2018,
    "trim": "Platinum",
    "msrp": 51000,
    "price": 49500,
    "engine": "3.5L V6",
    "drivetrain": "4WD",
    "transmission": "9-Speed Automatic",
    "mpg_city": 20,
    "mpg_hwy": 27,
    "seats": 7,
    "exterior_color": "Scarlet Ember Tintcoat",
    "interior_color": "Chestnut Leather",
    "stock_number": "NSPF25-PLT-009",
    "vin": "5N1DAAAA0SC890123",
    "images": [
      "assets/images/cars/pathfinder/1.webp",
      "assets/images/cars/pathfinder/1.webp",
      "assets/images/cars/pathfinder/2.webp"
    ],
    "features": [
      "Panoramic Moonroof",
      "Heated 2nd Row Seats",
      "ProPILOT Assist",
      "Wireless CarPlay"
    ],
    "status": "available",
    "location": "Bronx, NY",
    "created_at": "2026-04-03"
  },
  {
    "id": 10,
    "brand": "Kia",
    "model": "Telluride",
    "year": 2019,
    "trim": "SX Prestige",
    "msrp": 54000,
    "price": 52500,
    "engine": "3.8L V6",
    "drivetrain": "AWD",
    "transmission": "8-Speed Automatic",
    "mpg_city": 20,
    "mpg_hwy": 26,
    "seats": 7,
    "exterior_color": "Dark Moss",
    "interior_color": "Nappa Leather Black",
    "stock_number": "KIAT25-SXP-010",
    "vin": "5XYPAAAA0SG901234",
    "images": [
      "assets/images/cars/telluride/1.webp",
      "assets/images/cars/telluride/2.jpg",
      "assets/images/cars/telluride/3.jpg"
    ],
    "features": [
      "Heads-Up Display",
      "Ventilated 2nd Row Seats",
      "Harman Kardon Audio",
      "Blind Spot View Monitor"
    ],
    "status": "available",
    "location": "Queens, NY",
    "created_at": "2026-04-11"
  },  
  {
    "id": 11,
    "brand": "Hyundai",
    "model": "Palisade",
    "year": 2022,
    "trim": "Calligraphy",
    "msrp": 51000,
    "price": 49500,
    "engine": "3.8L V6",
    "drivetrain": "AWD",
    "transmission": "8-Speed Automatic",
    "mpg_city": 19,
    "mpg_hwy": 24,
    "seats": 7,
    "exterior_color": "Hyper White",
    "interior_color": "Quilted Black Nappa Leather",
    "stock_number": "HYPA22-CAL-011",
    "vin": "KM8R5DHE0NU123456",
    "images": [
      "assets/images/cars/palisade/1.webp",
      "assets/images/cars/palisade/2.webp",
      "assets/images/cars/palisade/3.webp"
    ],
    "features": [
      "Harman Kardon Premium Audio",
      "Surround View Monitor",
      "Heated & Ventilated Seats",
      "Blind-Spot View Monitor"
    ],
    "status": "available",
    "location": "Queens, NY",
    "created_at": "2026-04-09"
  },

  {
    "id": 12,
    "brand": "Jeep",
    "model": "Grand Cherokee",
    "year": 2023,
    "trim": "Overland",
    "msrp": 58900,
    "price": 56900,
    "engine": "3.6L V6",
    "drivetrain": "4x4",
    "transmission": "8-Speed Automatic",
    "mpg_city": 19,
    "mpg_hwy": 26,
    "seats": 5,
    "exterior_color": "Velvet Red Pearlcoat",
    "interior_color": "Global Black Leather",
    "stock_number": "JPGR23-OVR-012",
    "vin": "1C4RJHDG0PC234567",
    "images": [
      "assets/images/cars/grand-cherokee/1.jpg",
      "assets/images/cars/grand-cherokee/2.jpg",
       "assets/images/cars/grand-cherokee/3.jpg"
    ],
    "features": [
      "Quadra-Lift Air Suspension",
      "Panoramic Sunroof",
      "Uconnect 10.1\" Display",
      "Adaptive Cruise Control"
    ],
    "status": "available",
    "location": "Brooklyn, NY",
    "created_at": "2026-04-07"
  },
  {
    "id": 13,
    "brand": "BMW",
    "model": "X5",
    "year": 2022,
    "trim": "xDrive40i",
    "msrp": 64000,
    "price": 62500,
    "engine": "3.0L Turbo I6",
    "drivetrain": "AWD",
    "transmission": "8-Speed Automatic",
    "mpg_city": 21,
    "mpg_hwy": 26,
    "seats": 5,
    "exterior_color": "Mineral White Metallic",
    "interior_color": "Cognac Vernasca Leather",
    "stock_number": "BMWX5-40I-013",
    "vin": "5UXCR6C03N9A12345",
    "images": [
      "assets/images/cars/x5/1.jpg",
      "assets/images/cars/x5/2.jpg",
      "assets/images/cars/x5/2.jpg"
    ],
    "features": [
      "Live Cockpit Professional",
      "Heated Front Seats",
      "Parking Assistant Plus",
      "Panoramic Sky Lounge Roof"
    ],
    "status": "available",
    "location": "Queens, NY",
    "created_at": "2026-04-04"
  },
  {
    "id": 14,
    "brand": "Mercedes-Benz",
    "model": "GLC 300",
    "year": 2021,
    "trim": "4MATIC",
    "msrp": 46500,
    "price": 44900,
    "engine": "2.0L Turbo I4",
    "drivetrain": "AWD",
    "transmission": "9-Speed Automatic",
    "mpg_city": 22,
    "mpg_hwy": 29,
    "seats": 5,
    "exterior_color": "Polar White",
    "interior_color": "Silk Beige MB-Tex",
    "stock_number": "MBGLC21-4MT-014",
    "vin": "W1N0G8EB0MF123456",
    "images": [
      "assets/images/cars/glc/1.jpg",
      "assets/images/cars/glc/2.jpg",
      "assets/images/cars/glc/3.jpg"
    ],
    "features": [
      "MBUX Infotainment",
      "Heated Front Seats",
      "Active Brake Assist",
      "Power Liftgate"
    ],
    "status": "available",
    "location": "Bronx, NY",
    "created_at": "2026-04-02"
  },

  {
    "id": 15,
    "brand": "Audi",
    "model": "Q7",
    "year": 2020,
    "trim": "Premium Plus",
    "msrp": 58900,
    "price": 56900,
    "engine": "2.0L Turbo I4",
    "drivetrain": "quattro AWD",
    "transmission": "8-Speed Automatic",
    "mpg_city": 19,
    "mpg_hwy": 23,
    "seats": 7,
    "exterior_color": "Glacier White Metallic",
    "interior_color": "Okapi Brown Leather",
    "stock_number": "AUDQ7-PP-015",
    "vin": "WA1LXAF70LD123456",
    "images": [
      "assets/images/cars/q7/1.jpg",
      "assets/images/cars/q7/2.jpg",
      "assets/images/cars/q7/3.jpg"
    ],
    "features": [
      "Virtual Cockpit",
      "Matrix LED Headlights",
      "Panoramic Sunroof",
      "Bang & Olufsen Audio"
    ],
    "status": "available",
    "location": "Queens, NY",
    "created_at": "2026-04-06"
  },
  {
    "id": 16,
    "brand": "Lexus",
    "model": "RX 350",
    "year": 2021,
    "trim": "F Sport",
    "msrp": 52500,
    "price": 50900,
    "engine": "3.5L V6",
    "drivetrain": "AWD",
    "transmission": "8-Speed Automatic",
    "mpg_city": 20,
    "mpg_hwy": 27,
    "seats": 5,
    "exterior_color": "Ultrasonic Blue Mica",
    "interior_color": "Black F Sport Leather",
    "stock_number": "LEXRX21-FSP-016",
    "vin": "2T2YZMDA0MC234567",
    "images": [
    "assets/images/cars/cx9/1.jpg",
      "assets/images/cars/cx9/3.jpg",
      "assets/images/cars/cx9/2.jpg"
    ],
    "features": [
      "F Sport Suspension",
      "12.3\" Touchscreen",
      "Mark Levinson Audio",
      "Heated & Ventilated Seats"
    ],
    "status": "available",
    "location": "Brooklyn, NY",
    "created_at": "2026-04-03"
  },
  {
    "id": 17,
    "brand": "Volkswagen",
    "model": "Atlas",
    "year": 2022,
    "trim": "SEL Premium R-Line",
    "msrp": 52500,
    "price": 50900,
    "engine": "3.6L V6",
    "drivetrain": "AWD",
    "transmission": "8-Speed Automatic",
    "mpg_city": 17,
    "mpg_hwy": 23,
    "seats": 7,
    "exterior_color": "Pure White",
    "interior_color": "Titan Black Leather",
    "stock_number": "VWAT22-SEL-017",
    "vin": "1V2BR2CA0NC345678",
    "images": [
    "assets/images/cars/cx9/1.jpg",
      "assets/images/cars/cx9/3.jpg",
      "assets/images/cars/cx9/2.jpg"
    ],
    "features": [
      "Digital Cockpit Pro",
      "Heated 2nd Row Seats",
      "Area View Camera",
      "R-Line Exterior Package"
    ],
    "status": "available",
    "location": "Queens, NY",
    "created_at": "2026-04-05"
  },

  {
    "id": 18,
    "brand": "Mazda",
    "model": "CX-9",
    "year": 2021,
    "trim": "Signature",
    "msrp": 47500,
    "price": 45900,
    "engine": "2.5L Turbo I4",
    "drivetrain": "AWD",
    "transmission": "6-Speed Automatic",
    "mpg_city": 20,
    "mpg_hwy": 26,
    "seats": 6,
    "exterior_color": "Machine Gray Metallic",
    "interior_color": "Deep Chestnut Nappa Leather",
    "stock_number": "MZCX21-SIG-018",
    "vin": "JM3TCBEY0M0456789",
    "images": [
      "assets/images/cars/cx9/1.jpg",
      "assets/images/cars/cx9/3.jpg",
      "assets/images/cars/cx9/2.jpg"
    ],
    "features": [
      "360° View Monitor",
      "Heated 2nd Row Seats",
      "Bose 12-Speaker Audio",
      "Adaptive Front Lighting"
    ],
    "status": "available",
    "location": "Bronx, NY",
    "created_at": "2026-04-01"
  },

  {
    "id": 19,
    "brand": "Subaru",
    "model": "Ascent",
    "year": 2020,
    "trim": "Touring",
    "msrp": 46500,
    "price": 44900,
    "engine": "2.4L Turbo Boxer",
    "drivetrain": "AWD",
    "transmission": "CVT",
    "mpg_city": 20,
    "mpg_hwy": 26,
    "seats": 7,
    "exterior_color": "Crystal White Pearl",
    "interior_color": "Java Brown Leather",
    "stock_number": "SBAS20-TRN-019",
    "vin": "4S4WMARD0L3456789",
    "images": [
      "assets/images/cars/touring/1.jpg",
      "assets/images/cars/touring/3.jpg",
      "assets/images/cars/touring/2.jpg"
    ],
    "features": [
      "EyeSight Driver Assist",
      "Heated Steering Wheel",
      "Panoramic Moonroof",
      "Harman Kardon Audio"
    ],
    "status": "available",
    "location": "Queens, NY",
    "created_at": "2026-04-10"
  },{
    "id": 20,
    "brand": "Infiniti",
    "model": "QX60",
    "year": 2022,
    "trim": "Autograph",
    "msrp": 63500,
    "price": 61900,
    "engine": "3.5L V6",
    "drivetrain": "AWD",
    "transmission": "9-Speed Automatic",
    "mpg_city": 20,
    "mpg_hwy": 25,
    "seats": 7,
    "exterior_color": "Moonbow Blue",
    "interior_color": "White Semi-Aniline Leather",
    "stock_number": "INFQX22-AUT-020",
    "vin": "5N1DL1FR0NC567890",
    "images": [
      "assets/images/cars/qx60/1.jpg",
      "assets/images/cars/qx60/3.jpg",
      "assets/images/cars/qx60/2.jpg"
    ],
    "features": [
      "Massage Front Seats",
      "12.3\" Digital Cluster",
      "ProPILOT Assist",
      "Panoramic Roof"
    ],
    "status": "available",
    "location": "Brooklyn, NY",
    "created_at": "2026-04-12" 
 },
 {
  "id": 21,
  "brand": "Toyota",
  "model": "4Runner",
  "year": 2024,
  "trim": "TRD Pro",
  "msrp": 56000,
  "price": 54500,
  "engine": "4.0L V6",
  "drivetrain": "4WD",
  "transmission": "5-Speed Automatic",
  "mpg_city": 16,
  "mpg_hwy": 19,
  "seats": 5,
  "exterior_color": "Solar Octane",
  "interior_color": "Black SofTex",
  "stock_number": "TY4R24-TRD-021",
  "vin": "JTEBU5JR0R1234567",
  "images": [
    "assets/images/cars/4runner/1.jpg",
    "assets/images/cars/4runner/3.jpg",
    "assets/images/cars/4runner/2.jpg"
  ],
  "features": [
    "TRD-Tuned Suspension",
    "Fox Shocks",
    "Multi-Terrain Select",
    "Crawl Control"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-15"
},
{
  "id": 22,
  "brand": "Honda",
  "model": "Passport",
  "year": 2023,
  "trim": "TrailSport",
  "msrp": 44500,
  "price": 42900,
  "engine": "3.5L V6",
  "drivetrain": "AWD",
  "transmission": "9-Speed Automatic",
  "mpg_city": 19,
  "mpg_hwy": 24,
  "seats": 5,
  "exterior_color": "Diffused Sky Blue",
  "interior_color": "Black Leather",
  "stock_number": "HNPS23-TS-022",
  "vin": "5FNYF8H60PB234567",
  "images": [
    "assets/images/cars/passport/1.jpg",
    "assets/images/cars/passport/2.jpg",
    "assets/images/cars/passport/3.jpg"
  ],
  "features": [
    "Off-Road Tuned Suspension",
    "Roof Rails",
    "Heated Seats",
    "Honda Sensing"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-14"
},
{
  "id": 23,
  "brand": "Ford",
  "model": "Edge",
  "year": 2022,
  "trim": "Titanium",
  "msrp": 43500,
  "price": 41900,
  "engine": "2.0L EcoBoost",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 21,
  "mpg_hwy": 28,
  "seats": 5,
  "exterior_color": "Star White Metallic",
  "interior_color": "Ebony Leather",
  "stock_number": "FDED22-TIT-023",
  "vin": "2FMPK4K92NBA34567",
  "images": [
    "assets/images/cars/edge/1.jpg",
    "assets/images/cars/edge/2.jpg",
    "assets/images/cars/edge/3.jpg"
  ],
  "features": [
    "12\" Touchscreen",
    "Ford Co-Pilot360",
    "Heated Front Seats",
    "Hands-Free Liftgate"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-13"
},
{
  "id": 24,
  "brand": "Chevrolet",
  "model": "Traverse",
  "year": 2021,
  "trim": "RS",
  "msrp": 44500,
  "price": 42900,
  "engine": "3.6L V6",
  "drivetrain": "AWD",
  "transmission": "9-Speed Automatic",
  "mpg_city": 18,
  "mpg_hwy": 27,
  "seats": 7,
  "exterior_color": "Iridescent Pearl",
  "interior_color": "Jet Black",
  "stock_number": "CHTR21-RS-024",
  "vin": "1GNERJKW0MJ456789",
  "images": [
    "assets/images/cars/traverse/1.jpg",
    "assets/images/cars/traverse/2.jpg",
    "assets/images/cars/traverse/2.jpg"
  ],
  "features": [
    "Blackout Package",
    "Wireless CarPlay",
    "Tri-Zone Climate",
    "Safety Assist"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-12"
},
{
  "id": 25,
  "brand": "Nissan",
  "model": "Armada",
  "year": 2023,
  "trim": "SL",
  "msrp": 60500,
  "price": 58900,
  "engine": "5.6L V8",
  "drivetrain": "4WD",
  "transmission": "7-Speed Automatic",
  "mpg_city": 14,
  "mpg_hwy": 19,
  "seats": 8,
  "exterior_color": "Super Black",
  "interior_color": "Charcoal Leather",
  "stock_number": "NSAR23-SL-025",
  "vin": "JN8AY2NC0P9123456",
  "images": [
    "assets/images/cars/armada/1.jpg",
    "assets/images/cars/armada/2.jpg",
    "assets/images/cars/armada/3.jpg"
  ],
  "features": [
    "Power Liftgate",
    "Bose Audio",
    "Heated Seats",
    "Nissan Safety Shield 360"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-11"
},
{
  "id": 26,
  "brand": "Kia",
  "model": "Sorento",
  "year": 2022,
  "trim": "SX Prestige",
  "msrp": 44500,
  "price": 42900,
  "engine": "2.5L Turbo",
  "drivetrain": "AWD",
  "transmission": "8-Speed DCT",
  "mpg_city": 22,
  "mpg_hwy": 29,
  "seats": 6,
  "exterior_color": "Wolf Gray",
  "interior_color": "Rust Brown Leather",
  "stock_number": "KIAS22-SXP-026",
  "vin": "5XYRKDLF0NG234567",
  "images": [
    "assets/images/cars/sorento/1.jpg",
    "assets/images/cars/sorento/2.jpg",
    "assets/images/cars/sorento/3.jpg"
  ],
  "features": [
    "Panoramic Roof",
    "Heated & Ventilated Seats",
    "Bose Audio",
    "Blind Spot View Monitor"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-10"
},
{
  "id": 27,
  "brand": "Hyundai",
  "model": "Santa Fe",
  "year": 2023,
  "trim": "Calligraphy",
  "msrp": 48500,
  "price": 46900,
  "engine": "2.5L Turbo",
  "drivetrain": "AWD",
  "transmission": "8-Speed DCT",
  "mpg_city": 21,
  "mpg_hwy": 28,
  "seats": 5,
  "exterior_color": "Hampton Gray",
  "interior_color": "Camel Leather",
  "stock_number": "HYSF23-CAL-027",
  "vin": "5NMS5DAL0PH345678",
  "images": [
    "assets/images/cars/santafe/1.jpg",
    "assets/images/cars/santafe/2.jpg",
    "assets/images/cars/santafe/3.jpg"
  ],
  "features": [
    "Remote Smart Parking",
    "Heated Steering Wheel",
    "Surround View Monitor",
    "Panoramic Sunroof"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-09"
},
{
  "id": 28,
  "brand": "Jeep",
  "model": "Wrangler",
  "year": 2024,
  "trim": "Rubicon",
  "msrp": 56500,
  "price": 54900,
  "engine": "2.0L Turbo",
  "drivetrain": "4x4",
  "transmission": "8-Speed Automatic",
  "mpg_city": 20,
  "mpg_hwy": 24,
  "seats": 5,
  "exterior_color": "Firecracker Red",
  "interior_color": "Black Cloth",
  "stock_number": "JPWR24-RBC-028",
  "vin": "1C4HJXDN0RW456789",
  "images": [
    "assets/images/cars/santafe/3.jpg",
    "assets/images/cars/santafe/1.jpg",
    "assets/images/cars/santafe/2.jpg"
  ],
  "features": [
    "Rock-Trac 4x4",
    "Locking Differentials",
    "Off-Road+ Mode",
    "Steel Bumpers"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-08"
},
{
  "id": 29,
  "brand": "BMW",
  "model": "X3",
  "year": 2023,
  "trim": "xDrive30i",
  "msrp": 48500,
  "price": 46900,
  "engine": "2.0L Turbo I4",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 23,
  "mpg_hwy": 29,
  "seats": 5,
  "exterior_color": "Phytonic Blue",
  "interior_color": "Black Sensatec",
  "stock_number": "BMWX3-30I-029",
  "vin": "5UX53DP08P9A56789",
  "images": [
    "assets/images/cars/X3/1.webp",
    "assets/images/cars/X3/2.webp",
    "assets/images/cars/X3/3.webp"
  ],
  "features": [
    "Live Cockpit Plus",
    "Heated Seats",
    "Parking Assistant",
    "Panoramic Roof"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-07"
},
{
  "id": 30,
  "brand": "Mercedes-Benz",
  "model": "GLE 350",
  "year": 2022,
  "trim": "4MATIC",
  "msrp": 59500,
  "price": 57900,
  "engine": "2.0L Turbo I4",
  "drivetrain": "AWD",
  "transmission": "9-Speed Automatic",
  "mpg_city": 20,
  "mpg_hwy": 27,
  "seats": 5,
  "exterior_color": "Obsidian Black",
  "interior_color": "Macchiato Beige",
  "stock_number": "MBGLE22-4MT-030",
  "vin": "4JGFB4KB0NA345678",
  "images": [
    "assets/images/cars/gle/1.jpg",
    "assets/images/cars/gle/2.webp",
    "assets/images/cars/gle/3.jpg"
  ],
  "features": [
    "MBUX System",
    "Heated Front Seats",
    "Active Brake Assist",
    "Panoramic Sunroof"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-06"
},
{
  "id": 31,
  "brand": "Toyota",
  "model": "Grand Highlander",
  "year": 2024,
  "trim": "Limited Hybrid",
  "msrp": 51500,
  "price": 49900,
  "engine": "2.5L Hybrid",
  "drivetrain": "AWD",
  "transmission": "e-CVT",
  "mpg_city": 36,
  "mpg_hwy": 32,
  "seats": 7,
  "exterior_color": "Storm Cloud",
  "interior_color": "Black Leather",
  "stock_number": "TYGH24-LTD-031",
  "vin": "5TDACAAAA0R123987",
  "images": [
    "assets/images/cars/grand-highlander/1.webp",
    "assets/images/cars/grand-highlander/2.avif",
    "assets/images/cars/grand-highlander/3.jpg"
  ],
  "features": [
    "12.3\" Touchscreen",
    "Panoramic Roof",
    "Heated & Ventilated Seats",
    "Toyota Safety Sense 3.0"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-15"
},
{
  "id": 32,
  "brand": "Honda",
  "model": "Ridgeline",
  "year": 2023,
  "trim": "Black Edition",
  "msrp": 49500,
  "price": 47900,
  "engine": "3.5L V6",
  "drivetrain": "AWD",
  "transmission": "9-Speed Automatic",
  "mpg_city": 18,
  "mpg_hwy": 24,
  "seats": 5,
  "exterior_color": "Crystal Black Pearl",
  "interior_color": "Black Leather",
  "stock_number": "HNRI23-BLK-032",
  "vin": "5FPYK3F89PB234678",
  "images": [
    "assets/images/cars/ridgeline/1.jpg",
    "assets/images/cars/ridgeline/2.jpg",
    "assets/images/cars/ridgeline/3.jpg"
  ],
  "features": [
    "Truck Bed Audio",
    "Heated Seats",
    "Honda Sensing",
    "Dual-Action Tailgate"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-14"
},
{
  "id": 33,
  "brand": "Ford",
  "model": "Expedition",
  "year": 2022,
  "trim": "Limited",
  "msrp": 68500,
  "price": 66900,
  "engine": "3.5L EcoBoost V6",
  "drivetrain": "4WD",
  "transmission": "10-Speed Automatic",
  "mpg_city": 17,
  "mpg_hwy": 23,
  "seats": 8,
  "exterior_color": "Iconic Silver",
  "interior_color": "Sandstone Leather",
  "stock_number": "FDEX22-LTD-033",
  "vin": "1FMJU2AT0NE345678",
  "images": [
    "assets/images/cars/expedition/1.webp",
    "assets/images/cars/expedition/2.webp",
    "assets/images/cars/expedition/3.webp"
  ],
  "features": [
    "12\" Touchscreen",
    "PowerFold 3rd Row",
    "B&O Audio",
    "Ford Co-Pilot360"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-13"
},
{
  "id": 34,
  "brand": "Chevrolet",
  "model": "Suburban",
  "year": 2024,
  "trim": "High Country",
  "msrp": 78500,
  "price": 76500,
  "engine": "6.2L V8",
  "drivetrain": "4WD",
  "transmission": "10-Speed Automatic",
  "mpg_city": 14,
  "mpg_hwy": 19,
  "seats": 7,
  "exterior_color": "Iridescent Pearl",
  "interior_color": "Mocha Leather",
  "stock_number": "CHSB24-HC-034",
  "vin": "1GNSKGKL0RR456789",
  "images": [
    "assets/images/cars/suburban/1.avif",
    "assets/images/cars/suburban/2.avif",
    "assets/images/cars/suburban/2.avif"
  ],
  "features": [
    "Magnetic Ride Control",
    "HUD Display",
    "Panoramic Roof",
    "Surround Vision"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-12"
},
{
  "id": 35,
  "brand": "Nissan",
  "model": "Rogue",
  "year": 2023,
  "trim": "Platinum",
  "msrp": 41500,
  "price": 39900,
  "engine": "1.5L VC-Turbo",
  "drivetrain": "AWD",
  "transmission": "CVT",
  "mpg_city": 28,
  "mpg_hwy": 34,
  "seats": 5,
  "exterior_color": "Boulder Gray",
  "interior_color": "Tan Leather",
  "stock_number": "NSRG23-PLT-035",
  "vin": "5N1BT3CB0PC345678",
  "images": [
    "assets/images/cars/rogue/1.jpg",
    "assets/images/cars/rogue/2.jpg",
    "assets/images/cars/rogue/.jpg"
  ],
  "features": [
    "ProPILOT Assist",
    "Panoramic Roof",
    "Quilted Leather",
    "Wireless CarPlay"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-11"
},
{
  "id": 36,
  "brand": "Kia",
  "model": "Sportage",
  "year": 2023,
  "trim": "X-Pro Prestige",
  "msrp": 41500,
  "price": 39900,
  "engine": "2.5L I4",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 23,
  "mpg_hwy": 28,
  "seats": 5,
  "exterior_color": "Jungle Green",
  "interior_color": "Black Leather",
  "stock_number": "KIAS23-XPP-036",
  "vin": "5XYK3CAF0PG456789",
  "images": [
    "assets/images/cars/sportage/1.jpg",
    "assets/images/cars/sportage/2.jpg"
  ],
  "features": [
    "Terrain Mode Select",
    "Heated & Ventilated Seats",
    "Panoramic Roof",
    "Blind Spot View Monitor"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-10"
},
{
  "id": 37,
  "brand": "Hyundai",
  "model": "Tucson",
  "year": 2024,
  "trim": "Limited Hybrid",
  "msrp": 41500,
  "price": 39900,
  "engine": "1.6L Turbo Hybrid",
  "drivetrain": "AWD",
  "transmission": "6-Speed Automatic",
  "mpg_city": 38,
  "mpg_hwy": 38,
  "seats": 5,
  "exterior_color": "Shimmering Silver",
  "interior_color": "Black Leather",
  "stock_number": "HYTC24-LTD-037",
  "vin": "KM8JFCA19RU345678",
  "images": [
    "assets/images/cars/tucson/1.jpg",
    "assets/images/cars/tucson/2.jpg"
  ],
  "features": [
    "Remote Smart Parking",
    "Panoramic Roof",
    "Heated & Ventilated Seats",
    "Blind Spot View Monitor"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-09"
},
{
  "id": 38,
  "brand": "Jeep",
  "model": "Gladiator",
  "year": 2024,
  "trim": "Mojave",
  "msrp": 56500,
  "price": 54900,
  "engine": "3.6L V6",
  "drivetrain": "4x4",
  "transmission": "8-Speed Automatic",
  "mpg_city": 17,
  "mpg_hwy": 22,
  "seats": 5,
  "exterior_color": "Hydro Blue",
  "interior_color": "Black Cloth",
  "stock_number": "JPGL24-MJV-038",
  "vin": "1C6JJTEG0RL456789",
  "images": [
    "assets/images/cars/gladiator/1.jpg",
    "assets/images/cars/gladiator/2.jpg"
  ],
  "features": [
    "Desert Rated",
    "Fox Internal Bypass Shocks",
    "Locking Rear Differential",
    "Off-Road+ Mode"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-08"
},
{
  "id": 39,
  "brand": "BMW",
  "model": "X7",
  "year": 2023,
  "trim": "xDrive40i",
  "msrp": 81500,
  "price": 79500,
  "engine": "3.0L Turbo I6",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 21,
  "mpg_hwy": 25,
  "seats": 7,
  "exterior_color": "Carbon Black Metallic",
  "interior_color": "Ivory White Leather",
  "stock_number": "BMWX7-40I-039",
  "vin": "5UXCW2C09P9A67890",
  "images": [
    "assets/images/cars/x7/1.jpg",
    "assets/images/cars/x7/2.webp"
  ],
  "features": [
    "Sky Lounge Roof",
    "Heated & Ventilated Seats",
    "Parking Assistant Plus",
    "Live Cockpit Pro"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-07"
},
{
  "id": 40,
  "brand": "Mercedes-Benz",
  "model": "GLS 450",
  "year": 2023,
  "trim": "4MATIC",
  "msrp": 88500,
  "price": 86500,
  "engine": "3.0L Turbo I6",
  "drivetrain": "AWD",
  "transmission": "9-Speed Automatic",
  "mpg_city": 19,
  "mpg_hwy": 24,
  "seats": 7,
  "exterior_color": "Selenite Grey",
  "interior_color": "Macchiato Beige Leather",
  "stock_number": "MBGLS23-4MT-040",
  "vin": "4JGFF5KE0PA456789",
  "images": [
    "assets/images/cars/gls/1.jpg",
    "assets/images/cars/gls/2.jpg",
     "assets/images/cars/gls/2.jpg"
  ],
  "features": [
    "MBUX Hyperscreen",
    "AIRMATIC Suspension",
    "Heated & Ventilated Seats",
    "Panoramic Sunroof"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-06"
},
{
  "id": 41,
  "brand": "Toyota",
  "model": "Tacoma",
  "year": 2024,
  "trim": "TRD Off-Road",
  "msrp": 44500,
  "price": 42900,
  "engine": "2.4L Turbo",
  "drivetrain": "4WD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 20,
  "mpg_hwy": 23,
  "seats": 5,
  "exterior_color": "Solar Octane",
  "interior_color": "Black Fabric",
  "stock_number": "TYTC24-TRO-041",
  "vin": "3TMCZ5AN0RM123456",
  "images": [
    "assets/images/cars/tacoma/1.jpg",
    "assets/images/cars/tacoma/2.jpg"
  ],
  "features": [
    "Multi-Terrain Select",
    "Crawl Control",
    "Bilstein Shocks",
    "Wireless CarPlay"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-15"
},
{
  "id": 42,
  "brand": "Honda",
  "model": "Civic",
  "year": 2023,
  "trim": "Touring",
  "msrp": 32500,
  "price": 30900,
  "engine": "1.5L Turbo",
  "drivetrain": "FWD",
  "transmission": "CVT",
  "mpg_city": 31,
  "mpg_hwy": 38,
  "seats": 5,
  "exterior_color": "Sonic Gray Pearl",
  "interior_color": "Black Leather",
  "stock_number": "HNCV23-TRN-042",
  "vin": "2HGFE1F90PH345678",
  "images": [
    "assets/images/cars/civic/1.jpg",
    "assets/images/cars/civic/2.jpg",
    "assets/images/cars/civic/3.jpg"
  ],
  "features": [
    "Bose Audio",
    "Heated Seats",
    "Honda Sensing",
    "Wireless CarPlay"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-14"
},
{
  "id": 43,
  "brand": "Ford",
  "model": "F-150",
  "year": 2023,
  "trim": "Lariat",
  "msrp": 59500,
  "price": 57900,
  "engine": "3.5L EcoBoost V6",
  "drivetrain": "4WD",
  "transmission": "10-Speed Automatic",
  "mpg_city": 18,
  "mpg_hwy": 24,
  "seats": 5,
  "exterior_color": "Antimatter Blue",
  "interior_color": "Black Leather",
  "stock_number": "FDF150-LRT-043",
  "vin": "1FTFW1E89PK456789",
  "images": [
    "assets/images/cars/civic/3.jpg",
    "assets/images/cars/civic/2.jpg",
    "assets/images/cars/civic/1.jpg"
  ],
  "features": [
    "12\" Touchscreen",
    "Pro Power Onboard",
    "Heated & Ventilated Seats",
    "Ford Co-Pilot360"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-13"
},
{
  "id": 44,
  "brand": "Chevrolet",
  "model": "Colorado",
  "year": 2024,
  "trim": "Z71",
  "msrp": 44500,
  "price": 42900,
  "engine": "2.7L Turbo High-Output",
  "drivetrain": "4WD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 19,
  "mpg_hwy": 25,
  "seats": 5,
  "exterior_color": "Sand Dune Metallic",
  "interior_color": "Jet Black",
  "stock_number": "CHCO24-Z71-044",
  "vin": "1GCPTDEK0R1234567",
  "images": [
    "assets/images/cars/civic/1.jpg",
    "assets/images/cars/civic/3.jpg",
    "assets/images/cars/civic/2.jpg"
  ],
  "features": [
    "Off-Road Suspension",
    "Wireless CarPlay",
    "Heated Seats",
    "Trailering Package"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-12"
},
{
  "id": 45,
  "brand": "Nissan",
  "model": "Frontier",
  "year": 2023,
  "trim": "Pro-4X",
  "msrp": 44500,
  "price": 42900,
  "engine": "3.8L V6",
  "drivetrain": "4WD",
  "transmission": "9-Speed Automatic",
  "mpg_city": 18,
  "mpg_hwy": 24,
  "seats": 5,
  "exterior_color": "Baja Storm",
  "interior_color": "Charcoal Leather",
  "stock_number": "NSFR23-P4X-045",
  "vin": "1N6ED1EJ0PN345678",
  "images": [
    "assets/images/cars/civic/1.jpg",
    "assets/images/cars/civic/3.jpg",
    "assets/images/cars/civic/2.jpg"
  ],
  "features": [
    "Bilstein Shocks",
    "Locking Rear Differential",
    "Heated Seats",
    "Nissan Safety Shield"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-11"
},
{
  "id": 46,
  "brand": "Kia",
  "model": "Carnival",
  "year": 2023,
  "trim": "SX Prestige",
  "msrp": 48500,
  "price": 46900,
  "engine": "3.5L V6",
  "drivetrain": "FWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 19,
  "mpg_hwy": 26,
  "seats": 7,
  "exterior_color": "Astra Blue",
  "interior_color": "Tuscan Umber Leather",
  "stock_number": "KIAC23-SXP-046",
  "vin": "KNDNE5H30P6234567",
  "images": [
    "assets/images/cars/civic/1.jpg",
    "assets/images/cars/civic/3.jpg",
    "assets/images/cars/civic/2.jpg"
  ],
  "features": [
    "VIP Lounge Seats",
    "Dual Sunroofs",
    "Blind Spot View Monitor",
    "Heated & Ventilated Seats"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-10"
},
{
  "id": 47,
  "brand": "Hyundai",
  "model": "Venue",
  "year": 2023,
  "trim": "Limited",
  "msrp": 24500,
  "price": 22900,
  "engine": "1.6L I4",
  "drivetrain": "FWD",
  "transmission": "CVT",
  "mpg_city": 29,
  "mpg_hwy": 33,
  "seats": 5,
  "exterior_color": "Denim Blue",
  "interior_color": "Blue/White Two-Tone",
  "stock_number": "HYVN23-LTD-047",
  "vin": "KMHRC8A39PU345678",
  "images": [
    "assets/images/cars/civic/1.jpg",
    "assets/images/cars/civic/3.jpg",
    "assets/images/cars/civic/2.jpg"
  ],
  "features": [
    "Two-Tone Interior",
    "Heated Seats",
    "Blind Spot Warning",
    "Wireless CarPlay"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-09"
},
{
  "id": 48,
  "brand": "Jeep",
  "model": "Compass",
  "year": 2024,
  "trim": "Limited",
  "msrp": 36500,
  "price": 34900,
  "engine": "2.0L Turbo",
  "drivetrain": "4x4",
  "transmission": "8-Speed Automatic",
  "mpg_city": 24,
  "mpg_hwy": 32,
  "seats": 5,
  "exterior_color": "Laser Blue",
  "interior_color": "Black Leather",
  "stock_number": "JPCS24-LTD-048",
  "vin": "3C4NJDCN0RT456789",
  "images": [
    "assets/images/cars/compass/1.jpg",
    "assets/images/cars/compass/2.jpg"
  ],
  "features": [
    "10.1\" Touchscreen",
    "Heated Seats",
    "Adaptive Cruise Control",
    "Remote Start"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-08"
},
{
  "id": 49,
  "brand": "BMW",
  "model": "iX",
  "year": 2023,
  "trim": "xDrive50",
  "msrp": 88500,
  "price": 86500,
  "engine": "Dual Electric Motors",
  "drivetrain": "AWD",
  "transmission": "Single-Speed",
  "mpg_city": 86,
  "mpg_hwy": 87,
  "seats": 5,
  "exterior_color": "Storm Bay Metallic",
  "interior_color": "Oyster Leather",
  "stock_number": "BMWIX-50-049",
  "vin": "WB523CF09P9A67891",
  "images": [
    "assets/images/cars/ix/1.jpg",
    "assets/images/cars/ix/2.jpg"
  ],
  "features": [
    "Panoramic Sky Lounge Roof",
    "Harman Kardon Audio",
    "Heated & Ventilated Seats",
    "Driving Assistant Pro"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-07"
},
{
  "id": 50,
  "brand": "Mercedes-Benz",
  "model": "EQE SUV",
  "year": 2024,
  "trim": "350 4MATIC",
  "msrp": 79500,
  "price": 77900,
  "engine": "Dual Electric Motors",
  "drivetrain": "AWD",
  "transmission": "Single-Speed",
  "mpg_city": 88,
  "mpg_hwy": 85,
  "seats": 5,
  "exterior_color": "Graphite Grey",
  "interior_color": "Neva Grey Leather",
  "stock_number": "MBEQE24-350-050",
  "vin": "4JGGM2BB0RA456780",
  "images": [
    "assets/images/cars/eqe/1.jpg",
    "assets/images/cars/eqe/2.jpg"
  ],
  "features": [
    "MBUX Hyperscreen",
    "AIRMATIC Suspension",
    "Heated & Ventilated Seats",
    "Augmented Reality Navigation"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-06"
},
{
  "id": 51,
  "brand": "Toyota",
  "model": "Camry",
  "year": 2024,
  "trim": "XSE",
  "msrp": 36500,
  "price": 34900,
  "engine": "2.5L I4",
  "drivetrain": "FWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 28,
  "mpg_hwy": 39,
  "seats": 5,
  "exterior_color": "Supersonic Red",
  "interior_color": "Black Leather",
  "stock_number": "TYCM24-XSE-051",
  "vin": "4T1K61AK0RU123456",
  "images": [
    "assets/images/cars/camry/1.jpg",
    "assets/images/cars/camry/2.jpg"
  ],
  "features": [
    "Sport-Tuned Suspension",
    "Panoramic Roof",
    "Heated Seats",
    "Toyota Safety Sense 3.0"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-15"
},
{
  "id": 52,
  "brand": "Honda",
  "model": "Accord",
  "year": 2024,
  "trim": "Sport Hybrid",
  "msrp": 34500,
  "price": 32900,
  "engine": "2.0L Hybrid",
  "drivetrain": "FWD",
  "transmission": "e-CVT",
  "mpg_city": 46,
  "mpg_hwy": 41,
  "seats": 5,
  "exterior_color": "Urban Gray Pearl",
  "interior_color": "Black Cloth",
  "stock_number": "HNAC24-SPH-052",
  "vin": "1HGCY2F59RA234567",
  "images": [
    "assets/images/cars/accord/1.jpg",
    "assets/images/cars/accord/2.jpg",
    "assets/images/cars/accord/3.jpg"
  ],
  "features": [
    "12.3\" Touchscreen",
    "Wireless CarPlay",
    "Honda Sensing",
    "Sport Styling"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-14"
},
{
  "id": 53,
  "brand": "Ford",
  "model": "Mustang Mach-E",
  "year": 2024,
  "trim": "Premium AWD",
  "msrp": 52500,
  "price": 50900,
  "engine": "Dual Electric Motors",
  "drivetrain": "AWD",
  "transmission": "Single-Speed",
  "mpg_city": 90,
  "mpg_hwy": 85,
  "seats": 5,
  "exterior_color": "Shadow Black",
  "interior_color": "Black ActiveX",
  "stock_number": "FDMACH24-PRE-053",
  "vin": "3FMTK3SU0RMA34567",
  "images": [
    "assets/images/cars/mache/1.jpg",
    "assets/images/cars/mache/2.jpg",
    "assets/images/cars/mache/1.jpg"
  ],
  "features": [
    "15.5\" Touchscreen",
    "BlueCruise",
    "Panoramic Roof",
    "Heated Seats"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-13"
},
{
  "id": 54,
  "brand": "Chevrolet",
  "model": "Blazer EV",
  "year": 2024,
  "trim": "RS AWD",
  "msrp": 56500,
  "price": 54900,
  "engine": "Dual Electric Motors",
  "drivetrain": "AWD",
  "transmission": "Single-Speed",
  "mpg_city": 96,
  "mpg_hwy": 90,
  "seats": 5,
  "exterior_color": "Radiant Red",
  "interior_color": "Black Leather",
  "stock_number": "CHBL24-RS-054",
  "vin": "3GNKDCRJ0RS456789",
  "images": [
    "assets/images/cars/blazer/1.jpg",
    "assets/images/cars/blazer/2.jpg",
    "assets/images/cars/blazer/3.jpg"
  ],
  "features": [
    "Super Cruise",
    "Heated & Ventilated Seats",
    "Panoramic Roof",
    "Wireless CarPlay"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-12"
},
{
  "id": 55,
  "brand": "Nissan",
  "model": "Leaf",
  "year": 2023,
  "trim": "SV Plus",
  "msrp": 38500,
  "price": 36900,
  "engine": "Electric Motor",
  "drivetrain": "FWD",
  "transmission": "Single-Speed",
  "mpg_city": 114,
  "mpg_hwy": 94,
  "seats": 5,
  "exterior_color": "Deep Blue Pearl",
  "interior_color": "Black Cloth",
  "stock_number": "NSLF23-SVP-055",
  "vin": "1N4CZ1CV0PC345678",
  "images": [
    "assets/images/cars/leaf/1.jpg",
    "assets/images/cars/leaf/2.jpg",
    "assets/images/cars/leaf/3.jpg"
  ],
  "features": [
    "ProPILOT Assist",
    "Heated Seats",
    "Fast Charging",
    "Apple CarPlay"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-11"
},
{
  "id": 56,
  "brand": "Kia",
  "model": "EV6",
  "year": 2024,
  "trim": "Wind AWD",
  "msrp": 51500,
  "price": 49900,
  "engine": "Dual Electric Motors",
  "drivetrain": "AWD",
  "transmission": "Single-Speed",
  "mpg_city": 88,
  "mpg_hwy": 77,
  "seats": 5,
  "exterior_color": "Snow White Pearl",
  "interior_color": "Black Vegan Leather",
  "stock_number": "KIAEV6-WND-056",
  "vin": "KNDC3DLC0R5123456",
  "images": [
    "assets/images/cars/ev6/1.jpg",
    "assets/images/cars/ev6/2.jpg",
    "assets/images/cars/ev6/3.jpg"
  ],
  "features": [
    "Vehicle-to-Load (V2L)",
    "Heated Seats",
    "Augmented Reality HUD",
    "Meridian Audio"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-10"
},
{
  "id": 57,
  "brand": "Hyundai",
  "model": "IONIQ 6",
  "year": 2024,
  "trim": "SEL AWD",
  "msrp": 49500,
  "price": 47900,
  "engine": "Dual Electric Motors",
  "drivetrain": "AWD",
  "transmission": "Single-Speed",
  "mpg_city": 111,
  "mpg_hwy": 94,
  "seats": 5,
  "exterior_color": "Serenity White",
  "interior_color": "Black Leather",
  "stock_number": "HYI6-SEL-057",
  "vin": "KMHM34AE0RU456789",
  "images": [
    "assets/images/cars/ioniq6/1.jpg",
    "assets/images/cars/eqb/2.jpg",
    "assets/images/cars/ioniq6/2.jpg"
  ],
  "features": [
    "Dual 12.3\" Displays",
    "Heated Seats",
    "Highway Driving Assist",
    "Ambient Lighting"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-09"
},
{
  "id": 58,
  "brand": "Jeep",
  "model": "Grand Wagoneer",
  "year": 2023,
  "trim": "Series II",
  "msrp": 94500,
  "price": 92500,
  "engine": "3.0L Hurricane Twin-Turbo",
  "drivetrain": "4x4",
  "transmission": "8-Speed Automatic",
  "mpg_city": 14,
  "mpg_hwy": 20,
  "seats": 7,
  "exterior_color": "Diamond Black",
  "interior_color": "Blue Agave Leather",
  "stock_number": "JPGW23-S2-058",
  "vin": "1C4SJVFP0PS567890",
  "images": [
    "assets/images/cars/grandwagoneer/1.jpg",
    "assets/images/cars/eqb/2.jpg",
    "assets/images/cars/grandwagoneer/22.jpg"
  ],
  "features": [
    "McIntosh Audio",
    "Night Vision",
    "Quadra-Lift Suspension",
    "Rear Entertainment"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-08"
},
{
  "id": 59,
  "brand": "BMW",
  "model": "i4",
  "year": 2024,
  "trim": "eDrive40",
  "msrp": 61500,
  "price": 59900,
  "engine": "Electric Motor",
  "drivetrain": "RWD",
  "transmission": "Single-Speed",
  "mpg_city": 109,
  "mpg_hwy": 108,
  "seats": 5,
  "exterior_color": "Portimao Blue",
  "interior_color": "Black Sensatec",
  "stock_number": "BMWI4-ED40-059",
  "vin": "WBY33AW09RFA67890",
  "images": [
    "assets/images/cars/i4/1.jpg",
    "assets/images/cars/eqb/2.jpg",
    "assets/images/cars/i4/2.jpg"
  ],
  "features": [
    "Curved Display",
    "Heated Seats",
    "Parking Assistant",
    "Harman Kardon Audio"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-07"
},
{
  "id": 60,
  "brand": "Mercedes-Benz",
  "model": "EQB 350",
  "year": 2024,
  "trim": "4MATIC",
  "msrp": 59500,
  "price": 57900,
  "engine": "Dual Electric Motors",
  "drivetrain": "AWD",
  "transmission": "Single-Speed",
  "mpg_city": 98,
  "mpg_hwy": 93,
  "seats": 7,
  "exterior_color": "Mountain Grey",
  "interior_color": "Black MB-Tex",
  "stock_number": "MBEQB24-350-060",
  "vin": "W1N243AW0RN345678",
  "images": [
    "assets/images/cars/eqb/1.jpg",
    "assets/images/cars/eqb/2.jpg",
    "assets/images/cars/eqb/3.jpg"
  ],
  "features": [
    "MBUX System",
    "Heated Seats",
    "Panoramic Roof",
    "Active Brake Assist"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-06"
},
{
  "id": 61,
  "brand": "Toyota",
  "model": "Corolla Cross",
  "year": 2024,
  "trim": "XLE",
  "msrp": 32500,
  "price": 30900,
  "engine": "2.0L I4",
  "drivetrain": "AWD",
  "transmission": "CVT",
  "mpg_city": 29,
  "mpg_hwy": 32,
  "seats": 5,
  "exterior_color": "Celestite",
  "interior_color": "Black Leather",
  "stock_number": "TYCC24-XLE-061",
  "vin": "7MUAAAAA0R1234561",
  "images": [
    "assets/images/cars/corollacross/3.jpg",
    "assets/images/cars/corollacross/2.jpg",
    "assets/images/cars/corollacross/1.jpg"
  ],
  "features": [
    "Power Liftgate",
    "Heated Seats",
    "Blind Spot Monitor",
    "Wireless CarPlay"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-15"
},
{
  "id": 62,
  "brand": "Honda",
  "model": "HR-V",
  "year": 2023,
  "trim": "EX-L",
  "msrp": 31500,
  "price": 29900,
  "engine": "2.0L I4",
  "drivetrain": "AWD",
  "transmission": "CVT",
  "mpg_city": 25,
  "mpg_hwy": 30,
  "seats": 5,
  "exterior_color": "Nordic Forest Pearl",
  "interior_color": "Black Leather",
  "stock_number": "HNHR23-EXL-062",
  "vin": "3CZRU6H59PM234562",
  "images": [
    "assets/images/cars/corollacross/1.jpg",
    "assets/images/cars/corollacross/2.jpg"
  ],
  "features": [
    "Leather Interior",
    "Heated Seats",
    "Honda Sensing",
    "Moonroof"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-14"
},
{
  "id": 63,
  "brand": "Ford",
  "model": "Bronco",
  "year": 2024,
  "trim": "Outer Banks",
  "msrp": 52500,
  "price": 50900,
  "engine": "2.3L EcoBoost",
  "drivetrain": "4x4",
  "transmission": "10-Speed Automatic",
  "mpg_city": 20,
  "mpg_hwy": 22,
  "seats": 5,
  "exterior_color": "Azure Gray",
  "interior_color": "Navy Pier Leather",
  "stock_number": "FDBR24-OBX-063",
  "vin": "1FMDE5BH0RLA34563",
  "images": [
    "assets/images/cars/corollacross/1.jpg",
    "assets/images/cars/corollacross/2.jpg",
    "assets/images/cars/corollacross/3.jpg"
  ],
  "features": [
    "Sasquatch Package",
    "12\" Touchscreen",
    "GOAT Modes",
    "Heated Seats"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-13"
},
{
  "id": 64,
  "brand": "Chevrolet",
  "model": "Equinox",
  "year": 2024,
  "trim": "Premier",
  "msrp": 36500,
  "price": 34900,
  "engine": "1.5L Turbo",
  "drivetrain": "AWD",
  "transmission": "6-Speed Automatic",
  "mpg_city": 26,
  "mpg_hwy": 31,
  "seats": 5,
  "exterior_color": "Radiant Red",
  "interior_color": "Jet Black",
  "stock_number": "CHEQ24-PMR-064",
  "vin": "3GNAXXEV0RL456764",
  "images": [
    "assets/images/cars/corollacross/1.jpg",
    "assets/images/cars/corollacross/2.jpg",
    "assets/images/cars/corollacross/3.jpg"
  ],
  "features": [
    "Hands-Free Liftgate",
    "Heated Seats",
    "Wireless CarPlay",
    "Safety Assist"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-12"
},
{
  "id": 65,
  "brand": "Nissan",
  "model": "Murano",
  "year": 2023,
  "trim": "SL",
  "msrp": 43500,
  "price": 41900,
  "engine": "3.5L V6",
  "drivetrain": "AWD",
  "transmission": "CVT",
  "mpg_city": 20,
  "mpg_hwy": 28,
  "seats": 5,
  "exterior_color": "Pearl White",
  "interior_color": "Graphite Leather",
  "stock_number": "NSMR23-SL-065",
  "vin": "5N1AZ2CS0PC345665",
  "images": [
    "assets/images/cars/corollacross/1.jpg",
    "assets/images/cars/corollacross/2.jpg",
    "assets/images/cars/corollacross/2.jpg"
  ],
  "features": [
    "Panoramic Roof",
    "Heated Seats",
    "Bose Audio",
    "ProPILOT Assist"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-11"
},
{
  "id": 66,
  "brand": "Kia",
  "model": "Niro EV",
  "year": 2024,
  "trim": "Wave",
  "msrp": 45500,
  "price": 43900,
  "engine": "Electric Motor",
  "drivetrain": "FWD",
  "transmission": "Single-Speed",
  "mpg_city": 126,
  "mpg_hwy": 101,
  "seats": 5,
  "exterior_color": "Snow White Pearl",
  "interior_color": "Charcoal Vegan Leather",
  "stock_number": "KIAN24-WAV-066",
  "vin": "KNDCR3L19R5123466",
  "images": [
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg",
    "assets/images/cars/eve6/3.jpg"
  ],
  "features": [
    "Vehicle-to-Load (V2L)",
    "Heated & Ventilated Seats",
    "Harman Kardon Audio",
    "Smart Cruise Control"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-10"
},
{
  "id": 67,
  "brand": "Hyundai",
  "model": "Kona",
  "year": 2024,
  "trim": "Limited",
  "msrp": 34500,
  "price": 32900,
  "engine": "1.6L Turbo",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 26,
  "mpg_hwy": 32,
  "seats": 5,
  "exterior_color": "Mirage Green",
  "interior_color": "Black Leather",
  "stock_number": "HYKN24-LTD-067",
  "vin": "KM8HACA39RU456767",
  "images": [
    "assets/images/cars/eve6/2.jpg",
    "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg"
  ],
  "features": [
    "Dual 12.3\" Displays",
    "Heated Seats",
    "Blind Spot View Monitor",
    "Smart Cruise Control"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-09"
},
{
  "id": 68,
  "brand": "Jeep",
  "model": "Renegade",
  "year": 2023,
  "trim": "Trailhawk",
  "msrp": 34500,
  "price": 32900,
  "engine": "1.3L Turbo",
  "drivetrain": "4x4",
  "transmission": "9-Speed Automatic",
  "mpg_city": 23,
  "mpg_hwy": 29,
  "seats": 5,
  "exterior_color": "Colorado Red",
  "interior_color": "Black Cloth",
  "stock_number": "JPRN23-THK-068",
  "vin": "ZACNJDD1XPPP45668",
  "images": [
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Selec-Terrain System",
    "Off-Road Suspension",
    "Heated Seats",
    "Remote Start"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-08"
},
{
  "id": 69,
  "brand": "BMW",
  "model": "X2",
  "year": 2024,
  "trim": "xDrive28i",
  "msrp": 43500,
  "price": 41900,
  "engine": "2.0L Turbo I4",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 24,
  "mpg_hwy": 33,
  "seats": 5,
  "exterior_color": "San Remo Green",
  "interior_color": "Black Sensatec",
  "stock_number": "BMWX2-28I-069",
  "vin": "WBXYJ1C09R5A67869",
  "images": [
    "assets/images/cars/eve6/2.jpg",
    "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg"
  ],
  "features": [
    "Curved Display",
    "Heated Seats",
    "Parking Assistant",
    "Panoramic Roof"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-07"
},
{
  "id": 70,
  "brand": "Mercedes-Benz",
  "model": "GLA 250",
  "year": 2024,
  "trim": "4MATIC",
  "msrp": 43500,
  "price": 41900,
  "engine": "2.0L Turbo I4",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 24,
  "mpg_hwy": 33,
  "seats": 5,
  "exterior_color": "Night Black",
  "interior_color": "Macchiato Beige",
  "stock_number": "MBGLA24-250-070",
  "vin": "W1N4N4HB0RN345670",
  "images": [
    "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "MBUX System",
    "Heated Seats",
    "Panoramic Roof",
    "Active Brake Assist"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-06"
},
{
  "id": 61,
  "brand": "Toyota",
  "model": "Corolla Cross",
  "year": 2024,
  "trim": "XLE",
  "msrp": 32500,
  "price": 30900,
  "engine": "2.0L I4",
  "drivetrain": "AWD",
  "transmission": "CVT",
  "mpg_city": 29,
  "mpg_hwy": 32,
  "seats": 5,
  "exterior_color": "Celestite",
  "interior_color": "Black Leather",
  "stock_number": "TYCC24-XLE-061",
  "vin": "7MUAAAAA0R1234561",
  "images": [
       "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Power Liftgate",
    "Heated Seats",
    "Blind Spot Monitor",
    "Wireless CarPlay"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-15"
},
{
  "id": 62,
  "brand": "Honda",
  "model": "HR-V",
  "year": 2023,
  "trim": "EX-L",
  "msrp": 31500,
  "price": 29900,
  "engine": "2.0L I4",
  "drivetrain": "AWD",
  "transmission": "CVT",
  "mpg_city": 25,
  "mpg_hwy": 30,
  "seats": 5,
  "exterior_color": "Nordic Forest Pearl",
  "interior_color": "Black Leather",
  "stock_number": "HNHR23-EXL-062",
  "vin": "3CZRU6H59PM234562",
  "images": [
    "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Leather Interior",
    "Heated Seats",
    "Honda Sensing",
    "Moonroof"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-14"
},
{
  "id": 63,
  "brand": "Ford",
  "model": "Bronco",
  "year": 2024,
  "trim": "Outer Banks",
  "msrp": 52500,
  "price": 50900,
  "engine": "2.3L EcoBoost",
  "drivetrain": "4x4",
  "transmission": "10-Speed Automatic",
  "mpg_city": 20,
  "mpg_hwy": 22,
  "seats": 5,
  "exterior_color": "Azure Gray",
  "interior_color": "Navy Pier Leather",
  "stock_number": "FDBR24-OBX-063",
  "vin": "1FMDE5BH0RLA34563",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Sasquatch Package",
    "12\" Touchscreen",
    "GOAT Modes",
    "Heated Seats"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-13"
},
{
  "id": 64,
  "brand": "Chevrolet",
  "model": "Equinox",
  "year": 2024,
  "trim": "Premier",
  "msrp": 36500,
  "price": 34900,
  "engine": "1.5L Turbo",
  "drivetrain": "AWD",
  "transmission": "6-Speed Automatic",
  "mpg_city": 26,
  "mpg_hwy": 31,
  "seats": 5,
  "exterior_color": "Radiant Red",
  "interior_color": "Jet Black",
  "stock_number": "CHEQ24-PMR-064",
  "vin": "3GNAXXEV0RL456764",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Hands-Free Liftgate",
    "Heated Seats",
    "Wireless CarPlay",
    "Safety Assist"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-12"
},
{
  "id": 65,
  "brand": "Nissan",
  "model": "Murano",
  "year": 2023,
  "trim": "SL",
  "msrp": 43500,
  "price": 41900,
  "engine": "3.5L V6",
  "drivetrain": "AWD",
  "transmission": "CVT",
  "mpg_city": 20,
  "mpg_hwy": 28,
  "seats": 5,
  "exterior_color": "Pearl White",
  "interior_color": "Graphite Leather",
  "stock_number": "NSMR23-SL-065",
  "vin": "5N1AZ2CS0PC345665",
  "images": [
      "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Panoramic Roof",
    "Heated Seats",
    "Bose Audio",
    "ProPILOT Assist"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-11"
},
{
  "id": 66,
  "brand": "Kia",
  "model": "Niro EV",
  "year": 2024,
  "trim": "Wave",
  "msrp": 45500,
  "price": 43900,
  "engine": "Electric Motor",
  "drivetrain": "FWD",
  "transmission": "Single-Speed",
  "mpg_city": 126,
  "mpg_hwy": 101,
  "seats": 5,
  "exterior_color": "Snow White Pearl",
  "interior_color": "Charcoal Vegan Leather",
  "stock_number": "KIAN24-WAV-066",
  "vin": "KNDCR3L19R5123466",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Vehicle-to-Load (V2L)",
    "Heated & Ventilated Seats",
    "Harman Kardon Audio",
    "Smart Cruise Control"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-10"
},
{
  "id": 67,
  "brand": "Hyundai",
  "model": "Kona",
  "year": 2024,
  "trim": "Limited",
  "msrp": 34500,
  "price": 32900,
  "engine": "1.6L Turbo",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 26,
  "mpg_hwy": 32,
  "seats": 5,
  "exterior_color": "Mirage Green",
  "interior_color": "Black Leather",
  "stock_number": "HYKN24-LTD-067",
  "vin": "KM8HACA39RU456767",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Dual 12.3\" Displays",
    "Heated Seats",
    "Blind Spot View Monitor",
    "Smart Cruise Control"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-09"
},
{
  "id": 68,
  "brand": "Jeep",
  "model": "Renegade",
  "year": 2023,
  "trim": "Trailhawk",
  "msrp": 34500,
  "price": 32900,
  "engine": "1.3L Turbo",
  "drivetrain": "4x4",
  "transmission": "9-Speed Automatic",
  "mpg_city": 23,
  "mpg_hwy": 29,
  "seats": 5,
  "exterior_color": "Colorado Red",
  "interior_color": "Black Cloth",
  "stock_number": "JPRN23-THK-068",
  "vin": "ZACNJDD1XPPP45668",
  "images": [
      "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Selec-Terrain System",
    "Off-Road Suspension",
    "Heated Seats",
    "Remote Start"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-08"
},
{
  "id": 69,
  "brand": "BMW",
  "model": "X2",
  "year": 2024,
  "trim": "xDrive28i",
  "msrp": 43500,
  "price": 41900,
  "engine": "2.0L Turbo I4",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 24,
  "mpg_hwy": 33,
  "seats": 5,
  "exterior_color": "San Remo Green",
  "interior_color": "Black Sensatec",
  "stock_number": "BMWX2-28I-069",
  "vin": "WBXYJ1C09R5A67869",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Curved Display",
    "Heated Seats",
    "Parking Assistant",
    "Panoramic Roof"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-07"
},
{
  "id": 70,
  "brand": "Mercedes-Benz",
  "model": "GLA 250",
  "year": 2024,
  "trim": "4MATIC",
  "msrp": 43500,
  "price": 41900,
  "engine": "2.0L Turbo I4",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 24,
  "mpg_hwy": 33,
  "seats": 5,
  "exterior_color": "Night Black",
  "interior_color": "Macchiato Beige",
  "stock_number": "MBGLA24-250-070",
  "vin": "W1N4N4HB0RN345670",
  "images": [
       "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "MBUX System",
    "Heated Seats",
    "Panoramic Roof",
    "Active Brake Assist"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-06"
},
{
  "id": 81,
  "brand": "Toyota",
  "model": "Crown",
  "year": 2024,
  "trim": "Platinum Hybrid MAX",
  "msrp": 52500,
  "price": 50900,
  "engine": "2.4L Turbo Hybrid MAX",
  "drivetrain": "AWD",
  "transmission": "6-Speed Automatic",
  "mpg_city": 29,
  "mpg_hwy": 32,
  "seats": 5,
  "exterior_color": "Oxygen White",
  "interior_color": "Black Leather",
  "stock_number": "TYCR24-PLT-081",
  "vin": "JTDAAAAA0R8123456",
  "images": [
       "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg",
    "assets/images/cars/eve6/3.jpg"
  ],
  "features": [
    "12.3\" Dual Displays",
    "Heated & Ventilated Seats",
    "Panoramic Roof",
    "Toyota Safety Sense 3.0"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-15"
},
{
  "id": 82,
  "brand": "Honda",
  "model": "Odyssey",
  "year": 2024,
  "trim": "Elite",
  "msrp": 51500,
  "price": 49900,
  "engine": "3.5L V6",
  "drivetrain": "FWD",
  "transmission": "10-Speed Automatic",
  "mpg_city": 19,
  "mpg_hwy": 28,
  "seats": 8,
  "exterior_color": "Obsidian Blue Pearl",
  "interior_color": "Gray Leather",
  "stock_number": "HNOD24-ELT-082",
  "vin": "5FNRL6H90RB234582",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Rear Entertainment",
    "Heated & Ventilated Seats",
    "CabinWatch",
    "Honda Sensing"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-14"
},
{
  "id": 83,
  "brand": "Ford",
  "model": "Maverick",
  "year": 2024,
  "trim": "Lariat Hybrid",
  "msrp": 36500,
  "price": 34900,
  "engine": "2.5L Hybrid",
  "drivetrain": "FWD",
  "transmission": "e-CVT",
  "mpg_city": 42,
  "mpg_hwy": 33,
  "seats": 5,
  "exterior_color": "Atlas Blue",
  "interior_color": "Desert Brown",
  "stock_number": "FDMV24-LRT-083",
  "vin": "3FTTW8E39RRA34583",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "FlexBed System",
    "Heated Seats",
    "Ford Co-Pilot360",
    "Wireless CarPlay"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-13"
},
{
  "id": 84,
  "brand": "Chevrolet",
  "model": "Bolt EUV",
  "year": 2023,
  "trim": "Premier",
  "msrp": 34500,
  "price": 32900,
  "engine": "Electric Motor",
  "drivetrain": "FWD",
  "transmission": "Single-Speed",
  "mpg_city": 125,
  "mpg_hwy": 104,
  "seats": 5,
  "exterior_color": "Bright Blue Metallic",
  "interior_color": "Black Leather",
  "stock_number": "CHBE23-PMR-084",
  "vin": "1G1FZ6S09P4123456",
  "images": [
      "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Super Cruise",
    "Heated & Ventilated Seats",
    "Panoramic Sunroof",
    "Wireless CarPlay"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-12"
},
{
  "id": 85,
  "brand": "Nissan",
  "model": "Versa",
  "year": 2024,
  "trim": "SR",
  "msrp": 23500,
  "price": 21900,
  "engine": "1.6L I4",
  "drivetrain": "FWD",
  "transmission": "CVT",
  "mpg_city": 32,
  "mpg_hwy": 40,
  "seats": 5,
  "exterior_color": "Electric Blue",
  "interior_color": "Black Cloth",
  "stock_number": "NSVS24-SR-085",
  "vin": "3N1CN8DV0RL345685",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Sport Styling",
    "Heated Seats",
    "Apple CarPlay",
    "Safety Shield 360"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-11"
},
{
  "id": 86,
  "brand": "Kia",
  "model": "Soul",
  "year": 2024,
  "trim": "GT-Line",
  "msrp": 25500,
  "price": 23900,
  "engine": "2.0L I4",
  "drivetrain": "FWD",
  "transmission": "CVT",
  "mpg_city": 28,
  "mpg_hwy": 33,
  "seats": 5,
  "exterior_color": "Inferno Red",
  "interior_color": "Black Cloth",
  "stock_number": "KIASL24-GTL-086",
  "vin": "KNDJ23AU0R7123486",
  "images": [
    "assets/images/cars/soul/1.jpg",
    "assets/images/cars/soul/2.jpg",
    "assets/images/cars/soul/3.jpg"
  ],
  "features": [
    "Sport Styling",
    "Wireless CarPlay",
    "Heated Seats",
    "Smart Cruise Control"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-10"
},
{
  "id": 87,
  "brand": "Hyundai",
  "model": "Sonata",
  "year": 2024,
  "trim": "SEL Plus",
  "msrp": 34500,
  "price": 32900,
  "engine": "1.6L Turbo",
  "drivetrain": "FWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 27,
  "mpg_hwy": 37,
  "seats": 5,
  "exterior_color": "Ultimate Red",
  "interior_color": "Black Leather",
  "stock_number": "HYSN24-SLP-087",
  "vin": "KMHL44JA0RA456787",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "12.3\" Touchscreen",
    "Heated Seats",
    "Smart Cruise Control",
    "Blind Spot View Monitor"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-09"
},
{
  "id": 88,
  "brand": "Jeep",
  "model": "Patriot",
  "year": 2017,
  "trim": "High Altitude",
  "msrp": 24500,
  "price": 22900,
  "engine": "2.4L I4",
  "drivetrain": "4x4",
  "transmission": "6-Speed Automatic",
  "mpg_city": 20,
  "mpg_hwy": 26,
  "seats": 5,
  "exterior_color": "Bright White",
  "interior_color": "Dark Slate Leather",
  "stock_number": "JPPT17-HAT-088",
  "vin": "1C4NJRFB0HD456788",
  "images": [
       "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Sunroof",
    "Heated Seats",
    "Remote Start",
    "Uconnect"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-08"
},
{
  "id": 89,
  "brand": "BMW",
  "model": "540i",
  "year": 2024,
  "trim": "xDrive",
  "msrp": 62500,
  "price": 60900,
  "engine": "3.0L Turbo I6",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 25,
  "mpg_hwy": 32,
  "seats": 5,
  "exterior_color": "Black Sapphire Metallic",
  "interior_color": "Cognac Leather",
  "stock_number": "BMW540-XDR-089",
  "vin": "WBA53BJ09RFA67889",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Curved Display",
    "Heated & Ventilated Seats",
    "Parking Assistant Plus",
    "Harman Kardon Audio"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-07"
},
{
  "id": 90,
  "brand": "Mercedes-Benz",
  "model": "E 350",
  "year": 2024,
  "trim": "4MATIC",
  "msrp": 62500,
  "price": 60900,
  "engine": "2.0L Turbo I4",
  "drivetrain": "AWD",
  "transmission": "9-Speed Automatic",
  "mpg_city": 24,
  "mpg_hwy": 33,
  "seats": 5,
  "exterior_color": "Graphite Grey",
  "interior_color": "Black Leather",
  "stock_number": "MBE350-4MT-090",
  "vin": "W1KZF4HB0RN345690",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "MBUX System",
    "Heated Seats",
    "Panoramic Roof",
    "Active Brake Assist"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-06"
},
{
  "id": 91,
  "brand": "Toyota",
  "model": "Avalon",
  "year": 2022,
  "trim": "Touring",
  "msrp": 45500,
  "price": 43900,
  "engine": "3.5L V6",
  "drivetrain": "FWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 22,
  "mpg_hwy": 31,
  "seats": 5,
  "exterior_color": "Harbor Gray Metallic",
  "interior_color": "Black Leather",
  "stock_number": "TYAV22-TRN-091",
  "vin": "4T1BZ1FB0NU912345",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Adaptive Suspension",
    "Heated & Ventilated Seats",
    "JBL Audio",
    "Toyota Safety Sense 2.5"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-15"
},
{
  "id": 92,
  "brand": "Honda",
  "model": "Fit",
  "year": 2020,
  "trim": "EX",
  "msrp": 22500,
  "price": 20900,
  "engine": "1.5L I4",
  "drivetrain": "FWD",
  "transmission": "CVT",
  "mpg_city": 33,
  "mpg_hwy": 40,
  "seats": 5,
  "exterior_color": "Aegean Blue Metallic",
  "interior_color": "Black Cloth",
  "stock_number": "HNFT20-EX-092",
  "vin": "3HGGK5H81LM234592",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Honda LaneWatch",
    "Moonroof",
    "Apple CarPlay",
    "Magic Seat"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-14"
},
{
  "id": 93,
  "brand": "Ford",
  "model": "Fusion",
  "year": 2020,
  "trim": "Titanium",
  "msrp": 34500,
  "price": 32900,
  "engine": "2.0L Turbo",
  "drivetrain": "AWD",
  "transmission": "6-Speed Automatic",
  "mpg_city": 21,
  "mpg_hwy": 31,
  "seats": 5,
  "exterior_color": "Magnetic Metallic",
  "interior_color": "Black Leather",
  "stock_number": "FDFU20-TIT-093",
  "vin": "3FA6P0D90LR345693",
  "images": [
       "assets/images/cars/eve6/2.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/3.jpg"
  ],
  "features": [
    "Heated & Ventilated Seats",
    "Ford Co-Pilot360",
    "Sony Audio",
    "Adaptive Cruise Control"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-13"
},
{
  "id": 94,
  "brand": "Chevrolet",
  "model": "Camaro",
  "year": 2023,
  "trim": "SS",
  "msrp": 45500,
  "price": 43900,
  "engine": "6.2L V8",
  "drivetrain": "RWD",
  "transmission": "6-Speed Manual",
  "mpg_city": 16,
  "mpg_hwy": 24,
  "seats": 4,
  "exterior_color": "Red Hot",
  "interior_color": "Black Leather",
  "stock_number": "CHCM23-SS-094",
  "vin": "1G1FF1R79P0123494",
  "images": [
      "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Brembo Brakes",
    "Performance Exhaust",
    "Recaro Seats",
    "Heads-Up Display"
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-12"
},
{
  "id": 95,
  "brand": "Nissan",
  "model": "Maxima",
  "year": 2023,
  "trim": "Platinum",
  "msrp": 44500,
  "price": 42900,
  "engine": "3.5L V6",
  "drivetrain": "FWD",
  "transmission": "CVT",
  "mpg_city": 20,
  "mpg_hwy": 30,
  "seats": 5,
  "exterior_color": "Super Black",
  "interior_color": "Cashmere Leather",
  "stock_number": "NSMX23-PLT-095",
  "vin": "1N4AA6DV0PC345695",
  "images": [
      "assets/images/cars/eve6/2.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/3.jpg"
  ],
  "features": [
    "Heated & Ventilated Seats",
    "Bose Audio",
    "Panoramic Roof",
    "ProPILOT Assist"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-11"
},
{
  "id": 96,
  "brand": "Kia",
  "model": "Stinger",
  "year": 2023,
  "trim": "GT2 AWD",
  "msrp": 55500,
  "price": 53900,
  "engine": "3.3L Twin-Turbo V6",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 17,
  "mpg_hwy": 24,
  "seats": 5,
  "exterior_color": "Micro Blue Pearl",
  "interior_color": "Red Leather",
  "stock_number": "KIAST23-GT2-096",
  "vin": "KNAE55LC0P6123496",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Brembo Brakes",
    "Harman Kardon Audio",
    "Heated & Ventilated Seats",
    "Launch Control"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-10"
},
{
  "id": 97,
  "brand": "Hyundai",
  "model": "Veloster N",
  "year": 2022,
  "trim": "Performance Package",
  "msrp": 35500,
  "price": 33900,
  "engine": "2.0L Turbo",
  "drivetrain": "FWD",
  "transmission": "6-Speed Manual",
  "mpg_city": 22,
  "mpg_hwy": 28,
  "seats": 4,
  "exterior_color": "Performance Blue",
  "interior_color": "Black Cloth",
  "stock_number": "HYVL22-NPP-097",
  "vin": "KMHT36AH0NU456797",
  "images": [
    "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/2.jpg",
    "assets/images/cars/eve6/1.jpg"
  ],
  "features": [
    "N Corner Carving Differential",
    "Sport Exhaust",
    "N Drive Modes",
    "Performance Brakes"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-09"
},
{
  "id": 98,
  "brand": "Jeep",
  "model": "Commander",
  "year": 2022,
  "trim": "Limited",
  "msrp": 44500,
  "price": 42900,
  "engine": "2.0L Turbo",
  "drivetrain": "4x4",
  "transmission": "9-Speed Automatic",
  "mpg_city": 21,
  "mpg_hwy": 29,
  "seats": 7,
  "exterior_color": "Bright White",
  "interior_color": "Black Leather",
  "stock_number": "JPCM22-LTD-098",
  "vin": "1C4PJMDN0ND456798",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg"
  ],
  "features": [
    "Heated Seats",
    "Remote Start",
    "Adaptive Cruise Control",
    "Uconnect 10.1\""
  ],
  "status": "available",
  "location": "Bronx, NY",
  "created_at": "2026-04-08"
},
{
  "id": 99,
  "brand": "BMW",
  "model": "M340i",
  "year": 2024,
  "trim": "xDrive",
  "msrp": 59500,
  "price": 57900,
  "engine": "3.0L Turbo I6",
  "drivetrain": "AWD",
  "transmission": "8-Speed Automatic",
  "mpg_city": 23,
  "mpg_hwy": 32,
  "seats": 5,
  "exterior_color": "Tanzanite Blue II",
  "interior_color": "Black Vernasca Leather",
  "stock_number": "BMWM34-XDR-099",
  "vin": "3MW49FF09R8A67899",
  "images": [
    "assets/images/cars/eve6/1.jpg",
    "assets/images/cars/eve6/2.jpg",
    "assets/images/cars/eve6/3.jpg"
  ],
  "features": [
    "M Sport Differential",
    "Heated Seats",
    "Harman Kardon Audio",
    "Curved Display"
  ],
  "status": "available",
  "location": "Queens, NY",
  "created_at": "2026-04-07"
},
{
  "id": 100,
  "brand": "Mercedes-Benz",
  "model": "S 500",
  "year": 2024,
  "trim": "4MATIC",
  "msrp": 115000,
  "price": 112500,
  "engine": "3.0L Turbo I6 Mild Hybrid",
  "drivetrain": "AWD",
  "transmission": "9-Speed Automatic",
  "mpg_city": 20,
  "mpg_hwy": 28,
  "seats": 5,
  "exterior_color": "Obsidian Black",
  "interior_color": "Sienna Brown Leather",
  "stock_number": "MBS500-4MT-100",
  "vin": "W1K6G6DB0RN345610",
  "images": [
     "assets/images/cars/eve6/3.jpg",
    "assets/images/cars/eve6/2.jpg",
    "assets/images/cars/eve6/1.jpg"
  ],
  "features": [
    "MBUX Hyperscreen",
    "AIRMATIC Suspension",
    "Heated & Ventilated Seats",
    "Burmester 3D Audio"
  ],
  "status": "available",
  "location": "Brooklyn, NY",
  "created_at": "2026-04-06"
}
 ]
};

