class Question {

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    render() {
        const docTitle = document.createElement('h1');
        docTitle.innerHTML = this.title;
    }
}

module.exports = Question;