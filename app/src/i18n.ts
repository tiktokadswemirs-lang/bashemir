/**
 * Site copy for all locales. RU is the primary locale; EN, TR and FA are full
 * translations. FA renders right-to-left (see isRtl). No em or en dashes
 * anywhere in visible copy, in any locale.
 */

export type Locale = "ru" | "en" | "tr" | "fa";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
  { code: "fa", label: "FA" },
];

export function isRtl(locale: Locale): boolean {
  return locale === "fa";
}

export function resolveLocale(value: unknown): Locale {
  return value === "en" || value === "tr" || value === "fa" ? value : "ru";
}

export interface Chapter {
  kicker?: string;
  title: string;
  body: string;
  tags?: string[];
  label: string;
}

export interface Dict {
  htmlLang: string;
  metaTitle: string;
  metaDescription: string;
  nav: { about: string; products: string; delivery: string; exchange: string; legal: string; contacts: string };
  chapters: { sea: Chapter; group: Chapter; products: Chapter; delivery: Chapter };
  ctaDiscuss: string;
  about: {
    title: string;
    p1: string;
    p2: string;
    metrics: { value: string; caption: string }[];
    mapCaption: string;
    factoriesLink: string;
  };
  factoriesUi: {
    title: string;
    intro: string;
    back: string;
  };
  products: {
    eyebrow: string;
    title: string;
    note: string;
    quoteCta: string;
    quoteLine: string;
    categories: { name: string; items: string[] }[];
  };
  delivery: {
    title: string;
    docsLine: string;
    rail: string;
    terms: { code: string; place: string; body: string }[];
  };
  exchange: {
    statementBefore: string;
    statementAccent: string;
    statementAfter: string;
    body: string;
    linkLabel: string;
  };
  partners: {
    title: string;
    intro: string;
    categories: string[];
  };
  legal: {
    title: string;
    fields: { entity: string; jurisdiction: string; regNo: string; regDate: string; address: string; activity: string; bank: string };
    entities: {
      name: string;
      jurisdiction: string;
      regNo: string;
      regDate: string;
      address: string;
      activity: string;
      bank?: string;
    }[];
  };
  contacts: {
    title: string;
    lead: string;
    channels: { label: string; value: string; href: string }[];
    frameTitle: string;
    frameBody: string;
  };
  productUi: {
    back: string;
    specification: string;
    openPdf: string;
    origin: string;
    grades: string;
    standard: string;
    analysisCaption: string;
    requestTitle: string;
    requestBody: string;
    requestCta: string;
    notFound: string;
    allProducts: string;
  };
  footer: {
    tagline: string;
    rights: string;
    followTitle: string;
  };
}

const channelsHrefs = {
  email: "mailto:info@bashemir.com",
  phone: "tel:+99365616173",
  whatsapp: "https://wa.me/998939090341",
  telegram: "https://t.me/bashemir",
  linkedin: "https://www.linkedin.com/company/individual-enterprise-bash-emir/",
  instagram: "https://www.instagram.com/bashemir5",
  tiktok: "https://www.tiktok.com/@bashemir5",
};

