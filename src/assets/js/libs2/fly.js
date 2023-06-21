var bg = document.querySelector('.fly');
window.addEventListener('mousemove', function (e) {
    var x = e.clientX / window.innerWidth;
    var y = e.clientY / window.innerHeight;
    bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
});

var bg = document.querySelector('.fly');
