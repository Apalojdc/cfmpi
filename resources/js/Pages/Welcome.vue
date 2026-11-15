<script setup>
import { ref } from 'vue'
import NavBar from '@/Components/NavBar.vue'
import Hero from '@/Components/Hero.vue'

// Menu mobile : true = ouvert, false = fermé
const menuOuvert = ref(false)

// ----- Données de la page (modifie ici, le template se met à jour) -----
const contact = {
  tel: '07 49 68 92 49',
  telHref: 'tel:+2250749689249',
  email: 'diallofousseni863@gmail.com',
  adresse: 'Riviera Faya, non loin du CHU de Cocody, Abidjan – Côte d’Ivoire',
}

const liensMenu = [
  { label: 'Formations', href: '#formations' },
  { label: 'Pour qui ?', href: '#pourqui' },
  { label: 'Nos atouts', href: '#atouts' },
  { label: 'Le CFMPI', href: '#apropos' },
  { label: 'Actualités', href: '#actus' },
]

// Domaines (utilisés par le Hero)
const filieres = [
  { label: 'Maintenance industrielle', href: '#formations' },
  { label: 'Production industrielle', href: '#formations' },
]

// Cartes du Hero : icone = 'chapeau' | 'engrenage' | 'croissance' | 'attestation'
const atoutsHero = [
  { icone: 'chapeau', titre: 'Formations pratiques', description: 'Des formations 100 % pratiques, sur des plateaux techniques équipés et modernes.' },
  { icone: 'engrenage', titre: 'Formateurs experts', description: 'Un encadrement par des professionnels de l’industrie et un suivi personnalisé.' },
  { icone: 'croissance', titre: 'Insertion professionnelle', description: 'Un accompagnement pour trouver un emploi, vous reconvertir ou évoluer.' },
  { icone: 'attestation', titre: 'Attestation de fin de formation', description: 'Une attestation vous est remise à l’issue de votre formation.' },
]

// Liste des formations : 1 objet = 1 card
const formations = [
  // --- Maintenance industrielle ---
  { domaine: 'Maintenance industrielle', titre: 'Maintenance mécanique industrielle', texte: 'Entretien, réglage et remise en état des organes mécaniques des équipements industriels.' },
  { domaine: 'Maintenance industrielle', titre: 'Maintenance électrique industrielle', texte: 'Installations, armoires et moteurs électriques : maintenir et sécuriser en atelier.' },
  { domaine: 'Maintenance industrielle', titre: 'Maintenance électromécanique', texte: 'Le lien entre mécanique et électricité pour intervenir sur des machines complètes.' },
  { domaine: 'Maintenance industrielle', titre: 'Automatisme industriel', texte: 'Comprendre, câbler et dépanner les systèmes automatisés d’une ligne de production.' },
  { domaine: 'Maintenance industrielle', titre: 'Diagnostic et dépannage des équipements', texte: 'Repérer l’origine d’une panne et remettre l’équipement en service rapidement.' },
  { domaine: 'Maintenance industrielle', titre: 'Maintenance préventive et améliorative', texte: 'Planifier les interventions pour éviter les pannes et améliorer la fiabilité.' },
  // --- Production industrielle ---
  { domaine: 'Production industrielle', titre: 'Conduite et surveillance des procédés industriels', texte: 'Piloter une installation, suivre les paramètres et réagir aux écarts.' },
  { domaine: 'Production industrielle', titre: 'Gestion de la production', texte: 'Organiser les flux, les équipes et les ressources pour tenir les objectifs.' },
  { domaine: 'Production industrielle', titre: 'Qualité et amélioration continue', texte: 'Contrôler la qualité et mettre en place des actions d’amélioration durables.' },
  { domaine: 'Production industrielle', titre: 'Sécurité, hygiène et environnement industriel', texte: 'Appliquer les règles SHE pour protéger les personnes et le site.' },
  { domaine: 'Production industrielle', titre: 'Lecture et interprétation de plans industriels', texte: 'Lire schémas et plans pour comprendre, monter et intervenir sur une installation.' },
]

