function division(a, b) {
    if (b === 0) {
      throw new Error("Pas de division par 0 svp.");
    }
    return a / b;
  }
  
  function calcul() {
    try {
      const result = division(1, 0);
      console.log(result);
    } catch (error) {
      // alert(error.message);
    } finally {
      console.log("FINALLY");
    }
  
    console.log("Hello");
  }
  
  calcul();