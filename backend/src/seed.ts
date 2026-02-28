import type { Core } from "@strapi/strapi";

const TEA_TYPES = [
  { name: "Thé vert", slug: "the-vert" },
  { name: "Thé noir", slug: "the-noir" },
  { name: "Thé blanc", slug: "the-blanc" },
  { name: "Oolong", slug: "oolong" },
  { name: "Matcha", slug: "matcha" },
  { name: "Rooibos", slug: "rooibos" },
];

const TEAS = [
  {
    name: "Sencha Japonais",
    slug: "sencha-japonais",
    excerpt:
      "Un thé vert japonais emblématique aux notes végétales fraîches et légèrement umami, idéal pour une pause revitalisante.",
    infusionTime: 2,
    temperature: 75,
    dose: "2g pour 200ml",
    teaTypes: ["the-vert"],
    dynamicZone: [
      {
        __component: "dynamic-zone.key-facts",
        title: "Caractéristiques",
        facts: [
          { label: "Origine", value: "Japon" },
          { label: "Récolte", value: "Premier flush (Ichibancha)" },
          { label: "Température", value: "70–75 °C" },
          { label: "Infusion", value: "1 à 2 minutes" },
          { label: "Caféine", value: "Moyenne" },
          { label: "Saveur", value: "Végétale, umami, douce" },
        ],
      },
      {
        __component: "dynamic-zone.rich-text",
        content: [
          {
            type: "heading",
            level: 2,
            children: [{ type: "text", text: "L'art du Sencha" }],
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Le Sencha est le thé vert le plus consommé au Japon, représentant près de 80 % de la production nationale. Ses feuilles sont récoltées au printemps, rapidement étuvées pour fixer leur couleur verte et préserver leurs antioxydants, puis roulées en fines aiguilles.",
              },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: 'Le nom "Sencha" signifie littéralement "thé infusé" en japonais, pour le distinguer du matcha qui se consomme en poudre dissoute. Sa liqueur est d\'un vert lumineux, avec un arôme herbacé qui rappelle les jardins du printemps.',
              },
            ],
          },
        ],
      },
      {
        __component: "dynamic-zone.quote",
        text: "Le Sencha est une conversation entre la nature et le palais — simple, honnête, profond.",
        author: "Maître de thé, Uji, Japon",
      },
    ],
  },
  {
    name: "Darjeeling Premier Flush",
    slug: "darjeeling-premier-flush",
    excerpt:
      "Surnommé le « champagne des thés », ce grand cru indien offre des arômes floraux et muscatés d'une finesse incomparable.",
    infusionTime: 3,
    temperature: 90,
    dose: "2,5g pour 200ml",
    teaTypes: ["the-noir"],
    dynamicZone: [
      {
        __component: "dynamic-zone.illustration-section",
        title: { text: "Le joyau de l'Himalaya", as: "h2" },
        paragraph: {
          text: "Les jardins de Darjeeling s'étendent entre 600 et 2 000 mètres d'altitude, dans les contreforts himalayens du Bengale-Occidental. Ce terroir unique, conjugué au brouillard matinal et aux nuits fraîches, confère au thé ses arômes floraux distinctifs.",
        },
      },
      {
        __component: "dynamic-zone.key-facts",
        title: "Fiche technique",
        facts: [
          { label: "Origine", value: "Darjeeling, Inde" },
          { label: "Altitude", value: "1 200 – 2 000 m" },
          { label: "Récolte", value: "Mars – Avril" },
          { label: "Température", value: "85 – 90 °C" },
          { label: "Infusion", value: "3 minutes" },
          { label: "Caractère", value: "Floral, muscaté, astringent" },
        ],
      },
      {
        __component: "dynamic-zone.quote",
        text: "Un seul thé de Darjeeling bien infusé suffit à changer complètement le cours d'une journée.",
        author: "Anne-Sophie Pic",
      },
    ],
  },
  {
    name: "Bai Hao Yin Zhen (Aiguilles d'Argent)",
    slug: "bai-hao-yin-zhen",
    excerpt:
      "Le roi des thés blancs, composé uniquement de bourgeons duveteux récoltés au printemps dans la province du Fujian.",
    infusionTime: 5,
    temperature: 75,
    dose: "3g pour 200ml",
    teaTypes: ["the-blanc"],
    dynamicZone: [
      {
        __component: "dynamic-zone.rich-text",
        content: [
          {
            type: "heading",
            level: 2,
            children: [
              {
                type: "text",
                text: "Le trésor blanc de Fujian",
              },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Le Bai Hao Yin Zhen, ou « Aiguilles d'Argent », est composé exclusivement de bourgeons cueillis avant l'éclosion, recouverts d'un fin duvet argenté. Cette sélection rigoureuse se fait seulement deux jours par an, par beau temps, à la main.",
              },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Sa liqueur pâle et délicate exhale des notes de miel frais, de melon et de fleurs blanches. Avec une teneur minimale en caféine, il peut être savouré à toute heure.",
              },
            ],
          },
        ],
      },
      {
        __component: "dynamic-zone.key-facts",
        title: "À savoir",
        facts: [
          { label: "Origine", value: "Fujian, Chine" },
          { label: "Partie utilisée", value: "Bourgeons uniquement" },
          { label: "Température", value: "70 – 75 °C" },
          { label: "Infusion", value: "4 à 5 minutes" },
          { label: "Caféine", value: "Très faible" },
          { label: "Saveur", value: "Miel, melon, fleurs blanches" },
        ],
      },
    ],
  },
  {
    name: "Dong Ding Oolong",
    slug: "dong-ding-oolong",
    excerpt:
      "Un oolong taïwanais torréfié aux notes de caramel, beurre et fleurs d'oranger, avec une longueur en bouche exceptionnelle.",
    infusionTime: 3,
    temperature: 90,
    dose: "4g pour 200ml",
    teaTypes: ["oolong"],
    dynamicZone: [
      {
        __component: "dynamic-zone.illustration-section",
        title: { text: "Le « pic glacé » de Taïwan", as: "h2" },
        paragraph: {
          text: "Dong Ding signifie littéralement « pic glacé » en mandarin. Ce célèbre Oolong provient des montagnes brumeuses du centre de Taïwan, à environ 800 mètres d'altitude. Sa torréfaction partielle lui confère une richesse aromatique unique.",
        },
      },
      {
        __component: "dynamic-zone.key-facts",
        title: "Profil",
        facts: [
          { label: "Origine", value: "Nantou, Taïwan" },
          { label: "Oxydation", value: "30 – 40 %" },
          { label: "Température", value: "90 – 95 °C" },
          { label: "Infusions", value: "Jusqu'à 6 fois" },
          { label: "Caféine", value: "Modérée" },
          { label: "Saveur", value: "Caramel, beurre, fleurs d'oranger" },
        ],
      },
      {
        __component: "dynamic-zone.quote",
        text: "Le Dong Ding révèle un nouveau secret à chaque infusion. Patience et curiosité sont ses meilleurs compagnons.",
        author: "Conseiller en thé, Taipei",
      },
    ],
  },
  {
    name: "Matcha Cérémonial Uji",
    slug: "matcha-ceremonial-uji",
    excerpt:
      "Le matcha de grade cérémoniel d'Uji, vivifiant et umami, issu de théiers ombragés pendant 30 jours avant la récolte.",
    infusionTime: 1,
    temperature: 80,
    dose: "1,5g pour 80ml",
    teaTypes: ["matcha", "the-vert"],
    dynamicZone: [
      {
        __component: "dynamic-zone.rich-text",
        content: [
          {
            type: "heading",
            level: 2,
            children: [{ type: "text", text: "La cérémonie du thé en poudre" }],
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Le matcha cérémoniel est produit à partir de feuilles de théiers soigneusement ombrées pendant 20 à 30 jours avant la récolte. Cette privation de lumière stimule la production de chlorophylle et d'acides aminés, notamment la L-théanine, responsable de l'umami et de l'effet « éveil calme » caractéristique.",
              },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Après la cueillette, les feuilles sont étuvées, séchées puis finement moulues à la meule de granit. Un seul gramme de matcha représente une heure de broyage. Le résultat : une poudre d'un vert éclatant, soyeuse au palais.",
              },
            ],
          },
        ],
      },
      {
        __component: "dynamic-zone.key-facts",
        title: "Comment préparer le matcha",
        facts: [
          { label: "Eau", value: "80 °C (jamais bouillante)" },
          { label: "Quantité", value: "1 à 2 g (½ cuillère à thé)" },
          { label: "Volume", value: "60 – 80 ml" },
          { label: "Fouet", value: "Chasen (fouet bambou)" },
          { label: "Geste", value: "Mouvement en M ou W" },
          { label: "Texture cible", value: "Mousse fine et crémeuse" },
        ],
      },
      {
        __component: "dynamic-zone.cta-banner",
        title: "Découvrez notre sélection de matcha",
        description:
          "Des matchas de grade cérémoniel et culinaire, sourcés directement auprès de producteurs d'Uji et de Nishio.",
        link: {
          label: "Explorer la collection",
          URL: "/teas",
          target: "_self",
        },
      },
    ],
  },
  {
    name: "Rooibos Vanilla Dream",
    slug: "rooibos-vanilla-dream",
    excerpt:
      "Une infusion sud-africaine sans caféine aux notes de vanille douce et de caramel, parfaite à toute heure, même le soir.",
    infusionTime: 5,
    temperature: 100,
    dose: "2g pour 200ml",
    teaTypes: ["rooibos"],
    dynamicZone: [
      {
        __component: "dynamic-zone.illustration-section",
        title: { text: "La tisane rouge du Cederberg", as: "h2" },
        paragraph: {
          text: "Le Rooibos (« buisson rouge » en afrikaans) est une plante endémique de la région du Cederberg, au Cap-Occidental d'Afrique du Sud. Naturellement sans caféine et riche en antioxydants, il est chéri dans le monde entier pour sa douceur et sa polyvalence.",
        },
      },
      {
        __component: "dynamic-zone.key-facts",
        title: "Atouts santé",
        facts: [
          { label: "Caféine", value: "0 mg" },
          { label: "Antioxydants", value: "Aspalathine (unique)" },
          { label: "Fer", value: "N'inhibe pas l'absorption" },
          { label: "Moment idéal", value: "Toute la journée" },
          { label: "Saveur", value: "Vanille, caramel, miel" },
          { label: "Compatible", value: "Lait, épices, citron" },
        ],
      },
      {
        __component: "dynamic-zone.quote",
        text: "Le Rooibos est comme un câlin dans une tasse — réconfortant, chaleureux et toujours là pour toi.",
        author: "Camille, fondatrice de l'atelier",
      },
    ],
  },
  {
    name: "Gyokuro Première Nuit",
    slug: "gyokuro-premiere-nuit",
    excerpt:
      "Le plus noble des thés verts japonais, cultivé dans l'ombre pendant 3 semaines pour des saveurs umami profondes et une douceur soyeuse.",
    infusionTime: 2,
    temperature: 60,
    dose: "4g pour 100ml",
    teaTypes: ["the-vert"],
    dynamicZone: [
      {
        __component: "dynamic-zone.rich-text",
        content: [
          {
            type: "heading",
            level: 2,
            children: [
              { type: "text", text: "L'ombre comme secret de fabrication" },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Le Gyokuro est le thé vert le plus précieux du Japon. Ses théiers sont ombragés par des nattes de bambou pendant 20 à 30 jours avant la récolte, réduisant la photosynthèse à 10 % de son niveau habituel. Ce stress contrôlé concentre les sucres naturels, la L-théanine et la chlorophylle dans les feuilles.",
              },
            ],
          },
        ],
      },
      {
        __component: "dynamic-zone.key-facts",
        title: "Préparation idéale",
        facts: [
          { label: "Eau", value: "50 – 60 °C" },
          { label: "Quantité", value: "4 g pour 60 – 100 ml" },
          { label: "Durée", value: "1 min 30 s à 2 min" },
          { label: "Infusions", value: "2 à 3 fois" },
          { label: "Couleur", value: "Vert jade profond" },
          { label: "Saveur", value: "Umami intense, algues, sucré" },
        ],
      },
    ],
  },
  {
    name: "Assam TGFOP",
    slug: "assam-tgfop",
    excerpt:
      "Un thé noir indien puissant et malteux, idéal au petit-déjeuner avec un nuage de lait. La base parfaite pour un chai maison.",
    infusionTime: 4,
    temperature: 95,
    dose: "3g pour 200ml",
    teaTypes: ["the-noir"],
    dynamicZone: [
      {
        __component: "dynamic-zone.illustration-section",
        title: { text: "La vallée de Brahmaputra", as: "h2" },
        paragraph: {
          text: "La région d'Assam, bercée par le fleuve Brahmaputra dans le nord-est de l'Inde, produit plus de thé que n'importe quelle autre région au monde. Son climat tropical, chaud et humide, génère des feuilles denses et riches en huiles essentielles, sources de sa saveur robuste et maltée.",
        },
      },
      {
        __component: "dynamic-zone.key-facts",
        title: "Composition",
        facts: [
          {
            label: "Grade",
            value: "TGFOP (Tippy Golden Flowery Orange Pekoe)",
          },
          { label: "Origine", value: "Assam, Inde" },
          { label: "Température", value: "90 – 95 °C" },
          { label: "Infusion", value: "3 à 4 minutes" },
          { label: "Avec lait", value: "Excellent" },
          { label: "Saveur", value: "Malté, amer, robuste" },
        ],
      },
      {
        __component: "dynamic-zone.cta-banner",
        title: "Tentez le chai maison",
        description:
          "L'Assam est la base idéale pour préparer un chai traditionnel. Faites infuser avec du lait, de la cannelle, du gingembre, de la cardamome et du poivre noir.",
        link: {
          label: "Voir nos recettes",
          URL: "/teas",
          target: "_self",
        },
      },
    ],
  },
];

