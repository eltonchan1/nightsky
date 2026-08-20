document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.bounce');
    const items = Array.from(elements).map((el, i) => {
        const size = 40 + Math.random() * 50;
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        return {
            el: el,
            x: 50 + i * 40,
            y: 50 + i * 40,
            dx:(Math.random() < 0.5 ? 1 : -1) * (0.75 + Math.random() * 1),
            dy:(Math.random() < 0.5 ? 1 : -1) * (0.75 + Math.random() * 1),
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4,
            opacity: Math.random(),
            fadeSpeed: 0.005 + Math.random() * 0.01,
            fadeDirection: Math.random() < 0.5 ? 1 : -1
        }
    });

    function update() {
        items.forEach(item => {
            const maxW = window.innerWidth - item.el.clientWidth;
            const maxH = window.innerHeight - item.el.clientHeight;
            item.x += item.dx;
            item.y += item.dy;
            item.opacity += item.fadeSpeed * item.fadeDirection;
            if (item.x <= 0) {
                item.x = 0;
                item.dx = Math.abs(item.dx);
            } else if (item.x >= maxW) {
                item.x = maxW;
                item.dx = -Math.abs(item.dx);
            }
            if (item.y <= 0) {
                item.y = 0;
                item.dy = Math.abs(item.dy);
            } else if (item.y >= maxH) {
                item.y = maxH;
                item.dy = -Math.abs(item.dy);
            }
            if (item.opacity >= 1) {
                item.opacity = 0;
                item.fadeDirection = 1;
            } else if (item.opacity <= 0) {
                item.opacity = 1;
                item.fadeDirection = -1;
            }
            item.rotation += item.rotationSpeed;
            item.el.style.left = item.x + 'px';
            item.el.style.top = item.y + 'px';
            item.el.style.transform = `rotate(${item.rotation}deg)`;
            item.el.style.opacity = item.opacity;
        });
        requestAnimationFrame(update);
    }
    update();
});
