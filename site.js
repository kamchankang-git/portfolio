// Site-wide script. Runs last on every page, including locked case pages after unlock.
(function(){var b=document.body;function lbl(){var ko=b.getAttribute('data-lang')==='ko';document.querySelectorAll('.rbtn').forEach(function(a){var t=ko?'이력서':'Resume';if(a.textContent!==t)a.textContent=t})}lbl();new MutationObserver(lbl).observe(b,{attributes:true,attributeFilter:['data-lang']})})();

// Resume request modal: opens in place on every page. Sends through Formspree.
(function(){
var FORM='https://formspree.io/f/mvkzkjyo',MAIL='kamchan.kang@gmail.com';
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
function openCV(){
 var ko=document.body.getAttribute('data-lang')==='ko';
 var m=document.getElementById('cvModal');if(!m){m=document.createElement('div');m.id='cvModal';m.className='cvm';document.body.appendChild(m)}
 var co=(typeof COMPANY==='string')?COMPANY:'';
 m.innerHTML='<div class="cvbox" role="dialog" aria-modal="true" aria-labelledby="cvT"><button class="x" aria-label="'+(ko?'닫기':'Close')+'">×</button><h3 id="cvT">'+(ko?'이력서 받기':'Get my resume')+'</h3><p class="d">'+(ko?'이력서는 요청해 주신 분께 직접 보내드려요.':'I send my resume directly to people who ask.')+'</p><div class="pane"><input id="rqName" autocomplete="name" placeholder="'+(ko?'이름':'Name')+'"><input id="rqCo" autocomplete="organization" placeholder="'+(ko?'회사':'Company')+'" value="'+esc(co)+'"><input id="rqCt" autocomplete="email" placeholder="'+(ko?'이메일 또는 연락처':'Email or phone')+'"><input type="text" name="_gotcha" id="rqGotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0"><button class="go2" id="rqSend">'+(ko?'요청 보내기':'Send request')+'</button></div></div>';
 var opener=document.activeElement;m.hidden=false;
 function onKey(e){if(e.key==='Escape'&&!m.hidden){e.preventDefault();close()}}
 function close(){m.hidden=true;document.removeEventListener('keydown',onKey,true);if(opener&&opener.focus)opener.focus()}
 document.addEventListener('keydown',onKey,true);
 m.onkeydown=function(e){e.stopPropagation();if(e.key!=='Tab')return;var f=m.querySelectorAll('button:not([disabled]),input:not([tabindex="-1"]),a[href]'),a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}};
 function fin(){var i=m.querySelector('#rqName');if(i&&!m.contains(document.activeElement))i.focus({preventScroll:true})}
 requestAnimationFrame(fin);setTimeout(fin,250);
 m.querySelector('.x').onclick=close;m.onclick=function(e){if(e.target===m)close()};
 var btn=m.querySelector('#rqSend'),pane=m.querySelector('.pane');
 function msg(t){var e=m.querySelector('.cvmsg');if(!e){e=document.createElement('p');e.className='cvmsg';e.setAttribute('role','status');pane.appendChild(e)}e.innerHTML=t}
 function v(id){return m.querySelector(id).value.trim()}
 btn.onclick=function(){
  var ct=v('#rqCt');if(!ct){msg(ko?'답장 받을 이메일이나 연락처를 적어 주세요.':'Please add an email or phone so I can reach you.');m.querySelector('#rqCt').focus();return}
  btn.disabled=true;btn.textContent=ko?'보내는 중…':'Sending…';msg('');
  fetch(FORM,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({name:v('#rqName'),company:v('#rqCo'),contact:ct,_gotcha:m.querySelector('#rqGotcha').value,_subject:(ko?'이력서 요청: ':'Resume request: ')+(v('#rqCo')||'-')})})
  .then(function(r){if(!r.ok)throw 0;pane.innerHTML='<p class="cvdone">'+(ko?'요청을 보냈어요. 확인하는 대로 이력서를 보내드릴게요.':"Request sent. I'll email my resume shortly.")+'</p>'})
  .catch(function(){btn.disabled=false;btn.textContent=ko?'요청 보내기':'Send request';var a='<a href="mailto:'+MAIL+'">'+MAIL+'</a>';msg(ko?'전송에 실패했어요. '+a+'으로 직접 메일 주세요.':"Couldn't send that. Please email me directly at "+a+'.')});
 };
}
window.openCV=openCV;
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.rbtn');if(!a)return;e.preventDefault();e.stopPropagation();openCV()},true);
if(new URLSearchParams(location.search).get('cv')==='1'){if(document.readyState==='complete')openCV();else addEventListener('load',openCV)}
})();

// Favicon on every page, including unlocked case pages
(function(){if(document.querySelector('link[rel~="icon"]'))return;var l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href='favicon.svg';document.head.appendChild(l)})();

// Nav hierarchy: the resume link sits with Projects as a plain text link (all pages, incl. case pages)
(function(){var r=document.querySelector('nav .rbtn'),l=document.querySelector('nav .links');if(r&&l&&r.parentNode!==l)l.appendChild(r)})();
