// ===== Data de lugares =====
const lugares = {
  1: {
    id: 1,
    nombre: "Polideportivo Vispe",
    ubicacion: "Lima, Perú",
    precio: 80,
    imagen: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop",
    descripcion: "Amplio polideportivo techado con canchas de fútbol, vóley y básquet. Ideal para partidos entre amigos o torneos. Estacionamiento gratuito y vestuarios disponibles.",
    horarios: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]
  },
  2: {
    id: 2,
    nombre: "Cancha la 10",
    ubicacion: "Lima, Perú",
    precio: 100,
    imagen: "https://images.unsplash.com/photo-1622163642992-caaa1f1f6e1e?w=800&h=500&fit=crop",
    descripcion: "Cancha de tenis profesional con iluminación nocturna. Superficie de césped sintético de alta calidad. Perfecta para entrenamiento o partidos amistosos.",
    horarios: ["07:00", "08:00", "09:00", "10:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
  },
  3: {
    id: 3,
    nombre: "La caleta Deporcenter",
    ubicacion: "Lima, Perú",
    precio: 120,
    imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
    descripcion: "Centro deportivo moderno con múltiples canchas de fútbol 7 y 11. Incluye zona de gradas, cafetería y tienda de deportes. Reserva anticipada recomendada.",
    horarios: ["08:00", "09:00", "10:00", "11:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]
  },
  4: {
    id: 4,
    nombre: "Campo Deportivo Norte",
    ubicacion: "Lima, Perú",
    precio: 90,
    imagen: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
    descripcion: "Campo de fútbol al aire libre con césped natural. Ideal para partidos de fin de semana. Baños y duchas disponibles. Ambiente familiar y seguro.",
    horarios: ["07:00", "08:00", "09:00", "10:00", "11:00", "15:00", "16:00", "17:00", "18:00"]
  }
};

// ===== DOM Elements =====
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const loginModal = document.getElementById("loginModal");
const detailModal = document.getElementById("detailModal");
const closeLogin = document.getElementById("closeLogin");
const closeDetail = document.getElementById("closeDetail");
const searchForm = document.getElementById("searchForm");
const loginForm = document.getElementById("loginForm");
const detailContent = document.getElementById("detailContent");

// ===== Mobile Menu =====
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Cerrar menú al hacer click en un link
nav.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// ===== Login Modal =====
document.querySelectorAll(".login-btn, a[href='#login']").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.classList.add("open");
    nav.classList.remove("open");
  });
});

closeLogin.addEventListener("click", () => {
  loginModal.classList.remove("open");
});

loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove("open");
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  alert(`¡Bienvenido! Sesión iniciada como ${email}`);
  loginModal.classList.remove("open");
  loginForm.reset();
});

// ===== Detalle de lugar =====
document.querySelectorAll(".card-link, .card").forEach(el => {
  el.addEventListener("click", (e) => {
    // Evitar doble disparo si se clickea el link dentro de la card
    if (el.classList.contains("card") && e.target.closest(".card-link")) return;

    const id = el.dataset.id || el.querySelector(".card-link")?.dataset.id;
    if (!id || !lugares[id]) return;

    e.preventDefault();
    mostrarDetalle(lugares[id]);
  });
});

function mostrarDetalle(lugar) {
  const slotsHtml = lugar.horarios.map((h, i) => {
    // Algunos horarios "ocupados" para demo
    const disabled = i % 4 === 2 ? "disabled" : "";
    return `<div class="slot ${disabled}" data-hora="${h}">${h}</div>`;
  }).join("");

  detailContent.innerHTML = `
    <img src="${lugar.imagen}" alt="${lugar.nombre}" class="detail-image">
    <h2>${lugar.nombre}</h2>
    <div class="detail-meta">
      <span>📍 ${lugar.ubicacion}</span>
    </div>
    <p class="detail-price">Desde ${lugar.precio} soles / hora</p>
    <p class="detail-desc">${lugar.descripcion}</p>
    <h3 style="font-size:1rem; margin-bottom:12px;">Horarios disponibles</h3>
    <div class="slots-grid" id="slotsGrid">
      ${slotsHtml}
    </div>
    <button class="btn-primary" id="btnReservar" disabled>Selecciona un horario</button>
  `;

  detailModal.classList.add("open");

  // Selección de horarios
  let selectedSlot = null;
  const btnReservar = document.getElementById("btnReservar");

  document.querySelectorAll("#slotsGrid .slot:not(.disabled)").forEach(slot => {
    slot.addEventListener("click", () => {
      document.querySelectorAll("#slotsGrid .slot").forEach(s => s.classList.remove("selected"));
      slot.classList.add("selected");
      selectedSlot = slot.dataset.hora;
      btnReservar.disabled = false;
      btnReservar.textContent = `Reservar a las ${selectedSlot} — ${lugar.precio} soles`;
    });
  });

  btnReservar.addEventListener("click", () => {
    if (!selectedSlot) return;
    alert(`¡Reserva confirmada!\n\n${lugar.nombre}\nHorario: ${selectedSlot}\nPrecio: ${lugar.precio} soles\n\nTe enviamos los detalles a tu correo.`);
    detailModal.classList.remove("open");

    // Actualizar sección Mis reservas (demo)
    const empty = document.getElementById("emptyReservas");
    const list = document.getElementById("reservasList");
    empty.hidden = true;
    list.hidden = false;
    list.innerHTML = `
      <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; max-width:400px;">
        <strong>${lugar.nombre}</strong><br>
        <span style="color:#718096; font-size:0.9rem;">Hoy · ${selectedSlot} · ${lugar.precio} soles</span>
      </div>
    `;
  });
}

closeDetail.addEventListener("click", () => {
  detailModal.classList.remove("open");
});

detailModal.addEventListener("click", (e) => {
  if (e.target === detailModal) {
    detailModal.classList.remove("open");
  }
});

// ===== Búsqueda =====
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.getElementById("location").value;
  const date = document.getElementById("date").value;
  const people = document.getElementById("people").value;

  // Scroll a resultados
  document.getElementById("buscar").scrollIntoView({ behavior: "smooth" });

  // Feedback visual simple
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.opacity = "0.4";
    setTimeout(() => {
      card.style.opacity = "1";
    }, 400);
  });

  // Mensaje temporal
  const title = document.querySelector(".featured .section-title");
  const original = title.textContent;
  title.textContent = `Resultados para "${location || "Lima"}" · ${date || "cualquier fecha"}`;
  setTimeout(() => {
    title.textContent = original;
  }, 3000);
});

// ===== Fecha mínima = hoy =====
const dateInput = document.getElementById("date");
if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;
  dateInput.value = today;
}

// ===== Smooth scroll para links internos =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target && this.getAttribute("href") !== "#login") {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
