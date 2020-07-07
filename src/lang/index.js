import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import viLang from './entries/vi-VN';

const AppLocale = {
    en: enLang,
    vi: viLang,
};

addLocaleData(AppLocale.vi.data)
addLocaleData(AppLocale.en.data);

export default AppLocale;
