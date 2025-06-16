// Copyright (c) 2024, Renu and contributors
// For license information, please see license.txt
/* eslint-disable */

// frappe.query_reports["Log File Report"] = {
// 	"filters": [

// 	]
// };

// Copyright (c) 2023, Renu and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Log File Report"] = {
	"filters": [
		{
			"fieldname": "work_order",
			"fieldtype": "Link",
			"label": "Select Work Order",
			"options": "Work Order",
			'reqd':1,

		},
		{
			"fieldname": "from_date",
			"fieldtype": "Date",
			"label": " From Date",
			'reqd':1,
			'default': frappe.datetime.add_months(frappe.datetime.get_today(), -1)


		},
		{
			"fieldname": "to_date",
			"fieldtype": "Date",
			"label": " To Date",
			'reqd':1,
			'default':frappe.datetime.get_today(),

		},
	]
};

// // Copyright (c) 2023, Abhishek Chougule and contributors
// // For license information, please see license.txt
// /* eslint-disable */

// frappe.query_reports["Machining Summary Report"] = {
// 	"filters": [

// 		{
// 			"fieldname": "company",
// 			"fieldtype": "Link",
// 			"label": "Company",
// 			"options": "Company",

// 		},
// 		{
// 			"fieldname": "from_date",
// 			"fieldtype": "Date",
// 			"label": " From Date",
// 			'reqd':1,
// 			'default': frappe.datetime.add_months(frappe.datetime.get_today(), -1)


// 		},
// 		{
// 			"fieldname": "to_date",
// 			"fieldtype": "Date",
// 			"label": " To Date",
// 			'reqd':1,
// 			'default':frappe.datetime.get_today(),

// 		},
// 		{
// 			"fieldname": "item_code",
// 			"fieldtype": "Link",
// 			"label": "Item Code",
// 			"options": "Item",

// 		},

// 	]
// };
