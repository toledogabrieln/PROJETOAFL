/* ===================================================
   JS PRINCIPAL – interações do site
   =================================================== */

/* ---------- 1. Sombra na navbar ao rolar ---------- */
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbar-toggle');
const navbarLinks = document.getElementById('navbar-links');
const ctaDesktop = document.getElementById('navbar-cta-desktop');

function aplicarSombraNavbar() {
  if (!navbar) {
    return;
  }

  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', aplicarSombraNavbar);
window.addEventListener('resize', ajustarCTA);
window.addEventListener('DOMContentLoaded', function () {
  aplicarSombraNavbar();
  ajustarCTA();
  inicializarMenuMobile();
  inicializarAnimacoesDeEntrada();
  inicializarSmoothScroll();
  inicializarFiltroBlog();
  inicializarPaginacaoBlog();
  inicializarNoticia();
  inicializarValidacaoDeFormulario();
});

/* ---------- 2. Menu hambúrguer mobile ---------- */
function inicializarMenuMobile() {
  if (!navbarToggle || !navbarLinks) {
    return;
  }

  navbarToggle.addEventListener('click', function () {
    const estaAberto = navbarLinks.classList.contains('aberto');
    navbarLinks.classList.toggle('aberto');
    navbarToggle.setAttribute('aria-expanded', String(!estaAberto));
    navbarToggle.setAttribute('aria-label', estaAberto ? 'Abrir menu' : 'Fechar menu');
  });

  navbarLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navbarLinks.classList.remove('aberto');
      navbarToggle.setAttribute('aria-expanded', 'false');
      navbarToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

/* ---------- 3. Exibir botão CTA da navbar conforme largura ---------- */
function ajustarCTA() {
  if (!ctaDesktop) {
    return;
  }

  if (window.innerWidth > 768) {
    ctaDesktop.style.display = 'block';
  } else {
    ctaDesktop.style.display = 'none';
  }
}

/* ---------- 4. IntersectionObserver para animações ---------- */
function inicializarAnimacoesDeEntrada() {
  const elementosAnimar = document.querySelectorAll('.animar');

  if (!elementosAnimar.length) {
    return;
  }

  const observador = new IntersectionObserver(function (entradas, observer) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementosAnimar.forEach(function (elemento) {
    observador.observe(elemento);
  });
}

/* ---------- 5. Smooth scroll para links âncora ---------- */
function inicializarSmoothScroll() {
  document.addEventListener('click', function (evento) {
    const link = evento.target.closest('a');

    if (!link) {
      return;
    }

    const href = link.getAttribute('href');

    if (!href || !href.startsWith('#') || href === '#') {
      return;
    }

    const alvo = document.querySelector(href);

    if (!alvo) {
      return;
    }

    evento.preventDefault();

    const offset = 80;
    const top = alvo.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  });
}

/* ---------- 6. Validação do formulário de contato ---------- */
function validarFormulario(formId) {
  const form = document.getElementById(formId);

  if (!form) {
    return false;
  }

  let valido = true;
  const camposObrigatorios = Array.from(form.querySelectorAll('input[required], textarea[required], select[required]'));

  camposObrigatorios.forEach(function (campo) {
    removerMensagemErro(campo);

    if (!campo.value.trim()) {
      mostrarMensagemErro(campo, 'Este campo é obrigatório.');
      valido = false;
    }
  });

  if (!valido) {
    return false;
  }

  exibirMensagemSucesso(form);
  return true;
}

function mostrarMensagemErro(campo, mensagem) {
  removerMensagemErro(campo);

  const erro = document.createElement('div');
  erro.className = 'mensagem-erro';
  erro.textContent = mensagem;

  campo.classList.add('campo-invalido');
  campo.insertAdjacentElement('afterend', erro);
}

function removerMensagemErro(campo) {
  const proximo = campo.nextElementSibling;

  if (proximo && proximo.classList.contains('mensagem-erro')) {
    proximo.remove();
  }

  campo.classList.remove('campo-invalido');
}

function exibirMensagemSucesso(form) {
  let sucesso = form.querySelector('.mensagem-sucesso');

  if (!sucesso) {
    sucesso = document.createElement('div');
    sucesso.className = 'mensagem-sucesso';
    form.appendChild(sucesso);
  }

  sucesso.textContent = 'Mensagem enviada! Entraremos em contato em breve.';
}

function inicializarValidacaoDeFormulario() {
  const formularios = document.querySelectorAll('form');

  formularios.forEach(function (form) {
    form.addEventListener('submit', function (evento) {
      const formularioId = form.id || form.name;

      if (!formularioId || !validarFormulario(formularioId)) {
        evento.preventDefault();
      }
    });

    form.querySelectorAll('input[required], textarea[required], select[required]').forEach(function (campo) {
      campo.addEventListener('input', function () {
        removerMensagemErro(campo);
      });
    });
  });
}

/* ---------- 7. Filtro de categorias do blog ---------- */
function filtrarBlog(categoria) {
  const cards = document.querySelectorAll('.post-card');

  if (!cards.length) {
    return;
  }

  const categoriaNormalizada = categoria ? categoria.toLowerCase() : 'todos';

  cards.forEach(function (card) {
    const categoriaCard = (card.dataset.categoria || '').toLowerCase();
    const mostrar = categoriaNormalizada === 'todos' || categoriaCard === categoriaNormalizada;

    card.style.display = mostrar ? '' : 'none';
  });

  atualizarBotoesFiltro(categoriaNormalizada);
  atualizarPaginacaoBlog();
}

function atualizarBotoesFiltro(categoria) {
  const botoes = document.querySelectorAll('[data-filtro]');

  botoes.forEach(function (botao) {
    if (botao.dataset.filtro && botao.dataset.filtro.toLowerCase() === categoria.toLowerCase()) {
      botao.classList.add('ativo');
    } else {
      botao.classList.remove('ativo');
    }
  });
}

function inicializarFiltroBlog() {
  const filtros = document.querySelectorAll('[data-filtro]');

  if (!filtros.length) {
    return;
  }

  filtros.forEach(function (botao) {
    botao.addEventListener('click', function (evento) {
      evento.preventDefault();
      filtrarBlog(botao.dataset.filtro || 'todos');
    });
  });
}

/* ---------- 8. Interface pública para uso direto ---------- */
window.validarFormulario = validarFormulario;
window.filtrarBlog = filtrarBlog;

// ------------------------------------
  // FAQ com transição (accordion)
  // ------------------------------------
  const faqItens = document.querySelectorAll('.faq-item');

  faqItens.forEach(function (item) {
    const botao = item.querySelector('.faq-pergunta');

    botao.addEventListener('click', function () {
      const jaEstavaAberto = item.classList.contains('aberto');

      // Fecha todos os outros itens (efeito acordeão clássico)
      faqItens.forEach(function (outroItem) {
        outroItem.classList.remove('aberto');
        outroItem.querySelector('.faq-pergunta')
          .setAttribute('aria-expanded', 'false');
      });

      // Abre o item clicado, se ele já não estava aberto
      if (!jaEstavaAberto) {
        item.classList.add('aberto');
        botao.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ------------------------------------
// Aplica filtro de categoria vindo de outra página
// (ex: clique em "Tributário (8)" na sidebar do post.html)
// ------------------------------------
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .trim();
}

const parametros = new URLSearchParams(window.location.search);
const categoriaDaUrl = parametros.get('categoria');

if (categoriaDaUrl) {
  const botoesFiltro = document.querySelectorAll('.blog-filtros [data-filtro]');

  botoesFiltro.forEach(function (botao) {
    const textoBotao = normalizar(botao.textContent);
    const categoriaBuscada = normalizar(categoriaDaUrl);

    if (textoBotao === categoriaBuscada) {
      botao.click(); // reaproveita a função de filtro que já existe
    }
  });
}

let paginaBlogAtual = 1;
const postsPorPagina = 3;

function obterCardsBlogVisiveis() {
  const categoriaAtiva = document.querySelector('.blog-filtros [data-filtro].ativo');
  const categoria = categoriaAtiva ? normalizar(categoriaAtiva.dataset.filtro) : 'todos';
  return Array.from(document.querySelectorAll('.blog-grid .post-card')).filter(function (card) {
    return categoria === 'todos' || normalizar(card.dataset.categoria || '') === categoria;
  });
}

function atualizarPaginacaoBlog() {
  const cards = Array.from(document.querySelectorAll('.blog-grid .post-card'));
  const cardsFiltrados = obterCardsBlogVisiveis();
  const totalPaginas = Math.max(1, Math.ceil(cardsFiltrados.length / postsPorPagina));

  paginaBlogAtual = Math.min(paginaBlogAtual, totalPaginas);
  cards.forEach(function (card) {
    card.style.display = 'none';
  });

  const inicio = (paginaBlogAtual - 1) * postsPorPagina;
  cardsFiltrados.slice(inicio, inicio + postsPorPagina).forEach(function (card) {
    card.style.display = '';
  });

  document.querySelectorAll('.blog-paginacao [data-pagina]').forEach(function (botao) {
    const pagina = Number(botao.dataset.pagina);
    botao.classList.toggle('ativo', pagina === paginaBlogAtual);
    botao.disabled = pagina > totalPaginas;
    botao.hidden = pagina > totalPaginas;
  });

  const anterior = document.querySelector('.blog-paginacao [data-pagina="anterior"]');
  const proximo = document.querySelector('.blog-paginacao [data-pagina="proximo"]');

  if (anterior) anterior.disabled = paginaBlogAtual === 1;
  if (proximo) proximo.disabled = paginaBlogAtual === totalPaginas;
}

function inicializarPaginacaoBlog() {
  const paginacao = document.querySelector('.blog-paginacao');

  if (!paginacao) {
    return;
  }

  paginacao.addEventListener('click', function (evento) {
    const botao = evento.target.closest('[data-pagina]');

    if (!botao || botao.disabled) {
      return;
    }

    const pagina = botao.dataset.pagina;
    if (pagina === 'anterior') paginaBlogAtual -= 1;
    if (pagina === 'proximo') paginaBlogAtual += 1;
    if (/^\d+$/.test(pagina)) paginaBlogAtual = Number(pagina);

    atualizarPaginacaoBlog();
  });

  atualizarPaginacaoBlog();
}

const noticias = {
  regime: {
    categoria: 'Tributário',
    titulo: 'Simples Nacional, Lucro Presumido ou Real?',
    data: '15 de Maio de 2026',
    leitura: '5 min de leitura',
    imagem: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    resumo: 'Entenda como escolher entre os regimes tributários e tomar uma decisão segura para o seu negócio.',
    conteudo: '<p>Escolher o regime tributário correto é uma decisão estratégica para qualquer empresa. A escolha influencia o valor dos impostos, a quantidade de obrigações e até a forma como o negócio pode crescer.</p><p>O ponto mais importante é não escolher apenas pelo nome do regime ou pela menor guia do primeiro mês. A opção adequada depende da realidade financeira e operacional da empresa.</p><h2>O que analisar antes de decidir</h2><p>Comece reunindo faturamento, margem de lucro, folha de pagamento, despesas e tipo de atividade. Esses dados mostram como cada regime se comporta no cenário real do negócio.</p><ol><li>Levante o faturamento atual e a projeção dos próximos meses.</li><li>Separe custos fixos, variáveis e despesas com pessoal.</li><li>Confira quais tributos incidem sobre a atividade.</li><li>Simule o impacto anual, e não apenas o valor mensal.</li></ol><h2>Como funcionam os principais regimes</h2><p>O Simples Nacional reúne tributos em uma guia e costuma simplificar a rotina de pequenos negócios. O Lucro Presumido utiliza margens definidas pela legislação, enquanto o Lucro Real considera o resultado efetivo da empresa.</p><ul><li>Faturamento e projeção de crescimento</li><li>Margem de lucro e estrutura de custos</li><li>Folha de pagamento e atividade exercida</li><li>Obrigações acessórias e organização financeira</li></ul><h2>Um erro comum</h2><p>Comparar somente a alíquota inicial pode esconder custos com folha, retenções ou obrigações acessórias. A decisão precisa considerar o conjunto da operação.</p><blockquote><p>Uma boa escolha tributária nasce de números organizados e de uma comparação feita antes do prazo de opção.</p></blockquote><p>Uma análise contábil baseada em dados reais ajuda a escolher o regime mais adequado e cria uma base segura para os próximos passos da empresa.</p>'
  },
  investimentos: {
    categoria: 'IRPF / IRPJ',
    titulo: 'Como declarar seus investimentos no Imposto de Renda 2026',
    data: '02 de Abril de 2026',
    leitura: '4 min de leitura',
    imagem: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    resumo: 'Veja como organizar informações de ações, fundos e outros investimentos para declarar corretamente.',
    conteudo: '<p>Declarar investimentos exige organização dos informes de rendimentos, notas de corretagem e posições mantidas em 31 de dezembro. Mesmo quem investe pouco deve manter um histórico simples das operações.</p><p>O cuidado evita divergências entre os valores informados pelo contribuinte, pelas instituições financeiras e pelas corretoras.</p><h2>Documentos que você deve separar</h2><p>Comece pelos informes fornecidos por bancos e corretoras. Depois, confira compras, vendas, rendimentos e eventuais prejuízos registrados durante o ano.</p><ul><li>Informes de rendimentos</li><li>Notas de corretagem</li><li>Posição anual dos ativos</li><li>Comprovantes de DARFs pagos</li><li>Extratos das contas de investimento</li></ul><h2>Uma rotina simples para revisar</h2><ol><li>Baixe os informes de todas as instituições.</li><li>Compare os saldos com a posição de dezembro.</li><li>Separe rendimentos isentos dos tributáveis.</li><li>Confira vendas, ganhos e prejuízos do ano.</li></ol><h2>Onde surgem mais dúvidas</h2><p>Atenção especial deve ser dada a operações de renda variável, fundos, criptoativos e investimentos no exterior. Cada tipo pode ter uma forma própria de apuração e declaração.</p><blockquote><p>Organizar os documentos ao longo do ano é muito mais simples do que reconstruir as operações às pressas antes do prazo final.</p></blockquote><p>Em caso de operações complexas ou dúvidas sobre compensação de prejuízos, uma conferência profissional reduz o risco de inconsistências e deixa a declaração mais tranquila.</p>'
  },
  fluxo: {
    categoria: 'Gestão',
    titulo: 'Fluxo de caixa: como organizar as finanças da sua empresa',
    data: '18 de Março de 2026',
    leitura: '6 min de leitura',
    imagem: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    resumo: 'Aprenda a acompanhar entradas e saídas para tomar decisões financeiras com mais segurança.',
    conteudo: '<p>Um fluxo de caixa bem organizado mostra quanto dinheiro entra, quanto sai e quais compromissos estão previstos para os próximos dias. Ele funciona como um painel de controle da operação.</p><p>Ter faturamento não significa necessariamente ter dinheiro disponível. O prazo de recebimento e o prazo de pagamento podem criar apertos mesmo em meses movimentados.</p><h2>Como começar o controle</h2><p>Registre todas as movimentações em categorias simples e atualize o controle com frequência. Separe despesas fixas, variáveis, impostos e retiradas dos sócios.</p><ol><li>Defina uma data fixa para atualizar o caixa.</li><li>Registre entradas pela data prevista e pela data recebida.</li><li>Liste contas futuras, impostos e compromissos parcelados.</li><li>Compare o planejado com o realizado toda semana.</li></ol><h2>O que acompanhar de perto</h2><ul><li>Saldo disponível hoje</li><li>Contas a receber e atrasadas</li><li>Despesas fixas do próximo mês</li><li>Impostos e folha de pagamento</li><li>Necessidade de capital de giro</li></ul><h2>Um erro comum</h2><p>Misturar gastos pessoais com despesas da empresa dificulta a leitura do resultado e pode levar a decisões erradas. Separar as contas é uma das primeiras melhorias de gestão.</p><blockquote><p>O melhor momento para descobrir um problema de caixa é antes de ele vencer, não depois.</p></blockquote><p>Com dados confiáveis, a empresa consegue planejar compras, negociar prazos e identificar oportunidades de crescimento com mais segurança.</p>'
  },
  planejamento: {
    categoria: 'Tributário',
    titulo: 'Planejamento tributário para pequenas empresas',
    data: '28 de Abril de 2026',
    leitura: '5 min de leitura',
    imagem: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    resumo: 'Conheça estratégias legais para reduzir custos fiscais sem abrir mão da conformidade.',
    conteudo: '<p>Planejamento tributário é o estudo organizado das opções permitidas pela legislação para que a empresa recolha seus tributos de forma eficiente. Não se trata de pagar menos a qualquer custo, e sim de tomar decisões corretas dentro das regras.</p><p>Quando feito com antecedência, o planejamento transforma o calendário fiscal em uma ferramenta de organização e previsibilidade.</p><h2>O planejamento começa pelos dados</h2><p>Antes de mudar o regime ou buscar benefícios, é importante analisar faturamento, despesas, folha, atividade e histórico fiscal.</p><ol><li>Atualize o cadastro e a atividade econômica da empresa.</li><li>Revise o faturamento dos últimos períodos.</li><li>Mapeie impostos, retenções e obrigações entregues.</li><li>Projete cenários para os próximos meses.</li></ol><h2>O que uma simulação deve mostrar</h2><ul><li>Valor estimado dos tributos</li><li>Impacto da folha e das despesas</li><li>Rotina de declarações e prazos</li><li>Efeito de uma mudança no crescimento do negócio</li></ul><h2>Por que revisar todos os anos</h2><p>A empresa muda, seus clientes mudam e a legislação também. Uma escolha adequada no início da operação pode deixar de ser a melhor quando o faturamento, a equipe ou a margem se alteram.</p><blockquote><p>Planejar impostos é criar espaço para a empresa investir, contratar e crescer sem surpresas evitáveis.</p></blockquote><p>Simulações periódicas ajudam a antecipar impactos e permitem ajustar a estratégia antes do início de um novo período, sempre com documentação e conformidade.</p>'
  },
  irpf: {
    categoria: 'IRPF / IRPJ',
    titulo: 'Erros comuns na declaração do IRPF',
    data: '10 de Maio de 2026',
    leitura: '4 min de leitura',
    imagem: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    resumo: 'Veja os erros mais frequentes e como revisar sua declaração antes do envio.',
    conteudo: '<p>Informações incompletas, rendimentos esquecidos e divergências com os informes são causas comuns de pendências na declaração. A revisão não precisa ser complicada, mas deve seguir uma ordem.</p><p>Separar os documentos antes de abrir o programa da declaração reduz esquecimentos e torna mais fácil conferir os valores digitados.</p><h2>Faça uma revisão antes de enviar</h2><ol><li>Confira nome, CPF, endereço e dados dos dependentes.</li><li>Compare todos os rendimentos com os informes recebidos.</li><li>Revise despesas médicas, educação e previdência.</li><li>Atualize bens, direitos, dívidas e financiamentos.</li><li>Leia o resumo final antes de transmitir.</li></ol><h2>Erros que merecem atenção</h2><ul><li>Declarar dependente em mais de uma declaração</li><li>Informar rendimento pelo valor líquido</li><li>Esquecer aluguel ou trabalho autônomo</li><li>Repetir bens sem conferir o saldo correto</li></ul><blockquote><p>Uma declaração bem feita começa pela organização dos documentos, não pelo preenchimento apressado.</p></blockquote><p>Quando houver investimentos, aluguel ou atividade autônoma, uma conferência profissional pode evitar retrabalho, multas e a necessidade de corrigir informações depois do envio.</p>'
  },
  indicadores: {
    categoria: 'Gestão',
    titulo: 'Indicadores financeiros que toda empresa deve acompanhar',
    data: '05 de Abril de 2026',
    leitura: '4 min de leitura',
    imagem: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    resumo: 'Conheça indicadores simples para acompanhar a saúde financeira e apoiar decisões melhores.',
    conteudo: '<p>Indicadores transformam movimentações financeiras em sinais claros para a gestão. Eles ajudam a trocar a sensação de que o negócio vai bem por uma visão baseada em fatos.</p><p>O segredo não é acompanhar dezenas de números, mas escolher informações úteis e observar sua evolução com regularidade.</p><h2>Indicadores para começar</h2><ul><li>Margem de lucro</li><li>Geração de caixa</li><li>Prazo médio de recebimento</li><li>Participação das despesas fixas</li><li>Endividamento e compromissos futuros</li></ul><h2>Como transformar números em decisões</h2><ol><li>Defina uma frequência de acompanhamento.</li><li>Compare o mês atual com o orçamento.</li><li>Observe tendências, e não apenas um resultado isolado.</li><li>Registre a causa de variações importantes.</li></ol><h2>Um cuidado importante</h2><p>Um indicador fora do esperado não explica sozinho o problema. A margem pode cair por uma compra estratégica, assim como o caixa pode subir por uma venda parcelada ainda não recebida.</p><blockquote><p>O indicador mostra onde olhar; a análise do contexto mostra qual decisão tomar.</p></blockquote><p>Ao comparar os números ao longo do tempo, o gestor identifica tendências, corrige desvios e cria uma rotina de gestão mais previsível para o negócio.</p>'
  },
  folha: {
    categoria: 'Trabalhista',
    titulo: 'Folha de pagamento sem sustos: o que revisar todos os meses',
    data: '21 de Março de 2026',
    leitura: '5 min de leitura',
    imagem: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    resumo: 'Uma rotina de conferência ajuda a evitar erros em salários, encargos e obrigações trabalhistas.',
    conteudo: '<p>A folha de pagamento reúne informações que mudam todos os meses: admissões, férias, afastamentos, horas extras, benefícios e descontos. Por isso, pequenos esquecimentos podem gerar retrabalho e custos inesperados.</p><p>Uma conferência simples antes do fechamento melhora a previsibilidade e protege a relação com a equipe.</p><h2>O que revisar antes do fechamento</h2><ol><li>Confira alterações de salário, cargo e jornada.</li><li>Valide admissões, demissões e afastamentos.</li><li>Revise férias, horas extras e faltas.</li><li>Compare descontos e benefícios com o mês anterior.</li><li>Confirme os prazos de pagamento e recolhimento.</li></ol><h2>Documentos que merecem atenção</h2><ul><li>Controle de ponto</li><li>Avisos e recibos de férias</li><li>Atestados e afastamentos</li><li>Termos de admissão e rescisão</li></ul><h2>Um erro comum</h2><p>Deixar para comunicar alterações apenas no fim do mês aumenta a chance de informações desencontradas. Um canal e um prazo fixo para enviar documentos tornam a rotina mais segura.</p><blockquote><p>Uma folha bem conferida começa com informações organizadas antes do processamento.</p></blockquote><p>Com uma rotina clara, a empresa reduz correções, melhora o planejamento de caixa e mantém as obrigações trabalhistas em dia.</p>'
  },
  ferias: {
    categoria: 'Trabalhista',
    titulo: 'Férias e 13º salário: como planejar os compromissos da equipe',
    data: '14 de Março de 2026',
    leitura: '5 min de leitura',
    imagem: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    resumo: 'Planejar férias e décimo terceiro com antecedência evita pressão no caixa e falhas de comunicação.',
    conteudo: '<p>Férias e 13º salário são direitos trabalhistas, mas também representam compromissos financeiros importantes para a empresa. Quando entram no planejamento anual, deixam de ser uma surpresa para o caixa.</p><p>O primeiro passo é manter um calendário atualizado e conversar com a equipe dentro dos prazos necessários.</p><h2>Como montar um planejamento simples</h2><ol><li>Liste o período aquisitivo de cada colaborador.</li><li>Antecipe os meses com maior concentração de férias.</li><li>Projete o valor das férias, do terço constitucional e do 13º.</li><li>Reserve recursos ao longo do ano.</li></ol><h2>O que alinhar com a equipe</h2><ul><li>Datas possíveis e períodos de maior movimento</li><li>Substituições e distribuição das atividades</li><li>Prazo para solicitação e aprovação</li><li>Forma de comunicação dos pagamentos</li></ul><h2>Por que o calendário ajuda</h2><p>Além de organizar o dinheiro, o calendário evita que várias pessoas importantes fiquem ausentes ao mesmo tempo. Ele também permite distribuir melhor as tarefas e preservar a continuidade do atendimento.</p><blockquote><p>Planejar direitos trabalhistas é cuidar das pessoas e também da saúde financeira da operação.</p></blockquote><p>Uma visão antecipada transforma obrigações previsíveis em decisões de gestão mais tranquilas e responsáveis.</p>'
  },
  precificacao: {
    categoria: 'Finanças',
    titulo: 'Como formar preços sem perder dinheiro no caminho',
    data: '07 de Março de 2026',
    leitura: '6 min de leitura',
    imagem: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1200&q=80',
    resumo: 'Entenda quais custos entram no preço e como ajustar sua margem com mais segurança.',
    conteudo: '<p>Formar preço não é apenas somar o custo de compra e acrescentar uma porcentagem. É preciso considerar impostos, taxas, despesas da operação, perdas e a margem necessária para o negócio continuar saudável.</p><p>Um preço bem calculado dá clareza para negociar e evita que o aumento das vendas esconda prejuízos.</p><h2>O que deve entrar na conta</h2><ul><li>Custo direto do produto ou serviço</li><li>Impostos e taxas de venda</li><li>Frete, comissões e meios de pagamento</li><li>Despesas fixas e variáveis</li><li>Margem de lucro desejada</li></ul><h2>Passo a passo para revisar um preço</h2><ol><li>Atualize os custos com valores reais.</li><li>Separe o que varia por venda do que é fixo.</li><li>Calcule o impacto dos impostos.</li><li>Compare o preço com o mercado sem copiar concorrentes.</li><li>Teste cenários de volume e margem.</li></ol><h2>Um cuidado importante</h2><p>Descontos frequentes precisam ser medidos. Uma redução pequena no preço pode exigir um aumento grande no volume de vendas para compensar.</p><blockquote><p>Vender mais só é uma boa notícia quando cada venda contribui para o resultado.</p></blockquote><p>Revisar a formação de preços com frequência ajuda a empresa a proteger margem, negociar com clareza e decidir onde vale crescer.</p>'
  },
  custos: {
    categoria: 'Finanças',
    titulo: 'Custos fixos e variáveis: entenda o impacto no seu negócio',
    data: '28 de Fevereiro de 2026',
    leitura: '5 min de leitura',
    imagem: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    resumo: 'Separar os custos corretamente melhora o planejamento e mostra onde a operação pode ganhar eficiência.',
    conteudo: '<p>Conhecer os custos é diferente de apenas saber quanto foi gasto. A separação entre custos fixos e variáveis mostra como a operação reage quando as vendas aumentam ou diminuem.</p><p>Essa leitura ajuda a definir metas realistas e a encontrar desperdícios sem comprometer a qualidade.</p><h2>Qual é a diferença?</h2><p>Custos fixos tendem a permanecer mesmo quando o volume de vendas muda, como aluguel e sistemas. Custos variáveis acompanham a operação, como matéria-prima, taxas e comissões.</p><h2>Como organizar na prática</h2><ol><li>Liste todas as despesas dos últimos três meses.</li><li>Classifique cada item pelo comportamento.</li><li>Identifique gastos sazonais e extraordinários.</li><li>Compare custos com faturamento e margem.</li></ol><h2>Perguntas úteis para a revisão</h2><ul><li>Este gasto é essencial para a entrega?</li><li>Existe contrato ou taxa que pode ser renegociado?</li><li>O aumento do custo acompanha o crescimento das vendas?</li><li>Qual despesa merece acompanhamento semanal?</li></ul><blockquote><p>Organizar custos não significa cortar tudo: significa saber o que sustenta o negócio e o que precisa ser melhorado.</p></blockquote><p>Com essa visão, a gestão consegue planejar investimentos, proteger o caixa e tomar decisões financeiras com menos improviso.</p>'
  }
};

function inicializarNoticia() {
  const chave = new URLSearchParams(window.location.search).get('noticia');
  const noticia = noticias[chave];

  if (!noticia || !document.querySelector('[data-post-titulo]')) {
    return;
  }

  document.title = noticia.titulo + ' - AFL Contabil';
  document.querySelector('[data-post-categoria]').textContent = noticia.categoria;
  document.querySelector('[data-post-titulo]').textContent = noticia.titulo;
  document.querySelector('[data-post-data]').textContent = 'Por Sanny Christina - ' + noticia.data + ' - ' + noticia.leitura;
  document.querySelector('[data-post-imagem]').src = noticia.imagem;
  document.querySelector('[data-post-imagem]').alt = noticia.titulo;
  document.querySelector('[data-post-resumo]').textContent = noticia.resumo;
  document.querySelector('[data-post-conteudo]').innerHTML = noticia.conteudo;
}