const publicCible = [
  'Jeunes diplômés,',
  'techniciens et agents en activité,',
  'demandeurs d’emploi,',
  'toute personne souhaitant se reconvertir ou monter en compétences.',
]

const atouts = [
  'Formations 100 % pratiques,',
  'plateaux techniques équipés et modernes,',
  'encadrement par des professionnels,',
  'suivi personnalisé,',
  'accompagnement à l’insertion professionnelle.',
]

// Remplace ces actualités par les vraies (image dans public/img/actus/)
const actualites = [
  { date: 'Novembre 2026', titre: 'Ouverture des inscriptions', image: '/img/actualite/inscription.png', href: '#contact' },
  { date: 'Novembre 2026', titre: 'Nos plateaux techniques en images', image: '/img/actualite/laboratoire.png', href: '#contact' },
  { date: 'Novembre 2026', titre: 'Rencontre avec nos formateurs experts', image: '/img/actualite/rencontre.png', href: '#contact' },
]

const chiffres = [
  { valeur: '100 %', label: 'Formations pratiques' },
  { valeur: String(formations.length), label: 'Formations disponibles' },
  { valeur: '2', label: 'Domaines : maintenance et production' },
]
</script>

<template>
  <div class="cfmpi-page">
    <NavBar/>
    <main>
      <Hero :filieres="filieres" :atouts="atoutsHero"/>

      <!-- Formations -->
      <section id="formations">
        <div class="wrap">
          <h2>Nos domaines de formation</h2>
          <p class="sub">Maintenance industrielle et production industrielle : choisissez la formation qui correspond à votre projet.</p>
          <div class="grid gf">
            <article v-for="f in formations" :key="f.titre" class="card big">
              <span class="tag" :class="{ prod: f.domaine === 'Production industrielle' }">{{ f.domaine }}</span>
              <h3>{{ f.titre }}</h3>
              <p class="meta">{{ f.texte }}</p>
              <a class="more" href="#contact">S’inscrire à cette formation →</a>
            </article>
            <article class="card big help">
              <h3>Une autre question ?</h3>
              <p class="meta">Appelez-nous ou écrivez-nous : nous vous aidons à choisir la formation adaptée à votre parcours.</p>
              <a class="btn" :href="contact.telHref">Appeler le {{ contact.tel }}</a>
            </article>
          </div>
        </div>
      </section>

      <!-- Pour qui / Atouts -->
      <section id="pourqui" class="soft">
        <div class="wrap grid g2">
          <div class="split">
            <h2>Pour qui ?</h2>
            <p class="sub">Les formations du CFMPI s’adressent à :</p>
            <ul><li v-for="t in publicCible" :key="t">{{ t }}</li></ul>
            <a class="btn line" href="#contact">Nous contacter</a>
          </div>
          <div id="atouts" class="split">
            <h2>Nos atouts</h2>
            <p class="sub">Ce qui fait la différence au CFMPI :</p>
            <ul><li v-for="t in atouts" :key="t">{{ t }}</li></ul>
            <a class="btn line" href="#contact">S’inscrire</a>
          </div>
        </div>
      </section>

      <!-- Actualités -->
      <section id="actus" class="news">
        <div class="wrap">
          <h2>Les actualités</h2>
          <p class="sub">Suivez la vie du centre et nos prochaines sessions.</p>
          <div class="grid g3">
            <article v-for="a in actualites" :key="a.titre" class="card news-card">
              <img :src="a.image" :alt="a.titre" class="news-img" loading="lazy">
              <div class="news-body">
                <span class="date">{{ a.date }}</span>
                <h3>{{ a.titre }}</h3>
                <a class="more" :href="a.href">Lire →</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- À propos : image à gauche, texte à droite -->
      <section id="apropos" class="soft">
        <div class="wrap about">
          <img src="/img/hero.png" alt="Formation pratique au CFMPI" class="about-img" loading="lazy">
          <div class="split">
            <h2>À propos du CFMPI</h2>
            <p class="sub">
              Le CFMPI, cabinet de formation professionnelle en maintenance et production industrielle,
              vous accompagne avec des formations pratiques, modernes et adaptées aux besoins des
              entreprises industrielles. Vous êtes encadré par des professionnels et formés sur des
              plateaux techniques équipés, avec une attestation à la fin de votre formation.
            </p>
            <a class="btn" href="#contact">Nous contacter</a>
          </div>
        </div>
      </section>

      <!-- Chiffres clés -->
      <section class="stats">
        <div class="wrap">
          <div class="grid">
            <div v-for="c in chiffres" :key="c.label">
              <strong>{{ c.valeur }}</strong>
              <span>{{ c.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Inscription -->
      <section id="contact">
        <div class="wrap">
          <div class="cta">
            <div>
              <h2>Inscrivez-vous dès maintenant !</h2>
              <p>Des formations pour un métier, un avenir, une réussite. La compétence d’aujourd’hui, l’industrie de demain.</p>
            </div>
            <a class="btn" :href="contact.telHref">Appeler le {{ contact.tel }}</a>
          </div>
        </div>
      </section>
    </main>

    <!-- Pied de page -->
    <footer>
      <div class="wrap">
        <div class="grid">
          <div>
            <a class="logo" href="#">
              <img src="/img/logo/logo.png" alt="CFMPI" class="logo-img">
            </a>
            <p class="logo-text">CABINET DE FORMATION PROFESSIONNELLE EN <span>MAINTENANCE</span> ET <span>PRODUCTION</span> INDUSTRIELLE</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              <li v-for="l in liensMenu" :key="l.href"><a :href="l.href">{{ l.label }}</a></li>
            </ul>
          </div>
          <div>
            <h4>Domaines</h4>
            <ul>
              <li><a href="#formations">Maintenance industrielle</a></li>
              <li><a href="#formations">Production industrielle</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Cocody, Abidjan – Côte d’Ivoire</li>
              <li>{{ contact.adresse }}</li>
              <li><a :href="contact.telHref">{{ contact.tel }}</a></li>
              <li><a :href="'mailto:' + contact.email">{{ contact.email }}</a></li>
            </ul>
          </div>
        </div>
        <div class="copy">© CFMPI, Cabinet de formation professionnelle – Côte d’Ivoire</div>
      </div>
    </footer>
  </div>
</template>

<!-- Défilement doux : doit être sur <html>, donc hors "scoped" -->
<style>
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
</style>

<style scoped>
.cfmpi-page {
  --text: #14213a; --muted: #5a667c; --line: #e3e8f0; --soft: #f4f7fb;
  --primary: #0b3d91; --accent: #f28c00; --dark: #0a2552;
  background: #fff; color: var(--text);
  font: 16px/1.65 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
.cfmpi-page *, .cfmpi-page *::before, .cfmpi-page *::after { box-sizing: border-box; }
a { color: inherit; }
.wrap { width: 100%; max-width: 1240px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 40px); }

/* Bandeau + en-tête */
.top { background: var(--dark); color: #fff; font-size: 14px; }
.top .wrap { display: flex; justify-content: flex-end; gap: 24px; padding-top: 8px; padding-bottom: 8px; }
.top a { text-decoration: none; }
header { position: sticky; top: 0; z-index: 10; background: #fff; border-bottom: 1px solid var(--line); }
header .wrap { display: flex; align-items: center; justify-content: space-between; gap: 16px; height: 72px; }
.logo { font-weight: 800; font-size: 28px; letter-spacing: .04em; color: var(--primary); text-decoration: none; }
.logo span { color: var(--accent); }
.burger { display: none; background: none; border: 0; cursor: pointer; font-size: 28px; line-height: 1; padding: 6px 10px; color: var(--text); }
nav ul { list-style: none; margin: 0; padding: 0; display: flex; align-items: center; gap: 4px; }
nav a { display: block; padding: 10px 14px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; }
nav a:hover { background: var(--soft); }
nav a.cta-nav { background: var(--accent); color: #1a1100; margin-left: 8px; }

/* Boutons */
.btn { display: inline-block; border: 0; cursor: pointer; background: var(--accent); color: #1a1100; font: 700 15px/1 inherit; font-family: inherit; padding: 15px 26px; border-radius: 10px; text-decoration: none; }
.btn:hover { filter: brightness(1.07); }
.btn.line { background: #fff; border: 2px solid var(--primary); color: var(--primary); padding: 13px 24px; }

/* Hero */
.hero { background: var(--soft); padding: clamp(40px, 7vw, 96px) 0; border-bottom: 1px solid var(--line); }
.hero .wrap { display: grid; grid-template-columns: 1.25fr 1fr; gap: clamp(24px, 4vw, 64px); align-items: center; }
.badge { display: inline-block; background: #fff4e0; color: #9a5a00; padding: 6px 14px; border-radius: 99px; font-size: 14px; font-weight: 600; margin-bottom: 18px; }
.hero h1 { font-size: clamp(30px, 4.4vw, 56px); line-height: 1.1; margin: 0 0 16px; color: var(--dark); }
.hero .lead { font-size: clamp(16px, 1.5vw, 19px); color: var(--muted); margin: 0 0 28px; max-width: 560px; }
.search { display: flex; gap: 10px; background: #fff; border: 1px solid var(--line); padding: 8px; border-radius: 14px; box-shadow: 0 8px 24px rgba(10, 37, 82, .08); max-width: 580px; }
.search input { flex: 1; min-width: 0; border: 0; font: inherit; color: var(--text); padding: 10px 12px; outline: none; background: transparent; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; max-width: 580px; }
.chips a { font-size: 13px; text-decoration: none; border: 1px solid var(--line); background: #fff; padding: 6px 12px; border-radius: 99px; }
.chips a:hover { border-color: var(--primary); color: var(--primary); }
.panel { background: var(--dark); color: #fff; border-radius: 22px; padding: clamp(24px, 3vw, 40px); box-shadow: 0 20px 40px rgba(10, 37, 82, .25); }
.panel h2 { color: #fff; font-size: 20px; margin: 0 0 4px; }
.panel h2::after { display: none; }
.panel p { margin: 0 0 20px; opacity: .75; font-size: 14px; }
.row { display: flex; justify-content: space-between; gap: 12px; padding: 14px 0; border-top: 1px solid rgba(255, 255, 255, .15); }
.row b { display: block; font-size: 15px; line-height: 1.35; }
.row small { opacity: .7; }
.row em { font-style: normal; font-weight: 800; color: var(--accent); white-space: nowrap; }

/* Sections */
section { padding: clamp(48px, 6vw, 88px) 0; }
h2 { font-size: clamp(26px, 3vw, 38px); margin: 0 0 8px; line-height: 1.2; color: var(--dark); }
h2::after { content: ""; display: block; width: 52px; height: 4px; border-radius: 2px; background: var(--accent); margin-top: 12px; }
.sub { color: var(--muted); margin: 14px 0 32px; max-width: 700px; }
.grid { display: grid; gap: 24px; }
.g3 { grid-template-columns: repeat(3, 1fr); }
.g4 { grid-template-columns: repeat(4, 1fr); }
.g2 { grid-template-columns: repeat(2, 1fr); gap: clamp(24px, 5vw, 72px); }
.gf { grid-template-columns: repeat(2, 1fr); gap: 28px; }
.soft { background: var(--soft); }
.card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 8px; transition: box-shadow .2s, transform .2s; }
.card:hover { box-shadow: 0 12px 28px rgba(10, 37, 82, .1); transform: translateY(-2px); }
.card h3 { margin: 0; font-size: 18px; line-height: 1.3; color: var(--dark); }
.card a.more { margin-top: auto; font-weight: 600; color: var(--primary); text-decoration: none; }
.meta { color: var(--muted); font-size: 14px; margin: 0; }
.split ul { padding-left: 20px; color: var(--muted); margin: 0 0 24px; }
.split li { margin: 8px 0; }

/* Grandes cards de formations (2 par ligne) */
.card.big { padding: clamp(24px, 3vw, 36px); gap: 12px; min-height: 240px; border-left: 5px solid var(--primary); }
.card.big h3 { font-size: clamp(20px, 2vw, 24px); }
.card.big .meta { font-size: 16px; }
.card.big a.more { padding-top: 12px; }
.tag { align-self: flex-start; background: #e8efff; color: var(--primary); padding: 5px 12px; border-radius: 99px; font-size: 13px; font-weight: 600; }
.tag.prod { background: #fff4e0; color: #9a5a00; }
.card.big:has(.tag.prod) { border-left-color: var(--accent); }
.card.help { background: var(--dark); border-color: var(--dark); border-left-color: var(--accent); justify-content: center; align-items: flex-start; }
.card.help h3 { color: #fff; }
.card.help .meta { color: rgba(255, 255, 255, .8); }

/* Actualités avec images */
.news-card { padding: 0; overflow: hidden; gap: 0; }
.news-img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; display: block; background: var(--soft); }
.news-body { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.news .date { color: var(--muted); font-size: 14px; }

/* À propos : image à gauche, texte à droite */
.about { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px, 5vw, 72px); align-items: center; }
.about-img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 22px; box-shadow: 0 20px 40px rgba(10, 37, 82, .18); display: block; background: #fff; }

/* Chiffres + CTA */
.stats { background: var(--dark); color: #fff; text-align: center; }
.stats .grid { grid-template-columns: repeat(3, 1fr); }
.stats strong { display: block; font-size: clamp(44px, 6vw, 72px); line-height: 1; color: var(--accent); }
.stats span { display: block; opacity: .85; margin-top: 8px; }
.cta { background: var(--soft); border: 1px solid var(--line); border-radius: 22px; padding: clamp(24px, 4vw, 48px); display: flex; flex-wrap: wrap; gap: 24px; align-items: center; justify-content: space-between; }
.cta p { margin: 12px 0 0; color: var(--muted); max-width: 640px; }

/* Pied de page */
footer { background: #fff; border-top: 1px solid var(--line); padding: 56px 0 28px; font-size: 14px; color: var(--muted); }
footer .grid { grid-template-columns: 1.4fr 1fr 1fr 1.2fr; }
footer h4 { color: var(--dark); margin: 0 0 12px; font-size: 15px; }
footer ul { list-style: none; margin: 0; padding: 0; }
footer li { margin: 8px 0; }
footer a { text-decoration: none; }
footer a:hover { color: var(--primary); }
.logo-img { width: 120px; height: auto; }
.logo-text { margin-top: 12px; font-size: 13px; line-height: 1.4; color: #000874; font-weight: bolder; }
.logo-text span { color: var(--accent); font-weight: 600; }
.copy { border-top: 1px solid var(--line); margin-top: 32px; padding-top: 18px; }

/* Responsive */
@media (max-width: 1000px) {
  .hero .wrap, .g2, .about { grid-template-columns: 1fr; }
  .g3, .g4 { grid-template-columns: repeat(2, 1fr); }
  footer .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 820px) {
  .burger { display: block; }
  nav { position: absolute; left: 0; right: 0; top: 100%; background: #fff; border-bottom: 1px solid var(--line); display: none; padding: 8px 16px 16px; }
  nav.ouvert { display: block; }
  nav ul { flex-direction: column; align-items: stretch; }
  nav a.cta-nav { margin: 8px 0 0; text-align: center; }
  .top .wrap { justify-content: center; gap: 16px; }
}
@media (max-width: 700px) {
  .gf { grid-template-columns: 1fr; }
  .card.big { min-height: 0; }
}
@media (max-width: 640px) {
  .g3, .g4, .stats .grid, footer .grid { grid-template-columns: 1fr; }
  .search { flex-direction: column; }
  .top a:nth-child(2) { display: none; }
}
</style>