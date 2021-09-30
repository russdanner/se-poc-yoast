<#if RequestParameters["SEO"]??>

    <style>

    
    #root {
      position:absolute !important;
      top: 30px;
        z-index: 99 !important;
    }
    
  </style> 
  
  <script>
    function getMeta(metaName) {
      const metas = document.getElementsByTagName('meta');  
      for (let i = 0; i < metas.length; i++) {
          if (metas[i].getAttribute('name') === metaName) {
            return metas[i].getAttribute('content');
          }
      }
  
      return '';
    }


    window.setTimeout(function() { 
      document.getElementById("text").value = document.getElementById("bodyContent").innerHTML; 
        document.getElementById("title").value = document.title; 
        document.getElementById("description").value = getMeta("description");
        document.getElementById("synonyms").value = getMeta("keywords");
    document.getElementById("url").value = document.location.href.substring(document.location.href.lastIndexOf("/")+1, document.location.href.lastIndexOf("?"));       
  }, 3000); 
  </script>
  
  <div id="root"></div>
  
  <script src="/static-assets/app/yoastseojs/js/bundle.js"></script>
  <script src="/static-assets/app/yoastseojs/js/1.chunk.js"></script>
  <script src="/static-assets/app/yoastseojs/js/main.chunk.js"></script>

</#if> 