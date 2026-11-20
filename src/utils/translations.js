export const translations = {
  fr: {
    nav: {
      hero: "Accueil",
      about: "À Propos",
      experience: "Parcours",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      menu: "Menu",
      changeLanguage: "Changer de langue"
    },
    hero: {
      greeting: "Bonjour, je suis",
      role1: "Étudiant en Ingénierie Informatique",
      role2: "Passionné de Programmation",
      role3: "Passionné d'Intelligence Artificielle",
      role4: "Administrateur Réseau",
      description: "Je conçois des solutions logicielles modernes et innovantes, alliant programmation, administration réseau et intelligence artificielle.",
      viewProjects: "Voir mes projets",
      contactMe: "Me contacter",
      downloadCV: "Télécharger CV"
    },
    about: {
      title: "À Propos",
      subtitle: "Passionné par le code & l'IA",
      bio1: "En tant qu'étudiant en ingénierie informatique, je me passionne pour le développement logiciel et les technologies émergentes comme l'intelligence artificielle. J'aime concevoir des solutions innovantes et structurées.",
      bio2: "Fort d'une expérience en administration réseau, j'ai acquis des compétences concrètes en gestion d'infrastructure, en résolution de pannes et en support technique pour assurer la continuité des opérations.",
      stats: {
        exp: "an d'expérience",
        education: "niveaux de formation",
        languages: "langues parlées"
      },
      downloadCV: "Télécharger mon CV"
    },
    cv: {
      chooseLanguage: "Choisir la langue du CV",
      subtitle: "Sélectionnez la version que vous souhaitez télécharger.",
      french: "Français",
      english: "Anglais",
      close: "Fermer"
    },
    skills: {
      title: "Mes Compétences",
      categories: {
        web: "Langages & Dev Web",
        ai: "Intelligence Artificielle",
        infra: "Systèmes & Infrastructure",
        office: "Bureautique"
      }
    },
    projects: {
      title: "Mes Projets",
      sourceCode: "Code source",
      visitSite: "Voir le projet",
      viewScreenshots: "Feuilleter l'application",
      mobileApp: "Application Mobile",
      screenOf: "Écran",
      of: "sur",
      prevScreen: "Écran précédent",
      nextScreen: "Écran suivant",
      closeGallery: "Fermer la galerie",
      items: [
        {
          title: "KesBiz",
          description: "Application mobile de gestion de produits et point de vente (POS) pour commerces. Suivi des stocks en temps réel avec alertes, carnet de crédit client, gestion des dépenses et encaissement multi-moyens (Cash, MonCash, Natcash).",
          screens: [
            { title: "Connexion & Ouverture de Caisse", desc: "Identification sécurisée pour ouvrir la caisse avec sélection bilingue (Créole / Français)." },
            { title: "Tableau de Bord & Ventes du Jour", desc: "Suivi en temps réel des ventes, chiffre d'affaires, marge bénéficiaire estimée et créances clients." },
            { title: "Produits & Gestion des Stocks", desc: "Catalogue d'articles avec prix d'achat, prix de vente, rayons et alertes automatiques de stock faible." },
            { title: "Point de Vente (POS) & Caisse Rapide", desc: "Interface de caisse tactile ultra-rapide avec recherche instantanée par nom ou code-barres." },
            { title: "Clients & Carnet de Crédit", desc: "Gestion des clients débiteurs, suivi rigoureux des crédits accordés et enregistrement des remboursements." },
            { title: "Navigation & Modules Complets", desc: "Menu centralisé : rapports financiers P&L, abonnements SaaS, dépenses et configuration du commerce." },
            { title: "Historique des Ventes & Reçus", desc: "Journal des transactions et reçus émis avec filtres par mode de paiement (Cash, MonCash, Natcash, Crédit)." },
            { title: "Gestion des Dépenses de la Boutique", desc: "Suivi méthodique des charges opérationnelles (carburant pour génératrice, loyer, salaires, transport)." },
            { title: "Paramètres & Profil du Commerce", desc: "Personnalisation de la boutique : coordonnées, adresse, catégorie et identifiant fiscal (NIF/CIN)." },
            { title: "Configuration Reçus Thermiques", desc: "Formatage des tickets pour imprimantes thermiques de caisse avec message personnalisé en pied de ticket." }
          ]
        },
        {
          title: "BudgetTracker",
          description: "Application web de gestion de budget personnel pour suivre les revenus, les dépenses et le solde net, avec graphiques de tendances et historique des transactions."
        },
        {
          title: "GinType",
          description: "Application web de test de vitesse de frappe pour mesurer le WPM et la précision, avec choix de durée et niveaux de texte."
        },
        {
          title: "Word2PDF",
          description: "Application web de conversion de documents Word en PDF, avec traitement 100% local pour garantir la confidentialité des fichiers."
        }
      ]
    },
    experience: {
      title: "Mon Parcours",
      subtitle: "Formations et Expérience Professionnelle",
      items: [
        {
          title: "Études secondaires",
          company: "Collège Catts Pressoir",
          date: "2016 - 2023",
          description: "Cursus d'études secondaires complètes complété avec succès, orienté vers les sciences et la technologie."
        },
        {
          title: "Administrateur Réseau",
          company: "Petite entreprise privée",
          date: "2024 - 2025",
          description: "Gestion et maintenance de l'infrastructure réseau de l'entreprise au quotidien. Diagnostic et résolution des pannes. Support technique de premier niveau auprès des utilisateurs et veille de sécurité."
        },
        {
          title: "Ingénierie Informatique (En cours)",
          company: "École Supérieure d'Infotronique d'Haïti (ESIH)",
          date: "Depuis 2023",
          description: "Études supérieures axées sur le développement de logiciels, les architectures réseaux, les bases de données relationnelles et l'application pratique de l'intelligence artificielle."
        }
      ]
    },
    contact: {
      title: "Me Contacter",
      subtitle: "Discutons de vos besoins",
      description: "Je suis toujours ouvert à de nouvelles opportunités de projets, de stages ou de collaborations techniques. N'hésitez pas à m'envoyer un message !",
      cards: {
        email: "Email",
        phone: "Téléphone",
        location: "Localisation"
      },
      locationVal: "Port-au-Prince, Haïti",
      form: {
        name: "Nom",
        email: "Email",
        message: "Message",
        placeholderName: "Votre nom",
        placeholderEmail: "votre@email.com",
        placeholderMessage: "Comment puis-je vous aider ?",
        submit: "Envoyer le message",
        sending: "Envoi en cours...",
        success: "Message envoyé avec succès ! Je vous répondrai bientôt.",
        error: "Impossible d'envoyer le message. Réessayez ou écrivez-moi directement par email."
      }
    },
    footer: {
      tagline: "Étudiant en Jeni Enfòmatik & Passionné de Programmation & IA",
      rights: "Tous droits réservés.",
      madeWith: "Fait avec",
      madeIn: "en React"
    }
  },
  en: {
    nav: {
      hero: "Home",
      about: "About",
      experience: "Journey",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      menu: "Menu",
      changeLanguage: "Change language"
    },
    hero: {
      greeting: "Hello, I am",
      role1: "Computer Engineering Student",
      role2: "Programming Enthusiast",
      role3: "AI & Prompt Specialist",
      role4: "Network Administrator",
      description: "I design modern and innovative software solutions, combining programming, network administration, and artificial intelligence.",
      viewProjects: "View my projects",
      contactMe: "Contact me",
      downloadCV: "Download CV"
    },
    about: {
      title: "About Me",
      subtitle: "Passionate about code & AI",
      bio1: "As a computer engineering student, I have a deep interest in software development and emerging technologies like artificial intelligence. I focus on creating structured and innovative solutions.",
      bio2: "With experience in network administration, I have developed solid hands-on skills in infrastructure management, troubleshooting, and technical support to ensure business continuity.",
      stats: {
        exp: "year of experience",
        education: "levels of education",
        languages: "languages spoken"
      },
      downloadCV: "Download my CV"
    },
    cv: {
      chooseLanguage: "Choose CV language",
      subtitle: "Select the version you want to download.",
      french: "French",
      english: "English",
      close: "Close"
    },
    skills: {
      title: "My Skills",
      categories: {
        web: "Languages & Web Dev",
        ai: "Artificial Intelligence",
        infra: "Systems & Infrastructure",
        office: "Office Tools"
      }
    },
    projects: {
      title: "My Projects",
      sourceCode: "Source code",
      visitSite: "Visit project",
      viewScreenshots: "Browse App Screens",
      mobileApp: "Mobile App",
      screenOf: "Screen",
      of: "of",
      prevScreen: "Previous screen",
      nextScreen: "Next screen",
      closeGallery: "Close gallery",
      items: [
        {
          title: "KesBiz",
          description: "Mobile point-of-sale (POS) and inventory management app for retail shops. Real-time stock tracking with low-stock alerts, customer credit book, expense monitoring, and multi-channel local payments (Cash, MonCash, Natcash).",
          screens: [
            { title: "Login & Register Opening", desc: "Secure authentication to open the cash register, with bilingual language support (Creole / French)." },
            { title: "Commercial Dashboard", desc: "Real-time overview of daily sales, turnover, estimated profit margins, customer credit, and quick actions." },
            { title: "Products & Inventory", desc: "Full item catalog with cost, selling prices, aisle categories, and automatic low-stock notifications." },
            { title: "Point of Sale (POS) Register", desc: "Ultra-fast touchscreen POS checkout with instant search by item name or barcode." },
            { title: "Customers & Credit Ledger", desc: "Debtor customer management, tracking outstanding credits, and recording installment payments." },
            { title: "Full Module Navigation", desc: "Centralized hub for sales, expenses, P&L financial statements, SaaS subscriptions, and settings." },
            { title: "Sales History & Receipts", desc: "Transaction journal and issued receipts with payment method filters (Cash, MonCash, Natcash, Credit)." },
            { title: "Store Expense Tracking", desc: "Methodical logging of operating expenses (generator fuel, rent, staff payroll, transport)." },
            { title: "Store Settings & Profile", desc: "Store personalization: contact information, address, retail category, and tax ID (NIF/CIN)." },
            { title: "Thermal Receipt Printing", desc: "POS thermal printer formatting with customized thank-you footer message." }
          ]
        },
        {
          title: "BudgetTracker",
          description: "Personal budget management web app to track income, expenses, and net balance, with trend charts and transaction history."
        },
        {
          title: "GinType",
          description: "Web-based typing speed test app to measure WPM and accuracy, with customizable duration and text difficulty levels."
        },
        {
          title: "Word2PDF",
          description: "Web app to convert Word documents to PDF, with 100% local processing to ensure file confidentiality."
        }
      ]
    },
    experience: {
      title: "My Journey",
      subtitle: "Education & Work Experience",
      items: [
        {
          title: "Secondary Studies",
          company: "Collège Catts Pressoir",
          date: "2016 - 2023",
          description: "Completed full secondary school curriculum with a strong focus on science and technology."
        },
        {
          title: "Network Administrator",
          company: "Private small business",
          date: "2024 - 2025",
          description: "Daily management and maintenance of the company's network infrastructure. Troubleshooting outages, providing user support, and monitoring security."
        },
        {
          title: "Computer Engineering (Ongoing)",
          company: "École Supérieure d'Infotronique d'Haïti (ESIH)",
          date: "Since 2023",
          description: "Higher studies focused on software development, network architectures, relational databases, and practical applications of AI."
        }
      ]
    },
    contact: {
      title: "Contact Me",
      subtitle: "Let's discuss your needs",
      description: "I am always open to new project opportunities, internships, or technical collaborations. Feel free to send me a message!",
      cards: {
        email: "Email",
        phone: "Phone",
        location: "Location"
      },
      locationVal: "Port-au-Prince, Haiti",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        placeholderName: "Your name",
        placeholderEmail: "your@email.com",
        placeholderMessage: "How can I help you?",
        submit: "Send message",
        sending: "Sending...",
        success: "Message sent successfully! I will get back to you soon.",
        error: "Unable to send the message. Please try again or email me directly."
      }
    },
    footer: {
      tagline: "Computer Engineering Student & Programming & AI Enthusiast",
      rights: "All rights reserved.",
      madeWith: "Made with",
      madeIn: "in React"
    }
  },
  ht: {
    nav: {
      hero: "Akèy",
      about: "A Pwopo",
      experience: "Parkou",
      skills: "Konpetans",
      projects: "Pwojè",
      contact: "Kontak",
      menu: "Meni",
      changeLanguage: "Chanje lang"
    },
    hero: {
      greeting: "Bonjou, mwen se",
      role1: "Etidyan nan Jeni Enfòmatik",
      role2: "Pasione pa Pwogramasyon",
      role3: "Pasione pa Entèlijans Atifisyèl",
      role4: "Administratè Rezo",
      description: "Mwen desine solisyon lojisyèl modèn ak inovatè, ki konbine pwogramasyon, administratè rezo ak entèlijans atifisyèl.",
      viewProjects: "Gade pwojè m yo",
      contactMe: "Kontakte m",
      downloadCV: "Telechaje CV"
    },
    about: {
      title: "A Pwopo Mwen",
      subtitle: "Pasione pa kòd ak AI",
      bio1: "Kòm etidyan nan jeni enfòmatik, mwen gen anpil pasyon pou devlopman lojisyèl ak nouvo teknoloji yo tankou entèlijans atifisyèl. Mwen konsantre sou kreye solisyon ki byen estriktire.",
      bio2: "Mwen gen eksperyans nan administratè rezo, kote mwen te devlope bon jan konpetans nan jesyon enfrastrikti, rezolisyon pann rezo ak sipò teknik pou asire operasyon yo mache byen.",
      stats: {
        exp: "ane eksperyans",
        education: "nivo etid yo",
        languages: "lang mwen pale"
      },
      downloadCV: "Telechaje CV mwen"
    },
    cv: {
      chooseLanguage: "Chwazi lang CV a",
      subtitle: "Chwazi vèsyon ou vle telechaje a.",
      french: "Franse",
      english: "Angle",
      close: "Fèmen"
    },
    skills: {
      title: "Konpetans Mwen",
      categories: {
        web: "Langaj ak Devlopman Web",
        ai: "Entèlijans Atifisyèl",
        infra: "Sistèm ak Enfrastrikti",
        office: "Birotik"
      }
    },
    projects: {
      title: "Pwojè Mwen yo",
      sourceCode: "Kòd sous",
      visitSite: "Ale sou pwojè a",
      viewScreenshots: "Fèyte Aplikasyon an",
      mobileApp: "Aplikasyon Mobil",
      screenOf: "Ekran",
      of: "sou",
      prevScreen: "Ekran anvan",
      nextScreen: "Ekran apre",
      closeGallery: "Fèmen galri a",
      items: [
        {
          title: "KesBiz",
          description: "Aplikasyon mobil pou jesyon pwodwi ak pwen de vant (POS) pou boutik ak komès. Swivi stock an tan reyèl ak alèt, rejis kredi kliyan, jesyon depans ak peman miltip (Kach, MonCash, Natcash).",
          screens: [
            { title: "Koneksyon & Ouvèti Kès", desc: "Otantifikasyon sekirize pou louvri kès la ak chwa lang biling (Kreyòl / Franse)." },
            { title: "Tablo de Bò Komèsyal", desc: "Swivi an tan reyèl sou lavant jounen an, chif d'afè, benefis estime, dèt kliyan ak aksyon rapid." },
            { title: "Pwodwi & Jesyon Stock", desc: "Katalòg atik ak pri acha, pri vant, reyon ak alèt otomatik lè stock la ap fini." },
            { title: "Pwen de Vant (POS) & Kès Rapid", desc: "Entèfas kès taktil rapid ak rechèch fasil pa non oswa kòd-bar." },
            { title: "Kliyan & Rejis Kredi", desc: "Jesyon kliyan ki dwe, swivi egzak kredi yo bay ak anrejistreman ranbousman yo." },
            { title: "Navigasyon & Modil Konplè", desc: "Meni santralize: rapò finansye P&L, abònman SaaS, depans ak konfigirasyon komès la." },
            { title: "Istorik Lavant & Resi yo", desc: "Jounal tranzaksyon ak resi bay ak filtè selon mòd peman (Kach, MonCash, Natcash, Kredi)." },
            { title: "Jesyon Depans Boutik la", desc: "Swivi regilye sou chaj operasyonèl yo (gaz delko, lwaye, salè, transpò)." },
            { title: "Paramèt & Pwofil Boutik la", desc: "Pèsonalizasyon boutik la: kontak, adrès, kategori komès ak nimewo fiskal (NIF/CIN)." },
            { title: "Konfigirasyon Resi Tèmik", desc: "Fòma tikè pou enprimant tèmik kès ak mesaj remèsiman nan pye tikè a." }
          ]
        },
        {
          title: "BudgetTracker",
          description: "Yon aplikasyon entènèt pou jere bidjè pèsonèl, swiv revni, depans ak balans nèt, ak grafik tandans ak istwa tranzaksyon yo."
        },
        {
          title: "GinType",
          description: "Yon aplikasyon entènèt pou teste vitès tape ou, mezire WPM ak presizyon, ak chwa dire ak nivo difikilte tèks."
        },
        {
          title: "Word2PDF",
          description: "Aplikasyon entènèt pou konvèti dokiman Word an PDF, ak tretman 100% lokal pou pwoteje konfidansyalite fichye yo."
        }
      ]
    },
    experience: {
      title: "Parkou Mwen",
      subtitle: "Etid ak Eksperyans Pwofesyonèl",
      items: [
        {
          title: "Etid segondè",
          company: "Collège Catts Pressoir",
          date: "2016 - 2023",
          description: "Klas segondè konplè kote mwen te konsantre plis sou syans ak teknoloji."
        },
        {
          title: "Administratè Rezo",
          company: "Ti antrepriz prive",
          date: "2024 - 2025",
          description: "Jesyon ak antretyen chak jou nan enfrastrikti rezo konpayi an. Dyagnostike ak rezoud pann yo, bay itilizatè yo sipò, ak siveyans sekirite."
        },
        {
          title: "Jeni Enfòmatik (Ap kontinye)",
          company: "École Supérieure d'Infotronique d'Haïti (ESIH)",
          date: "Depi 2023",
          description: "Etid siperyè ki baze sou devlopman lojisyèl, achitekti rezo, baz done relasyonèl ak aplikasyon pratik AI."
        }
      ]
    },
    contact: {
      title: "Kontakte M",
      subtitle: "Ann pale sou bezwen ou yo",
      description: "Mwen toujou ouvè a nouvo opòtinite pou pwojè, estaj oswa kolaborasyon teknik. Pa ezite voye yon mesaj ban mwen!",
      cards: {
        email: "Email",
        phone: "Telefòn",
        location: "Kote m ye"
      },
      locationVal: "Pòtoprens, Ayiti",
      form: {
        name: "Non",
        email: "Imèl",
        message: "Mesaj",
        placeholderName: "Non ou",
        placeholderEmail: "imèl@ou.com",
        placeholderMessage: "Kouman mwen ka ede ou?",
        submit: "Voye mesaj la",
        sending: "Ap voye...",
        success: "Mesaj la voye avèk siksè! M ap reponn ou byento.",
        error: "Pa posib voye mesaj la. Eseye ankò oswa ekri m dirèkteman pa imèl."
      }
    },
    footer: {
      tagline: "Etidyan nan Jeni Enfòmatik & Pasione pa Pwogramasyon ak AI",
      rights: "Tout dwa rezève.",
      madeWith: "Fèt avèk",
      madeIn: "nan React"
    }
  }
};
