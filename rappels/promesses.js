function genereGrandRandom(success, echec){
    setTimeout(() =>{
        const random = Math.random().toFixed(2)
        if (random > 0.5) {
            success("Succès grand random : " + random)
        } else {
            echec("Echec petit random : " + random)
        }
    },2000)
}

const promesse = new Promise(genereGrandRandom)
promesse.then((responseSucces) => {
    console.log("Reponse positive", responseSucces)
}).catch((responseEchec) => {
    console.log("Reponse négative", responseEchec)
})