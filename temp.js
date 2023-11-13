window.onload = () => {
    // declaración variables
    const stickyContainer = document.getElementById("stickies-container");
    const createStickyButton = document.getElementById("create");
    const stickyTitleInput = document.getElementById("stickytitle");
    const stickyTextInput = document.getElementById("stickytext");

    // crea una nota al hacer click en el botón
    createStickyButton.addEventListener("click", () => {
        const title = stickyTitleInput.value;
        const text = stickyTextInput.value;

        //alerta si no se introduce texto
        if (title.trim() === "" && text.trim() === "") {
            alert("No se ha introducido ningún texto.");
            return;
        }

        new StickyNote(stickyContainer, title, text);

        // limpia los campos
        stickyTitleInput.value = "";
        stickyTextInput.value = "";
    });
};

// clase Sticky Note
class StickyNote {
    constructor(container, title, text) {
        this.container = container;
        this.title = title;
        this.text = text;
        this.element = this.createStickyElement();
        this.initSticky();
    }

    // crear nota
    createStickyElement() {
        const newSticky = document.createElement("div");
        newSticky.classList.add("sticky", "draggable", "editable");

        // Posición inicial de las notas
        newSticky.style.left = "0px";
        newSticky.style.top = "50px";

        newSticky.innerHTML = `
      <h3 contenteditable="true">${this.title}</h3>
      <p contenteditable="true">${this.text}</p>
      <span class="deletesticky">&times;</span>
    `;
        return newSticky;
    }

    // acciones que se pueden hacer después de instanciar la nota
    initSticky() {
        this.container.appendChild(this.element);
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
            const boundingRect = this.container.getBoundingClientRect();
            offsetX = e.clientX - boundingRect.left;
            offsetY = e.clientY - boundingRect.top;
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                this.element.style.left = e.clientX - offsetX + "px";
                this.element.style.top = e.clientY - offsetY + "px";
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    }

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
        this.container.removeChild(this.element);
    }
}
