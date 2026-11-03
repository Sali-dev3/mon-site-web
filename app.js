// Numéros WhatsApp de la boutique
const STORE_WHATSAPP_1 = "22661429904";
const STORE_WHATSAPP_2 = "22664324822";

// Collection des parfums
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Nuit d'Ébène",
    category: "femme",
    price: 35000,
    isPopular: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800",
    description: "Une création d'exception façonnée avec élégance, mariant la délicatesse de la fleur de coton à une vanille noire envoûtante.",
    notes: { top: "Fleur de Coton, Bergamote", heart: "Jasmin Royal, Rose", base: "Vanille Bourbon, Bois d'Ébène" }
  },
  {
    id: 2,
    name: "Santal du Sahel",
    category: "homme",
    price: 40000,
    isPopular: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800",
    description: "Un boisé noble au caractère intemporel, associant la chaleur du bois de santal à des notes épicées et cuirées.",
    notes: { top: "Poivre Noir, Cardamome", heart: "Iris, Cuir Noble", base: "Bois de Santal, Cèdre" }
  },
  {
    id: 3,
    name: "Élixir d'Or",
    category: "mixte",
    price: 50000,
    isPopular: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800",
    description: "Un accord oriental majestueux où le précieux bois d'Oud s'unit à la douceur dorée du miel d'acacia.",
    notes: { top: "Safran, Encens", heart: "Bois d'Oud, Rose d'Orient", base: "Ambre Gris, Miel D'Or" }
  },
  {
    id: 4,
    name: "Velours Floral",
    category: "femme",
    price: 30000,
    isPopular: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800",
    description: "Une douceur poudrée et féminine portée par un sillage frais de pivoines et de néroli de printemps.",
    notes: { top: "Mandarine, Litchi", heart: "Pivoine, Fleur d'Oranger", base: "Musc Blanc, Iris" }
  },
  {
    id: 5,
    name: "Cuir Souverain",
    category: "homme",
    price: 45000,
    isPopular: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800",
    description: "Un parfum charismatique et masculin aux notes puissantes de cuir fumé et de vétiver profond.",
    notes: { top: "Muscade, Pamplemousse", heart: "Cuir Fumé, Patchouli", base: "Vétiver, Ambre Noir" }
  },
  {
    id: 6,
    name: "Rose de Soie",
    category: "femme",
    price: 32000,
    isPopular: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=800",
    description: "Une fragrance romantique et raffinée offrant un sillage délicat de roses fraîches et de fruits rouges gourmands.",
    notes: { top: "Framboise, Cassis", heart: "Rose de Grasse, Magnolia", base: "Bois de Cashmere" }
  },
  {
    id: 7,
    name: "Amber Royal",
    category: "mixte",
    price: 48000,
    isPopular: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800",
    description: "Une création envoûtante et chaleureuse bercée par des notes solaires d'ambre, de cannelle et de fève tonka.",
    notes: { top: "Cannelle, Citron Vert", heart: "Ambre Solaire, Myrrhe", base: "Fève Tonka, Benjoin" }
  },
  {
    id: 8,
    name: "Ombre Boisée",
    category: "homme",
    price: 38000,
    isPopular: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800",
    description: "Une essence ténébreuse et mystérieuse dominée par la fraîcheur du cyprès et l'intensité du bois de guiac.",
    notes: { top: "Cyprès, Baies Roses", heart: "Bois de Guiac, Cèdre Atlas", base: "Musc Sombre, Mousse d'Arbre" }
  }
];

let cart = JSON.parse(localStorage.getItem('maboss_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderHomeProducts();
  renderShopProducts();
  updateCartUI();
  document.getElementById('mobile-menu-btn')?.addEventListener('click', toggleMobileMenu);
});

function showPage(pageId) {
  document.querySelectorAll('.page-content').forEach(page => page.classList.add('hidden'));
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

function renderHomeProducts() {
  const container = document.getElementById('home-featured-products');
  if (!container) return;
  const popular = PRODUCTS_DATA.filter(p => p.isPopular);
  container.innerHTML = popular.map(p => createProductCardHTML(p)).join('');
}

function renderShopProducts(filter = 'all') {
  const container = document.getElementById('shop-products-grid');
  if (!container) return;
  let list = PRODUCTS_DATA;
  if (filter === 'nouveaute') list = list.filter(p => p.isNew);
  else if (filter !== 'all') list = list.filter(p => p.category === filter);
  container.innerHTML = list.map(p => createProductCardHTML(p)).join('');
}

function filterCategory(cat) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
  renderShopProducts(cat);
}

