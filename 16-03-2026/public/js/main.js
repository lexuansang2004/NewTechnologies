function previewImage(event) {

    const img = document.getElementById("preview")

    img.src = URL.createObjectURL(event.target.files[0])

    img.classList.remove("hidden")

}

function confirmDelete(id) {

    if (confirm("Delete this product?")) {

        window.location = "/delete/" + id + "?msg=deleted"

    }

}

function showToast(message) {

    const toast = document.getElementById("toast")

    toast.innerText = message

    toast.classList.remove("hidden")

    setTimeout(() => {
        toast.classList.add("hidden")
    }, 2500)

}


/* =============================
SEARCH
============================= */

const search = document.getElementById("searchInput")

if (search) {

    search.addEventListener("keyup", function() {

        const value = this.value.toLowerCase()

        const rows = document.querySelectorAll("#productTable tr")

        rows.forEach(r => {

            r.style.display = r.innerText.toLowerCase().includes(value) ? "" : "none"

        })

    })

}


/* =============================
TOAST FROM URL
============================= */

const params = new URLSearchParams(window.location.search)

const msg = params.get("msg")

if (msg) {

    if (msg === "added") showToast("Product added successfully")

    if (msg === "updated") showToast("Product updated successfully")

    if (msg === "deleted") showToast("Product deleted successfully")

}


/* =============================
THEME TOGGLE
============================= */

function toggleTheme() {

    const body = document.getElementById("body")

    if (body.classList.contains("light")) {

        body.classList.remove("light")
        localStorage.setItem("theme", "dark")

    } else {

        body.classList.add("light")
        localStorage.setItem("theme", "light")

    }

}

window.onload = () => {

    const theme = localStorage.getItem("theme")

    if (theme === "light") {
        document.getElementById("body").classList.add("light")
    }

}


/* =============================
LOAD THEME
============================= */

window.onload = () => {

    const theme = localStorage.getItem("theme")

    if (theme === "light") {

        const body = document.getElementById("body")

        body.classList.add("light")

        body.style.background = "#ffffff"
        body.style.color = "#111"

    }

}