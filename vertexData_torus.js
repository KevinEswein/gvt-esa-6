var torus = (function() {

	function createVertexData() {
		var n = 32;
		var m = 32;
		var R = 1.5; // Großer Radius
		var r = 0.5; // Kleiner Radius

		var vertices = new Float32Array(3 * (n + 1) * (m + 1));
		var normals = new Float32Array(3 * (n + 1) * (m + 1));
		var indicesLines = new Uint16Array(2 * 2 * n * m);
		var indicesTris = new Uint16Array(3 * 2 * n * m);

		var du = 2 * Math.PI / n;
		var dv = 2 * Math.PI / m;

		var iLines = 0;
		var iTris = 0;

		for (var i = 0, u = 0; i <= n; i++, u += du) {
			for (var j = 0, v = 0; j <= m; j++, v += dv) {

				var iVertex = i * (m + 1) + j;

				var x = (R + r * Math.cos(u)) * Math.cos(v);
				var y = (R + r * Math.cos(u)) * Math.sin(v);
				var z = r * Math.sin(u);

				vertices[iVertex * 3] = x;
				vertices[iVertex * 3 + 1] = y;
				vertices[iVertex * 3 + 2] = z;

				var nx = Math.cos(u) * Math.cos(v);
				var ny = Math.cos(u) * Math.sin(v);
				var nz = Math.sin(u);

				normals[iVertex * 3] = nx;
				normals[iVertex * 3 + 1] = ny;
				normals[iVertex * 3 + 2] = nz;

				if (j > 0 && i > 0) {
					indicesLines[iLines++] = iVertex - 1;
					indicesLines[iLines++] = iVertex;

					indicesLines[iLines++] = iVertex - (m + 1);
					indicesLines[iLines++] = iVertex;

					indicesTris[iTris++] = iVertex;
					indicesTris[iTris++] = iVertex - 1;
					indicesTris[iTris++] = iVertex - (m + 1);

					indicesTris[iTris++] = iVertex - 1;
					indicesTris[iTris++] = iVertex - (m + 1) - 1;
					indicesTris[iTris++] = iVertex - (m + 1);
				}
			}
		}

		this.vertices = vertices;
		this.normals = normals;
		this.indicesLines = indicesLines;
		this.indicesTris = indicesTris;
	}

	return {
		createVertexData: createVertexData
	}

}());
