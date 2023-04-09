// obtém a tabela e o formulário
const tabela = document.getElementById("tabelaCompras");
const formulario = document.querySelector("form");

// inicializa a lista de compras com os dados do localStorage ou um array vazio
let listaCompras = JSON.parse(localStorage.getItem("listaCompras")) || [];

// função para adicionar um item na lista de compras
function adicionarItem() {
	// obtém os valores dos campos do formulário
	const item = document.getElementById("item").value;
	const quantidade = document.getElementById("quantidade").value;
	const medida = document.getElementById("medida").value;
	
	// adiciona um objeto com os valores na lista de compras
	listaCompras.push({item, quantidade, medida});
	
	// atualiza a tabela com os dados da lista de compras
	atualizarTabela();
	
	// limpa os campos do formulário
	formulario.reset();
	
	// salva a lista de compras no localStorage
	localStorage.setItem("listaCompras", JSON.stringify(listaCompras));
}

// função para remover um item da lista de compras
function removerItem(index) {
	// remove o item da lista de compras pelo índice
	listaCompras.splice(index, 1);
	
	// atualiza a tabela com os dados da lista de compras
	atualizarTabela();
	
	// salva a lista de compras no localStorage
	localStorage.setItem("listaCompras", JSON.stringify(listaCompras));
}

function atualizarTabela() {
  const tabela = document.getElementById("tabela-compras");
  if (!tabela) {
    console.error("Tabela não encontrada.");
    return;
  }

  // Limpa a tabela antes de atualizá-la
  while (tabela.rows.length > 1) {
    tabela.deleteRow(-1);
  }

  // ordena a lista de compras em ordem alfabética pelo nome do item
  listaCompras.sort((a, b) => a.item.localeCompare(b.item));

  // adiciona cada item da lista de compras na tabela
  listaCompras.forEach((item, index) => {
    const row = tabela.insertRow();
    const cellItem = row.insertCell(0);
    const cellQuantidade = row.insertCell(1);
    const cellMedida = row.insertCell(2);
    const cellRemover = row.insertCell(3);

    cellItem.innerHTML = item.item;
    cellItem.style.textTransform = "uppercase";
    cellQuantidade.innerHTML = item.quantidade;
    cellMedida.innerHTML = item.medida;

    // adiciona um botão "Remover" que chama a função removerItem com o índice do item
    const btnRemover = document.createElement("button");
    btnRemover.innerHTML = "Remover";
    btnRemover.classList.add("text-red-500"); // adiciona a classe "text-red-500"
    btnRemover.addEventListener("click", () => removerItem(index));
    cellRemover.appendChild(btnRemover);

    // adiciona as classes CSS nas células da tabela
    row.classList.add("border", "border-gray-400");
    cellItem.classList.add("px-4", "py-2", "border-l");
    cellQuantidade.classList.add("px-4", "py-2");
    cellMedida.classList.add("px-4", "py-2");
    cellRemover.classList.add("px-4", "py-2", "border-r");
    if (index % 2 === 0) {
      row.classList.add("bg-gray-100");
    }
  });
}

function limparLista() {
  localStorage.removeItem("listaCompras");
  listaCompras = [];
  atualizarTabela();
}

// Adiciona um event listener para o botão de limpar lista
const btnLimpar = document.getElementById("btn-limpar");
btnLimpar.addEventListener("click", limparLista);


// adiciona um evento ao formulário para chamar a função adicionarItem ao enviar o formulário
formulario.addEventListener("submit", (event) => {
	event.preventDefault();
	adicionarItem();
});

// carrega a tabela com os dados da lista de compras ao carregar a página
window.addEventListener("load", atualizarTabela);