async function seedTeaTypes(strapi: Core.Strapi) {
  const created: Record<string, string> = {};

  for (const type of TEA_TYPES) {
    const existing = await strapi
      .documents("api::tea-type.tea-type")
      .findFirst({
        filters: { slug: type.slug },
      });

    if (existing) {
      created[type.slug] = existing.documentId;
      continue;
    }

    const doc = await strapi.documents("api::tea-type.tea-type").create({
      data: { name: type.name, slug: type.slug },
      status: "published",
    });

    created[type.slug] = doc.documentId;
    strapi.log.info(`[seed] Tea type created: ${type.name}`);
  }

  return created;
}

async function seedTeas(
  strapi: Core.Strapi,
  teaTypeIds: Record<string, string>,
) {
  for (const tea of TEAS) {
    const existing = await strapi.documents("api::tea.tea").findFirst({
      filters: { slug: tea.slug },
    });

    if (existing) {
      strapi.log.info(`[seed] Tea already exists, skipping: ${tea.name}`);
      continue;
    }

    const teaTypeDocIds = tea.teaTypes
      .map(slug => teaTypeIds[slug])
      .filter(Boolean)
      .map(documentId => ({ documentId }));

    await strapi.documents("api::tea.tea").create({
      data: {
        name: tea.name,
        slug: tea.slug,
        excerpt: tea.excerpt,
        infusionTime: tea.infusionTime,
        temperature: tea.temperature,
        dose: tea.dose,
        tea_types: { connect: teaTypeDocIds },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dynamicZone: tea.dynamicZone as any,
      },
      status: "published",
    });

    strapi.log.info(`[seed] Tea created: ${tea.name}`);
  }
}

