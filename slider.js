const fases = [
    "Estimulação elétrica",
    "Contração dos átrios (sístole atrial)",
    "Atraso no nódulo atrioventricular (AV)",
    "Contração dos ventrículos (sístole ventricular)",
    "Atraso no nódulo atrioventricular (AV)",
];

var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: "#btn-next",
        prevEl: "#btn-prev",
    },
    on: {
        init: function () {
            document.querySelector(".fase").textContent = fases[0];
        },
        slideChange: function () {
            document.querySelector(".fase").textContent = fases[this.activeIndex];
        }
    }
});