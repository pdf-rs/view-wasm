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
        wasm_bindgen.show(data);

        document.getElementById("msg").style.visibility = "hidden";
    };
    reader.readAsArrayBuffer(file);
}

document.addEventListener("drop", drop_handler, false);
document.addEventListener("dragover", dragover_handler, false);