export async function seed(strapi: Core.Strapi) {
  strapi.log.info("[seed] Starting database seed...");

  const teaTypeIds = await seedTeaTypes(strapi);
  await seedTeas(strapi, teaTypeIds);
  await seedStores(strapi);
  await seedPermissions(strapi);

  strapi.log.info("[seed] Database seed complete.");
}

async function seedPermissions(strapi: Core.Strapi) {
  // Grant "favorite.toggle" to the Authenticated role
  const authenticatedRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "authenticated" } });

  if (!authenticatedRole) {
    strapi.log.warn(
      "[seed] Authenticated role not found, skipping permissions",
    );
    return;
  }

  const action = "api::tea.favorite.toggle";

  const existing = await strapi.db
    .query("plugin::users-permissions.permission")
    .findOne({ where: { action, role: authenticatedRole.id } });

  if (existing) {
    if (!existing.enabled) {
      await strapi.db.query("plugin::users-permissions.permission").update({
        where: { id: existing.id },
        data: { enabled: true },
      });
      strapi.log.info(`[seed] Permission enabled: ${action}`);
    } else {
      strapi.log.info(`[seed] Permission already enabled: ${action}`);
    }
    return;
  }

  await strapi.db.query("plugin::users-permissions.permission").create({
    data: { action, role: authenticatedRole.id, enabled: true },
  });
  strapi.log.info(`[seed] Permission created: ${action}`);
}

