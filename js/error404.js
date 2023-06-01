setTimeout(() => {
    let urlActual = window.location.href;
  
    if (urlActual.includes("error404.html")) {
      window.location.href = "../index.html";
    }
  }, 8000);
  