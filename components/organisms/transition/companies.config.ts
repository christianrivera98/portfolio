export interface CompanyInfo {
  id: string
  title: string
  logo: string
  stack: string[]
  transparentLogo?: boolean
}

const TB = "/projects/toolbooks/logos_stack"
const QP = "/projects/qper/logos_stack"
const G5 = "/projects/geeks5g/losgos_stack"
const BC = "/projects/bancolombia/logos_stack"
const DS = "/projects/dicosoftDigital"
const RK = "/projects/Rad%20Kiddo/logos_stack"

export const COMPANIES: CompanyInfo[] = [
  {
    id: "toolbooks",
    title: "Toolbooks Corp",
    logo: "/projects/toolbooks/logo_company.png",
    stack: [
      `${TB}/googlemaps/googleMaps.svg`, `${TB}/js/javascript.svg`,
      `${TB}/nest/nestjs.svg`, `${TB}/nextjs/nextjs_icon_dark.svg`,
      `${TB}/postgrestSQL/postgresql.svg`, `${TB}/React_light_dark/React_dark.svg`,
      `${TB}/redux/redux.svg`, `${TB}/shadcn/ui_dark.svg`,
      `${TB}/socket.io/Socket.IO_dark.svg`, `${TB}/stripe/stripe_wordmark.svg`,
      `${TB}/tailwind/tailwindcss.svg`, `${TB}/tantstack/tanstack.svg`,
      `${TB}/ts/typescript.svg`, `${TB}/vitest/vitest.svg`, `${TB}/zod/zod.svg`,
    ],
  },
  {
    id: "precision-logistica",
    title: "Precision Logistica",
    logo: "/projects/qper/logo-full.png",
    transparentLogo: true,
    stack: [
      `${QP}/nextjs/nextjs_icon_dark.svg`, `${QP}/React_light_dark/React_dark.svg`,
      `${QP}/shadcn/ui_dark.svg`, `${QP}/tailwind/tailwindcss.svg`,
      `${QP}/tantstack/tanstack.svg`, `${QP}/ts/typescript.svg`,
      `${QP}/vitest/vitest.svg`, `${QP}/zod/zod.svg`,
    ],
  },
  {
    id: "geeks5g",
    title: "Geeks5G",
    logo: "/projects/geeks5g/logo-company.png",
    stack: [
      `${G5}/googlemaps/googleMaps.svg`, `${G5}/nextjs/nextjs_icon_dark.svg`,
      `${G5}/React_light_dark/React_dark.svg`, `${G5}/redux/redux.svg`,
      `${G5}/shadcn/ui_dark.svg`, `${G5}/socket.io/Socket.IO_dark.svg`,
      `${G5}/tailwind/tailwindcss.svg`, `${G5}/tantstack/tanstack.svg`,
      `${G5}/ts/typescript.svg`, `${G5}/vitest/vitest.svg`, `${G5}/zod/zod.svg`,
    ],
  },
  {
    id: "bancolombia",
    title: "Bancolombia",
    logo: "/projects/bancolombia/logo-company.png",
    transparentLogo: true,
    stack: [
      `${BC}/angular/angular.svg`, `${BC}/azure/azure.svg`, `${BC}/java/java.svg`,
      `${BC}/postgrestSQL/postgresql.svg`, `${BC}/spring/spring.svg`,
    ],
  },
  {
    id: "dicosoft",
    title: "DicoSoft Digital",
    logo: "/projects/dicosoftDigital/logo-company.png",
    transparentLogo: true,
    stack: [
      `${DS}/css/css_old.svg`, `${DS}/googleAnalitics/google-analytics.svg`,
      `${DS}/html/html5.svg`, `${DS}/js/javascript.svg`, `${DS}/wordpress/wordpress.svg`,
    ],
  },
  {
    id: "radkiddo",
    title: "Rad Kiddo",
    logo: "/projects/Rad%20Kiddo/logos_stack/logo-company.png",
    stack: [
      `${RK}/css/css_old.svg`, `${RK}/js/javascript.svg`,
      `${RK}/postgrestSQL/postgresql.svg`, `${RK}/stripe/stripe_wordmark.svg`,
      `${RK}/wordpress/wordpress.svg`,
    ],
  },
]
