/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "vi";
export const localeOptions = [
  { id: "vi", name: "Việt Nam", direction: "ltr" },
  { id: "en", name: "English - LTR", direction: "ltr" },
];

export const searchPath = "/app/pages/search";
export const servicePath = "https://api.coloredstrategies.com";
export const serverPath = "http://localhost:8080"
export const apiActor = serverPath + "/api/actors/"
export const firebaseConfig = {
  apiKey: "AIzaSyCCeL2iNBnZq-8rRa1vPapvwmrfLnhNnT4",
  authDomain: "movie-app-d4c77.firebaseapp.com",
  databaseURL: "https://movie-app-d4c77.firebaseio.com",
  projectId: "movie-app-d4c77",
  storageBucket: "movie-app-d4c77.appspot.com",
  messagingSenderId: "143204726096",
  appId: "1:143204726096:web:065125eeb81e8ce02ba855",
  measurementId: "G-FD9Y1ZY950"
};
/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const themeColorStorageKey = "__theme_color"
export const isMultiColorActive = true;
export const isDarkSwitchActive = true;
export const defaultColor = "light.purple";
export const defaultDirection = "ltr";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = true;
export const DEFAULT_IMAGE = "http://via.placeholder.com/92x136"
export const FIREBASE_PATH = "gs://movie-app-d4c77.appspot.com"
export const HTTP_STATUS = {NOT_FOUND : "NOT_FOUND",
CREATED : "CREATED",
OK : "OK",
BAD_REQUEST : "BAD_REQUEST",};