const ru: Dict = {
  htmlLang: "ru",
  metaTitle: "Bash Emir: международный трейдер нефтепродуктов",
  metaDescription:
    "Bash Emir: международная группа компаний, поставки нефтепродуктов из Туркменистана, Азербайджана и Узбекистана. FOB Baku, FOB Turkmenbashi, DAP Bukhara.",
  nav: {
    about: "О группе",
    products: "Продукты",
    delivery: "Поставка",
    exchange: "Биржа",
    legal: "Реквизиты",
    contacts: "Контакты",
  },
  chapters: {
    sea: {
      title: "Нефтепродукты по всему миру",
      body: "Спотовые сделки и долгосрочные контракты с прозрачным ценообразованием на международных условиях.",
      label: "Море",
    },
    group: {
      kicker: "О группе",
      title: "Три юрисдикции, один трейдер",
      body: "Bash Emir объединяет компании в Азербайджане, Туркменистане и Узбекистане и контролирует поставку на каждом этапе.",
      tags: ["Азербайджан", "Туркменистан", "Узбекистан"],
      label: "Группа",
    },
    products: {
      title: "14 продуктов: от СУГ до битума",
      body: "Закупаем сырьё за собственные средства и работаем с поставщиками напрямую, без посредников.",
      tags: ["СУГ", "ECO 93", "Битум"],
      label: "Продукты",
    },
    delivery: {
      kicker: "Incoterms 2020",
      title: "От порта до пункта назначения",
      body: "Отгрузка через порты Баку и Туркменбаши или доставка до Бухары с полным пакетом документов.",
      tags: ["FOB Baku", "FOB Turkmenbashi", "DAP Bukhara"],
      label: "Поставка",
    },
  },
  ctaDiscuss: "Обсудить поставку",
  about: {
    title: "Группа Bash Emir",
    p1: "Bash Emir объединяет компании в Азербайджане, Туркменистане и Узбекистане. Такая структура позволяет контролировать поставки нефтепродуктов на всех этапах: от закупки сырья до доставки конечному покупателю.",
    p2: "Закупку сырья на территории Туркменистана мы ведём за собственные средства. Прямые контракты с поставщиками гарантируют стабильность поставок, независимость от посредников и контроль качества продукции.",
    metrics: [
      { value: "3", caption: "страны присутствия" },
      { value: "14", caption: "продуктов в портфеле" },
      { value: "2020", caption: "год основания" },
    ],
    mapCaption: "Маршруты группы: Туркменбаши, Баку, Бухара",
    factoriesLink: "Заводы Туркменистана",
  },
  factoriesUi: {
    title: "Заводы Туркменистана",
    intro: "Производственные площадки, с которых группа отгружает продукцию.",
    back: "На главную",
  },
  products: {
    eyebrow: "Каталог",
    title: "Сопровождаем сделки по 14 продуктам",
    note: "Полные спецификации, паспорта качества и условия отгрузки предоставляются по запросу.",
    quoteCta: "Запросить цену",
    quoteLine: "Ответим с ценой и условиями в течение одного рабочего дня.",
    categories: [
      {
        name: "Топливо",
        items: [
          "Сжиженный углеводородный газ",
          "Гидроочищенное дизельное топливо",
          "Бензин марки ECO 93",
          "Мазут с низким содержанием серы",
        ],
      },
      {
        name: "Масла и тяжёлые продукты",
        items: ["Базовое масло", "Битум", "Нефтяной кокс", "Смесовой парафиновый гач"],
      },
      {
        name: "Химия",
        items: [
          "Техническая серная кислота",
          "Йод технический марки «А»",
          "Карбамид 46",
          "Сера",
          "Хлорид натрия промышленного назначения",
        ],
      },
      { name: "Строительные материалы", items: ["Белый цемент"] },
    ],
  },
  delivery: {
    title: "Условия поставки",
    docsLine: "Каждая поставка сопровождается полным пакетом документов и сертификатами качества.",
    rail: "BAKU 40°21'N 49°50'E · TURKMENBASHI 40°01'N 52°58'E · BUKHARA 39°46'N 64°25'E",
    terms: [
      {
        code: "FOB",
        place: "Baku Port",
        body: "Отгрузка товара в порту Баку. Ответственность переходит покупателю после погрузки на судно.",
      },
      {
        code: "FOB",
        place: "Turkmenbashi Port",
        body: "Отгрузка товара в порту Туркменбаши. Ответственность переходит покупателю после погрузки на судно.",
      },
      {
        code: "DAP",
        place: "Bukhara",
        body: "Доставка до Бухары, Узбекистан. Стоимость транспортировки включена в цену товара.",
      },
    ],
  },
  exchange: {
    statementBefore: "Экспорт из Туркменистана проходит через ",
    statementAccent: "государственную биржу",
    statementAfter: ".",
    body: "Нефтепродукты и продукция нефтепереработки экспортируются исключительно через Государственную товарно-сырьевую биржу Туркменистана (ГТСБТ). Цена формируется на основе международных бенчмарков Platts и Argus и фиксируется в контрактах SPA и CI.",
    linkLabel: "exchange.gov.tm",
  },
  partners: {
    title: "Партнёры",
    intro: "Работаем с государственными и частными предприятиями по всей цепочке поставок.",
    categories: [
      "Государственные предприятия",
      "Сельхозпредприятия",
      "Нефтеперерабатывающие заводы",
      "Дорожно-строительные компании",
      "АЗС и нефтяные терминалы",
    ],
  },
  legal: {
    title: "Юридическая информация",
    fields: {
      entity: "Юридическое лицо",
      jurisdiction: "Юрисдикция",
      regNo: "Регистрационный номер",
      regDate: "Дата регистрации",
      address: "Юридический адрес",
      activity: "Деятельность",
      bank: "Банк",
    },
    entities: [
      {
        name: "ИП «Баш Эмир»",
        jurisdiction: "Туркменистан",
        regNo: "24610563",
        regDate: "22.12.2020",
        address: "Ашхабад, район Копетдаг, улица 1958 (Нурмухаммед Андалип), дом 40",
        activity: "Брокерские услуги и содействие в торговле",
        bank: "Государственный банк внешнеэкономической деятельности Туркменистана, проспект Гарашсызлык 32, Ашхабад",
      },
      {
        name: "Bash Emir Petrochemical LLC",
        jurisdiction: "Азербайджан",
        regNo: "2009718281",
        regDate: "01.04.2026",
        address: "Баку, район Хатаи, 8 Ноября 15, Azure Business Center, офис 165b",
        activity: "Оптовая торговля нефтепродуктами и нефтехимической продукцией",
      },
      {
        name: "ООО «BASH EMIR»",
        jurisdiction: "Узбекистан",
        regNo: "312950323",
        regDate: "09.04.2026",
        address: "Бухарская область, город Бухара, Muxtor Ashrafiy MFY, улица Chorbakr 3-muyulish, 55",
        activity: "Оптовая торговля нефтепродуктами и нефтехимической продукцией",
      },
    ],
  },
  contacts: {
    title: "Контакты",
    lead: "Менеджеры изучат ваш запрос, подготовят предложение и свяжутся с вами в ближайшее время.",
    channels: [
      { label: "Email", value: "info@bashemir.com", href: channelsHrefs.email },
      { label: "Телефон", value: "+993 65 61 61 73", href: channelsHrefs.phone },
      { label: "WhatsApp", value: "wa.me/998939090341", href: channelsHrefs.whatsapp },
      { label: "Telegram", value: "t.me/bashemir", href: channelsHrefs.telegram },
      { label: "LinkedIn", value: "Bash Emir", href: channelsHrefs.linkedin },
      { label: "Instagram", value: "@bashemir5", href: channelsHrefs.instagram },
      { label: "TikTok", value: "@bashemir5", href: channelsHrefs.tiktok },
    ],
    frameTitle: "Обсудить поставку",
    frameBody: "Напишите нам: уточним объём, базис и сроки, подготовим предложение с ценой.",
  },
  productUi: {
    back: "Вернуться в каталог",
    specification: "Спецификация",
    openPdf: "Открыть PDF спецификацию",
    origin: "Происхождение",
    grades: "Марки",
    standard: "Стандарт",
    analysisCaption: "Протокол анализа",
    requestTitle: "Запросить цену",
    requestBody: "Ответим с ценой, базисом поставки и сроками в течение одного рабочего дня.",
    requestCta: "Позвонить WhatsApp",
    notFound: "Продукт не найден",
    allProducts: "Все продукты",
  },
  footer: {
    tagline: "Международный трейдер в сфере нефтепродуктов",
    rights: "Все права защищены",
    followTitle: "Новости и котировки в наших каналах",
  },
};

