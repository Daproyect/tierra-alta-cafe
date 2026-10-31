import data from '../data/products.json';

type Cart = Record<string, number>;
interface SavedOrder {
  id: string;
  date: string;
  total: number;
  items: { name: string; qty: number }[];
  customer: string;
  city: string;
}

const CART_KEY = 'tac:cart';
const ORDERS_KEY = 'tac:orders';
const MAX_QTY = 20;
const MAX_ORDERS = 6;

const products = new Map(data.products.map((p) => [p.id, p]));
const cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel);

// ---------- Almacenamiento (RF-10, RF-11) ----------
function readJSON(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* modo privado o almacenamiento lleno: la página sigue funcionando sin persistir */
  }
}

function loadCart(): Cart {
  const raw = readJSON(CART_KEY);
  const cart: Cart = {};
  if (raw && typeof raw === 'object') {
    for (const [id, qty] of Object.entries(raw as Record<string, unknown>)) {
      if (products.has(id) && Number.isInteger(qty) && (qty as number) > 0) {
        cart[id] = Math.min(qty as number, MAX_QTY);
      }
    }
  }
  return cart;
}

function loadOrders(): SavedOrder[] {
  const raw = readJSON(ORDERS_KEY);
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (o): o is SavedOrder =>
        !!o &&
        typeof o.id === 'string' &&
        typeof o.date === 'string' &&
        typeof o.customer === 'string' &&
        typeof o.city === 'string' &&
        Number.isFinite(o.total) &&
        Array.isArray(o.items) &&
        o.items.every((i: unknown) => !!i && typeof (i as { name: unknown }).name === 'string' && Number.isInteger((i as { qty: unknown }).qty)),
    )
    .slice(0, MAX_ORDERS);
}

let cart = loadCart();

// ---------- Carrito (RF-05, RF-06) ----------
function saveCart() {
  writeJSON(CART_KEY, cart);
  renderCart();
}

function change(id: string, delta: number) {
  const next = (cart[id] ?? 0) + delta;
  if (next <= 0) delete cart[id];
  else cart[id] = Math.min(next, MAX_QTY);
  saveCart();
}

function cartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => sum + (products.get(id)?.price ?? 0) * qty, 0);
}

function iconButton(label: string, text: string, onClick: () => void) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = text;
  b.setAttribute('aria-label', label);
  b.className = 'flex h-8 w-8 items-center justify-center rounded-full border border-cafe/30 font-bold transition hover:bg-hueso';
  b.addEventListener('click', onClick);
  return b;
}

function renderCart() {
  const list = $('#cart-items')!;
  const empty = $('#cart-empty')!;
  const totalRow = $('#cart-total-row')!;
  const entries = Object.entries(cart);

  list.replaceChildren();
  for (const [id, qty] of entries) {
    const p = products.get(id)!;
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between gap-3 p-4';

    const info = document.createElement('div');
    const name = document.createElement('p');
    name.className = 'font-semibold';
    name.textContent = p.name;
    const sub = document.createElement('p');
    sub.className = 'text-sm text-tierra/60';
    sub.textContent = `${cop.format(p.price)} · ${p.weight}`;
    info.append(name, sub);

    const controls = document.createElement('div');
    controls.className = 'flex items-center gap-2';
    const count = document.createElement('span');
    count.className = 'w-6 text-center font-semibold';
    count.textContent = String(qty);
    controls.append(
      iconButton(`Quitar una unidad de ${p.name}`, '−', () => change(id, -1)),
      count,
      iconButton(`Agregar una unidad de ${p.name}`, '+', () => change(id, 1)),
    );

    li.append(info, controls);
    list.append(li);
  }

  const items = entries.reduce((n, [, q]) => n + q, 0);
  empty.classList.toggle('hidden', entries.length > 0);
  list.classList.toggle('hidden', entries.length === 0);
  totalRow.classList.toggle('hidden', entries.length === 0);
  totalRow.classList.toggle('flex', entries.length > 0);
  $('#cart-total')!.textContent = cop.format(cartTotal());
  $('#cart-count')!.textContent = String(items);
  $('#cart-fab')!.setAttribute('aria-label', `Ir a tu pedido: ${items} ${items === 1 ? 'unidad' : 'unidades'}`);
}

// ---------- Filtro (RF-04) ----------
function setupFilter() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('#filtros [data-roast]');
  const cards = document.querySelectorAll<HTMLElement>('#productos > li');
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const roast = btn.dataset.roast;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let visible = 0;
      cards.forEach((c) => {
        const show = roast === 'Todas' || c.dataset.roast === roast;
        c.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      $('#sin-resultados')!.classList.toggle('hidden', visible > 0);
      $('#filtro-estado')!.textContent = `Mostrando ${visible} ${visible === 1 ? 'café' : 'cafés'}${roast === 'Todas' ? '' : ` de tostión ${roast!.toLowerCase()}`}.`;
    }),
  );
}

// ---------- Formulario (RF-08, RF-09, RF-10) ----------
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Teléfono: 7 a 10 dígitos, con o sin indicativo +57 y separadores (espacios, guiones, paréntesis).
function isPhone(value: string) {
  const digits = value.replace(/[\s\-().]/g, '').replace(/^\+?57(?=\d{7,10}$)/, '');
  return /^\d{7,10}$/.test(digits);
}

