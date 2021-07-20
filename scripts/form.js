class Form {
    constructor() {
        this.form = document.getElementById('verif-form');
        this.parent = document.querySelectorAll('.group-elt-form');
        this.error = document.querySelectorAll('.invalid-feedback');
        this.input = document.querySelectorAll('.form-control');
        this.pwd1 = document.getElementById('input-pwd-1');
        this.pwd2 = document.getElementById('input-pwd-2');
        this.email = document.getElementById('input-email');
        this.cgu = document.getElementById('input-cgu');
        this.count = 0;
    }

    submitForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            //Suppression des champs d'erreurs
            this.parent.forEach(item => {
                this.removeErrorBlock(item);
            });
            //Contrôle des champs vides
            this.input.forEach(item => {
                this.checkInputEmpty(item);
            });
            //Contrôles divers
            this.checkCharMinInput('input-firstname');
            this.checkPassword();
            this.checkEmail();
            this.checkCgu();
            //Redirection
            this.redirectPage('form-validated.html');
        });
    }

    redirectPage(file) {
        if (this.count === 0) {
            const url = `${window.location.protocol}//${window.location.host}/${window.location.pathname}`;
            let pathArr = url.split(/\//);
            let path = '';
            for (let i = 0; i < pathArr.length - 1; i++) {
                if (i === 0) {
                    path += pathArr[i];
                }
                else if (pathArr[i] === '') {
                    path += '/';
                }
                else {
                    path += `${pathArr[i]}/`;
                }
            }
            document.location.href = `${path}${file}`;
        }
    }

    checkInputEmpty(item) {
        if (item.value === '') {
            this.count += 1;
            let div = this.createErrorBlock('champ non rempli');
            item.insertAdjacentElement('afterend', div);
        }
    }

    checkCharMinInput(id) {
        let inputElt = document.getElementById(id);
        if (!inputElt.value.match(/^.{3,}$/)) {
            this.count += 1;
            let div = this.createErrorBlock('3 caractères minimum');
            inputElt.insertAdjacentElement('afterend', div);
        }
    }

    checkPassword() {
        if (!this.pwd1.value.match(/^.{6,}$/)) {
            this.count += 1;
            let div = this.createErrorBlock('6 caractères minimum');
            this.pwd1.insertAdjacentElement('afterend', div);
        }
        if (!this.pwd2.value.match(/^.{6,}$/)) {
            this.count += 1;
            let div = this.createErrorBlock('6 caractères minimum');
            this.pwd2.insertAdjacentElement('afterend', div);
        }
        if (this.pwd1.value !== this.pwd2.value) {
            this.count += 1;
            let msg = 'les 2 champs du mot de passe doivent être similaires';
            let div1 = this.createErrorBlock(msg);
            let div2 = this.createErrorBlock(msg);
            this.pwd1.insertAdjacentElement('afterend', div1);
            this.pwd2.insertAdjacentElement('afterend', div2);
        }
    }

    checkEmail() {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.email.value.match(pattern)) {
            this.count += 1;
            let div = this.createErrorBlock('mauvaise syntaxe de l\'email');
            this.email.insertAdjacentElement('afterend', div);
        }
    }

    checkCgu() {
        if (!this.cgu.checked) {
            this.count += 1;
            let div = this.createErrorBlock('champ des CGU non coché');
            this.cgu.insertAdjacentElement('afterend', div);
        }
    }

    createErrorBlock(msg) {
        let div = document.createElement("div");
        div.className = 'invalid-feedback d-block';
        div.innerText = msg;
        return div;
    }

    removeErrorBlock(parent) {
        let error = parent.querySelectorAll('.invalid-feedback');
        error.forEach(item => {
            parent.removeChild(item);
        });
        this.count += 0;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = new Form();
    form.submitForm();
});