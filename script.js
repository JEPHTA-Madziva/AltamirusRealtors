
// ---------- Sample Data ----------
const properties = [
    {id:'ALT-001',title:'Clifftop Modern Villa',type:'House',price:'R12,500,000',beds:5,baths:4,area:'780 m²',img:'https://images.unsplash.com/photo-1560184897-6a4ddae1a6b7?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'},
    {id:'ALT-002',title:'City Penthouse with Ocean View',type:'Apartment',price:'R8,200,000',beds:3,baths:3,area:'320 m²',img:'https://images.unsplash.com/photo-1572120360610-d971b9b2f86f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'},
    {id:'ALT-003',title:'CBD Office Space',type:'Commercial',price:'R6,000,000',beds:'—',baths:2,area:'420 m²',img:'https://images.unsplash.com/photo-1505691723518-36a3a3c30f9b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'},
    {id:'ALT-004',title:'Historic Estate with Gardens',type:'House',price:'R16,500,000',beds:6,baths:5,area:'1200 m²',img:'https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'},
    {id:'ALT-005',title:'Luxury Coastal Apartment',type:'Apartment',price:'R3,400,000',beds:2,baths:2,area:'110 m²',img:'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'}
];

// ---------- Utilities ----------
const el = (sel) => document.querySelector(sel);
const elAll = (sel) => Array.from(document.querySelectorAll(sel));


// ---------- Filters ----------
function applyFilters(){
    const type = el('#filterType').value;
    const price = el('#filterPrice').value;
    let list = properties.slice();
    if(type !== 'all') list = list.filter(p=>p.type === type);
    if(price !== 'any') list = list.filter(p=>Number(p.price.replace(/[^0-9]/g,'')) <= Number(price));
    renderListings(list);
}

// ---------- Modal ----------
function openModal(id)
{
    const m = el('#modal');
    m.classList.add('open');
    m.setAttribute('aria-hidden','false');
    if(id) el('#propId').value = id;
    document.body.style.overflow = 'hidden';
}
function closeModal()
{
    const m = el('#modal');
    m.classList.remove('open');
    m.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
}

function submitViewing(e){
    e.preventDefault();
    const prop = el('#propId').value || 'General enquiry';
    const name = el('#vname').value || 'Anonymous';
    const phone = el('#vphone').value || '';
    // In production: send to API
    alert(`Viewing requested for: ${prop}\nName: ${name}\nPhone: ${phone}`);
    closeModal();
}

// ---------- Contact Form ----------
el('#sendContact').addEventListener('click', (ev)=>{
    ev.preventDefault();
    const name = el('#name').value.trim();
    const email = el('#email').value.trim();
    const phone = el('#phone').value.trim();
    const message = el('#message').value.trim();
    if(!name || !email){
    alert('Please provide your name and email.');
    return;
    }
    // simulate send
    alert('Thanks '+name+" — we've received your message and an agent will contact you soon.");
    el('#contactForm').reset();
});

// ---------- Header CTA ----------
el('#cta-sell').addEventListener('click', ()=>{
    openModal();
    el('#propId').placeholder = 'Property to sell (address)';
});

// ---------- Search ----------
el('#searchBtn').addEventListener('click', ()=>{
    const q = el('#q').value.trim().toLowerCase();
    const type = el('#type').value;
    let list = properties.filter(p=> p.title.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) );
    if(type !== 'all') list = list.filter(p=>p.type === type);
    renderListings(list.length ? list : properties);
});

// ---------- Misc ----------
el('#applyFilter').addEventListener('click', applyFilters);
el('#loadMore').addEventListener('click', ()=>{
    // In a real app: fetch next page. Here: simulate by rotating the array
    properties.push(...properties.slice(0,3).map((p,i)=>({...p,id:p.id+'-M'+i})))
    renderListings();
});

// Close modal on background click
el('#modal').addEventListener('click',(e)=>{ if(e.target === el('#modal')) closeModal(); });

// keyboard esc
document.addEventListener('keydown',(e)=>{ if(e.key === 'Escape') closeModal(); });

// initial render
renderFeatured();
renderListings();
document.getElementById('year').textContent = new Date().getFullYear();

// Small entrance animation for header
window.addEventListener('load', ()=>{ setTimeout(()=>document.querySelector('header').style.transform='translateY(0)',200) })