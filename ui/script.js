function updateCounts() {
    const spots = document.querySelectorAll(".spot");
    const total = spots.length;
    const occupied = document.querySelectorAll(".spot.occupied").length;
    const available = total - occupied;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("occupiedCount").textContent = occupied;
    document.getElementById("availableCount").textContent = available;

    const now = new Date();
    const timeStr = now.toLocaleString();
    const last = document.getElementById("lastUpdated");
    if (last) last.textContent = `Last updated: ${timeStr}`;
}

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".spot");
    if (!btn) return;

    // toggle classes
    if (btn.classList.contains("occupied")) {
        btn.classList.remove("occupied");
        btn.classList.add("available");
    } else {
        btn.classList.remove("available");
        btn.classList.add("occupied");
    }

    updateCounts();
});
document.getElementById("resetBtn")?.addEventListener("click", () => {
    const spots = document.querySelectorAll(".spot");
    spots.forEach((s) => {
        s.classList.remove("occupied");
        s.classList.add("available");
    });

    // make a couple occupied again as a demo default
    const s2 = document.querySelector('.spot[data-spot-id="2"]');
    const s6 = document.querySelector('.spot[data-spot-id="6"]');
    [s2, s6].forEach((s) => {
        if (!s) return;
        s.classList.remove("available");
        s.classList.add("occupied");
    });

    updateCounts();
});
// nearest available = lowest spot number that is green
let nearest = null;
document.querySelectorAll(".spot").forEach((btn) => {
    if (!btn.classList.contains("available")) return;
    const id = Number(btn.dataset.spotId);
    if (nearest === null || id < nearest) nearest = id;
});

const nearestEl = document.getElementById("nearestSpot");
if (nearestEl) {
    nearestEl.textContent = nearest === null ? "None" : `Spot ${nearest}`;
}
updateCounts();
