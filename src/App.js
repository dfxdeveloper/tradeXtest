import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

function App() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.innerHTML = `window.$zoho=window.$zoho || {}; $zoho.salesiq=$zoho.salesiq||{ready:function(){}};`;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://salesiq.zohopublic.in/widget?wc=siq7b3401cab4c755580cf429c3b99c1428c7bf50a77df3e1c8f091b4081549c8f1e621188b46097d73a2373218c2834c43";
    script2.defer = true;
    script2.id = "zsiqscript";
    document.body.appendChild(script2);

    return () => {
      document.getElementById("zsiqscript")?.remove();
    };
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
