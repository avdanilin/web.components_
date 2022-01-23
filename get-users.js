class GetUsers extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.wrapper = document.createElement('div');
        this.list = document.createElement('ul');
        this.button = document.createElement('button');
        this.url = 'https://jsonplaceholder.typicode.com/comments?postId=1';

        this.wrapper.classList.add('users');
        this.list.classList.add('users__list');
        this.button.type = 'button';
        this.button.textContent = 'Получить список';

        this.wrapper.appendChild(this.list);
        this.shadow.appendChild(this.wrapper);
        this.shadow.appendChild(this.button);

        this.init();
    }

    init() {
        let that = this;

        this.button.addEventListener('click', function () {
            that.createStyles();
            that.appendUsers();
        });
    }

    createStyles() {
        let style = document.createElement('style');

        style.textContent = `
            .users__item {
                margin-bottom: 30px;
            }
            
            .users__description {
                margin-bottom: 0;
            }
            
            .users__title {
              margin-top: 0;
              margin-bottom: 10px;
              font-size: 20px;              
            }
            
            .users__list {
              display: block;
            }`;


        this.shadow.appendChild(style);
    }

    async getJson(url) {
        return await fetch(url)
            .then(response => {
                return response.json();
            })
            .then(result => {
                return result.map(item => {
                    return {
                        name: item.email,
                        description: item.body
                    }
                });
            });
    }

    async appendUsers() {
        let users = await this.getJson(this.url);

        users.map(user => {
            let listItem = document.createElement('li');
            let title = document.createElement('h6');
            let description = document.createElement('p');

            title.classList.add('users__title');
            listItem.classList.add('users__item');
            description.classList.add('users__description');

            title.textContent = `${ user.name }`;
            description.textContent = `${ user.description }`;

            listItem.appendChild(title);
            listItem.appendChild(description);

            this.list.appendChild(listItem);
        });
    }
}

window.customElements.define('get-users', GetUsers)