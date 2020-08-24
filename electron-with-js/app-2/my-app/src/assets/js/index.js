const btn = document.querySelector('button');
const el = document.querySelector('.my-text');
btn.addEventListener('click', () => {
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
});