const en: Dict = {
  htmlLang: "en",
  metaTitle: "Bash Emir: international oil products trader",
  metaDescription:
    "Bash Emir is an international trading group supplying oil products from Turkmenistan, Azerbaijan and Uzbekistan. FOB Baku, FOB Turkmenbashi, DAP Bukhara.",
  nav: {
    about: "About",
    products: "Products",
    delivery: "Delivery",
    exchange: "Exchange",
    legal: "Legal",
    contacts: "Contacts",
  },
  chapters: {
    sea: {
      title: "Oil products worldwide",
      body: "Spot deals and term contracts with transparent pricing on international delivery terms.",
      label: "Sea",
    },
    group: {
      kicker: "The group",
      title: "Three jurisdictions, one trader",
      body: "Bash Emir unites companies in Azerbaijan, Turkmenistan and Uzbekistan and controls every stage of delivery.",
      tags: ["Azerbaijan", "Turkmenistan", "Uzbekistan"],
      label: "Group",
    },
    products: {
      title: "14 products: from LPG to bitumen",
      body: "We buy feedstock with our own capital and work with producers directly, with no intermediaries.",
      tags: ["LPG", "ECO 93", "Bitumen"],
      label: "Products",
    },
    delivery: {
      kicker: "Incoterms 2020",
      title: "From port to destination",
      body: "Loading at the ports of Baku and Turkmenbashi, or delivery to Bukhara with a complete document package.",
      tags: ["FOB Baku", "FOB Turkmenbashi", "DAP Bukhara"],
      label: "Delivery",
    },
  },
  ctaDiscuss: "Discuss a supply",
  about: {
    title: "The Bash Emir group",
    p1: "Bash Emir unites companies in Azerbaijan, Turkmenistan and Uzbekistan. This structure lets us control oil product supplies at every stage: from feedstock purchase to delivery to the end buyer.",
    p2: "We purchase feedstock in Turkmenistan with our own capital. Direct contracts with producers guarantee stable supply, independence from intermediaries and quality control of every cargo.",
    metrics: [
      { value: "3", caption: "countries of presence" },
      { value: "14", caption: "products in the book" },
      { value: "2020", caption: "year established" },
    ],
    mapCaption: "Group routes: Turkmenbashi, Baku, Bukhara",
    factoriesLink: "Factories of Turkmenistan",
  },
  factoriesUi: {
    title: "Factories of Turkmenistan",
    intro: "The production sites the group ships its products from.",
    back: "Back to home",
  },
  products: {
    eyebrow: "Catalog",
    title: "We support deals in 14 products",
    note: "Full specifications, quality passports and loading terms are available on request.",
    quoteCta: "Request a price",
    quoteLine: "We reply with price and terms within one business day.",
    categories: [
      {
        name: "Fuels",
        items: [
          "Liquefied petroleum gas",
          "Hydrotreated diesel fuel",
          "ECO 93 gasoline",
          "Low-sulfur fuel oil",
        ],
      },
      {
        name: "Oils and heavy products",
        items: ["Base oil", "Bitumen", "Petroleum coke", "Blended paraffin slack wax"],
      },
      {
        name: "Chemicals",
        items: [
          "Technical sulfuric acid",
          "Technical iodine, grade A",
          "Urea 46",
          "Sulfur",
          "Industrial-grade sodium chloride",
        ],
      },
      { name: "Construction materials", items: ["White cement"] },
    ],
  },
  delivery: {
    title: "Delivery terms",
    docsLine: "Every shipment travels with a complete document package and quality certificates.",
    rail: "BAKU 40°21'N 49°50'E · TURKMENBASHI 40°01'N 52°58'E · BUKHARA 39°46'N 64°25'E",
    terms: [
      {
        code: "FOB",
        place: "Baku Port",
        body: "Loading at the port of Baku. Responsibility passes to the buyer once the cargo is on board.",
      },
      {
        code: "FOB",
        place: "Turkmenbashi Port",
        body: "Loading at the port of Turkmenbashi. Responsibility passes to the buyer once the cargo is on board.",
      },
      {
        code: "DAP",
        place: "Bukhara",
        body: "Delivery to Bukhara, Uzbekistan. Transport costs are included in the price of the goods.",
      },
    ],
  },
  exchange: {
    statementBefore: "Exports from Turkmenistan pass through the ",
    statementAccent: "state exchange",
    statementAfter: ".",
    body: "Oil products and refined products are exported exclusively through the State Commodity and Raw Materials Exchange of Turkmenistan (SCRMET). Prices are built on the Platts and Argus international benchmarks and fixed in SPA and CI contracts.",
    linkLabel: "exchange.gov.tm",
  },
  partners: {
    title: "Partners",
    intro: "We work with state and private enterprises across the whole supply chain.",
    categories: [
      "State enterprises",
      "Agricultural companies",
      "Oil refineries",
      "Road construction companies",
      "Fuel stations and oil terminals",
    ],
  },
  legal: {
    title: "Legal information",
    fields: {
      entity: "Legal entity",
      jurisdiction: "Jurisdiction",
      regNo: "Registration number",
      regDate: "Registration date",
      address: "Registered address",
      activity: "Business activity",
      bank: "Bank",
    },
    entities: [
      {
        name: "Individual Enterprise Bash Emir",
        jurisdiction: "Turkmenistan",
        regNo: "24610563",
        regDate: "22.12.2020",
        address: "Ashgabat, Kopetdag district, 1958 street (Nurmuhammet Andalyp), 40",
        activity: "Brokerage services and trade facilitation",
        bank: "State Bank for Foreign Economic Affairs of Turkmenistan, Garashsyzlyk avenue 32, Ashgabat",
      },
      {
        name: "Bash Emir Petrochemical LLC",
        jurisdiction: "Azerbaijan",
        regNo: "2009718281",
        regDate: "01.04.2026",
        address: "Baku, Khatai district, 8 November 15, Azure Business Center, office 165b",
        activity: "Wholesale trade in oil products and petrochemicals",
      },
      {
        name: "BASH EMIR LLC",
        jurisdiction: "Uzbekistan",
        regNo: "312950323",
        regDate: "09.04.2026",
        address: "Bukhara region, Bukhara city, Muxtor Ashrafiy MFY, Chorbakr 3-muyulish street, 55",
        activity: "Wholesale trade in oil products and petrochemicals",
      },
    ],
  },
  contacts: {
    title: "Contacts",
    lead: "Our managers will study your request, prepare an offer and get back to you shortly.",
    channels: [
      { label: "Email", value: "info@bashemir.com", href: channelsHrefs.email },
      { label: "Phone", value: "+993 65 61 61 73", href: channelsHrefs.phone },
      { label: "WhatsApp", value: "wa.me/998939090341", href: channelsHrefs.whatsapp },
      { label: "Telegram", value: "t.me/bashemir", href: channelsHrefs.telegram },
      { label: "LinkedIn", value: "Bash Emir", href: channelsHrefs.linkedin },
      { label: "Instagram", value: "@bashemir5", href: channelsHrefs.instagram },
      { label: "TikTok", value: "@bashemir5", href: channelsHrefs.tiktok },
    ],
    frameTitle: "Discuss a supply",
    frameBody: "Write to us: we will confirm volume, basis and timing, and prepare a priced offer.",
  },
  productUi: {
    back: "Back to catalog",
    specification: "Specification",
    openPdf: "Open PDF specification",
    origin: "Origin",
    grades: "Grades",
    standard: "Standard",
    analysisCaption: "Analysis report",
    requestTitle: "Request a price",
    requestBody: "We reply with price, delivery basis and timing within one business day.",
    requestCta: "Call on WhatsApp",
    notFound: "Product not found",
    allProducts: "All products",
  },
  footer: {
    tagline: "International oil products trader",
    rights: "All rights reserved",
    followTitle: "News and price ideas in our channels",
  },
};

