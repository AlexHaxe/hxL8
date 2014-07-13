(function () { "use strict";
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
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
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
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
IMap.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
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
	return js.Node.process.argv;
};
Sys.getEnv = function(key) {
	return Reflect.field(js.Node.process.env,key);
};
Sys.environment = function() {
	return js.Node.process.env;
};
Sys.exit = function(code) {
	js.Node.process.exit(code);
};
Sys.time = function() {
	return Date.now() / 1000;
};
var haxe = {};
haxe.Resource = function() { };
haxe.Resource.__name__ = true;
haxe.Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe.crypto.Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
haxe._Template = {};
haxe._Template.TemplateExpr = { __ename__ : true, __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] };
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; };
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; };
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; };
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; };
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; };
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; };
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; };
haxe.Template = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw "Unexpected '" + Std.string(tokens.first().s) + "'";
};
haxe.Template.__name__ = true;
haxe.Template.prototype = {
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
		var $it0 = this.stack.iterator();
		while( $it0.hasNext() ) {
			var ctx = $it0.next();
			if(Object.prototype.hasOwnProperty.call(ctx,v)) return Reflect.field(ctx,v);
		}
		if(v == "__current__") return this.context;
		return Reflect.field(haxe.Template.globals,v);
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe.Template.splitter.match(data)) {
			var p = haxe.Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe.Template.splitter.matchedRight();
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
				} else if(c == null) throw "Unclosed macro parenthesis";
				if(c == 44 && npar == 1) {
					params.push(part);
					part = "";
				} else part += String.fromCharCode(c);
			}
			params.push(part);
			tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
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
		return haxe._Template.TemplateExpr.OpBlock(l);
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0;
			var _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe._Template.TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw "Unclosed 'if'";
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw "Unclosed 'else'";
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e1 = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t2 = tokens.pop();
			if(t2 == null || t2.p != "end") throw "Unclosed 'foreach'";
			return haxe._Template.TemplateExpr.OpForeach(e1,efor);
		}
		if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe._Template.TemplateExpr.OpVar(p);
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe.Template.expr_splitter.match(data)) {
			var p = haxe.Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe.Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe.Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw l.first().p;
		} catch( s ) {
			if( js.Boot.__instanceof(s,String) ) {
				throw "Unexpected '" + s + "' in " + expr;
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				throw "Error : " + Std.string(exc) + " in " + expr;
			}
		};
	}
	,makeConst: function(v) {
		haxe.Template.expr_trim.match(v);
		v = haxe.Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe.Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe.Template.expr_float.match(v)) {
			var f = Std.parseFloat(v);
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
		if(field == null || !field.s) throw field.p;
		var f = field.p;
		haxe.Template.expr_trim.match(f);
		f = haxe.Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw "<eof>";
		if(p.s) return this.makeConst(p.p);
		var _g = p.p;
		switch(_g) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw p1.p;
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw p2.p;
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
				throw "Unknown operation " + p1.p;
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
		throw p.p;
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
			var $it0 = l.iterator();
			while( $it0.hasNext() ) {
				var e3 = $it0.next();
				this.run(e3);
			}
			break;
		case 5:
			var loop = e[3];
			var e4 = e[2];
			var v2 = e4();
			try {
				var x = $iterator(v2)();
				if(x.hasNext == null) throw null;
				v2 = x;
			} catch( e5 ) {
				try {
					if(v2.hasNext == null) throw null;
				} catch( e6 ) {
					throw "Cannot iter on " + Std.string(v2);
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
			var pl = new Array();
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var $it1 = params.iterator();
			while( $it1.hasNext() ) {
				var p = $it1.next();
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
				this.buf.add(Std.string(v4.apply(this.macros,pl)));
			} catch( e7 ) {
				var plstr;
				try {
					plstr = pl.join(",");
				} catch( e8 ) {
					plstr = "???";
				}
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e7) + ")";
				throw msg;
			}
			break;
		}
	}
	,__class__: haxe.Template
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.__name__ = true;
haxe.io.Bytes.alloc = function(length) {
	return new haxe.io.Bytes(length,new Buffer(length));
};
haxe.io.Bytes.ofString = function(s) {
	var nb = new Buffer(s,"utf8");
	return new haxe.io.Bytes(nb.length,nb);
};
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		src.b.copy(this.b,pos,srcpos,srcpos + len);
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var nb = new Buffer(len);
		var slice = this.b.slice(pos,pos + len);
		slice.copy(nb,0,0,len);
		return new haxe.io.Bytes(len,nb);
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
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
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
	,toString: function() {
		return this.readString(0,this.length);
	}
	,toHex: function() {
		var s = new StringBuf();
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
			s.b += String.fromCharCode(chars[c >> 4]);
			s.b += String.fromCharCode(chars[c & 15]);
		}
		return s.b;
	}
	,getData: function() {
		return this.b;
	}
	,__class__: haxe.io.Bytes
};
haxe.crypto = {};
haxe.crypto.Base64 = function() { };
haxe.crypto.Base64.__name__ = true;
haxe.crypto.Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe.crypto.BaseCode(haxe.crypto.Base64.BYTES).decodeBytes(haxe.io.Bytes.ofString(str));
};
haxe.crypto.BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
haxe.crypto.BaseCode.__name__ = true;
haxe.crypto.BaseCode.prototype = {
	initTable: function() {
		var tbl = new Array();
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
		var out = haxe.io.Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw "BaseCode : invalid encoded char";
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe.crypto.BaseCode
};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
haxe.io.BytesBuffer = function() {
	this.b = new Array();
};
haxe.io.BytesBuffer.__name__ = true;
haxe.io.BytesBuffer.prototype = {
	addByte: function($byte) {
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
		if(pos < 0 || len < 0 || pos + len > src.length) throw haxe.io.Error.OutsideBounds;
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
		var bytes = new haxe.io.Bytes(nb.length,nb);
		this.b = null;
		return bytes;
	}
	,__class__: haxe.io.BytesBuffer
};
haxe.io.Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; return $x; };
var hxl8 = {};
hxl8.L8CmdParser = function(args,overwriteComPort) {
	this.csvHeader = false;
	this.csv = false;
	this.hex = false;
	this.silent = false;
	this.comPort = "/dev/ttyACM0";
	this.delay = 100;
	this.repeatsDelay = 10;
	this.repeatsCount = 0;
	this.repeatForever = false;
	this.repeat = false;
	this.needResponse = false;
	this.commands = new Array();
	if(overwriteComPort != null) this.comPort = overwriteComPort;
	this.parse(args);
};
hxl8.L8CmdParser.__name__ = true;
hxl8.L8CmdParser.prototype = {
	parse: function(args) {
		if(args.length <= 0) return;
		var param;
		try {
			while(args.length > 0) {
				var command = args.shift();
				var _g = command.toLowerCase();
				switch(_g) {
				case "appstop":case "stop":
					this.commands.push(new hxl8.commands.L8CmdAppStop());
					break;
				case "appambient":
					this.commands.push(new hxl8.commands.L8CmdAppStop());
					var matrixRGB = this.consumeArgColor(args,"F00");
					var superRGB = this.consumeArgColor(args,"F00");
					var threshold = this.consumeArgInt(args,50);
					this.commands.push(new hxl8.commands.L8CmdAppRunAmbient(matrixRGB,superRGB,threshold));
					break;
				case "appdice":case "dice":
					this.commands.push(new hxl8.commands.L8CmdAppStop());
					var rgb = this.consumeArgColor(args,"F00");
					this.commands.push(new hxl8.commands.L8CmdAppRunDice(rgb));
					break;
				case "applight":case "appcolorchange":case "colorchange":
					this.commands.push(new hxl8.commands.L8CmdAppStop());
					var color = args.shift();
					var speed = this.consumeArgInt(args,64);
					var inverted = this.consumeArgBool(args,false);
					this.commands.push(new hxl8.commands.L8CmdAppRunColorChanger(color,speed,inverted));
					break;
				case "appproximity":case "appprox":
					this.commands.push(new hxl8.commands.L8CmdAppStop());
					var matrixRGB1 = this.consumeArgColor(args,"F00");
					var superRGB1 = this.consumeArgColor(args,"F00");
					var threshold1 = this.consumeArgInt(args,50);
					this.commands.push(new hxl8.commands.L8CmdAppRunProximity(matrixRGB1,superRGB1,threshold1));
					break;
				case "autorotate":
					var enable = this.consumeArgBool(args,true);
					this.commands.push(new hxl8.commands.L8CmdEnableAutoRotate(enable));
					break;
				case "bootloader":case "dfu":
					this.commands.push(new hxl8.commands.L8CmdBootloader());
					break;
				case "batchg":case "bat":
					this.commands.push(new hxl8.commands.L8CmdQueryBatChg());
					break;
				case "brightness":case "bright":
					var brightness = this.consumeArgBool(args,false);
					this.commands.push(new hxl8.commands.L8CmdSetBrightness(brightness));
					break;
				case "box":
					var left = this.consumeArgInt(args,2);
					var top = this.consumeArgInt(args,2);
					var right = this.consumeArgInt(args,6);
					var bottom = this.consumeArgInt(args,6);
					var border = this.consumeArgColor(args,"F00");
					var fill = this.consumeArgColor(args,"00F");
					var outer = this.consumeArgColor(args,"000");
					this.commands.push(new hxl8.commands.L8CmdBox(left,top,right,bottom,border,fill,outer));
					break;
				case "button":
					this.commands.push(new hxl8.commands.L8CmdQueryButton());
					break;
				case "deletel8y":
					var l8y = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdDeleteL8y(l8y));
					break;
				case "deleteanim":
					var anim = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdDeleteAnim(anim));
					break;
				case "deleteframe":
					var frame = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdDeleteFrame(frame));
					break;
				case "deleteusermemory":case "deleteuserspace":
					var really = args.shift();
					if(really != "YES") throw "__break__";
					this.commands.push(new hxl8.commands.L8CmdDeleteUserMemory());
					break;
				case "displaychar":case "char":
					var $char = args.shift();
					var direction = args.shift();
					var offset = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdDisplayChar($char,direction,offset));
					break;
				case "enableallnotifications":case "enableallnotify":
					var enable1 = this.consumeArgBool(args,true);
					this.commands.push(new hxl8.commands.L8CmdEnableAllNotifications(enable1));
					break;
				case "enablenotification":case "enablenotify":case "notifyenable":
					var index = this.consumeArgInt(args,0);
					var enable2 = this.consumeArgBool(args,true);
					this.commands.push(new hxl8.commands.L8CmdEnableNotification(index,enable2));
					break;
				case "getacc":case "accelerator":case "acc":
					this.commands.push(new hxl8.commands.L8CmdQueryAcc());
					break;
				case "getamb":case "ambient":case "amb":
					this.commands.push(new hxl8.commands.L8CmdQueryAmbientLight());
					break;
				case "getmatrix":
					this.commands.push(new hxl8.commands.L8CmdGetCurrentMatrix());
					break;
				case "getmcutemp":case "mcutemperature":case "mcutemp":
					this.commands.push(new hxl8.commands.L8CmdQueryMCUTemp());
					break;
				case "getmic":case "microphone":case "mic":case "noise":case "getnoise":
					this.commands.push(new hxl8.commands.L8CmdQueryNoise());
					break;
				case "getnotifyapp":case "readnotifyapp":case "getnotify":case "readnotify":
					var index1 = this.consumeArgInt(args,0);
					var extended = this.consumeArgBool(args,true);
					this.commands.push(new hxl8.commands.L8CmdGetNotifyApp(index1,extended));
					break;
				case "getnumnotifyapps":case "numnotifyapps":case "numnotify":
					this.commands.push(new hxl8.commands.L8CmdGetNumNotifyApps());
					break;
				case "getnumanims":case "numanims":case "numanim":
					this.commands.push(new hxl8.commands.L8CmdQueryNumAnims());
					break;
				case "getnumframes":case "numframes":case "numframe":
					this.commands.push(new hxl8.commands.L8CmdQueryNumFrames());
					break;
				case "getnuml8ies":case "getnuml8y":case "numl8ies":case "numl8y":
					this.commands.push(new hxl8.commands.L8CmdQueryNumL8ies());
					break;
				case "getprox":case "proximity":case "prox":
					this.commands.push(new hxl8.commands.L8CmdQueryProximity());
					break;
				case "getthreshold":case "sensorthresholds":case "thresholds":case "threshold":
					this.commands.push(new hxl8.commands.L8CmdQuerySensorThresholds());
					break;
				case "gettemp":case "temperature":case "temp":
					this.commands.push(new hxl8.commands.L8CmdQueryTemp());
					break;
				case "getvoltage":case "voltage":
					this.commands.push(new hxl8.commands.L8CmdQueryVoltage());
					break;
				case "getvbus":case "vbus":
					this.commands.push(new hxl8.commands.L8CmdQueryVBUSVoltage());
					break;
				case "init":case "initstatus":case "status":
					this.commands.push(new hxl8.commands.L8CmdQueryInitStatus());
					break;
				case "interface":case "int":case "if":
					this.comPort = args.shift();
					break;
				case "matrixoff":case "matrixclear":case "clear":
					this.commands.push(new hxl8.commands.L8CmdMatrixOff());
					break;
				case "poweroff":case "off":
					this.commands.push(new hxl8.commands.L8CmdPowerOff());
					break;
				case "notificationssilent":
					this.commands.push(new hxl8.commands.L8CmdQueryNotificationsSilent());
					break;
				case "notification":case "notify":
					var app = args.shift();
					var eventType = args.shift();
					var category = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdSetNotification(app,eventType,category));
					break;
				case "party":
					this.commands.push(new hxl8.commands.L8CmdAppStop());
					this.commands.push(new hxl8.commands.L8CmdAppRunParty());
					break;
				case "playanim":case "play":
					var anim1 = this.consumeArgInt(args,0);
					var loop = this.consumeArgBool(args,true);
					this.commands.push(new hxl8.commands.L8CmdPlayAnim(anim1,loop));
					break;
				case "ping":
					this.commands.push(new hxl8.commands.L8CmdSendPing());
					break;
				case "readanim":
					var anim2 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdReadAnim(anim2));
					break;
				case "readframe":
					var frame1 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdReadFrame(frame1));
					break;
				case "readl8y":
					var l8y1 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdReadL8y(l8y1));
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
					if(command == "repeatsilent" || command == "silentrepeat") this.silent = true;
					break;
				case "reset":
					this.commands.push(new hxl8.commands.L8CmdReset());
					break;
				case "setled":case "led":
					var x = this.consumeArgInt(args,0);
					var y = this.consumeArgInt(args,0);
					var rgb1 = this.consumeArgColor(args,"000");
					this.commands.push(new hxl8.commands.L8CmdSetLED(x,y,rgb1));
					break;
				case "setl8y":case "l8y":
					var index2 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdSetStoredL8y(index2));
					break;
				case "setmatrixledstring":case "matrixledstring":case "matrixstring":
					var rgb2 = this.consumeArgColorArray(args,"000");
					this.commands.push(new hxl8.commands.L8CmdSetMatrixLEDArray(rgb2));
					break;
				case "setnotificationsilence":case "silence":case "silent":
					var silence = this.consumeArgBool(args,false);
					this.commands.push(new hxl8.commands.L8CmdSetNotificationsSilence(silence));
					break;
				case "setmatrixleduni":case "matrixleduni":case "matrixuni":
					var rgb3 = this.consumeArgColor(args,"000");
					this.commands.push(new hxl8.commands.L8CmdSetMatrixLEDUni(rgb3));
					break;
				case "setsuperled":case "superled":case "super":
					var rgb4 = this.consumeArgColor(args,"000");
					this.commands.push(new hxl8.commands.L8CmdSetSuperLED(rgb4));
					break;
				case "setorientation":case "orientation":case "orient":
					var orient = args.shift();
					this.commands.push(new hxl8.commands.L8CmdSetOrientation(orient));
					break;
				case "setambthreshold":case "ambthreshold":
					var min = this.consumeArgInt(args,0);
					var max = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdSetAmbThreshold(min,max));
					break;
				case "setnoisethreshold":case "noisethreshold":
					var min1 = this.consumeArgInt(args,0);
					var max1 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdSetNoiseThreshold(min1,max1));
					break;
				case "setproxthreshold":case "proxthreshold":
					var min2 = this.consumeArgInt(args,0);
					var max2 = this.consumeArgInt(args,0);
					this.commands.push(new hxl8.commands.L8CmdSetProxThreshold(min2,max2));
					break;
				case "statusleds":case "statusled":
					var enable3 = this.consumeArgBool(args,false);
					this.commands.push(new hxl8.commands.L8CmdEnableStatusLEDs(enable3));
					break;
				case "stopanim":
					this.commands.push(new hxl8.commands.L8CmdStopAnim());
					break;
				case "storeanim":
					var anim3 = args.shift();
					this.commands.push(new hxl8.commands.L8CmdStoreAnim(anim3));
					break;
				case "storel8y":
					var rgb5 = this.consumeArgColorArray(args,"000");
					this.commands.push(new hxl8.commands.L8CmdStoreL8y(rgb5));
					break;
				case "storeframe":
					var rgb6 = this.consumeArgColorArray(args,"000");
					this.commands.push(new hxl8.commands.L8CmdStoreFrame(rgb6));
					break;
				case "storenotification":case "storenotify":case "setnotify":case "setnotification":
					var app1 = args.shift();
					var rgb7 = this.consumeArgColorArray(args,"000");
					var superLED = this.consumeArgColor(args,"000");
					var enable4 = this.consumeArgBool(args,false);
					this.commands.push(new hxl8.commands.L8CmdStoreNotification(app1,rgb7,superLED,enable4));
					break;
				case "text":
					var rgb8 = this.consumeArgColor(args,"F00");
					var text = args.shift();
					if(text == null) continue;
					var speed1 = this.consumeArgInt(args,0);
					var loop1 = this.consumeArgBool(args,true);
					this.commands.push(new hxl8.commands.L8CmdSetText(speed1,loop1,rgb8,text));
					break;
				case "uid":
					this.commands.push(new hxl8.commands.L8CmdQueryMCUID());
					break;
				case "version":case "versions":case "ver":case "v":
					this.commands.push(new hxl8.commands.L8CmdQueryVersions());
					break;
				case "hex":
					this.hex = true;
					this.csv = false;
					break;
				case "csv":
					this.hex = false;
					this.csv = true;
					break;
				case "csvheader":case "csvhead":
					this.hex = false;
					this.csv = true;
					this.csvHeader = true;
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
		var _g1 = hxl8.L8CmdParser.m_commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			if(command == lowerCase) return true;
		}
		return false;
	}
	,consumeArgColor: function(args,defaultRGB) {
		if(args.length <= 0) return new hxl8.L8RGB(defaultRGB);
		var rawVal = args.shift();
		if(this.argIsCommand(rawVal)) {
			args.unshift(rawVal);
			return new hxl8.L8RGB(defaultRGB);
		}
		var r = new EReg("^[0-9a-fA-F]+$","");
		if(!r.match(rawVal)) {
			args.unshift(rawVal);
			return new hxl8.L8RGB(defaultRGB);
		}
		if(rawVal.length != 3 && rawVal.length != 6) {
			args.unshift(rawVal);
			return new hxl8.L8RGB(defaultRGB);
		}
		return new hxl8.L8RGB(rawVal);
	}
	,consumeArgColorArray: function(args,defaultRGB) {
		var result = new Array();
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
					rgb = new hxl8.L8RGB(HxOverrides.substr(values,index * 3,3));
					result.push(rgb);
				}
				return result;
			}
			if(values.length == 384) {
				var _g1 = 0;
				while(_g1 < 64) {
					var index1 = _g1++;
					rgb = new hxl8.L8RGB(HxOverrides.substr(values,index1 * 6,6));
					result.push(rgb);
				}
				return result;
			}
			if(values.length < 192) {
				var count = values.length / 3 | 0;
				var _g2 = 0;
				while(_g2 < 64) {
					var index2 = _g2++;
					rgb = new hxl8.L8RGB(HxOverrides.substr(values,index2 % count * 3,3));
					result.push(rgb);
				}
				return result;
			}
		}
		var _g3 = 0;
		while(_g3 < 64) {
			var index3 = _g3++;
			result.push(new hxl8.L8RGB(defaultRGB));
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
	,__class__: hxl8.L8CmdParser
};
hxl8.L8CmdQueueSender = function(serial,commands,delay,responseHandler) {
	if(delay == null) delay = 100;
	this.serial = serial;
	this.commands = commands;
	this.delay = delay;
	this.responseHandler = responseHandler;
};
hxl8.L8CmdQueueSender.__name__ = true;
hxl8.L8CmdQueueSender.prototype = {
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
		js.Node.setTimeout($bind(this,this.sendNext),this.delay);
	}
	,finish: function() {
		if(this.finishCallback != null) this.finishCallback();
	}
	,__class__: hxl8.L8CmdQueueSender
};
hxl8.L8CmdRepeatingQueueSender = function(serial,commands,delay,count,forever,responseHandler) {
	this.currentIndex = 0;
	this.repeatsCount = 0;
	this.repeatForever = false;
	hxl8.L8CmdQueueSender.call(this,serial,commands,delay,responseHandler);
	this.repeatForever = forever;
	this.repeatsCount = count;
};
hxl8.L8CmdRepeatingQueueSender.__name__ = true;
hxl8.L8CmdRepeatingQueueSender.__super__ = hxl8.L8CmdQueueSender;
hxl8.L8CmdRepeatingQueueSender.prototype = $extend(hxl8.L8CmdQueueSender.prototype,{
	start: function() {
		this.currentIndex = 0;
		hxl8.L8CmdQueueSender.prototype.start.call(this);
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
		js.Node.setTimeout($bind(this,this.sendNext),this.delay);
	}
	,__class__: hxl8.L8CmdRepeatingQueueSender
});
hxl8.L8NodeSrv = function(tcpPort,serialPort) {
	this.serial = null;
	this.server = null;
	this.tcpPort = tcpPort;
	this.serialPort = serialPort;
	this.server = js.Node.require("http").createServer($bind(this,this.handleRequest));
	this.server.listen(this.tcpPort,"0.0.0.0");
};
hxl8.L8NodeSrv.__name__ = true;
hxl8.L8NodeSrv.main = function() {
	var tcpPort = 1818;
	var serialPort = null;
	var args = Sys.args();
	if(args.length > 2) tcpPort = Std.parseInt(args[2]);
	if(args.length > 3) serialPort = args[3];
	var srv = new hxl8.L8NodeSrv(tcpPort,serialPort);
};
hxl8.L8NodeSrv.prototype = {
	handleRequest: function(req,res) {
		var _g = this;
		var urlParts = js.Node.require("url").parse(req.url,true);
		var rawArgs = urlParts.pathname.split("/");
		var args = new Array();
		var _g1 = 0;
		while(_g1 < rawArgs.length) {
			var arg = rawArgs[_g1];
			++_g1;
			args.push(js.Node.require("querystring").unescape(arg));
		}
		if(args.length > 0) {
			if(args[0] == "") args.shift();
		}
		var parser = new hxl8.L8CmdParser(args,this.serialPort);
		this.serialPort = parser.comPort;
		if(parser.commands.length <= 0) {
			this.showCommandPage(res);
			return;
		}
		res.setHeader("Content-Type","text/plain");
		res.writeHead(200);
		var responseHandler = new hxl8.L8ResponseHandler();
		responseHandler.setCSV(parser.csv);
		responseHandler.setCSVHeader(parser.csvHeader);
		responseHandler.setHex(parser.hex);
		responseHandler.setSilent(parser.silent);
		hxl8.nodejs.Serial.getDeviceList(function(comPorts) {
			_g.checkComPortsAndRun(res,parser,responseHandler,comPorts);
		});
	}
	,checkComPortsAndRun: function(res,parser,responseHandler,comPorts) {
		var _g = this;
		var found = false;
		var $it0 = comPorts.keys();
		while( $it0.hasNext() ) {
			var comPort = $it0.next();
			if(comPort == parser.comPort) {
				found = true;
				break;
			}
		}
		if(!found) {
			this.showComPorts(res,parser.comPort,comPorts);
			return;
		}
		var serial = null;
		try {
			serial = new hxl8.nodejs.Serial(parser.comPort,9600,true);
		} catch( e ) {
			res.end(Std.string(e));
			return;
		}
		serial.setOpenHandler(function() {
			try {
				_g.handleCommands(serial,parser,res,responseHandler);
			} catch( e1 ) {
				res.end(Std.string(e1));
			}
		});
		var output = new Array();
		var lines;
		serial.setDataHandler(function(data) {
			lines = _g.handleResponse(haxe.io.Bytes.ofData(data),responseHandler);
			var _g1 = 0;
			while(_g1 < lines.length) {
				var line = lines[_g1];
				++_g1;
				output.push(line);
			}
			if(responseHandler.isFinished()) {
				res.end(output.join("\n"));
				serial.close();
			}
		});
	}
	,handleResponse: function(data,responseHandler) {
		var response = hxl8.L8ReceiverBase.processCommand(data.sub(3,data.length - 4));
		return responseHandler.handleResponse(response);
	}
	,handleCommands: function(serial,parser,res,responseHandler) {
		if(serial == null) return;
		var sender;
		if(parser.repeat) sender = new hxl8.L8CmdRepeatingQueueSender(serial,parser.commands,parser.repeatsDelay,parser.repeatsCount,parser.repeatForever,responseHandler); else sender = new hxl8.L8CmdQueueSender(serial,parser.commands,parser.delay,responseHandler);
		sender.setFinishCallback(function() {
			responseHandler.sendFinished = true;
		});
		sender.start();
	}
	,showCommandPage: function(res) {
		res.setHeader("Content-Type","text/html");
		res.writeHead(200);
		var index = haxe.Resource.getString("indexCommands.html");
		var template = new haxe.Template(index);
		var context = { port : this.tcpPort, serialPort : this.serialPort};
		res.end(template.execute(context));
	}
	,showComPorts: function(res,requestedPort,comPorts) {
		var buf = new StringBuf();
		if(requestedPort == null) buf.b += "null"; else buf.b += "" + requestedPort;
		buf.b += " not available\n\n";
		buf.b += "Available serial ports:\n";
		var $it0 = comPorts.keys();
		while( $it0.hasNext() ) {
			var comPort = $it0.next();
			var name = comPorts.get(comPort);
			if(comPort == null) buf.b += "null"; else buf.b += "" + comPort;
			buf.b += " - ";
			if(name == null) buf.b += "null"; else buf.b += "" + name;
			buf.b += "\n";
		}
		res.end(buf.b);
	}
	,__class__: hxl8.L8NodeSrv
};
hxl8.L8RGB = function(rgb,r,g,b) {
	this.m_b = 0;
	this.m_g = 0;
	this.m_r = 0;
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
hxl8.L8RGB.__name__ = true;
hxl8.L8RGB.prototype = {
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
	,__class__: hxl8.L8RGB
};
hxl8.L8ReceiverBase = function(serial) {
	this.serial = null;
	this.serial = serial;
};
hxl8.L8ReceiverBase.__name__ = true;
hxl8.L8ReceiverBase.processCommand = function(data) {
	var response = null;
	var _g = data.b[0];
	switch(_g) {
	case 0:
		response = new hxl8.responses.L8ResponseOK();
		break;
	case 2:
		response = new hxl8.responses.L8ResponsePong();
		break;
	case 71:
		response = new hxl8.responses.L8ResponseVoltage();
		break;
	case 73:
		response = new hxl8.responses.L8ResponseTemperature();
		break;
	case 77:
		response = new hxl8.responses.L8ResponseAccelerator();
		break;
	case 79:
		response = new hxl8.responses.L8ResponseUID();
		break;
	case 81:
		response = new hxl8.responses.L8ResponseAmbientLight();
		break;
	case 83:
		response = new hxl8.responses.L8ResponseProximity();
		break;
	case 97:
		response = new hxl8.responses.L8ResponseVersions();
		break;
	case 99:
		response = new hxl8.responses.L8ResponseButton();
		break;
	case 101:
		response = new hxl8.responses.L8ResponseNoise();
		break;
	case 103:
		response = new hxl8.responses.L8ResponseVBUS();
		break;
	case 105:
		response = new hxl8.responses.L8ResponseMCUTemp();
		break;
	case 107:
		response = new hxl8.responses.L8ResponseStoreL8y();
		break;
	case 109:
		response = new hxl8.responses.L8ResponseFrameGrab();
		break;
	case 113:
		response = new hxl8.responses.L8ResponseStoreFrame();
		break;
	case 115:
		response = new hxl8.responses.L8ResponseFrameGrab();
		break;
	case 118:
		response = new hxl8.responses.L8ResponseBatchG();
		break;
	case 120:
		response = new hxl8.responses.L8ResponseStoreAnim();
		break;
	case 122:
		response = new hxl8.responses.L8ResponseReadAnim();
		break;
	case 132:
		response = new hxl8.responses.L8ResponseTraceMsg();
		break;
	case 139:
		response = new hxl8.responses.L8ResponseOrientation();
		break;
	case 141:
		response = new hxl8.responses.L8ResponseNumL8ies();
		break;
	case 143:
		response = new hxl8.responses.L8ResponseNumAnims();
		break;
	case 145:
		response = new hxl8.responses.L8ResponseNumFrames();
		break;
	case 148:
		response = new hxl8.responses.L8ResponseNotifyApp();
		break;
	case 150:
		response = new hxl8.responses.L8ResponseNumNotifyApps();
		break;
	case 156:
		response = new hxl8.responses.L8ResponseFrameGrab();
		break;
	case 163:
		response = new hxl8.responses.L8ResponseSensorThresholds();
		break;
	case 167:
		response = new hxl8.responses.L8ResponseNotificationSilence();
		break;
	case 255:
		response = new hxl8.responses.L8ResponseErr();
		break;
	default:
		return null;
	}
	response.parseData(data);
	return response;
};
hxl8.L8ReceiverBase.prototype = {
	shallClose: function() {
		return false;
	}
	,closing: function() {
	}
	,handleResponse: function(response) {
		if(response == null) return;
		response.print(hxl8.responses.PrintFormat.TEXT);
	}
	,__class__: hxl8.L8ReceiverBase
};
hxl8.L8ResponseHandler = function() {
	this.sendFinished = false;
	this.expected = 0;
	this.handled = 0;
	this.csvHeader = false;
	this.csv = false;
	this.hex = false;
	this.silent = false;
};
hxl8.L8ResponseHandler.__name__ = true;
hxl8.L8ResponseHandler.prototype = {
	setSilent: function(silent) {
		this.silent = silent;
	}
	,setHex: function(hex) {
		this.hex = hex;
	}
	,setCSV: function(csv) {
		this.csv = csv;
	}
	,setCSVHeader: function(csvHeader) {
		this.csvHeader = csvHeader;
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
		if(!this.silent) {
			var format = hxl8.responses.PrintFormat.TEXT;
			if(this.hex) format = hxl8.responses.PrintFormat.HEX;
			if(this.csv) {
				if(this.csvHeader) format = hxl8.responses.PrintFormat.CSV_HEADER; else format = hxl8.responses.PrintFormat.CSV;
			}
			return response.print(format);
		}
		return [];
	}
	,__class__: hxl8.L8ResponseHandler
};
hxl8.commands = {};
hxl8.commands.L8CmdBase = function(cmd) {
	this.m_cmd = cmd;
};
hxl8.commands.L8CmdBase.__name__ = true;
hxl8.commands.L8CmdBase.prototype = {
	getBytes: function() {
		var buffer = new haxe.io.BytesBuffer();
		buffer.b.push(this.m_cmd);
		return buffer;
	}
	,send: function(serial) {
		if(serial == null) throw new hxl8.exceptions.L8SendException(1,"serial is null");
		var bytesBuf = this.getBytes();
		var data = bytesBuf.getBytes();
		var toSendBuf = new haxe.io.BytesBuffer();
		toSendBuf.b.push(170);
		toSendBuf.b.push(85);
		toSendBuf.b.push(data.length);
		toSendBuf.addBytes(data,0,data.length);
		toSendBuf.addByte(hxl8.commands.L8CrcCalc.calcCRC(data));
		var sendBytes = toSendBuf.getBytes();
		var written = serial.writeBytes(sendBytes.b);
		if(written != sendBytes.length) throw new hxl8.exceptions.L8SendException(1,"length mismatch: " + written + " != " + sendBytes.length);
	}
	,hasResponse: function() {
		return true;
	}
	,__class__: hxl8.commands.L8CmdBase
};
hxl8.commands.L8CmdAppRun = function() {
	hxl8.commands.L8CmdBase.call(this,129);
};
hxl8.commands.L8CmdAppRun.__name__ = true;
hxl8.commands.L8CmdAppRun.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdAppRun.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdAppRun
});
hxl8.commands.L8CmdAppRunAmbient = function(matrixRGB,superRGB,threshold) {
	hxl8.commands.L8CmdAppRun.call(this);
	this.m_matrixRGB = matrixRGB;
	this.m_superRGB = superRGB;
	this.m_threshold = threshold;
	if(this.m_threshold < 0) this.m_threshold = 0;
	if(this.m_threshold > 100) this.m_threshold = 100;
};
hxl8.commands.L8CmdAppRunAmbient.__name__ = true;
hxl8.commands.L8CmdAppRunAmbient.__super__ = hxl8.commands.L8CmdAppRun;
hxl8.commands.L8CmdAppRunAmbient.prototype = $extend(hxl8.commands.L8CmdAppRun.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdAppRun.prototype.getBytes.call(this);
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
	,__class__: hxl8.commands.L8CmdAppRunAmbient
});
hxl8.commands.L8CmdAppRunColorChanger = function(colors,speed,invertSuperLED) {
	hxl8.commands.L8CmdAppRun.call(this);
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
hxl8.commands.L8CmdAppRunColorChanger.__name__ = true;
hxl8.commands.L8CmdAppRunColorChanger.__super__ = hxl8.commands.L8CmdAppRun;
hxl8.commands.L8CmdAppRunColorChanger.prototype = $extend(hxl8.commands.L8CmdAppRun.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdAppRun.prototype.getBytes.call(this);
		buffer.b.push(2);
		buffer.b.push(this.m_colors);
		buffer.b.push(this.m_speed);
		if(this.m_invertSuperLED) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdAppRunColorChanger
});
hxl8.commands.L8CmdAppRunDice = function(rgb) {
	hxl8.commands.L8CmdAppRun.call(this);
	this.m_rgb = rgb;
};
hxl8.commands.L8CmdAppRunDice.__name__ = true;
hxl8.commands.L8CmdAppRunDice.__super__ = hxl8.commands.L8CmdAppRun;
hxl8.commands.L8CmdAppRunDice.prototype = $extend(hxl8.commands.L8CmdAppRun.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdAppRun.prototype.getBytes.call(this);
		buffer.b.push(0);
		buffer.addByte(this.m_rgb.getB());
		buffer.addByte(this.m_rgb.getG());
		buffer.addByte(this.m_rgb.getR());
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdAppRunDice
});
hxl8.commands.L8CmdAppRunParty = function() {
	hxl8.commands.L8CmdAppRun.call(this);
};
hxl8.commands.L8CmdAppRunParty.__name__ = true;
hxl8.commands.L8CmdAppRunParty.__super__ = hxl8.commands.L8CmdAppRun;
hxl8.commands.L8CmdAppRunParty.prototype = $extend(hxl8.commands.L8CmdAppRun.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdAppRun.prototype.getBytes.call(this);
		buffer.b.push(1);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdAppRunParty
});
hxl8.commands.L8CmdAppRunProximity = function(matrixRGB,superRGB,threshold) {
	hxl8.commands.L8CmdAppRun.call(this);
	this.m_matrixRGB = matrixRGB;
	this.m_superRGB = superRGB;
	this.m_threshold = threshold;
	if(this.m_threshold < 0) this.m_threshold = 0;
	if(this.m_threshold > 100) this.m_threshold = 100;
};
hxl8.commands.L8CmdAppRunProximity.__name__ = true;
hxl8.commands.L8CmdAppRunProximity.__super__ = hxl8.commands.L8CmdAppRun;
hxl8.commands.L8CmdAppRunProximity.prototype = $extend(hxl8.commands.L8CmdAppRun.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdAppRun.prototype.getBytes.call(this);
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
	,__class__: hxl8.commands.L8CmdAppRunProximity
});
hxl8.commands.L8CmdAppStop = function() {
	hxl8.commands.L8CmdBase.call(this,130);
};
hxl8.commands.L8CmdAppStop.__name__ = true;
hxl8.commands.L8CmdAppStop.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdAppStop.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdAppStop
});
hxl8.commands.L8CmdBootloader = function() {
	hxl8.commands.L8CmdBase.call(this,74);
};
hxl8.commands.L8CmdBootloader.__name__ = true;
hxl8.commands.L8CmdBootloader.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdBootloader.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	hasResponse: function() {
		return false;
	}
	,__class__: hxl8.commands.L8CmdBootloader
});
hxl8.commands.L8CmdSetMatrixLEDArray = function(rgbs) {
	hxl8.commands.L8CmdBase.call(this,68);
	this.m_rgbs = rgbs;
};
hxl8.commands.L8CmdSetMatrixLEDArray.__name__ = true;
hxl8.commands.L8CmdSetMatrixLEDArray.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetMatrixLEDArray.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
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
	,__class__: hxl8.commands.L8CmdSetMatrixLEDArray
});
hxl8.commands.L8CmdBox = function(left,top,right,bottom,border,fill,outer) {
	var rgbs = new Array();
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
	hxl8.commands.L8CmdSetMatrixLEDArray.call(this,rgbs);
};
hxl8.commands.L8CmdBox.__name__ = true;
hxl8.commands.L8CmdBox.__super__ = hxl8.commands.L8CmdSetMatrixLEDArray;
hxl8.commands.L8CmdBox.prototype = $extend(hxl8.commands.L8CmdSetMatrixLEDArray.prototype,{
	__class__: hxl8.commands.L8CmdBox
});
hxl8.commands.L8CmdDeleteAnim = function(anim) {
	hxl8.commands.L8CmdBase.call(this,123);
	this.m_anim = anim;
};
hxl8.commands.L8CmdDeleteAnim.__name__ = true;
hxl8.commands.L8CmdDeleteAnim.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdDeleteAnim.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_anim);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdDeleteAnim
});
hxl8.commands.L8CmdDeleteFrame = function(frame) {
	hxl8.commands.L8CmdBase.call(this,116);
	this.m_frame = frame;
};
hxl8.commands.L8CmdDeleteFrame.__name__ = true;
hxl8.commands.L8CmdDeleteFrame.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdDeleteFrame.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_frame);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdDeleteFrame
});
hxl8.commands.L8CmdDeleteL8y = function(l8y) {
	hxl8.commands.L8CmdBase.call(this,111);
	this.m_l8y = l8y;
};
hxl8.commands.L8CmdDeleteL8y.__name__ = true;
hxl8.commands.L8CmdDeleteL8y.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdDeleteL8y.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_l8y);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdDeleteL8y
});
hxl8.commands.L8CmdDeleteUserMemory = function() {
	hxl8.commands.L8CmdBase.call(this,126);
};
hxl8.commands.L8CmdDeleteUserMemory.__name__ = true;
hxl8.commands.L8CmdDeleteUserMemory.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdDeleteUserMemory.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdDeleteUserMemory
});
hxl8.commands.L8CmdDisplayChar = function($char,orient,offset) {
	hxl8.commands.L8CmdBase.call(this,127);
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
hxl8.commands.L8CmdDisplayChar.__name__ = true;
hxl8.commands.L8CmdDisplayChar.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdDisplayChar.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.addByte(HxOverrides.cca(this.m_char,0));
		buffer.b.push(this.m_shift);
		return buffer;
	}
	,hasResponse: function() {
		return false;
	}
	,__class__: hxl8.commands.L8CmdDisplayChar
});
hxl8.commands.L8CmdEnableAllNotifications = function(all) {
	hxl8.commands.L8CmdBase.call(this,164);
	this.m_all = all;
};
hxl8.commands.L8CmdEnableAllNotifications.__name__ = true;
hxl8.commands.L8CmdEnableAllNotifications.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdEnableAllNotifications.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		if(this.m_all) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdEnableAllNotifications
});
hxl8.commands.L8CmdEnableAutoRotate = function(enable) {
	hxl8.commands.L8CmdBase.call(this,134);
	this.m_enable = enable;
};
hxl8.commands.L8CmdEnableAutoRotate.__name__ = true;
hxl8.commands.L8CmdEnableAutoRotate.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdEnableAutoRotate.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		if(this.m_enable) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdEnableAutoRotate
});
hxl8.commands.L8CmdEnableNotification = function(index,enable) {
	hxl8.commands.L8CmdBase.call(this,151);
	this.m_index = index;
	this.m_enable = enable;
};
hxl8.commands.L8CmdEnableNotification.__name__ = true;
hxl8.commands.L8CmdEnableNotification.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdEnableNotification.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_index);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdEnableNotification
});
hxl8.commands.L8CmdEnableStatusLEDs = function(enable) {
	hxl8.commands.L8CmdBase.call(this,158);
	this.m_enable = enable;
};
hxl8.commands.L8CmdEnableStatusLEDs.__name__ = true;
hxl8.commands.L8CmdEnableStatusLEDs.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdEnableStatusLEDs.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		if(this.m_enable) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdEnableStatusLEDs
});
hxl8.commands.L8CmdGetCurrentMatrix = function() {
	hxl8.commands.L8CmdBase.call(this,155);
};
hxl8.commands.L8CmdGetCurrentMatrix.__name__ = true;
hxl8.commands.L8CmdGetCurrentMatrix.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdGetCurrentMatrix.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdGetCurrentMatrix
});
hxl8.commands.L8CmdGetNotifyApp = function(index,extended) {
	hxl8.commands.L8CmdBase.call(this,147);
	this.m_index = index;
	this.m_extended = extended;
};
hxl8.commands.L8CmdGetNotifyApp.__name__ = true;
hxl8.commands.L8CmdGetNotifyApp.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdGetNotifyApp.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_index);
		if(this.m_extended) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdGetNotifyApp
});
hxl8.commands.L8CmdGetNumNotifyApps = function() {
	hxl8.commands.L8CmdBase.call(this,149);
};
hxl8.commands.L8CmdGetNumNotifyApps.__name__ = true;
hxl8.commands.L8CmdGetNumNotifyApps.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdGetNumNotifyApps.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdGetNumNotifyApps
});
hxl8.commands.L8CmdMatrixOff = function() {
	hxl8.commands.L8CmdBase.call(this,69);
};
hxl8.commands.L8CmdMatrixOff.__name__ = true;
hxl8.commands.L8CmdMatrixOff.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdMatrixOff.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdMatrixOff
});
hxl8.commands.L8CmdPlayAnim = function(anim,loop) {
	hxl8.commands.L8CmdBase.call(this,124);
	this.m_anim = anim;
	this.m_loop = loop;
};
hxl8.commands.L8CmdPlayAnim.__name__ = true;
hxl8.commands.L8CmdPlayAnim.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdPlayAnim.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_anim);
		if(this.m_loop) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,hasResponse: function() {
		return false;
	}
	,__class__: hxl8.commands.L8CmdPlayAnim
});
hxl8.commands.L8CmdPowerOff = function() {
	hxl8.commands.L8CmdBase.call(this,157);
};
hxl8.commands.L8CmdPowerOff.__name__ = true;
hxl8.commands.L8CmdPowerOff.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdPowerOff.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	hasResponse: function() {
		return false;
	}
	,__class__: hxl8.commands.L8CmdPowerOff
});
hxl8.commands.L8CmdQueryAcc = function() {
	hxl8.commands.L8CmdBase.call(this,76);
};
hxl8.commands.L8CmdQueryAcc.__name__ = true;
hxl8.commands.L8CmdQueryAcc.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryAcc.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryAcc
});
hxl8.commands.L8CmdQueryAmbientLight = function() {
	hxl8.commands.L8CmdBase.call(this,80);
};
hxl8.commands.L8CmdQueryAmbientLight.__name__ = true;
hxl8.commands.L8CmdQueryAmbientLight.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryAmbientLight.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryAmbientLight
});
hxl8.commands.L8CmdQueryBatChg = function() {
	hxl8.commands.L8CmdBase.call(this,117);
};
hxl8.commands.L8CmdQueryBatChg.__name__ = true;
hxl8.commands.L8CmdQueryBatChg.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryBatChg.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryBatChg
});
hxl8.commands.L8CmdQueryButton = function() {
	hxl8.commands.L8CmdBase.call(this,98);
};
hxl8.commands.L8CmdQueryButton.__name__ = true;
hxl8.commands.L8CmdQueryButton.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryButton.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryButton
});
hxl8.commands.L8CmdQueryInitStatus = function() {
	hxl8.commands.L8CmdBase.call(this,133);
};
hxl8.commands.L8CmdQueryInitStatus.__name__ = true;
hxl8.commands.L8CmdQueryInitStatus.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryInitStatus.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryInitStatus
});
hxl8.commands.L8CmdQueryMCUID = function() {
	hxl8.commands.L8CmdBase.call(this,78);
};
hxl8.commands.L8CmdQueryMCUID.__name__ = true;
hxl8.commands.L8CmdQueryMCUID.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryMCUID.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryMCUID
});
hxl8.commands.L8CmdQueryMCUTemp = function() {
	hxl8.commands.L8CmdBase.call(this,104);
};
hxl8.commands.L8CmdQueryMCUTemp.__name__ = true;
hxl8.commands.L8CmdQueryMCUTemp.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryMCUTemp.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryMCUTemp
});
hxl8.commands.L8CmdQueryNoise = function() {
	hxl8.commands.L8CmdBase.call(this,100);
};
hxl8.commands.L8CmdQueryNoise.__name__ = true;
hxl8.commands.L8CmdQueryNoise.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryNoise.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryNoise
});
hxl8.commands.L8CmdQueryNotificationsSilent = function() {
	hxl8.commands.L8CmdBase.call(this,166);
};
hxl8.commands.L8CmdQueryNotificationsSilent.__name__ = true;
hxl8.commands.L8CmdQueryNotificationsSilent.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryNotificationsSilent.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryNotificationsSilent
});
hxl8.commands.L8CmdQueryNumAnims = function() {
	hxl8.commands.L8CmdBase.call(this,142);
};
hxl8.commands.L8CmdQueryNumAnims.__name__ = true;
hxl8.commands.L8CmdQueryNumAnims.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryNumAnims.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryNumAnims
});
hxl8.commands.L8CmdQueryNumFrames = function() {
	hxl8.commands.L8CmdBase.call(this,144);
};
hxl8.commands.L8CmdQueryNumFrames.__name__ = true;
hxl8.commands.L8CmdQueryNumFrames.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryNumFrames.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryNumFrames
});
hxl8.commands.L8CmdQueryNumL8ies = function() {
	hxl8.commands.L8CmdBase.call(this,140);
};
hxl8.commands.L8CmdQueryNumL8ies.__name__ = true;
hxl8.commands.L8CmdQueryNumL8ies.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryNumL8ies.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryNumL8ies
});
hxl8.commands.L8CmdQueryProximity = function() {
	hxl8.commands.L8CmdBase.call(this,82);
};
hxl8.commands.L8CmdQueryProximity.__name__ = true;
hxl8.commands.L8CmdQueryProximity.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryProximity.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryProximity
});
hxl8.commands.L8CmdQuerySensorThresholds = function() {
	hxl8.commands.L8CmdBase.call(this,162);
};
hxl8.commands.L8CmdQuerySensorThresholds.__name__ = true;
hxl8.commands.L8CmdQuerySensorThresholds.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQuerySensorThresholds.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQuerySensorThresholds
});
hxl8.commands.L8CmdQueryTemp = function() {
	hxl8.commands.L8CmdBase.call(this,72);
};
hxl8.commands.L8CmdQueryTemp.__name__ = true;
hxl8.commands.L8CmdQueryTemp.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryTemp.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryTemp
});
hxl8.commands.L8CmdQueryVBUSVoltage = function() {
	hxl8.commands.L8CmdBase.call(this,102);
};
hxl8.commands.L8CmdQueryVBUSVoltage.__name__ = true;
hxl8.commands.L8CmdQueryVBUSVoltage.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryVBUSVoltage.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryVBUSVoltage
});
hxl8.commands.L8CmdQueryVersions = function() {
	hxl8.commands.L8CmdBase.call(this,96);
};
hxl8.commands.L8CmdQueryVersions.__name__ = true;
hxl8.commands.L8CmdQueryVersions.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryVersions.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryVersions
});
hxl8.commands.L8CmdQueryVoltage = function() {
	hxl8.commands.L8CmdBase.call(this,70);
};
hxl8.commands.L8CmdQueryVoltage.__name__ = true;
hxl8.commands.L8CmdQueryVoltage.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdQueryVoltage.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdQueryVoltage
});
hxl8.commands.L8CmdReadAnim = function(anim) {
	hxl8.commands.L8CmdBase.call(this,121);
	this.m_anim = anim;
};
hxl8.commands.L8CmdReadAnim.__name__ = true;
hxl8.commands.L8CmdReadAnim.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdReadAnim.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_anim);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdReadAnim
});
hxl8.commands.L8CmdReadFrame = function(frame) {
	hxl8.commands.L8CmdBase.call(this,114);
	this.m_frame = frame;
};
hxl8.commands.L8CmdReadFrame.__name__ = true;
hxl8.commands.L8CmdReadFrame.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdReadFrame.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_frame);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdReadFrame
});
hxl8.commands.L8CmdReadL8y = function(l8y) {
	hxl8.commands.L8CmdBase.call(this,108);
	this.m_l8y = l8y;
};
hxl8.commands.L8CmdReadL8y.__name__ = true;
hxl8.commands.L8CmdReadL8y.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdReadL8y.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_l8y);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdReadL8y
});
hxl8.commands.L8CmdReset = function() {
	hxl8.commands.L8CmdBase.call(this,6);
};
hxl8.commands.L8CmdReset.__name__ = true;
hxl8.commands.L8CmdReset.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdReset.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	hasResponse: function() {
		return false;
	}
	,__class__: hxl8.commands.L8CmdReset
});
hxl8.commands.L8CmdSendPing = function() {
	hxl8.commands.L8CmdBase.call(this,1);
};
hxl8.commands.L8CmdSendPing.__name__ = true;
hxl8.commands.L8CmdSendPing.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSendPing.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	__class__: hxl8.commands.L8CmdSendPing
});
hxl8.commands.L8CmdSetThresholdBase = function(cmd,min,max) {
	hxl8.commands.L8CmdBase.call(this,cmd);
	this.m_min = min;
	this.m_max = max;
};
hxl8.commands.L8CmdSetThresholdBase.__name__ = true;
hxl8.commands.L8CmdSetThresholdBase.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetThresholdBase.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_min >> 8 & 255);
		buffer.b.push(this.m_min & 255);
		buffer.b.push(this.m_max >> 8 & 255);
		buffer.b.push(this.m_max & 255);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdSetThresholdBase
});
hxl8.commands.L8CmdSetAmbThreshold = function(min,max) {
	hxl8.commands.L8CmdSetThresholdBase.call(this,161,min,max);
};
hxl8.commands.L8CmdSetAmbThreshold.__name__ = true;
hxl8.commands.L8CmdSetAmbThreshold.__super__ = hxl8.commands.L8CmdSetThresholdBase;
hxl8.commands.L8CmdSetAmbThreshold.prototype = $extend(hxl8.commands.L8CmdSetThresholdBase.prototype,{
	__class__: hxl8.commands.L8CmdSetAmbThreshold
});
hxl8.commands.L8CmdSetBrightness = function(brightness) {
	hxl8.commands.L8CmdBase.call(this,154);
	this.m_brightness = brightness;
};
hxl8.commands.L8CmdSetBrightness.__name__ = true;
hxl8.commands.L8CmdSetBrightness.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetBrightness.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		if(this.m_brightness) buffer.b.push(0); else buffer.b.push(1);
		return buffer;
	}
	,hasResponse: function() {
		return false;
	}
	,__class__: hxl8.commands.L8CmdSetBrightness
});
hxl8.commands.L8CmdSetLED = function(x,y,rgb) {
	hxl8.commands.L8CmdBase.call(this,67);
	this.m_x = x;
	this.m_y = y;
	this.m_rgb = rgb;
};
hxl8.commands.L8CmdSetLED.__name__ = true;
hxl8.commands.L8CmdSetLED.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetLED.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_x);
		buffer.b.push(this.m_y);
		buffer.addByte(this.m_rgb.getB() & 15);
		buffer.addByte(this.m_rgb.getG() & 15);
		buffer.addByte(this.m_rgb.getR() & 15);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdSetLED
});
hxl8.commands.L8CmdSetMatrixLEDUni = function(rgb) {
	hxl8.commands.L8CmdBase.call(this,68);
	this.m_rgb = rgb;
};
hxl8.commands.L8CmdSetMatrixLEDUni.__name__ = true;
hxl8.commands.L8CmdSetMatrixLEDUni.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetMatrixLEDUni.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		var _g = 0;
		while(_g < 64) {
			var index = _g++;
			buffer.addByte(this.m_rgb.getB() & 15);
			buffer.addByte(this.m_rgb.getG() << 4 & 240 | this.m_rgb.getR() & 15);
		}
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdSetMatrixLEDUni
});
hxl8.commands.L8CmdSetNoiseThreshold = function(min,max) {
	hxl8.commands.L8CmdSetThresholdBase.call(this,159,min,max);
};
hxl8.commands.L8CmdSetNoiseThreshold.__name__ = true;
hxl8.commands.L8CmdSetNoiseThreshold.__super__ = hxl8.commands.L8CmdSetThresholdBase;
hxl8.commands.L8CmdSetNoiseThreshold.prototype = $extend(hxl8.commands.L8CmdSetThresholdBase.prototype,{
	__class__: hxl8.commands.L8CmdSetNoiseThreshold
});
hxl8.commands.L8CmdSetNotification = function(app,eventType,category) {
	hxl8.commands.L8CmdBase.call(this,153);
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
hxl8.commands.L8CmdSetNotification.__name__ = true;
hxl8.commands.L8CmdSetNotification.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetNotification.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_app.length);
		if(this.m_app.length > 0) buffer.add(haxe.io.Bytes.ofString(this.m_app));
		buffer.b.push(this.m_eventType);
		buffer.b.push(this.m_category);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdSetNotification
});
hxl8.commands.L8CmdSetNotificationsSilence = function(silence) {
	hxl8.commands.L8CmdBase.call(this,165);
	this.m_silence = silence;
};
hxl8.commands.L8CmdSetNotificationsSilence.__name__ = true;
hxl8.commands.L8CmdSetNotificationsSilence.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetNotificationsSilence.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		if(this.m_silence) buffer.b.push(1); else buffer.b.push(0);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdSetNotificationsSilence
});
hxl8.commands.L8CmdSetOrientation = function(orient) {
	hxl8.commands.L8CmdBase.call(this,128);
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
hxl8.commands.L8CmdSetOrientation.__name__ = true;
hxl8.commands.L8CmdSetOrientation.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetOrientation.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_orient);
		return buffer;
	}
	,hasResponse: function() {
		return false;
	}
	,__class__: hxl8.commands.L8CmdSetOrientation
});
hxl8.commands.L8CmdSetProxThreshold = function(min,max) {
	hxl8.commands.L8CmdSetThresholdBase.call(this,160,min,max);
};
hxl8.commands.L8CmdSetProxThreshold.__name__ = true;
hxl8.commands.L8CmdSetProxThreshold.__super__ = hxl8.commands.L8CmdSetThresholdBase;
hxl8.commands.L8CmdSetProxThreshold.prototype = $extend(hxl8.commands.L8CmdSetThresholdBase.prototype,{
	__class__: hxl8.commands.L8CmdSetProxThreshold
});
hxl8.commands.L8CmdSetStoredL8y = function(l8y) {
	hxl8.commands.L8CmdBase.call(this,110);
	this.m_l8y = l8y;
};
hxl8.commands.L8CmdSetStoredL8y.__name__ = true;
hxl8.commands.L8CmdSetStoredL8y.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetStoredL8y.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.b.push(this.m_l8y);
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdSetStoredL8y
});
hxl8.commands.L8CmdSetSuperLED = function(rgb) {
	hxl8.commands.L8CmdBase.call(this,75);
	this.m_rgb = rgb;
};
hxl8.commands.L8CmdSetSuperLED.__name__ = true;
hxl8.commands.L8CmdSetSuperLED.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetSuperLED.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
		buffer.addByte(this.m_rgb.getB());
		buffer.addByte(this.m_rgb.getG());
		buffer.addByte(this.m_rgb.getR());
		return buffer;
	}
	,__class__: hxl8.commands.L8CmdSetSuperLED
});
hxl8.commands.L8CmdSetText = function(speed,loop,rgb,text) {
	hxl8.commands.L8CmdBase.call(this,131);
	switch(speed) {
	case 0:case 1:case 2:
		this.m_speed = speed;
		break;
	default:
		this.m_speed = 1;
	}
	this.m_loop = loop;
	this.m_rgb = rgb;
	this.m_text = HxOverrides.substr(text,0,hxl8.commands.L8CmdSetText.MAX_LENGTH);
};
hxl8.commands.L8CmdSetText.__name__ = true;
hxl8.commands.L8CmdSetText.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdSetText.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
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
	,__class__: hxl8.commands.L8CmdSetText
});
hxl8.commands.L8CmdStopAnim = function() {
	hxl8.commands.L8CmdBase.call(this,125);
};
hxl8.commands.L8CmdStopAnim.__name__ = true;
hxl8.commands.L8CmdStopAnim.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdStopAnim.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	hasResponse: function() {
		return false;
	}
	,__class__: hxl8.commands.L8CmdStopAnim
});
hxl8.commands.L8CmdStoreAnim = function(anim) {
	hxl8.commands.L8CmdBase.call(this,119);
	var entries = anim.split(",");
	this.m_animSequence = new Array();
	if(entries.length <= 0) return;
	if(entries.length % 2 != 0) entries.pop();
	var _g = 0;
	while(_g < entries.length) {
		var entry = entries[_g];
		++_g;
		this.m_animSequence.push(Std.parseInt(entry));
	}
};
hxl8.commands.L8CmdStoreAnim.__name__ = true;
hxl8.commands.L8CmdStoreAnim.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdStoreAnim.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
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
	,__class__: hxl8.commands.L8CmdStoreAnim
});
hxl8.commands.L8CmdStoreFrame = function(rgbs) {
	hxl8.commands.L8CmdBase.call(this,112);
	this.m_rgbs = rgbs;
};
hxl8.commands.L8CmdStoreFrame.__name__ = true;
hxl8.commands.L8CmdStoreFrame.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdStoreFrame.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
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
	,__class__: hxl8.commands.L8CmdStoreFrame
});
hxl8.commands.L8CmdStoreL8y = function(rgbs) {
	hxl8.commands.L8CmdBase.call(this,106);
	this.m_rgbs = rgbs;
};
hxl8.commands.L8CmdStoreL8y.__name__ = true;
hxl8.commands.L8CmdStoreL8y.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdStoreL8y.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
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
	,__class__: hxl8.commands.L8CmdStoreL8y
});
hxl8.commands.L8CmdStoreNotification = function(app,rgbs,superLED,enable) {
	hxl8.commands.L8CmdBase.call(this,146);
	this.m_rgbs = rgbs;
	this.m_app = HxOverrides.substr(app,0,32);
	this.m_super = superLED;
	this.m_enabled = enable;
};
hxl8.commands.L8CmdStoreNotification.__name__ = true;
hxl8.commands.L8CmdStoreNotification.__super__ = hxl8.commands.L8CmdBase;
hxl8.commands.L8CmdStoreNotification.prototype = $extend(hxl8.commands.L8CmdBase.prototype,{
	getBytes: function() {
		var buffer = hxl8.commands.L8CmdBase.prototype.getBytes.call(this);
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
	,__class__: hxl8.commands.L8CmdStoreNotification
});
hxl8.commands.L8CrcCalc = function() { };
hxl8.commands.L8CrcCalc.__name__ = true;
hxl8.commands.L8CrcCalc.calcCRC = function(bytes) {
	if(bytes == null) return -1;
	if(hxl8.commands.L8CrcCalc.m_table == null) hxl8.commands.L8CrcCalc.makeTable();
	var crc = 0;
	var _g1 = 0;
	var _g = bytes.length;
	while(_g1 < _g) {
		var index = _g1++;
		var value = bytes.b[index];
		var tableIndex = crc ^ value;
		if(tableIndex > hxl8.commands.L8CrcCalc.m_table.length) return -1;
		crc = hxl8.commands.L8CrcCalc.m_table.b[tableIndex];
	}
	return crc;
};
hxl8.commands.L8CrcCalc.makeTable = function() {
	var buffer = new haxe.io.BytesBuffer();
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
	hxl8.commands.L8CrcCalc.m_table = buffer.getBytes();
};
hxl8.exceptions = {};
hxl8.exceptions.L8Exception = function(code,message) {
	this.m_code = code;
	this.m_message = message;
};
hxl8.exceptions.L8Exception.__name__ = true;
hxl8.exceptions.L8Exception.prototype = {
	getCode: function() {
		return this.m_code;
	}
	,getMessage: function() {
		return this.m_message;
	}
	,toString: function() {
		return "[" + this.m_code + "] " + this.m_message;
	}
	,__class__: hxl8.exceptions.L8Exception
};
hxl8.exceptions.L8SendException = function(code,message) {
	hxl8.exceptions.L8Exception.call(this,code,message);
};
hxl8.exceptions.L8SendException.__name__ = true;
hxl8.exceptions.L8SendException.__super__ = hxl8.exceptions.L8Exception;
hxl8.exceptions.L8SendException.prototype = $extend(hxl8.exceptions.L8Exception.prototype,{
	toString: function() {
		return "Send-Error [" + this.m_code + "] " + this.m_message;
	}
	,__class__: hxl8.exceptions.L8SendException
});
hxl8.nodejs = {};
hxl8.nodejs.Serial = function(portName,baud,setupImmediately) {
	if(setupImmediately == null) setupImmediately = false;
	if(baud == null) baud = 9600;
	this.errorHandler = null;
	this.dataHandler = null;
	this.openHandler = null;
	this.isSetup = false;
	this.portName = portName;
	this.baud = baud;
	if(setupImmediately) this.setup();
};
hxl8.nodejs.Serial.__name__ = true;
hxl8.nodejs.Serial.getDeviceList = function(callback) {
	var nodeSerial = js.Node.require("serialport");
	nodeSerial.list(function(err,ports) {
		var devices = new haxe.ds.StringMap();
		var _g = 0;
		while(_g < ports.length) {
			var port = ports[_g];
			++_g;
			var key = port.comName;
			var value = port.pnpId;
			devices.set(key,value);
		}
		if(callback != null) callback(devices);
	});
};
hxl8.nodejs.Serial.prototype = {
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
		var nodeSerial = js.Node.require("serialport").SerialPort;
		try {
			this.m_serialPort = new nodeSerial (serialPort, {baudrate: serialBaud});
		} catch( e ) {
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
			if(_g.errorHandler != null) _g.errorHandler(error);
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
		if(this.m_serialPort.close()) return 1;
		return 0;
	}
	,__class__: hxl8.nodejs.Serial
};
hxl8.responses = {};
hxl8.responses.L8ResponseBase = function() {
};
hxl8.responses.L8ResponseBase.__name__ = true;
hxl8.responses.L8ResponseBase.prototype = {
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
		return new Array();
	}
	,toHex: function() {
		return this.m_data.toHex();
	}
	,print: function(format) {
		var lines = new Array();
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
	,__class__: hxl8.responses.L8ResponseBase
};
hxl8.responses.L8ResponseAccelerator = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseAccelerator.__name__ = true;
hxl8.responses.L8ResponseAccelerator.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseAccelerator.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length != 8) {
			this.m_accX = 0;
			this.m_accY = 0;
			this.m_accZ = 0;
			this.m_lying = false;
			this.m_orient = 0;
			this.m_tap = false;
			this.m_shake = false;
			return;
		}
		this.m_accX = data.b[1];
		this.m_accY = data.b[2];
		this.m_accZ = data.b[3];
		this.m_lying = data.b[4] == 2;
		this.m_orient = data.b[5];
		this.m_tap = data.b[6] == 1;
		this.m_shake = data.b[7] == 1;
	}
	,toString: function() {
		var accX = Std.string(this.m_accX / 32 * 1.5);
		var accY = Std.string(this.m_accY / 32 * 1.5);
		var accZ = Std.string(this.m_accZ / 32 * 1.5);
		var lying;
		if(this.m_lying) lying = "Up"; else lying = "Upside-down";
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
		return "ACC: X=" + accX + "g Y=" + accY + "g Z=" + accZ + "g lying=" + lying + " orient=" + orient + " tap=" + tap + " shaking=" + shake;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;x-axis;y-axis;z-axis;lying info;orientation;tap;shake");
		result.push("" + this.m_cmd + ";" + this.m_accX + ";" + this.m_accY + ";" + this.m_accZ + ";" + Std.string(this.m_lying) + ";" + this.m_orient + ";" + Std.string(this.m_tap) + ";" + Std.string(this.m_shake));
		return result;
	}
	,__class__: hxl8.responses.L8ResponseAccelerator
});
hxl8.responses.L8ResponseAmbientLight = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseAmbientLight.__name__ = true;
hxl8.responses.L8ResponseAmbientLight.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseAmbientLight.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;light value;light percentage;notification flag");
		result.push("" + this.m_cmd + ";" + this.m_lightValue + ";" + this.m_percent + ";" + Std.string(this.m_requestFlag));
		return result;
	}
	,__class__: hxl8.responses.L8ResponseAmbientLight
});
hxl8.responses.PrintFormat = { __ename__ : true, __constructs__ : ["TEXT","CSV","CSV_HEADER","HEX"] };
hxl8.responses.PrintFormat.TEXT = ["TEXT",0];
hxl8.responses.PrintFormat.TEXT.__enum__ = hxl8.responses.PrintFormat;
hxl8.responses.PrintFormat.CSV = ["CSV",1];
hxl8.responses.PrintFormat.CSV.__enum__ = hxl8.responses.PrintFormat;
hxl8.responses.PrintFormat.CSV_HEADER = ["CSV_HEADER",2];
hxl8.responses.PrintFormat.CSV_HEADER.__enum__ = hxl8.responses.PrintFormat;
hxl8.responses.PrintFormat.HEX = ["HEX",3];
hxl8.responses.PrintFormat.HEX.__enum__ = hxl8.responses.PrintFormat;
hxl8.responses.L8ResponseBatchG = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseBatchG.__name__ = true;
hxl8.responses.L8ResponseBatchG.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseBatchG.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;charging status");
		result.push("" + this.m_cmd + ";" + this.m_charge);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseBatchG
});
hxl8.responses.L8ResponseButton = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseButton.__name__ = true;
hxl8.responses.L8ResponseButton.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseButton.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_pressed = data.b[1] == 1;
	}
	,toString: function() {
		if(this.m_pressed) return "Button pressed"; else return "Button not pressed";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;button status");
		result.push("" + this.m_cmd + ";" + Std.string(this.m_pressed));
		return result;
	}
	,__class__: hxl8.responses.L8ResponseButton
});
hxl8.responses.L8ResponseErr = function() {
	this.m_code = -1;
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseErr.__name__ = true;
hxl8.responses.L8ResponseErr.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseErr.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;error code");
		result.push("" + this.m_cmd + ";" + this.m_code);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseErr
});
hxl8.responses.L8ResponseFrameGrab = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseFrameGrab.__name__ = true;
hxl8.responses.L8ResponseFrameGrab.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseFrameGrab.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		this.m_rgbs = new Array();
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
				this.m_rgbs.push(new hxl8.L8RGB(null,r,g,b));
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) {
			var headerText = new StringBuf();
			headerText.b += "response";
			var index = 0;
			var _g = 0;
			var _g1 = this.m_rgbs;
			while(_g < _g1.length) {
				var rgb = _g1[_g];
				++_g;
				headerText.b += Std.string(";RGB " + index);
				index++;
			}
			result.push(headerText.b);
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
	,__class__: hxl8.responses.L8ResponseFrameGrab
});
hxl8.responses.L8ResponseMCUTemp = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseMCUTemp.__name__ = true;
hxl8.responses.L8ResponseMCUTemp.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseMCUTemp.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;processor temperature");
		result.push("" + this.m_cmd + ";" + this.m_temperature);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseMCUTemp
});
hxl8.responses.L8ResponseNoise = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseNoise.__name__ = true;
hxl8.responses.L8ResponseNoise.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseNoise.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;noise");
		result.push("" + this.m_cmd + ";" + this.m_noiseValue);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseNoise
});
hxl8.responses.L8ResponseNotificationSilence = function() {
	this.m_code = false;
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseNotificationSilence.__name__ = true;
hxl8.responses.L8ResponseNotificationSilence.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseNotificationSilence.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_code = data.b[1] == 1;
	}
	,toString: function() {
		if(this.m_code) return "NotificationSilence: on";
		return "NotificationSilence: off";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;notification silence");
		result.push("" + this.m_cmd + ";" + Std.string(this.m_code));
		return result;
	}
	,__class__: hxl8.responses.L8ResponseNotificationSilence
});
hxl8.responses.L8ResponseNotifyApp = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseNotifyApp.__name__ = true;
hxl8.responses.L8ResponseNotifyApp.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseNotifyApp.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		this.m_rgbs = new Array();
		this.m_app = "invalid";
		this.m_super = new hxl8.L8RGB("000");
		this.m_enabled = false;
		if(this.m_len > 129) {
			var len = data.b[1];
			this.m_length = len;
			if(this.m_len < len + 1 + 128 + 2 + 1) return;
			this.m_app = "";
			if(len > 0) this.m_app = data.readString(2,len);
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
				this.m_rgbs.push(new hxl8.L8RGB(null,r,g,b));
			}
			offset += 128;
			b = data.b[offset] & 15;
			g = data.b[offset + 1] & 15;
			r = data.b[offset + 2] & 15;
			this.m_super = new hxl8.L8RGB(null,r,g,b);
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
		buffer.add("Enabled: " + Std.string(this.m_enabled));
		return buffer.b;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) {
			var headerText = new StringBuf();
			headerText.b += "response;length of app string;app string";
			var index = 0;
			var _g = 0;
			var _g1 = this.m_rgbs;
			while(_g < _g1.length) {
				var rgb = _g1[_g];
				++_g;
				headerText.b += Std.string(";RGB " + index);
				index++;
			}
			headerText.b += ";super led RGB;enable flag";
			result.push(headerText.b);
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
	,__class__: hxl8.responses.L8ResponseNotifyApp
});
hxl8.responses.L8ResponseNumAnims = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseNumAnims.__name__ = true;
hxl8.responses.L8ResponseNumAnims.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseNumAnims.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		if(this.m_len == 2) this.m_animCount = data.b[1];
	}
	,toString: function() {
		return "Number of Anims (in User Space): " + this.m_animCount;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;number of animations");
		result.push("" + this.m_cmd + ";" + this.m_animCount);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseNumAnims
});
hxl8.responses.L8ResponseNumFrames = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseNumFrames.__name__ = true;
hxl8.responses.L8ResponseNumFrames.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseNumFrames.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		if(this.m_len == 2) this.m_frameCount = data.b[1];
	}
	,toString: function() {
		return "Number of Frames (in User Space): " + this.m_frameCount;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;number of frames");
		result.push("" + this.m_cmd + ";" + this.m_frameCount);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseNumFrames
});
hxl8.responses.L8ResponseNumL8ies = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseNumL8ies.__name__ = true;
hxl8.responses.L8ResponseNumL8ies.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseNumL8ies.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		if(this.m_len == 2) this.m_l8iesCount = data.b[1];
	}
	,toString: function() {
		return "Number of L8ies (in User Space): " + this.m_l8iesCount;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;number of l8ties");
		result.push("" + this.m_cmd + ";" + this.m_l8iesCount);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseNumL8ies
});
hxl8.responses.L8ResponseNumNotifyApps = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseNumNotifyApps.__name__ = true;
hxl8.responses.L8ResponseNumNotifyApps.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseNumNotifyApps.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		if(this.m_len == 2) this.m_appCount = data.b[1];
	}
	,toString: function() {
		return "Number of Notify-Apps: " + this.m_appCount;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;number of notify apps");
		result.push("" + this.m_cmd + ";" + this.m_appCount);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseNumNotifyApps
});
hxl8.responses.L8ResponseOK = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseOK.__name__ = true;
hxl8.responses.L8ResponseOK.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseOK.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	toString: function() {
		return "OK";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response");
		result.push("" + this.m_cmd);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseOK
});
hxl8.responses.L8ResponseOrientation = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseOrientation.__name__ = true;
hxl8.responses.L8ResponseOrientation.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseOrientation.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;orientation");
		result.push("" + this.m_cmd + ";" + this.m_orient);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseOrientation
});
hxl8.responses.L8ResponsePong = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponsePong.__name__ = true;
hxl8.responses.L8ResponsePong.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponsePong.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	toString: function() {
		return "Pong";
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response");
		result.push("" + this.m_cmd);
		return result;
	}
	,__class__: hxl8.responses.L8ResponsePong
});
hxl8.responses.L8ResponseProximity = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseProximity.__name__ = true;
hxl8.responses.L8ResponseProximity.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseProximity.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;proximity value;proximity percentage;notification flag");
		result.push("" + this.m_cmd + ";" + this.m_proxValue + ";" + this.m_percent + ";" + Std.string(this.m_requestFlag));
		return result;
	}
	,__class__: hxl8.responses.L8ResponseProximity
});
hxl8.responses.L8ResponseReadAnim = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseReadAnim.__name__ = true;
hxl8.responses.L8ResponseReadAnim.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseReadAnim.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		this.m_frames = new Array();
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
		var buffer = new StringBuf();
		var buffer2 = new StringBuf();
		var first = true;
		var _g = 0;
		var _g1 = this.m_frames;
		while(_g < _g1.length) {
			var animFrame = _g1[_g];
			++_g;
			var seconds = animFrame.delay / 10;
			buffer.b += Std.string("" + animFrame.frame + " - " + seconds + "s\n");
			if(!first) buffer2.b += ",";
			first = false;
			buffer2.b += Std.string("" + animFrame.frame + "," + animFrame.delay);
		}
		buffer.b += "\n";
		if(buffer2.b == null) buffer.b += "null"; else buffer.b += "" + buffer2.b;
		return buffer.b;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) {
			var headerText = new StringBuf();
			headerText.b += "response";
			var index = 0;
			var _g = 0;
			var _g1 = this.m_frames;
			while(_g < _g1.length) {
				var frame = _g1[_g];
				++_g;
				headerText.b += Std.string(";index " + index + ";delay " + index);
				index++;
			}
			result.push(headerText.b);
		}
		var dataText = new StringBuf();
		dataText.b += Std.string(this.m_cmd);
		var _g2 = 0;
		var _g11 = this.m_frames;
		while(_g2 < _g11.length) {
			var frame1 = _g11[_g2];
			++_g2;
			dataText.b += ";";
			if(frame1.frame == null) dataText.b += "null"; else dataText.b += "" + frame1.frame;
			dataText.b += ";";
			if(frame1.delay == null) dataText.b += "null"; else dataText.b += "" + frame1.delay;
		}
		result.push(dataText.b);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseReadAnim
});
hxl8.responses.L8ResponseSensorThresholds = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseSensorThresholds.__name__ = true;
hxl8.responses.L8ResponseSensorThresholds.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseSensorThresholds.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		return "Thresholds:\nAmbient Light: " + this.m_ambMinValue + " - " + this.m_ambMaxValue + "\nNoise: " + this.m_noiseMinValue + " - " + this.m_noiseMaxValue + "\nProximity: " + this.m_proxMinValue + " - " + this.m_proxMaxValue;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;noise min;noise max;proximity min;proximity max;ambient min;ambient max");
		result.push("" + this.m_cmd + ";" + this.m_noiseMinValue + ";" + this.m_noiseMaxValue + ";" + this.m_proxMinValue + ";" + this.m_proxMaxValue + ";" + this.m_ambMinValue + ";" + this.m_ambMaxValue);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseSensorThresholds
});
hxl8.responses.L8ResponseStoreAnim = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseStoreAnim.__name__ = true;
hxl8.responses.L8ResponseStoreAnim.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseStoreAnim.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_anim = data.b[1];
	}
	,toString: function() {
		return "Animation stored as: " + this.m_anim;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;new anim number");
		result.push("" + this.m_cmd + ";" + this.m_anim);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseStoreAnim
});
hxl8.responses.L8ResponseStoreFrame = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseStoreFrame.__name__ = true;
hxl8.responses.L8ResponseStoreFrame.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseStoreFrame.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_frame = data.b[1];
	}
	,toString: function() {
		return "Frame stored as: " + this.m_frame;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;new frame number");
		result.push("" + this.m_cmd + ";" + this.m_frame);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseStoreFrame
});
hxl8.responses.L8ResponseStoreL8y = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseStoreL8y.__name__ = true;
hxl8.responses.L8ResponseStoreL8y.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseStoreL8y.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
		if(data.length == 2) this.m_l8y = data.b[1];
	}
	,toString: function() {
		return "L8y stored as: " + this.m_l8y;
	}
	,toCSV: function(header) {
		if(header == null) header = false;
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;new l8y number");
		result.push("" + this.m_cmd + ";" + this.m_l8y);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseStoreL8y
});
hxl8.responses.L8ResponseTemperature = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseTemperature.__name__ = true;
hxl8.responses.L8ResponseTemperature.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseTemperature.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;temperature");
		result.push("" + this.m_cmd + ";" + this.m_temperature);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseTemperature
});
hxl8.responses.L8ResponseTraceMsg = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseTraceMsg.__name__ = true;
hxl8.responses.L8ResponseTraceMsg.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseTraceMsg.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;type;code");
		result.push("" + this.m_cmd + ";" + this.m_type + ";" + this.m_code);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseTraceMsg
});
hxl8.responses.L8ResponseUID = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseUID.__name__ = true;
hxl8.responses.L8ResponseUID.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseUID.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;uid");
		result.push("" + this.m_cmd + ";" + this.m_UID);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseUID
});
hxl8.responses.L8ResponseVBUS = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseVBUS.__name__ = true;
hxl8.responses.L8ResponseVBUS.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseVBUS.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;usb voltage");
		result.push("" + this.m_cmd + ";" + this.m_vbusValue);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseVBUS
});
hxl8.responses.L8ResponseVersions = function() {
	this.m_versionData = "???";
	this.m_versionBootloader = "???";
	this.m_versionHardware = "???";
	this.m_versionLightOS = "???";
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseVersions.__name__ = true;
hxl8.responses.L8ResponseVersions.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseVersions.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;lightos version;hardware version;bootloader version;data version");
		result.push("" + this.m_cmd + ";" + this.m_versionLightOS + ";" + this.m_versionHardware + ";" + this.m_versionBootloader + ";" + this.m_versionData);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseVersions
});
hxl8.responses.L8ResponseVoltage = function() {
	hxl8.responses.L8ResponseBase.call(this);
};
hxl8.responses.L8ResponseVoltage.__name__ = true;
hxl8.responses.L8ResponseVoltage.__super__ = hxl8.responses.L8ResponseBase;
hxl8.responses.L8ResponseVoltage.prototype = $extend(hxl8.responses.L8ResponseBase.prototype,{
	parseData: function(data) {
		hxl8.responses.L8ResponseBase.prototype.parseData.call(this,data);
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
		var result = hxl8.responses.L8ResponseBase.prototype.toCSV.call(this,header);
		if(header) result.push("response;ibattery voltage;percent");
		result.push("" + this.m_cmd + ";" + this.m_voltage + ";" + this.m_percent);
		return result;
	}
	,__class__: hxl8.responses.L8ResponseVoltage
});
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
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
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.NodeC = function() { };
js.NodeC.__name__ = true;
js.Node = function() { };
js.Node.__name__ = true;
js.Node.get_assert = function() {
	return js.Node.require("assert");
};
js.Node.get_child_process = function() {
	return js.Node.require("child_process");
};
js.Node.get_cluster = function() {
	return js.Node.require("cluster");
};
js.Node.get_crypto = function() {
	return js.Node.require("crypto");
};
js.Node.get_dgram = function() {
	return js.Node.require("dgram");
};
js.Node.get_dns = function() {
	return js.Node.require("dns");
};
js.Node.get_fs = function() {
	return js.Node.require("fs");
};
js.Node.get_http = function() {
	return js.Node.require("http");
};
js.Node.get_https = function() {
	return js.Node.require("https");
};
js.Node.get_net = function() {
	return js.Node.require("net");
};
js.Node.get_os = function() {
	return js.Node.require("os");
};
js.Node.get_path = function() {
	return js.Node.require("path");
};
js.Node.get_querystring = function() {
	return js.Node.require("querystring");
};
js.Node.get_repl = function() {
	return js.Node.require("repl");
};
js.Node.get_tls = function() {
	return js.Node.require("tls");
};
js.Node.get_url = function() {
	return js.Node.require("url");
};
js.Node.get_util = function() {
	return js.Node.require("util");
};
js.Node.get_vm = function() {
	return js.Node.require("vm");
};
js.Node.get_zlib = function() {
	return js.Node.require("zlib");
};
js.Node.get___filename = function() {
	return __filename;
};
js.Node.get___dirname = function() {
	return __dirname;
};
js.Node.get_json = function() {
	return JSON;
};
js.Node.newSocket = function(options) {
	return new js.Node.net.Socket(options);
};
var sys = {};
sys.FileSystem = function() { };
sys.FileSystem.__name__ = true;
sys.FileSystem.exists = function(path) {
	return js.Node.require("fs").existsSync(path);
};
sys.FileSystem.rename = function(path,newpath) {
	js.Node.require("fs").renameSync(path,newpath);
};
sys.FileSystem.stat = function(path) {
	return js.Node.require("fs").statSync(path);
};
sys.FileSystem.fullPath = function(relpath) {
	return js.Node.require("path").resolve(null,relpath);
};
sys.FileSystem.isDirectory = function(path) {
	if(js.Node.require("fs").statSync(path).isSymbolicLink()) return false; else return js.Node.require("fs").statSync(path).isDirectory();
};
sys.FileSystem.createDirectory = function(path) {
	js.Node.require("fs").mkdirSync(path);
};
sys.FileSystem.deleteFile = function(path) {
	js.Node.require("fs").unlinkSync(path);
};
sys.FileSystem.deleteDirectory = function(path) {
	js.Node.require("fs").rmdirSync(path);
};
sys.FileSystem.readDirectory = function(path) {
	return js.Node.require("fs").readdirSync(path);
};
sys.FileSystem.signature = function(path) {
	var shasum = js.Node.require("crypto").createHash("md5");
	shasum.update(js.Node.require("fs").readFileSync(path));
	return shasum.digest("hex");
};
sys.FileSystem.join = function(p1,p2,p3) {
	return js.Node.require("path").join(p1 == null?"":p1,p2 == null?"":p2,p3 == null?"":p3);
};
sys.FileSystem.readRecursive = function(path,filter) {
	var files = sys.FileSystem.readRecursiveInternal(path,null,filter);
	if(files == null) return []; else return files;
};
sys.FileSystem.readRecursiveInternal = function(root,dir,filter) {
	if(dir == null) dir = "";
	if(root == null) return null;
	var dirPath = js.Node.require("path").join(root == null?"":root,dir == null?"":dir,"");
	if(!(js.Node.require("fs").existsSync(dirPath) && sys.FileSystem.isDirectory(dirPath))) return null;
	var result = [];
	var _g = 0;
	var _g1 = js.Node.require("fs").readdirSync(dirPath);
	while(_g < _g1.length) {
		var file = _g1[_g];
		++_g;
		var fullPath = js.Node.require("path").join(dirPath == null?"":dirPath,file == null?"":file,"");
		var relPath;
		if(dir == "") relPath = file; else relPath = js.Node.require("path").join(dir == null?"":dir,file == null?"":file,"");
		if(js.Node.require("fs").existsSync(fullPath)) {
			if(sys.FileSystem.isDirectory(fullPath)) {
				if(fullPath.charCodeAt(fullPath.length - 1) == 47) fullPath = HxOverrides.substr(fullPath,0,-1);
				if(filter != null && !filter(relPath)) continue;
				var recursedResults = sys.FileSystem.readRecursiveInternal(root,relPath,filter);
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
haxe.Resource.content = [{ name : "indexCommands.html", data : "PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KPG1ldGEgY2hhcnNlZXQ9IlVURi04Ij4KPHRpdGxlPmh4TDggU2VydmVyPC90aXRsZT4KPC9oZWFkPgo8Ym9keT4KCjxoMT5oeEw4IFNlcnZlcjwvaDE+ClJ1bm5pbmcgb24gcG9ydCA6OnBvcnQ6OjxiciAvPgpkZWZhdWx0IGludGVyZmFjZSA6OnNlcmlhbFBvcnQ6OjxiciAvPgo8YnIgLz4KTGlzdCBvZiBzdXBwb3J0ZWQgY29tbWFuZHMgd2l0aCBzYW1wbGVzOjxiciAvPgo8aDI+TDggYXBwbGljYXRpb25zPC9oMj4KPGEgaHJlZj0iL2FwcHN0b3AiPnN0b3AgY3VycmVudCBhcHA8L2E+PGJyIC8+CjxhIGhyZWY9Ii9hcHBhbWJpZW50L2YwMC8wMGYvMTAiPnN0YXJ0IGFtYmllbnQgbGlnaHQgYXBwIHdpdGggbWF0cml4IGNvbG9yLCBzdXBlcmxlZCBjb2xvciBhbmQgdGhyZXNob2xkPC9hPjxiciAvPgo8YSBocmVmPSIvYXBwY29sb3JjaGFuZ2UvbXVsdGljb2xvci8xMC90cnVlIj5TdGFydCBjb2xvciBjaGFuZ2VyIGFwcCBNdWx0aWNsb3Igd2l0aCBzcGVlZCBpbiBTdXBlckxFRCBpbnZlcnQoPSB0cnVlKSwgZGVmYXVsdDogZmFsc2U8L2E+PGJyIC8+CjxhIGhyZWY9Ii9hcHBjb2xvcmNoYW5nZS90cm9waWNhbC8xMC90cnVlIj5TdGFydCBjb2xvciBjaGFuZ2VyIGFwcCBUcm9waWNhbCB3aXRoIHNwZWVkIGluIFN1cGVyTEVEIGludmVydCg9IHRydWUpLCBkZWZhdWx0OiBmYWxzZTwvYT48YnIgLz4KPGEgaHJlZj0iL2FwcGNvbG9yY2hhbmdlL2dhbGF4eS8xMC90cnVlIj5TdGFydCBjb2xvciBjaGFuZ2VyIGFwcCBHYWxheHkgd2l0aCBzcGVlZCBpbiBTdXBlckxFRCBpbnZlcnQoPSB0cnVlKSwgZGVmYXVsdDogZmFsc2U8L2E+PGJyIC8+CjxhIGhyZWY9Ii9hcHBjb2xvcmNoYW5nZS9hdXJvcmEvMTAvdHJ1ZSI+U3RhcnQgY29sb3IgY2hhbmdlciBhcHAgQXVyb3JhIHdpdGggc3BlZWQgaW4gU3VwZXJMRUQgaW52ZXJ0KD0gdHJ1ZSksIGRlZmF1bHQ6IGZhbHNlPC9hPjxiciAvPgo8YSBocmVmPSIvYXBwZGljZS9mZjAiPlN0YXJ0IGRpY2UgYXBwIHdpdGggb3B0aW9uYWwgY29sb3IsIGRlZmF1bHQ6IEYwMDwvYT48YnIgLz4KPGEgaHJlZj0iL2FwcHByb3hpbWl0eS9mMDAvMDBmLzEwIj5zdGFydCBwcm94aW1pdHkgYXBwIHdpdGggbWF0cml4IGNvbG9yLCBzdXBlcmxlZCBjb2xvciBhbmQgdGhyZXNob2xkPC9hPjxiciAvPgo8YSBocmVmPSIvcGFydHkiPnJ1biBwYXJ0eSBhcHA8L2E+PGJyIC8+CjxiciAvPgo8aDI+TDggc2Vuc29yczwvaDI+CjxhIGhyZWY9Ii9hdXRvcm90YXRlL3RydWUiPmVuYWJsZSBhdXRvcm90YXRlPC9hPjxiciAvPgo8YSBocmVmPSIvYXV0b3JvdGF0ZS9mYWxzZSI+ZGlzYWJsZSBhdXRvcm90YXRlPC9hPjxiciAvPgo8YSBocmVmPSIvYmF0Y2hnIj5iYXR0ZXJ5IGNoYXJnZSBzdGF0dXM8L2E+PGJyIC8+CjxhIGhyZWY9Ii9idXR0b24iPnJlYWQgYnV0dG9uIHN0YXR1czwvYT48YnIgLz4KPGEgaHJlZj0iL2dldGFjYyI+Z2V0IHZhbHVlcyBvZiBhY2NlbGVyb21ldGVyPC9hPjxiciAvPgo8YSBocmVmPSIvZ2V0YW1iIj5nZXQgdmFsdWVzIG9mIGFtYmllbnQgc2Vuc29yPC9hPjxiciAvPgo8YSBocmVmPSIvZ2V0bWN1dGVtcCI+Z2V0IGN1cnJlbnQgTUNVIHRlbXBlcmF0dXJlPC9hPjxiciAvPgo8YSBocmVmPSIvZ2V0bWljIj5nZXQgY3VycmVudCBub2lzZSBzZW5zb3IgdmFsdWU8L2E+PGJyIC8+CjxhIGhyZWY9Ii9nZXRwcm94Ij5nZXQgdmFsdWUgb2YgcHJveGltaXR5IHNlbnNvcjwvYT48YnIgLz4KPGEgaHJlZj0iL2dldHRlbXAiPmdldCB2YWx1ZSBvZiB0ZW1wZXJhdHVyZSBzZW5zb3I8L2E+PGJyIC8+CjxhIGhyZWY9Ii9nZXR0aHJlc2hvbGQiPmdldCBjdXJyZW50IGFtYmllbnQsIG5vaXNlIGFuZCBwcm94aW1pdHkgdGhyZXNob2xkczwvYT48YnIgLz4KPGEgaHJlZj0iL2dldHZvbHRhZ2UiPmdldCB0aGUgdm9sdGFnZSBvZiBMOCBiYXR0ZXJ5PC9hPjxiciAvPgo8YSBocmVmPSIvZ2V0dmJ1cyI+Z2V0IHRoZSB2b2x0YWdlIG9mIFVTQiBjb25uZWN0aW9uPC9hPjxiciAvPgo8YSBocmVmPSIvc2V0b3JpZW50YXRpb24vdG9wIj5zZXRzIG9yaWVudGF0aW9uIHRvcDwvYT48YnIgLz4KPGEgaHJlZj0iL3NldG9yaWVudGF0aW9uL2JvdHRvbSI+c2V0cyBvcmllbnRhdGlvbiBib3R0b208L2E+PGJyIC8+CjxhIGhyZWY9Ii9zZXRvcmllbnRhdGlvbi9sZWZ0Ij5zZXRzIG9yaWVudGF0aW9uIGxlZnQ8L2E+PGJyIC8+CjxhIGhyZWY9Ii9zZXRvcmllbnRhdGlvbi9yaWdodCI+c2V0cyBvcmllbnRhdGlvbiByaWdodDwvYT48YnIgLz4KL3NldGFtYnRocmVzaG9sZC9taW4vbWF4IC0gc2V0cyBtaW4gbWF4IHZhbHVlcyBvZiBhbWJpZW50IHRocmVzaG9sZDxiciAvPgovc2V0bm9pc2V0aHJlc2hvbGQvbWluL21heCAtIHNldHMgbWluIG1heCB2YWx1ZXMgb2Ygbm9pc2UgdGhyZXNob2xkPGJyIC8+Ci9zZXRwcm94dGhyZXNob2xkL21pbi9tYXggLSBzZXRzIG1pbiBtYXggdmFsdWVzIG9mIHByb3hpbWl0eSB0aHJlc2hvbGQ8YnIgLz4KPGJyIC8+CjxoMj5MOCByZXNwb25zZSBvdXRwdXQgb3B0aW9uczwvaDI+CjxhIGhyZWY9Ii9jc3YvZ2V0YW1iIj5wcmludCByZXNwb25zZXMgaW4gQ1NWIGZvcm1hdDwvYT48YnIgLz4KPGEgaHJlZj0iL2NzdmhlYWRlci9nZXRhbWIiPnByaW50IHJlc3BvbnNlcyBpbiBDU1YgZm9ybWF0IHdpdGggaGVhZGVyPC9hPjxiciAvPgo8YSBocmVmPSIvaGV4L2dldGFtYiI+cHJpbnQgcmVzcG9uc2VzIGluIHJhdyBoZXggZm9ybWF0PC9hPjxiciAvPgo8YnIgLz4KPGgyPkw4eTwvaDI+Ci9kZWxldGVsOHkvbDh5IyAtIERlbGV0ZSBMOHkgYnkgbnVtYmVyIChiZXR3ZWVuIDAgYW5kIEdldE51bUw4aWVzKTxiciAvPgo8YSBocmVmPSIvZ2V0bnVtbDhpZXMiPmdldCB0aGUgbnVtYmVyIG9mIEw4aWVzIGluIFVzZXIgc3BhY2U8L2E+PGJyIC8+CjxhIGhyZWY9Ii9yZWFkbDh5LzIiPmdldCBtYXRyaXggY29sb3JzIGZvciBMOHkgKGw4eSMgYmV0d2VlbiAwIGFuZCBHZXROdW1MOGllcyk8L2E+PGJyIC8+CjxhIGhyZWY9Ii9sOHkvMCI+c2hvdyBMOHkgKGJldHdlZW4gMCBhbmQgR2V0TnVtTDhpZXMpPC9hPjxiciAvPgovc3RvcmVsOHkvNjQqKFJHQnxSUkdHQkIpIj4gLSBzdG9yZXMgYSBMOHkgKHJldHVybnMgbmV3IGluZGV4IG9mIEw4eSk8YnIgLz4KPGJyIC8+CjxoMj5MOCBub3RpZmljYXRpb25zPC9oMj4KPGEgaHJlZj0iL2VuYWJsZWFsbG5vdGlmaWNhdGlvbnMvdHJ1ZSI+ZW5hYmxlIGFsbCBub3RpZmljYXRpb25zLCBkZWZhdWx0OiB0cnVlPC9hPjxiciAvPgo8YSBocmVmPSIvZW5hYmxlYWxsbm90aWZpY2F0aW9ucy9mYWxzZSI+ZGlzYWJsZSBhbGwgbm90aWZpY2F0aW9ucywgZGVmYXVsdDogdHJ1ZTwvYT48YnIgLz4KPGEgaHJlZj0iL2VuYWJsZW5vdGlmaWNhdGlvbi8xL3RydWUiPmVuYWJsZSBub3RpZmljYXRpb24sIGRlZmF1bHQ6IHRydWU8L2E+PGJyIC8+CjxhIGhyZWY9Ii9lbmFibGVub3RpZmljYXRpb24vMS9mYWxzZSI+ZGlzYWJsZSBub3RpZmljYXRpb24sIGRlZmF1bHQ6IHRydWU8L2E+PGJyIC8+CjxhIGhyZWY9Ii9nZXRudW1ub3RpZnlhcHBzIj5nZXQgdGhlIG51bWJlciBvZiBub3RpZmljYXRpb24gYXBwczwvYT48YnIgLz4KPGEgaHJlZj0iL2dldG5vdGlmeWFwcCBhcHAjIj5nZXQgTmFtZSwgTWF0cml4IGNvbG9ycywgU3VwZXIgTEVEIGNvbG9yIGFuZCBFbmFibGVkIGZsYWcgb2YgYXBwIG51bWJlciAoMC0yNTUpPC9hPjxiciAvPgo8YSBocmVmPSIvbm90aWZ5L1Bob25lJTIwQ2FsbC9vbi8wIj5kaXNwbGF5IFBob25lIENhbGwgbm90aWZpY2F0aW9uLCBwYXJhbWV0ZXJzIHNlZSBiZWxvdzwvYT48YnIgLz4KPGEgaHJlZj0iL25vdGlmeS9XaGF0c0FwcC9vbi8wIj5kaXNwbGF5IFdoYXRzQXBwIG5vdGlmaWNhdGlvbiwgcGFyYW1ldGVycyBzZWUgYmVsb3c8L2E+PGJyIC8+CjxhIGhyZWY9Ii9ub3RpZnkvRmFjZWJvb2svb24vMCI+ZGlzcGxheSBGYWNlYm9vayBub3RpZmljYXRpb24sIHBhcmFtZXRlcnMgc2VlIGJlbG93PC9hPjxiciAvPgo8YSBocmVmPSIvbm90aWZ5L0dNYWlsL29uLzAiPmRpc3BsYXkgR01haWwgbm90aWZpY2F0aW9uLCBwYXJhbWV0ZXJzIHNlZSBiZWxvdzwvYT48YnIgLz4KPGEgaHJlZj0iL25vdGlmeS9Nb2JpbGVNYWlsL29uLzAiPmRpc3BsYXkgTW9iaWxlTWFpbCBub3RpZmljYXRpb24sIHBhcmFtZXRlcnMgc2VlIGJlbG93PC9hPjxiciAvPgo8YSBocmVmPSIvbm90aWZ5L1R3ZWV0L29uLzAiPmRpc3BsYXkgVHdlZXQgbm90aWZpY2F0aW9uLCBwYXJhbWV0ZXJzIHNlZSBiZWxvdzwvYT48YnIgLz4KPGEgaHJlZj0iL25vdGlmeS9TTVMvb24vMCI+ZGlzcGxheSBTTVMgbm90aWZpY2F0aW9uLCBwYXJhbWV0ZXJzIHNlZSBiZWxvdzwvYT48YnIgLz4KPGEgaHJlZj0iL25vdGlmeS9MaW5lL29uLzAiPmRpc3BsYXkgTGluZSBub3RpZmljYXRpb24sIHBhcmFtZXRlcnMgc2VlIGJlbG93PC9hPjxiciAvPgo8YSBocmVmPSIvbm90aWZ5L0luc3RhZ3JhbS9vbi8wIj5kaXNwbGF5IEluc3RhZ3JhbSBub3RpZmljYXRpb24sIHBhcmFtZXRlcnMgc2VlIGJlbG93PC9hPjxiciAvPgo8YSBocmVmPSIvbm90aWZ5L0hhbmdvdXQvb24vMCI+ZGlzcGxheSBIYW5nb3V0IG5vdGlmaWNhdGlvbiwgcGFyYW1ldGVycyBzZWUgYmVsb3c8L2E+PGJyIC8+CjxhIGhyZWY9Ii9ub3RpZnkvR29vZ2xlUGx1cy9vbi8wIj5kaXNwbGF5IEdvb2dsZSsgbm90aWZpY2F0aW9uLCBwYXJhbWV0ZXJzIHNlZSBiZWxvdzwvYT48YnIgLz4KL3N0b3Jlbm90aWZpY2F0aW9uL2FwcGJ1bmRsZSA2NCooUkdCfFJSR0dCQikgUkdCIHRydWV8ZmFsc2UgLSBjcmVhdGVzIGEgbmV3IG5vdGlmaWNhdGlvbiBmb3IgYXBwLWJ1bmRsZW5hbWUgd2l0aCBjb2xvci1tYXRyaXggYW5kIFN1cGVyTEVEIGNvbG9yIGFuZCBpbml0aWFsIGVuYWJsZWQgc3RhdHVzPGJyIC8+CjxiciAvPgo8aDI+TDggZnJhbWVzPC9oMj4KL2RlbGV0ZWZyYW1lL2ZyYW1lIyAtIERlbGV0ZSBGcmFtZSBieSBudW1iZXIgKGJldHdlZW4gMCBhbmQgR2V0TnVtRnJhbWVzKTxiciAvPgo8YSBocmVmPSIvZ2V0bnVtZnJhbWVzIj5nZXQgdGhlIG51bWJlciBvZiBGcmFtZXMgaW4gVXNlciBzcGFjZTwvYT48YnIgLz4KPGEgaHJlZj0iL3JlYWRmcmFtZS8xIj5nZXRzIGZyYW1lIGZyb20gVXNlciBTcGFjZSAoZnJhbWUjIGJldHdlZW4gMCBhbmQgR2V0TnVtRnJhbWVzKTwvYT48YnIgLz4KL3N0b3JlZnJhbWUvNjQqKFJHQnxSUkdHQkIpIC0gc3RvcmVzIGEgbmV3IGZyYW1lIGluIHVzZXJzcGFjZSAocmV0dXJucyBuZXcgaW5kZXggb2YgZnJhbWUpPGJyIC8+CjxiciAvPgo8aDI+TDggYW5pbWF0aW9uczwvaDI+Ci9kZWxldGVhbmltL2FuaW0jIC0gRGVsZXRlIEFuaW1hdGlvbiBieSBudW1iZXIgKGJldHdlZW4gMCBhbmQgR2V0TnVtQW5pbXMpPGJyIC8+CjxhIGhyZWY9Ii9nZXRudW1hbmltcyI+Z2V0IHRoZSBudW1iZXIgb2YgYW5pbXMgaW4gVXNlciBzcGFjZTwvYT48YnIgLz4KPGEgaHJlZj0iL3BsYXlhbmltLzIvZmFsc2UiPnBsYXlzIGFuaW1hdGlvbiAjIGFzIGxvb3AgPSB0cnVlIG9yIG9uY2UgPSBmYWxzZTsgZGVmYXVsdDogbG9vcD10cnVlPC9hPjxiciAvPgo8YSBocmVmPSIvcmVhZGFuaW0vMiI+Z2V0cyBmcmFtZSBhbmQgZHVyYXRpb24gZm9yIGFuaW1hdGlvbiBmcm9tIFVzZXIgU3BhY2UgKGFuaW0jIGJldHdlZW4gMCBhbmQgR2V0TnVtQW5pbXMpPC9hPjxiciAvPgo8YSBocmVmPSIvc3RvcGFuaW0iPnN0b3BzIGN1cnJlbnQgYW5pbWF0aW9uPC9hPjxiciAvPgovc3RvcmVBbmltL2ZyYW1lIyxkdXJhdGlvbixmcmFtZSMsZHVyYXRpb24sLi4uIC0gc3RvcmVzIGEgbmV3IGFuaW1hdGlvbiBpbiB1c2Vyc3BhY2UgKHJldHVybnMgbmV3IGluZGV4IG9mIGFuaW0pPGJyIC8+CjxiciAvPgo8aDI+TDggbWF0cml4PC9oMj4KPGEgaHJlZj0iL2JveC8yLzIvNi82L2YwMC8wMGYvMGYwIj5zaG93cyBhIGJveCBmcm9tIGxlZnQvdG9wIHRvIHJpZ2h0L2JvdHRvbSB3aXRoIGJvcmRlciwgZmlsbCBhbmQgb3V0c2lkZSBjb2xvcjwvYT48YnIgLz4KPGEgaHJlZj0iL2JyaWdodG5lc3MvdHJ1ZSI+c2V0IGhpZ2ggYnJpZ2h0bmVzcyBvZiBMRURzIChtYXRyaXggYW5kIHN1cGVyKSB0cnVlID0gaGlnaCwgZmFsc2UgPSBsb3csIGRlZmF1bHQ6IGZhbHNlPC9hPjxiciAvPgo8YSBocmVmPSIvYnJpZ2h0bmVzcy9mYWxzZSI+c2V0IGxvdyBicmlnaHRuZXNzIG9mIExFRHMgKG1hdHJpeCBhbmQgc3VwZXIpIHRydWUgPSBoaWdoLCBmYWxzZSA9IGxvdywgZGVmYXVsdDogZmFsc2U8L2E+PGJyIC8+CjxhIGhyZWY9Ii9nZXRtYXRyaXgiPmdldCBjdXJyZW50IE1hdHJpeCBMRUQ8L2E+PGJyIC8+CjxhIGhyZWY9Ii9sZWQvNS81L0ZGRiI+IHNldCBhIHNpbmdsZSBMRUQgcGl4ZWw8L2E+PGJyIC8+CjxhIGhyZWY9Ii9tYXRyaXhsZWR1bmkvZmZmIj5zZXQgbWF0cml4IHRvIG9uZSBjb2xvciwgZGVmYXVsdDogMDAwID0gb2ZmPC9hPjxiciAvPgo8YSBocmVmPSIvbWF0cml4bGVkc3RyaW5nL2YwMGY3MGZmMDBmMDAwZjQwODgwZiI+c2V0IG1hdHJpeCB0byBjb2xvcmxpc3Q8L2E+PGJyIC8+CjxhIGhyZWY9Ii9tYXRyaXhvZmYiPmNsZWFyIG1hdHJpeDwvYT48YnIgLz4KPGJyIC8+CjxoMj5MOCBzdXBlciBMRUQ8L2gyPgo8YSBocmVmPSIvc3VwZXJsZWQvZmYwIj5zZXQgc3VwZXJsZWQgdG8gY29sb3IsIGRlZmF1bHQ6IDAwMCA9IG9mZjwvYT48YnIgLz4KPGJyIC8+CjxoMj5MOCB0ZXh0PC9oMj4KPGEgaHJlZj0iL2Rpc3BsYXljaGFyL0AvdG9wLzAiPmRpc3BsYXlzIGNoYXIgd2l0aCBvZmZzZXQgaW4gcGl4ZWxzIGZyb20gdG9wfGJvdHRvbXxsZWZ0fHJpZ2h0PC9hPjxiciAvPgo8YSBocmVmPSIvdGV4dC9mZjAvSGVsbG8lMjBXb3JsZC8wL2ZhbHNlIj5zY3JvbGxpbmcgdGV4dCAobWF4IGxlbmd0aDogMTgsIGNvbG9yIGFuZCB0ZXh0IGFyZSByZXF1aXJlZCBwYXJhbWV0ZXIpIHdpdGggc3BlZWQgMCA9IGZhc3QsIDEgPSBtZWRpdW0sIDIgPSBzbG93IGFuZCB0cnVlfGZhbHNlIGZvciBsb29wLCBEZWZhdWx0OiBsb29wID0gdHJ1ZTwvYT48YnIgLz4KPGJyIC8+CjxoMj5MOCBhZC1ob2MgYW5pbWF0aW9uczwvaDI+CjxhIGhyZWY9Ii9yZXBlYXQvMTAvMTAwMC9nZXR0ZW1wIj5yZXBlYXRzIGFsbCBjb21tYW5kcyBudW1iZXIgb2YgdGltZXMgc3BlY2lmaWVkIG9yIGZvcmV2ZXIgd2l0aCBvcHRpb25hbCBkZWxheSAoc3BlY2lmaWVkIGluIDEwMHRoIG9mIGEgc2Vjb25kKSBiZXR3ZWVuIGNvbW1hbmRzPC9hPjxiciAvPgo8YSBocmVmPSIvcmVwZWF0c2lsZW50LzIwLzUwL3N1cGVyLzQwMC9zdXBlci84MDAvc3VwZXIvYzAwL3N1cGVyL2YwMC9zdXBlci84MDAvc3VwZXIvMDAwIj5yZXBlYXRzIGFsbCBjb21tYW5kcyBudW1iZXIgb2YgdGltZXMgc3BlY2lmaWVkIG9yIGZvcmV2ZXIgd2l0aCBvcHRpb25hbCBkZWxheSAoc3BlY2lmaWVkIGluIDEwMHRoIG9mIGEgc2Vjb25kKSBiZXR3ZWVuIGNvbW1hbmRzIHdpdGhvdXQgcHJpbnRpbmcgcmVzcG9uc2VzIGZyb20gTDg8L2E+PGJyIC8+CjxhIGhyZWY9Ii9yZXBlYXRzaWxlbnQvMTAvNzUvc3VwZXIvZjAwL3N1cGVyLzAwMC9zdXBlci8wMGYvc3VwZXIvMDAwLyI+cmVkL2JsdWUgYmxpbmtpbmcgc3VwZXI8L2E+PGJyIC8+CjxhIGhyZWY9Ii9yZXBlYXRzaWxlbnQvMTUvNTAvbWF0cml4c3RyaW5nL2YwMGY3MGZmMDBmMDAwZjQwODgwZi9tYXRyaXhzdHJpbmcvZjcwZmYwMGYwMDBmNDA4ODBmZjAwL21hdHJpeHN0cmluZy9mZjAwZjAwMGY0MDg4MGZmMDBmNzAvbWF0cml4c3RyaW5nLzBmMDAwZjQwODgwZmYwMGY3MGZmMC9tYXRyaXhzdHJpbmcvMDBmNDA4ODBmZjAwZjcwZmYwMGYwL21hdHJpeHN0cmluZy80MDg4MGZmMDBmNzBmZjAwZjAwMGYvbWF0cml4c3RyaW5nLzgwZmYwMGY3MGZmMDBmMDAwZjQwOCI+cmFpbmJvdyBhbmltYXRpb248L2E+PGJyIC8+CjxiciAvPgo8aDI+TDggc2VyaWFsIHBvcnQ8L2gyPgo8YSBocmVmPSIvaW50ZXJmYWNlLyUyRmRldiUyRnR0eUFDTTEvbWF0cml4b2ZmIj5jaGFuZ2VzIHNldHMgQ09NLXBvcnQsIGRlZmF1bHQ6IDo6c2VyaWFsUG9ydDo6PC9hPjxiciAvPgo8YnIgLz4KPGgyPkw4IG1pc2M8L2gyPgo8YSBocmVmPSIvYm9vdGxvYWRlciI+c3dpdGNoIHRvIERGVSBtb2RlPC9hPjxiciAvPgovZGVsZXRldXNlcnNwYWNlL1lFUyAtIERlbGV0ZSB1c2Vyc3BhY2UgKHNldCBZRVMgdG8gZGVsZXRlKTxiciAvPgo8YSBocmVmPSIvaW5pdCI+Z2V0IHRyYWNlIGluZm88L2E+PGJyIC8+CjxhIGhyZWY9Ii9wb3dlcm9mZiI+cG93ZXJvZmY8L2E+PGJyIC8+CjxhIGhyZWY9Ii9yZXNldCI+cmVzZXQ8L2E+PGJyIC8+CjxhIGhyZWY9Ii9zdGF0dXNsZWQvZmFsc2UiPnR1cm4gc3RhdHVzIExFRHMgb24gb3Igb2ZmLCBkZWZhdWx0OiBmYWxzZSA9IG9mZjwvYT48YnIgLz4KPGEgaHJlZj0iL3VpZCI+cXVlcnkgZGV2aWNlIFVJRDwvYT48YnIgLz4KPGEgaHJlZj0iL3ZlcnNpb24iPnF1ZXJ5IGRldmljZSB2ZXJzaW9uczwvYT48YnIgLz4KPGJyIC8+CjwvYm9keT4KPC9odG1sPgo"}];
js.Node.setTimeout = setTimeout;
js.Node.clearTimeout = clearTimeout;
js.Node.setInterval = setInterval;
js.Node.clearInterval = clearInterval;
js.Node.global = global;
js.Node.process = process;
js.Node.require = require;
js.Node.console = console;
js.Node.module = module;
js.Node.stringify = JSON.stringify;
js.Node.parse = JSON.parse;
var version = HxOverrides.substr(js.Node.process.version,1,null).split(".").map(Std.parseInt);
if(version[0] > 0 || version[1] >= 9) {
	js.Node.setImmediate = setImmediate;
	js.Node.clearImmediate = clearImmediate;
}
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = { };
haxe.crypto.Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe.crypto.Base64.BYTES = haxe.io.Bytes.ofString(haxe.crypto.Base64.CHARS);
hxl8.L8CmdParser.m_commands = ["appstop","stop","appambient","appdice","dice","applight","appcolorchange","colorchange","appproximity","appprox","autorotate","bootloader","dfu","batchg","bat","brightness","bright","box","button","deletel8y","deleteanim","deleteframe","deleteusermemory","deleteuserspace","displaychar","char","enableallnotifications","enableallnotify","enablenotification","enablenotify","notifyenable","getacc","accelerator","acc","getamb","ambient","amb","getmatrix","getmcutemp","mcutemperature","mcutemp","getmic","microphone","mic","noise","getnoise","getnotifyapp","readnotifyapp","getnotify","readnotify","getnumnotifyapps","numnotifyapps","numnotify","getnumanims","numanims","getnumframes","numframes","numframe","getnuml8ies","getnuml8y","numl8ies","numl8y","getprox","proximity","prox","getthreshold","sensorthresholds","thresholds","threshold","gettemp","temperature","temp","getvoltage","voltage","getvbus","vbus","init","initstatus","status","interface","int","if","matrixoff","matrixclear","clear","poweroff","off","notificationssilent","notification","notify","party","playanim","play","ping","readanim","readframe","readl8y","silentrepeat","repeat","repeatsilent","reset","setmatrixledfile","matrixledfile","matrixfile","setled","led","setl8y","l8y","setmatrixledstring","matrixledstring","matrixstring","setnotificationsilence","silence","silent","setmatrixleduni","matrixleduni","matrixuni","setsuperled","superled","super","setorientation","orientation","orient","setambthreshold","ambthreshold","setnoisethreshold","noisethreshold","setproxthreshold","proxthreshold","statusleds","statusled","stopanim","storeanim","storel8y","storel8yfile","storeframe","storeframefile","storenotification","storenotify","setnotify","setnotification","text","uid","version","versions","ver","v","hex","csv","csvheader","csvhead","numanim","delay"];
hxl8.commands.L8CmdSetText.MAX_LENGTH = 18;
js.NodeC.UTF8 = "utf8";
js.NodeC.ASCII = "ascii";
js.NodeC.BINARY = "binary";
js.NodeC.BASE64 = "base64";
js.NodeC.HEX = "hex";
js.NodeC.EVENT_EVENTEMITTER_NEWLISTENER = "newListener";
js.NodeC.EVENT_EVENTEMITTER_ERROR = "error";
js.NodeC.EVENT_STREAM_DATA = "data";
js.NodeC.EVENT_STREAM_END = "end";
js.NodeC.EVENT_STREAM_ERROR = "error";
js.NodeC.EVENT_STREAM_CLOSE = "close";
js.NodeC.EVENT_STREAM_DRAIN = "drain";
js.NodeC.EVENT_STREAM_CONNECT = "connect";
js.NodeC.EVENT_STREAM_SECURE = "secure";
js.NodeC.EVENT_STREAM_TIMEOUT = "timeout";
js.NodeC.EVENT_STREAM_PIPE = "pipe";
js.NodeC.EVENT_PROCESS_EXIT = "exit";
js.NodeC.EVENT_PROCESS_UNCAUGHTEXCEPTION = "uncaughtException";
js.NodeC.EVENT_PROCESS_SIGINT = "SIGINT";
js.NodeC.EVENT_PROCESS_SIGUSR1 = "SIGUSR1";
js.NodeC.EVENT_CHILDPROCESS_EXIT = "exit";
js.NodeC.EVENT_HTTPSERVER_REQUEST = "request";
js.NodeC.EVENT_HTTPSERVER_CONNECTION = "connection";
js.NodeC.EVENT_HTTPSERVER_CLOSE = "close";
js.NodeC.EVENT_HTTPSERVER_UPGRADE = "upgrade";
js.NodeC.EVENT_HTTPSERVER_CLIENTERROR = "clientError";
js.NodeC.EVENT_HTTPSERVERREQUEST_DATA = "data";
js.NodeC.EVENT_HTTPSERVERREQUEST_END = "end";
js.NodeC.EVENT_CLIENTREQUEST_RESPONSE = "response";
js.NodeC.EVENT_CLIENTRESPONSE_DATA = "data";
js.NodeC.EVENT_CLIENTRESPONSE_END = "end";
js.NodeC.EVENT_NETSERVER_CONNECTION = "connection";
js.NodeC.EVENT_NETSERVER_CLOSE = "close";
js.NodeC.FILE_READ = "r";
js.NodeC.FILE_READ_APPEND = "r+";
js.NodeC.FILE_WRITE = "w";
js.NodeC.FILE_WRITE_APPEND = "a+";
js.NodeC.FILE_READWRITE = "a";
js.NodeC.FILE_READWRITE_APPEND = "a+";
hxl8.L8NodeSrv.main();
})();
