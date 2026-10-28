/* ==========================================================================
   Lunaria Candles — ρυθμίσεις & κατάλογος
   Για να προσθέσεις προϊόν: αντέγραψε ένα block στο PRODUCTS και άλλαξε τα πεδία.
   - id: μοναδικό, λατινικά χωρίς κενά
   - category: ένα από τα id του CATEGORIES
   - price: αριθμός σε € (π.χ. 14) ή null για "Επικοινωνήστε μαζί μας"
   - image: αρχείο μέσα στο assets/img/
   - options: (προαιρετικό) λίστα επιλογών αρώματος/χρώματος
   - badge: (προαιρετικό) μικρή ετικέτα, π.χ. "Νέο", "Εποχιακό"
   ========================================================================== */

window.LUNARIA_CONFIG = {
  // Δωρεάν κλειδί από https://web3forms.com (μπαίνεις με το email που θα δέχεται τις παραγγελίες).
  // Αν μείνει κενό, η φόρμα ανοίγει έτοιμο email (mailto) ή αντιγράφει το μήνυμα για Instagram DM.
  web3formsKey: "",
  email: "",        // π.χ. "hello@lunariacandles.gr"
  phone: "",        // π.χ. "+30 69x xxx xxxx"
  instagram: "https://www.instagram.com/lunariacandles_gr/",
  tiktok: "https://www.tiktok.com/@lunariacandles8",
  location: "Ελλάδα" // πόλη/περιοχή
};

window.CATEGORIES = [
  { id: "desserts", name: "Κεριά-Γλυκά", blurb: "Μοιάζουν με γλυκό, μυρίζουν σαν γλυκό. Δεν τρώγονται." },
  { id: "flowers", name: "Λουλούδια & Ανθοδέσμες", blurb: "Ανθοδέσμες από κερί που κρατάνε για πάντα." },
  { id: "perfume", name: "Αρώματα-Έμπνευση", blurb: "Κεριά σε βάζο με αρώματα εμπνευσμένα από αγαπημένα αρώματα." },
  { id: "gifts", name: "Δώρα & Σετ", blurb: "Έτοιμα δώρα και εξατομικευμένα κεριά για κάθε περίσταση." },
  { id: "seasonal", name: "Εποχιακά", blurb: "Χριστούγεννα, Άγιος Βαλεντίνος, Πάσχα." }
];