function createProductCardHTML(product) {
  return `
    <div class="bg-white rounded-2xl shadow-sm border border-brand-gold/10 overflow-hidden group hover:shadow-xl transition duration-300 flex flex-col">
      <div class="relative overflow-hidden h-64">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
        ${product.isNew ? `<span class="absolute top-3 left-3 bg-brand-gold text-brand-purple text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Nouveau</span>` : ''}
      </div>
      <div class="p-5 flex flex-col flex-grow">
        <span class="text-[10px] uppercase font-bold text-brand-gold tracking-widest">${product.category}</span>
        <h3 class="font-serif font-bold text-xl text-brand-purple mt-1 mb-2">${product.name}</h3>
        <p class="text-xs text-gray-500 mb-4 line-clamp-2">${product.description}</p>
        <div class="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <span class="font-serif font-bold text-lg text-brand-purple">${product.price.toLocaleString()} FCFA</span>
          <div class="flex space-x-2">
            <button onclick="viewProductDetails(${product.id})" class="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:border-brand-gold hover:text-brand-gold transition" title="Voir détails">
              <i class="fa-regular fa-eye"></i>
            </button>
            <button onclick="addToCart(${product.id})" class="p-2.5 rounded-full bg-brand-purple text-brand-gold hover:bg-brand-gold hover:text-brand-purple transition shadow-sm" title="Ajouter au panier">
              <i class="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function viewProductDetails(id) {
  const p = PRODUCTS_DATA.find(item => item.id === id);
  if (!p) return;
  const container = document.getElementById('page-product');
  container.innerHTML = `
    <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-brand-gold/10">
      <button onclick="showPage('shop')" class="text-xs font-bold text-gray-400 hover:text-brand-purple mb-6 inline-flex items-center">
        <i class="fa-solid fa-arrow-left mr-2"></i> Retour à la boutique
      </button>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div class="rounded-2xl overflow-hidden h-96 sm:h-[450px]">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
        </div>
        <div>
          <span class="text-xs uppercase font-bold text-brand-gold tracking-widest">${p.category}</span>
          <h1 class="font-serif text-3xl sm:text-4xl font-bold text-brand-purple mt-1 mb-4">${p.name}</h1>
          <p class="font-serif text-2xl font-bold text-brand-gold mb-6">${p.price.toLocaleString()} FCFA</p>
          <p class="text-sm text-gray-600 leading-relaxed mb-6">${p.description}</p>
          <div class="bg-brand-cream p-4 rounded-xl border border-brand-gold/20 mb-6">
            <h4 class="font-serif font-bold text-xs uppercase tracking-wider text-brand-purple mb-2">Pyramide Olfactive</h4>
            <div class="text-xs space-y-1 text-gray-600">
              <p><strong>Notes de tête :</strong> ${p.notes.top}</p>
              <p><strong>Notes de cœur :</strong> ${p.notes.heart}</p>
              <p><strong>Notes de fond :</strong> ${p.notes.base}</p>
            </div>
          </div>
          <div class="flex items-center space-x-4 mb-6">
            <label class="text-xs font-bold uppercase text-gray-500">Quantité :</label>
            <input type="number" id="detail-qty" value="1" min="1" class="w-16 px-3 py-2 border rounded-lg text-center font-bold text-sm border-gray-200">
          </div>
          <div class="flex flex-col sm:flex-row gap-4">
            <button onclick="addToCart(${p.id}, parseInt(document.getElementById('detail-qty').value))" class="btn-gold flex-1">
              <i class="fa-solid fa-bag-shopping mr-2"></i> Ajouter au panier
            </button>
            <button onclick="orderDirectWhatsApp(${p.id})" class="btn-whatsapp flex-1">
              <i class="fa-brands fa-whatsapp text-lg mr-2"></i> Commander sur WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  showPage('product');
}

function addToCart(id, qty = 1) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty += qty;
  else cart.push({ id, qty });
  saveCart();
  updateCartUI();
  toggleCartDrawer(true);
}

function updateCartQuantity(id, qty) {
  if (qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  } else {
    const item = cart.find(i => i.id === id);
    if (item) item.qty = qty;
  }
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('maboss_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) cartCountEl.innerText = totalItems;
  let grandTotal = 0;
  const drawerContainer = document.getElementById('drawer-cart-items');
  const fullCartContainer = document.getElementById('full-cart-container');

  if (cart.length === 0) {
    if (drawerContainer) drawerContainer.innerHTML = `<p class="text-center text-xs text-gray-400 py-8">Votre panier est vide.</p>`;
    if (fullCartContainer) fullCartContainer.innerHTML = `<p class="text-center text-sm text-gray-500 py-8">Votre panier est actuellement vide.</p>`;
  } else {
    let itemsHTML = '';
    cart.forEach(i => {
      const p = PRODUCTS_DATA.find(prod => prod.id === i.id);
      if (!p) return;
      grandTotal += p.price * i.qty;
      itemsHTML += `
        <div class="flex items-center space-x-4 py-3">
          <img src="${p.image}" class="w-14 h-14 rounded-lg object-cover">
          <div class="flex-grow">
            <h4 class="font-serif font-bold text-sm text-brand-purple">${p.name}</h4>
            <span class="text-xs text-brand-gold font-bold">${p.price.toLocaleString()} FCFA</span>
            <div class="flex items-center space-x-2 mt-1">
              <button onclick="updateCartQuantity(${p.id}, ${i.qty - 1})" class="w-5 h-5 rounded bg-gray-100 text-xs font-bold">-</button>
              <span class="text-xs font-bold">${i.qty}</span>
              <button onclick="updateCartQuantity(${p.id}, ${i.qty + 1})" class="w-5 h-5 rounded bg-gray-100 text-xs font-bold">+</button>
            </div>
          </div>
          <button onclick="updateCartQuantity(${p.id}, 0)" class="text-gray-300 hover:text-red-500 text-xs"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
    });
    if (drawerContainer) drawerContainer.innerHTML = itemsHTML;
    if (fullCartContainer) {
      fullCartContainer.innerHTML = `
        <div class="divide-y divide-gray-100 mb-6">${itemsHTML}</div>
        <div class="flex justify-between items-center pt-4 border-t border-brand-gold/20 font-bold text-lg">
          <span>Total:</span>
          <span class="text-brand-gold">${grandTotal.toLocaleString()} FCFA</span>
        </div>
        <button onclick="showPage('checkout')" class="w-full btn-gold mt-6">Passer à la commande</button>
      `;
    }
  }
  const drawerTotal = document.getElementById('drawer-cart-total');
  if (drawerTotal) drawerTotal.innerText = `${grandTotal.toLocaleString()} FCFA`;
  
  const summaryItems = document.getElementById('checkout-summary-items');
  const summaryTotal = document.getElementById('checkout-summary-total');
  if (summaryItems && summaryTotal) {
    summaryItems.innerHTML = cart.map(i => {
      const p = PRODUCTS_DATA.find(prod => prod.id === i.id);
      return `<div class="flex justify-between"><span>${p ? p.name : ''} x${i.qty}</span><span class="font-bold">${((p ? p.price : 0) * i.qty).toLocaleString()} FCFA</span></div>`;
    }).join('');
    summaryTotal.innerText = `${grandTotal.toLocaleString()} FCFA`;
  }
}

