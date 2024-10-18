## Internationalization (i18n) Guide

This project uses `i18next` and `react-i18next` to manage translations and language switching for both Left-to-Right (LTR) and Right-to-Left (RTL) language support.

### 1. Setup Overview

The i18n configuration is set up with:

- `i18next` for managing translation resources.
- `react-i18next` for React integration.
- `i18next-browser-languagedetector` for detecting the user's language.

The translations are structured by namespace (e.g., `common`, `auth`) for different sections of the app.

### 2. File Structure

The i18n setup uses the following main files:

- **`src/index.ts`**: Initializes `i18next` with translation resources.
- **`src/context/I18nContext.tsx`**: Provides a custom context for managing language state and switching.
- **`src/components/LanguageSwitcher.tsx`**: A component for toggling between languages.

### 3. Adding a New Feature's Translations

To keep translations modular, each feature can have its translations stored separately. Follow these steps to add translations for a new feature.

#### Step 1: Organize Translations

1. Create a translations folder inside the feature's directory. For example:

   ```
   src/features/auth/translations/en.json
   src/features/auth/translations/ar.json
   ```

2. In each translation file, define the keys and values:

   ```json
   // en.json
   {
     "login": "Login",
     "signup": "Sign Up"
   }
   ```

   ```json
   // ar.json
   {
     "login": "تسجيل الدخول",
     "signup": "اشتراك"
   }
   ```

#### Step 2: Update `index.ts` to Dynamically Import Translations

Modify the i18n initialization to allow dynamic loading of translations based on the feature:

1. **Dynamic Resource Loader Function**:
   Create a utility function to add translations for a new feature.

   ```typescript
   export const addFeatureTranslations = async (featureName: string) => {
     const [en, ar] = await Promise.all([
       import(`./features/${featureName}/translations/en.json`),
       import(`./features/${featureName}/translations/ar.json`),
     ]);
     i18n.addResources("en", featureName, en.default);
     i18n.addResources("ar", featureName, ar.default);
   };
   ```

2. **Usage**:
   Call the `addFeatureTranslations` function when the feature component is loaded.
   ```typescript
   useEffect(() => {
     addFeatureTranslations("auth");
   }, []);
   ```

### 4. Using `I18nContext` for Language Management

The `I18nContext` provides the current language and a function to toggle the language.

1. **Wrap Your Application with `I18nProvider`**:
   In your main `App.tsx`, wrap the app with the `I18nProvider`:

   ```tsx
   import { I18nProvider } from "./context/I18nContext";

   const App: React.FC = () => (
     <I18nProvider>
       <YourRoutes />
     </I18nProvider>
   );

   export default App;
   ```

2. **Using `LanguageSwitcher`**:
   Use the `LanguageSwitcher` component wherever you want to provide a language toggle button:

   ```tsx
   import LanguageSwitcher from "./components/LanguageSwitcher";

   const Header: React.FC = () => (
     <header>
       <LanguageSwitcher />
     </header>
   );
   ```

### 5. Managing RTL and LTR

The `I18nContext` manages the text direction automatically by setting the `dir` attribute on the `<html>` element based on the selected language. It defaults to:

- **`rtl`** for Arabic (`ar`).
- **`ltr`** for English (`en`).

### 6. Advanced Configuration

You can extend the current configuration to:

- Add more languages by expanding the `resources` in `index.ts`.
- Include custom namespaces for specific components or features.
- Change the default namespace by updating `defaultNS` in the i18n configuration.
