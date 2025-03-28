// mockData.js
export const fastReadingExercises = [
    { 
      id: 1, // bir sonraki 1 artacak
      title: "13 nokta Egzerisiz", 
      urlName: "13-dot-eye", 
      description: "Göz kaslarını güçlendirerek okuma hızını artıran egzersizler." // degistirmeye gerek yok
    },

    { 
      id: 2, // bir sonraki 1 artacak
      title: "ZigZag", 
      urlName: "zig-zag", 
      description: "Göz kaslarını güçlendirerek okuma hızını artıran egzersizler." // degistirmeye gerek yok
    },
    
  ];
  
  export const fastReadingWorkouts = [
    { 
      id: 1, // bir sonraki 1 artacak
      title: "Temel Okuma Çalışması", 
      urlName: "temel-okuma-calismasi",
      description: "Hızlı okuma tekniklerinin temel prensiplerini uygulamalı olarak öğreten çalışma." // degistirmeye gerek yok
    },
    
  ];
  
  export const fastReadingTests = [
    { 
      id: 1, // bir sonraki 1 artacak
      title: "Hız Ölçme Testi", 
      urlName: "speed-reading-test",
      description: "Dakikada okunan kelime sayısını ölçen standart test." // degistirmeye gerek yok
    },
  ];
  
  // Route paths for navigation
  export const routes = {
    exercises: "/exercises",
    workouts: "/workouts",
    tests: "/tests"
  };
  
  // Base path for routing
  export const basePath = "/app";