// Site-wide script. Runs last on every page, including locked case pages after unlock.
(function(){var b=document.body;function lbl(){var ko=b.getAttribute('data-lang')==='ko';document.querySelectorAll('.rbtn').forEach(function(a){var t=ko?'이력서':'Resume';if(a.textContent!==t)a.textContent=t})}lbl();new MutationObserver(lbl).observe(b,{attributes:true,attributeFilter:['data-lang']})})();
