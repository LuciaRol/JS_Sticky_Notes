// clase para el modelo de la nota: contiene un título, el texto y momento de creación
class StickyNoteModel {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.creationDate = new Date();
    }

    toJSON() {
        return {
            title: this.title,
            text: this.text,
            creationDate: this.creationDate.toJSON()
        };
    }
}

