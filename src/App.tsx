import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  const { t } = useTranslation("auth");

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gray-100">
      <LanguageSwitcher />

      <div className="flex items-center justify-between w-full px-12">
        <h1 className="text-3xl font-bold text-blue-500 mb-4">
          {t("welcome")}
        </h1>
        <div>
          <button className="border">{t("click")}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
