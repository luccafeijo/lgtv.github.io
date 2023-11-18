animacaoTitulo();



function animacaoTitulo(){

    let delay = 200;
    
    let h1 = document.getElementById("wave_animated");

        // console.log(h1.innerHTML.split(""));
        text = h1.innerHTML;
        h1.innerHTML = text
        .split("")
        .map(letter => {
            console.log(letter);
            return `<span>` + letter + `</span>`;
        })
        .join("");

        Array.from(h1.children).forEach((span, index) => {
        setTimeout(() => {
            span.classList.add("wavy");
        }, index * 60 + delay);
        });
    
}