/* ─────────────────────────────────────────────
 * TURKISH (TR) — translations
 * ───────────────────────────────────────────── */

import type { de } from "./de";

export const tr: typeof de = {
  /* ── shared / common ── */
  common: {
    services: "Hizmetler",
    learnMore: "Daha Fazla",
    viewProject: "Projeyi Gör",
    viewAllProjects: "Tüm Projeleri Gör",
    startProject: "Projeye Başla",
    startProjectNow: "Hemen Projeye Başla",
    discussProject: "Projeyi Görüşelim",
    theResult: "Sonuç",
    technologies: "Teknolojiler",
    ourProcess: "Sürecimiz",
    ourTechStack: "Teknoloji Yığınımız",
    selectedProjects: "Seçili Projeler",
    readMore: "Devamını Oku",
  },

  cards: {
    viewProject: "Projeyi Gör",
  },

  /* ── AI Solutions page ── */
  ai: {
    breadcrumbService: "Hizmetler",
    breadcrumbPage: "Yapay Zeka Çözümleri",
    heroBadge: "Yapay Zeka Çözümleri & Otomasyon",
    heroTitle1: "İşletmeniz İçin",
    heroTitle2: "Yapay Zeka",
    heroDescription:
      "Akıllı sohbet robotlarından tahmine dayalı analitiğe ve bilgisayar görüşüne kadar — süreçlerinizi otomatikleştiren ve büyümenizi hızlandıran özel yapay zeka çözümleri geliştiriyoruz.",
    heroCtaPrimary: "YZ Danışmanlığı Başlat",
    heroCtaSecondary: "Daha Fazla",

    deliverablesBadge: "YZ Hizmetlerimiz",
    deliverablesTitle1: "Her Sektör İçin ",
    deliverablesTitle2: "Akıllı Çözümler",
    deliverablesSubtitle:
      "Strateji danışmanlığından model geliştirmeye ve entegrasyona kadar — YZ yolculuğunuzun her adımında yanınızdayız.",

    automationBadge: "Akıllı Otomasyon",
    automationTitle1: "YZ'nin Kullanabileceği ",
    automationTitle2: "Sistemler İnşa Ediyoruz",
    automationSubtitle:
      "YZ ajanlarımız karmaşık iş akışlarını otomatik olarak yönetir — veri toplamadan akıllı işlemeye ve sistemlerinizdeki eyleme kadar.",
    automationFeature1Title: "Çok Adımlı İş Akışları",
    automationFeature1Text: "Karmaşık süreçleri otomatik olarak yönetin",
    automationFeature2Title: "Gerçek Zamanlı İşleme",
    automationFeature2Text: "Olaylara ve verilere anında tepki",
    automationFeature3Title: "Akıllı Karar Verme",
    automationFeature3Text: "Her adımda YZ destekli kararlar",

    showcaseBadge: "Başarı Hikayeleri",
    showcaseTitle1: "Akıllı Sistemler ",
    showcaseTitle2: "Uygulamada",
    showcaseSubtitle:
      "Müşterilerimiz için geliştirdiğimiz gerçek YZ çözümleri — e-ticaretten freelancer platformlarına.",
    showcaseResults: "Sonuçlar",
    showcaseCta: "Kendi YZ çözümünüz için hazır mısınız?",
    showcaseCtaButton: "Projeyi Görüşelim",

    system1Desc: "Müşteri talebinden bitmiş eskize kadar YZ doğrulamalı otomatik iş akışı.",
    system1Steps: ["Müşteri Talebi", "GPT Analizi", "Eskiz Oluştur", "Doğrulama", "Geri Bildirim"],
    system1Details: ["E-posta veya form", "Gereksinimleri anla", "YZ tasarımı oluştur", "Kalite kontrolü", "Gerekirse tekrarla"],
    system1Results: ["85% daha hızlı tasarım", "Otomatik doğrulama", "Müşteri memnuniyeti +40%"],

    system2Desc: "YZ birden fazla iş portalını tarar, uygunluğu analiz eder ve otomatik başvuru gönderir.",
    system2Steps: ["İş Tarama", "YZ Eşleştirme", "Teklif Oluşturucu", "Otomatik Gönder", "Takip"],
    system2Details: ["Birden fazla kaynak", "Yetenek analizi", "Kişiselleştirilmiş", "Doğrudan gönder", "Başarı oranı ölçümü"],
    system2Results: ["10 kat daha fazla başvuru", "%75 eşleşme doğruluğu", "Otomatik takipler"],

    system3Title: "Claude için CRM MCP",
    system3Desc: "Claude entegrasyonu, CRM'inizle doğal dil etkileşimi sağlar — hesapları, kişileri ve anlaşmaları sohbet yoluyla yönetin.",
    system3Steps: ["Doğal Dil", "Claude MCP", "CRM Eylemleri", "Gerçek Zamanlı Senkr.", "Akıllı Analizler"],
    system3Details: ["Basit komutlar", "Akıllı arayüz", "Hesaplar & Anlaşmalar", "Anında güncellemeler", "YZ analizleri"],
    system3Results: ["Doğal CRM etkileşimi", "%50 daha hızlı güncelleme", "Claude destekli analizler"],

    showcase1Title: "Müşterilerinizi Anlayan YZ",
    showcase1Text:
      "NLP çözümlerimiz müşteri taleplerini, geri bildirimleri ve belgeleri gerçek zamanlı analiz eder — ekibinize anında eyleme dönüştürülebilir bilgiler sunar.",
    showcase1Bullets: [
      "Doğal diyalog anlayışına sahip sohbet robotları",
      "Otomatik duygu ve niyet analizi",
      "Çok dilli işleme (DE/EN/TR)",
    ],
    showcase2Title: "Verileri Kararlara Dönüştürmek",
    showcase2Text:
      "Tahmine dayalı analitik ve makine öğrenimi ile verilerinizdeki kalıpları belirginleşmeden önce tespit ederiz — proaktif iş kararları için.",
    showcase2Bullets: [
      "Gelir ve talep tahminleri",
      "Müşteri segmentasyonu ve kayıp tahmini",
      "Otomatik anomali tespiti",
    ],
    showcase3Title: "İnsanların Kaçırdıklarını Görmek",
    showcase3Text:
      "Bilgisayar görüşü kusurları tespit eder, nesneleri sınıflandırır ve görsel inceleme süreçlerini otomatikleştirir — her manuel incelemeden daha hızlı ve kesin.",
    showcase3Bullets: [
      "Gerçek zamanlı görüntü tanıma ve sınıflandırma",
      "Üretimde kalite kontrol",
      "OCR ve otomatik belge işleme",
    ],

    processBadge: "YZ Sürecimiz",
    processTitle1: "Kullanım Senaryosundan ",
    processTitle2: "YZ Ürününe",
    processSubtitle: "Başarılı YZ projeleri için kanıtlanmış beş adım.",

    techBadge: "Teknolojiler",
    techTitle: "YZ Yığınımız",
    techSubtitle: "Sağlam, ölçeklenebilir çözümler için öncü YZ çerçeveleri ve bulut altyapısı kullanıyoruz.",

    portfolioBadge: "Seçili YZ Projeleri",
    portfolioTitle: "YZ Portföyümüz",
    portfolioSubtitle: "YZ ve makine öğrenimi projelerimize bir bakış.",
    portfolioLink: "Tüm Projeleri Gör",
    portfolioProjectLink: "Projeyi Gör",

    resultTitle: "Önemli YZ Sonuçları",
    resultText: "YZ çözümlerimiz ölçülebilir sonuçlar sunar — azaltılmış işletme maliyetlerinden hızlandırılmış karar alma süreçlerine.",
    resultStat1: "Otomasyon",
    resultStat2: "Daha Hızlı Analiz",
    resultStat3: "Doğruluk",
    resultStat4: "Erişilebilirlik",
    resultCta: "YZ Projesi Başlat",
  },

  /* ── Web Design page ── */
  web: {
    breadcrumbService: "Hizmetler",
    breadcrumbPage: "Web Tasarım & Geliştirme",
    heroBadge: "Web Tasarım & Full-Stack Geliştirme",
    heroTitle1: "İlham Veren ve",
    heroTitle2: "Dönüştüren Web Siteleri",
    heroDescription:
      "İlk eskizden devam eden operasyonlara kadar — işletmenizi bir üst seviyeye taşıyan özel web siteleri ve web uygulamaları tasarlıyor ve geliştiriyoruz.",
    heroCtaPrimary: "Projeye Başla",
    heroCtaSecondary: "Daha Fazla",

    deliverablesBadge: "Neler Sunuyoruz",
    deliverablesTitle1: "Tek Kaynaktan ",
    deliverablesTitle2: "Her Şey",
    deliverablesSubtitle:
      "Tasarımdan geliştirmeye ve barındırmaya kadar — dijital projenizin tüm yaşam döngüsünü kapsıyoruz.",

    showcase1Title: "Markanızı Güçlendiren Tasarım",
    showcase1Text:
      "Her proje, markanızın derinlemesine anlaşılmasıyla başlar. Sadece harika görünmekle kalmayıp güven inşa eden ve ziyaretçileri müşteriye dönüştüren görsel kimlikler yaratıyoruz.",
    showcase1Bullets: [
      "Şablon yerine özel tasarım konseptleri",
      "Dönüşüm odaklı düzenler",
      "Tutarlı marka deneyimi",
    ],
    showcase2Title: "Ölçeklenen Teknoloji",
    showcase2Text:
      "Her harika tasarımın arkasında sağlam teknoloji vardır. Performanslı, güvenli ve geleceğe yönelik uygulamalar geliştirmek için en son teknolojileri kullanıyoruz.",
    showcase2Bullets: [
      "React, Next.js & TypeScript",
      "Sunucu tarafı API'ler & veritabanları",
      "CI/CD pipeline'ları & otomatik testler",
    ],
    showcase3Title: "İkna Eden Performans",
    showcase3Text:
      "Hız bir lüks değil — bir zorunluluktur. Her sayfayı çok hızlı yükleme süreleri için optimize ediyoruz ve web sitenizin Google'da en üstte yer almasını sağlıyoruz.",
    showcase3Bullets: [
      "Core Web Vitals optimizasyonu",
      "Teknik SEO sayfa içi & sayfa dışı",
      "CDN, önbellekleme & görüntü optimizasyonu",
    ],

    processBadge: "Sürecimiz",
    processTitle1: "Fikirden ",
    processTitle2: "Sonuca",
    processSubtitle: "Maksimum proje başarısı için beş net tanımlanmış aşama.",

    techBadge: "Teknolojiler",
    techTitle: "Teknoloji Yığınımız",
    techSubtitle: "Maksimum performans ve geleceğe hazırlık için kanıtlanmış, modern teknolojiler kullanıyoruz.",

    portfolioBadge: "Seçili Projeler",
    portfolioTitle: "Portföyümüz",
    portfolioSubtitle: "Web tasarım ve geliştirme projelerimize bir bakış.",
    portfolioLink: "Tüm Projeleri Gör",
    portfolioProjectLink: "Projeyi Gör",

    project1Title: "Miso Süpermarket & Fırın",
    project1Desc: "Entegre online mağaza ve sipariş sistemi ile yerel bir süpermarket için modern web tasarım ve dijital çözüm.",
    project2Title: "TechVision Dashboard",
    project2Desc: "Modern UI/UX tasarımı ve duyarlı düzen ile kurumsal bir gösterge panelinin tam yeniden tasarımı.",
    project3Title: "Bella Cucina Restoran",
    project3Desc: "Üst düzey bir İtalyan restoran için online rezervasyon ve dijital menü ile zarif web sitesi.",
    project4Title: "Luxe Moda Online Mağaza",
    project4Desc: "Kişiselleştirilmiş öneriler ve sorunsuz ödeme deneyimi ile üst düzey e-ticaret çözümü.",

    resultTitle: "Sonuç",
    resultText: "İşletmenizi uzun vadede destekleyen hızlı, güvenli ve ölçeklenebilir bir dijital platform — ikna edici ölçülebilir sonuçlarla.",
    resultStat1: "Çalışma Süresi",
    resultStat2: "Yükleme Süresi",
    resultStat3: "Lighthouse",
    resultStat4: "Destek",
    resultCta: "Hemen Projeye Başla",
  },

  /* ── Custom Software page ── */
  software: {
    breadcrumbService: "Hizmetler",
    breadcrumbPage: "Özel Yazılım",
    heroBadge: "Yazılım & Entegrasyonlar",
    heroTitle1: "Süreçlerinizi",
    heroTitle2: "Birleştiren Yazılım",
    heroDescription:
      "Dahili araçlardan API entegrasyonlarına ve tam SaaS platformlarına kadar — sistemlerinizi birleştiren ve ekibinizi daha üretken yapan özel yazılım geliştiriyoruz.",
    heroCtaPrimary: "Projeyi Görüşelim",
    heroCtaSecondary: "Daha Fazla",

    deliverablesBadge: "Hizmetlerimiz",
    deliverablesTitle1: "Size Özel ",
    deliverablesTitle2: "Teknik Mükemmellik",
    deliverablesSubtitle: "Gereksinim analizinden mimariye ve yayına kadar — gerçekten çalışan yazılım sunuyoruz.",

    del1Title: "Özel Yazılım",
    del1Text: "İş mantığınıza ve iş akışlarınıza tam olarak uyarlanmış uygulamalar.",
    del2Title: "API & Sistem Entegrasyonu",
    del2Text: "Üçüncü taraf sistemlere, CRM'lere, ERP'lere ve mevcut altyapıya sorunsuz bağlantı.",
    del3Title: "İş Akışı Otomasyonu",
    del3Text: "Veri uzlaştırmadan karmaşık iş kurallarına kadar tekrarlayan süreçlerin otomasyonu.",
    del4Title: "Gösterge Panelleri & Raporlama",
    del4Text: "Tüm seviyelerde veriye dayalı kararlar için gerçek zamanlı gösterge panelleri ve raporlama sistemleri.",
    del5Title: "SaaS & MVP Geliştirme",
    del5Text: "Konseptten pazara hazır ürüne — hızlı prototipler ve ölçeklenebilir SaaS platformları.",
    del6Title: "Veritabanı Mimarisi",
    del6Text: "SQL ve NoSQL'den gerçek zamanlı veritabanlarına kadar performanslı, ölçeklenebilir veritabanı tasarımları.",
    del7Title: "Güvenlik & Uyumluluk",
    del7Text: "Kurumsal güvenlik, rol tabanlı erişim kontrolü ve GDPR uyumlu veri yönetimi.",
    del8Title: "Bakım & Gelişim",
    del8Text: "Uzun vadeli başarı için sürekli geliştirme, izleme ve teknik destek.",

    step1Title: "Keşif & Gereksinimler",
    step1Text: "İş süreçlerinizin, darboğazlarınızın ve teknik gereksinimlerinizin derinlemesine analizi.",
    step2Title: "Mimari & Planlama",
    step2Text: "Teknik mimari, veri modelleme ve net dönüm noktalarıyla ayrıntılı proje planlaması.",
    step3Title: "Çevik Geliştirme",
    step3Text: "Düzenli demolar ve yakın geri bildirim döngüleriyle sprint'lerde yinelemeli geliştirme.",
    step4Title: "Entegrasyon & KG",
    step4Text: "Sistem entegrasyonu, otomatik testler, güvenlik denetimleri ve aşama dağıtımları.",
    step5Title: "Lansman & Ölçeklendirme",
    step5Text: "Yayına alma, performans izleme ve artan talepler için sürekli optimizasyon.",

    showcase1Title: "Sistemleri Sorunsuz Birleştirmek",
    showcase1Text: "Mevcut araçlarınız — CRM, ERP, muhasebe, e-posta — genellikle izole çalışır. Tüm sistemleri senkronize eden birleşik bir veri köprüsü oluşturuyoruz.",
    showcase1Bullets: [
      "REST & GraphQL API geliştirme",
      "Çift yönlü veri senkronizasyonu",
      "Webhook'lar ve olay güdümlü mimari",
    ],
    showcase2Title: "Süreçleri Otomatikleştirmek",
    showcase2Text: "Manuel veri girişi, belge işleme ve tekrarlayan iş akışları zaman ve para kaybettirir. Otomasyon çözümlerimiz darboğazları ortadan kaldırır.",
    showcase2Bullets: [
      "İş akışı düzenleme ve görev kuyrukları",
      "Otomatik veri doğrulama ve temizleme",
      "Kural tabanlı ve YZ destekli kararlar",
    ],
    showcase3Title: "Ölçeklenebilir Mimariler",
    showcase3Text: "Mikro hizmetlerden konteyner düzenlemesine ve bulut yerel dağıtımlara — işletmenizle birlikte büyüyen yazılım inşa ediyoruz.",
    showcase3Bullets: [
      "Mikro hizmet ve olay güdümlü mimari",
      "Docker & Kubernetes ile konteyner dağıtımları",
      "Otomatik ölçeklendirme ve yük dengeleme",
    ],

    processBadge: "Sürecimiz",
    processTitle1: "Fikirden ",
    processTitle2: "Bitmiş Sisteme",
    processSubtitle: "Başarılı yazılım projeleri için kanıtlanmış beş adım.",

    techBadge: "Teknolojiler",
    techTitle: "Teknoloji Yığınımız",
    techSubtitle: "Sağlam, bakımı kolay sistemler için kanıtlanmış backend teknolojileri ve bulut altyapısı kullanıyoruz.",

    portfolioBadge: "Seçili Projeler",
    portfolioTitle: "Yazılım Portföyümüz",
    portfolioSubtitle: "Yazılım ve entegrasyon projelerimize bir bakış.",
    portfolioLink: "Tüm Projeleri Gör",
    portfolioProjectLink: "Projeyi Gör",

    project1Title: "Kurumsal ERP Entegrasyonu",
    project1Desc: "Eski ERP sisteminin modern bulut hizmetleriyle tam entegrasyonu — gerçek zamanlı veri senkronizasyonu ve özel API katmanı dahil.",
    project2Title: "Lojistik Yönetim Platformu",
    project2Desc: "Gerçek zamanlı takip, otomatik rota optimizasyonu ve entegre depo yönetimi ile özel lojistik platformu.",
    project3Title: "Satış İçin Özel CRM",
    project3Desc: "Pipeline yönetimi, lead puanlama ve sorunsuz e-posta entegrasyonu ile sektöre özel CRM sistemi.",
    project4Title: "DevOps & CI/CD Pipeline",
    project4Desc: "Kod olarak altyapı, konteyner düzenlemesi ve kapsamlı izleme ile otomatik dağıtım pipeline'ı.",

    resultTitle: "Sonuç",
    resultText: "Darboğazları ortadan kaldıran, manuel işi azaltan ve büyümenizi sağlayan verimli, bağlı sistemler — ölçülebilir sonuçlarla.",
    resultStat1: "Daha Az Manuel İş",
    resultStat2: "Çalışma Süresi",
    resultStat3: "Daha Hızlı",
    resultStat4: "Entegre",
    resultCta: "Hemen Projeye Başla",
  },
} as const;
