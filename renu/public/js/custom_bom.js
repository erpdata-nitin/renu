frappe.ui.form.on('BOM', {
	onload: function(frm) {
        console.log("Bom")
		frm.set_query("item", function(doc) {
			return {
				filters: [
				    ['Item', 'is_customer_ref', '=', 1],
				]
			};
		});
	},
    // set_item: function(frm) {
	// 	frm.clear_table("items")
	// 	frm.refresh_field('items')
	// 	frappe.call({
	// 		method:'renu.renu.utilities.append_item',//function name defined in python
	// 		args:{
	// 			self: frm.doc, //current document
	// 		}
			
	// 	});
	// },
})
