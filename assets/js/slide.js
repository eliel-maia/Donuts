// Inicializa ao carregar o DOM: encapsula todas as operações do slider
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do DOM e define variáveis de controle
    const slides = document.querySelectorAll('.slider .items li');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoInterval = null;
    const AUTO_DELAY = 5000;

    // Mostra o slide indicado pelo índice.
    // Esconde os outros slides e marca o slide atual com a classe .active.
    function showSlide(index) {
        if (!slides.length) return;
        currentIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            slide.style.display = i === currentIndex ? 'block' : 'none';
            slide.classList.toggle('active', i === currentIndex);
        });
        
    }

    // Funções de navegação: avançar e retroceder um slide
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Controle do autoplay: iniciar, parar e reiniciar o temporizador
    function startAuto() {
        stopAuto();
        autoInterval = setInterval(() => nextSlide(), AUTO_DELAY);
    }
    function stopAuto() {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }
    function resetAuto() {
        startAuto();
    }

    // Clique nas bolinhas: mostra o slide correspondente e remove o foco
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const idx = Number(dot.dataset.slide);
            if (!Number.isNaN(idx)) {
                showSlide(idx);
                resetAuto();
                // remove foco para evitar outline/estado visual de seleção
                dot.blur();
            }
        });
    });

    // Inicializa exibindo o slide inicial e ligando o autoplay
    showSlide(currentIndex);
    startAuto();

    // Pausa o autoplay enquanto o mouse está sobre as bolinhas (melhora usabilidade)
    dots.forEach(dot => {
        dot.addEventListener('mouseenter', stopAuto);
        dot.addEventListener('mouseleave', startAuto);
        // não usamos focus/blur para controle de autoplay porque removemos foco ao clicar
    });
});


