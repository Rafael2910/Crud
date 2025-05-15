// Seleciona o botão "Cadastrar Tarefa"
const btn = document.getElementById('btnMostrarFormulario');

// Seleciona a caixa de formulário que está oculta inicialmente
const formBox = document.getElementById('formBox');

// Seleciona o formulário dentro da caixa
const form = formBox.querySelector('form');

// Cria um contêiner onde as tarefas serão exibidas e adiciona ao final do <body>
const tarefaContainer = document.createElement('div');
document.body.appendChild(tarefaContainer);

// Quando o botão "Cadastrar Tarefa" for clicado, exibe o formulário
btn.addEventListener('click', () => {
  formBox.style.display = 'block';
});

// Evento de envio do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o recarregamento da página

  // Coleta e limpa os valores dos campos do formulário
  const titulo = form.titulo.value.trim();
  const dataInicio = form.querySelectorAll('input[type="date"]')[0].value;
  const dataFim = form.querySelectorAll('input[type="date"]')[1].value;
  const custo = form.responsavel.value.trim();
  const status = form.status.value;

  // Valida se todos os campos foram preenchidos
  if (!titulo  || !dataInicio || !dataFim || !custo || !status) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  
  // Verifica se a data de início é maior que a de conclusão
  if (new Date(dataInicio) > new Date(dataFim)) {
    alert("A data de início não pode ser maior que a data de conclusão.");
    return;
  }

  // Cria a nova tarefa e adiciona ao container
  const novaTarefa = criarTarefa(titulo, dataInicio, dataFim, custo, status);
  tarefaContainer.appendChild(novaTarefa);

  // Limpa o formulário e o esconde
  form.reset();
  formBox.style.display = 'none';
});

// Função que cria o componente visual de uma tarefa
function criarTarefa(titulo, dataInicio, dataFim, custo, status) {
  const tarefa = document.createElement('div');
  tarefa.className = 'tarefa';

  // Renderiza a tarefa com título, botão de editar e os detalhes
  function renderTarefa() {
    tarefa.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <span><strong>${titulo}</strong></span>
        <i class="fas fa-pencil-alt" style="cursor:pointer;"></i>
      </div>
      <div class="detalhes">
        <p><b>Início:</b> ${dataInicio}</p>
        <p><b>Conclusão:</b> ${dataFim}</p>
        <p><b>Custo:</b> R$ ${parseFloat(custo).toFixed(2)}</p>
        <p><b>Status:</b> ${status.replace("_", " ")}</p>
      </div>
    `;

    // Ação ao clicar no ícone de editar (lápis)
    const editarIcone = tarefa.querySelector('i');
    editarIcone.addEventListener('click', () => {
      // Se o modo de edição já estiver aberto, fecha
      if (tarefa.querySelector('.edicao')) {
        tarefa.querySelector('.edicao').remove();
        return;
      }
      
      // Cria a área de edição da tarefa
      const edicao = document.createElement('div');
      edicao.className = 'edicao';
      edicao.innerHTML = `
        <p><b>Nome da Tarefa:</b> <input type="text" value="${titulo}"maxlength="30"></p>
        <p><b>Início:</b> <input type="date" value="${dataInicio}"></p>
        <p><b>Conclusão:</b> <input type="date" value="${dataFim}"></p>
        <p><b>Custo:</b> <input type="number" value="${custo}"></p>
        <p><b>Status:</b> 
          <select>
            <option value="pendente" ${status === "pendente" ? "selected" : ""}>Pendente</option>
            <option value="em_andamento" ${status === "em_andamento" ? "selected" : ""}>Em Andamento</option>
            <option value="concluida" ${status === "concluida" ? "selected" : ""}>Concluída</option>
          </select>
        </p>
        <div class="botoes">
      <button class="salvar">Salvar</button>
      <button class="excluir">Excluir</button>
    </div>
        <!-- Bloco de comentários estáticos -->
        <div class="comentarios">
          <h4>Comentários</h4>
          
          <div class="comentario">
            <img src="./assets/boy.png" alt="Foto de perfil" style="border-radius:50%; vertical-align:middle; margin-right:8px; width: 25px;">
            <strong>Fulana de Tal</strong>
            <small style="color:gray; margin-left:10px;">Publicado em 01/05/2025</small>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <i class="fas fa-trash" style="color:red; cursor:pointer;"></i>
          </div>

          <div class="comentario" style="margin-top:15px;">
            <img src="./assets/woman.png" alt="Foto de perfil" style="border-radius:50%; vertical-align:middle; margin-right:8px; width: 25px;">
            <strong>Fulana de Tal</strong>
            <small style="color:gray; margin-left:10px;">Publicado em 02/05/2025</small>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            <i class="fas fa-trash" style="color:red; cursor:pointer;"></i>
          </div>

          <button class="ver-mais" style="margin-top: 10px;">Ver mais comentários</button>
        </div>
      `;

      // Adiciona a área de edição à tarefa
      tarefa.appendChild(edicao);

      // Evento para salvar as edições da tarefa
      edicao.querySelector('.salvar').addEventListener('click', () => {
        titulo = edicao.querySelectorAll('input[type="text"]')[0].value;
        dataInicio = edicao.querySelectorAll('input[type="date"]')[0].value;
        dataFim = edicao.querySelectorAll('input[type="date"]')[1].value;
        custo = edicao.querySelector('input[type="number"]').value;
        status = edicao.querySelector('select').value;

        // Re-renderiza a tarefa com os novos dados
        renderTarefa();
      });

      // Evento para excluir a tarefa
      edicao.querySelector('.excluir').addEventListener('click', () => {
        const confirma = confirm("Tem certeza que deseja excluir esta tarefa?");
        if (confirma) tarefa.remove();
      });

      // Evento simulado para "ver mais comentários"
      edicao.querySelector('.ver-mais').addEventListener('click', () => {
        alert("Carregando mais comentários... (simulado)");
      });
    });
  }

  // Inicializa a renderização da tarefa
  renderTarefa();

  // Retorna o elemento DOM da tarefa criada
  return tarefa;
}
