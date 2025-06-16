// Copyright (c) 2023, Renu and contributors
// For license information, please see license.txt


frappe.ui.form.on('Down Time', {
	work_order: function (frm) {
		frm.clear_table("down_time_item"); 
		frm.refresh_field('down_time_item'); 
		frm.call({
			method: 'fetch_wo',//function name defined in python
			doc: frm.doc, //current document
		});
		
	}
});


frappe.ui.form.on("Down Time Item", {
	time_in_min:function(frm, cdt, cdn){
	var d = locals[cdt][cdn];
	var total1 = 0;
	frm.doc.down_time_item.forEach(function(d) { total1 += d.time_in_min; });
	frm.set_value("total_down_time", total1);
	refresh_field("total_down_time");
  },
  down_time_item_remove:function(frm, cdt, cdn){
	var d = locals[cdt][cdn];
	var total1 = 0;
	frm.doc.down_time_item.forEach(function(d) { total1 += d.time_in_min; });
	frm.set_value("total_down_time", total1);
	refresh_field("total_down_time");
   }
 });

 frappe.ui.form.on('Down Time', {
	setup: function(frm) {
		frm.set_query("job_card", "down_time_item", function(doc, cdt, cdn) {
			let d = locals[cdt][cdn];
			return {
				filters: [
					['Job Card', 'work_order', '=', frm.doc.work_order],
				]
			};
		});
	},
});

frappe.ui.form.on("Down Time", {
  down_time_item_remove:function(frm, cdt, cdn){
	var d = locals[cdt][cdn];
	var total1 = 0;
	frm.doc.down_time_item.forEach(function(d) { total1 += d.job_card_actually_time; });
	frm.set_value("actually_work_time", total1);
	refresh_field("actually_work_time");
   }
 });

 frappe.ui.form.on("Down Time Item", {
	time_in_min:function(frm, cdt, cdn){
	var d = locals[cdt][cdn];
	var total1 = 0;
	total1 = frm.doc.actually_work_time + frm.doc.total_down_time
	frm.set_value("calculate_time", total1);
	refresh_field("calculate_time");
  }
 });
