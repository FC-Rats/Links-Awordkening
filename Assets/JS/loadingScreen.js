// Fonction pour afficher l'écran de chargement
function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'flex';
  }
  
  // Fonction pour cacher l'écran de chargement
  function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
  }
  
  // Exemple d'utilisation : 
  showLoadingScreen();
  
  // Simule un chargement pendant au moins 1.5 secondes avant de masquer l'écran de chargement
  setTimeout(function() {
    hideLoadingScreen();
  }, 1500); // 1500 millisecondes = 1.5 secondes, ajustez ce délai selon vos besoins
  
  // Fonction pour cacher l'écran de chargement avec un effet de fondu
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = 0; // Réduit l'opacité progressivement
  
    // Attendre la fin de l'animation de fondu avant de masquer complètement
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500); // Temps de transition (en millisecondes)
  }
  
  // Exemple d'utilisation :
  setTimeout(function() {
    hideLoadingScreen();
  }, 3000); // Simule un chargement pendant 1.5 secondes
  