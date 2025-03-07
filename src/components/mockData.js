// mockData.js
export const fastReadingExercises = [
    { 
      id: 1, 
      title: "Göz Kaslarını Geliştirme Egzersizi", 
      urlName: "goz-kaslari-gelistirme", 
      new: true,
      description: "Göz kaslarını güçlendirerek okuma hızını artıran egzersizler."
    },
    { 
      id: 2, 
      title: "Görme Alanını Genişletme Egzersizi", 
      urlName: "gorme-alani-genisletme", 
      new: false,
      description: "Periferik görüşü geliştirerek daha fazla metni tek seferde algılama yeteneği kazandıran çalışmalar."
    },
    { 
      id: 3, 
      title: "Hızlı Odaklanma Egzersizi", 
      urlName: "hizli-odaklanma", 
      new: true,
      description: "Metinden metine hızlı geçiş yapabilme ve odaklanma yeteneğini geliştiren egzersizler."
    },
    { 
      id: 4, 
      title: "Göz Sıçraması Egzersizi", 
      urlName: "goz-sicramasi", 
      new: false,
      description: "Gözün satır üzerinde düzenli sıçramalarla ilerlemesini sağlayan egzersizler."
    }
  ];
  
  export const fastReadingWorkouts = [
    { 
      id: 1, 
      title: "Temel Okuma Çalışması", 
      urlName: "temel-okuma-calismasi",
      description: "Hızlı okuma tekniklerinin temel prensiplerini uygulamalı olarak öğreten çalışma."
    },
    { 
      id: 2, 
      title: "İleri Seviye Okuma Çalışması", 
      urlName: "ileri-seviye-okuma-calismasi",
      description: "Deneyimli okuyucular için hızı artırmaya yönelik ileri seviye çalışmalar."
    },
    { 
      id: 3, 
      title: "Ritmik Okuma Çalışması", 
      urlName: "ritmik-okuma-calismasi",
      description: "Düzenli ritimde okumayı geliştiren, zamanlı okuma alıştırmaları."
    },
    { 
      id: 4, 
      title: "Kelime Grupları Okuma", 
      urlName: "kelime-gruplari-okuma",
      description: "Kelimeleri tek tek değil gruplar halinde okumayı öğreten çalışma."
    }
  ];
  
  export const fastReadingTests = [
    { 
      id: 1, 
      title: "Hız Ölçme Testi", 
      urlName: "speed-reading-test",
      description: "Dakikada okunan kelime sayısını ölçen standart test."
    },
    { 
      id: 2, 
      title: "Anlama Testi", 
      urlName: "anlama-testi",
      description: "Okuduğunu anlama yeteneğini ölçen kapsamlı test."
    },
    { 
      id: 3, 
      title: "Karma Test", 
      urlName: "karma-test",
      description: "Hem hız hem de anlama yeteneğini birlikte ölçen test."
    }
  ];
  
  // Route paths for navigation
  export const routes = {
    exercises: "/gelisim/egzersizler",
    workouts: "/gelisim/calisma",
    tests: "/gelisim/test"
  };
  
  // Base path for routing
  export const basePath = "/app";