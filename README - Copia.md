# STREET Estetica Automotiva

Landing page estatica em HTML, Bootstrap, CSS customizado e JavaScript puro para um servico premium de estetica automotiva.

O visual foi criado usando o site Saiibu Auto apenas como referencia de direcao: hero com carro em destaque, cards de servicos, bloco institucional, depoimentos, FAQ e formulario. O conteudo, marca, textos e imagens usados aqui sao proprios do projeto.

## Estrutura

```text
detail/
|-- index.html
|-- css/style.css
|-- js/main.js
|-- img1.jpeg
|-- img2.jpeg
|-- img3.jpeg
|-- logo.jpeg
|-- ima1_ceramic.png
|-- img2_paint.png
```

## Recursos

- Smooth scroll com Lenis
- Parallax com GSAP + ScrollTrigger
- Carrossel de depoimentos com Swiper
- Grid e utilitarios responsivos com Bootstrap 5.3.8
- FAQ accordion acessivel com `aria-expanded`
- Imagens locais do projeto
- Formulario demonstrativo pronto para conectar a um servico real

## Rodar localmente

Abra o `index.html` no navegador ou sirva a pasta com um servidor estatico:

```powershell
python -m http.server 5500
```

Depois acesse:

```text
http://localhost:5500
```

## Publicacao

Por ser um site estatico, pode ser publicado em GitHub Pages, Netlify, Vercel, Cloudflare Pages ou qualquer hospedagem que sirva HTML/CSS/JS.

## Pontos para producao

- Trocar `hello@street-detailing.example` por um email real.
- Conectar o formulario a Formspree, Web3Forms, Getform ou backend proprio.
- Converter imagens grandes para WebP/AVIF para melhorar carregamento.
- Definir links reais para agenda, Instagram ou WhatsApp.