window.PRODUCTS = [
  // ---------- Κεριά-Γλυκά ----------
  {
    id: "gingerbread",
    category: "desserts",
    name: "Gingerbread",
    description: "Κερί σόγιας σε ποτήρι με χειροποίητο μπισκοτάνθρωπο από κερί και αφρό από «σαντιγί».",
    price: null,
    image: "gingerbread.webp",
    badge: "Αγαπημένο"
  },
  {
    id: "melomakarono-kourabies",
    category: "desserts",
    name: "Μελομακάρονο & Κουραμπιές",
    description: "Όλα τα αρώματα των Χριστουγέννων σε ένα κερί. Μέλι, κανέλα, βούτυρο και ζάχαρη άχνη.",
    price: null,
    image: "kourabies.webp",
    options: ["Μελομακάρονο", "Κουραμπιές", "Cinnamon roll", "Gingerbread"],
    badge: "Εποχιακό"
  },
  {
    id: "oreo",
    category: "desserts",
    name: "Oreo Cream",
    description: "Κρεμώδες κερί με μπισκότο από κερί και «τρίμμα» μπισκότου στην κορυφή.",
    price: null,
    image: "oreo.webp",
    options: ["Oreo", "Lacta", "Lemon pie"]
  },
  {
    id: "ferrero",
    category: "desserts",
    name: "Ferrero Rocher",
    description: "Φουντουκάτο, σοκολατένιο, με διακόσμηση σαν μπουκιά γλυκού.",
    price: null,
    image: "ferrero.webp",
    options: ["Ferrero Rocher", "Bueno"]
  },
  {
    id: "hot-chocolate",
    category: "desserts",
    name: "Ζεστή Σοκολάτα",
    description: "100% κερί σόγιας με άρωμα ζεστής σοκολάτας.",
    price: null,
    image: "hot-chocolate.webp"
  },
  {
    id: "cocktail",
    category: "desserts",
    name: "Κεριά σε Ποτήρι Κοκτέιλ",
    description: "Κεριά σε ποτήρι martini με φρουτένια διακόσμηση και αρκουδάκια από κερί.",
    price: null,
    image: "cocktail-set.webp"
  },

  // ---------- Λουλούδια ----------
  {
    id: "flower-jar",
    category: "flowers",
    name: "Κερί-Λουλούδι",
    description: "Κερί σε ποτήρι με χειροποίητη μαργαρίτα ή ηλίανθο από κερί.",
    price: null,
    image: "flowers-sunflower.webp",
    options: ["Ηλίανθος", "Μαργαρίτα"]
  },
  {
    id: "peony",
    category: "flowers",
    name: "Παιώνια & Φράουλα",
    description: "Απαλό κερί με παιώνια ή φράουλες από κερί. Σε πολλά χρώματα.",
    price: null,
    image: "peony-strawberry.webp"
  },
  {
    id: "bouquet",
    category: "flowers",
    name: "Ανθοδέσμη από Κεριά",
    description: "Κάθε πέταλο φτιαγμένο στο χέρι. Ο τρόπος να πεις «σ' αγαπώ» με κάτι που μένει αναλλοίωτο στον χρόνο.",
    price: null,
    image: "bouquet-valentine.webp",
    options: ["Κόκκινα τριαντάφυλλα", "Ροζ ζέρμπερες", "Γαλάζιο αρκουδάκι", "Δικό μου σχέδιο"],
    badge: "Κατόπιν παραγγελίας"
  },
  {
    id: "bouquet-pink",
    category: "flowers",
    name: "Ανθοδέσμη Pastel",
    description: "Ζέρμπερες, τριαντάφυλλα και κουκουνάρι από κερί σε ροζ αποχρώσεις.",
    price: null,
    image: "bouquet-pink.webp",
    badge: "Κατόπιν παραγγελίας"
  },

  // ---------- Αρώματα ----------
  {
    id: "perfume-jar",
    category: "perfume",
    name: "Κερί σε Βάζο",
    description: "Κομψό γυάλινο βάζο με καπάκι, με αρώματα εμπνευσμένα από γνωστά αρώματα.",
    price: null,
    image: "perfume-jars.webp",
    options: ["Black Opium", "La Bomba"]
  },

  // ---------- Δώρα ----------
  {
    id: "giftbox",
    category: "gifts",
    name: "Gift Box",
    description: "Κουτί δώρου με κερί-γλυκό και εορταστική διακόσμηση, έτοιμο να το χαρίσεις.",
    price: null,
    image: "xmas-giftbox.webp"
  },
  {
    id: "personalised",
    category: "gifts",
    name: "Εξατομικευμένο Κερί",
    description: "Με όνομα ή μήνυμα της επιλογής σου, π.χ. «For my sister». Γράψε μας το κείμενο στις σημειώσεις.",
    price: null,
    image: "personalised.webp"
  },

  // ---------- Εποχιακά ----------
  {
    id: "xmas-set",
    category: "seasonal",
    name: "Χριστουγεννιάτικη Συλλογή",
    description: "Κεριά-γλυκά σε χριστουγεννιάτικη εκδοχή. Ιδανικά για δώρα στο γραφείο και στην οικογένεια.",
    price: null,
    image: "xmas-set.webp",
    badge: "Εποχιακό"
  },
  {
    id: "valentine",
    category: "seasonal",
    name: "Valentine's",
    description: "Τριαντάφυλλα, καρδιές και αρκουδάκια από κερί για τις 14 Φεβρουαρίου.",
    price: null,
    image: "valentine-rose.webp",
    badge: "Εποχιακό"
  },
  {
    id: "lampada",
    category: "seasonal",
    name: "Αρωματική Λαμπάδα",
    description: "Τη φτιάχνεις όπως τη φαντάζεσαι (χρώμα, άρωμα, σχέδιο, όνομα). Μετά την Ανάσταση τη λιώνεις στο wax warmer και αρωματίζεις το σπίτι για εβδομάδες.",
    price: null,
    image: "lampada-butterflies.webp",
    options: ["Πεταλούδες", "Φτερά", "Με όνομα", "Χαρακτήρας / ήρωας", "Δικό μου σχέδιο"],
    badge: "Πάσχα"
  }
];

// Φωτογραφίες για το gallery (εμφανίζονται με τη σειρά)
window.GALLERY = [
  "gingerbread-hand.webp", "bouquet-blue.webp", "xmas-teddy-bowl.webp", "valentine-teddy.webp",
  "lampada-anime.webp", "cocktail-set.webp", "lampades-names.webp", "lampada-feathers.webp"
];