function setError(inputId: string, errorId: string, message: string) {
  const input = $<HTMLInputElement>(`#${inputId}`)!;
  const p = $(`#${errorId}`)!;
  p.textContent = message;
  p.classList.toggle('hidden', !message);
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validate(form: HTMLFormElement) {
  const v = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value.trim();
  const errors: { id: string; msg: string }[] = [];

  const name = v('name');
  const contact = v('contact');
  const city = v('city');
  const address = v('address');

  const nameMsg = name.length < 3 ? 'Escribe tu nombre completo (mínimo 3 letras).' : '';
  const contactMsg = !(EMAIL.test(contact) || isPhone(contact)) ? 'Escribe un correo válido o un teléfono de 7 a 10 dígitos.' : '';
  const cityMsg = city.length < 2 ? 'Indica tu ciudad.' : '';
  const addrMsg = address.length < 5 ? 'Escribe una dirección de entrega (mínimo 5 caracteres).' : '';

  setError('f-name', 'e-name', nameMsg);
  setError('f-contact', 'e-contact', contactMsg);
  setError('f-city', 'e-city', cityMsg);
  setError('f-address', 'e-address', addrMsg);

  if (nameMsg) errors.push({ id: 'f-name', msg: nameMsg });
  if (contactMsg) errors.push({ id: 'f-contact', msg: contactMsg });
  if (cityMsg) errors.push({ id: 'f-city', msg: cityMsg });
  if (addrMsg) errors.push({ id: 'f-address', msg: addrMsg });
  return errors;
}

function newOrderId() {
  const rand = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(6, '0').slice(-6);
  return `TA-${rand}`;
}

function setupForm() {
  const form = $<HTMLFormElement>('#order-form')!;
  const status = $('#form-status')!;
  const confirm = $('#order-confirm')!;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    confirm.classList.add('hidden');
    status.classList.add('hidden');

    const errors = validate(form);
    const emptyCart = Object.keys(cart).length === 0;
    if (errors.length || emptyCart) {
      const msgs: string[] = [];
      if (emptyCart) msgs.push('Agrega al menos un café a tu pedido.');
      if (errors.length) msgs.push('Revisa los campos marcados en rojo.');
      status.textContent = msgs.join(' ');
      status.classList.remove('hidden');
      if (errors.length) $<HTMLInputElement>(`#${errors[0].id}`)!.focus();
      return;
    }

    // Se guarda solo lo mínimo en el navegador: primer nombre y ciudad, sin dirección ni contacto.
    const order: SavedOrder = {
      id: newOrderId(),
      date: new Date().toISOString(),
      total: cartTotal(),
      items: Object.entries(cart).map(([id, qty]) => ({ name: products.get(id)!.name, qty })),
      customer: (form.elements.namedItem('name') as HTMLInputElement).value.trim().split(/\s+/)[0],
      city: (form.elements.namedItem('city') as HTMLInputElement).value.trim(),
    };
    writeJSON(ORDERS_KEY, [order, ...loadOrders()].slice(0, MAX_ORDERS));

    cart = {};
    saveCart();
    form.reset();
    ['f-name', 'f-contact', 'f-city', 'f-address'].forEach((id) => $(`#${id}`)!.setAttribute('aria-invalid', 'false'));
    $('#order-id')!.textContent = order.id;
    confirm.classList.remove('hidden');
    confirm.focus();
    renderOrders();
  });
}

// ---------- Pedidos recientes (RF-12) ----------
function renderOrders() {
  const orders = loadOrders();
  const wrap = $('#orders-wrap')!;
  const list = $('#orders-list')!;
  list.replaceChildren();
  wrap.classList.toggle('hidden', orders.length === 0);

  for (const o of orders) {
    const li = document.createElement('li');
    li.className = 'rounded-xl border border-hueso bg-white p-4 text-sm';
    const title = document.createElement('p');
    title.className = 'font-semibold';
    title.textContent = `${o.id} · ${cop.format(o.total)}`;
    const who = document.createElement('p');
    who.className = 'text-tierra/60';
    const date = new Date(o.date);
    who.textContent = `${o.customer}, ${o.city} · ${Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('es-CO')}`;
    const items = document.createElement('p');
    items.className = 'mt-1';
    items.textContent = o.items.map((i) => `${i.qty}× ${i.name}`).join(', ');
    li.append(title, who, items);
    list.append(li);
  }
}

// ---------- Menú móvil (RF-01) ----------
function setupMenu() {
  const btn = $<HTMLButtonElement>('#menu-btn')!;
  const menu = $('#menu-movil')!;
  const toggle = (open: boolean) => {
    menu.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  btn.addEventListener('click', () => toggle(btn.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      toggle(false);
      btn.focus();
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => e.matches && toggle(false));
}

// ---------- Inicio ----------
document.querySelectorAll<HTMLButtonElement>('[data-add]').forEach((btn) => {
  btn.addEventListener('click', () => {
    change(btn.dataset.add!, 1);
    const original = (btn.dataset.label ??= btn.textContent ?? 'Agregar');
    btn.textContent = '¡Agregado!';
    clearTimeout(Number(btn.dataset.timer));
    btn.dataset.timer = String(setTimeout(() => (btn.textContent = original), 900));
  });
});
$('#orders-clear')!.addEventListener('click', () => {
  writeJSON(ORDERS_KEY, []);
  renderOrders();
});

setupMenu();
setupFilter();
setupForm();
renderCart();
renderOrders();
