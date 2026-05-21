# AURIX Detailing

Site estático em HTML + CSS + JavaScript puro, inspirado no saiibuauto.com.

## Estrutura

```
detail/
├── index.html         Página única com todas as seções
├── css/style.css      Tema, layout e animações (fadeIn / slideIn / hover)
├── js/main.js         Lenis (smooth scroll), GSAP ScrollTrigger (parallax),
│                      Swiper (carrossel), FAQ accordion, header on-scroll
├── .nojekyll          Sinaliza ao GitHub Pages para não processar com Jekyll
└── README.md
```

Libs externas são carregadas via CDN (jsDelivr): Lenis, GSAP, ScrollTrigger, Swiper.
Fontes via Google Fonts: **Manrope** (corpo) e **Orbitron** (display).

## Rodar localmente

Como o site usa fetch de fontes/scripts via HTTPS, abrir o `index.html` direto pelo
explorer funciona, mas alguns navegadores limitam módulos via `file://`. O ideal
é servir com qualquer servidor estático:

```powershell
# Opção 1 (qualquer máquina com Node)
npx http-server . -p 5500

# Opção 2 (Python instalado)
python -m http.server 5500
```

Depois abra `http://localhost:5500`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `aurix-detail`, **Public**).
2. Dentro desta pasta, suba o código:

   ```powershell
   git add .
   git commit -m "feat: site AURIX inicial"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/aurix-detail.git
   git push -u origin main
   ```

3. No GitHub, vá em **Settings → Pages**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `/ (root)`
   - Salve.

4. Aguarde ~1 min. Sua URL fica em:
   `https://SEU-USUARIO.github.io/aurix-detail/`

Por ser HTML puro, **não precisa de build nem GitHub Actions**.

## Editar conteúdo

- **Textos / preços / serviços:** todo o conteúdo está no `index.html`. Não tem
  framework — é só Ctrl+F e editar.
- **Imagens:** atualmente uso placeholders do `picsum.photos`. Para usar imagens
  reais, crie uma pasta `assets/` e troque os `src` dos `<img>`.
- **Cores / fontes:** todas as cores estão como CSS variables no topo do
  `css/style.css` (`--ink`, `--bone`, `--accent`, etc.). Mude lá e o site inteiro
  reflete.
- **Animações:**
  - Velocidade dos parallax: atributos `data-parallax-y="-120"` ou
    `data-parallax-x="60"` nos elementos (números em px).
  - Tempo da entrada (`fadeInUp`, etc.): no fim do `style.css`.
  - Velocidade do carrossel: bloco `new Swiper(...)` no `main.js`.

## Formulário do footer

Hoje só faz `alert()` de demonstração. Para envios reais sem backend, plugue em:

- [Formspree](https://formspree.io/) — gratuito até 50 envios/mês
- [Web3Forms](https://web3forms.com/) — gratuito, ilimitado
- [Getform](https://getform.io/)

Basta trocar o atributo `action` do `<form>` pelo endpoint deles e remover o
`onsubmit` que tem hoje.
