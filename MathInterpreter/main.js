const lexer = input => {
	let tokens = [],
		c,
		i = 0,
		isOperator = c => /[+\-*\/\^%=(),]/.test(c),
		isDigit = c => /[0-9]/.test(c),
		isWhiteSpace = c => /\s/.test(c),
		isIdentifier = c => typeof c === "string" && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c),
		advance = () => c = input[++i],
		addToken = (type, value) => tokens.push({
			type: type,
			value: value,
		});
	
	while (i < input.length) {
		c = input[i];

		if (isWhiteSpace(c)) advance();
		else if (isOperator(c)) {
			addToken(c);
			advance();
		}
		else if (isDigit(c)) {
			var num = c;
			while (isDigit(advance())) {num += c}
			if (c === '.') {while (isDigit(advance())) {num += c}}
			num = parseFloat(num);
			if (!isFinite(num)) {throw "Number is too large or too small for a 64-bit double."}
			addToken("number", num);
		}
		else if (isIdentifier(c)) {
			var idn = c;
			while (isIdentifier(advance())) {idn += c}
			addToken("identifier", idn);
		}
		else {throw "Unrecognized token."}
	}
	addToken("(end)");
	return tokens
};



var parse = function(tokens) {
	var parseTree = [], symbols = {},
	symbol = function(id, nud, lbp, led) {
		var sym = symbols[id] || {};
		symbols[id] = {
			lbp: sym.lbp || lbp,
			nud: sym.nud || nud,
			led: sym.led || led
		};
	},
	interpretToken = function(token) {
		var sym = Object.create(symbols[token.type]);
		sym.type = token.type;
		sym.value = token.value;
		return sym;
	}, i = 0,
	token = function() {return interpretToken(tokens[i])},
	advance = function() {i++; return token()},
	expression = function(rbp) {
		var left, t = token();
		advance();
		if (!t.nud) {throw 'Unexpected token "' + t.type + '"'}
		left = t.nud(t);
		while (rbp < token().lbp) {
			t = token();
			advance();
			if (!t.led) {throw 'Unexpected token "' + t.type + '"'}
			left = t.led(left);
		}
		return left;
	},
	infix = function(id, lbp, rbp, led) {
		rbp = rbp || lbp;
		symbol(id, null, lbp, led || function(left) {
			return {type: id, left: left, right: expression(rbp)}
		})
	},
	prefix = function(id, rbp) {
		symbol(id, function() {
			return {type: id, right: expression(rbp)}
		})
	};
	
	prefix('-', 7);
	infix('^', 6, 5);
	infix('*', 4);
	infix('/', 4);
	infix('%', 4);
	infix('+', 3);
	infix('-', 3);
	symbol(',');
	symbol(')');
	symbol("(end)");
	symbol('(', function() {
		value = expression(2);
		if (token().type !== ')') {throw "Expected closing parenthesis ')'"}
		advance();
		return value
	});
	symbol("number", function(number) {return number});
	symbol("identifier", function(name) {
		if (token().type === '(') {
			var args = [];
			if (tokens[i + 1].type === ')') advance();
			else {
				do {
					advance();
					args.push(expression(2));
				} while (token().type === ',');
				if (token().type !== ')') throw "Expected closing parenthesis ')'"
			}
			advance();
			return {
				type: "call",
				args: args,
				name: name.value
			}
		}
		return name
	});
	infix('=', 1, 2, function (left) {
		if (left.type === "call") {
			for (var i = 0; i < left.args.length; i++) {if (left.args[i].type !== "identifier") throw "Invalid argument name"}
			return {
				type: "function",
				name: left.name,
				args: left.args,
				value: expression(2)
			}
		}
		else if (left.type === "identifier") {
			return {
				type: "assign",
				name: left.value,
				value: expression(2)
			}
		}
		else throw "Invalid value"
	});
	
	while (token().type !== "(end)") {parseTree.push(expression(0))}
	return parseTree;
};



var evaluate = function (parseTree) {
	var operators = {
		'+': function(a, b) {return a + b},
		'-': function(a, b) {
			if (typeof b === "undefined") return -a;
			return a - b;
		},
		'*': function(a, b) {return a * b},
		'/': function(a, b) {return a / b},
		'%': function(a, b) {return a % b},
		'^': function(a, b) {return Math.pow(a, b)}
	},
	constants = {
		pi: Math.PI,
		e: Math.E,
	},
	functions = {
		sin: Math.sin,
		cos: Math.cos,
		tan: Math.cos,
		asin: Math.asin,
		acos: Math.acos,
		atan: Math.atan,
		abs: Math.abs,
		round: Math.round,
		ceil: Math.ceil,
		floor: Math.floor,
		log: Math.log,
		exp: Math.exp,
		sqrt: Math.sqrt,
		max: Math.max,
		min: Math.min,
		random: Math.random,
	},
	args = {},
	parseNode = function(node) {
		if (node.type === "number") return node.value;
		else if (operators[node.type]) {
			if (node.left) return operators[node.type](parseNode(node.left), parseNode(node.right));
			return operators[node.type](parseNode(node.right));
		}
		else if (node.type === "identifier") {
			var value = args.hasOwnProperty(node.value) ? args[node.value] : constants[node.value];
			if (typeof value === "undefined") throw node.value + " is undefined";
			return value;
		}
		else if (node.type === "assign") {constants[node.name] = parseNode(node.value)}
		else if (node.type === "call") {
			for (var i = 0; i < node.args.length; i++) node.args[i] = parseNode(node.args[i]);
			return functions[node.name].apply(null, node.args);
		}
		else if (node.type === "function") {
			functions[node.name] = function() {
				for (var i = 0; i < node.args.length; i++) {
					args[node.args[i].value] = arguments[i];
				}
				var ret = parseNode(node.value);
				args = {};
				return ret
			}
		}
	},
	output = '';
	for (i = 0; i < parseTree.length; i++) {
		var value = parseNode(parseTree[i]);
		if (typeof value !== "undefined") output += value + '\n'
	}
	return output
}



var calculate = function(input) {
	try {return evaluate(parse(lexer(input)))}
	catch (e) {return e}
}



// interpreter code end //



var test = prompt("Enter a calculation:");
alert("Result of " + test + ":\n" + calculate(test))