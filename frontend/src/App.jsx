import Home from "./pages/Home";
import { useLanguage } from "./store/LanguageState";

const App = () => {
  const lang = useLanguage((state) => state.current_language);
  return (
    <div className="app" data-lang={lang}>
      <Home />
    </div>
  );
};

export default App;
