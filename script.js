const pages=[['index.html','Home'],['about.html','About'],['practice-areas.html','Practice Areas'],['attorneys.html','Attorneys'],['results.html','Results'],['faq.html','FAQ']];
const here=location.pathname.split('/').pop()||'index.html';

// Shared header & footer (edit once, updates every page)
document.getElementById('site-header').innerHTML=`
<header><div class="wrap nav">
<a class="logo" href="index.html">SURGE <span>Attorneys</span></a>
<button class="burger" aria-label="Menu" id="burger">&#9776;</button>
<ul class="menu" id="menu">
${pages.map(([h,n])=>`<li><a href="${h}" class="${h===here?'active':''}">${n}</a></li>`).join('')}
<li><a class="cta" href="contact.html">Free Consultation</a></li>
</ul></div></header>`;

document.getElementById('site-footer').innerHTML=`
<footer><div class="wrap">
<div class="grid">
<div><h4>SURGE Attorneys</h4><p>Strategic, relentless legal representation for individuals and businesses.</p></div>
<div><h4>Firm</h4><ul>${pages.slice(1).map(([h,n])=>`<li><a href="${h}">${n}</a></li>`).join('')}</ul></div>
<div><h4>Services</h4><ul><li>Personal Injury</li><li>Corporate Law</li><li>Family Law</li><li>Criminal Defense</li><li>Immigration Law</li></ul></div>
<div><h4>Contact</h4><p>48 Diya Street Ifako Gbagada<br>Lagos, Nigeria<br>+234 803 358 2591<br>Surgeattorneys@gmail.com</p></div>
</div>
<div class="copy">&copy; ${new Date().getFullYear()} Surge Attorneys. All rights reserved.
<p class="disc">Attorney advertising. Past results do not guarantee a similar outcome. This site is not legal advice.</p></div>
</div></footer>`;

document.getElementById('burger').onclick=()=>document.getElementById('menu').classList.toggle('open');

// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Animated counters
document.querySelectorAll('[data-count]').forEach(el=>{
  const end=+el.dataset.count,suf=el.dataset.suffix||'';let n=0;
  const step=()=>{n+=Math.ceil(end/60);if(n>=end){el.textContent=end+suf;return}el.textContent=n+suf;requestAnimationFrame(step)};
  new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){step();o.disconnect()}}).observe(el);
});

// FAQ accordion
document.querySelectorAll('.q button').forEach(b=>b.onclick=()=>{
  const q=b.parentElement,a=q.querySelector('.a'),open=q.classList.toggle('open');
  a.style.maxHeight=open?a.scrollHeight+'px':0;
});

// Results filter
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  document.querySelectorAll('[data-cat]').forEach(c=>c.style.display=(b.dataset.f==='all'||c.dataset.cat===b.dataset.f)?'':'none');
});

// Contact form validation (demo: connect to a backend or Formspree to actually send)
const form=document.getElementById('contact-form');
if(form)form.onsubmit=e=>{
  e.preventDefault();const m=document.getElementById('form-msg'),d=new FormData(form);
  if(!d.get('name').trim()||!/^\S+@\S+\.\S+$/.test(d.get('email'))||d.get('message').trim().length<10){
    m.className='msg err';m.textContent='Please enter your name, a valid email and a message (10+ characters).';return}
  m.className='msg ok';m.textContent='Thank you, '+d.get('name').trim()+'. A Surge attorney will contact you within 24 hours.';form.reset();
};