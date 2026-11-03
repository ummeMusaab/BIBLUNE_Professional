const BOOKS = [
    {
    id: 1,
    title: "The Sword of Allah",
    author: "Lieutenant General A. I. Akram",
    price: 280,
    image: "Images/the-sord-250x390.jpg",
    category: "Islamic History & Biography",
    tag: "Reader favourite"
},
{
    id: 2,
    title: "Tumi Shei Rani",
    author: "Dr. Muhammad Bin Abdur Rahman",
    price: 250,
    image: "Images/tumi-sei-rani-250x381.jpg",
    category: "Islamic Literature & Inspirational Stories",
    tag: "Popular"
},
{
    id: 3,
    title: "Itihasher Aynay",
    author: "Hedayetullah Mehmand",
    price: 344,
    image: "Images/Itihasher Aynay.webp",
    category: "Islamic History & Biography",
    tag: "Editor's pick"
},
{
    id: 4,
    title: "Muslimder Potone Bishaw Ki Haralo",
    author: "Sayed Abul Hasan Ali Nadwi",
    price: 400,
    image: "Images/muslimder potone.webp",
    category: "Islamic Society & Contemporary Issues",
    tag: "Thoughtful read"
},
{
    id: 5,
    title: "Laa Tahzan",
    author: "Dr. Aaidh al-Qarni",
    price: 400,
    image: "Images/la-tahzan-1-250x386.webp",
    category: "Islamic Knowledge & Spirituality",
    tag: "Bestseller"
},
{
    id: 6,
    title: "Amar Amma",
    author: "Sayed Abul Hasan Ali Nadwi",
    price: 301,
    image: "Images/Amar amma.webp",
    category: "Islamic Literature & Inspirational Stories",
    tag: "Heartwarming"
},
{
    id: 7,
    title: "Nari Jiboner Shukh Shongram",
    author: "Dr. Abdullah Al Mu'ti & Huda Said Bahlul",
    price: 200,
    image: "Images/nari jiboner shukh shongram.jfif",
    category: "Islamic Society & Contemporary Issues",
    tag: "Inspiring"
},
{
    id: 8,
    title: "Nanga Tolowar",
    author: "Enayetullah Altamash",
    price: 460,
    image: "Images/nanga-toloyar-2173-250x375.jpeg",
    category: "Historical Fiction & Adventure",
    tag: "Historical"
},
{
    id: 9,
    title: "Islami O Choloman Ortho Banijjo",
    author: "Mufti Taqi Usmani",
    price: 150,
    image: "Images/islami-o-coloman-orth-banijjo-250x390.png",
    category: "Islamic Knowledge & Spirituality",
    tag: "Essential"
},
{
    id: 10,
    title: "Imandipto Dastan",
    author: "Enayetullah Altamash",
    price: 150,
    image: "Images/Imandipto dastan.webp",
    category: "Islamic Literature & Inspirational Stories",
    tag: "Story collection"
},
{
    id: 11,
    title: "Arab Konyar Artonad",
    author: "Enayetullah Altamash",
    price: 241,
    image: "Images/arab-konyar-artonad-250x374.webp",
    category: "Historical Fiction & Adventure",
    tag: "Reader favourite"
},
{
    id: 12,
    title: "KalNagini",
    author: "Enayetullah Altamash",
    price: 400,
    image: "Images/KalNagini-250x350.jpg",
    category: "Historical Fiction & Adventure",
    tag: "Adventure"
}
];
const CATEGORIES = [
    {
    name: "Islamic History & Biography",
    image: "Images/Islamic history & biography.png",
    description: "Explore remarkable lives, turning points in history and the legacy of Muslim civilization."
},
{
    name: "Islamic Knowledge & Spirituality",
    image: "Images/Islamic knowledge & spirituality.png",
    description: "Thoughtful reads on faith, Islamic teachings and nurturing the inner self."
},
{
    name: "Islamic Society & Contemporary Issues",
    image: "Images/Islamic society & contemporary issues.png",
    description: "Books exploring society, everyday challenges and the world around us."
},
{
    name: "Historical Fiction & Adventure",
    image: "Images/Historical fiction & adventure.png",
    description: "Travel through unforgettable stories, daring journeys and historical worlds."
},
{
    name: "Islamic Literature & Inspirational Stories",
    image: "Images/Islamic Literature and inspirational stories.png",
    description: "Meaningful stories and literature that leave a lasting impression."
}
];
const money = n => "৳" + Number ( n).toLocaleString ( "en-BD");
const bookCard = ( book) => `<article class="book-card"><div class="book-cover"><span class="book-tag">${book.tag}</span><img src="${book.image}" alt="${book.title} book cover" loading="lazy"></div><div class="book-info"><p class="book-category">${book.category}</p><h3>${book.title}</h3><p class="book-author">by ${book.author}</p><div class="book-bottom"><span class="price">${money(book.price)}</span><button class="add-btn" type="button" data-add="${book.id}" aria-label="Add ${book.title} to cart" title="Add to cart">+</button></div></div></article>`;
function renderBooks ( target, list) {
    const el = document.querySelector ( target);
    if ( ! el) return;
    el.innerHTML = list.length ? list.map ( bookCard).join ( ""): `<div class="empty-state"><strong>No books found</strong>Try another title or category.</div>`;
}
function renderCategories ( target) {
    const el = document.querySelector ( target);
    if ( ! el) return;
    el.innerHTML = CATEGORIES.map ( ( c, i) => `<a class="category-card" href="Books.html?category=${encodeURIComponent(c.name)}"><img src="${c.image}" alt="" loading="lazy"><div class="category-copy"><span>Collection 0${i+1}</span><h3>${c.name}</h3></div></a>`).join ( "");
}
function getCart () {
    try {
        return JSON.parse ( localStorage.getItem ( "bibluneCart") || "[]")
    }
    catch {
        return []
    }
}
function saveCart ( cart) {
    localStorage.setItem ( "bibluneCart", JSON.stringify ( cart));
    updateCartUI ()
}
function addToCart ( id) {
    const cart = getCart ();
    const item = cart.find ( x => x.id === id);
    if ( item) item.qty ++;
    else cart.push ( {
        id, qty: 1
    }
    );
    saveCart ( cart);
    showToast ( "Added to your book bag");
}
function updateCartUI () {
    const cart = getCart ();
    const count = cart.reduce ( ( n, x) => n + x.qty, 0);
    document.querySelectorAll ( "[data-cart-count]").forEach ( el => el.textContent = count);
    const items = document.querySelector ( "#cartItems");
    if ( ! items) return;
    const valid = cart.map ( x => ( {
        ...x, book: BOOKS.find ( b => b.id === x.id)
    }
    )).filter ( x => x.book);
    if ( ! valid.length) {
        items.innerHTML = '<div class="empty-state"><strong>Your book bag is waiting</strong>Add a book you would love to read.</div>'
    }
    else {
        items.innerHTML = valid.map ( x => `<div class="cart-item"><img src="${x.book.image}" alt=""><div><h3>${x.book.title}</h3><p>${money(x.book.price)} each</p><div class="qty-control"><button data-qty="${x.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-qty="${x.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${x.id}">Remove</button></div>`).join ( "")
    }
    const total = valid.reduce ( ( n, x) => n + x.qty * x.book.price, 0);
    const totalEl = document.querySelector ( "#cartTotal");
    if ( totalEl) totalEl.textContent = money ( total);
    const checkout = document.querySelector ( "#checkoutBtn");
    if ( checkout) checkout.disabled = ! valid.length;
}
function showToast ( message) {
    const toast = document.querySelector ( "#toast");
    if ( ! toast) return;
    toast.textContent = message;
    toast.classList.add ( "show");
    clearTimeout ( window.bibluneToastTimer);
    window.bibluneToastTimer = setTimeout ( () => toast.classList.remove ( "show"), 2200)
}
function openCart () {
    document.querySelector ( "#cartOverlay")?.classList.add ( "open");
    document.body.style.overflow = "hidden"
}
function closeCart () {
    document.querySelector ( "#cartOverlay")?.classList.remove ( "open");
    document.body.style.overflow = ""
}
function initNav () {
    const toggle = document.querySelector ( "#menuToggle"), links = document.querySelector ( "#navLinks");
    toggle?.addEventListener ( "click", () => {
        const open = links.classList.toggle ( "open");
        toggle.setAttribute ( "aria-expanded", String ( open));
        toggle.textContent = open ? "×": "☰"
    }
    );
    document.querySelectorAll ( "[data-open-cart]").forEach ( el => el.addEventListener ( "click", openCart));
    document.querySelectorAll ( "[data-close-cart]").forEach ( el => el.addEventListener ( "click", closeCart));
    document.addEventListener ( "keydown", e => {
        if ( e.key === "Escape") closeCart ()
    }
    );
}
function initCatalog () {
    const grid = document.querySelector ( "#catalogGrid");
    if ( ! grid) return;
    const search = document.querySelector ( "#bookSearch"), filter = document.querySelector ( "#categoryFilter"), sort = document.querySelector ( "#sortBooks"), count = document.querySelector ( "#resultsCount");
    const params = new URLSearchParams ( location.search);
    if ( params.get ( "category")) filter.value = params.get ( "category");
    function update () {
        let list = [ ...BOOKS];
        const term = ( search.value || "").trim ().toLowerCase ();
        if ( term) list = list.filter ( b => ( b.title + " " + b.author + " " + b.category).toLowerCase ().includes ( term));
        if ( filter.value) list = list.filter ( b => b.category === filter.value);
        if ( sort.value === "price-low") list.sort ( ( a, b) => a.price - b.price);
        if ( sort.value === "price-high") list.sort ( ( a, b) => b.price - a.price);
        if ( sort.value === "title") list.sort ( ( a, b) => a.title.localeCompare ( b.title));
        renderBooks ( "#catalogGrid", list);
        count.textContent = `Showing ${list.length} of ${BOOKS.length} books`;
    }
    search.addEventListener ( "input", update);
    filter.addEventListener ( "change", update);
    sort.addEventListener ( "change", update);
    update ();
}
function initForms () {
    document.querySelectorAll ( ".newsletter-form").forEach ( form => form.addEventListener ( "submit", e => {
        e.preventDefault ();
        showToast ( "Thank you for joining the BIBLUNE reading list!");
        form.reset ()
    }
    ));
    const form = document.querySelector ( "#registerForm");
    form?.addEventListener ( "submit", e => {
        e.preventDefault ();
        const msg = document.querySelector ( "#formSuccess");
        msg.textContent = "Your details have been validated. This demo form does not send data to a server.";
        msg.classList.add ( "show");
        form.reset ()
    }
    );
}
document.addEventListener ( "click", e => {
    const add = e.target.closest ( "[data-add]");
    if ( add) addToCart ( Number ( add.dataset.add));
    const qty = e.target.closest ( "[data-qty]");
    if ( qty) {
        const id = Number ( qty.dataset.qty), change = Number ( qty.dataset.change);
        const cart = getCart (), item = cart.find ( x => x.id === id);
        if ( item) {
            item.qty += change;
            saveCart ( cart.filter ( x => x.qty > 0))
        }
    }
    const remove = e.target.closest ( "[data-remove]");
    if ( remove) saveCart ( getCart ().filter ( x => x.id !== Number ( remove.dataset.remove)));
}
);
document.querySelector ( "#checkoutBtn")?.addEventListener ( "click", () => showToast ( "Demo checkout: connect a secure backend to accept orders."));
document.addEventListener ( "DOMContentLoaded", () => {
    initNav ();
    updateCartUI ();
    initCatalog ();
    initForms ();
}
);
