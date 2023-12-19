var Ue=(()=>{var vt=import.meta.url;return function(yt={}){var u=yt,mt,K;u.ready=new Promise((r,t)=>{mt=r,K=t});var gt=Object.assign({},u),sr=!0,A="";function ur(r){return u.locateFile?u.locateFile(r,A):A+r}typeof document<"u"&&document.currentScript&&(A=document.currentScript.src),vt&&(A=vt),A.indexOf("blob:")!==0?A=A.substr(0,A.replace(/[?#].*/,"").lastIndexOf("/")+1):A="",u.print||console.log.bind(console);var B=u.printErr||console.error.bind(console);Object.assign(u,gt),gt=null,u.arguments&&u.arguments,u.thisProgram&&u.thisProgram,u.quit&&u.quit;var H;u.wasmBinary&&(H=u.wasmBinary),typeof WebAssembly!="object"&&ut("no native wasm support detected");var Q,$t=!1,F,g,x,z,j,y,bt,wt;function Ct(){var r=Q.buffer;u.HEAP8=F=new Int8Array(r),u.HEAP16=x=new Int16Array(r),u.HEAPU8=g=new Uint8Array(r),u.HEAPU16=z=new Uint16Array(r),u.HEAP32=j=new Int32Array(r),u.HEAPU32=y=new Uint32Array(r),u.HEAPF32=bt=new Float32Array(r),u.HEAPF64=wt=new Float64Array(r)}var Tt=[],Pt=[],At=[];function cr(){if(u.preRun)for(typeof u.preRun=="function"&&(u.preRun=[u.preRun]);u.preRun.length;)hr(u.preRun.shift());ct(Tt)}function lr(){ct(Pt)}function pr(){if(u.postRun)for(typeof u.postRun=="function"&&(u.postRun=[u.postRun]);u.postRun.length;)fr(u.postRun.shift());ct(At)}function hr(r){Tt.unshift(r)}function dr(r){Pt.unshift(r)}function fr(r){At.unshift(r)}var E=0,M=null;function vr(r){var t;E++,(t=u.monitorRunDependencies)==null||t.call(u,E)}function yr(r){var e;if(E--,(e=u.monitorRunDependencies)==null||e.call(u,E),E==0&&M){var t=M;M=null,t()}}function ut(r){var e;(e=u.onAbort)==null||e.call(u,r),r="Aborted("+r+")",B(r),$t=!0,r+=". Build with -sASSERTIONS for more info.";var t=new WebAssembly.RuntimeError(r);throw K(t),t}var mr="data:application/octet-stream;base64,",Wt=r=>r.startsWith(mr),R;u.locateFile?(R="Phy2D.wasm",Wt(R)||(R=ur(R))):R=new URL("/assets/Phy2D-PaBXrCig.wasm",import.meta.url).href;function _t(r){if(r==R&&H)return new Uint8Array(H);throw"both async and sync fetching of the wasm failed"}function gr(r){return!H&&sr&&typeof fetch=="function"?fetch(r,{credentials:"same-origin"}).then(t=>{if(!t.ok)throw"failed to load wasm binary file at '"+r+"'";return t.arrayBuffer()}).catch(()=>_t(r)):Promise.resolve().then(()=>_t(r))}function Ot(r,t,e){return gr(r).then(n=>WebAssembly.instantiate(n,t)).then(n=>n).then(e,n=>{B(`failed to asynchronously prepare wasm: ${n}`),ut(n)})}function $r(r,t,e,n){return!r&&typeof WebAssembly.instantiateStreaming=="function"&&!Wt(t)&&typeof fetch=="function"?fetch(t,{credentials:"same-origin"}).then(a=>{var i=WebAssembly.instantiateStreaming(a,e);return i.then(n,function(s){return B(`wasm streaming compile failed: ${s}`),B("falling back to ArrayBuffer instantiation"),Ot(t,e,n)})}):Ot(t,e,n)}function br(){var r={a:Ie};function t(n,a){return _=n.exports,Q=_.w,Ct(),Vt=_.y,dr(_.x),yr(),_}vr();function e(n){t(n.instance)}if(u.instantiateWasm)try{return u.instantiateWasm(r,t)}catch(n){B(`Module.instantiateWasm callback failed with error: ${n}`),K(n)}return $r(H,R,r,e).catch(K),{}}var ct=r=>{for(;r.length>0;)r.shift()(u)};u.noExitRuntime;function wr(r){this.excPtr=r,this.ptr=r-24,this.set_type=function(t){y[this.ptr+4>>2]=t},this.get_type=function(){return y[this.ptr+4>>2]},this.set_destructor=function(t){y[this.ptr+8>>2]=t},this.get_destructor=function(){return y[this.ptr+8>>2]},this.set_caught=function(t){t=t?1:0,F[this.ptr+12>>0]=t},this.get_caught=function(){return F[this.ptr+12>>0]!=0},this.set_rethrown=function(t){t=t?1:0,F[this.ptr+13>>0]=t},this.get_rethrown=function(){return F[this.ptr+13>>0]!=0},this.init=function(t,e){this.set_adjusted_ptr(0),this.set_type(t),this.set_destructor(e)},this.set_adjusted_ptr=function(t){y[this.ptr+16>>2]=t},this.get_adjusted_ptr=function(){return y[this.ptr+16>>2]},this.get_exception_ptr=function(){var t=rr(this.get_type());if(t)return y[this.excPtr>>2];var e=this.get_adjusted_ptr();return e!==0?e:this.excPtr}}var Ft=0,Cr=(r,t,e)=>{var n=new wr(r);throw n.init(t,e),Ft=r,Ft},Tr=(r,t,e,n,a)=>{},Pr=()=>{for(var r=new Array(256),t=0;t<256;++t)r[t]=String.fromCharCode(t);St=r},St,$=r=>{for(var t="",e=r;g[e];)t+=St[g[e++]];return t},U={},D={},Y={},V,d=r=>{throw new V(r)},kt,tt=r=>{throw new kt(r)},I=(r,t,e)=>{r.forEach(function(o){Y[o]=t});function n(o){var l=e(o);l.length!==r.length&&tt("Mismatched type converter count");for(var c=0;c<r.length;++c)T(r[c],l[c])}var a=new Array(t.length),i=[],s=0;t.forEach((o,l)=>{D.hasOwnProperty(o)?a[l]=D[o]:(i.push(o),U.hasOwnProperty(o)||(U[o]=[]),U[o].push(()=>{a[l]=D[o],++s,s===i.length&&n(a)}))}),i.length===0&&n(a)};function Ar(r,t,e={}){var n=t.name;if(r||d(`type "${n}" must have a positive integer typeid pointer`),D.hasOwnProperty(r)){if(e.ignoreDuplicateRegistrations)return;d(`Cannot register type '${n}' twice`)}if(D[r]=t,delete Y[r],U.hasOwnProperty(r)){var a=U[r];delete U[r],a.forEach(i=>i())}}function T(r,t,e={}){if(!("argPackAdvance"in t))throw new TypeError("registerType registeredInstance requires argPackAdvance");return Ar(r,t,e)}var W=8,Wr=(r,t,e,n)=>{t=$(t),T(r,{name:t,fromWireType:function(a){return!!a},toWireType:function(a,i){return i?e:n},argPackAdvance:W,readValueFromPointer:function(a){return this.fromWireType(g[a])},destructorFunction:null})},_r=r=>({count:r.count,deleteScheduled:r.deleteScheduled,preservePointerOnDelete:r.preservePointerOnDelete,ptr:r.ptr,ptrType:r.ptrType,smartPtr:r.smartPtr,smartPtrType:r.smartPtrType}),lt=r=>{function t(e){return e.$$.ptrType.registeredClass.name}d(t(r)+" instance already deleted")},pt=!1,jt=r=>{},Or=r=>{r.smartPtr?r.smartPtrType.rawDestructor(r.smartPtr):r.ptrType.registeredClass.rawDestructor(r.ptr)},Et=r=>{r.count.value-=1;var t=r.count.value===0;t&&Or(r)},Rt=(r,t,e)=>{if(t===e)return r;if(e.baseClass===void 0)return null;var n=Rt(r,t,e.baseClass);return n===null?null:e.downcast(n)},Dt={},Fr=()=>Object.keys(N).length,Sr=()=>{var r=[];for(var t in N)N.hasOwnProperty(t)&&r.push(N[t]);return r},q=[],ht=()=>{for(;q.length;){var r=q.pop();r.$$.deleteScheduled=!1,r.delete()}},L,kr=r=>{L=r,q.length&&L&&L(ht)},jr=()=>{u.getInheritedInstanceCount=Fr,u.getLiveInheritedInstances=Sr,u.flushPendingDeletes=ht,u.setDelayFunction=kr},N={},Er=(r,t)=>{for(t===void 0&&d("ptr should not be undefined");r.baseClass;)t=r.upcast(t),r=r.baseClass;return t},Rr=(r,t)=>(t=Er(r,t),N[t]),rt=(r,t)=>{(!t.ptrType||!t.ptr)&&tt("makeClassHandle requires ptr and ptrType");var e=!!t.smartPtrType,n=!!t.smartPtr;return e!==n&&tt("Both smartPtrType and smartPtr must be specified"),t.count={value:1},G(Object.create(r,{$$:{value:t,writable:!0}}))};function Dr(r){var t=this.getPointee(r);if(!t)return this.destructor(r),null;var e=Rr(this.registeredClass,t);if(e!==void 0){if(e.$$.count.value===0)return e.$$.ptr=t,e.$$.smartPtr=r,e.clone();var n=e.clone();return this.destructor(r),n}function a(){return this.isSmartPointer?rt(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:t,smartPtrType:this,smartPtr:r}):rt(this.registeredClass.instancePrototype,{ptrType:this,ptr:r})}var i=this.registeredClass.getActualType(t),s=Dt[i];if(!s)return a.call(this);var o;this.isConst?o=s.constPointerType:o=s.pointerType;var l=Rt(t,this.registeredClass,o.registeredClass);return l===null?a.call(this):this.isSmartPointer?rt(o.registeredClass.instancePrototype,{ptrType:o,ptr:l,smartPtrType:this,smartPtr:r}):rt(o.registeredClass.instancePrototype,{ptrType:o,ptr:l})}var G=r=>typeof FinalizationRegistry>"u"?(G=t=>t,r):(pt=new FinalizationRegistry(t=>{Et(t.$$)}),G=t=>{var e=t.$$,n=!!e.smartPtr;if(n){var a={$$:e};pt.register(t,a,t)}return t},jt=t=>pt.unregister(t),G(r)),Ir=()=>{Object.assign(et.prototype,{isAliasOf(r){if(!(this instanceof et)||!(r instanceof et))return!1;var t=this.$$.ptrType.registeredClass,e=this.$$.ptr;r.$$=r.$$;for(var n=r.$$.ptrType.registeredClass,a=r.$$.ptr;t.baseClass;)e=t.upcast(e),t=t.baseClass;for(;n.baseClass;)a=n.upcast(a),n=n.baseClass;return t===n&&e===a},clone(){if(this.$$.ptr||lt(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var r=G(Object.create(Object.getPrototypeOf(this),{$$:{value:_r(this.$$)}}));return r.$$.count.value+=1,r.$$.deleteScheduled=!1,r},delete(){this.$$.ptr||lt(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&d("Object already scheduled for deletion"),jt(this),Et(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},isDeleted(){return!this.$$.ptr},deleteLater(){return this.$$.ptr||lt(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&d("Object already scheduled for deletion"),q.push(this),q.length===1&&L&&L(ht),this.$$.deleteScheduled=!0,this}})};function et(){}var Z=(r,t)=>Object.defineProperty(t,"name",{value:r}),It=(r,t,e)=>{if(r[t].overloadTable===void 0){var n=r[t];r[t]=function(){return r[t].overloadTable.hasOwnProperty(arguments.length)||d(`Function '${e}' called with an invalid number of arguments (${arguments.length}) - expects one of (${r[t].overloadTable})!`),r[t].overloadTable[arguments.length].apply(this,arguments)},r[t].overloadTable=[],r[t].overloadTable[n.argCount]=n}},xt=(r,t,e)=>{u.hasOwnProperty(r)?((e===void 0||u[r].overloadTable!==void 0&&u[r].overloadTable[e]!==void 0)&&d(`Cannot register public name '${r}' twice`),It(u,r,r),u.hasOwnProperty(e)&&d(`Cannot register multiple overloads of a function with the same number of arguments (${e})!`),u[r].overloadTable[e]=t):(u[r]=t,e!==void 0&&(u[r].numArguments=e))},xr=48,Ur=57,Vr=r=>{if(r===void 0)return"_unknown";r=r.replace(/[^a-zA-Z0-9_]/g,"$");var t=r.charCodeAt(0);return t>=xr&&t<=Ur?`_${r}`:r};function Br(r,t,e,n,a,i,s,o){this.name=r,this.constructor=t,this.instancePrototype=e,this.rawDestructor=n,this.baseClass=a,this.getActualType=i,this.upcast=s,this.downcast=o,this.pureVirtualFunctions=[]}var nt=(r,t,e)=>{for(;t!==e;)t.upcast||d(`Expected null or instance of ${e.name}, got an instance of ${t.name}`),r=t.upcast(r),t=t.baseClass;return r};function Hr(r,t){if(t===null)return this.isReference&&d(`null is not a valid ${this.name}`),0;t.$$||d(`Cannot pass "${dt(t)}" as a ${this.name}`),t.$$.ptr||d(`Cannot pass deleted object as a pointer of type ${this.name}`);var e=t.$$.ptrType.registeredClass,n=nt(t.$$.ptr,e,this.registeredClass);return n}function zr(r,t){var e;if(t===null)return this.isReference&&d(`null is not a valid ${this.name}`),this.isSmartPointer?(e=this.rawConstructor(),r!==null&&r.push(this.rawDestructor,e),e):0;(!t||!t.$$)&&d(`Cannot pass "${dt(t)}" as a ${this.name}`),t.$$.ptr||d(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&t.$$.ptrType.isConst&&d(`Cannot convert argument of type ${t.$$.smartPtrType?t.$$.smartPtrType.name:t.$$.ptrType.name} to parameter type ${this.name}`);var n=t.$$.ptrType.registeredClass;if(e=nt(t.$$.ptr,n,this.registeredClass),this.isSmartPointer)switch(t.$$.smartPtr===void 0&&d("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:t.$$.smartPtrType===this?e=t.$$.smartPtr:d(`Cannot convert argument of type ${t.$$.smartPtrType?t.$$.smartPtrType.name:t.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:e=t.$$.smartPtr;break;case 2:if(t.$$.smartPtrType===this)e=t.$$.smartPtr;else{var a=t.clone();e=this.rawShare(e,ot.toHandle(()=>a.delete())),r!==null&&r.push(this.rawDestructor,e)}break;default:d("Unsupporting sharing policy")}return e}function Mr(r,t){if(t===null)return this.isReference&&d(`null is not a valid ${this.name}`),0;t.$$||d(`Cannot pass "${dt(t)}" as a ${this.name}`),t.$$.ptr||d(`Cannot pass deleted object as a pointer of type ${this.name}`),t.$$.ptrType.isConst&&d(`Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`);var e=t.$$.ptrType.registeredClass,n=nt(t.$$.ptr,e,this.registeredClass);return n}function Ut(r){return this.fromWireType(y[r>>2])}var qr=()=>{Object.assign(at.prototype,{getPointee(r){return this.rawGetPointee&&(r=this.rawGetPointee(r)),r},destructor(r){var t;(t=this.rawDestructor)==null||t.call(this,r)},argPackAdvance:W,readValueFromPointer:Ut,deleteObject(r){r!==null&&r.delete()},fromWireType:Dr})};function at(r,t,e,n,a,i,s,o,l,c,p){this.name=r,this.registeredClass=t,this.isReference=e,this.isConst=n,this.isSmartPointer=a,this.pointeeType=i,this.sharingPolicy=s,this.rawGetPointee=o,this.rawConstructor=l,this.rawShare=c,this.rawDestructor=p,!a&&t.baseClass===void 0?n?(this.toWireType=Hr,this.destructorFunction=null):(this.toWireType=Mr,this.destructorFunction=null):this.toWireType=zr}var Lr=(r,t,e)=>{u.hasOwnProperty(r)||tt("Replacing nonexistant public symbol"),u[r].overloadTable!==void 0&&e!==void 0?u[r].overloadTable[e]=t:(u[r]=t,u[r].argCount=e)},Nr=(r,t,e)=>{var n=u["dynCall_"+r];return e&&e.length?n.apply(null,[t].concat(e)):n.call(null,t)},it=[],Vt,Bt=r=>{var t=it[r];return t||(r>=it.length&&(it.length=r+1),it[r]=t=Vt.get(r)),t},Gr=(r,t,e)=>{if(r.includes("j"))return Nr(r,t,e);var n=Bt(t).apply(null,e);return n},Zr=(r,t)=>{var e=[];return function(){return e.length=0,Object.assign(e,arguments),Gr(r,t,e)}},S=(r,t)=>{r=$(r);function e(){return r.includes("j")?Zr(r,t):Bt(t)}var n=e();return typeof n!="function"&&d(`unknown function pointer with signature ${r}: ${t}`),n},Xr=(r,t)=>{var e=Z(t,function(n){this.name=t,this.message=n;var a=new Error(n).stack;a!==void 0&&(this.stack=this.toString()+`
`+a.replace(/^Error(:[^\n]*)?\n/,""))});return e.prototype=Object.create(r.prototype),e.prototype.constructor=e,e.prototype.toString=function(){return this.message===void 0?this.name:`${this.name}: ${this.message}`},e},Ht,zt=r=>{var t=tr(r),e=$(t);return O(t),e},X=(r,t)=>{var e=[],n={};function a(i){if(!n[i]&&!D[i]){if(Y[i]){Y[i].forEach(a);return}e.push(i),n[i]=!0}}throw t.forEach(a),new Ht(`${r}: `+e.map(zt).join([", "]))},Jr=(r,t,e,n,a,i,s,o,l,c,p,h,f)=>{p=$(p),i=S(a,i),o&&(o=S(s,o)),c&&(c=S(l,c)),f=S(h,f);var v=Vr(p);xt(v,function(){X(`Cannot construct ${p} due to unbound types`,[n])}),I([r,t,e],n?[n]:[],function(m){var ir;m=m[0];var P,C;n?(P=m.registeredClass,C=P.instancePrototype):C=et.prototype;var k=Z(p,function(){if(Object.getPrototypeOf(this)!==J)throw new V("Use 'new' to construct "+p);if(b.constructor_body===void 0)throw new V(p+" has no accessible constructor");var or=b.constructor_body[arguments.length];if(or===void 0)throw new V(`Tried to invoke ctor of ${p} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(b.constructor_body).toString()}) parameters instead!`);return or.apply(this,arguments)}),J=Object.create(C,{constructor:{value:k}});k.prototype=J;var b=new Br(p,k,J,f,P,i,o,c);b.baseClass&&((ir=b.baseClass).__derivedClasses??(ir.__derivedClasses=[]),b.baseClass.__derivedClasses.push(b));var xe=new at(p,b,!0,!1,!1),nr=new at(p+"*",b,!1,!1,!1),ar=new at(p+" const*",b,!1,!0,!1);return Dt[r]={pointerType:nr,constPointerType:ar},Lr(v,k),[xe,nr,ar]})},Mt=(r,t)=>{for(var e=[],n=0;n<r;n++)e.push(y[t+n*4>>2]);return e},qt=r=>{for(;r.length;){var t=r.pop(),e=r.pop();e(t)}};function Lt(r){for(var t=1;t<r.length;++t)if(r[t]!==null&&r[t].destructorFunction===void 0)return!0;return!1}function Kr(r,t){if(!(r instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof r} which is not a function`);var e=Z(r.name||"unknownFunctionName",function(){});e.prototype=r.prototype;var n=new e,a=r.apply(n,t);return a instanceof Object?a:n}function Qr(r,t,e,n,a){for(var i=Lt(t),s=t.length,o="",l="",c=0;c<s-2;++c)o+=(c!==0?", ":"")+"arg"+c,l+=(c!==0?", ":"")+"arg"+c+"Wired";var p=`
        return function (${o}) {
        if (arguments.length !== ${s-2}) {
          throwBindingError('function ${r} called with ' + arguments.length + ' arguments, expected ${s-2}');
        }`;i&&(p+=`var destructors = [];
`);var h=i?"destructors":"null",f=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];e&&(p+="var thisWired = classParam['toWireType']("+h+`, this);
`);for(var c=0;c<s-2;++c)p+="var arg"+c+"Wired = argType"+c+"['toWireType']("+h+", arg"+c+"); // "+t[c+2].name+`
`,f.push("argType"+c);if(e&&(l="thisWired"+(l.length>0?", ":"")+l),p+=(n||a?"var rv = ":"")+"invoker(fn"+(l.length>0?", ":"")+l+`);
`,i)p+=`runDestructors(destructors);
`;else for(var c=e?1:2;c<t.length;++c){var v=c===1?"thisWired":"arg"+(c-2)+"Wired";t[c].destructorFunction!==null&&(p+=v+"_dtor("+v+"); // "+t[c].name+`
`,f.push(v+"_dtor"))}return n&&(p+=`var ret = retType['fromWireType'](rv);
return ret;
`),p+=`}
`,[f,p]}function Nt(r,t,e,n,a,i){var s=t.length;s<2&&d("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var o=t[1]!==null&&e!==null,l=Lt(t),c=t[0].name!=="void",p=[d,n,a,qt,t[0],t[1]],h=0;h<s-2;++h)p.push(t[h+2]);if(!l)for(var h=o?1:2;h<t.length;++h)t[h].destructorFunction!==null&&p.push(t[h].destructorFunction);let[f,v]=Qr(r,t,o,c,i);f.push(v);var m=Kr(Function,f).apply(null,p);return Z(r,m)}var Yr=(r,t,e,n,a,i)=>{var s=Mt(t,e);a=S(n,a),I([],[r],function(o){o=o[0];var l=`constructor ${o.name}`;if(o.registeredClass.constructor_body===void 0&&(o.registeredClass.constructor_body=[]),o.registeredClass.constructor_body[t-1]!==void 0)throw new V(`Cannot register multiple constructors with identical number of parameters (${t-1}) for class '${o.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return o.registeredClass.constructor_body[t-1]=()=>{X(`Cannot construct ${o.name} due to unbound types`,s)},I([],s,c=>(c.splice(1,0,null),o.registeredClass.constructor_body[t-1]=Nt(l,c,null,a,i),[])),[]})},te=r=>{r=r.trim();const t=r.indexOf("(");return t!==-1?r.substr(0,t):r},re=(r,t,e,n,a,i,s,o,l)=>{var c=Mt(e,n);t=$(t),t=te(t),i=S(a,i),I([],[r],function(p){p=p[0];var h=`${p.name}.${t}`;t.startsWith("@@")&&(t=Symbol[t.substring(2)]),o&&p.registeredClass.pureVirtualFunctions.push(t);function f(){X(`Cannot call ${h} due to unbound types`,c)}var v=p.registeredClass.instancePrototype,m=v[t];return m===void 0||m.overloadTable===void 0&&m.className!==p.name&&m.argCount===e-2?(f.argCount=e-2,f.className=p.name,v[t]=f):(It(v,t,h),v[t].overloadTable[e-2]=f),I([],c,function(P){var C=Nt(h,P,p,i,s,l);return v[t].overloadTable===void 0?(C.argCount=e-2,v[t]=C):v[t].overloadTable[e-2]=C,[]}),[]})},Gt=(r,t,e)=>(r instanceof Object||d(`${e} with invalid "this": ${r}`),r instanceof t.registeredClass.constructor||d(`${e} incompatible with "this" of type ${r.constructor.name}`),r.$$.ptr||d(`cannot call emscripten binding method ${e} on deleted object`),nt(r.$$.ptr,r.$$.ptrType.registeredClass,t.registeredClass)),ee=(r,t,e,n,a,i,s,o,l,c)=>{t=$(t),a=S(n,a),I([],[r],function(p){p=p[0];var h=`${p.name}.${t}`,f={get(){X(`Cannot access ${h} due to unbound types`,[e,s])},enumerable:!0,configurable:!0};return l?f.set=()=>X(`Cannot access ${h} due to unbound types`,[e,s]):f.set=v=>d(h+" is a read-only property"),Object.defineProperty(p.registeredClass.instancePrototype,t,f),I([],l?[e,s]:[e],function(v){var m=v[0],P={get(){var k=Gt(this,p,h+" getter");return m.fromWireType(a(i,k))},enumerable:!0};if(l){l=S(o,l);var C=v[1];P.set=function(k){var J=Gt(this,p,h+" setter"),b=[];l(c,J,C.toWireType(b,k)),qt(b)}}return Object.defineProperty(p.registeredClass.instancePrototype,t,P),[]}),[]})};function ne(){Object.assign(Zt.prototype,{get(r){return this.allocated[r]},has(r){return this.allocated[r]!==void 0},allocate(r){var t=this.freelist.pop()||this.allocated.length;return this.allocated[t]=r,t},free(r){this.allocated[r]=void 0,this.freelist.push(r)}})}function Zt(){this.allocated=[void 0],this.freelist=[]}var w=new Zt,Xt=r=>{r>=w.reserved&&--w.get(r).refcount===0&&w.free(r)},ae=()=>{for(var r=0,t=w.reserved;t<w.allocated.length;++t)w.allocated[t]!==void 0&&++r;return r},ie=()=>{w.allocated.push({value:void 0},{value:null},{value:!0},{value:!1}),w.reserved=w.allocated.length,u.count_emval_handles=ae},ot={toValue:r=>(r||d("Cannot use deleted val. handle = "+r),w.get(r).value),toHandle:r=>{switch(r){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:return w.allocate({refcount:1,value:r})}}};function Jt(r){return this.fromWireType(j[r>>2])}var oe=(r,t)=>{t=$(t),T(r,{name:t,fromWireType:e=>{var n=ot.toValue(e);return Xt(e),n},toWireType:(e,n)=>ot.toHandle(n),argPackAdvance:W,readValueFromPointer:Jt,destructorFunction:null})},se=(r,t,e)=>{switch(t){case 1:return e?function(n){return this.fromWireType(F[n>>0])}:function(n){return this.fromWireType(g[n>>0])};case 2:return e?function(n){return this.fromWireType(x[n>>1])}:function(n){return this.fromWireType(z[n>>1])};case 4:return e?function(n){return this.fromWireType(j[n>>2])}:function(n){return this.fromWireType(y[n>>2])};default:throw new TypeError(`invalid integer width (${t}): ${r}`)}},ue=(r,t,e,n)=>{t=$(t);function a(){}a.values={},T(r,{name:t,constructor:a,fromWireType:function(i){return this.constructor.values[i]},toWireType:(i,s)=>s.value,argPackAdvance:W,readValueFromPointer:se(t,e,n),destructorFunction:null}),xt(t,a)},Kt=(r,t)=>{var e=D[r];return e===void 0&&d(t+" has unknown type "+zt(r)),e},ce=(r,t,e)=>{var n=Kt(r,"enum");t=$(t);var a=n.constructor,i=Object.create(n.constructor.prototype,{value:{value:e},constructor:{value:Z(`${n.name}_${t}`,function(){})}});a.values[e]=i,a[t]=i},dt=r=>{if(r===null)return"null";var t=typeof r;return t==="object"||t==="array"||t==="function"?r.toString():""+r},le=(r,t)=>{switch(t){case 4:return function(e){return this.fromWireType(bt[e>>2])};case 8:return function(e){return this.fromWireType(wt[e>>3])};default:throw new TypeError(`invalid float width (${t}): ${r}`)}},pe=(r,t,e)=>{t=$(t),T(r,{name:t,fromWireType:n=>n,toWireType:(n,a)=>a,argPackAdvance:W,readValueFromPointer:le(t,e),destructorFunction:null})},he=(r,t,e)=>{switch(t){case 1:return e?n=>F[n>>0]:n=>g[n>>0];case 2:return e?n=>x[n>>1]:n=>z[n>>1];case 4:return e?n=>j[n>>2]:n=>y[n>>2];default:throw new TypeError(`invalid integer width (${t}): ${r}`)}},de=(r,t,e,n,a)=>{t=$(t);var i=p=>p;if(n===0){var s=32-8*e;i=p=>p<<s>>>s}var o=t.includes("unsigned"),l=(p,h)=>{},c;o?c=function(p,h){return l(h,this.name),h>>>0}:c=function(p,h){return l(h,this.name),h},T(r,{name:t,fromWireType:i,toWireType:c,argPackAdvance:W,readValueFromPointer:he(t,e,n!==0),destructorFunction:null})},fe=(r,t,e)=>{var n=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],a=n[t];function i(s){var o=y[s>>2],l=y[s+4>>2];return new a(F.buffer,l,o)}e=$(e),T(r,{name:e,fromWireType:i,argPackAdvance:W,readValueFromPointer:i},{ignoreDuplicateRegistrations:!0})},ve=(r,t,e,n)=>{if(!(n>0))return 0;for(var a=e,i=e+n-1,s=0;s<r.length;++s){var o=r.charCodeAt(s);if(o>=55296&&o<=57343){var l=r.charCodeAt(++s);o=65536+((o&1023)<<10)|l&1023}if(o<=127){if(e>=i)break;t[e++]=o}else if(o<=2047){if(e+1>=i)break;t[e++]=192|o>>6,t[e++]=128|o&63}else if(o<=65535){if(e+2>=i)break;t[e++]=224|o>>12,t[e++]=128|o>>6&63,t[e++]=128|o&63}else{if(e+3>=i)break;t[e++]=240|o>>18,t[e++]=128|o>>12&63,t[e++]=128|o>>6&63,t[e++]=128|o&63}}return t[e]=0,e-a},ye=(r,t,e)=>ve(r,g,t,e),me=r=>{for(var t=0,e=0;e<r.length;++e){var n=r.charCodeAt(e);n<=127?t++:n<=2047?t+=2:n>=55296&&n<=57343?(t+=4,++e):t+=3}return t},Qt=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,ge=(r,t,e)=>{for(var n=t+e,a=t;r[a]&&!(a>=n);)++a;if(a-t>16&&r.buffer&&Qt)return Qt.decode(r.subarray(t,a));for(var i="";t<a;){var s=r[t++];if(!(s&128)){i+=String.fromCharCode(s);continue}var o=r[t++]&63;if((s&224)==192){i+=String.fromCharCode((s&31)<<6|o);continue}var l=r[t++]&63;if((s&240)==224?s=(s&15)<<12|o<<6|l:s=(s&7)<<18|o<<12|l<<6|r[t++]&63,s<65536)i+=String.fromCharCode(s);else{var c=s-65536;i+=String.fromCharCode(55296|c>>10,56320|c&1023)}}return i},$e=(r,t)=>r?ge(g,r,t):"",be=(r,t)=>{t=$(t);var e=t==="std::string";T(r,{name:t,fromWireType(n){var a=y[n>>2],i=n+4,s;if(e)for(var o=i,l=0;l<=a;++l){var c=i+l;if(l==a||g[c]==0){var p=c-o,h=$e(o,p);s===void 0?s=h:(s+="\0",s+=h),o=c+1}}else{for(var f=new Array(a),l=0;l<a;++l)f[l]=String.fromCharCode(g[i+l]);s=f.join("")}return O(n),s},toWireType(n,a){a instanceof ArrayBuffer&&(a=new Uint8Array(a));var i,s=typeof a=="string";s||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int8Array||d("Cannot pass non-string to std::string"),e&&s?i=me(a):i=a.length;var o=ft(4+i+1),l=o+4;if(y[o>>2]=i,e&&s)ye(a,l,i+1);else if(s)for(var c=0;c<i;++c){var p=a.charCodeAt(c);p>255&&(O(l),d("String has UTF-16 code units that do not fit in 8 bits")),g[l+c]=p}else for(var c=0;c<i;++c)g[l+c]=a[c];return n!==null&&n.push(O,o),o},argPackAdvance:W,readValueFromPointer:Ut,destructorFunction(n){O(n)}})},Yt=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,we=(r,t)=>{for(var e=r,n=e>>1,a=n+t/2;!(n>=a)&&z[n];)++n;if(e=n<<1,e-r>32&&Yt)return Yt.decode(g.subarray(r,e));for(var i="",s=0;!(s>=t/2);++s){var o=x[r+s*2>>1];if(o==0)break;i+=String.fromCharCode(o)}return i},Ce=(r,t,e)=>{if(e??(e=2147483647),e<2)return 0;e-=2;for(var n=t,a=e<r.length*2?e/2:r.length,i=0;i<a;++i){var s=r.charCodeAt(i);x[t>>1]=s,t+=2}return x[t>>1]=0,t-n},Te=r=>r.length*2,Pe=(r,t)=>{for(var e=0,n="";!(e>=t/4);){var a=j[r+e*4>>2];if(a==0)break;if(++e,a>=65536){var i=a-65536;n+=String.fromCharCode(55296|i>>10,56320|i&1023)}else n+=String.fromCharCode(a)}return n},Ae=(r,t,e)=>{if(e??(e=2147483647),e<4)return 0;for(var n=t,a=n+e-4,i=0;i<r.length;++i){var s=r.charCodeAt(i);if(s>=55296&&s<=57343){var o=r.charCodeAt(++i);s=65536+((s&1023)<<10)|o&1023}if(j[t>>2]=s,t+=4,t+4>a)break}return j[t>>2]=0,t-n},We=r=>{for(var t=0,e=0;e<r.length;++e){var n=r.charCodeAt(e);n>=55296&&n<=57343&&++e,t+=4}return t},_e=(r,t,e)=>{e=$(e);var n,a,i,s,o;t===2?(n=we,a=Ce,s=Te,i=()=>z,o=1):t===4&&(n=Pe,a=Ae,s=We,i=()=>y,o=2),T(r,{name:e,fromWireType:l=>{for(var c=y[l>>2],p=i(),h,f=l+4,v=0;v<=c;++v){var m=l+4+v*t;if(v==c||p[m>>o]==0){var P=m-f,C=n(f,P);h===void 0?h=C:(h+="\0",h+=C),f=m+t}}return O(l),h},toWireType:(l,c)=>{typeof c!="string"&&d(`Cannot pass non-string to C++ string type ${e}`);var p=s(c),h=ft(4+p+t);return y[h>>2]=p>>o,a(c,h+4,p+t),l!==null&&l.push(O,h),h},argPackAdvance:W,readValueFromPointer:Jt,destructorFunction(l){O(l)}})},Oe=(r,t)=>{t=$(t),T(r,{isVoid:!0,name:t,argPackAdvance:0,fromWireType:()=>{},toWireType:(e,n)=>{}})},Fe=r=>{r>4&&(w.get(r).refcount+=1)},Se=(r,t)=>{r=Kt(r,"_emval_take_value");var e=r.readValueFromPointer(t);return ot.toHandle(e)},ke=()=>{ut("")},je=(r,t,e)=>g.copyWithin(r,t,t+e),Ee=()=>2147483648,Re=r=>{var t=Q.buffer,e=(r-t.byteLength+65535)/65536;try{return Q.grow(e),Ct(),1}catch{}},De=r=>{var t=g.length;r>>>=0;var e=Ee();if(r>e)return!1;for(var n=(l,c)=>l+(c-l%c)%c,a=1;a<=4;a*=2){var i=t*(1+.2/a);i=Math.min(i,r+100663296);var s=Math.min(e,n(Math.max(r,i),65536)),o=Re(s);if(o)return!0}return!1};Pr(),V=u.BindingError=class extends Error{constructor(r){super(r),this.name="BindingError"}},kt=u.InternalError=class extends Error{constructor(r){super(r),this.name="InternalError"}},Ir(),jr(),qr(),Ht=u.UnboundTypeError=Xr(Error,"UnboundTypeError"),ne(),ie();var Ie={i:Cr,p:Tr,u:Wr,f:Jr,d:Yr,a:re,c:ee,t:oe,o:ue,g:ce,l:pe,e:de,b:fe,k:be,h:_e,v:Oe,m:Xt,n:Fe,j:Se,q:ke,s:je,r:De},_=br(),tr=r=>(tr=_.z)(r),ft=r=>(ft=_.A)(r),O=r=>(O=_.B)(r),rr=r=>(rr=_.C)(r),st;M=function r(){st||er(),st||(M=r)};function er(){if(E>0||(cr(),E>0))return;function r(){st||(st=!0,u.calledRun=!0,!$t&&(lr(),mt(u),u.onRuntimeInitialized&&u.onRuntimeInitialized(),pr()))}u.setStatus?(u.setStatus("Running..."),setTimeout(function(){setTimeout(function(){u.setStatus("")},1),r()},1)):r()}if(u.preInit)for(typeof u.preInit=="function"&&(u.preInit=[u.preInit]);u.preInit.length>0;)u.preInit.pop()();return er(),yt.ready}})();export{Ue as default};
