document.addEventListener('DOMContentLoaded', function () {
    let newTemplate = document.querySelector('#newTemplate');
    let button = newTemplate.querySelector('button');
    let oldTemplate = document.querySelector('#getNewUsers');
    let oldTemplateContent = oldTemplate.content;

    button.onclick = function () {
        newTemplate.attachShadow({mode: 'open'});

        newTemplate.shadowRoot.innerHTML += '<h6>Новый шаблон на основе старого!</h6>' +
            '<slot name="new-template__button">Данные переданные через slot</slot>'
        newTemplate.shadowRoot.append(oldTemplateContent.cloneNode(true));

    };
})