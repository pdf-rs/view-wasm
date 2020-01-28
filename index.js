wasm_bindgen("pkg/pdf_view_bg.wasm").catch(console.error)
.then(function() {
    document.getElementById("msg").innerHTML = "Drop a PDF here";
});
function drop_handler(e) {
    e.stopPropagation();
    e.preventDefault();
    show(e.dataTransfer.files[0]);
}
function dragover_handler(e) {
    e.stopPropagation();
    e.preventDefault();
}

function show(file) {
    let reader = new FileReader();
    reader.onload = function() {
        let data = new Uint8Array(reader.result);
        try {
            wasm_bindgen.show(data)
        } catch {
            document.getElementById("msg").innerHTML = "oops. try another one.";
            return;
        }

        document.getElementById("drop").style.display = "none";
    };
    reader.readAsArrayBuffer(file);
}

document.addEventListener("drop", drop_handler, false);
document.addEventListener("dragover", dragover_handler, false);

