# Lunaria Candles · website

Static site (HTML/CSS/JS, χωρίς build). Ανοίγει απευθείας με διπλό κλικ στο `index.html` ή ανεβαίνει σε GitHub Pages / Netlify / οποιοδήποτε hosting.

## Αρχεία
| Αρχείο | Τι είναι |
|---|---|
| `index.html` | Η σελίδα (hero, συλλογές, σχετικά, gallery, φόρμα, footer) |
| `styles.css` | Εμφάνιση: μαύρο/χρυσό από το logo |
| `products.js` | **Ρυθμίσεις + κατάλογος προϊόντων + gallery**: εδώ γίνονται όλες οι αλλαγές περιεχομένου |
| `app.js` | Λογική: φίλτρα, λίστα παραγγελίας, αποστολή φόρμας |
| `assets/img/` | Βελτιστοποιημένες εικόνες (webp 4:5) |
| `_source/instagram/` | Οι αρχικές εικόνες από το Instagram (δεν χρησιμοποιούνται από το site) |

## Νέο προϊόν
1. Βάλε τη φωτογραφία στο `assets/img/` (ιδανικά κάθετη 4:5, ~720×900, webp ή jpg).
2. Στο `products.js` αντέγραψε ένα block στο `PRODUCTS` και άλλαξε `id`, `name`, `description`, `image`, `category`, προαιρετικά `price` (αριθμός σε €), `options`, `badge`.

## Φόρμα παραγγελίας
Το site δεν έχει backend. Η φόρμα δουλεύει με τρεις τρόπους, με αυτή τη σειρά:
1. **Web3Forms** (προτείνεται): φτιάξε δωρεάν access key στο https://web3forms.com με το email που θα λαμβάνει τις παραγγελίες και βάλ' το στο `web3formsKey` του `products.js`. Κάθε αίτημα έρχεται ως email.
2. **mailto**: αν δεν υπάρχει key αλλά έχει οριστεί `email`, ανοίγει το πρόγραμμα email του πελάτη με έτοιμο μήνυμα.
3. **Instagram DM**: αν δεν υπάρχει ούτε email, το μήνυμα αντιγράφεται και ανοίγει συνομιλία με το @lunariacandles_gr.

## Deploy σε GitHub Pages
Repo → Settings → Pages → Source: `main` / root. Για custom domain πρόσθεσε αρχείο `CNAME` με το domain.
