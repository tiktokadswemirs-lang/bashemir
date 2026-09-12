/**
 * Factories of Turkmenistan, mirrored from the original bashemir.com
 * /factories page (names verbatim in RU, translated to EN/TR/FA; photos are
 * the company's own files in /assets/factories).
 */
import type { Locale } from "@/i18n";

export interface Factory {
  image: string;
  name: Record<Locale, string>;
}

export const FACTORIES: Factory[] = [
  {
    image: "/assets/factories/marykerbamid.jpg",
    name: {
      ru: "Завод «Марыкарбамид»",
      en: "Marykarbamid plant",
      tr: "Marykarbamid fabrikası",
      fa: "کارخانه ماری‌کاربامید",
    },
  },
  {
    image: "/assets/factories/maryazot.jpg",
    name: {
      ru: "Производственное объединение «Марыазот»",
      en: "Maryazot production association",
      tr: "Maryazot üretim birliği",
      fa: "مجتمع تولیدی ماری‌آزوت",
    },
  },
  {
    image: "/assets/factories/himzavod-niyazov.jpg",
    name: {
      ru: "Туркменабатский химический завод имени С.А.Ниязова",
      en: "Turkmenabat chemical plant named after S.A.Niyazov",
      tr: "S.A.Niyazov adına Türkmenabat kimya fabrikası",
      fa: "کارخانه شیمیایی ترکمن‌آباد به نام نیازوف",
    },
  },
  {
    image: "/assets/factories/gorno-rundyy-kompleks.jpg",
    name: {
      ru: "Гарлыкский калийный горно-рудный комплекс",
      en: "Garlyk potash mining complex",
      tr: "Garlyk potas madencilik kompleksi",
      fa: "مجتمع معدنی پتاس گارلیک",
    },
  },
  {
    image: "/assets/factories/garabogazkarbamid.jpg",
    name: {
      ru: "Завод «Гарабогазкарбамид»",
      en: "Garabogazkarbamid plant",
      tr: "Garabogazkarbamid fabrikası",
      fa: "کارخانه قره‌بغازکاربامید",
    },
  },
  {
    image: "/assets/factories/tejenkarbamid.jpg",
    name: {
      ru: "Завод «Тедженкарбамид»",
      en: "Tejenkarbamid plant",
      tr: "Tejenkarbamid fabrikası",
      fa: "کارخانه تجن‌کاربامید",
    },
  },
  {
    image: "/assets/factories/yodnyyzavod-bereket.jpg",
    name: {
      ru: "Йодный завод «Берекет»",
      en: "Bereket iodine plant",
      tr: "Bereket iyot fabrikası",
      fa: "کارخانه ید برکت",
    },
  },
  {
    image: "/assets/factories/guvlyduz.jpg",
    name: {
      ru: "Комбинат «Гувлыдуз»",
      en: "Guvlyduz works",
      tr: "Guvlyduz kombinası",
      fa: "مجتمع گوولی‌دوز",
    },
  },
  {
    image: "/assets/factories/polimernyy-zavod.jpg",
    name: {
      ru: "Киянлинский полимерный завод",
      en: "Kiyanly polymer plant",
      tr: "Kiyanly polimer fabrikası",
      fa: "کارخانه پلیمر کیانلی",
    },
  },
  {
    image: "/assets/factories/benzin-gaz-ahal.jpg",
    name: {
      ru: "Завод по производству бензина из газа в Ахале",
      en: "Ahal gas-to-gasoline plant",
      tr: "Ahal doğalgazdan benzin fabrikası",
      fa: "کارخانه تولید بنزین از گاز در آخال",
    },
  },
  {
    image: "/assets/factories/neft-zavod.jpg",
    name: {
      ru: "Сейдинский нефтеперерабатывающий завод",
      en: "Seydi oil refinery",
      tr: "Seydi petrol rafinerisi",
      fa: "پالایشگاه نفت سیدی",
    },
  },
];
