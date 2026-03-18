/* ─────────────────────────────────────────────
   STYX STUDIO — Fondo WebGL (shader de plasma)
   ───────────────────────────────────────────── */

(function () {
  var canvas = document.getElementById('glc');
  var gl = canvas.getContext('webgl');
  if (!gl) return;

  var W = 0, H = 0;
  var tmx = 0.5, tmy = 0.5;
  var cmx = 0.5, cmy = 0.5;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    gl.viewport(0, 0, W, H);
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', function (e) {
    tmx = e.clientX / window.innerWidth;
    tmy = 1 - e.clientY / window.innerHeight;
  });

  /* ── Shaders ── */
  var VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';

  var FS = [
    'precision highp float;',
    'uniform float u_t;',
    'uniform vec2 u_r;',
    'uniform vec2 u_m;',

    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float n(vec2 p){',
    '  vec2 i=floor(p);vec2 f=fract(p);',
    '  f=f*f*(3.-2.*f);',
    '  float a=h(i);float b=h(i+vec2(1.,0.));',
    '  float c=h(i+vec2(0.,1.));float d=h(i+vec2(1.,1.));',
    '  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}',

    'float fbm(vec2 p){',
    '  float v=0.;float a=.5;',
    '  for(int i=0;i<7;i++){v+=a*n(p);p=p*2.1+u_t*.03;a*=.5;}',
    '  return v;}',

    'void main(){',
    '  vec2 uv=(gl_FragCoord.xy-.5*u_r)/u_r.y;',
    '  vec2 m=u_m-.5;',
    '  float md=length(uv-m*1.4);',
    '  float mw=exp(-md*md*8.)*sin(md*18.-u_t*3.)*.12;',
    '  vec2 st=uv*2.2+mw;',
    '  float t=u_t*.15;',
    '  vec2 q=vec2(fbm(st+t),fbm(st+vec2(3.4,2.1)));',
    '  vec2 r=vec2(fbm(st+4.*q+vec2(1.7,9.2)+.15*t),fbm(st+4.*q+vec2(8.3,2.8)+.126*t));',
    '  float f=fbm(st+4.*r);',
    '  vec3 col=mix(vec3(0.,.04,.06),vec3(0.,.18,.22),clamp(f*f*4.,0.,1.));',
    '  col=mix(col,vec3(.01,.02,.08),clamp(length(q),0.,1.));',
    '  col=mix(col,vec3(0.,.08,.1)*1.5,clamp(length(r.x),0.,1.));',
    '  float v=fbm(st*3.+vec2(0.,t*.5));',
    '  col+=vec3(0.,.07,.09)*pow(v,3.)*2.;',
    '  float w=fbm(st*2.5+vec2(t*.3,0.));',
    '  col+=vec3(.05,.0,.09)*pow(w,4.)*1.8;',
    '  float mg=exp(-md*md*3.);',
    '  col+=vec3(0.,.05,.06)*mg;',
    '  float s=pow(n(st*8.+vec2(0.,t*.4)),14.)*2.;',
    '  col+=vec3(0.,.12,.15)*s;',
    '  float gs=pow(n(st*12.+vec2(t*.2,0.)),20.)*1.5;',
    '  col+=vec3(.08,.06,.0)*gs;',
    '  float vig=1.-dot(uv*1.5,uv*1.5);',
    '  col*=max(vig,0.);col*=.72;',
    '  gl_FragColor=vec4(col,1.);}',
  ].join('\n');

  function mkShader(type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, mkShader(gl.VERTEX_SHADER,   VS));
  gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

  var al = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(al);
  gl.vertexAttribPointer(al, 2, gl.FLOAT, false, 0, 0);

  var uT = gl.getUniformLocation(prog, 'u_t');
  var uR = gl.getUniformLocation(prog, 'u_r');
  var uM = gl.getUniformLocation(prog, 'u_m');

  var t0 = performance.now();

  function render() {
    cmx += (tmx - cmx) * .04;
    cmy += (tmy - cmy) * .04;
    var t = (performance.now() - t0) / 1000;
    gl.uniform1f(uT, t);
    gl.uniform2f(uR, W, H);
    gl.uniform2f(uM, cmx, cmy);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  render();
})();
