const btn = document.querySelector('button');
const input = document.querySelector('input');
btn.addEventListener('click', () => {
    window.dispatchToE('xxx', input.value);
});
