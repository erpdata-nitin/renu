# Copyright (c) 2023, Renu and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class DownTime(Document):
	@frappe.whitelist()
	def fetch_wo(self):
		doc1 = frappe.get_doc('Work Order', self.work_order)
		if doc1.operations:
				for detail in doc1.operations:
					self.append("down_time_item",{
						"job_card":detail.operation,
						"job_card_actually_time":detail.actual_operation_time,
						"work_order_child":self.work_order,
					})

				self.rejection_addition()
		else:
			frappe.throw("job Card Not Available")

	def rejection_addition(self):
		total_sum = 0
		for qd in self.get('down_time_item'):
			total_sum = total_sum + qd.job_card_actually_time
		self.actually_work_time = total_sum

	def before_save(self):
		# tot = 0
		# tot = self.actually_work_time + self.total_down_time
		if(self.shift_time >= self.calculate_time):
			frappe.msgprint("Shift Time and Work Time Not Match ")
		else:
			pass

		doc1 = frappe.get_doc('Work Order', self.work_order)
		if self.name == doc1.name:
			frappe.db.set_value("Work Order", self.name, "down_time_document", self.name)


