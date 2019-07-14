var scriptElement = document.getElementById('graph-dependencies-script');
var nodeCollection = scriptElement.parentElement.querySelectorAll('.node');
var addClass = function (element, cls) {
	cls.split(/\s+/).forEach(function (c) {
		var currentClass = element.getAttribute('class');
		if (currentClass.indexOf(cls) === -1) {
			element.setAttribute('class', currentClass + ' ' + cls);
		}
	});
};
var removeClass = function (element, cls) {
	cls.split(/\s+/).forEach(function (c) {
		element.setAttribute('class', (element.getAttribute('class') || '').replace(new RegExp('\\s*' + c, 'g'), ''));
	});
};
var getNodeName = function (nodeElement) {
	return nodeElement.querySelector('text').innerHTML;
};
var getNodeByName = function (fnName) {
	var result = null;
	[].some.call(nodeCollection, function (nodeElement, i) {
		if (getNodeName(nodeElement) === fnName) {
			result = nodeElement;
		}

		return result !== null;
	});
	return result;
};
var highlightColors = {
	children: 'blue',
	parents: 'red'
};
var highlight = function (root, nodes, color) {
	if (root === false) {
		currentlyHighlighted.nodes.forEach(function (nodeElement) {
			removeClass(nodeElement, 'selected ' + Object.keys(highlightColors).map(function (key) {
				return highlightColors[key];
			}).join(' '));
		});
		currentlyHighlighted = null;
	} else {
		nodes.forEach(function (nodeElement) {
			addClass(nodeElement, 'selected ' + color);
		});
		currentlyHighlighted = {
			root: root,
			nodes: nodes
		};
	}
};
var isShiftPressed = false;
var currentlyHighlighted = null;
var nodeRelations = new Map();

document.onkeydown = function(e) {
	if (e.code === 'ShiftLeft') {
		isShiftPressed = true;
		if (currentlyHighlighted !== null) {
			var root = currentlyHighlighted.root;
			highlight(false);
			highlight(root, nodeRelations.get(root).inverseDependencies, highlightColors.parents);
		}
	}
};

document.onkeyup = function(e) {
	if (e.code === 'ShiftLeft') {
		isShiftPressed = false;
		if (currentlyHighlighted !== null) {
			var root = currentlyHighlighted.root;
			highlight(false);
			highlight(root, nodeRelations.get(root).dependencies, highlightColors.children);
		}
	}
};

[].forEach.call(nodeCollection, function (nodeElement, i) {
	var nodeName = getNodeName(nodeElement);
	var nodeDependencies = new Set([nodeElement]);
	var inverseNodeDependencies = new Set([nodeElement]);

	dependencies.get(nodeName).forEach(function (name) {
		nodeDependencies.add(getNodeByName(name));
	});
	inverseDependencies.get(nodeName).forEach(function (name) {
		inverseNodeDependencies.add(getNodeByName(name));
	});

	nodeRelations.set(nodeElement, {
		dependencies: nodeDependencies,
		inverseDependencies: inverseNodeDependencies
	});

	nodeElement.onmouseenter = function (e) {
		if (isShiftPressed) {
			highlight(nodeElement, inverseNodeDependencies, highlightColors.parents);
		} else {
			highlight(nodeElement, nodeDependencies, highlightColors.children);
		}

	};
	nodeElement.onmouseleave = function (e) {
		highlight(false);
	};
});