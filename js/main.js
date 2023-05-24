const contentBox = document.getElementById("content");
const copyButton = document.getElementById("copy-button");

const keys = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

function encryptText(text) {
    for (let key of keys) {
        const regexp = new RegExp(key[0], "g");
        text = text.replace(regexp, key[1]);
    }

    return text;
}

function decryptText(text) {
    for (let key of keys) {
        const regexp = new RegExp(key[1], "g");
        text = text.replace(regexp, key[0]);
    }

    return text;
}

function setResultMessage(msg) {
    const resultElement = document.getElementById("result");
    const initialMsgElement = document.getElementById("initial-message");

    initialMsgElement.classList.remove("visible");
    resultElement.innerText = msg;
}

function getContentBoxValue() {
    return contentBox.value.toLowerCase();
}

function getResultText() {
    const resultElement = document.getElementById("result");
    return resultElement.innerText;
}

contentBox.oninput = function () {
    const regex = /[^a-z!?.,\-+\(\)\[\]\{\}\s]/g;
    this.value = this.value.toLowerCase().replace(regex, "");
};

copyButton.onclick = function () {
    if (typeof navigator.clipboard.write === "undefined") {
        alert("Seu navegador não suporta a função de copiar.");
        return;
    }

    const text = getResultText();

    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard
        .write(data)
        .then(() => alert("Copiado com sucesso!"))
        .catch((e) => {
            alert("Algo deu errado ao tentar copiar. Verifique o console.");
            console.error(e);
        });
};

document.getElementById("encrypt-btn").onclick = function () {
    setResultMessage(encryptText(getContentBoxValue()));
};

document.getElementById("decrypt-btn").onclick = function () {
    setResultMessage(decryptText(getContentBoxValue()));
};