const STORES: Array<{
  name: string;
  link: {
    label: string;
    URL: string;
    target: "_blank" | "_self" | "_parent" | "_top" | "none";
  };
}> = [
  {
    name: "Palais des Thés",
    link: {
      label: "Visiter",
      URL: "https://www.palaisdesthes.com",
      target: "_blank",
    },
  },
  {
    name: "Mariage Frères",
    link: {
      label: "Visiter",
      URL: "https://www.mariagefreres.com",
      target: "_blank",
    },
  },
  {
    name: "Dammann Frères",
    link: { label: "Visiter", URL: "https://www.dammann.fr", target: "_blank" },
  },
  {
    name: "Comptoir Français du Thé",
    link: {
      label: "Visiter",
      URL: "https://www.comptoirfrancaisduthe.com",
      target: "_blank",
    },
  },
  {
    name: "Théodor",
    link: { label: "Visiter", URL: "https://www.theodor.fr", target: "_blank" },
  },
  {
    name: "O Thé Nature",
    link: {
      label: "Visiter",
      URL: "https://www.othenature.fr",
      target: "_blank",
    },
  },
];

async function seedStores(strapi: Core.Strapi) {
  for (const store of STORES) {
    const existing = await strapi.documents("api::store.store").findFirst({
      filters: { name: store.name },
    });

    if (existing) {
      strapi.log.info(`[seed] Store already exists, skipping: ${store.name}`);
      continue;
    }

    await strapi.documents("api::store.store").create({
      data: {
        name: store.name,
        link: store.link,
      },
      status: "published",
    });

    strapi.log.info(`[seed] Store created: ${store.name}`);
  }
}
