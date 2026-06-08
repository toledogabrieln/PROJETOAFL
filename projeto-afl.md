# Projeto AFL – Accounting, Finances Lima
## Documento de Projeto · Versão 1.0

---

## 1. Visão Geral

**Cliente:** AFL – Accounting, Finances Lima
**Site:** [aflcontabil.com.br](https://aflcontabil.com.br)
**Desenvolvedor:** Gabriel Henrique de Toledo
**Objetivo:** Criar um site institucional moderno que apresente a empresa, seus serviços, conteúdo educativo via blog e facilite o contato de novos clientes.

---

## 2. Escopo do Projeto

### Páginas incluídas

| Página | Prioridade | Descrição |
|---|---|---|
| **Home** | Alta | Apresentação geral da AFL, serviços, blog e CTA de contato |
| **Sobre** | Alta | História, missão, valores e equipe |
| **Serviços** | Alta | Detalhe de cada serviço oferecido |
| **Blog** | Média | Listagem de artigos e dicas contábeis |
| **Artigo** | Média | Template para posts individuais do blog |
| **Contato / Orçamento** | Alta | Formulário e informações de contato |

### Fora do escopo (versão 1.0)
- Área do cliente com login
- Integração com sistemas contábeis externos
- Pagamentos online
- Chat em tempo real

---

## 3. Tecnologias Recomendadas (para Iniciante)

| Tecnologia | Função | Motivo |
|---|---|---|
| **HTML5** | Estrutura das páginas | Base fundamental da web |
| **CSS3** | Visual e layout responsivo | Flexbox + Grid são suficientes sem frameworks |
| **JavaScript (vanilla)** | Menu mobile, validações | Aprender o básico antes de frameworks |
| **Google Fonts** | Tipografia | Gratuito, fácil de usar com um `<link>` |
| **Formspree.io** | Envio do formulário | Funciona sem back-end (plano grátis) |
| **GitHub Pages** | Hospedagem | Gratuito para sites estáticos |
| **VS Code** | Editor de código | Melhor para iniciantes, gratuito |

> **Atenção:** Não usar React, Vue ou Bootstrap neste momento. O objetivo é dominar os fundamentos primeiro. Esses frameworks vêm depois, quando as bases estiverem sólidas.

---

## 4. Estrutura de Arquivos

```
afl-site/
│
├── index.html            → Home
├── sobre.html            → Sobre
├── servicos.html         → Serviços
├── blog.html             → Listagem do blog
├── post.html             → Template de artigo
├── contato.html          → Contato / Orçamento
│
├── css/
│   ├── reset.css         → Zera estilos padrão do navegador
│   ├── variables.css     → Cores, fontes e espaçamentos globais
│   └── main.css          → Estilos principais do site
│
├── js/
│   └── main.js           → Scripts (menu mobile, formulário, etc.)
│
└── images/
    ├── logo.svg          → Logotipo da AFL
    ├── logo-white.svg    → Versão branca do logo (para fundos escuros)
    ├── hero.jpg          → Imagem principal do hero
    ├── og-image.jpg      → Imagem para redes sociais (1200x630px)
    └── team/             → Fotos da equipe
        ├── socio-1.jpg
        └── socio-2.jpg
```

---

## 5. Design System

### Paleta de Cores

| Nome | Código Hex | Uso |
|---|---|---|
| **Verde Floresta** | `#1E3A2F` | Cor primária, navbar, footer |
| **Verde Médio** | `#2D5A47` | Hover de botões, destaques |
| **Verde Claro** | `#E8F0EB` | Backgrounds de seções alternadas |
| **Dourado** | `#C8963E` | Acento, CTAs, links, ícones |
| **Dourado Claro** | `#F5E6C8` | Background de badges, tags |
| **Creme** | `#F8F4EC` | Background principal das páginas |
| **Branco** | `#FFFFFF` | Cards, seções limpas |
| **Texto Escuro** | `#2B2B28` | Texto principal |
| **Texto Médio** | `#5C5C58` | Texto secundário, legendas |
| **Texto Claro** | `#9B9B97` | Placeholder, metadados |

### Tipografia

| Fonte | Uso | Pesos |
|---|---|---|
| **Cormorant Garamond** | Títulos (h1, h2, h3) | 400, 600, 700 |
| **Outfit** | Corpo do texto, menus, botões | 300, 400, 500, 600 |

**Como importar no `<head>` de cada página:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### CSS Custom Properties (variáveis globais)

Declare no arquivo `css/variables.css`:
```css
:root {
  /* Cores */
  --cor-primaria: #1E3A2F;
  --cor-primaria-hover: #2D5A47;
  --cor-primaria-clara: #E8F0EB;
  --cor-acento: #C8963E;
  --cor-acento-clara: #F5E6C8;
  --cor-bg: #F8F4EC;
  --cor-branco: #FFFFFF;
  --cor-texto: #2B2B28;
  --cor-texto-secundario: #5C5C58;
  --cor-texto-claro: #9B9B97;

  /* Tipografia */
  --fonte-titulo: 'Cormorant Garamond', Georgia, serif;
  --fonte-corpo: 'Outfit', system-ui, sans-serif;

  /* Tamanhos de fonte */
  --texto-xs: 0.75rem;    /* 12px */
  --texto-sm: 0.875rem;   /* 14px */
  --texto-base: 1rem;     /* 16px */
  --texto-lg: 1.125rem;   /* 18px */
  --texto-xl: 1.25rem;    /* 20px */
  --texto-2xl: 1.5rem;    /* 24px */
  --texto-3xl: 2rem;      /* 32px */
  --texto-4xl: 2.5rem;    /* 40px */
  --texto-5xl: 3.5rem;    /* 56px */

  /* Espaçamentos */
  --esp-xs: 0.5rem;    /* 8px */
  --esp-sm: 1rem;      /* 16px */
  --esp-md: 1.5rem;    /* 24px */
  --esp-lg: 3rem;      /* 48px */
  --esp-xl: 5rem;      /* 80px */
  --esp-2xl: 7.5rem;   /* 120px */

  /* Outros */
  --borda-raio: 8px;
  --borda-raio-lg: 16px;
  --sombra-card: 0 2px 20px rgba(30, 58, 47, 0.08);
  --transicao: 0.25s ease;
  --largura-max: 1200px;
}
```

---

## 6. Conteúdo por Página

### Home (index.html)

1. **Navbar** — Logo | Links: Início, Sobre, Serviços, Blog, Contato | Botão "Solicitar Orçamento"
2. **Hero** — Headline forte + subtítulo + 2 CTAs ("Ver Serviços" e "Fale Conosco") + imagem ou foto da equipe
3. **Serviços** — Grid com 4–6 cards: ícone + nome do serviço + descrição curta + link "Saiba mais"
4. **Sobre (preview)** — Pequeno bloco de apresentação da empresa + números de destaque (anos de experiência, clientes, etc.)
5. **Blog (preview)** — 3 posts mais recentes em cards horizontais
6. **CTA Final** — Faixa verde escura com headline + botão grande "Solicitar Orçamento Gratuito"
7. **Footer** — Logo + links rápidos + contato + redes sociais + CNPJ + copyright

### Sobre (sobre.html)
- Seção "Nossa História" (texto + foto)
- Missão, Visão e Valores (3 cards)
- Equipe (cards com foto, nome e especialidade)
- Diferenciais / Por que escolher a AFL

### Serviços (servicos.html)

Serviços sugeridos (confirmar com a cliente):
1. Contabilidade Empresarial
2. Imposto de Renda (PF e PJ)
3. Abertura e Encerramento de Empresas
4. Departamento Pessoal / Folha de Pagamento
5. Planejamento Tributário
6. Consultoria Financeira

Cada serviço: ícone + título + descrição + lista de o que está incluído + CTA de contato.

### Blog (blog.html)
- Grid de cards: thumbnail + categoria (tag) + título + data + resumo + "Ler mais"
- Filtro por categoria (funcionalidade JS simples)
- Paginação (pode ser simulada no início com todos os posts visíveis)

### Artigo — Template (post.html)
- Imagem de capa grande
- Breadcrumb (Início > Blog > Título do artigo)
- Título + meta (autor, data, categoria, tempo de leitura)
- Corpo do artigo com formatação de texto rico
- Caixa "Sobre o Autor"
- Posts relacionados (3 cards)

### Contato / Orçamento (contato.html)
- **Formulário:** Nome, E-mail, Telefone, Empresa (opcional), Serviço de interesse (select), Mensagem, Botão "Enviar"
- **Informações:** Endereço, Telefone/WhatsApp, E-mail, Horário de atendimento
- **Mapa:** Embed do Google Maps (adicionar depois)
- **Links diretos:** WhatsApp, Instagram, LinkedIn

---

## 7. Fases do Projeto

### Fase 1 – Preparação (3–4 dias)
- [ ] Instalar VS Code e extensões: Live Server, Prettier, Auto Rename Tag
- [ ] Criar pasta `afl-site/` com a estrutura de arquivos
- [ ] Criar `variables.css` com todas as cores e fontes
- [ ] Criar `reset.css` básico
- [ ] Esboçar as páginas no papel (wireframe básico)
- [ ] Solicitar logotipo e conteúdo textual à cliente

### Fase 2 – HTML Estrutural (4–5 dias)
- [ ] Criar todos os 6 arquivos `.html`
- [ ] Adicionar estrutura semântica: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- [ ] Não adicionar CSS ainda — focar na estrutura primeiro
- [ ] Validar HTML em https://validator.w3.org

### Fase 3 – Estilização CSS (7–10 dias)
- [ ] Navbar fixa e responsiva
- [ ] Seção Hero
- [ ] Grid de Serviços
- [ ] Seção Sobre e Números
- [ ] Cards de Blog
- [ ] CTA Final e Footer
- [ ] Responsividade: mobile (320px), tablet (768px), desktop (1280px)

### Fase 4 – JavaScript (3–5 dias)
- [ ] Menu hambúrguer para mobile
- [ ] Validação básica do formulário de contato
- [ ] Animações ao rolar a página (fade-in com IntersectionObserver)
- [ ] Filtro de categorias no blog (mostrar/ocultar cards)

### Fase 5 – Conteúdo e Qualidade (3–4 dias)
- [ ] Inserir textos reais fornecidos pela cliente
- [ ] Otimizar imagens (converter para WebP, máximo 200KB por imagem)
- [ ] Testar em Chrome, Firefox e Safari
- [ ] Testar em celular real (Android e iPhone se possível)
- [ ] Verificar acessibilidade: `alt` em imagens, contraste de cores

### Fase 6 – Publicação (1–2 dias)
- [ ] Criar conta no GitHub e repositório `afl-site`
- [ ] Fazer primeiro commit com todo o código
- [ ] Ativar GitHub Pages nas configurações do repositório
- [ ] Apontar o domínio `aflcontabil.com.br` para o GitHub Pages (configurar DNS)

---

## 8. Formulário de Contato sem Back-end

Usar o **Formspree** para enviar os e-mails do formulário sem precisar de servidor:

1. Acessar https://formspree.io e criar conta gratuita
2. Criar um novo formulário e copiar o endpoint gerado
3. No HTML, usar o endpoint como `action` do `<form>`:

```html
<form action="https://formspree.io/f/SEU_CODIGO_AQUI" method="POST">
  <input type="text" name="nome" placeholder="Seu nome" required>
  <input type="email" name="email" placeholder="Seu e-mail" required>
  <input type="tel" name="telefone" placeholder="Seu telefone">
  <select name="servico">
    <option value="">Selecione um serviço</option>
    <option value="contabilidade">Contabilidade Empresarial</option>
    <option value="irpf">Imposto de Renda PF</option>
    <!-- ... -->
  </select>
  <textarea name="mensagem" placeholder="Como podemos ajudar?" required></textarea>
  <button type="submit">Enviar Mensagem</button>
</form>
```

O plano gratuito permite 50 envios por mês — suficiente para começar.

---

## 9. Recursos de Aprendizado

| Recurso | Link | Para quê |
|---|---|---|
| **MDN Web Docs** | developer.mozilla.org | Documentação HTML, CSS e JS (a melhor referência) |
| **CSS Tricks** | css-tricks.com | Guias práticos de Flexbox e Grid |
| **Flexbox Froggy** | flexboxfroggy.com | Jogo para aprender Flexbox |
| **Grid Garden** | cssgridgarden.com | Jogo para aprender CSS Grid |
| **Squoosh** | squoosh.app | Otimizar e converter imagens para WebP |
| **Coolors** | coolors.co | Gerar e verificar paletas de cores |
| **Google Fonts** | fonts.google.com | Biblioteca de fontes gratuitas |
| **Can I Use** | caniuse.com | Verificar suporte de CSS/JS nos navegadores |

---

## 10. Checklist Final (antes de entregar)

### Responsividade
- [ ] Funciona bem em celular (320px–430px de largura)
- [ ] Funciona bem em tablet (768px)
- [ ] Funciona bem em desktop (1280px+)
- [ ] Menu mobile abre e fecha corretamente

### Conteúdo
- [ ] Todas as imagens têm atributo `alt` descritivo
- [ ] Sem texto de placeholder ("Lorem ipsum") visível
- [ ] Links de navegação funcionam entre todas as páginas
- [ ] Logo redireciona para a Home

### Formulário
- [ ] Campos obrigatórios validados antes do envio
- [ ] Mensagem de sucesso exibida após envio
- [ ] E-mail chega na caixa da cliente

### Performance
- [ ] Imagens abaixo de 200KB cada
- [ ] Página carrega em menos de 3 segundos em 4G
- [ ] Sem erros no console do navegador (F12)

### Acessibilidade
- [ ] Contraste de cores aprovado em https://webaim.org/resources/contrastchecker/
- [ ] Navegação por teclado (Tab) funciona corretamente
- [ ] Links descritivos (não usar "clique aqui" sem contexto)

---

*Documento criado com auxílio do Claude (Anthropic) · Junho 2026*
*Versão 1.0 — Revisado pela família Lima*
