(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedRight: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,__class__: List
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
var Sys = function() { };
Sys.__name__ = true;
Sys.args = function() {
	return js_Node.process.argv;
};
Sys.getEnv = function(key) {
	return Reflect.field(js_Node.process.env,key);
};
Sys.environment = function() {
	return js_Node.process.env;
};
Sys.exit = function(code) {
	js_Node.process.exit(code);
};
Sys.time = function() {
	return Date.now() / 1000;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Resource = function() { };
haxe_Resource.__name__ = true;
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
var haxe__$Template_TemplateExpr = { __ename__ : true, __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] };
haxe__$Template_TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
var haxe_Template = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw new js__$Boot_HaxeError("Unexpected '" + Std.string(tokens.first().s) + "'");
};
haxe_Template.__name__ = true;
haxe_Template.prototype = {
	execute: function(context,macros) {
		if(macros == null) this.macros = { }; else this.macros = macros;
		this.context = context;
		this.stack = new List();
		this.buf = new StringBuf();
		this.run(this.expr);
		return this.buf.b;
	}
	,resolve: function(v) {
		if(Object.prototype.hasOwnProperty.call(this.context,v)) return Reflect.field(this.context,v);
		var _g_head = this.stack.h;
		var _g_val = null;
		while(_g_head != null) {
			var ctx;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			ctx = _g_val;
			if(Object.prototype.hasOwnProperty.call(ctx,v)) return Reflect.field(ctx,v);
		}
		if(v == "__current__") return this.context;
		return Reflect.field(haxe_Template.globals,v);
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe_Template.splitter.match(data)) {
			var p = haxe_Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe_Template.splitter.matchedRight();
				continue;
			}
			var parp = p.pos + p.len;
			var npar = 1;
			var params = [];
			var part = "";
			while(true) {
				var c = HxOverrides.cca(data,parp);
				parp++;
				if(c == 40) npar++; else if(c == 41) {
					npar--;
					if(npar <= 0) break;
				} else if(c == null) throw new js__$Boot_HaxeError("Unclosed macro parenthesis");
				if(c == 44 && npar == 1) {
					params.push(part);
					part = "";
				} else part += String.fromCharCode(c);
			}
			params.push(part);
			tokens.add({ p : haxe_Template.splitter.matched(2), s : false, l : params});
			data = HxOverrides.substr(data,parp,data.length - parp);
		}
		if(data.length > 0) tokens.add({ p : data, s : true, l : null});
		return tokens;
	}
	,parseBlock: function(tokens) {
		var l = new List();
		while(true) {
			var t = tokens.first();
			if(t == null) break;
			if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) break;
			l.add(this.parse(tokens));
		}
		if(l.length == 1) return l.first();
		return haxe__$Template_TemplateExpr.OpBlock(l);
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe__$Template_TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0;
			var _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe__$Template_TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw new js__$Boot_HaxeError("Unclosed 'if'");
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw new js__$Boot_HaxeError("Unclosed 'else'");
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe__$Template_TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e1 = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t2 = tokens.pop();
			if(t2 == null || t2.p != "end") throw new js__$Boot_HaxeError("Unclosed 'foreach'");
			return haxe__$Template_TemplateExpr.OpForeach(e1,efor);
		}
		if(haxe_Template.expr_splitter.match(p)) return haxe__$Template_TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe__$Template_TemplateExpr.OpVar(p);
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe_Template.expr_splitter.match(data)) {
			var p = haxe_Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe_Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe_Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw new js__$Boot_HaxeError(l.first().p);
		} catch( s ) {
			if (s instanceof js__$Boot_HaxeError) s = s.val;
			if( js_Boot.__instanceof(s,String) ) {
				throw new js__$Boot_HaxeError("Unexpected '" + s + "' in " + expr);
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				if (exc instanceof js__$Boot_HaxeError) exc = exc.val;
				throw new js__$Boot_HaxeError("Error : " + Std.string(exc) + " in " + expr);
			}
		};
	}
	,makeConst: function(v) {
		haxe_Template.expr_trim.match(v);
		v = haxe_Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe_Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe_Template.expr_float.match(v)) {
			var f = parseFloat(v);
			return function() {
				return f;
			};
		}
		var me = this;
		return function() {
			return me.resolve(v);
		};
	}
	,makePath: function(e,l) {
		var p = l.first();
		if(p == null || p.p != ".") return e;
		l.pop();
		var field = l.pop();
		if(field == null || !field.s) throw new js__$Boot_HaxeError(field.p);
		var f = field.p;
		haxe_Template.expr_trim.match(f);
		f = haxe_Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw new js__$Boot_HaxeError("<eof>");
		if(p.s) return this.makeConst(p.p);
		var _g = p.p;
		switch(_g) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw new js__$Boot_HaxeError(p1.p);
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw new js__$Boot_HaxeError(p2.p);
			var _g1 = p1.p;
			switch(_g1) {
			case "+":
				return function() {
					return e1() + e2();
				};
			case "-":
				return function() {
					return e1() - e2();
				};
			case "*":
				return function() {
					return e1() * e2();
				};
			case "/":
				return function() {
					return e1() / e2();
				};
			case ">":
				return function() {
					return e1() > e2();
				};
			case "<":
				return function() {
					return e1() < e2();
				};
			case ">=":
				return function() {
					return e1() >= e2();
				};
			case "<=":
				return function() {
					return e1() <= e2();
				};
			case "==":
				return function() {
					return e1() == e2();
				};
			case "!=":
				return function() {
					return e1() != e2();
				};
			case "&&":
				return function() {
					return e1() && e2();
				};
			case "||":
				return function() {
					return e1() || e2();
				};
			default:
				throw new js__$Boot_HaxeError("Unknown operation " + p1.p);
			}
			break;
		case "!":
			var e = this.makeExpr(l);
			return function() {
				var v = e();
				return v == null || v == false;
			};
		case "-":
			var e3 = this.makeExpr(l);
			return function() {
				return -e3();
			};
		}
		throw new js__$Boot_HaxeError(p.p);
	}
	,run: function(e) {
		switch(e[1]) {
		case 0:
			var v = e[2];
			this.buf.add(Std.string(this.resolve(v)));
			break;
		case 1:
			var e1 = e[2];
			this.buf.add(Std.string(e1()));
			break;
		case 2:
			var eelse = e[4];
			var eif = e[3];
			var e2 = e[2];
			var v1 = e2();
			if(v1 == null || v1 == false) {
				if(eelse != null) this.run(eelse);
			} else this.run(eif);
			break;
		case 3:
			var str = e[2];
			if(str == null) this.buf.b += "null"; else this.buf.b += "" + str;
			break;
		case 4:
			var l = e[2];
			var _g_head = l.h;
			var _g_val = null;
			while(_g_head != null) {
				var e3;
				e3 = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				this.run(e3);
			}
			break;
		case 5:
			var loop = e[3];
			var e4 = e[2];
			var v2 = e4();
			try {
				var x = $iterator(v2)();
				if(x.hasNext == null) throw new js__$Boot_HaxeError(null);
				v2 = x;
			} catch( e5 ) {
				if (e5 instanceof js__$Boot_HaxeError) e5 = e5.val;
				try {
					if(v2.hasNext == null) throw new js__$Boot_HaxeError(null);
				} catch( e6 ) {
					if (e6 instanceof js__$Boot_HaxeError) e6 = e6.val;
					throw new js__$Boot_HaxeError("Cannot iter on " + Std.string(v2));
				}
			}
			this.stack.push(this.context);
			var v3 = v2;
			while( v3.hasNext() ) {
				var ctx = v3.next();
				this.context = ctx;
				this.run(loop);
			}
			this.context = this.stack.pop();
			break;
		case 6:
			var params = e[3];
			var m = e[2];
			var v4 = Reflect.field(this.macros,m);
			var pl = [];
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var _g_head1 = params.h;
			var _g_val1 = null;
			while(_g_head1 != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val1 = _g_head1[0];
					_g_head1 = _g_head1[1];
					$r = _g_val1;
					return $r;
				}(this));
				switch(p[1]) {
				case 0:
					var v5 = p[2];
					pl.push(this.resolve(v5));
					break;
				default:
					this.buf = new StringBuf();
					this.run(p);
					pl.push(this.buf.b);
				}
			}
			this.buf = old;
			try {
				this.buf.add(Std.string(Reflect.callMethod(this.macros,v4,pl)));
			} catch( e7 ) {
				if (e7 instanceof js__$Boot_HaxeError) e7 = e7.val;
				var plstr;
				try {
					plstr = pl.join(",");
				} catch( e8 ) {
					if (e8 instanceof js__$Boot_HaxeError) e8 = e8.val;
					plstr = "???";
				}
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e7) + ")";
				throw new js__$Boot_HaxeError(msg);
			}
			break;
		}
	}
	,__class__: haxe_Template
};
var haxe_io_Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(length,new Buffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var nb = new Buffer(s,"utf8");
	return new haxe_io_Bytes(nb.length,nb);
};
haxe_io_Bytes.ofData = function(b) {
	return new haxe_io_Bytes(b.length,b);
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		src.b.copy(this.b,pos,srcpos,srcpos + len);
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var nb = new Buffer(len);
		var slice = this.b.slice(pos,pos + len);
		slice.copy(nb,0,0,len);
		return new haxe_io_Bytes(len,nb);
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len;
		if(this.length < other.length) len = this.length; else len = other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,readString: function(pos,len) {
		return this.getString(pos,len);
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g11 = 0;
		var _g2 = this.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var c = this.b[i1];
			s_b += String.fromCharCode(chars[c >> 4]);
			s_b += String.fromCharCode(chars[c & 15]);
		}
		return s_b;
	}
	,getData: function() {
		return this.b;
	}
	,__class__: haxe_io_Bytes
};
var haxe_crypto_Base64 = function() { };
haxe_crypto_Base64.__name__ = true;
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	this.base = base;
	this.nbits = nbits;
};
haxe_crypto_BaseCode.__name__ = true;
haxe_crypto_BaseCode.prototype = {
	initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe_io_Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_BytesBuffer = function() {
	this.b = [];
};
haxe_io_BytesBuffer.__name__ = true;
haxe_io_BytesBuffer.prototype = {
	get_length: function() {
		return this.b.length;
	}
	,addByte: function($byte) {
		this.b.push($byte);
	}
	,add: function(src) {
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = 0;
		var _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var nb = new Buffer(this.b);
		var bytes = new haxe_io_Bytes(nb.length,nb);
		this.b = null;
		return bytes;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var hxl8_ICommandList = function() { };
hxl8_ICommandList.__name__ = true;
hxl8_ICommandList.prototype = {
	__class__: hxl8_ICommandList
};
var hxl8_ICommandListRepeating = function() { };
hxl8_ICommandListRepeating.__name__ = true;
hxl8_ICommandListRepeating.__interfaces__ = [hxl8_ICommandList];
hxl8_ICommandListRepeating.prototype = {
	__class__: hxl8_ICommandListRepeating
};
var hxl8_IResponseOutput = function() { };
hxl8_IResponseOutput.__name__ = true;
hxl8_IResponseOutput.prototype = {
	__class__: hxl8_IResponseOutput
};
var hxl8_L8CmdParser = function(args,overwriteComPort,outputter) {
	this.commands = [];
	this.needResponse = false;
	this.repeat = false;
	this.repeatForever = false;
	this.repeatsCount = 0;
	this.repeatsDelay = 10;
	this.delay = 100;
	this.comPort = "/dev/ttyACM0";
	if(overwriteComPort != null) this.comPort = overwriteComPort;
	this.parse(args,outputter);
};
hxl8_L8CmdParser.__name__ = true;
hxl8_L8CmdParser.__interfaces__ = [hxl8_ICommandListRepeating,hxl8_ICommandList];
hxl8_L8CmdParser.prototype = {
	isRepeat: function() {
		return this.repeat;
	}
	,isRepeatForever: function() {
		return this.repeatForever;
	}
	,getRepeatCount: function() {
		return this.repeatsCount;
	}
	,getRepeatDelay: function() {
		return this.repeatsDelay;
	}
	,getDelay: function() {
		return this.delay;
	}
	,hasCommands: function() {
		if(this.commands == null) return false;
		return this.commands.length > 0;
	}
	,getCommands: function() {
		return this.commands;
	}
	,getComPort: function() {
		return this.comPort;
	}
	,parse: function(args,outputter) {
		if(args.length <= 0) return;
		var param;
		try {
			while(args.length > 0) {
				var command = args.shift();
				var _g = command.toLowerCase();
				switch(_g) {
				case "appstop":case "stop":
					this.commands.push(new hxl8_commands_L8CmdAppStop());
					break;
				case "appambient":
					this.commands.push(new hxl8_commands_L8CmdAppStop());
					var matrixRGB = this.consumeArgColor(args,"F00");
					var superRGB = this.consumeArgColor(args,"F00");
					var threshold = this.consumeArgInt(args,50);
					this.commands.push(new hxl8_commands_L8CmdAppRunAmbient(matrixRGB,superRGB,threshold));
					break;
				case "appdice":case "dice":
					this.commands.push(new hxl8_commands_L8CmdAppStop());
					var rgb = this.consumeArgColor(args,"F00");
					this.commands.push(new hxl8_commands_L8CmdAppRunDice(rgb));
					break;
				case "applight":case "appcolorchange":case "colorchange":
					this.commands.push(new hxl8_commands_L8CmdAppStop());
					var color = args.shift();
					var speed = this.consumeArgInt(args,64);
					var inverted = this.consumeArgBool(args,false);
					this.commands.push(new hxl8_commands_L8CmdAppRunColorChanger(color,speed,inverted));
					break;
				case "appproximity":case "appprox":
					this.commands.push(new hxl8_commands_L8CmdAppStop());
					var matrixRGB1 = this.consumeArgColor(args,"F00");
					var superRGB1 = this.consumeArgColor(args,"F00");
					var threshold1 = this.consumeArgInt(args,50);
					this.commands.push(new hxl8_commands_L8CmdAppRunProximity(matrixRGB1,superRGB1,threshold1));
					break;
				case "autorotate":
					var enable = this.consumeArgBool(args,true);
					this.commands.push(new hxl8_commands_L8CmdEnableAutoRotate(enable));
					break;
				case "bootloader":case "dfu":
					this.commands.push(new hxl8_commands_L8CmdBootloader());
					break;
				case "batchg":case "bat":
					this.commands.push(new hxl8_commands_L8CmdQueryBatChg());
					break;
				case "brightness":case "bright":
					var brightness = this.consumeArgBool(args,false);
					this.commands.push(new hxl8_commands_L8CmdSetBrightness(brightness));
					break;
				case "box":
					var left = this.consumeArgInt(args,2);
					var top = this.consumeArgInt(args,2);
					var right = this.consumeArgInt(args,6);
					var bottom = this.consumeArgInt(args,6);
					var border = this.consumeArgColor(args,"F00");
					var fill = this.consumeArgColor(args,"00F");
					var outer = this.consumeArgColor(args,"000");
					this.commands.push(new hxl8_commands_L8CmdBox(left,top,right,bottom,border,fill,outer));
					break;
				case "button":
					this.commands.push(new hxl8_commands_L8CmdQueryButton());
					break;
				case "deletel8y":
					var l8y = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdDeleteL8y(l8y));
					break;
				case "deleteanim":
					var anim = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdDeleteAnim(anim));
					break;
				case "deleteframe":
					var frame = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdDeleteFrame(frame));
					break;
				case "deleteusermemory":case "deleteuserspace":
					var really = args.shift();
					if(really != "YES") throw "__break__";
					this.commands.push(new hxl8_commands_L8CmdDeleteUserMemory());
					break;
				case "displaychar":case "char":
					var $char = args.shift();
					var direction = args.shift();
					var offset = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdDisplayChar($char,direction,offset));
					break;
				case "enableallnotifications":case "enableallnotify":
					var enable1 = this.consumeArgBool(args,true);
					this.commands.push(new hxl8_commands_L8CmdEnableAllNotifications(enable1));
					break;
				case "enablenotification":case "enablenotify":case "notifyenable":
					var index = this.consumeArgInt(args,0);
					var enable2 = this.consumeArgBool(args,true);
					this.commands.push(new hxl8_commands_L8CmdEnableNotification(index,enable2));
					break;
				case "getacc":case "accelerator":case "acc":
					this.commands.push(new hxl8_commands_L8CmdQueryAcc());
					break;
				case "getamb":case "ambient":case "amb":
					this.commands.push(new hxl8_commands_L8CmdQueryAmbientLight());
					break;
				case "getmatrix":
					this.commands.push(new hxl8_commands_L8CmdGetCurrentMatrix());
					break;
				case "getmcutemp":case "mcutemperature":case "mcutemp":
					this.commands.push(new hxl8_commands_L8CmdQueryMCUTemp());
					break;
				case "getmic":case "microphone":case "mic":case "noise":case "getnoise":
					this.commands.push(new hxl8_commands_L8CmdQueryNoise());
					break;
				case "getnotifyapp":case "readnotifyapp":case "getnotify":case "readnotify":
					var index1 = this.consumeArgInt(args,0);
					var extended = this.consumeArgBool(args,true);
					this.commands.push(new hxl8_commands_L8CmdGetNotifyApp(index1,extended));
					break;
				case "getnumnotifyapps":case "numnotifyapps":case "numnotify":
					this.commands.push(new hxl8_commands_L8CmdGetNumNotifyApps());
					break;
				case "getnumanims":case "numanims":case "numanim":
					this.commands.push(new hxl8_commands_L8CmdQueryNumAnims());
					break;
				case "getnumframes":case "numframes":case "numframe":
					this.commands.push(new hxl8_commands_L8CmdQueryNumFrames());
					break;
				case "getnuml8ies":case "getnuml8y":case "numl8ies":case "numl8y":
					this.commands.push(new hxl8_commands_L8CmdQueryNumL8ies());
					break;
				case "getprox":case "proximity":case "prox":
					this.commands.push(new hxl8_commands_L8CmdQueryProximity());
					break;
				case "getthreshold":case "sensorthresholds":case "thresholds":case "threshold":
					this.commands.push(new hxl8_commands_L8CmdQuerySensorThresholds());
					break;
				case "gettemp":case "temperature":case "temp":
					this.commands.push(new hxl8_commands_L8CmdQueryTemp());
					break;
				case "getvoltage":case "voltage":
					this.commands.push(new hxl8_commands_L8CmdQueryVoltage());
					break;
				case "getvbus":case "vbus":
					this.commands.push(new hxl8_commands_L8CmdQueryVBUSVoltage());
					break;
				case "init":case "initstatus":case "status":
					this.commands.push(new hxl8_commands_L8CmdQueryInitStatus());
					break;
				case "interface":case "int":case "if":
					this.comPort = args.shift();
					break;
				case "matrixoff":case "matrixclear":case "clear":
					this.commands.push(new hxl8_commands_L8CmdMatrixOff());
					break;
				case "poweroff":case "off":
					this.commands.push(new hxl8_commands_L8CmdPowerOff());
					break;
				case "notificationssilent":
					this.commands.push(new hxl8_commands_L8CmdQueryNotificationsSilent());
					break;
				case "notification":case "notify":
					var app = args.shift();
					var eventType = args.shift();
					var category = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdSetNotification(app,eventType,category));
					break;
				case "party":
					this.commands.push(new hxl8_commands_L8CmdAppStop());
					this.commands.push(new hxl8_commands_L8CmdAppRunParty());
					break;
				case "playanim":case "play":
					var anim1 = this.consumeArgInt(args,0);
					var loop = this.consumeArgBool(args,true);
					this.commands.push(new hxl8_commands_L8CmdPlayAnim(anim1,loop));
					break;
				case "ping":
					this.commands.push(new hxl8_commands_L8CmdSendPing());
					break;
				case "readanim":
					var anim2 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdReadAnim(anim2));
					break;
				case "readframe":
					var frame1 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdReadFrame(frame1));
					break;
				case "readl8y":
					var l8y1 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdReadL8y(l8y1));
					break;
				case "silentrepeat":case "repeat":case "repeatsilent":
					var repeatNumber = args.shift();
					this.repeatsDelay = this.consumeArgInt(args,50);
					if(repeatNumber == "forever") {
						this.repeatForever = true;
						this.repeatsCount = 0;
					} else {
						this.repeatForever = false;
						this.repeatsCount = Std.parseInt(repeatNumber);
						if(this.repeatsCount <= 0) throw "__break__";
					}
					if(this.repeatsDelay <= 0) this.repeatsDelay = 50;
					this.repeat = true;
					if(command == "repeatsilent" || command == "silentrepeat") outputter.setSilent(true);
					break;
				case "reset":
					this.commands.push(new hxl8_commands_L8CmdReset());
					break;
				case "setled":case "led":
					var x = this.consumeArgInt(args,0);
					var y = this.consumeArgInt(args,0);
					var rgb1 = this.consumeArgColor(args,"000");
					this.commands.push(new hxl8_commands_L8CmdSetLED(x,y,rgb1));
					break;
				case "setl8y":case "l8y":
					var index2 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdSetStoredL8y(index2));
					break;
				case "setmatrixledstring":case "matrixledstring":case "matrixstring":
					var rgb2 = this.consumeArgColorArray(args,"000");
					this.commands.push(new hxl8_commands_L8CmdSetMatrixLEDArray(rgb2));
					break;
				case "setnotificationsilence":case "silence":case "silent":
					var silence = this.consumeArgBool(args,false);
					this.commands.push(new hxl8_commands_L8CmdSetNotificationsSilence(silence));
					break;
				case "setmatrixleduni":case "matrixleduni":case "matrixuni":
					var rgb3 = this.consumeArgColor(args,"000");
					this.commands.push(new hxl8_commands_L8CmdSetMatrixLEDUni(rgb3));
					break;
				case "setsuperled":case "superled":case "super":
					var rgb4 = this.consumeArgColor(args,"000");
					this.commands.push(new hxl8_commands_L8CmdSetSuperLED(rgb4));
					break;
				case "setorientation":case "orientation":case "orient":
					var orient = args.shift();
					this.commands.push(new hxl8_commands_L8CmdSetOrientation(orient));
					break;
				case "setambthreshold":case "ambthreshold":
					var min = this.consumeArgInt(args,0);
					var max = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdSetAmbThreshold(min,max));
					break;
				case "setnoisethreshold":case "noisethreshold":
					var min1 = this.consumeArgInt(args,0);
					var max1 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdSetNoiseThreshold(min1,max1));
					break;
				case "setproxthreshold":case "proxthreshold":
					var min2 = this.consumeArgInt(args,0);
					var max2 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8_commands_L8CmdSetProxThreshold(min2,max2));
					break;
				case "statusleds":case "statusled":
					var enable3 = this.consumeArgBool(args,false);
					this.commands.push(new hxl8_commands_L8CmdEnableStatusLEDs(enable3));
					break;
				case "stopanim":
					this.commands.push(new hxl8_commands_L8CmdStopAnim());
					break;
				case "storeanim":
					var anim3 = args.shift();
					this.commands.push(new hxl8_commands_L8CmdStoreAnim(anim3));
					break;
				case "storel8y":
					var rgb5 = this.consumeArgColorArray(args,"000");
					this.commands.push(new hxl8_commands_L8CmdStoreL8y(rgb5));
					break;
				case "storeframe":
					var rgb6 = this.consumeArgColorArray(args,"000");
					this.commands.push(new hxl8_commands_L8CmdStoreFrame(rgb6));
					break;
				case "storenotification":case "storenotify":case "setnotify":case "setnotification":
					var app1 = args.shift();
					var rgb7 = this.consumeArgColorArray(args,"000");
					var superLED = this.consumeArgColor(args,"000");
					var enable4 = this.consumeArgBool(args,false);
					this.commands.push(new hxl8_commands_L8CmdStoreNotification(app1,rgb7,superLED,enable4));
					break;
				case "text":
					var rgb8 = this.consumeArgColor(args,"F00");
					var text = args.shift();
					if(text == null) continue;
					var speed1 = this.consumeArgInt(args,0);
					var loop1 = this.consumeArgBool(args,true);
					this.commands.push(new hxl8_commands_L8CmdSetText(speed1,loop1,rgb8,text));
					break;
				case "uid":
					this.commands.push(new hxl8_commands_L8CmdQueryMCUID());
					break;
				case "version":case "versions":case "ver":case "v":
					this.commands.push(new hxl8_commands_L8CmdQueryVersions());
					break;
				case "hex":
					outputter.setHex(true);
					break;
				case "csv":
					outputter.setCSV(true);
					break;
				case "csvheader":case "csvhead":
					outputter.setCSVHeader(true);
					break;
				case "delay":
					this.delay = this.consumeArgInt(args,100);
					break;
				default:
					continue;
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(this.commands.length <= 0) return;
		var _g1 = 0;
		var _g11 = this.commands;
		while(_g1 < _g11.length) {
			var command1 = _g11[_g1];
			++_g1;
			if(command1.hasResponse()) {
				this.needResponse = true;
				break;
			}
		}
	}
	,argIsCommand: function(arg) {
		var lowerCase = arg.toLowerCase();
		var _g = 0;
		var _g1 = hxl8_L8CmdParser.m_commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			if(command == lowerCase) return true;
		}
		return false;
	}
	,consumeArgColor: function(args,defaultRGB) {
		if(args.length <= 0) return new hxl8_L8RGB(defaultRGB);
		var rawVal = args.shift();
		if(this.argIsCommand(rawVal)) {
			args.unshift(rawVal);
			return new hxl8_L8RGB(defaultRGB);
		}
		var r = new EReg("^[0-9a-fA-F]+$","");
		if(!r.match(rawVal)) {
			args.unshift(rawVal);
			return new hxl8_L8RGB(defaultRGB);
		}
		if(rawVal.length != 3 && rawVal.length != 6) {
			args.unshift(rawVal);
			return new hxl8_L8RGB(defaultRGB);
		}
		return new hxl8_L8RGB(rawVal);
	}
	,consumeArgColorArray: function(args,defaultRGB) {
		var result = [];
		var rgb;
		if(args.length >= 0) {
			var values = args.shift();
			if(this.argIsCommand(values)) {
				args.unshift(values);
				values = defaultRGB;
			}
			var r = new EReg("^[0-9a-fA-F]+$","");
			if(!r.match(values)) {
				args.unshift(values);
				values = defaultRGB;
			}
			if(values.length == 192) {
				var _g = 0;
				while(_g < 64) {
					var index = _g++;
					rgb = new hxl8_L8RGB(HxOverrides.substr(values,index * 3,3));
					result.push(rgb);
				}
				return result;
			}
			if(values.length == 384) {
				var _g1 = 0;
				while(_g1 < 64) {
					var index1 = _g1++;
					rgb = new hxl8_L8RGB(HxOverrides.substr(values,index1 * 6,6));
					result.push(rgb);
				}
				return result;
			}
			if(values.length < 192) {
				var count = values.length / 3 | 0;
				var _g2 = 0;
				while(_g2 < 64) {
					var index2 = _g2++;
					rgb = new hxl8_L8RGB(HxOverrides.substr(values,index2 % count * 3,3));
					result.push(rgb);
				}
				return result;
			}
		}
		var _g3 = 0;
		while(_g3 < 64) {
			var index3 = _g3++;
			result.push(new hxl8_L8RGB(defaultRGB));
		}
		return result;
	}
	,consumeArgInt: function(args,defaultValue) {
		if(args.length <= 0) return defaultValue;
		var rawVal = args.shift();
		if(this.argIsCommand(rawVal)) {
			args.unshift(rawVal);
			return defaultValue;
		}
		var r = new EReg("^[0-9]+$","");
		if(!r.match(rawVal)) {
			args.unshift(rawVal);
			return defaultValue;
		}
		return Std.parseInt(rawVal);
	}
	,consumeArgBool: function(args,defaultValue) {
		if(args.length <= 0) return defaultValue;
		var rawVal = args.shift();
		if(this.argIsCommand(rawVal)) {
			args.unshift(rawVal);
			return defaultValue;
		}
		var value = rawVal.toLowerCase();
		switch(value) {
		case "true":case "1":case "yes":case "on":
			return true;
		case "false":case "0":case "no":case "off":
			return false;
		}
		args.unshift(rawVal);
		return defaultValue;
	}
	,__class__: hxl8_L8CmdParser
};
var hxl8_L8CmdQueueSender = function(serial,commandList,responseHandler) {
	this.serial = serial;
	this.commands = commandList.getCommands();
	this.delay = commandList.getDelay();
	this.responseHandler = responseHandler;
};
hxl8_L8CmdQueueSender.__name__ = true;
hxl8_L8CmdQueueSender.prototype = {
	start: function() {
		this.sendNext();
	}
	,setFinishCallback: function(finishCallback) {
		this.finishCallback = finishCallback;
	}
	,sendNext: function() {
		if(this.commands.length <= 0) {
			this.finish();
			return;
		}
		var command = this.commands.shift();
		command.send(this.serial);
		if(command.hasResponse()) this.responseHandler.expected++;
		if(this.commands.length <= 0) {
			this.finish();
			return;
		}
		js_Node.setTimeout($bind(this,this.sendNext),this.delay);
	}
	,finish: function() {
		if(this.finishCallback != null) this.finishCallback();
	}
	,__class__: hxl8_L8CmdQueueSender
};
var hxl8_L8CmdRepeatingQueueSender = function(serial,commandList,responseHandler) {
	hxl8_L8CmdQueueSender.call(this,serial,commandList,responseHandler);
	this.delay = commandList.getRepeatDelay();
	this.repeatForever = commandList.isRepeatForever();
	this.repeatsCount = commandList.getRepeatCount();
};
hxl8_L8CmdRepeatingQueueSender.__name__ = true;
hxl8_L8CmdRepeatingQueueSender.__super__ = hxl8_L8CmdQueueSender;
hxl8_L8CmdRepeatingQueueSender.prototype = $extend(hxl8_L8CmdQueueSender.prototype,{
	start: function() {
		this.currentIndex = 0;
		hxl8_L8CmdQueueSender.prototype.start.call(this);
	}
	,sendNext: function() {
		if(this.commands.length <= 0) {
			this.finish();
			return;
		}
		var command = this.commands[this.currentIndex];
		command.send(this.serial);
		if(command.hasResponse()) this.responseHandler.expected++;
		this.currentIndex++;
		if(this.currentIndex >= this.commands.length) {
			this.currentIndex = 0;
			this.repeatsCount--;
		}
		if(!this.repeatForever) {
			if(this.repeatsCount <= 0) {
				this.finish();
				return;
			}
		}
		js_Node.setTimeout($bind(this,this.sendNext),this.delay);
	}
	,__class__: hxl8_L8CmdRepeatingQueueSender
});
var hxl8_L8NodeSrv = function(tcpPort,serialPort) {
	this.tcpPort = tcpPort;
	this.serialPort = serialPort;
	this.server = js_Node.require("http").createServer($bind(this,this.handleRequest));
	this.server.listen(this.tcpPort,"0.0.0.0");
};
hxl8_L8NodeSrv.__name__ = true;
hxl8_L8NodeSrv.main = function() {
	var tcpPort = 1818;
	var serialPort = null;
	var args = Sys.args();
	if(args.length > 2) tcpPort = Std.parseInt(args[2]);
	if(args.length > 3) serialPort = args[3];
	var srv = new hxl8_L8NodeSrv(tcpPort,serialPort);
};
hxl8_L8NodeSrv.prototype = {
	handleRequest: function(req,res) {
		var _g = this;
		var urlParts = js_Node.require("url").parse(req.url,true);
		var rawArgs = urlParts.pathname.split("/");
		var args = [];
		var _g1 = 0;
		while(_g1 < rawArgs.length) {
			var arg = rawArgs[_g1];
			++_g1;
			args.push(js_Node.require("querystring").unescape(arg));
		}
		if(args.length > 0) {
			if(args[0] == "") args.shift();
		}
		var responseHandler = new hxl8_L8ResponseHandler();
		var parser = new hxl8_L8CmdParser(args,this.serialPort,responseHandler);
		if(!parser.hasCommands()) {
			this.showCommandPage(res,parser.getComPort());
			return;
		}
		res.setHeader("Content-Type","text/plain");
		res.writeHead(200);
		hxl8_nodejs_Serial.getDeviceList(function(comPorts) {
			_g.checkComPortsAndRun(res,parser,responseHandler,comPorts);
		});
	}
	,checkComPortsAndRun: function(res,parser,responseHandler,comPorts) {
		var _g = this;
		var found = false;
		var requestedComPort = parser.getComPort();
		var $it0 = comPorts.keys();
		while( $it0.hasNext() ) {
			var comPort = $it0.next();
			if(comPort == requestedComPort) {
				found = true;
				break;
			}
		}
		found = true;
		if(!found) {
			this.showComPorts(res,requestedComPort,comPorts);
			return;
		}
		var serial = null;
		try {
			serial = new hxl8_nodejs_Serial(requestedComPort,9600,true,function(err) {
				if(err != null) _g.showComPorts(res,requestedComPort,comPorts,err);
			});
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			res.end(Std.string(e));
			return;
		}
		serial.setOpenHandler(function() {
			try {
				_g.handleCommands(serial,parser,res,responseHandler);
			} catch( e1 ) {
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				res.end(Std.string(e1));
			}
		});
		var output = [];
		var lines;
		serial.setDataHandler(function(data) {
			lines = _g.handleResponse(haxe_io_Bytes.ofData(data),responseHandler);
			var _g1 = 0;
			while(_g1 < lines.length) {
				var line = lines[_g1];
				++_g1;
				output.push(line);
			}
			if(responseHandler.isFinished()) {
				res.end(output.join("\n"));
				js_Node.setTimeout(function() {
					serial.close();
				},10);
			}
		});
	}
	,handleResponse: function(data,responseHandler) {
		var response = hxl8_L8ReceiverBase.processCommand(data.sub(3,data.length - 4));
		return responseHandler.handleResponse(response);
	}
	,handleCommands: function(serial,parser,res,responseHandler) {
		if(serial == null) return;
		var sender;
		if(parser.isRepeat()) sender = new hxl8_L8CmdRepeatingQueueSender(serial,parser,responseHandler); else sender = new hxl8_L8CmdQueueSender(serial,parser,responseHandler);
		sender.setFinishCallback(function() {
			responseHandler.sendFinished = true;
		});
		sender.start();
	}
	,showCommandPage: function(res,comPort) {
		res.setHeader("Content-Type","text/html");
		res.writeHead(200);
		var index = haxe_Resource.getString("indexCommands.html");
		var template = new haxe_Template(index);
		var context = { port : this.tcpPort, serialPort : comPort};
		res.end(template.execute(context));
	}
	,showComPorts: function(res,requestedPort,comPorts,err) {
		var buf_b = "";
		if(err != null) {
			if(err == null) buf_b += "null"; else buf_b += "" + err;
			buf_b += "\n\n";
		}
		if(requestedPort == null) buf_b += "null"; else buf_b += "" + requestedPort;
		buf_b += " not available\n\n";
		buf_b += "Available serial ports:\n";
		var $it0 = comPorts.keys();
		while( $it0.hasNext() ) {
			var comPort = $it0.next();
			var name;
			name = __map_reserved[comPort] != null?comPorts.getReserved(comPort):comPorts.h[comPort];
			if(comPort == null) buf_b += "null"; else buf_b += "" + comPort;
			buf_b += " - ";
			if(name == null) buf_b += "null"; else buf_b += "" + name;
			buf_b += "\n";
		}
		res.end(buf_b);
	}
	,__class__: hxl8_L8NodeSrv
};
var hxl8_L8RGB = function(rgb,r,g,b) {
	this.m_r = 0;
	this.m_g = 0;
	this.m_b = 0;
	if(rgb == null) {
		this.m_r = r;
		this.m_g = g;
		this.m_b = b;
		return;
	}
	if(rgb.length == 3) {
		this.m_r = this.parseDigit(rgb.charAt(0));
		this.m_g = this.parseDigit(rgb.charAt(1));
		this.m_b = this.parseDigit(rgb.charAt(2));
	}
	if(rgb.length == 6) {
		this.m_r = this.parseDigit(rgb.charAt(0));
		this.m_g = this.parseDigit(rgb.charAt(2));
		this.m_b = this.parseDigit(rgb.charAt(4));
	}
};
hxl8_L8RGB.__name__ = true;
hxl8_L8RGB.prototype = {
	getR: function() {
		return this.m_r;
	}
	,getG: function() {
		return this.m_g;
	}
	,getB: function() {
		return this.m_b;
	}
	,parseDigit: function(digit) {
		switch(digit) {
		case "0":
			return 0;
		case "1":
			return 1;
		case "2":
			return 2;
		case "3":
			return 3;
		case "4":
			return 4;
		case "5":
			return 5;
		case "6":
			return 6;
		case "7":
			return 7;
		case "8":
			return 8;
		case "9":
			return 9;
		case "a":case "A":
			return 10;
		case "b":case "B":
			return 11;
		case "c":case "C":
			return 12;
		case "d":case "D":
			return 13;
		case "e":case "E":
			return 14;
		case "f":case "F":
			return 15;
		default:
			return 0;
		}
	}
	,toString: function() {
		return StringTools.hex(this.m_r,1) + StringTools.hex(this.m_g,1) + StringTools.hex(this.m_b,1);
	}
	,__class__: hxl8_L8RGB
};
var hxl8_L8ReceiverBase = function(serial) {
	this.serial = serial;
};
hxl8_L8ReceiverBase.__name__ = true;
hxl8_L8ReceiverBase.processCommand = function(data) {
	var response = null;
	var _g = data.b[0];
	switch(_g) {
	case 0:
		response = new hxl8_responses_L8ResponseOK();
		break;
	case 2:
		response = new hxl8_responses_L8ResponsePong();
		break;
	case 71:
		response = new hxl8_responses_L8ResponseVoltage();
		break;
	case 73:
		response = new hxl8_responses_L8ResponseTemperature();
		break;
	case 77:
		response = new hxl8_responses_L8ResponseAccelerator();
		break;
	case 79:
		response = new hxl8_responses_L8ResponseUID();
		break;
	case 81:
		response = new hxl8_responses_L8ResponseAmbientLight();
		break;
	case 83:
		response = new hxl8_responses_L8ResponseProximity();
		break;
	case 97:
		response = new hxl8_responses_L8ResponseVersions();
		break;
	case 99:
		response = new hxl8_responses_L8ResponseButton();
		break;
	case 101:
		response = new hxl8_responses_L8ResponseNoise();
		break;
	case 103:
		response = new hxl8_responses_L8ResponseVBUS();
		break;
	case 105:
		response = new hxl8_responses_L8ResponseMCUTemp();
		break;
	case 107:
		response = new hxl8_responses_L8ResponseStoreL8y();
		break;
	case 109:
		response = new hxl8_responses_L8ResponseFrameGrab();
		break;
	case 113:
		response = new hxl8_responses_L8ResponseStoreFrame();
		break;
	case 115:
		response = new hxl8_responses_L8ResponseFrameGrab();
		break;
	case 118:
		response = new hxl8_responses_L8ResponseBatchG();
		break;
	case 120:
		response = new hxl8_responses_L8ResponseStoreAnim();
		break;
	case 122:
		response = new hxl8_responses_L8ResponseReadAnim();
		break;
	case 132:
		response = new hxl8_responses_L8ResponseTraceMsg();
		break;
	case 139:
		response = new hxl8_responses_L8ResponseOrientation();
		break;
	case 141:
		response = new hxl8_responses_L8ResponseNumL8ies();
		break;
	case 143:
		response = new hxl8_responses_L8ResponseNumAnims();
		break;
	case 145:
		response = new hxl8_responses_L8ResponseNumFrames();
		break;
	case 148:
		response = new hxl8_responses_L8ResponseNotifyApp();
		break;
	case 150:
		response = new hxl8_responses_L8ResponseNumNotifyApps();
		break;
	case 156:
		response = new hxl8_responses_L8ResponseFrameGrab();
		break;
	case 163:
		response = new hxl8_responses_L8ResponseSensorThresholds();
		break;
	case 167:
		response = new hxl8_responses_L8ResponseNotificationSilence();
		break;
	case 255:
		response = new hxl8_responses_L8ResponseErr();
		break;
	default:
		return null;
	}
	response.parseData(data);
	return response;
};
hxl8_L8ReceiverBase.prototype = {
	shallClose: function() {
		return false;
	}
	,closing: function() {
	}
	,handleResponse: function(response) {
		if(response == null) return;
		response.print(hxl8_responses_PrintFormat.TEXT);
	}
	,__class__: hxl8_L8ReceiverBase
};
var hxl8_L8ResponseHandler = function() {
	this.silent = false;
	this.hex = false;
	this.csv = false;
	this.csvHeader = false;
	this.handled = 0;
	this.expected = 0;
	this.sendFinished = false;
};
hxl8_L8ResponseHandler.__name__ = true;
hxl8_L8ResponseHandler.__interfaces__ = [hxl8_IResponseOutput];
hxl8_L8ResponseHandler.prototype = {
	setSilent: function(silent) {
		this.silent = silent;
	}
	,setHex: function(hex) {
		this.hex = hex;
		if(hex) {
			this.csv = false;
			this.csvHeader = false;
		}
	}
	,setCSV: function(csv) {
		this.csv = csv;
		if(csv) this.hex = false;
	}
	,setCSVHeader: function(csvHeader) {
		this.csvHeader = csvHeader;
		if(csvHeader) this.csv = true; else this.hex = false;
	}
	,isPending: function() {
		return this.expected > 0;
	}
	,isFinished: function() {
		return !this.isPending() && this.sendFinished;
	}
	,handleResponse: function(response) {
		this.handled++;
		this.expected--;
		if(response == null) return [];
		if(this.silent) return [];
		var format = hxl8_responses_PrintFormat.TEXT;
		if(this.hex) format = hxl8_responses_PrintFormat.HEX;
		if(this.csv) {
			if(this.csvHeader) format = hxl8_responses_PrintFormat.CSV_HEADER; else format = hxl8_responses_PrintFormat.CSV;
		}
		return response.print(format);
	}
	,__class__: hxl8_L8ResponseHandler
};
var hxl8_commands_L8CmdBase = function(cmd) {
	this.m_cmd = cmd;
};
hxl8_commands_L8CmdBase.__name__ = true;
hxl8_commands_L8CmdBase.prototype = {
	getBytes: function() {
		var buffer = new haxe_io_BytesBuffer();
		buffer.b.push(this.m_cmd);
		return buffer;
	}
	,send: function(serial) {
		if(serial == null) throw new js__$Boot_HaxeError(new hxl8_exceptions_L8SendException(1,"serial is null"));
		var bytesBuf = this.getBytes();
		var data = bytesBuf.getBytes();
		var toSendBuf = new haxe_io_BytesBuffer();
		toSendBuf.b.push(170);
		toSendBuf.b.push(85);
		toSendBuf.b.push(data.length);
		toSendBuf.addBytes(data,0,data.length);
		toSendBuf.addByte(hxl8_commands_L8CrcCalc.calcCRC(data));
		var sendBytes = toSendBuf.getBytes();
		var written = serial.writeBytes(sendBytes.b);
		if(written != sendBytes.length) throw new js__$Boot_HaxeError(new hxl8_exceptions_L8SendException(1,"length mismatch: " + written + " != " + sendBytes.length));
	}
	,hasResponse: function() {
		return true;
	}
	,__class__: hxl8_commands_L8CmdBase
};
var hxl8_commands_L8CmdAppRun = function() {
	hxl8_commands_L8CmdBase.call(this,129);
};
hxl8_commands_L8CmdAppRun.__name__ = true;
hxl8_commands_L8CmdAppRun.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdAppRun.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdAppRun
});
var hxl8_commands_L8CmdAppRunAmbient = function(matrixRGB,superRGB,threshold) {
	hxl8_commands_L8CmdAppRun.call(this);
	this.m_matrixRGB = matrixRGB;
	this.m_superRGB = superRGB;
	this.m_threshold = threshold;
	if(this.m_threshold < 0) this.m_threshold = 0;
	if(this.m_threshold > 100) this.m_threshold = 100;
};
hxl8_commands_L8CmdAppRunAmbient.__name__ = true;
hxl8_commands_L8CmdAppRunAmbient.__super__ = hxl8_commands_L8CmdAppRun;
hxl8_commands_L8CmdAppRunAmbient.prototype = $extend(hxl8_commands_L8CmdAppRun.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdAppRun.prototype.getBytes.call(this);
		buffer.b.push(3);
		buffer.addByte(this.m_matrixRGB.getB());
		buffer.addByte(this.m_matrixRGB.getG());
		buffer.addByte(this.m_matrixRGB.getR());
		buffer.addByte(this.m_superRGB.getB());
		buffer.addByte(this.m_superRGB.getG());
		buffer.addByte(this.m_superRGB.getR());
		buffer.b.push(this.m_threshold);
		buffer.b.push(1);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdAppRunAmbient
});
var hxl8_commands_L8CmdAppRunColorChanger = function(colors,speed,invertSuperLED) {
	hxl8_commands_L8CmdAppRun.call(this);
	var _g = colors.toLowerCase();
	switch(_g) {
	case "multicolor":case "multi":case "m":
		this.m_colors = 1;
		break;
	case "tropical":case "trop":case "t":
		this.m_colors = 2;
		break;
	case "galaxy":case "gala":case "g":
		this.m_colors = 3;
		break;
	case "aurora":case "aur":case "a":
		this.m_colors = 4;
		break;
	default:
		this.m_colors = 1;
	}
	this.m_speed = speed;
	this.m_invertSuperLED = invertSuperLED;
};
hxl8_commands_L8CmdAppRunColorChanger.__name__ = true;
hxl8_commands_L8CmdAppRunColorChanger.__super__ = hxl8_commands_L8CmdAppRun;
hxl8_commands_L8CmdAppRunColorChanger.prototype = $extend(hxl8_commands_L8CmdAppRun.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdAppRun.prototype.getBytes.call(this);
		buffer.b.push(2);
		buffer.b.push(this.m_colors);
		buffer.b.push(this.m_speed);
		if(this.m_invertSuperLED) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdAppRunColorChanger
});
var hxl8_commands_L8CmdAppRunDice = function(rgb) {
	hxl8_commands_L8CmdAppRun.call(this);
	this.m_rgb = rgb;
};
hxl8_commands_L8CmdAppRunDice.__name__ = true;
hxl8_commands_L8CmdAppRunDice.__super__ = hxl8_commands_L8CmdAppRun;
hxl8_commands_L8CmdAppRunDice.prototype = $extend(hxl8_commands_L8CmdAppRun.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdAppRun.prototype.getBytes.call(this);
		buffer.b.push(0);
		buffer.addByte(this.m_rgb.getB());
		buffer.addByte(this.m_rgb.getG());
		buffer.addByte(this.m_rgb.getR());
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdAppRunDice
});
var hxl8_commands_L8CmdAppRunParty = function() {
	hxl8_commands_L8CmdAppRun.call(this);
};
hxl8_commands_L8CmdAppRunParty.__name__ = true;
hxl8_commands_L8CmdAppRunParty.__super__ = hxl8_commands_L8CmdAppRun;
hxl8_commands_L8CmdAppRunParty.prototype = $extend(hxl8_commands_L8CmdAppRun.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdAppRun.prototype.getBytes.call(this);
		buffer.b.push(1);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdAppRunParty
});
var hxl8_commands_L8CmdAppRunProximity = function(matrixRGB,superRGB,threshold) {
	hxl8_commands_L8CmdAppRun.call(this);
	this.m_matrixRGB = matrixRGB;
	this.m_superRGB = superRGB;
	this.m_threshold = threshold;
	if(this.m_threshold < 0) this.m_threshold = 0;
	if(this.m_threshold > 100) this.m_threshold = 100;
};
hxl8_commands_L8CmdAppRunProximity.__name__ = true;
hxl8_commands_L8CmdAppRunProximity.__super__ = hxl8_commands_L8CmdAppRun;
hxl8_commands_L8CmdAppRunProximity.prototype = $extend(hxl8_commands_L8CmdAppRun.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdAppRun.prototype.getBytes.call(this);
		buffer.b.push(3);
		buffer.addByte(this.m_matrixRGB.getB());
		buffer.addByte(this.m_matrixRGB.getG());
		buffer.addByte(this.m_matrixRGB.getR());
		buffer.addByte(this.m_superRGB.getB());
		buffer.addByte(this.m_superRGB.getG());
		buffer.addByte(this.m_superRGB.getR());
		buffer.b.push(this.m_threshold);
		buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdAppRunProximity
});
var hxl8_commands_L8CmdAppStop = function() {
	hxl8_commands_L8CmdBase.call(this,130);
};
hxl8_commands_L8CmdAppStop.__name__ = true;
hxl8_commands_L8CmdAppStop.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdAppStop.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdAppStop
});
var hxl8_commands_L8CmdBootloader = function() {
	hxl8_commands_L8CmdBase.call(this,74);
};
hxl8_commands_L8CmdBootloader.__name__ = true;
hxl8_commands_L8CmdBootloader.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdBootloader.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	hasResponse: function() {
		return false;
	}
	,__class__: hxl8_commands_L8CmdBootloader
});
var hxl8_commands_L8CmdSetMatrixLEDArray = function(rgbs) {
	hxl8_commands_L8CmdBase.call(this,68);
	this.m_rgbs = rgbs;
};
hxl8_commands_L8CmdSetMatrixLEDArray.__name__ = true;
hxl8_commands_L8CmdSetMatrixLEDArray.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetMatrixLEDArray.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		var _g = 0;
		var _g1 = this.m_rgbs;
		while(_g < _g1.length) {
			var rgb = _g1[_g];
			++_g;
			buffer.addByte(rgb.getB() & 15);
			buffer.addByte(rgb.getG() << 4 & 240 | rgb.getR() & 15);
		}
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdSetMatrixLEDArray
});
var hxl8_commands_L8CmdBox = function(left,top,right,bottom,border,fill,outer) {
	var rgbs = [];
	var temp;
	if(left > right) {
		temp = left;
		left = right;
		right = temp;
	}
	if(top > bottom) {
		temp = bottom;
		bottom = top;
		top = temp;
	}
	var _g = 0;
	while(_g < 64) {
		var index = _g++;
		var row = index / 8 | 0;
		var col = index % 8;
		if(row == top || row == bottom) {
			if(col >= left && col <= right) {
				rgbs.push(border);
				continue;
			}
		}
		if(row > top && row < bottom) {
			if(col == left || col == right) {
				rgbs.push(border);
				continue;
			}
			if(col > left && col < right) {
				rgbs.push(fill);
				continue;
			}
		}
		rgbs.push(outer);
	}
	hxl8_commands_L8CmdSetMatrixLEDArray.call(this,rgbs);
};
hxl8_commands_L8CmdBox.__name__ = true;
hxl8_commands_L8CmdBox.__super__ = hxl8_commands_L8CmdSetMatrixLEDArray;
hxl8_commands_L8CmdBox.prototype = $extend(hxl8_commands_L8CmdSetMatrixLEDArray.prototype,{
	__class__: hxl8_commands_L8CmdBox
});
var hxl8_commands_L8CmdDeleteAnim = function(anim) {
	hxl8_commands_L8CmdBase.call(this,123);
	this.m_anim = anim;
};
hxl8_commands_L8CmdDeleteAnim.__name__ = true;
hxl8_commands_L8CmdDeleteAnim.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdDeleteAnim.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_anim);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdDeleteAnim
});
var hxl8_commands_L8CmdDeleteFrame = function(frame) {
	hxl8_commands_L8CmdBase.call(this,116);
	this.m_frame = frame;
};
hxl8_commands_L8CmdDeleteFrame.__name__ = true;
hxl8_commands_L8CmdDeleteFrame.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdDeleteFrame.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_frame);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdDeleteFrame
});
var hxl8_commands_L8CmdDeleteL8y = function(l8y) {
	hxl8_commands_L8CmdBase.call(this,111);
	this.m_l8y = l8y;
};
hxl8_commands_L8CmdDeleteL8y.__name__ = true;
hxl8_commands_L8CmdDeleteL8y.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdDeleteL8y.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_l8y);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdDeleteL8y
});
var hxl8_commands_L8CmdDeleteUserMemory = function() {
	hxl8_commands_L8CmdBase.call(this,126);
};
hxl8_commands_L8CmdDeleteUserMemory.__name__ = true;
hxl8_commands_L8CmdDeleteUserMemory.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdDeleteUserMemory.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdDeleteUserMemory
});
var hxl8_commands_L8CmdDisplayChar = function($char,orient,offset) {
	hxl8_commands_L8CmdBase.call(this,127);
	this.m_char = HxOverrides.substr($char,0,1);
	if(this.m_char.length <= 0) this.m_char = "X";
	var direction;
	var _g = orient.toLowerCase();
	switch(_g) {
	case "left":
		direction = 0;
		break;
	case "right":
		direction = 1;
		break;
	case "up":
		direction = 2;
		break;
	case "down":
		direction = 3;
		break;
	default:
		direction = 2;
	}
	this.m_shift = (direction & 3) << 6 | offset & 15;
};
hxl8_commands_L8CmdDisplayChar.__name__ = true;
hxl8_commands_L8CmdDisplayChar.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdDisplayChar.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.addByte(HxOverrides.cca(this.m_char,0));
		buffer.b.push(this.m_shift);
		return buffer;
	}
	,hasResponse: function() {
		return false;
	}
	,__class__: hxl8_commands_L8CmdDisplayChar
});
var hxl8_commands_L8CmdEnableAllNotifications = function(all) {
	hxl8_commands_L8CmdBase.call(this,164);
	this.m_all = all;
};
hxl8_commands_L8CmdEnableAllNotifications.__name__ = true;
hxl8_commands_L8CmdEnableAllNotifications.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdEnableAllNotifications.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		if(this.m_all) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdEnableAllNotifications
});
var hxl8_commands_L8CmdEnableAutoRotate = function(enable) {
	hxl8_commands_L8CmdBase.call(this,134);
	this.m_enable = enable;
};
hxl8_commands_L8CmdEnableAutoRotate.__name__ = true;
hxl8_commands_L8CmdEnableAutoRotate.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdEnableAutoRotate.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		if(this.m_enable) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdEnableAutoRotate
});
var hxl8_commands_L8CmdEnableNotification = function(index,enable) {
	hxl8_commands_L8CmdBase.call(this,151);
	this.m_index = index;
	this.m_enable = enable;
};
hxl8_commands_L8CmdEnableNotification.__name__ = true;
hxl8_commands_L8CmdEnableNotification.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdEnableNotification.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_index);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdEnableNotification
});
var hxl8_commands_L8CmdEnableStatusLEDs = function(enable) {
	hxl8_commands_L8CmdBase.call(this,158);
	this.m_enable = enable;
};
hxl8_commands_L8CmdEnableStatusLEDs.__name__ = true;
hxl8_commands_L8CmdEnableStatusLEDs.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdEnableStatusLEDs.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		if(this.m_enable) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdEnableStatusLEDs
});
var hxl8_commands_L8CmdGetCurrentMatrix = function() {
	hxl8_commands_L8CmdBase.call(this,155);
};
hxl8_commands_L8CmdGetCurrentMatrix.__name__ = true;
hxl8_commands_L8CmdGetCurrentMatrix.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdGetCurrentMatrix.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdGetCurrentMatrix
});
var hxl8_commands_L8CmdGetNotifyApp = function(index,extended) {
	hxl8_commands_L8CmdBase.call(this,147);
	this.m_index = index;
	this.m_extended = extended;
};
hxl8_commands_L8CmdGetNotifyApp.__name__ = true;
hxl8_commands_L8CmdGetNotifyApp.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdGetNotifyApp.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_index);
		if(this.m_extended) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdGetNotifyApp
});
var hxl8_commands_L8CmdGetNumNotifyApps = function() {
	hxl8_commands_L8CmdBase.call(this,149);
};
hxl8_commands_L8CmdGetNumNotifyApps.__name__ = true;
hxl8_commands_L8CmdGetNumNotifyApps.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdGetNumNotifyApps.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdGetNumNotifyApps
});
var hxl8_commands_L8CmdMatrixOff = function() {
	hxl8_commands_L8CmdBase.call(this,69);
};
hxl8_commands_L8CmdMatrixOff.__name__ = true;
hxl8_commands_L8CmdMatrixOff.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdMatrixOff.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdMatrixOff
});
var hxl8_commands_L8CmdPlayAnim = function(anim,loop) {
	hxl8_commands_L8CmdBase.call(this,124);
	this.m_anim = anim;
	this.m_loop = loop;
};
hxl8_commands_L8CmdPlayAnim.__name__ = true;
hxl8_commands_L8CmdPlayAnim.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdPlayAnim.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_anim);
		if(this.m_loop) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,hasResponse: function() {
		return false;
	}
	,__class__: hxl8_commands_L8CmdPlayAnim
});
var hxl8_commands_L8CmdPowerOff = function() {
	hxl8_commands_L8CmdBase.call(this,157);
};
hxl8_commands_L8CmdPowerOff.__name__ = true;
hxl8_commands_L8CmdPowerOff.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdPowerOff.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	hasResponse: function() {
		return false;
	}
	,__class__: hxl8_commands_L8CmdPowerOff
});
var hxl8_commands_L8CmdQueryAcc = function() {
	hxl8_commands_L8CmdBase.call(this,76);
};
hxl8_commands_L8CmdQueryAcc.__name__ = true;
hxl8_commands_L8CmdQueryAcc.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryAcc.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryAcc
});
var hxl8_commands_L8CmdQueryAmbientLight = function() {
	hxl8_commands_L8CmdBase.call(this,80);
};
hxl8_commands_L8CmdQueryAmbientLight.__name__ = true;
hxl8_commands_L8CmdQueryAmbientLight.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryAmbientLight.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryAmbientLight
});
var hxl8_commands_L8CmdQueryBatChg = function() {
	hxl8_commands_L8CmdBase.call(this,117);
};
hxl8_commands_L8CmdQueryBatChg.__name__ = true;
hxl8_commands_L8CmdQueryBatChg.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryBatChg.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryBatChg
});
var hxl8_commands_L8CmdQueryButton = function() {
	hxl8_commands_L8CmdBase.call(this,98);
};
hxl8_commands_L8CmdQueryButton.__name__ = true;
hxl8_commands_L8CmdQueryButton.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryButton.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryButton
});
var hxl8_commands_L8CmdQueryInitStatus = function() {
	hxl8_commands_L8CmdBase.call(this,133);
};
hxl8_commands_L8CmdQueryInitStatus.__name__ = true;
hxl8_commands_L8CmdQueryInitStatus.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryInitStatus.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryInitStatus
});
var hxl8_commands_L8CmdQueryMCUID = function() {
	hxl8_commands_L8CmdBase.call(this,78);
};
hxl8_commands_L8CmdQueryMCUID.__name__ = true;
hxl8_commands_L8CmdQueryMCUID.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryMCUID.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryMCUID
});
var hxl8_commands_L8CmdQueryMCUTemp = function() {
	hxl8_commands_L8CmdBase.call(this,104);
};
hxl8_commands_L8CmdQueryMCUTemp.__name__ = true;
hxl8_commands_L8CmdQueryMCUTemp.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryMCUTemp.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryMCUTemp
});
var hxl8_commands_L8CmdQueryNoise = function() {
	hxl8_commands_L8CmdBase.call(this,100);
};
hxl8_commands_L8CmdQueryNoise.__name__ = true;
hxl8_commands_L8CmdQueryNoise.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryNoise.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryNoise
});
var hxl8_commands_L8CmdQueryNotificationsSilent = function() {
	hxl8_commands_L8CmdBase.call(this,166);
};
hxl8_commands_L8CmdQueryNotificationsSilent.__name__ = true;
hxl8_commands_L8CmdQueryNotificationsSilent.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryNotificationsSilent.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryNotificationsSilent
});
var hxl8_commands_L8CmdQueryNumAnims = function() {
	hxl8_commands_L8CmdBase.call(this,142);
};
hxl8_commands_L8CmdQueryNumAnims.__name__ = true;
hxl8_commands_L8CmdQueryNumAnims.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryNumAnims.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryNumAnims
});
var hxl8_commands_L8CmdQueryNumFrames = function() {
	hxl8_commands_L8CmdBase.call(this,144);
};
hxl8_commands_L8CmdQueryNumFrames.__name__ = true;
hxl8_commands_L8CmdQueryNumFrames.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryNumFrames.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryNumFrames
});
var hxl8_commands_L8CmdQueryNumL8ies = function() {
	hxl8_commands_L8CmdBase.call(this,140);
};
hxl8_commands_L8CmdQueryNumL8ies.__name__ = true;
hxl8_commands_L8CmdQueryNumL8ies.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryNumL8ies.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryNumL8ies
});
var hxl8_commands_L8CmdQueryProximity = function() {
	hxl8_commands_L8CmdBase.call(this,82);
};
hxl8_commands_L8CmdQueryProximity.__name__ = true;
hxl8_commands_L8CmdQueryProximity.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryProximity.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryProximity
});
var hxl8_commands_L8CmdQuerySensorThresholds = function() {
	hxl8_commands_L8CmdBase.call(this,162);
};
hxl8_commands_L8CmdQuerySensorThresholds.__name__ = true;
hxl8_commands_L8CmdQuerySensorThresholds.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQuerySensorThresholds.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQuerySensorThresholds
});
var hxl8_commands_L8CmdQueryTemp = function() {
	hxl8_commands_L8CmdBase.call(this,72);
};
hxl8_commands_L8CmdQueryTemp.__name__ = true;
hxl8_commands_L8CmdQueryTemp.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryTemp.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryTemp
});
var hxl8_commands_L8CmdQueryVBUSVoltage = function() {
	hxl8_commands_L8CmdBase.call(this,102);
};
hxl8_commands_L8CmdQueryVBUSVoltage.__name__ = true;
hxl8_commands_L8CmdQueryVBUSVoltage.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryVBUSVoltage.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryVBUSVoltage
});
var hxl8_commands_L8CmdQueryVersions = function() {
	hxl8_commands_L8CmdBase.call(this,96);
};
hxl8_commands_L8CmdQueryVersions.__name__ = true;
hxl8_commands_L8CmdQueryVersions.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryVersions.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryVersions
});
var hxl8_commands_L8CmdQueryVoltage = function() {
	hxl8_commands_L8CmdBase.call(this,70);
};
hxl8_commands_L8CmdQueryVoltage.__name__ = true;
hxl8_commands_L8CmdQueryVoltage.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdQueryVoltage.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdQueryVoltage
});
var hxl8_commands_L8CmdReadAnim = function(anim) {
	hxl8_commands_L8CmdBase.call(this,121);
	this.m_anim = anim;
};
hxl8_commands_L8CmdReadAnim.__name__ = true;
hxl8_commands_L8CmdReadAnim.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdReadAnim.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_anim);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdReadAnim
});
var hxl8_commands_L8CmdReadFrame = function(frame) {
	hxl8_commands_L8CmdBase.call(this,114);
	this.m_frame = frame;
};
hxl8_commands_L8CmdReadFrame.__name__ = true;
hxl8_commands_L8CmdReadFrame.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdReadFrame.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_frame);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdReadFrame
});
var hxl8_commands_L8CmdReadL8y = function(l8y) {
	hxl8_commands_L8CmdBase.call(this,108);
	this.m_l8y = l8y;
};
hxl8_commands_L8CmdReadL8y.__name__ = true;
hxl8_commands_L8CmdReadL8y.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdReadL8y.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_l8y);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdReadL8y
});
var hxl8_commands_L8CmdReset = function() {
	hxl8_commands_L8CmdBase.call(this,6);
};
hxl8_commands_L8CmdReset.__name__ = true;
hxl8_commands_L8CmdReset.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdReset.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	hasResponse: function() {
		return false;
	}
	,__class__: hxl8_commands_L8CmdReset
});
var hxl8_commands_L8CmdSendPing = function() {
	hxl8_commands_L8CmdBase.call(this,1);
};
hxl8_commands_L8CmdSendPing.__name__ = true;
hxl8_commands_L8CmdSendPing.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSendPing.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	__class__: hxl8_commands_L8CmdSendPing
});
var hxl8_commands_L8CmdSetThresholdBase = function(cmd,min,max) {
	hxl8_commands_L8CmdBase.call(this,cmd);
	this.m_min = min;
	this.m_max = max;
};
hxl8_commands_L8CmdSetThresholdBase.__name__ = true;
hxl8_commands_L8CmdSetThresholdBase.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetThresholdBase.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_min >> 8 & 255);
		buffer.b.push(this.m_min & 255);
		buffer.b.push(this.m_max >> 8 & 255);
		buffer.b.push(this.m_max & 255);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdSetThresholdBase
});
var hxl8_commands_L8CmdSetAmbThreshold = function(min,max) {
	hxl8_commands_L8CmdSetThresholdBase.call(this,161,min,max);
};
hxl8_commands_L8CmdSetAmbThreshold.__name__ = true;
hxl8_commands_L8CmdSetAmbThreshold.__super__ = hxl8_commands_L8CmdSetThresholdBase;
hxl8_commands_L8CmdSetAmbThreshold.prototype = $extend(hxl8_commands_L8CmdSetThresholdBase.prototype,{
	__class__: hxl8_commands_L8CmdSetAmbThreshold
});
var hxl8_commands_L8CmdSetBrightness = function(brightness) {
	hxl8_commands_L8CmdBase.call(this,154);
	this.m_brightness = brightness;
};
hxl8_commands_L8CmdSetBrightness.__name__ = true;
hxl8_commands_L8CmdSetBrightness.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetBrightness.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		if(this.m_brightness) buffer.b.push(0); else buffer.b.push(1);
		return buffer;
	}
	,hasResponse: function() {
		return false;
	}
	,__class__: hxl8_commands_L8CmdSetBrightness
});
var hxl8_commands_L8CmdSetLED = function(x,y,rgb) {
	hxl8_commands_L8CmdBase.call(this,67);
	this.m_x = x;
	this.m_y = y;
	this.m_rgb = rgb;
};
hxl8_commands_L8CmdSetLED.__name__ = true;
hxl8_commands_L8CmdSetLED.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetLED.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_x);
		buffer.b.push(this.m_y);
		buffer.addByte(this.m_rgb.getB() & 15);
		buffer.addByte(this.m_rgb.getG() & 15);
		buffer.addByte(this.m_rgb.getR() & 15);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdSetLED
});
var hxl8_commands_L8CmdSetMatrixLEDUni = function(rgb) {
	hxl8_commands_L8CmdBase.call(this,68);
	this.m_rgb = rgb;
};
hxl8_commands_L8CmdSetMatrixLEDUni.__name__ = true;
hxl8_commands_L8CmdSetMatrixLEDUni.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetMatrixLEDUni.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		var _g = 0;
		while(_g < 64) {
			var index = _g++;
			buffer.addByte(this.m_rgb.getB() & 15);
			buffer.addByte(this.m_rgb.getG() << 4 & 240 | this.m_rgb.getR() & 15);
		}
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdSetMatrixLEDUni
});
var hxl8_commands_L8CmdSetNoiseThreshold = function(min,max) {
	hxl8_commands_L8CmdSetThresholdBase.call(this,159,min,max);
};
hxl8_commands_L8CmdSetNoiseThreshold.__name__ = true;
hxl8_commands_L8CmdSetNoiseThreshold.__super__ = hxl8_commands_L8CmdSetThresholdBase;
hxl8_commands_L8CmdSetNoiseThreshold.prototype = $extend(hxl8_commands_L8CmdSetThresholdBase.prototype,{
	__class__: hxl8_commands_L8CmdSetNoiseThreshold
});
var hxl8_commands_L8CmdSetNotification = function(app,eventType,category) {
	hxl8_commands_L8CmdBase.call(this,153);
	this.m_app = HxOverrides.substr(app,0,32);
	this.m_category = category;
	var _g = this.m_category;
	switch(_g) {
	case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 255:
		break;
	default:
		this.m_category = 0;
	}
	var _g1 = eventType.toLowerCase();
	switch(_g1) {
	case "on":
		this.m_eventType = 0;
		break;
	case "mod":
		this.m_eventType = 1;
		break;
	case "off":
		this.m_app = "";
		this.m_eventType = 2;
		break;
	default:
		this.m_eventType = 0;
	}
};
hxl8_commands_L8CmdSetNotification.__name__ = true;
hxl8_commands_L8CmdSetNotification.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetNotification.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_app.length);
		if(this.m_app.length > 0) buffer.add(haxe_io_Bytes.ofString(this.m_app));
		buffer.b.push(this.m_eventType);
		buffer.b.push(this.m_category);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdSetNotification
});
var hxl8_commands_L8CmdSetNotificationsSilence = function(silence) {
	hxl8_commands_L8CmdBase.call(this,165);
	this.m_silence = silence;
};
hxl8_commands_L8CmdSetNotificationsSilence.__name__ = true;
hxl8_commands_L8CmdSetNotificationsSilence.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetNotificationsSilence.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		if(this.m_silence) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdSetNotificationsSilence
});
var hxl8_commands_L8CmdSetOrientation = function(orient) {
	hxl8_commands_L8CmdBase.call(this,128);
	var _g = orient.toLowerCase();
	switch(_g) {
	case "up":
		this.m_orient = 1;
		break;
	case "down":
		this.m_orient = 2;
		break;
	case "right":
		this.m_orient = 5;
		break;
	case "left":
		this.m_orient = 6;
		break;
	default:
		this.m_orient = 1;
	}
};
hxl8_commands_L8CmdSetOrientation.__name__ = true;
hxl8_commands_L8CmdSetOrientation.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetOrientation.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_orient);
		return buffer;
	}
	,hasResponse: function() {
		return false;
	}
	,__class__: hxl8_commands_L8CmdSetOrientation
});
var hxl8_commands_L8CmdSetProxThreshold = function(min,max) {
	hxl8_commands_L8CmdSetThresholdBase.call(this,160,min,max);
};
hxl8_commands_L8CmdSetProxThreshold.__name__ = true;
hxl8_commands_L8CmdSetProxThreshold.__super__ = hxl8_commands_L8CmdSetThresholdBase;
hxl8_commands_L8CmdSetProxThreshold.prototype = $extend(hxl8_commands_L8CmdSetThresholdBase.prototype,{
	__class__: hxl8_commands_L8CmdSetProxThreshold
});
var hxl8_commands_L8CmdSetStoredL8y = function(l8y) {
	hxl8_commands_L8CmdBase.call(this,110);
	this.m_l8y = l8y;
};
hxl8_commands_L8CmdSetStoredL8y.__name__ = true;
hxl8_commands_L8CmdSetStoredL8y.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetStoredL8y.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_l8y);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdSetStoredL8y
});
var hxl8_commands_L8CmdSetSuperLED = function(rgb) {
	hxl8_commands_L8CmdBase.call(this,75);
	this.m_rgb = rgb;
};
hxl8_commands_L8CmdSetSuperLED.__name__ = true;
hxl8_commands_L8CmdSetSuperLED.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetSuperLED.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.addByte(this.m_rgb.getB());
		buffer.addByte(this.m_rgb.getG());
		buffer.addByte(this.m_rgb.getR());
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdSetSuperLED
});
var hxl8_commands_L8CmdSetText = function(speed,loop,rgb,text) {
	hxl8_commands_L8CmdBase.call(this,131);
	switch(speed) {
	case 0:case 1:case 2:
		this.m_speed = speed;
		break;
	default:
		this.m_speed = 1;
	}
	this.m_loop = loop;
	this.m_rgb = rgb;
	this.m_text = HxOverrides.substr(text,0,18);
};
hxl8_commands_L8CmdSetText.__name__ = true;
hxl8_commands_L8CmdSetText.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdSetText.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		if(this.m_loop) buffer.b.push(1); else buffer.b.push(0);
		buffer.b.push(this.m_speed);
		buffer.addByte(this.m_rgb.getR());
		buffer.addByte(this.m_rgb.getG());
		buffer.addByte(this.m_rgb.getB());
		var _g1 = 0;
		var _g = this.m_text.length;
		while(_g1 < _g) {
			var index = _g1++;
			buffer.addByte(HxOverrides.cca(this.m_text,index));
		}
		return buffer;
	}
	,hasResponse: function() {
		return false;
	}
	,__class__: hxl8_commands_L8CmdSetText
});
var hxl8_commands_L8CmdStopAnim = function() {
	hxl8_commands_L8CmdBase.call(this,125);
};
hxl8_commands_L8CmdStopAnim.__name__ = true;
hxl8_commands_L8CmdStopAnim.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdStopAnim.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	hasResponse: function() {
		return false;
	}
	,__class__: hxl8_commands_L8CmdStopAnim
});
var hxl8_commands_L8CmdStoreAnim = function(anim) {
	hxl8_commands_L8CmdBase.call(this,119);
	var entries = anim.split(",");
	this.m_animSequence = [];
	if(entries.length <= 0) return;
	if(entries.length % 2 != 0) entries.pop();
	var _g = 0;
	while(_g < entries.length) {
		var entry = entries[_g];
		++_g;
		this.m_animSequence.push(Std.parseInt(entry));
	}
};
hxl8_commands_L8CmdStoreAnim.__name__ = true;
hxl8_commands_L8CmdStoreAnim.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdStoreAnim.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_animSequence.length / 2 | 0);
		var _g = 0;
		var _g1 = this.m_animSequence;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			buffer.b.push(item);
		}
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdStoreAnim
});
var hxl8_commands_L8CmdStoreFrame = function(rgbs) {
	hxl8_commands_L8CmdBase.call(this,112);
	this.m_rgbs = rgbs;
};
hxl8_commands_L8CmdStoreFrame.__name__ = true;
hxl8_commands_L8CmdStoreFrame.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdStoreFrame.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		var _g = 0;
		var _g1 = this.m_rgbs;
		while(_g < _g1.length) {
			var rgb = _g1[_g];
			++_g;
			buffer.addByte(rgb.getB() & 15);
			buffer.addByte(rgb.getG() << 4 & 240 | rgb.getR() & 15);
		}
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdStoreFrame
});
var hxl8_commands_L8CmdStoreL8y = function(rgbs) {
	hxl8_commands_L8CmdBase.call(this,106);
	this.m_rgbs = rgbs;
};
hxl8_commands_L8CmdStoreL8y.__name__ = true;
hxl8_commands_L8CmdStoreL8y.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdStoreL8y.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		var _g = 0;
		var _g1 = this.m_rgbs;
		while(_g < _g1.length) {
			var rgb = _g1[_g];
			++_g;
			buffer.addByte(rgb.getB() & 15);
			buffer.addByte(rgb.getG() << 4 & 240 | rgb.getR() & 15);
		}
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdStoreL8y
});
var hxl8_commands_L8CmdStoreNotification = function(app,rgbs,superLED,enable) {
	hxl8_commands_L8CmdBase.call(this,146);
	this.m_rgbs = rgbs;
	this.m_app = HxOverrides.substr(app,0,32);
	this.m_super = superLED;
	this.m_enabled = enable;
};
hxl8_commands_L8CmdStoreNotification.__name__ = true;
hxl8_commands_L8CmdStoreNotification.__super__ = hxl8_commands_L8CmdBase;
hxl8_commands_L8CmdStoreNotification.prototype = $extend(hxl8_commands_L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8_commands_L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_app.length);
		var _g1 = 0;
		var _g = this.m_app.length;
		while(_g1 < _g) {
			var index = _g1++;
			buffer.addByte(HxOverrides.cca(this.m_app,index));
		}
		var _g2 = 0;
		var _g11 = this.m_rgbs;
		while(_g2 < _g11.length) {
			var rgb = _g11[_g2];
			++_g2;
			buffer.addByte(rgb.getB() & 15);
			buffer.addByte(rgb.getG() << 4 & 240 | rgb.getR() & 15);
		}
		buffer.addByte(this.m_super.getB());
		buffer.addByte(this.m_super.getG());
		buffer.addByte(this.m_super.getR());
		if(this.m_enabled) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8_commands_L8CmdStoreNotification
});
var hxl8_commands_L8CrcCalc = function() { };
hxl8_commands_L8CrcCalc.__name__ = true;
hxl8_commands_L8CrcCalc.calcCRC = function(bytes) {
	if(bytes == null) return -1;
	if(hxl8_commands_L8CrcCalc.m_table == null) hxl8_commands_L8CrcCalc.makeTable();
	var crc = 0;
	var _g1 = 0;
	var _g = bytes.length;
	while(_g1 < _g) {
		var index = _g1++;
		var value = bytes.b[index];
		var tableIndex = crc ^ value;
		if(tableIndex > hxl8_commands_L8CrcCalc.m_table.length) return -1;
		crc = hxl8_commands_L8CrcCalc.m_table.b[tableIndex];
	}
	return crc;
};
hxl8_commands_L8CrcCalc.makeTable = function() {
	var buffer = new haxe_io_BytesBuffer();
	var _g = 0;
	while(_g < 256) {
		var index = _g++;
		var value = index;
		var _g1 = 0;
		while(_g1 < 8) {
			var index2 = _g1++;
			if((value & 128) != 0) value = value << 1 ^ 7; else value <<= 1;
		}
		buffer.b.push(value & 255);
	}
	hxl8_commands_L8CrcCalc.m_table = buffer.getBytes();
};
var hxl8_exceptions_L8Exception = function(code,message) {
	this.m_code = code;
	this.m_message = message;
};
hxl8_exceptions_L8Exception.__name__ = true;
hxl8_exceptions_L8Exception.prototype = {
	getCode: function() {
		return this.m_code;
	}
	,getMessage: function() {
		return this.m_message;
	}
	,toString: function() {
		return "[" + this.m_code + "] " + this.m_message;
	}
	,__class__: hxl8_exceptions_L8Exception
};
var hxl8_exceptions_L8SendException = function(code,message) {
	hxl8_exceptions_L8Exception.call(this,code,message);
};
hxl8_exceptions_L8SendException.__name__ = true;
hxl8_exceptions_L8SendException.__super__ = hxl8_exceptions_L8Exception;
hxl8_exceptions_L8SendException.prototype = $extend(hxl8_exceptions_L8Exception.prototype,{
	toString: function() {
		return "Send-Error [" + this.m_code + "] " + this.m_message;
	}
	,__class__: hxl8_exceptions_L8SendException
});
var hxl8_nodejs_Serial = function(portName,baud,setupImmediately,openErrorCallback) {
	if(setupImmediately == null) setupImmediately = false;
	if(baud == null) baud = 9600;
	this.isSetup = false;
	this.portName = portName;
	this.baud = baud;
	this.openErrorHandler = openErrorCallback;
	this.openHandler = null;
	this.dataHandler = null;
	this.errorHandler = null;
	this.openErrorHandler = null;
	if(setupImmediately) this.setup();
};
hxl8_nodejs_Serial.__name__ = true;
hxl8_nodejs_Serial.getDeviceList = function(callback) {
	var nodeSerial = js_Node.require("serialport");
	nodeSerial.list(function(err,ports) {
		var devices = new haxe_ds_StringMap();
		var _g = 0;
		while(_g < ports.length) {
			var port = ports[_g];
			++_g;
			var key = port.comName;
			var value = port.pnpId;
			if(__map_reserved[key] != null) devices.setReserved(key,value); else devices.h[key] = value;
		}
		if(callback != null) callback(devices);
	});
};
hxl8_nodejs_Serial.prototype = {
	setOpenHandler: function(openHandler) {
		this.openHandler = openHandler;
	}
	,setDataHandler: function(dataHandler) {
		this.dataHandler = dataHandler;
	}
	,setErrorHandler: function(errorHandler) {
		this.errorHandler = errorHandler;
	}
	,get_isSetup: function() {
		if(this.m_serialPort == null) return false;
		return this.m_serialPort.isOpened();
	}
	,setup: function() {
		var _g = this;
		var serialPort = this.portName;
		var serialBaud = this.baud;
		var nodeSerial = js_Node.require("serialport").SerialPort;
		try {
			var err;
			if(this.openErrorHandler != null) err = this.openErrorHandler; else err = $bind(this,this.errorCallback);
			this.m_serialPort = new nodeSerial (serialPort, {baudrate: serialBaud}, true, err);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			console.log(e);
			return false;
		}
		this.m_serialPort.on("open",function() {
			if(_g.openHandler != null) _g.openHandler();
		});
		this.m_serialPort.on("data",function(data) {
			if(_g.dataHandler != null) _g.dataHandler(data);
		});
		this.m_serialPort.on("error",function(error) {
			if(_g.errorHandler != null) _g.errorHandler(error); else console.log(error);
		});
		this.isSetup = true;
		return true;
	}
	,writeBytes: function(buffer) {
		this.m_serialPort.write(buffer);
		return buffer.length;
	}
	,readBytes: function(length) {
		return null;
	}
	,writeByte: function($byte) {
		return false;
	}
	,flush: function(flushIn,flushOut) {
		if(flushOut == null) flushOut = false;
		if(flushIn == null) flushIn = false;
	}
	,close: function() {
		this.m_serialPort.close($bind(this,this.errorCallback));
	}
	,errorCallback: function(error) {
		if(error != null) console.log(error);
	}
	,__class__: hxl8_nodejs_Serial
};
var hxl8_responses_L8ResponseBase = function() {
};
hxl8_responses_L8ResponseBase.__name__ = true;
hxl8_responses_L8ResponseBase.prototype = {
	parseData: function(data) {
		if(data == null) return;
		this.m_cmd = data.b[0];
		this.m_len = data.length;
		this.m_data = data;
	}
	,toString: function() {
		return "base " + this.m_cmd + " [" + this.m_len + "]";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		return [];
	}
	,toHex: function() {
		return this.m_data.toHex();
	}
	,print: function(format) {
		var lines = [];
		switch(format[1]) {
		case 0:
			lines.push(this.toString());
			break;
		case 3:
			lines.push(this.toHex());
			break;
		case 1:
			lines = this.toCSV(false);
			break;
		case 2:
			lines = this.toCSV(true);
			break;
		}
		return lines;
	}
	,__class__: hxl8_responses_L8ResponseBase
};
var hxl8_responses_L8ResponseAccelerator = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseAccelerator.__name__ = true;
hxl8_responses_L8ResponseAccelerator.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseAccelerator.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 8) {
			this.m_accX = 0;
			this.m_accY = 0;
			this.m_accZ = 0;
			this.m_facing = false;
			this.m_orient = 0;
			this.m_tap = false;
			this.m_shake = false;
			return;
		}
		this.m_accX = data.b[1];
		this.m_accY = data.b[2];
		this.m_accZ = data.b[3];
		this.m_facing = data.b[4] == 2;
		this.m_orient = data.b[5];
		this.m_tap = data.b[6] == 1;
		this.m_shake = data.b[7] == 1;
	}
	,toString: function() {
		var accX = Std.string(this.m_accX / 32 * 1.5);
		var accY = Std.string(this.m_accY / 32 * 1.5);
		var accZ = Std.string(this.m_accZ / 32 * 1.5);
		var facing;
		if(this.m_facing) facing = "Up"; else facing = "Upside-down";
		var tap;
		if(this.m_tap) tap = "tap"; else tap = "---";
		var shake;
		if(this.m_shake) shake = "shaking"; else shake = "not shaking";
		var orient = "";
		var _g = this.m_orient;
		switch(_g) {
		case 1:
			orient = "Up";
			break;
		case 2:
			orient = "Down";
			break;
		case 5:
			orient = "Right";
			break;
		case 6:
			orient = "Left";
			break;
		default:
		}
		return "ACC: X=" + accX + "g Y=" + accY + "g Z=" + accZ + "g facing=" + facing + " orient=" + orient + " tap=" + tap + " shaking=" + shake;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;x-axis;y-axis;z-axis;lying info;orientation;tap;shake");
		result.push("" + this.m_cmd + ";" + this.m_accX + ";" + this.m_accY + ";" + this.m_accZ + ";" + Std.string(this.m_facing) + ";" + this.m_orient + ";" + Std.string(this.m_tap) + ";" + Std.string(this.m_shake));
		return result;
	}
	,__class__: hxl8_responses_L8ResponseAccelerator
});
var hxl8_responses_L8ResponseAmbientLight = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseAmbientLight.__name__ = true;
hxl8_responses_L8ResponseAmbientLight.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseAmbientLight.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 5) {
			this.m_lightValue = 0;
			this.m_percent = 0;
			this.m_requestFlag = false;
			return;
		}
		this.m_lightValue = data.b[1] << 8 | data.b[2];
		this.m_percent = data.b[3];
		this.m_requestFlag = data.b[4] == 0;
	}
	,toString: function() {
		var msg = "";
		if(this.m_requestFlag) msg = "Requested"; else msg = "Notification";
		return "Ambient Light: " + this.m_lightValue + " - " + this.m_percent + "% " + msg;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;light value;light percentage;notification flag");
		result.push("" + this.m_cmd + ";" + this.m_lightValue + ";" + this.m_percent + ";" + Std.string(this.m_requestFlag));
		return result;
	}
	,__class__: hxl8_responses_L8ResponseAmbientLight
});
var hxl8_responses_PrintFormat = { __ename__ : true, __constructs__ : ["TEXT","CSV","CSV_HEADER","HEX"] };
hxl8_responses_PrintFormat.TEXT = ["TEXT",0];
hxl8_responses_PrintFormat.TEXT.toString = $estr;
hxl8_responses_PrintFormat.TEXT.__enum__ = hxl8_responses_PrintFormat;
hxl8_responses_PrintFormat.CSV = ["CSV",1];
hxl8_responses_PrintFormat.CSV.toString = $estr;
hxl8_responses_PrintFormat.CSV.__enum__ = hxl8_responses_PrintFormat;
hxl8_responses_PrintFormat.CSV_HEADER = ["CSV_HEADER",2];
hxl8_responses_PrintFormat.CSV_HEADER.toString = $estr;
hxl8_responses_PrintFormat.CSV_HEADER.__enum__ = hxl8_responses_PrintFormat;
hxl8_responses_PrintFormat.HEX = ["HEX",3];
hxl8_responses_PrintFormat.HEX.toString = $estr;
hxl8_responses_PrintFormat.HEX.__enum__ = hxl8_responses_PrintFormat;
var hxl8_responses_L8ResponseBatchG = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseBatchG.__name__ = true;
hxl8_responses_L8ResponseBatchG.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseBatchG.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(this.m_len == 2) this.m_charge = data.b[1];
	}
	,toString: function() {
		var msg = "";
		var _g = this.m_charge;
		switch(_g) {
		case 6:case 7:case 15:
			msg = "Stand-by (not charging)";
			break;
		case 8:case 9:case 11:case 13:
			msg = "";
			break;
		case 10:
			msg = "Charging";
			break;
		case 12:
			msg = "Charge Complete";
			break;
		case 14:
			msg = "Charge Fault";
			break;
		}
		return "Battery Charge: " + msg;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;charging status");
		result.push("" + this.m_cmd + ";" + this.m_charge);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseBatchG
});
var hxl8_responses_L8ResponseButton = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseButton.__name__ = true;
hxl8_responses_L8ResponseButton.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseButton.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_pressed = data.b[1] == 1;
	}
	,toString: function() {
		if(this.m_pressed) return "Button pressed"; else return "Button not pressed";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;button status");
		result.push("" + this.m_cmd + ";" + Std.string(this.m_pressed));
		return result;
	}
	,__class__: hxl8_responses_L8ResponseButton
});
var hxl8_responses_L8ResponseErr = function() {
	hxl8_responses_L8ResponseBase.call(this);
	this.m_code = -1;
};
hxl8_responses_L8ResponseErr.__name__ = true;
hxl8_responses_L8ResponseErr.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseErr.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_code = data.b[1];
	}
	,toString: function() {
		var _g = this.m_code;
		switch(_g) {
		case 130:
			return "Error: no app running";
		}
		return "Error " + this.m_code;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;error code");
		result.push("" + this.m_cmd + ";" + this.m_code);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseErr
});
var hxl8_responses_L8ResponseFrameGrab = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseFrameGrab.__name__ = true;
hxl8_responses_L8ResponseFrameGrab.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseFrameGrab.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		this.m_rgbs = [];
		if(data.length == 129) {
			var _g = 0;
			while(_g < 64) {
				var index = _g++;
				var r;
				var g;
				var b;
				b = data.b[index * 2 + 1];
				g = data.b[index * 2 + 2];
				r = g & 15;
				g = (g & 240) >> 4;
				this.m_rgbs.push(new hxl8_L8RGB(null,r,g,b));
			}
		}
	}
	,toString: function() {
		var buffer = new StringBuf();
		var buffer2 = new StringBuf();
		var index = 0;
		var _g = 0;
		var _g1 = this.m_rgbs;
		while(_g < _g1.length) {
			var rgb = _g1[_g];
			++_g;
			buffer.add(rgb.toString());
			buffer2.add(rgb.toString());
			buffer.b += " ";
			index++;
			if(index % 8 == 0) buffer.b += "\n";
		}
		buffer.b += "\n";
		if(buffer2.b == null) buffer.b += "null"; else buffer.b += "" + buffer2.b;
		return buffer.b;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) {
			var headerText_b = "";
			headerText_b += "response";
			var index = 0;
			var _g = 0;
			var _g1 = this.m_rgbs;
			while(_g < _g1.length) {
				var rgb = _g1[_g];
				++_g;
				headerText_b += Std.string(";RGB " + index);
				index++;
			}
			result.push(headerText_b);
		}
		var dataText = new StringBuf();
		dataText.b += Std.string(this.m_cmd);
		var _g2 = 0;
		var _g11 = this.m_rgbs;
		while(_g2 < _g11.length) {
			var rgb1 = _g11[_g2];
			++_g2;
			dataText.b += ";";
			dataText.add(rgb1.toString());
		}
		result.push(dataText.b);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseFrameGrab
});
var hxl8_responses_L8ResponseMCUTemp = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseMCUTemp.__name__ = true;
hxl8_responses_L8ResponseMCUTemp.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseMCUTemp.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 3) {
			this.m_temperature = 0;
			return;
		}
		this.m_temperature = data.b[1] << 8 | data.b[2];
	}
	,toString: function() {
		return "Temperature: " + this.m_temperature + "°C";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;processor temperature");
		result.push("" + this.m_cmd + ";" + this.m_temperature);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseMCUTemp
});
var hxl8_responses_L8ResponseNoise = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseNoise.__name__ = true;
hxl8_responses_L8ResponseNoise.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseNoise.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 3) {
			this.m_noiseValue = 0;
			return;
		}
		this.m_noiseValue = data.b[1] << 8 | data.b[2];
	}
	,toString: function() {
		return "Noise: " + this.m_noiseValue;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;noise");
		result.push("" + this.m_cmd + ";" + this.m_noiseValue);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseNoise
});
var hxl8_responses_L8ResponseNotificationSilence = function() {
	hxl8_responses_L8ResponseBase.call(this);
	this.m_code = false;
};
hxl8_responses_L8ResponseNotificationSilence.__name__ = true;
hxl8_responses_L8ResponseNotificationSilence.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseNotificationSilence.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_code = data.b[1] == 1;
	}
	,toString: function() {
		if(this.m_code) return "NotificationSilence: on";
		return "NotificationSilence: off";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;notification silence");
		result.push("" + this.m_cmd + ";" + Std.string(this.m_code));
		return result;
	}
	,__class__: hxl8_responses_L8ResponseNotificationSilence
});
var hxl8_responses_L8ResponseNotifyApp = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseNotifyApp.__name__ = true;
hxl8_responses_L8ResponseNotifyApp.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseNotifyApp.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		this.m_rgbs = [];
		this.m_app = "invalid";
		this.m_super = new hxl8_L8RGB("000");
		this.m_enabled = false;
		if(this.m_len > 129) {
			var len = data.b[1];
			this.m_length = len;
			if(this.m_len < len + 1 + 128 + 2 + 1) return;
			this.m_app = "";
			if(len > 0) this.m_app = data.getString(2,len);
			var offset = 2 + len;
			var r;
			var g;
			var b;
			var _g = 0;
			while(_g < 64) {
				var index = _g++;
				b = data.b[index * 2 + offset];
				g = data.b[index * 2 + offset + 1];
				r = g & 15;
				g = (g & 240) >> 4;
				this.m_rgbs.push(new hxl8_L8RGB(null,r,g,b));
			}
			offset += 128;
			b = data.b[offset] & 15;
			g = data.b[offset + 1] & 15;
			r = data.b[offset + 2] & 15;
			this.m_super = new hxl8_L8RGB(null,r,g,b);
			offset += 3;
			if(data.b[offset] == 1) this.m_enabled = true;
		}
	}
	,toString: function() {
		var buffer = new StringBuf();
		var buffer2 = new StringBuf();
		buffer.b += Std.string("Name: " + this.m_app + "\n");
		buffer.b += "Matrix:\n";
		var index = 0;
		var _g = 0;
		var _g1 = this.m_rgbs;
		while(_g < _g1.length) {
			var rgb = _g1[_g];
			++_g;
			buffer.add(rgb.toString());
			buffer2.add(rgb.toString());
			buffer.b += " ";
			index++;
			if(index % 8 == 0) buffer.b += "\n";
		}
		buffer.b += "\n";
		if(buffer2.b == null) buffer.b += "null"; else buffer.b += "" + buffer2.b;
		buffer.b += "\n";
		buffer.add("Super: " + this.m_super.toString() + "\n");
		buffer.b += Std.string("Enabled: " + Std.string(this.m_enabled));
		return buffer.b;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) {
			var headerText_b = "";
			headerText_b += "response;length of app string;app string";
			var index = 0;
			var _g = 0;
			var _g1 = this.m_rgbs;
			while(_g < _g1.length) {
				var rgb = _g1[_g];
				++_g;
				headerText_b += Std.string(";RGB " + index);
				index++;
			}
			headerText_b += ";super led RGB;enable flag";
			result.push(headerText_b);
		}
		var dataText = new StringBuf();
		dataText.b += Std.string(this.m_cmd);
		dataText.b += ";";
		dataText.b += Std.string(this.m_length);
		dataText.b += ";";
		dataText.b += Std.string(this.m_app);
		var _g2 = 0;
		var _g11 = this.m_rgbs;
		while(_g2 < _g11.length) {
			var rgb1 = _g11[_g2];
			++_g2;
			dataText.b += ";";
			dataText.add(rgb1.toString());
		}
		dataText.b += ";";
		dataText.add(this.m_super.toString());
		dataText.b += ";";
		dataText.b += Std.string(this.m_enabled);
		result.push(dataText.b);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseNotifyApp
});
var hxl8_responses_L8ResponseNumAnims = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseNumAnims.__name__ = true;
hxl8_responses_L8ResponseNumAnims.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseNumAnims.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(this.m_len == 2) this.m_animCount = data.b[1];
	}
	,toString: function() {
		return "Number of Anims (in User Space): " + this.m_animCount;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;number of animations");
		result.push("" + this.m_cmd + ";" + this.m_animCount);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseNumAnims
});
var hxl8_responses_L8ResponseNumFrames = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseNumFrames.__name__ = true;
hxl8_responses_L8ResponseNumFrames.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseNumFrames.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(this.m_len == 2) this.m_frameCount = data.b[1];
	}
	,toString: function() {
		return "Number of Frames (in User Space): " + this.m_frameCount;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;number of frames");
		result.push("" + this.m_cmd + ";" + this.m_frameCount);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseNumFrames
});
var hxl8_responses_L8ResponseNumL8ies = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseNumL8ies.__name__ = true;
hxl8_responses_L8ResponseNumL8ies.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseNumL8ies.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(this.m_len == 2) this.m_l8iesCount = data.b[1];
	}
	,toString: function() {
		return "Number of L8ies (in User Space): " + this.m_l8iesCount;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;number of l8ties");
		result.push("" + this.m_cmd + ";" + this.m_l8iesCount);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseNumL8ies
});
var hxl8_responses_L8ResponseNumNotifyApps = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseNumNotifyApps.__name__ = true;
hxl8_responses_L8ResponseNumNotifyApps.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseNumNotifyApps.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(this.m_len == 2) this.m_appCount = data.b[1];
	}
	,toString: function() {
		return "Number of Notify-Apps: " + this.m_appCount;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;number of notify apps");
		result.push("" + this.m_cmd + ";" + this.m_appCount);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseNumNotifyApps
});
var hxl8_responses_L8ResponseOK = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseOK.__name__ = true;
hxl8_responses_L8ResponseOK.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseOK.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	toString: function() {
		return "OK";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response");
		result.push("" + this.m_cmd);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseOK
});
var hxl8_responses_L8ResponseOrientation = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseOrientation.__name__ = true;
hxl8_responses_L8ResponseOrientation.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseOrientation.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(this.m_len == 2) this.m_orient = data.b[1];
	}
	,toString: function() {
		var msg = "---";
		var _g = this.m_orient;
		switch(_g) {
		case 1:
			msg = "Up";
			break;
		case 2:
			msg = "Down";
			break;
		case 5:
			msg = "Right";
			break;
		case 6:
			msg = "Left";
			break;
		default:
		}
		return "Orientation change: " + msg;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;orientation");
		result.push("" + this.m_cmd + ";" + this.m_orient);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseOrientation
});
var hxl8_responses_L8ResponsePong = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponsePong.__name__ = true;
hxl8_responses_L8ResponsePong.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponsePong.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	toString: function() {
		return "Pong";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response");
		result.push("" + this.m_cmd);
		return result;
	}
	,__class__: hxl8_responses_L8ResponsePong
});
var hxl8_responses_L8ResponseProximity = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseProximity.__name__ = true;
hxl8_responses_L8ResponseProximity.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseProximity.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 5) {
			this.m_proxValue = 0;
			this.m_percent = 0;
			this.m_requestFlag = false;
			return;
		}
		this.m_proxValue = data.b[1] << 8 | data.b[2];
		this.m_percent = data.b[3];
		this.m_requestFlag = data.b[4] == 0;
	}
	,toString: function() {
		var msg = "";
		if(this.m_requestFlag) msg = "Requested"; else msg = "Notification";
		return "Proximity: " + this.m_proxValue + " - " + this.m_percent + "% " + msg;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;proximity value;proximity percentage;notification flag");
		result.push("" + this.m_cmd + ";" + this.m_proxValue + ";" + this.m_percent + ";" + Std.string(this.m_requestFlag));
		return result;
	}
	,__class__: hxl8_responses_L8ResponseProximity
});
var hxl8_responses_L8ResponseReadAnim = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseReadAnim.__name__ = true;
hxl8_responses_L8ResponseReadAnim.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseReadAnim.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		this.m_frames = [];
		if(data.length < 4) return;
		var len = data.b[1];
		var _g = 0;
		while(_g < len) {
			var index = _g++;
			var frame = data.b[index * 2 + 2];
			var delay = data.b[index * 2 + 2 + 1];
			this.m_frames.push({ frame : frame, delay : delay});
		}
	}
	,toString: function() {
		var buffer_b = "";
		var buffer2_b = "";
		var first = true;
		var _g = 0;
		var _g1 = this.m_frames;
		while(_g < _g1.length) {
			var animFrame = _g1[_g];
			++_g;
			var seconds = animFrame.delay / 10;
			buffer_b += Std.string("" + animFrame.frame + " - " + seconds + "s\n");
			if(!first) buffer2_b += ",";
			first = false;
			buffer2_b += Std.string("" + animFrame.frame + "," + animFrame.delay);
		}
		buffer_b += "\n";
		if(buffer2_b == null) buffer_b += "null"; else buffer_b += "" + buffer2_b;
		return buffer_b;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) {
			var headerText_b = "";
			headerText_b += "response";
			var index = 0;
			var _g = 0;
			var _g1 = this.m_frames;
			while(_g < _g1.length) {
				var frame = _g1[_g];
				++_g;
				headerText_b += Std.string(";index " + index + ";delay " + index);
				index++;
			}
			result.push(headerText_b);
		}
		var dataText_b = "";
		dataText_b += Std.string(this.m_cmd);
		var _g2 = 0;
		var _g11 = this.m_frames;
		while(_g2 < _g11.length) {
			var frame1 = _g11[_g2];
			++_g2;
			dataText_b += ";";
			if(frame1.frame == null) dataText_b += "null"; else dataText_b += "" + frame1.frame;
			dataText_b += ";";
			if(frame1.delay == null) dataText_b += "null"; else dataText_b += "" + frame1.delay;
		}
		result.push(dataText_b);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseReadAnim
});
var hxl8_responses_L8ResponseSensorThresholds = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseSensorThresholds.__name__ = true;
hxl8_responses_L8ResponseSensorThresholds.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseSensorThresholds.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 13) {
			this.m_ambMinValue = 0;
			this.m_ambMaxValue = 0;
			this.m_noiseMinValue = 0;
			this.m_noiseMaxValue = 0;
			this.m_proxMinValue = 0;
			this.m_proxMaxValue = 0;
			return;
		}
		this.m_noiseMinValue = data.b[1] << 8 | data.b[2];
		this.m_noiseMaxValue = data.b[3] << 8 | data.b[4];
		this.m_proxMinValue = data.b[5] << 8 | data.b[6];
		this.m_proxMaxValue = data.b[7] << 8 | data.b[8];
		this.m_ambMinValue = data.b[9] << 8 | data.b[10];
		this.m_ambMaxValue = data.b[11] << 8 | data.b[12];
	}
	,toString: function() {
		return "Thresholds:\nAmbient Light: " + this.m_ambMinValue + " - " + this.m_ambMaxValue + "\n" + ("Noise: " + this.m_noiseMinValue + " - " + this.m_noiseMaxValue + "\nProximity: " + this.m_proxMinValue + " - " + this.m_proxMaxValue);
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;noise min;noise max;proximity min;proximity max;ambient min;ambient max");
		result.push("" + this.m_cmd + ";" + this.m_noiseMinValue + ";" + this.m_noiseMaxValue + ";" + this.m_proxMinValue + ";" + this.m_proxMaxValue + ";" + this.m_ambMinValue + ";" + this.m_ambMaxValue);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseSensorThresholds
});
var hxl8_responses_L8ResponseStoreAnim = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseStoreAnim.__name__ = true;
hxl8_responses_L8ResponseStoreAnim.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseStoreAnim.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_anim = data.b[1];
	}
	,toString: function() {
		return "Animation stored as: " + this.m_anim;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;new anim number");
		result.push("" + this.m_cmd + ";" + this.m_anim);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseStoreAnim
});
var hxl8_responses_L8ResponseStoreFrame = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseStoreFrame.__name__ = true;
hxl8_responses_L8ResponseStoreFrame.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseStoreFrame.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_frame = data.b[1];
	}
	,toString: function() {
		return "Frame stored as: " + this.m_frame;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;new frame number");
		result.push("" + this.m_cmd + ";" + this.m_frame);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseStoreFrame
});
var hxl8_responses_L8ResponseStoreL8y = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseStoreL8y.__name__ = true;
hxl8_responses_L8ResponseStoreL8y.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseStoreL8y.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_l8y = data.b[1];
	}
	,toString: function() {
		return "L8y stored as: " + this.m_l8y;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;new l8y number");
		result.push("" + this.m_cmd + ";" + this.m_l8y);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseStoreL8y
});
var hxl8_responses_L8ResponseTemperature = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseTemperature.__name__ = true;
hxl8_responses_L8ResponseTemperature.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseTemperature.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 3) {
			this.m_temperature = 0;
			return;
		}
		this.m_temperature = (data.b[1] << 8 | data.b[2]) / 10;
	}
	,toString: function() {
		return "Temperature: " + this.m_temperature + "°C";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;temperature");
		result.push("" + this.m_cmd + ";" + this.m_temperature);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseTemperature
});
var hxl8_responses_L8ResponseTraceMsg = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseTraceMsg.__name__ = true;
hxl8_responses_L8ResponseTraceMsg.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseTraceMsg.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 3) {
			this.m_type = data.b[1];
			this.m_code = data.b[2];
		}
	}
	,toString: function() {
		var msg = "";
		var _g = this.m_type;
		switch(_g) {
		case 1:
			var _g1 = this.m_code;
			switch(_g1) {
			case 1:
				return "BT_INIT_OK";
			case 2:
				return "ACC_SENSOR_INIT_OK";
			case 3:
				return "AMB_SENSOR_INIT_OK";
			case 16:
				return "BATTERY_80PERCENT";
			case 17:
				return "BATTERY_50PERCENT";
			case 18:
				return "BATTERY_30PERCENT";
			case 19:
				return "BATTERY_20PERCENT";
			case 20:
				return "BATTERY_10PERCENT";
			case 21:
				return "BATTERY_05PERCENT";
			case 22:
				return "BATTERY_CHARGING";
			case 23:
				return "BATTERY_CHARGED";
			default:
			}
			break;
		default:
			var _g11 = this.m_code;
			switch(_g11) {
			case 1:
				return "FLASH_WRITE_ERROR";
			case 2:
				return "FLASH_READ_ERROR";
			case 3:
				return "TEMP_SENSOR_ERROR";
			case 4:
				return "MCU_TEMP_SENSOR_ERROR";
			case 5:
				return "BATTERY_ERROR";
			case 6:
				return "CHARGING_ERROR";
			case 7:
				return "BT_INIT_ERROR";
			case 8:
				return "ACC_SENSOR_ERROR";
			case 9:
				return "AMB_SENSOR_ERROR";
			case 10:
				return "NOISE_SENSOR_ERROR";
			case 11:
				return "UUID_READ_ERROR";
			case 255:
				return "GLOBAL_ERROR";
			}
		}
		return "TraceMsg: [" + this.m_len + "/" + this.m_type + "/" + this.m_code + "] - " + msg;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;type;code");
		result.push("" + this.m_cmd + ";" + this.m_type + ";" + this.m_code);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseTraceMsg
});
var hxl8_responses_L8ResponseUID = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseUID.__name__ = true;
hxl8_responses_L8ResponseUID.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseUID.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 13) {
			this.m_UID = "???";
			return;
		}
		var rawUID = data.toHex();
		this.m_UID = HxOverrides.substr(rawUID,2,14) + "-" + HxOverrides.substr(rawUID,16,null);
	}
	,toString: function() {
		return "UID: " + this.m_UID;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;uid");
		result.push("" + this.m_cmd + ";" + this.m_UID);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseUID
});
var hxl8_responses_L8ResponseVBUS = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseVBUS.__name__ = true;
hxl8_responses_L8ResponseVBUS.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseVBUS.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 3) {
			this.m_vbusValue = 0;
			return;
		}
		this.m_vbusValue = data.b[1] << 8 | data.b[2];
	}
	,toString: function() {
		return "USB voltage: " + this.m_vbusValue + "mV";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;usb voltage");
		result.push("" + this.m_cmd + ";" + this.m_vbusValue);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseVBUS
});
var hxl8_responses_L8ResponseVersions = function() {
	hxl8_responses_L8ResponseBase.call(this);
	this.m_versionLightOS = "???";
	this.m_versionHardware = "???";
	this.m_versionBootloader = "???";
	this.m_versionData = "???";
};
hxl8_responses_L8ResponseVersions.__name__ = true;
hxl8_responses_L8ResponseVersions.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseVersions.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 10) {
			this.m_versionLightOS = "???";
			this.m_versionHardware = "???";
			this.m_versionBootloader = "???";
			this.m_versionData = "???";
			return;
		}
		this.m_versionLightOS = data.b[1] + "." + this.zeroFill(data.b[2]) + "." + this.zeroFill(data.b[3]);
		this.m_versionHardware = data.b[4] + "." + this.zeroFill(data.b[5]);
		this.m_versionBootloader = data.b[6] + "." + this.zeroFill(data.b[7]);
		this.m_versionData = data.b[8] + "." + this.zeroFill(data.b[9]);
	}
	,zeroFill: function(value) {
		return StringTools.lpad(value == null?"null":"" + value,"0",2);
	}
	,toString: function() {
		return "Versions:\nLightOS: " + this.m_versionLightOS + "\nHardware: " + this.m_versionHardware + "\nBooloader: " + this.m_versionBootloader + "\nData: " + this.m_versionData;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;lightos version;hardware version;bootloader version;data version");
		result.push("" + this.m_cmd + ";" + this.m_versionLightOS + ";" + this.m_versionHardware + ";" + this.m_versionBootloader + ";" + this.m_versionData);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseVersions
});
var hxl8_responses_L8ResponseVoltage = function() {
	hxl8_responses_L8ResponseBase.call(this);
};
hxl8_responses_L8ResponseVoltage.__name__ = true;
hxl8_responses_L8ResponseVoltage.__super__ = hxl8_responses_L8ResponseBase;
hxl8_responses_L8ResponseVoltage.prototype = $extend(hxl8_responses_L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8_responses_L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 4) {
			this.m_voltage = 0;
			this.m_percent = 0;
			return;
		}
		this.m_voltage = data.b[1] << 8 | data.b[2];
		this.m_percent = data.b[3];
	}
	,toString: function() {
		return "Voltage: " + this.m_voltage + "mV - " + this.m_percent + "%";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8_responses_L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;ibattery voltage;percent");
		result.push("" + this.m_cmd + ";" + this.m_voltage + ";" + this.m_percent);
		return result;
	}
	,__class__: hxl8_responses_L8ResponseVoltage
});
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_NodeC = function() { };
js_NodeC.__name__ = true;
var js_Node = function() { };
js_Node.__name__ = true;
js_Node.get_assert = function() {
	return js_Node.require("assert");
};
js_Node.get_child_process = function() {
	return js_Node.require("child_process");
};
js_Node.get_cluster = function() {
	return js_Node.require("cluster");
};
js_Node.get_crypto = function() {
	return js_Node.require("crypto");
};
js_Node.get_dgram = function() {
	return js_Node.require("dgram");
};
js_Node.get_dns = function() {
	return js_Node.require("dns");
};
js_Node.get_fs = function() {
	return js_Node.require("fs");
};
js_Node.get_http = function() {
	return js_Node.require("http");
};
js_Node.get_https = function() {
	return js_Node.require("https");
};
js_Node.get_net = function() {
	return js_Node.require("net");
};
js_Node.get_os = function() {
	return js_Node.require("os");
};
js_Node.get_path = function() {
	return js_Node.require("path");
};
js_Node.get_querystring = function() {
	return js_Node.require("querystring");
};
js_Node.get_repl = function() {
	return js_Node.require("repl");
};
js_Node.get_tls = function() {
	return js_Node.require("tls");
};
js_Node.get_url = function() {
	return js_Node.require("url");
};
js_Node.get_util = function() {
	return js_Node.require("util");
};
js_Node.get_vm = function() {
	return js_Node.require("vm");
};
js_Node.get_zlib = function() {
	return js_Node.require("zlib");
};
js_Node.get___filename = function() {
	return __filename;
};
js_Node.get___dirname = function() {
	return __dirname;
};
js_Node.get_json = function() {
	return JSON;
};
js_Node.newSocket = function(options) {
	return new js.Node.net.Socket(options);
};
js_Node.isNodeWebkit = function() {
	return (typeof process == "object");
};
var sys_FileSystem = function() { };
sys_FileSystem.__name__ = true;
sys_FileSystem.exists = function(path) {
	return js_Node.require("fs").existsSync(path);
};
sys_FileSystem.rename = function(path,newpath) {
	js_Node.require("fs").renameSync(path,newpath);
};
sys_FileSystem.stat = function(path) {
	return js_Node.require("fs").statSync(path);
};
sys_FileSystem.fullPath = function(relpath) {
	return js_Node.require("path").resolve(null,relpath);
};
sys_FileSystem.isDirectory = function(path) {
	if(js_Node.require("fs").statSync(path).isSymbolicLink()) return false; else return js_Node.require("fs").statSync(path).isDirectory();
};
sys_FileSystem.createDirectory = function(path) {
	js_Node.require("fs").mkdirSync(path);
};
sys_FileSystem.deleteFile = function(path) {
	js_Node.require("fs").unlinkSync(path);
};
sys_FileSystem.deleteDirectory = function(path) {
	js_Node.require("fs").rmdirSync(path);
};
sys_FileSystem.readDirectory = function(path) {
	return js_Node.require("fs").readdirSync(path);
};
sys_FileSystem.signature = function(path) {
	var shasum = js_Node.require("crypto").createHash("md5");
	shasum.update(js_Node.require("fs").readFileSync(path));
	return shasum.digest("hex");
};
sys_FileSystem.join = function(p1,p2,p3) {
	return js_Node.require("path").join(p1 == null?"":p1,p2 == null?"":p2,p3 == null?"":p3);
};
sys_FileSystem.readRecursive = function(path,filter) {
	var files = sys_FileSystem.readRecursiveInternal(path,null,filter);
	if(files == null) return []; else return files;
};
sys_FileSystem.readRecursiveInternal = function(root,dir,filter) {
	if(dir == null) dir = "";
	if(root == null) return null;
	var dirPath = js_Node.require("path").join(root == null?"":root,dir == null?"":dir,"");
	if(!(js_Node.require("fs").existsSync(dirPath) && sys_FileSystem.isDirectory(dirPath))) return null;
	var result = [];
	var _g = 0;
	var _g1 = js_Node.require("fs").readdirSync(dirPath);
	while(_g < _g1.length) {
		var file = _g1[_g];
		++_g;
		var fullPath = js_Node.require("path").join(dirPath == null?"":dirPath,file == null?"":file,"");
		var relPath;
		if(dir == "") relPath = file; else relPath = js_Node.require("path").join(dir == null?"":dir,file == null?"":file,"");
		if(js_Node.require("fs").existsSync(fullPath)) {
			if(sys_FileSystem.isDirectory(fullPath)) {
				if(fullPath.charCodeAt(fullPath.length - 1) == 47) fullPath = HxOverrides.substr(fullPath,0,-1);
				if(filter != null && !filter(relPath)) continue;
				var recursedResults = sys_FileSystem.readRecursiveInternal(root,relPath,filter);
				if(recursedResults != null && recursedResults.length > 0) result = result.concat(recursedResults);
			} else if(filter == null || filter(relPath)) result.push(relPath);
		}
	}
	return result;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
haxe_Resource.content = [{ name : "indexCommands.html", data : "PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KPG1ldGEgY2hhcnNlZXQ9IlVURi04Ij4KPHRpdGxlPmh4TDggU2VydmVyPC90aXRsZT4KPC9oZWFkPgo8Ym9keT4KCjxoMT5oeEw4IFNlcnZlcjwvaDE+ClJ1bm5pbmcgb24gcG9ydCA6OnBvcnQ6OjxiciAvPgpyZXF1ZXN0ZWQgaW50ZXJmYWNlIDo6c2VyaWFsUG9ydDo6PGJyIC8+CjxiciAvPgpMaXN0IG9mIHN1cHBvcnRlZCBjb21tYW5kcyB3aXRoIHNhbXBsZXM6PGJyIC8+CjxoMj5MOCBhcHBsaWNhdGlvbnM8L2gyPgo8YSBocmVmPSIvYXBwc3RvcCI+c3RvcCBjdXJyZW50IGFwcDwvYT48YnIgLz4KPGEgaHJlZj0iL2FwcGFtYmllbnQvZjAwLzAwZi8xMCI+c3RhcnQgYW1iaWVudCBsaWdodCBhcHAgd2l0aCBtYXRyaXggY29sb3IsIHN1cGVybGVkIGNvbG9yIGFuZCB0aHJlc2hvbGQ8L2E+PGJyIC8+CjxhIGhyZWY9Ii9hcHBjb2xvcmNoYW5nZS9tdWx0aWNvbG9yLzEwL3RydWUiPlN0YXJ0IGNvbG9yIGNoYW5nZXIgYXBwIE11bHRpY2xvciB3aXRoIHNwZWVkIGluIFN1cGVyTEVEIGludmVydCg9IHRydWUpLCBkZWZhdWx0OiBmYWxzZTwvYT48YnIgLz4KPGEgaHJlZj0iL2FwcGNvbG9yY2hhbmdlL3Ryb3BpY2FsLzEwL3RydWUiPlN0YXJ0IGNvbG9yIGNoYW5nZXIgYXBwIFRyb3BpY2FsIHdpdGggc3BlZWQgaW4gU3VwZXJMRUQgaW52ZXJ0KD0gdHJ1ZSksIGRlZmF1bHQ6IGZhbHNlPC9hPjxiciAvPgo8YSBocmVmPSIvYXBwY29sb3JjaGFuZ2UvZ2FsYXh5LzEwL3RydWUiPlN0YXJ0IGNvbG9yIGNoYW5nZXIgYXBwIEdhbGF4eSB3aXRoIHNwZWVkIGluIFN1cGVyTEVEIGludmVydCg9IHRydWUpLCBkZWZhdWx0OiBmYWxzZTwvYT48YnIgLz4KPGEgaHJlZj0iL2FwcGNvbG9yY2hhbmdlL2F1cm9yYS8xMC90cnVlIj5TdGFydCBjb2xvciBjaGFuZ2VyIGFwcCBBdXJvcmEgd2l0aCBzcGVlZCBpbiBTdXBlckxFRCBpbnZlcnQoPSB0cnVlKSwgZGVmYXVsdDogZmFsc2U8L2E+PGJyIC8+CjxhIGhyZWY9Ii9hcHBkaWNlL2ZmMCI+U3RhcnQgZGljZSBhcHAgd2l0aCBvcHRpb25hbCBjb2xvciwgZGVmYXVsdDogRjAwPC9hPjxiciAvPgo8YSBocmVmPSIvYXBwcHJveGltaXR5L2YwMC8wMGYvMTAiPnN0YXJ0IHByb3hpbWl0eSBhcHAgd2l0aCBtYXRyaXggY29sb3IsIHN1cGVybGVkIGNvbG9yIGFuZCB0aHJlc2hvbGQ8L2E+PGJyIC8+CjxhIGhyZWY9Ii9wYXJ0eSI+cnVuIHBhcnR5IGFwcDwvYT48YnIgLz4KPGJyIC8+CjxoMj5MOCBzZW5zb3JzPC9oMj4KPGEgaHJlZj0iL2F1dG9yb3RhdGUvdHJ1ZSI+ZW5hYmxlIGF1dG9yb3RhdGU8L2E+PGJyIC8+CjxhIGhyZWY9Ii9hdXRvcm90YXRlL2ZhbHNlIj5kaXNhYmxlIGF1dG9yb3RhdGU8L2E+PGJyIC8+CjxhIGhyZWY9Ii9iYXRjaGciPmJhdHRlcnkgY2hhcmdlIHN0YXR1czwvYT48YnIgLz4KPGEgaHJlZj0iL2J1dHRvbiI+cmVhZCBidXR0b24gc3RhdHVzPC9hPjxiciAvPgo8YSBocmVmPSIvZ2V0YWNjIj5nZXQgdmFsdWVzIG9mIGFjY2VsZXJvbWV0ZXI8L2E+PGJyIC8+CjxhIGhyZWY9Ii9nZXRhbWIiPmdldCB2YWx1ZXMgb2YgYW1iaWVudCBzZW5zb3I8L2E+PGJyIC8+CjxhIGhyZWY9Ii9nZXRtY3V0ZW1wIj5nZXQgY3VycmVudCBNQ1UgdGVtcGVyYXR1cmU8L2E+PGJyIC8+CjxhIGhyZWY9Ii9nZXRtaWMiPmdldCBjdXJyZW50IG5vaXNlIHNlbnNvciB2YWx1ZTwvYT48YnIgLz4KPGEgaHJlZj0iL2dldHByb3giPmdldCB2YWx1ZSBvZiBwcm94aW1pdHkgc2Vuc29yPC9hPjxiciAvPgo8YSBocmVmPSIvZ2V0dGVtcCI+Z2V0IHZhbHVlIG9mIHRlbXBlcmF0dXJlIHNlbnNvcjwvYT48YnIgLz4KPGEgaHJlZj0iL2dldHRocmVzaG9sZCI+Z2V0IGN1cnJlbnQgYW1iaWVudCwgbm9pc2UgYW5kIHByb3hpbWl0eSB0aHJlc2hvbGRzPC9hPjxiciAvPgo8YSBocmVmPSIvZ2V0dm9sdGFnZSI+Z2V0IHRoZSB2b2x0YWdlIG9mIEw4IGJhdHRlcnk8L2E+PGJyIC8+CjxhIGhyZWY9Ii9nZXR2YnVzIj5nZXQgdGhlIHZvbHRhZ2Ugb2YgVVNCIGNvbm5lY3Rpb248L2E+PGJyIC8+CjxhIGhyZWY9Ii9zZXRvcmllbnRhdGlvbi90b3AiPnNldHMgb3JpZW50YXRpb24gdG9wPC9hPjxiciAvPgo8YSBocmVmPSIvc2V0b3JpZW50YXRpb24vYm90dG9tIj5zZXRzIG9yaWVudGF0aW9uIGJvdHRvbTwvYT48YnIgLz4KPGEgaHJlZj0iL3NldG9yaWVudGF0aW9uL2xlZnQiPnNldHMgb3JpZW50YXRpb24gbGVmdDwvYT48YnIgLz4KPGEgaHJlZj0iL3NldG9yaWVudGF0aW9uL3JpZ2h0Ij5zZXRzIG9yaWVudGF0aW9uIHJpZ2h0PC9hPjxiciAvPgovc2V0YW1idGhyZXNob2xkL21pbi9tYXggLSBzZXRzIG1pbiBtYXggdmFsdWVzIG9mIGFtYmllbnQgdGhyZXNob2xkPGJyIC8+Ci9zZXRub2lzZXRocmVzaG9sZC9taW4vbWF4IC0gc2V0cyBtaW4gbWF4IHZhbHVlcyBvZiBub2lzZSB0aHJlc2hvbGQ8YnIgLz4KL3NldHByb3h0aHJlc2hvbGQvbWluL21heCAtIHNldHMgbWluIG1heCB2YWx1ZXMgb2YgcHJveGltaXR5IHRocmVzaG9sZDxiciAvPgo8YnIgLz4KPGgyPkw4IHJlc3BvbnNlIG91dHB1dCBvcHRpb25zPC9oMj4KPGEgaHJlZj0iL2Nzdi9nZXRhbWIiPnByaW50IHJlc3BvbnNlcyBpbiBDU1YgZm9ybWF0PC9hPjxiciAvPgo8YSBocmVmPSIvY3N2aGVhZGVyL2dldGFtYiI+cHJpbnQgcmVzcG9uc2VzIGluIENTViBmb3JtYXQgd2l0aCBoZWFkZXI8L2E+PGJyIC8+CjxhIGhyZWY9Ii9oZXgvZ2V0YW1iIj5wcmludCByZXNwb25zZXMgaW4gcmF3IGhleCBmb3JtYXQ8L2E+PGJyIC8+CjxiciAvPgo8aDI+TDh5PC9oMj4KL2RlbGV0ZWw4eS9sOHkjIC0gRGVsZXRlIEw4eSBieSBudW1iZXIgKGJldHdlZW4gMCBhbmQgR2V0TnVtTDhpZXMpPGJyIC8+CjxhIGhyZWY9Ii9nZXRudW1sOGllcyI+Z2V0IHRoZSBudW1iZXIgb2YgTDhpZXMgaW4gVXNlciBzcGFjZTwvYT48YnIgLz4KPGEgaHJlZj0iL3JlYWRsOHkvMiI+Z2V0IG1hdHJpeCBjb2xvcnMgZm9yIEw4eSAobDh5IyBiZXR3ZWVuIDAgYW5kIEdldE51bUw4aWVzKTwvYT48YnIgLz4KPGEgaHJlZj0iL2w4eS8wIj5zaG93IEw4eSAoYmV0d2VlbiAwIGFuZCBHZXROdW1MOGllcyk8L2E+PGJyIC8+Ci9zdG9yZWw4eS82NCooUkdCfFJSR0dCQikiPiAtIHN0b3JlcyBhIEw4eSAocmV0dXJucyBuZXcgaW5kZXggb2YgTDh5KTxiciAvPgo8YnIgLz4KPGgyPkw4IG5vdGlmaWNhdGlvbnM8L2gyPgo8YSBocmVmPSIvZW5hYmxlYWxsbm90aWZpY2F0aW9ucy90cnVlIj5lbmFibGUgYWxsIG5vdGlmaWNhdGlvbnMsIGRlZmF1bHQ6IHRydWU8L2E+PGJyIC8+CjxhIGhyZWY9Ii9lbmFibGVhbGxub3RpZmljYXRpb25zL2ZhbHNlIj5kaXNhYmxlIGFsbCBub3RpZmljYXRpb25zLCBkZWZhdWx0OiB0cnVlPC9hPjxiciAvPgo8YSBocmVmPSIvZW5hYmxlbm90aWZpY2F0aW9uLzEvdHJ1ZSI+ZW5hYmxlIG5vdGlmaWNhdGlvbiwgZGVmYXVsdDogdHJ1ZTwvYT48YnIgLz4KPGEgaHJlZj0iL2VuYWJsZW5vdGlmaWNhdGlvbi8xL2ZhbHNlIj5kaXNhYmxlIG5vdGlmaWNhdGlvbiwgZGVmYXVsdDogdHJ1ZTwvYT48YnIgLz4KPGEgaHJlZj0iL2dldG51bW5vdGlmeWFwcHMiPmdldCB0aGUgbnVtYmVyIG9mIG5vdGlmaWNhdGlvbiBhcHBzPC9hPjxiciAvPgo8YSBocmVmPSIvZ2V0bm90aWZ5YXBwIGFwcCMiPmdldCBOYW1lLCBNYXRyaXggY29sb3JzLCBTdXBlciBMRUQgY29sb3IgYW5kIEVuYWJsZWQgZmxhZyBvZiBhcHAgbnVtYmVyICgwLTI1NSk8L2E+PGJyIC8+CjxhIGhyZWY9Ii9ub3RpZnkvUGhvbmUlMjBDYWxsL29uLzAiPmRpc3BsYXkgUGhvbmUgQ2FsbCBub3RpZmljYXRpb24sIHBhcmFtZXRlcnMgc2VlIGJlbG93PC9hPjxiciAvPgo8YSBocmVmPSIvbm90aWZ5L1doYXRzQXBwL29uLzAiPmRpc3BsYXkgV2hhdHNBcHAgbm90aWZpY2F0aW9uLCBwYXJhbWV0ZXJzIHNlZSBiZWxvdzwvYT48YnIgLz4KPGEgaHJlZj0iL25vdGlmeS9GYWNlYm9vay9vbi8wIj5kaXNwbGF5IEZhY2Vib29rIG5vdGlmaWNhdGlvbiwgcGFyYW1ldGVycyBzZWUgYmVsb3c8L2E+PGJyIC8+CjxhIGhyZWY9Ii9ub3RpZnkvR01haWwvb24vMCI+ZGlzcGxheSBHTWFpbCBub3RpZmljYXRpb24sIHBhcmFtZXRlcnMgc2VlIGJlbG93PC9hPjxiciAvPgo8YSBocmVmPSIvbm90aWZ5L01vYmlsZU1haWwvb24vMCI+ZGlzcGxheSBNb2JpbGVNYWlsIG5vdGlmaWNhdGlvbiwgcGFyYW1ldGVycyBzZWUgYmVsb3c8L2E+PGJyIC8+CjxhIGhyZWY9Ii9ub3RpZnkvVHdlZXQvb24vMCI+ZGlzcGxheSBUd2VldCBub3RpZmljYXRpb24sIHBhcmFtZXRlcnMgc2VlIGJlbG93PC9hPjxiciAvPgo8YSBocmVmPSIvbm90aWZ5L1NNUy9vbi8wIj5kaXNwbGF5IFNNUyBub3RpZmljYXRpb24sIHBhcmFtZXRlcnMgc2VlIGJlbG93PC9hPjxiciAvPgo8YSBocmVmPSIvbm90aWZ5L0xpbmUvb24vMCI+ZGlzcGxheSBMaW5lIG5vdGlmaWNhdGlvbiwgcGFyYW1ldGVycyBzZWUgYmVsb3c8L2E+PGJyIC8+CjxhIGhyZWY9Ii9ub3RpZnkvSW5zdGFncmFtL29uLzAiPmRpc3BsYXkgSW5zdGFncmFtIG5vdGlmaWNhdGlvbiwgcGFyYW1ldGVycyBzZWUgYmVsb3c8L2E+PGJyIC8+CjxhIGhyZWY9Ii9ub3RpZnkvSGFuZ291dC9vbi8wIj5kaXNwbGF5IEhhbmdvdXQgbm90aWZpY2F0aW9uLCBwYXJhbWV0ZXJzIHNlZSBiZWxvdzwvYT48YnIgLz4KPGEgaHJlZj0iL25vdGlmeS9Hb29nbGVQbHVzL29uLzAiPmRpc3BsYXkgR29vZ2xlKyBub3RpZmljYXRpb24sIHBhcmFtZXRlcnMgc2VlIGJlbG93PC9hPjxiciAvPgovc3RvcmVub3RpZmljYXRpb24vYXBwYnVuZGxlIDY0KihSR0J8UlJHR0JCKSBSR0IgdHJ1ZXxmYWxzZSAtIGNyZWF0ZXMgYSBuZXcgbm90aWZpY2F0aW9uIGZvciBhcHAtYnVuZGxlbmFtZSB3aXRoIGNvbG9yLW1hdHJpeCBhbmQgU3VwZXJMRUQgY29sb3IgYW5kIGluaXRpYWwgZW5hYmxlZCBzdGF0dXM8YnIgLz4KPGJyIC8+CjxoMj5MOCBmcmFtZXM8L2gyPgovZGVsZXRlZnJhbWUvZnJhbWUjIC0gRGVsZXRlIEZyYW1lIGJ5IG51bWJlciAoYmV0d2VlbiAwIGFuZCBHZXROdW1GcmFtZXMpPGJyIC8+CjxhIGhyZWY9Ii9nZXRudW1mcmFtZXMiPmdldCB0aGUgbnVtYmVyIG9mIEZyYW1lcyBpbiBVc2VyIHNwYWNlPC9hPjxiciAvPgo8YSBocmVmPSIvcmVhZGZyYW1lLzEiPmdldHMgZnJhbWUgZnJvbSBVc2VyIFNwYWNlIChmcmFtZSMgYmV0d2VlbiAwIGFuZCBHZXROdW1GcmFtZXMpPC9hPjxiciAvPgovc3RvcmVmcmFtZS82NCooUkdCfFJSR0dCQikgLSBzdG9yZXMgYSBuZXcgZnJhbWUgaW4gdXNlcnNwYWNlIChyZXR1cm5zIG5ldyBpbmRleCBvZiBmcmFtZSk8YnIgLz4KPGJyIC8+CjxoMj5MOCBhbmltYXRpb25zPC9oMj4KL2RlbGV0ZWFuaW0vYW5pbSMgLSBEZWxldGUgQW5pbWF0aW9uIGJ5IG51bWJlciAoYmV0d2VlbiAwIGFuZCBHZXROdW1Bbmltcyk8YnIgLz4KPGEgaHJlZj0iL2dldG51bWFuaW1zIj5nZXQgdGhlIG51bWJlciBvZiBhbmltcyBpbiBVc2VyIHNwYWNlPC9hPjxiciAvPgo8YSBocmVmPSIvcGxheWFuaW0vMi9mYWxzZSI+cGxheXMgYW5pbWF0aW9uICMgYXMgbG9vcCA9IHRydWUgb3Igb25jZSA9IGZhbHNlOyBkZWZhdWx0OiBsb29wPXRydWU8L2E+PGJyIC8+CjxhIGhyZWY9Ii9yZWFkYW5pbS8yIj5nZXRzIGZyYW1lIGFuZCBkdXJhdGlvbiBmb3IgYW5pbWF0aW9uIGZyb20gVXNlciBTcGFjZSAoYW5pbSMgYmV0d2VlbiAwIGFuZCBHZXROdW1Bbmltcyk8L2E+PGJyIC8+CjxhIGhyZWY9Ii9zdG9wYW5pbSI+c3RvcHMgY3VycmVudCBhbmltYXRpb248L2E+PGJyIC8+Ci9zdG9yZUFuaW0vZnJhbWUjLGR1cmF0aW9uLGZyYW1lIyxkdXJhdGlvbiwuLi4gLSBzdG9yZXMgYSBuZXcgYW5pbWF0aW9uIGluIHVzZXJzcGFjZSAocmV0dXJucyBuZXcgaW5kZXggb2YgYW5pbSk8YnIgLz4KPGJyIC8+CjxoMj5MOCBtYXRyaXg8L2gyPgo8YSBocmVmPSIvYm94LzIvMi82LzYvZjAwLzAwZi8wZjAiPnNob3dzIGEgYm94IGZyb20gbGVmdC90b3AgdG8gcmlnaHQvYm90dG9tIHdpdGggYm9yZGVyLCBmaWxsIGFuZCBvdXRzaWRlIGNvbG9yPC9hPjxiciAvPgo8YSBocmVmPSIvYnJpZ2h0bmVzcy90cnVlIj5zZXQgaGlnaCBicmlnaHRuZXNzIG9mIExFRHMgKG1hdHJpeCBhbmQgc3VwZXIpIHRydWUgPSBoaWdoLCBmYWxzZSA9IGxvdywgZGVmYXVsdDogZmFsc2U8L2E+PGJyIC8+CjxhIGhyZWY9Ii9icmlnaHRuZXNzL2ZhbHNlIj5zZXQgbG93IGJyaWdodG5lc3Mgb2YgTEVEcyAobWF0cml4IGFuZCBzdXBlcikgdHJ1ZSA9IGhpZ2gsIGZhbHNlID0gbG93LCBkZWZhdWx0OiBmYWxzZTwvYT48YnIgLz4KPGEgaHJlZj0iL2dldG1hdHJpeCI+Z2V0IGN1cnJlbnQgTWF0cml4IExFRDwvYT48YnIgLz4KPGEgaHJlZj0iL2xlZC81LzUvRkZGIj4gc2V0IGEgc2luZ2xlIExFRCBwaXhlbDwvYT48YnIgLz4KPGEgaHJlZj0iL21hdHJpeGxlZHVuaS9mZmYiPnNldCBtYXRyaXggdG8gb25lIGNvbG9yLCBkZWZhdWx0OiAwMDAgPSBvZmY8L2E+PGJyIC8+CjxhIGhyZWY9Ii9tYXRyaXhsZWRzdHJpbmcvZjAwZjcwZmYwMGYwMDBmNDA4ODBmIj5zZXQgbWF0cml4IHRvIGNvbG9ybGlzdDwvYT48YnIgLz4KPGEgaHJlZj0iL21hdHJpeG9mZiI+Y2xlYXIgbWF0cml4PC9hPjxiciAvPgo8YnIgLz4KPGgyPkw4IHN1cGVyIExFRDwvaDI+CjxhIGhyZWY9Ii9zdXBlcmxlZC9mZjAiPnNldCBzdXBlcmxlZCB0byBjb2xvciwgZGVmYXVsdDogMDAwID0gb2ZmPC9hPjxiciAvPgo8YnIgLz4KPGgyPkw4IHRleHQ8L2gyPgo8YSBocmVmPSIvZGlzcGxheWNoYXIvQC90b3AvMCI+ZGlzcGxheXMgY2hhciB3aXRoIG9mZnNldCBpbiBwaXhlbHMgZnJvbSB0b3B8Ym90dG9tfGxlZnR8cmlnaHQ8L2E+PGJyIC8+CjxhIGhyZWY9Ii90ZXh0L2ZmMC9IZWxsbyUyMFdvcmxkLzAvZmFsc2UiPnNjcm9sbGluZyB0ZXh0IChtYXggbGVuZ3RoOiAxOCwgY29sb3IgYW5kIHRleHQgYXJlIHJlcXVpcmVkIHBhcmFtZXRlcikgd2l0aCBzcGVlZCAwID0gZmFzdCwgMSA9IG1lZGl1bSwgMiA9IHNsb3cgYW5kIHRydWV8ZmFsc2UgZm9yIGxvb3AsIERlZmF1bHQ6IGxvb3AgPSB0cnVlPC9hPjxiciAvPgo8YnIgLz4KPGgyPkw4IGFkLWhvYyBhbmltYXRpb25zPC9oMj4KPGEgaHJlZj0iL3JlcGVhdC8xMC8xMDAwL2dldHRlbXAiPnJlcGVhdHMgYWxsIGNvbW1hbmRzIG51bWJlciBvZiB0aW1lcyBzcGVjaWZpZWQgb3IgZm9yZXZlciB3aXRoIG9wdGlvbmFsIGRlbGF5IChzcGVjaWZpZWQgaW4gMTAwdGggb2YgYSBzZWNvbmQpIGJldHdlZW4gY29tbWFuZHM8L2E+PGJyIC8+CjxhIGhyZWY9Ii9yZXBlYXRzaWxlbnQvMjAvNTAvc3VwZXIvNDAwL3N1cGVyLzgwMC9zdXBlci9jMDAvc3VwZXIvZjAwL3N1cGVyLzgwMC9zdXBlci8wMDAiPnJlcGVhdHMgYWxsIGNvbW1hbmRzIG51bWJlciBvZiB0aW1lcyBzcGVjaWZpZWQgb3IgZm9yZXZlciB3aXRoIG9wdGlvbmFsIGRlbGF5IChzcGVjaWZpZWQgaW4gMTAwdGggb2YgYSBzZWNvbmQpIGJldHdlZW4gY29tbWFuZHMgd2l0aG91dCBwcmludGluZyByZXNwb25zZXMgZnJvbSBMODwvYT48YnIgLz4KPGEgaHJlZj0iL3JlcGVhdHNpbGVudC8xMC83NS9zdXBlci9mMDAvc3VwZXIvMDAwL3N1cGVyLzAwZi9zdXBlci8wMDAvIj5yZWQvYmx1ZSBibGlua2luZyBzdXBlcjwvYT48YnIgLz4KPGEgaHJlZj0iL3JlcGVhdHNpbGVudC8xNS81MC9tYXRyaXhzdHJpbmcvZjAwZjcwZmYwMGYwMDBmNDA4ODBmL21hdHJpeHN0cmluZy9mNzBmZjAwZjAwMGY0MDg4MGZmMDAvbWF0cml4c3RyaW5nL2ZmMDBmMDAwZjQwODgwZmYwMGY3MC9tYXRyaXhzdHJpbmcvMGYwMDBmNDA4ODBmZjAwZjcwZmYwL21hdHJpeHN0cmluZy8wMGY0MDg4MGZmMDBmNzBmZjAwZjAvbWF0cml4c3RyaW5nLzQwODgwZmYwMGY3MGZmMDBmMDAwZi9tYXRyaXhzdHJpbmcvODBmZjAwZjcwZmYwMGYwMDBmNDA4Ij5yYWluYm93IGFuaW1hdGlvbjwvYT48YnIgLz4KPGJyIC8+CjxoMj5MOCBzZXJpYWwgcG9ydDwvaDI+CjxhIGhyZWY9Ii9pbnRlcmZhY2UvJTJGZGV2JTJGdHR5QUNNMS9tYXRyaXhvZmYiPmNoYW5nZXMgc2V0cyBDT00tcG9ydCwgZGVmYXVsdDogOjpzZXJpYWxQb3J0Ojo8L2E+PGJyIC8+CjxiciAvPgo8aDI+TDggbWlzYzwvaDI+CjxhIGhyZWY9Ii9ib290bG9hZGVyIj5zd2l0Y2ggdG8gREZVIG1vZGU8L2E+PGJyIC8+CjxhIGhyZWY9Ii9kZWxheS81MC9zdXBlci9mMDAvc3VwZXIvMDBmL3N1cGVyL2YwMC9zdXBlci8wMGYvc3VwZXIvMDAwIj5kZWxheSBpbiBtcyBiZXR3ZWVuIGNvbW1hbmRzIHdoZW4gc2VuZGluZyBtdWx0aXBsZSBjb21tYW5kcyAtIERlZmF1bHQ6IDEwMDwvYT48YnIgLz4KL2RlbGV0ZXVzZXJzcGFjZS9ZRVMgLSBEZWxldGUgdXNlcnNwYWNlIChzZXQgWUVTIHRvIGRlbGV0ZSk8YnIgLz4KPGEgaHJlZj0iL2luaXQiPmdldCB0cmFjZSBpbmZvPC9hPjxiciAvPgo8YSBocmVmPSIvcG93ZXJvZmYiPnBvd2Vyb2ZmPC9hPjxiciAvPgo8YSBocmVmPSIvcmVzZXQiPnJlc2V0PC9hPjxiciAvPgo8YSBocmVmPSIvc3RhdHVzbGVkL2ZhbHNlIj50dXJuIHN0YXR1cyBMRURzIG9uIG9yIG9mZiwgZGVmYXVsdDogZmFsc2UgPSBvZmY8L2E+PGJyIC8+CjxhIGhyZWY9Ii91aWQiPnF1ZXJ5IGRldmljZSBVSUQ8L2E+PGJyIC8+CjxhIGhyZWY9Ii92ZXJzaW9uIj5xdWVyeSBkZXZpY2UgdmVyc2lvbnM8L2E+PGJyIC8+CjxiciAvPgo8L2JvZHk+CjwvaHRtbD4K"}];
var __map_reserved = {}
haxe_Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe_Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe_Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe_Template.expr_int = new EReg("^[0-9]+$","");
haxe_Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe_Template.globals = { };
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
hxl8_L8CmdParser.__meta__ = { fields : { parse : { SuppressWarnings : [["checkstyle:CyclomaticComplexity","checkstyle:MethodLength"]]}, consumeArgColorArray : { SuppressWarnings : ["checkstyle:CyclomaticComplexity"]}}};
hxl8_L8CmdParser.m_commands = ["appstop","stop","appambient","appdice","dice","applight","appcolorchange","colorchange","appproximity","appprox","autorotate","bootloader","dfu","batchg","bat","brightness","bright","box","button","deletel8y","deleteanim","deleteframe","deleteusermemory","deleteuserspace","displaychar","char","enableallnotifications","enableallnotify","enablenotification","enablenotify","notifyenable","getacc","accelerator","acc","getamb","ambient","amb","getmatrix","getmcutemp","mcutemperature","mcutemp","getmic","microphone","mic","noise","getnoise","getnotifyapp","readnotifyapp","getnotify","readnotify","getnumnotifyapps","numnotifyapps","numnotify","getnumanims","numanims","getnumframes","numframes","numframe","getnuml8ies","getnuml8y","numl8ies","numl8y","getprox","proximity","prox","getthreshold","sensorthresholds","thresholds","threshold","gettemp","temperature","temp","getvoltage","voltage","getvbus","vbus","init","initstatus","status","interface","int","if","matrixoff","matrixclear","clear","poweroff","off","notificationssilent","notification","notify","party","playanim","play","ping","readanim","readframe","readl8y","silentrepeat","repeat","repeatsilent","reset","setmatrixledfile","matrixledfile","matrixfile","setled","led","setl8y","l8y","setmatrixledstring","matrixledstring","matrixstring","setnotificationsilence","silence","silent","setmatrixleduni","matrixleduni","matrixuni","setsuperled","superled","super","setorientation","orientation","orient","setambthreshold","ambthreshold","setnoisethreshold","noisethreshold","setproxthreshold","proxthreshold","statusleds","statusled","stopanim","storeanim","storel8y","storel8yfile","storeframe","storeframefile","storenotification","storenotify","setnotify","setnotification","text","uid","version","versions","ver","v","hex","csv","csvheader","csvhead","numanim","delay"];
hxl8_L8NodeSrv.__meta__ = { fields : { checkComPortsAndRun : { SuppressWarnings : ["checkstyle:Dynamic"]}}};
hxl8_L8RGB.__meta__ = { fields : { parseDigit : { SuppressWarnings : ["checkstyle:CyclomaticComplexity"]}}};
hxl8_L8ReceiverBase.__meta__ = { statics : { processCommand : { SuppressWarnings : ["checkstyle:CyclomaticComplexity"]}}};
hxl8_commands_L8CmdBox.__meta__ = { fields : { _ : { SuppressWarnings : ["checkstyle:CyclomaticComplexity"]}}};
hxl8_commands_L8CmdSetText.MAX_LENGTH = 18;
hxl8_nodejs_Serial.__meta__ = { obj : { SuppressWarnings : ["checkstyle:Dynamic","checkstyle:Trace"]}};
hxl8_responses_L8ResponseTraceMsg.__meta__ = { fields : { toString : { SuppressWarnings : ["checkstyle:CyclomaticComplexity"]}}};
js_Boot.__toStr = {}.toString;
js_NodeC.UTF8 = "utf8";
js_NodeC.ASCII = "ascii";
js_NodeC.BINARY = "binary";
js_NodeC.BASE64 = "base64";
js_NodeC.HEX = "hex";
js_NodeC.EVENT_EVENTEMITTER_NEWLISTENER = "newListener";
js_NodeC.EVENT_EVENTEMITTER_ERROR = "error";
js_NodeC.EVENT_STREAM_DATA = "data";
js_NodeC.EVENT_STREAM_END = "end";
js_NodeC.EVENT_STREAM_ERROR = "error";
js_NodeC.EVENT_STREAM_CLOSE = "close";
js_NodeC.EVENT_STREAM_DRAIN = "drain";
js_NodeC.EVENT_STREAM_CONNECT = "connect";
js_NodeC.EVENT_STREAM_SECURE = "secure";
js_NodeC.EVENT_STREAM_TIMEOUT = "timeout";
js_NodeC.EVENT_STREAM_PIPE = "pipe";
js_NodeC.EVENT_PROCESS_EXIT = "exit";
js_NodeC.EVENT_PROCESS_UNCAUGHTEXCEPTION = "uncaughtException";
js_NodeC.EVENT_PROCESS_SIGINT = "SIGINT";
js_NodeC.EVENT_PROCESS_SIGUSR1 = "SIGUSR1";
js_NodeC.EVENT_CHILDPROCESS_EXIT = "exit";
js_NodeC.EVENT_HTTPSERVER_REQUEST = "request";
js_NodeC.EVENT_HTTPSERVER_CONNECTION = "connection";
js_NodeC.EVENT_HTTPSERVER_CLOSE = "close";
js_NodeC.EVENT_HTTPSERVER_UPGRADE = "upgrade";
js_NodeC.EVENT_HTTPSERVER_CLIENTERROR = "clientError";
js_NodeC.EVENT_HTTPSERVERREQUEST_DATA = "data";
js_NodeC.EVENT_HTTPSERVERREQUEST_END = "end";
js_NodeC.EVENT_CLIENTREQUEST_RESPONSE = "response";
js_NodeC.EVENT_CLIENTRESPONSE_DATA = "data";
js_NodeC.EVENT_CLIENTRESPONSE_END = "end";
js_NodeC.EVENT_NETSERVER_CONNECTION = "connection";
js_NodeC.EVENT_NETSERVER_CLOSE = "close";
js_NodeC.FILE_READ = "r";
js_NodeC.FILE_READ_APPEND = "r+";
js_NodeC.FILE_WRITE = "w";
js_NodeC.FILE_WRITE_APPEND = "a+";
js_NodeC.FILE_READWRITE = "a";
js_NodeC.FILE_READWRITE_APPEND = "a+";
js_Node.console = console;
js_Node.process = process;
js_Node.require = require;
js_Node.setTimeout = setTimeout;
js_Node.clearTimeout = clearTimeout;
js_Node.setInterval = setInterval;
js_Node.clearInterval = clearInterval;
js_Node.setImmediate = (function($this) {
	var $r;
	var version = HxOverrides.substr(js_Node.process.version,1,null).split(".").map(Std.parseInt);
	$r = version[0] > 0 || version[1] >= 9?js_Node.isNodeWebkit()?global.setImmediate:setImmediate:null;
	return $r;
}(this));
js_Node.clearImmediate = (function($this) {
	var $r;
	var version = HxOverrides.substr(js_Node.process.version,1,null).split(".").map(Std.parseInt);
	$r = version[0] > 0 || version[1] >= 9?js_Node.isNodeWebkit()?global.clearImmediate:clearImmediate:null;
	return $r;
}(this));
js_Node.global = global;
js_Node.module = js_Node.isNodeWebkit()?global.module:module;
js_Node.stringify = JSON.stringify;
js_Node.parse = JSON.parse;
hxl8_L8NodeSrv.main();
})(typeof console != "undefined" ? console : {log:function(){}});
