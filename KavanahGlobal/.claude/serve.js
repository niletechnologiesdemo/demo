const http=require('http'),fs=require('fs'),path=require('path');
const ROOT='/Users/aadityanilesiphone/Documents/GitHub/demo2/KavanahGlobal';
const T={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.ico':'image/x-icon'};
http.createServer((rq,rs)=>{
  let u=decodeURIComponent(rq.url.split('?')[0]);
  if(u==='/')u='/index.html';
  const f=path.join(ROOT,u);
  if(!f.startsWith(ROOT)){rs.writeHead(403);return rs.end();}
  fs.readFile(f,(e,d)=>{
    if(e){rs.writeHead(404,{'Content-Type':'text/plain'});return rs.end('404 '+u);}
    rs.writeHead(200,{'Content-Type':T[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});
    rs.end(d);
  });
}).listen(8321,()=>console.log('serving KavanahGlobal on http://localhost:8321'));
