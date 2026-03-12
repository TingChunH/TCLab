<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TC Lab | Research</title>
  <style>
    :root {
      --bg: #f7f8fb;
      --surface: #ffffff;
      --text: #111827;
      --muted: #6b7280;
      --line: #e5e7eb;
      --accent: #1f4b99;
      --accent-soft: #eaf0fb;
      --maxw: 1100px;
      --shadow: 0 10px 30px rgba(17, 24, 39, 0.06);
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }

    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      background: linear-gradient(180deg, #fbfcfe 0%, #f5f7fb 100%);
      color: var(--text);
      line-height: 1.75;
    }

    a { color: inherit; }

    .site-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(229, 231, 235, 0.9);
    }

    .nav-wrap {
      max-width: var(--maxw);
      margin: 0 auto;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 28px;
    }

    .site-brand {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      line-height: 1.1;
      flex-shrink: 0;
    }

    .site-brand-main {
      font-size: 1.08rem;
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .site-brand-sub {
      font-size: 0.8rem;
      color: var(--muted);
      margin-top: 3px;
    }

    .site-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      justify-content: flex-end;
    }

    .site-nav a {
      text-decoration: none;
      color: #374151;
      font-size: 0.96rem;
      font-weight: 500;
      padding: 6px 2px;
      border-bottom: 2px solid transparent;
      transition: color 0.18s ease, border-color 0.18s ease;
    }

    .site-nav a:hover,
    .site-nav a.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }

    .page-shell {
      max-width: var(--maxw);
      margin: 0 auto;
      padding: 48px 24px 80px;
    }

    .hero-card,
    .page-card {
      background: var(--surface);
      border: 1px solid rgba(229, 231, 235, 0.9);
      border-radius: 28px;
      box-shadow: var(--shadow);
      position: relative;
      overflow: hidden;
    }

    .hero-card {
      padding: 56px 48px;
      margin-bottom: 28px;
    }

    .hero-card::before {
      content: "";
      position: absolute;
      width: 320px;
      height: 320px;
      right: -80px;
      top: -80px;
      background: radial-gradient(circle, rgba(31, 75, 153, 0.12) 0%, rgba(31, 75, 153, 0.03) 45%, rgba(31, 75, 153, 0) 70%);
      pointer-events: none;
    }

    .hero-card::after {
      content: "";
      position: absolute;
      width: 260px;
      height: 260px;
      left: -90px;
      bottom: -90px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.10) 0%, rgba(99, 102, 241, 0.03) 45%, rgba(99, 102, 241, 0) 70%);
      pointer-events: none;
    }

    .hero-kicker {
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--muted);
      font-size: 0.82rem;
      font-weight: 700;
      margin-bottom: 14px;
    }

    .hero-title {
      font-size: clamp(2.4rem, 5vw, 4rem);
      line-height: 0.98;
      margin: 0;
      letter-spacing: -0.03em;
      max-width: 8ch;
    }

    .hero-subtitle {
      margin-top: 16px;
      font-size: 1.06rem;
      color: #374151;
      max-width: 760px;
    }

    .focus-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 24px;
    }

    .focus-pills span {
      color: var(--accent);
      background: var(--accent-soft);
      border: 1px solid rgba(31, 75, 153, 0.08);
      border-radius: 999px;
      padding: 9px 14px;
      font-size: 0.94rem;
      font-weight: 600;
    }

    .page-card {
      padding: 42px 36px;
    }

    .toc {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
    }

    .toc a {
      text-decoration: none;
      color: var(--accent);
      background: var(--accent-soft);
      border: 1px solid rgba(31, 75, 153, 0.08);
      border-radius: 999px;
      padding: 8px 13px;
      font-size: 0.92rem;
      font-weight: 600;
    }

    .section-block + .section-block {
      margin-top: 40px;
      padding-top: 36px;
      border-top: 1px solid var(--line);
    }

    .section-label {
      display: inline-block;
      margin-bottom: 10px;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .section-title {
      margin: 0 0 14px;
      font-size: clamp(1.65rem, 2.8vw, 2.2rem);
      letter-spacing: -0.02em;
    }

    .section-block p {
      margin: 0 0 16px;
      color: #374151;
      font-size: 1.02rem;
    }

    strong {
      color: var(--text);
    }

    .site-footer {
      border-top: 1px solid var(--line);
      background: transparent;
    }

    .footer-wrap {
      max-width: var(--maxw);
      margin: 0 auto;
      padding: 20px 24px 36px;
      color: var(--muted);
      font-size: 0.92rem;
    }

    @media (max-width: 900px) {
      .nav-wrap {
        flex-direction: column;
        align-items: flex-start;
      }

      .site-nav {
        justify-content: flex-start;
      }

      .hero-card {
        padding: 42px 28px;
      }

      .page-card {
        padding: 30px 22px;
      }
    }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="nav-wrap">
      <a href="#" class="site-brand">
        <span class="site-brand-main">TC Lab</span>
        <span class="site-brand-sub">Technology and Curiosity</span>
      </a>
      <nav class="site-nav">
        <a href="#">Home</a>
        <a href="#">PI</a>
        <a href="#" class="active">Research</a>
        <a href="#">Members</a>
        <a href="#">Publications</a>
        <a href="#">Teaching</a>
        <a href="#">Join Us</a>
      </nav>
    </div>
  </header>

  <main class="page-shell">
    <section class="hero-card">
      <div class="hero-kicker">Research</div>
      <h1 class="hero-title">Research Vision</h1>
      <p class="hero-subtitle">
        Our research explores how emerging materials and advanced device engineering can shape next-generation electronic technologies. By combining low-dimensional materials, semiconductor device design, and fundamental physics, we investigate how charge, spin, lattice, and interface effects interact at the nanoscale.
      </p>
      <div class="focus-pills">
        <span>2D Materials</span>
        <span>Spintronics</span>
        <span>Device Physics</span>
        <span>Synchrotron Studies</span>
      </div>
    </section>

    <section class="page-card">
      <nav class="toc">
        <a href="#vision">Vision</a>
        <a href="#materials">2D Materials</a>
        <a href="#devices">Electronic &amp; Spintronic Devices</a>
        <a href="#mechanisms">Fundamental Physical Mechanisms</a>
      </nav>

      <section id="vision" class="section-block">
        <span class="section-label">Overview</span>
        <h2 class="section-title">Research Vision</h2>
        <p>
          Our research explores how emerging materials and advanced device engineering can shape next-generation electronic technologies. By combining low-dimensional materials, semiconductor device design, and fundamental physics, we investigate how charge, spin, lattice, and interface effects interact at the nanoscale. These interactions often give rise to physical phenomena that cannot be observed in conventional bulk materials.
        </p>
        <p>
          By understanding these mechanisms, we aim to design and engineer nanoscale electronic and spintronic devices with improved efficiency, novel functionalities, and enhanced performance for future computing technologies.
        </p>
      </section>

      <section id="materials" class="section-block">
        <span class="section-label">Area 1</span>
        <h2 class="section-title">Two-Dimensional (2D) Materials</h2>
        <p>
          Two-dimensional (2D) materials are crystalline solids that are only a few atoms thick. Unlike conventional materials, their surfaces form atomically sharp interfaces without dangling bonds, making them ideal building blocks for clean heterostructures and novel device architectures. This property allows researchers to combine very different materials in ways that are difficult to achieve in conventional bulk systems.
        </p>
        <p>
          The field of 2D materials began with the discovery of <strong>graphene</strong>, a single layer of carbon atoms arranged in a honeycomb lattice. Graphene exhibits extraordinary properties, including extremely high electrical conductivity, exceptional mechanical strength, and unique quantum transport behavior. Its discovery opened a new frontier in condensed matter physics, nanotechnology, and advanced electronics.
        </p>
        <p>
          Following graphene, a large family of <strong>transition metal dichalcogenides (TMDCs)</strong> has attracted significant attention, including materials such as <strong>MoS₂</strong> and <strong>WS₂</strong>. Unlike graphene, many TMDCs are semiconductors with sizable bandgaps, making them promising candidates for transistors, photodetectors, and other electronic or optoelectronic devices. Their strong spin–orbit coupling and valley-related properties also provide exciting opportunities for exploring new quantum phenomena.
        </p>
        <p>
          More recently, the 2D material family has expanded to include <strong>nitrides and other emerging compounds</strong>, such as <strong>hexagonal boron nitride (h-BN)</strong>, <strong>AlN</strong>, <strong>MoN</strong>, and <strong>W₅N₆</strong>. These materials offer a wide range of functionalities, from atomically flat insulating layers and protective barriers to platforms with potentially novel electronic, magnetic, or superconducting properties.
        </p>
        <p>
          One of the most powerful features of 2D materials is that they can be assembled like <strong>Lego bricks</strong>. By stacking different atomic layers together, researchers can create <strong>van der Waals heterostructures</strong> in which each layer contributes a distinct function. These structures provide a versatile platform for studying interactions among charge, spin, lattice, and light, while also enabling new possibilities for electronic, spintronic, and quantum devices.
        </p>
      </section>

      <section id="devices" class="section-block">
        <span class="section-label">Area 2</span>
        <h2 class="section-title">Electronic and Spintronic Devices</h2>
        <p>
          Modern electronic devices operate by controlling the flow of charge in semiconductor materials. Transistors, diodes, and integrated circuits form the foundation of today’s information technologies, enabling computing, communication, and sensing systems that shape modern society. As device dimensions continue to shrink and performance demands increase, understanding charge transport at the nanoscale becomes increasingly important.
        </p>
        <p>
          Beyond conventional electronics, <strong>spintronics</strong> introduces an additional degree of freedom: the <strong>electron spin</strong>. While traditional devices rely solely on charge transport, spintronic devices utilize both charge and spin to store, process, and transmit information. This approach enables new functionalities such as non-volatile memory, magnetic sensing, and energy-efficient logic devices. Technologies such as <strong>magnetic tunnel junctions (MTJs)</strong> and <strong>spin valves</strong> have already demonstrated practical applications in modern memory and data storage systems.
        </p>
        <p>
          Two-dimensional materials provide exciting opportunities for advancing both electronic and spintronic devices. Their atomically thin nature allows precise control of interfaces and electronic structures, which is crucial for efficient charge transport and spin manipulation. When integrated with magnetic materials or engineered heterostructures, these systems can reveal new transport phenomena and enable novel device concepts.
        </p>
        <p>
          By integrating <strong>novel materials, interface engineering, and device physics</strong>, we aim to design next-generation electronic and spintronic devices that are faster, more energy-efficient, and capable of entirely new functionalities.
        </p>
      </section>

      <section id="mechanisms" class="section-block">
        <span class="section-label">Area 3</span>
        <h2 class="section-title">Fundamental Physical Mechanisms</h2>
        <p>
          To understand how electronic and spintronic devices operate at the microscopic level, our research focuses on uncovering the <strong>fundamental physical mechanisms</strong> governing charge and spin transport. We approach this challenge from three complementary perspectives: <strong>light, electricity, and magnetism</strong>.
        </p>
        <p>
          Optical techniques such as <strong>Raman spectroscopy</strong> allow us to probe lattice vibrations and interactions among electrons, phonons, and spins in low-dimensional materials. Electrical measurements, including <strong>Hall transport</strong> and <strong>magnetoresistance</strong>, reveal how electrons and spins move through materials and across interfaces. These experiments provide direct insight into carrier dynamics, spin transport, and the mechanisms that determine device performance.
        </p>
        <p>
          In addition to laboratory measurements, we integrate <strong>synchrotron radiation techniques</strong> to obtain deeper insights into material structures and electronic properties. Experiments performed at facilities such as the <strong>National Synchrotron Radiation Research Center (NSRRC)</strong> in Taiwan and <strong>SPring-8</strong> in Japan enable advanced characterizations including <strong>X-ray diffraction (XRD)</strong>, <strong>angle-resolved photoemission spectroscopy (ARPES)</strong>, and <strong>hard X-ray photoelectron spectroscopy (HAXPES)</strong>. These tools allow us to investigate crystal structures, electronic band structures, and interfacial electronic states with high precision.
        </p>
        <p>
          By combining optical, electrical, magnetic, and synchrotron-based techniques, we aim to build a comprehensive understanding of how materials, interfaces, and quantum effects interact. This knowledge provides the physical foundation for designing the next generation of electronic and spintronic devices.
        </p>
      </section>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-wrap">© TC Lab · Technology and Curiosity</div>
  </footer>
</body>
</html>
