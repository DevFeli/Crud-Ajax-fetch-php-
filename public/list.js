function init(){
    getBtn();
    setUpdate();
    //clickar em update ou delete pega o id que esta em value do btn e chama a funçao para vuscar pelo id
    function getBtn(){

        document.addEventListener("click", e =>{
            let btn = e.target;
            const modal = document.querySelector(".modal");

            if(btn.name === 'update'){
                modal.style.display = 'flex';
                id = Number(btn.value);
                searchById(id);
            }else if(btn.name === 'delete'){
                let del = confirm("Tem certeza que deseja excluir?");
                if(del === true){
                    delet(btn.value);
                    console.log(btn.value);
                }else{
                    console.log("não excluir");
                }
            }
        })
    }
    
    //função excluir
    async function delet(id){
        const data = await fetch("controller/router.php",
        {
            method: 'POST',
            body: id,
            headers: {
                "ContentType" : "application/json",
                'type' : 'delet'
            }
        });
    
        const response = await data.json();
        if(response['Erro'] === false){
            alert("Excluido com sucesso!");
            list();

        }else{
            alert("Erro: Não excluido!");
            list();
        }
    }

    //função que recupera os dados pelo id
    async function searchById (id){ 
        const data = await fetch("controller/router.php",
        {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                "ContentType" : "application/json",
                'type' : 'searchById'
            }
        });
    
        const response = await data.json();
        setModal(response);
    };


    //função que executa o update
    function setUpdate(){
        const btn = document.querySelector(".btn-update");

        btn.addEventListener("click", e =>{
            e.preventDefault();
            const obj = getFormUpdate();
            update(obj);
        });
    }

    //função que envia o form para o router de update
    async function update(obj){
        const modal = document.querySelector(".modal");
        const msg = document.querySelector(".msg-ud");
        const table = document.querySelector(".t-body");

        const data = await fetch("controller/router.php",
        {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "ContentType" : "application/json",
                'type' : 'setUpdate'
            }
        });

        const response = await data.json();

        if(response['Erro'] === false){ 
            console.log(response); 
            msg.style.background = 'rgba(64, 251, 83, 0.5)';
            msg.innerHTML = "Atualizado com sucesso"
            
            list();
            modal.style.display = 'none';
            console.log(response['Erro']);
        }else if(response['Erro'] === true){
            console.log(response); 
            
            msg.style.backgroundColor = 'rgba(220, 34, 34, 0.5)';
            msg.innerHTML = "Erro: Não atualizado";
            list();
            modal.style.display = 'none';
            console.log(response['Erro']);
        }
    };

    //pega os dados do form update
    function getFormUpdate(){
        const form = document.querySelector(".form-modal");
        obj = {
            id: form['id-update'].value,
            nome: form['nome'].value,
            descricao: form['descricao'].value,
            preco: form['preco'].value,
        };
        return obj;
    }


    //funçao para copular o form de update
    function setModal(data){
        const form = document.querySelector(".form-modal");
        form['nome'].value = data[0]['nome'];
        form['descricao'].value = data[0]['descricao'];
        form['preco'].value = data[0]['preco'];
        form['id-update'].value = data[0]['id'];
    };
    
    
    //função que lista todos registros no bd
    async function list (){
    
        const data = await fetch("controller/router.php",
        {
            method: 'GET',
            headers: {
                "ContentType" : "application/json",
                'type' : 'list'
            }
        });
    
        const response = await data.json();
        setTable(response);
    };


    //função que insere todos registros do listar na tabela
    function setTable(obj){
        const tBody = document.querySelector(".t-body"); 
        const arr=[];
        tBody.innerHTML ='';
        for(let i=0;i<obj.length;i++){
            let tr = document.createElement("tr");
            tBody.appendChild(tr);

            for(let j=0;j<6;j++){

                arr[0] = obj[i]['id'];
                arr[1] = obj[i]['nome'];
                arr[2] = obj[i]['descricao'];
                arr[3] = obj[i]['preco'];
                arr[4] = `<button name="update" class="btnA btnC" value="${arr[0]}">Atualizar</button>`;
                arr[5] = `<button name="delete" class="btnB btnC" value="${arr[0]}">Deletar</button>`;

                let td = document.createElement("td");
                td.innerHTML = arr[j];
                tr.appendChild(td);
            }
        }

    }
    list();
};
init();