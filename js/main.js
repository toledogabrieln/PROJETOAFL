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