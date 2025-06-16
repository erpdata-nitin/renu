// Copyright (c) 2024, Renu and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Log File Details Report"] = {
	"filters": [
		{
			"fieldname": "name",
			"fieldtype": "Link",
			"label": "Select Work Order",
			"options": "Work Order"

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