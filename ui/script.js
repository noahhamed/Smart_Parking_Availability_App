function updateCounts() {
    const spots = document.querySelectorAll(".spot");
    const total = spots.length;
    const occupied = document.querySelectorAll(".spot.occupied").length;
    const available = total - occupied;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("occupiedCount").textContent = occupied;
    document.getElementById("availableCount").textContent = available;

    // Nearest available = lowest ID that is green
    let nearest = null;
    document.querySelectorAll(".spot.available").forEach((btn) => {
        const id = Number(btn.dataset.spotId);
        if (!Number.isFinite(id)) return;
        if (nearest === null || id < nearest) nearest = id;
    });

    const nearestEl = document.getElementById("nearestSpot");
    if (nearestEl) {
        nearestEl.textContent = nearest === null ? "None" : `Spot ${nearest}`;
    }

    const now = new Date();
    const timeStr = now.toLocaleString();
    const last = document.getElementById("lastUpdated");
    if (last) last.textContent = `Last updated: ${timeStr}`;
}
const STORAGE_KEY = "smartParkingSpots";

function saveState() {
    const spots = Array.from(document.querySelectorAll(".spot")).map((btn) => ({
        id: Number(btn.dataset.spotId),
        occupied: btn.classList.contains("occupied"),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(spots));
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const saved = JSON.parse(raw);
    saved.forEach((s) => {
        const btn = document.querySelector(`.spot[data-spot-id="${s.id}"]`);
        if (!btn) return;

        btn.classList.toggle("occupied", s.occupied);
        btn.classList.toggle("available", !s.occupied);
    });
}

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".spot");
    if (!btn) return;

    // toggle availability
    btn.classList.toggle("occupied");
    btn.classList.toggle("available");

    updateCounts();
    saveState();
});
document.getElementById("resetBtn")?.addEventListener("click", () => {
    const spots = document.querySelectorAll(".spot");
    spots.forEach((s) => {
        s.classList.remove("occupied");
        s.classList.add("available");
    });
    localStorage.removeItem(STORAGE_KEY);

    // make a couple occupied again as a demo default
    const s2 = document.querySelector('.spot[data-spot-id="2"]');
    const s6 = document.querySelector('.spot[data-spot-id="6"]');
    [s2, s6].forEach((s) => {
        if (!s) return;
        s.classList.remove("available");
        s.classList.add("occupied");
    });

    updateCounts();
    saveState();
});

