const doc = document;

const todosInputs = doc.querySelectorAll('input');

todosInputs.forEach(input => {
    input.addEventListener('input', e => {
        console.log(e.target.value);
    });
});

const $form = doc.querySelector('.contact-form');
const $inputs = doc.querySelectorAll('.contact-form [required]');

$inputs.forEach(input => {
    const $span = doc.createElement('span');
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add('contact-form-error', 'none');
    input.insertAdjacentElement("afterend", $span);
});

doc.addEventListener('keyup', e => {
    if (e.target.matches('.contact-form [required]')) {
        let $input = e.target;
        let pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== "") {
            let regex = new RegExp(pattern);
            return !regex.exec($input.value)
                ? doc.getElementById($input.name).classList.add('is-active')
                : doc.getElementById($input.name).classList.remove('is-active');
        }

        if (!pattern) {
            return $input.value === ""
                ? doc.getElementById($input.name).classList.add('is-active')
                : doc.getElementById($input.name).classList.remove('is-active');
        }
    }
});

doc.addEventListener('submit', e => {
    //e.preventDefault();

    const $loader = doc.querySelector(".contact-form-loader");
    const $response = doc.querySelector(".contact-form-response");

    $loader.classList.remove("none");

    setTimeout(() => {
        $loader.classList.add("none");
        $response.classList.remove("none");
        $form.reset();

        setTimeout(() => $response.classList.add("none"), 3000);
    }, 3000);
});

