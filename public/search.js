function init(){
    search();
    function search(){
        const btn = document.querySelector(".btn-search");
        btn.addEventListener("click", e =>{
            e.preventDefault();
            const inp = document.querySelector(".inp-txt");
            const main = document.querySelector(".main");

            if(inp.value !== ''){
                searchFetch(inp.value);
                main.innerHTML = '';
            }else{
                
            }
        });
    }


    //função que recupera os dados
    async function searchFetch(txt){
        const data = await fetch("controller/router.php",
        {
            method: 'POST',
            body: JSON.stringify(txt),
            headers: {
                "ContentType" : "application/json",
                'type' : 'search'
            }
        });
    
        const response = await data.json();
        console.log(response);
        setTable(response);
    }

    function setTable(obj){
        
        const main = document.querySelector(".main");
        const section = document.createElement("section");
        section.classList.add('main-section');
        main.appendChild(section);
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = "<th>ID</th><th>NOME</th><th>DESCRIÇÃO</th><th>PREÇO</th>"
        table.appendChild(thead);
        table.classList.add('table');
        section.appendChild(table);
        const arr=[];

        for(let i=0;i<obj.length;i++){
            let tr = document.createElement("tr");
            table.appendChild(tr);

            for(let j=0;j<4;j++){

                arr[0] = obj[i]['id'];
                arr[1] = obj[i]['nome'];
                arr[2] = obj[i]['descricao'];
                arr[3] = obj[i]['preco'];
                //arr[4] = `<button name="update" class="btnA btnC" value="${arr[0]}">Atualizar</button>`;
                //arr[5] = `<button name="delete" class="btnB btnC" value="${arr[0]}">Deletar</button>`;

                let td = document.createElement("td");
                td.innerHTML = arr[j];
                tr.appendChild(td);
            }
        }

    }

};
init();