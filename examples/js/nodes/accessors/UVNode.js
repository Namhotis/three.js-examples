(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('three.UVNode', ['three'], factory);
    }
    else if ('undefined' !== typeof exports && 'undefined' !== typeof module) {
        module.exports = factory(require('three'));
    }
    else {
        factory(root.THREE);
    }
}(this, function(THREE) {

/**
 * @author sunag / http://www.sunag.com.br/
 */

THREE.UVNode = function ( index ) {

	THREE.TempNode.call( this, 'v2', { shared: false } );

	this.index = index || 0;

};

THREE.UVNode.vertexDict = [ 'uv', 'uv2' ];
THREE.UVNode.fragmentDict = [ 'vUv', 'vUv2' ];

THREE.UVNode.prototype = Object.create( THREE.TempNode.prototype );
THREE.UVNode.prototype.constructor = THREE.UVNode;
THREE.UVNode.prototype.nodeType = "UV";

THREE.UVNode.prototype.generate = function ( builder, output ) {

	var material = builder.material;
	var result;

	material.requires.uv[ this.index ] = true;

	if ( builder.isShader( 'vertex' ) ) result = THREE.UVNode.vertexDict[ this.index ];
	else result = THREE.UVNode.fragmentDict[ this.index ];

	return builder.format( result, this.getType( builder ), output );

};

THREE.UVNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.index = this.index;

	}

	return data;

};
}));