/**
 * Returns a Function that, when called, changes the value of super on its
 * context, calls the receiver of wrapSuper, and reverts the value of super on
 * its context.
 * @param {Object} sup - The Object to be defined as this.super.
 */
Object.defineProperty(Function.prototype, "wrapSuper", { value: function(sup) {
	var func = this;
	if(typeof sup != "function") {
		sup = function(sup) { return function() { return sup } }(sup);
	}
	return function() {
		var oldSuper = this.super
		  , returnValue;
		this.super = sup;
		try {
			returnValue = func.apply(this, arguments);
		} finally {
			this.super = oldSuper;
		}
		return returnValue;
	}
}});