function toggleCartDrawer(open) {
  const backdrop = document.getElementById('cart-backdrop');
  const panel = document.getElementById('cart-panel');
  if (!backdrop || !panel) return;
  const isOpen = !panel.classList.contains('translate-x-full');
  if (open === true || !isOpen) {
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    panel.classList.remove('translate-x-full', 'pointer-events-none');
  } else {
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    panel.classList.add('translate-x-full', 'pointer-events-none');
  }
}

function orderDirectWhatsApp(productId) {
  const p = PRODUCTS_DATA.find(item => item.id === productId);
  if (!p) return;
  const msg = `Bonjour MA.BOSS PARFUMS, je souhaite commander le parfum : *${p.name}* (${p.price.toLocaleString()} FCFA).`;
  window.open(`https://wa.me/${STORE_WHATSAPP_1}?text=${encodeURIComponent(msg)}`, '_blank');
}

function submitOrderToWhatsApp(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Votre panier est vide.");
    return;
  }
  const targetOption = document.getElementById('cust-whatsapp-target')?.value || "1";
  const targetNumber = (targetOption === "2") ? STORE_WHATSAPP_2 : STORE_WHATSAPP_1;
  const name = document.getElementById('cust-name').value;
  const phone = document.getElementById('cust-phone').value;
  const address = document.getElementById('cust-address').value;
  const delivery = document.getElementById('cust-delivery').value;

  let orderDetails = cart.map(i => {
    const p = PRODUCTS_DATA.find(prod => prod.id === i.id);
    return `- ${p.name} (x${i.qty}) : ${(p.price * i.qty).toLocaleString()} FCFA`;
  }).join('\n');

  const grandTotal = cart.reduce((acc, i) => {
    const p = PRODUCTS_DATA.find(prod => prod.id === i.id);
    return acc + (p.price * i.qty);
  }, 0);

  const text = `✨ *COMMANDE MA.BOSS PARFUMS* ✨\n\n` +
               `👤 *Client :* ${name}\n` +
               `📞 *Téléphone :* ${phone}\n` +
               `📍 *Adresse :* ${address}\n` +
               `🚚 *Livraison :* ${delivery}\n\n` +
               `🛒 *Détails du panier :*\n${orderDetails}\n\n` +
               `💰 *TOTAL :* *${grandTotal.toLocaleString()} FCFA*`;

  window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`, '_blank');
}
