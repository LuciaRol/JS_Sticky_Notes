window.onload = () => {
    // declaración de variables
    const stickyContainer = document.getElementById("stickies-container");
    const createStickyButton = document.getElementById("create");
    const stickyTitleInput = document.getElementById("stickytitle");
    const stickyTextInput = document.getElementById("stickytext");

    // al hacer click se crea una nota y se puede rellenar
    createStickyButton.addEventListener("click", () => {
        const title = stickyTitleInput.value;
        const text = stickyTextInput.value;

        // alerta si no se introduce texto
        if (title.trim() === "" && text.trim() === "") {
            alert("No se ha introducido ningún texto.");
            return;
        }

        const stickyModel = new StickyNoteModel(title, text);
        const stickyView = new StickyNoteView(stickyModel);

        stickyContainer.appendChild(stickyView.element);

        stickyTitleInput.value = "";
        stickyTextInput.value = "";
    });
};