const tr: Dict = {
  htmlLang: "tr",
  metaTitle: "Bash Emir: uluslararası petrol ürünleri tüccarı",
  metaDescription:
    "Bash Emir, Türkmenistan, Azerbaycan ve Özbekistan'dan petrol ürünleri tedarik eden uluslararası bir ticaret grubudur. FOB Bakü, FOB Türkmenbaşı, DAP Buhara.",
  nav: {
    about: "Hakkında",
    products: "Ürünler",
    delivery: "Teslimat",
    exchange: "Borsa",
    legal: "Hukuki",
    contacts: "İletişim",
  },
  chapters: {
    sea: {
      title: "Dünya çapında petrol ürünleri",
      body: "Uluslararası teslimat şartlarında şeffaf fiyatlandırmalı spot işlemler ve uzun vadeli sözleşmeler.",
      label: "Deniz",
    },
    group: {
      kicker: "Grup hakkında",
      title: "Üç ülke, tek tüccar",
      body: "Bash Emir, Azerbaycan, Türkmenistan ve Özbekistan'daki şirketleri birleştirir ve teslimatın her aşamasını kontrol eder.",
      tags: ["Azerbaycan", "Türkmenistan", "Özbekistan"],
      label: "Grup",
    },
    products: {
      title: "LPG'den bitüme 14 ürün",
      body: "Hammaddeyi kendi sermayemizle satın alır, üreticilerle aracısız ve doğrudan çalışırız.",
      tags: ["LPG", "ECO 93", "Bitüm"],
      label: "Ürünler",
    },
    delivery: {
      kicker: "Incoterms 2020",
      title: "Limandan varış noktasına",
      body: "Bakü ve Türkmenbaşı limanlarından yükleme veya eksiksiz evrak paketiyle Buhara'ya teslimat.",
      tags: ["FOB Bakü", "FOB Türkmenbaşı", "DAP Buhara"],
      label: "Teslimat",
    },
  },
  ctaDiscuss: "Tedarik görüşelim",
  about: {
    title: "Bash Emir grubu",
    p1: "Bash Emir, Azerbaycan, Türkmenistan ve Özbekistan'daki şirketleri tek çatı altında toplar. Bu yapı, hammadde alımından nihai alıcıya teslimata kadar her aşamayı kontrol etmemizi sağlar.",
    p2: "Türkmenistan'daki hammadde alımlarını kendi sermayemizle yaparız. Üreticilerle doğrudan sözleşmeler; istikrarlı tedarik, aracılardan bağımsızlık ve her kargoda kalite kontrolü garanti eder.",
    metrics: [
      { value: "3", caption: "faaliyet ülkesi" },
      { value: "14", caption: "portföydeki ürün" },
      { value: "2020", caption: "kuruluş yılı" },
    ],
    mapCaption: "Grup rotaları: Türkmenbaşı, Bakü, Buhara",
    factoriesLink: "Türkmenistan fabrikaları",
  },
  factoriesUi: {
    title: "Türkmenistan fabrikaları",
    intro: "Grubun ürünlerini sevk ettiği üretim tesisleri.",
    back: "Ana sayfaya dön",
  },
  products: {
    eyebrow: "Katalog",
    title: "14 üründe işlem destekliyoruz",
    note: "Tam spesifikasyonlar, kalite sertifikaları ve yükleme şartları talep üzerine sunulur.",
    quoteCta: "Fiyat isteyin",
    quoteLine: "Bir iş günü içinde fiyat ve şartlarla dönüş yaparız.",
    categories: [
      {
        name: "Yakıtlar",
        items: [
          "Sıvılaştırılmış petrol gazı",
          "Hidro arıtılmış dizel yakıt",
          "ECO 93 benzin",
          "Düşük kükürtlü fuel oil",
        ],
      },
      {
        name: "Yağlar ve ağır ürünler",
        items: ["Baz yağ", "Bitüm", "Petrol koku", "Karışım parafin slack wax"],
      },
      {
        name: "Kimyasallar",
        items: [
          "Teknik sülfürik asit",
          "A sınıfı teknik iyot",
          "Üre 46",
          "Kükürt",
          "Endüstriyel sodyum klorür",
        ],
      },
      { name: "İnşaat malzemeleri", items: ["Beyaz çimento"] },
    ],
  },
  delivery: {
    title: "Teslimat şartları",
    docsLine: "Her sevkiyat, eksiksiz evrak paketi ve kalite sertifikalarıyla birlikte yola çıkar.",
    rail: "BAKU 40°21'N 49°50'E · TURKMENBASHI 40°01'N 52°58'E · BUKHARA 39°46'N 64°25'E",
    terms: [
      {
        code: "FOB",
        place: "Bakü Limanı",
        body: "Bakü limanında yükleme. Kargo gemiye yüklendikten sonra sorumluluk alıcıya geçer.",
      },
      {
        code: "FOB",
        place: "Türkmenbaşı Limanı",
        body: "Türkmenbaşı limanında yükleme. Kargo gemiye yüklendikten sonra sorumluluk alıcıya geçer.",
      },
      {
        code: "DAP",
        place: "Buhara",
        body: "Buhara'ya (Özbekistan) teslimat. Nakliye maliyeti mal fiyatına dahildir.",
      },
    ],
  },
  exchange: {
    statementBefore: "Türkmenistan ihracatı ",
    statementAccent: "devlet borsası",
    statementAfter: " üzerinden yapılır.",
    body: "Petrol ürünleri ve rafineri ürünleri, yalnızca Türkmenistan Devlet Emtia ve Hammadde Borsası (GTSBT) üzerinden ihraç edilir. Fiyatlar Platts ve Argus uluslararası referanslarına dayanır ve SPA ile CI sözleşmelerinde sabitlenir.",
    linkLabel: "exchange.gov.tm",
  },
  partners: {
    title: "İş ortakları",
    intro: "Tedarik zincirinin tamamında kamu ve özel kuruluşlarla çalışıyoruz.",
    categories: [
      "Kamu kuruluşları",
      "Tarım işletmeleri",
      "Petrol rafinerileri",
      "Yol inşaat şirketleri",
      "Akaryakıt istasyonları ve petrol terminalleri",
    ],
  },
  legal: {
    title: "Hukuki bilgiler",
    fields: {
      entity: "Tüzel kişi",
      jurisdiction: "Yargı bölgesi",
      regNo: "Sicil numarası",
      regDate: "Tescil tarihi",
      address: "Kayıtlı adres",
      activity: "Faaliyet alanı",
      bank: "Banka",
    },
    entities: [
      {
        name: "Bash Emir Bireysel İşletmesi",
        jurisdiction: "Türkmenistan",
        regNo: "24610563",
        regDate: "22.12.2020",
        address: "Aşkabat, Kopetdag bölgesi, 1958 sokak (Nurmuhammet Andalyp), 40",
        activity: "Aracılık hizmetleri ve ticaret kolaylaştırma",
        bank: "Türkmenistan Devlet Dış Ekonomik İlişkiler Bankası, Garaşsyzlyk caddesi 32, Aşkabat",
      },
      {
        name: "Bash Emir Petrochemical LLC",
        jurisdiction: "Azerbaycan",
        regNo: "2009718281",
        regDate: "01.04.2026",
        address: "Bakü, Hatai bölgesi, 8 Kasım 15, Azure Business Center, ofis 165b",
        activity: "Petrol ürünleri ve petrokimya toptan ticareti",
      },
      {
        name: "BASH EMIR LLC",
        jurisdiction: "Özbekistan",
        regNo: "312950323",
        regDate: "09.04.2026",
        address: "Buhara bölgesi, Buhara şehri, Muxtor Ashrafiy MFY, Chorbakr 3-muyulish sokak, 55",
        activity: "Petrol ürünleri ve petrokimya toptan ticareti",
      },
    ],
  },
  contacts: {
    title: "İletişim",
    lead: "Yöneticilerimiz talebinizi inceler, teklif hazırlar ve en kısa sürede size döner.",
    channels: [
      { label: "E-posta", value: "info@bashemir.com", href: channelsHrefs.email },
      { label: "Telefon", value: "+993 65 61 61 73", href: channelsHrefs.phone },
      { label: "WhatsApp", value: "wa.me/998939090341", href: channelsHrefs.whatsapp },
      { label: "Telegram", value: "t.me/bashemir", href: channelsHrefs.telegram },
      { label: "LinkedIn", value: "Bash Emir", href: channelsHrefs.linkedin },
      { label: "Instagram", value: "@bashemir5", href: channelsHrefs.instagram },
      { label: "TikTok", value: "@bashemir5", href: channelsHrefs.tiktok },
    ],
    frameTitle: "Tedarik görüşelim",
    frameBody: "Bize yazın: hacmi, teslim şeklini ve takvimi netleştirip fiyatlı teklif hazırlayalım.",
  },
  productUi: {
    back: "Kataloğa dön",
    specification: "Spesifikasyon",
    openPdf: "PDF spesifikasyonu aç",
    origin: "Menşe",
    grades: "Sınıflar",
    standard: "Standart",
    analysisCaption: "Analiz raporu",
    requestTitle: "Fiyat isteyin",
    requestBody: "Bir iş günü içinde fiyat, teslim şekli ve takvimle dönüş yaparız.",
    requestCta: "WhatsApp'tan arayın",
    notFound: "Ürün bulunamadı",
    allProducts: "Tüm ürünler",
  },
  footer: {
    tagline: "Uluslararası petrol ürünleri tüccarı",
    rights: "Tüm hakları saklıdır",
    followTitle: "Haberler ve fiyatlar kanallarımızda",
  },
};

