class StickyNoteView {
    constructor(model) {
        this.model = model;
        this.element = this.createStickyElement();
        this.initSticky();
    }

    // crear nota
    createStickyElement() {
        var newSticky = document.createElement("div");
        const formattedDate = this.formatDate(this.model.creationDate);
        newSticky.classList.add("sticky", "draggable", "editable");

        // Posición inicial de las notas
        newSticky.style.left = "0px";
        newSticky.style.top = "50px";

        newSticky.innerHTML = `
            <h3 contenteditable="true">${this.model.title}</h3>
            <p contenteditable="true">${this.model.text}</p>
            <p class="creation-date">${formattedDate}</p>
            <span class="deletesticky">&times;</span>`;
        return newSticky;
    }

    // da formato a la fecha y hora
    formatDate(date) {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        return date.toLocaleDateString("es-ES", options);
    }

    // acciones que se pueden hacer después de instanciar la nota
    initSticky() {
        this.makeStickyDraggable();
        this.makeStickyEditable();
        this.addDeleteButtonListener();
    }

    // arrastra la nota al clicar con el botón del ratón

     makeStickyDraggable() {
        let isDragging = false;
        let offsetX, offsetY;

        this.element.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - this.element.getBoundingClientRect().left;
            offsetY = e.clientY - this.element.getBoundingClientRect().top;
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;

                this.element.style.left = `${x}px`;
                this.element.style.top = `${y}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    }

    /* makeStickyDraggable() {
        let isDragging = false;
        const note = document.getElementsByClassName("sticky");

        note.addEventListener("click", () => {
            isDragging = !isDragging;
        });

        document.addEventListener("mousemove", (event) => {
            if (isDragging) {
                note.style.left = event.clientX - 20 + "px";
                note.style.top = event.clientY - 20 + "px";
            }

            console.log(event.screenX + event.screenY);
        });
    } */

    // edita la nota pinchando en el contenido
    makeStickyEditable() {
        /* const titleElement = sticky.querySelector('h3');
    const textElement = sticky.querySelector('p'); */
    }

    // crea un botón (x) para eliminar la nota
    addDeleteButtonListener() {
        const deleteButton = this.element.querySelector(".deletesticky");
        deleteButton.addEventListener("click", () => {
            this.deleteSticky();
        });
    }

    // elimina la nota
    deleteSticky() {
        this.element.parentNode.removeChild(this.element);
    }
}
