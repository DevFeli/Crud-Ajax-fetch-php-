function init(){
const btnCad = document.querySelector(".btn-form");

btnCad.addEventListener("click", e =>{//form cadastrar
    e.preventDefault();

    const form = new FormData(document.querySelector(".cad"));
    const obj = {
        nome: form.get("nome"),
        descricao: form.get("descricao"),
        preco: form.get("preco")
    }
    insert(obj);
    
})

};

async function insert (obj){
    
    const data = await fetch("controller/router.php",
    {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "ContentType" : "application/json",
            'type' : 'insert'
        }
    });

    const response = await data.json();
    console.log(response);
    const msg = document.querySelector(".msg");
    if(response['Erro'] === false){
        msg.style.background = 'rgba(64, 251, 83, 0.5)';
        msg.innerHTML = "Cadastrado com sucesso!";
        
    }else{
        msg.style.background = 'rgba(220, 34, 34, 0.5)';
        msg.innerHTML = "Erro: Não cadastrado!";
    }
    
}

init();