const fa: Dict = {
  htmlLang: "fa",
  metaTitle: "بش امیر: تاجر بین‌المللی فرآورده‌های نفتی",
  metaDescription:
    "بش امیر گروه تجاری بین‌المللی تأمین فرآورده‌های نفتی از ترکمنستان، آذربایجان و ازبکستان است. FOB باکو، FOB ترکمن‌باشی، DAP بخارا.",
  nav: {
    about: "درباره ما",
    products: "محصولات",
    delivery: "تحویل",
    exchange: "بورس",
    legal: "اطلاعات حقوقی",
    contacts: "تماس",
  },
  chapters: {
    sea: {
      title: "فرآورده‌های نفتی در سراسر جهان",
      body: "معاملات نقدی و قراردادهای بلندمدت با قیمت‌گذاری شفاف بر پایه شرایط بین‌المللی تحویل.",
      label: "دریا",
    },
    group: {
      kicker: "درباره گروه",
      title: "سه کشور، یک تاجر",
      body: "بش امیر شرکت‌هایی در آذربایجان، ترکمنستان و ازبکستان را گرد هم می‌آورد و هر مرحله تحویل را کنترل می‌کند.",
      tags: ["آذربایجان", "ترکمنستان", "ازبکستان"],
      label: "گروه",
    },
    products: {
      title: "۱۴ محصول: از ال‌پی‌جی تا قیر",
      body: "خوراک را با سرمایه خود می‌خریم و بدون واسطه، مستقیم با تولیدکنندگان کار می‌کنیم.",
      tags: ["ال‌پی‌جی", "ECO 93", "قیر"],
      label: "محصولات",
    },
    delivery: {
      kicker: "اینکوترمز ۲۰۲۰",
      title: "از بندر تا مقصد",
      body: "بارگیری در بندرهای باکو و ترکمن‌باشی یا تحویل در بخارا همراه با بسته کامل اسناد.",
      tags: ["FOB باکو", "FOB ترکمن‌باشی", "DAP بخارا"],
      label: "تحویل",
    },
  },
  ctaDiscuss: "گفتگو درباره تأمین",
  about: {
    title: "گروه بش امیر",
    p1: "بش امیر شرکت‌هایی در آذربایجان، ترکمنستان و ازبکستان را در یک ساختار گرد هم می‌آورد. این ساختار به ما امکان می‌دهد تأمین فرآورده‌های نفتی را در همه مراحل کنترل کنیم: از خرید خوراک تا تحویل به خریدار نهایی.",
    p2: "خرید خوراک در ترکمنستان را با سرمایه خود انجام می‌دهیم. قراردادهای مستقیم با تولیدکنندگان، پایداری تأمین، استقلال از واسطه‌ها و کنترل کیفیت هر محموله را تضمین می‌کند.",
    metrics: [
      { value: "3", caption: "کشور حضور" },
      { value: "14", caption: "محصول در سبد" },
      { value: "2020", caption: "سال تأسیس" },
    ],
    mapCaption: "مسیرهای گروه: ترکمن‌باشی، باکو، بخارا",
    factoriesLink: "کارخانه‌های ترکمنستان",
  },
  factoriesUi: {
    title: "کارخانه‌های ترکمنستان",
    intro: "سایت‌های تولیدی که گروه محصولات خود را از آن‌ها ارسال می‌کند.",
    back: "بازگشت به خانه",
  },
  products: {
    eyebrow: "کاتالوگ",
    title: "معاملات ۱۴ محصول را پشتیبانی می‌کنیم",
    note: "مشخصات کامل، گواهی‌های کیفیت و شرایط بارگیری بنا به درخواست ارائه می‌شود.",
    quoteCta: "استعلام قیمت",
    quoteLine: "ظرف یک روز کاری با قیمت و شرایط پاسخ می‌دهیم.",
    categories: [
      {
        name: "سوخت‌ها",
        items: [
          "گاز مایع (ال‌پی‌جی)",
          "گازوئیل هیدروتریت‌شده",
          "بنزین ECO 93",
          "نفت کوره کم‌گوگرد",
        ],
      },
      {
        name: "روغن‌ها و فرآورده‌های سنگین",
        items: ["روغن پایه", "قیر", "کک نفتی", "اسلک واکس پارافینی"],
      },
      {
        name: "مواد شیمیایی",
        items: [
          "اسید سولفوریک صنعتی",
          "ید صنعتی درجه A",
          "اوره ۴۶",
          "گوگرد",
          "کلرید سدیم صنعتی",
        ],
      },
      { name: "مصالح ساختمانی", items: ["سیمان سفید"] },
    ],
  },
  delivery: {
    title: "شرایط تحویل",
    docsLine: "هر محموله همراه با بسته کامل اسناد و گواهی‌های کیفیت ارسال می‌شود.",
    rail: "BAKU 40°21'N 49°50'E · TURKMENBASHI 40°01'N 52°58'E · BUKHARA 39°46'N 64°25'E",
    terms: [
      {
        code: "FOB",
        place: "بندر باکو",
        body: "بارگیری در بندر باکو. پس از بارگیری روی کشتی، مسئولیت به خریدار منتقل می‌شود.",
      },
      {
        code: "FOB",
        place: "بندر ترکمن‌باشی",
        body: "بارگیری در بندر ترکمن‌باشی. پس از بارگیری روی کشتی، مسئولیت به خریدار منتقل می‌شود.",
      },
      {
        code: "DAP",
        place: "بخارا",
        body: "تحویل در بخارا، ازبکستان. هزینه حمل در قیمت کالا لحاظ شده است.",
      },
    ],
  },
  exchange: {
    statementBefore: "صادرات ترکمنستان از طریق ",
    statementAccent: "بورس دولتی",
    statementAfter: " انجام می‌شود.",
    body: "فرآورده‌های نفتی و محصولات پالایشی صرفاً از طریق بورس دولتی کالا و مواد خام ترکمنستان (GTSBT) صادر می‌شوند. قیمت بر پایه شاخص‌های بین‌المللی Platts و Argus تعیین و در قراردادهای SPA و CI تثبیت می‌شود.",
    linkLabel: "exchange.gov.tm",
  },
  partners: {
    title: "شرکا",
    intro: "در سراسر زنجیره تأمین با شرکت‌های دولتی و خصوصی همکاری می‌کنیم.",
    categories: [
      "شرکت‌های دولتی",
      "شرکت‌های کشاورزی",
      "پالایشگاه‌های نفت",
      "شرکت‌های راه‌سازی",
      "جایگاه‌های سوخت و پایانه‌های نفتی",
    ],
  },
  legal: {
    title: "اطلاعات حقوقی",
    fields: {
      entity: "شخص حقوقی",
      jurisdiction: "حوزه قضایی",
      regNo: "شماره ثبت",
      regDate: "تاریخ ثبت",
      address: "نشانی ثبتی",
      activity: "زمینه فعالیت",
      bank: "بانک",
    },
    entities: [
      {
        name: "مؤسسه انفرادی بش امیر",
        jurisdiction: "ترکمنستان",
        regNo: "24610563",
        regDate: "22.12.2020",
        address: "عشق‌آباد، ناحیه کوپتداغ، خیابان ۱۹۵۸ (نورمحمد اندلیب)، پلاک ۴۰",
        activity: "خدمات کارگزاری و تسهیل تجارت",
        bank: "بانک دولتی امور اقتصادی خارجی ترکمنستان، خیابان قره‌شسزلیک ۳۲، عشق‌آباد",
      },
      {
        name: "Bash Emir Petrochemical LLC",
        jurisdiction: "آذربایجان",
        regNo: "2009718281",
        regDate: "01.04.2026",
        address: "باکو، ناحیه ختایی، ۸ نوامبر ۱۵، مرکز تجاری Azure، دفتر 165b",
        activity: "تجارت عمده فرآورده‌های نفتی و پتروشیمی",
      },
      {
        name: "BASH EMIR LLC",
        jurisdiction: "ازبکستان",
        regNo: "312950323",
        regDate: "09.04.2026",
        address: "استان بخارا، شهر بخارا، محله Muxtor Ashrafiy، خیابان Chorbakr 3-muyulish، پلاک ۵۵",
        activity: "تجارت عمده فرآورده‌های نفتی و پتروشیمی",
      },
    ],
  },
  contacts: {
    title: "تماس با ما",
    lead: "مدیران ما درخواست شما را بررسی می‌کنند، پیشنهاد آماده می‌کنند و در اسرع وقت با شما تماس می‌گیرند.",
    channels: [
      { label: "ایمیل", value: "info@bashemir.com", href: channelsHrefs.email },
      { label: "تلفن", value: "+993 65 61 61 73", href: channelsHrefs.phone },
      { label: "واتس‌اپ", value: "wa.me/998939090341", href: channelsHrefs.whatsapp },
      { label: "تلگرام", value: "t.me/bashemir", href: channelsHrefs.telegram },
      { label: "لینکدین", value: "Bash Emir", href: channelsHrefs.linkedin },
      { label: "اینستاگرام", value: "@bashemir5", href: channelsHrefs.instagram },
      { label: "تیک‌تاک", value: "@bashemir5", href: channelsHrefs.tiktok },
    ],
    frameTitle: "گفتگو درباره تأمین",
    frameBody: "برای ما بنویسید: حجم، مبنای تحویل و زمان‌بندی را مشخص و پیشنهاد قیمت‌دار آماده می‌کنیم.",
  },
  productUi: {
    back: "بازگشت به کاتالوگ",
    specification: "مشخصات فنی",
    openPdf: "باز کردن مشخصات PDF",
    origin: "مبدأ",
    grades: "گریدها",
    standard: "استاندارد",
    analysisCaption: "گزارش آنالیز",
    requestTitle: "استعلام قیمت",
    requestBody: "ظرف یک روز کاری با قیمت، مبنای تحویل و زمان‌بندی پاسخ می‌دهیم.",
    requestCta: "تماس در واتس‌اپ",
    notFound: "محصول یافت نشد",
    allProducts: "همه محصولات",
  },
  footer: {
    tagline: "تاجر بین‌المللی فرآورده‌های نفتی",
    rights: "کلیه حقوق محفوظ است",
    followTitle: "اخبار و قیمت‌ها در کانال‌های ما",
  },
};

export const dictionaries: Record<Locale, Dict> = { ru, en, tr, fa };
