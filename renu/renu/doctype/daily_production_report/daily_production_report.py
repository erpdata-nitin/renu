# Copyright (c) 2023, Renu and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class DailyProductionReport(Document):
	
	@frappe.whitelist()
	def manhour(self):
		man_hour = 0
		man_hour_st = 0

		for m in self.get("regular_production_man_hour"):
			if (m.production_qtyunit > 0):
				man_hour = m.production_qtyunit * m.ktmin
				m.ktman_hour = man_hour
    
				man_hour_st = m.production_qtyunit * m.stmin
				m.stman_hour = man_hour_st
				# frappe.msgprint(str(man_hour))
	
		self.total_production_qty = self.calculating_total_weight("regular_production_man_hour","production_qtyunit")
  
		for qty in self.get("production_analysis",filters = {"item":'Production Qty'}):
			qty.today = self.total_production_qty
				
		
		self.total_man_hourkt = self.calculating_total_weight("regular_production_man_hour","ktman_hour")
		self.total_man_hourst = self.calculating_total_weight("regular_production_man_hour","stman_hour")
  
		for r in self.get("production_man_hours"):
			if(r.item == "Regular"):
				r.today = self.total_man_hourst
				
    
    
	@frappe.whitelist()
	def qty(self):
		self.total_ir_qty = self.calculating_total_weight("irregular_production_man_hour","production_qtyunits")
  
   
	@frappe.whitelist()
	def irregular(self):
		kt_man = 0
		for k in self.get("irregular_production_man_hour"):
			if (k.production_qtyunits > 0):
				kt_man = k.production_qtyunits * k.kt_min
				k.ktman_hour = kt_man
		self.total_ir_kt_man_hour = self.calculating_total_weight("irregular_production_man_hour","ktman_hour")
  
		for o in self.get("other_man_hour_details"):
			if(o.item == 'KT Man-hour'):
				o.today = self.total_man_hourkt + self.total_ir_kt_man_hour
	
	@frappe.whitelist()
	def irregular_st(self):
		st_man = 0
		for s in self.get("irregular_production_man_hour"):
			if (s.production_qtyunits > 0):
				st_man = s.production_qtyunits * s.stmin
				s.stman_hour = st_man
		self.total_ir_st_man_hour = self.calculating_total_weight("irregular_production_man_hour","stman_hour")
  
		for i in self.get("production_man_hours"):
			if (i.item == "Irregular"):
				i.today = self.total_ir_st_man_hour

		self.production_sub_total = self.calculating_total_weight("production_man_hours","today")	
    
	@frappe.whitelist()
	def particulars(self):
		
		if (self.counter == 0) :
			content_list = ["Employee M/P","Absence M/P","Over Time M/P"]
			for i in content_list:
				self.append("production_manpower",{"particulars":i})

			i_list = ["Regular","Irregular"]
			for k in i_list:
				self.append("production_man_hours",{"item":k})

			item_list = ["Normal working Time","Over Time"]
			for m in item_list :
				self.append("man_hours",{"item" :m})

			other_list = ["KT Man-hour","Effective Man-hour","Total Man-hour"]
			for s in other_list:
				self.append("other_man_hour_details",{"item" :s})

			st_loss_list = ["Assembly Allowance","Model changeover","Transportation","Process Quality","Process Control"]
			for e in st_loss_list:
				self.append("st_loss_analysis",{"details" :e})

			production = ["Factory Efficiency","Production efficiency","Production Qty","Line Drop Qty","Go through ratio","Attendance ratio"]
			for p in production:
				self.append("production_analysis",{"item" :p})
			self.counter = 1
		else:
			pass
   
	@frappe.whitelist()
	def subtotal(self):
		total = 0
		for t in self.get("production_manpower"):
			if(t.particulars == "Employee M/P" or t.particulars =="Absence M/P" or t.particulars =="Over Time M/P"):
				total = t.direct_permanent + t.direct_temporary
				t.sub_total = total
    
	@frappe.whitelist()
	def supptotal(self):
		sub_total = 0
		for t in self.get("production_manpower"):
			if(t.particulars == "Employee M/P" or t.particulars =="Absence M/P" or t.particulars =="Over Time M/P"):
				sub_total = t.supplementary_supervisor + t.supplementary_line_leader + t.supplementary_repair + t.supplementary_transportation
				t.supplementary_sub_total = sub_total
    
	@frappe.whitelist()
	def total(self):
		final_total = 0
		for t in self.get("production_manpower"):
			if(t.particulars == "Employee M/P" or t.particulars =="Absence M/P" or t.particulars =="Over Time M/P"):
				final_total = t.direct_permanent +t.direct_temporary+t.supplementary_supervisor+t.supplementary_line_leader+t.supplementary_repair+t.supplementary_transportation +t.support
				t.total = final_total
    
		for at in self.get("production_analysis",filters = {"item":'Attendance ratio'}):
			for nt in self.get("production_manpower",filters = {"particulars" : 'Employee M/P'}):
				at.today = self.normal_total/nt.total
			 
    
	@frappe.whitelist()
	def set_normal_temp(self):
		
		for i in self.get("production_manpower",filters = {"particulars":'Employee M/P'}):
			e_direct_permanent = i.direct_permanent
			e_direct_temporary = i.direct_temporary
			e_sub_total = i.sub_total
			e_supplementary_supervisor = i.supplementary_supervisor
			e_supplementary_line_leader = i.supplementary_line_leader
			e_supplementary_repair = i.supplementary_repair
			e_supplementary_transportation = i.supplementary_transportation
			e_supplementary_sub_total = i.supplementary_sub_total
			e_support = i.support
			e_total = i.total
			 

		for j in self.get("production_manpower",filters = {"particulars":"Absence M/P"}):
			a_direct_permanent = j.direct_permanent
			a_direct_temporary = j.direct_temporary
			a_sub_total = j.sub_total
			a_supplementary_supervisor = j.supplementary_supervisor
			a_supplementary_line_leader = j.supplementary_line_leader
			a_supplementary_repair = j.supplementary_repair
			a_supplementary_transportation = j.supplementary_transportation
			a_supplementary_sub_total = j.supplementary_sub_total
			a_support = j.support
			a_total = j.total
			 
			self.normal_permanent = e_direct_permanent - a_direct_permanent
			self.normal_temporary = e_direct_temporary - a_direct_temporary 
			self.normal_sub_total = e_sub_total - a_sub_total
			self.normal_supervisor = e_supplementary_supervisor - a_supplementary_supervisor
			self.normal_line_leader = e_supplementary_line_leader - a_supplementary_line_leader
			self.normal_repair = e_supplementary_repair  - a_supplementary_repair
			self.normal_transportation = e_supplementary_transportation - a_supplementary_transportation
			self.normal_supp_total = e_supplementary_sub_total - a_supplementary_sub_total
			self.normal_support  = e_support + a_support
			self.normal_total = e_total - a_total
			  
	@frappe.whitelist()
	def set_todays_man_hours(self):
		for m in self.get("non_st_man_hours",filters = {"details":'Absence'}):
			m.todays_man_hours = self.normal_working_hours * self.get("production_manpower")[1].total
		
		for k in self.get("non_st_man_hours",filters = {"details":'Non-effective'}):
			k.todays_man_hours = self.total_non_effective_time 
   
		self.total_non_st_man_hours = self.calculating_total_weight("non_st_man_hours","todays_man_hours")
	
	@frappe.whitelist()
	def set_total(self):
		self.total_accumulate_man_hours = self.calculating_total_weight("non_st_man_hours","accumulate_man_hours")
     
	@frappe.whitelist()
	def set_accidental(self):
		for d in self.get("non_st_man_hours",filters = {"details":'Accidental'}):
			for a in self.get("accidental_time_details",filters = {"accidental_time_reason_type":'Design Technical Trouble'}) :
				if (d.accidental_loss_details == "Design Technical Trouble"):
					d.todays_man_hours = a.accidental_timemin
     
			for b in self.get("accidental_time_details",filters = {"accidental_time_reason_type":'Manufacturing factor, other'}) :
					if (d.accidental_loss_details == "Manufacturing factor, other"):
						d.todays_man_hours = b.accidental_timemin
		
			for e in self.get("accidental_time_details",filters = {"accidental_time_reason_type":'Parts Shortage, Quality Defective'}) :
				if (d.accidental_loss_details == "Parts Shortage, Quality Defective"):
					d.todays_man_hours = e.accidental_timemin
    
	# @frappe.whitelist()
	# def set_item(self):
	# 	content_list = ["Regular","Irregular"]
	# 	for k in content_list:
	# 		self.append("production_man_hours",{"item":k})
   
	# 	item_list = ["Normal working Time","Over Time"]
	# 	for m in item_list :
	# 		self.append("man_hours",{"item" :m})
   
		# for m in self.get("production_man_hours"):
		# 	if (m.item == "Regular"):
		# 		m.today = self.total_manhour_st
   
	@frappe.whitelist()
	def set_total_kttime_min(self):
		# frappe.msgprint('HI........!')
		self.total_kt_timemin = self.calculating_total_weight("st_table","ktmin")
		
  
	@frappe.whitelist()
	def calculating_total_weight(self, child_table, total_field):
		casting_details = self.get(child_table)
		total_pouring_weight = 0
		if isinstance(casting_details, list):
			for i in casting_details:
				field_data = i.get(total_field)
				if field_data:
					total_pouring_weight += float(field_data)
		return total_pouring_weight
	# def calculating_total_weight(self, child_table, total_field):
	# 	casting_details = self.get(child_table)

	# # Ensure casting_details is iterable
	# 	if not isinstance(casting_details, (list, tuple, set)):
	# 		casting_details = [casting_details]

	# 	total_pouring_weight = 0

	# 	for i in casting_details:
	# 		# Check if total_field exists in the item
	# 		if isinstance(i, dict) and total_field in i:
	# 			field_data = i.get(total_field)
	# 			if field_data:
	# 				total_pouring_weight += float(field_data)

	# 	return total_pouring_weight

	# def calculating_total_weight(self,child_table ,total_field):
	# 	casting_details = self.get(child_table)
	# 	total_pouring_weight = 0
	# 	for i in casting_details:
	# 		field_data = i.get(total_field)
	# 		if field_data:
	# 			total_pouring_weight = total_pouring_weight + float(field_data)
	# 	return total_pouring_weight



	

 
	@frappe.whitelist()
	def fetch_kt(self):
		for s in self.get("st_table"):
				self.append("regular_production_man_hour",{
							"model_code":s.model_code,
							"model_name":s.model_name,
							"ktmin":s.ktmin,
							"stmin":s.mest
							}
						)

	@frappe.whitelist()
	def set_non_effective_timemin(self):
		self.total_non_effective_time = self.calculating_total_weight("non_effective_time_detail","non_effective_timemin")
	
	@frappe.whitelist()
	def set_accidental_timemin(self):
			self.total_accidental_timemin = self.calculating_total_weight("accidental_time_details","accidental_timemin")
   
	@frappe.whitelist()
	def set_model_time(self):
		self.model_time = self.calculating_total_weight("model_change_over_time_details","time_min")
   
		for st in self.get("st_loss_analysis",filters = {"details":'Model changeover'}):
			st.todays_man_hours = self.model_time
			
   
	@frappe.whitelist()
	def set_model_man_hour(self):
			self.model_man_hour = self.calculating_total_weight("model_change_over_time_details","man_hourmin")
   
	@frappe.whitelist()
	def set_production_sub_totals(self):
			self.production_sub_total = self.calculating_total_weight("production_man_hours","today")
	
	@frappe.whitelist()
	def set_accumulate(self):
			self.accumulate_sub_total = self.calculating_total_weight("production_man_hours","accumulate")
   
	@frappe.whitelist()
	def today_working_time(self):
		tot = self.normal_total * self.normal_working_hours
		for i in self.get("man_hours"):
			if (i.item == "Normal working Time"):
				i.today = tot
     
		for l in self.get("production_manpower",filters = {"particulars":'Absence M/P'}):
			absence_total = l.total
			man_hour = self.man__sub_total + absence_total * self.normal_working_hours

		for a in self.get("other_man_hour_details",filters = {"item":'Total Man-hour'}) :
			a.today = man_hour
			
			if a.today != 0 :
				for st in self.get("st_loss_analysis") :
					st.todays_ratio = st.todays_man_hours/a.today
				self.st_loss_ratio = self.st_loss_man_hour/a.today
	
				for pa in self.get("production_analysis",filters = {"item":'Factory Efficiency'}):
					pa.today = self.production_sub_total/a.today
     
   
	@frappe.whitelist()
	def today_over_time_cal(self):
		effective_man = 0.0
		minus_absence = 0.0
		for p in self.get("production_manpower",filters = {"particulars":'Over Time M/P'}):
			over_total = p.total
			today_over_time = over_total * self.over_time_working_hours
			for q in self.get("man_hours"):
				if (q.item == "Over Time"):
					q.today = today_over_time
	
		self.man__sub_total = self.calculating_total_weight("man_hours","today")
  
		effective_man = self.man__sub_total - self.total_non_st_man_hours
  
		for k in self.get("non_st_man_hours",filters = {"details":'Absence'}):
			minus_absence = self.normal_working_hours * self.get("production_manpower")[1].total
			
		for m in self.get("other_man_hour_details",filters = {"item":'Effective Man-hour'}) :
			m.today = effective_man - minus_absence
   
			for pe in self.get("production_analysis",filters = {"item":'Production efficiency'}):
					pe.today = self.production_sub_total/m.today
				
		for trans in self.get("st_loss_analysis",filters = {"details":'Transportation'}) :
			trans.todays_man_hours = self.normal_transportation * (self.normal_working_hours + self.over_time_working_hours)

		for trans in self.get("st_loss_analysis",filters = {"details":'Process Quality'}) :
			trans.todays_man_hours = self.normal_repair * (self.normal_working_hours + self.over_time_working_hours)

		for trans in self.get("st_loss_analysis",filters = {"details":'Process Control'}) :
			trans.todays_man_hours = (self.normal_supervisor + self.normal_repair) * (self.normal_working_hours + self.over_time_working_hours)
			
			# self.st_loss_man_hour = self.calculating_total_weight("st_loss_man_hour","todays_man_hours")
		
		# for t in self.get("st_loss_analysis",filters = {"details":'Assembly Allowance'}) :
		# 	for o in self.get("other_man_hour_details",filters = {"item":'Effective Man-hour'}):
		# 		for k in self.get("other_man_hour_details",filters = {"item":'KT Man-hour'}):
		# 			# t.todays_man_hours = (o.today - k.today - trans.todays_man_hours)
				
			self.st_loss_man_hour = self.calculating_total_weight("st_loss_analysis","todays_man_hours")
					
	@frappe.whitelist()
	def set_accumulate_man(self):
			self.man_accumulate_sub_total = self.calculating_total_weight("man_hours","accumulate")
   
	@frappe.whitelist()
	def st_accumulate(self):
		self.accumulate_st_loss_man = self.calculating_total_weight("st_loss_analysis","accumulate_man_hours_st")

		for ok in self.get("st_loss_analysis") :
			for om in self.get("other_man_hour_details",filters = {"item":'Total Man-hour'}) :
				ok.accumulate__ratio = ok.accumulate_man_hours_st/om.today
			
		self.accumulate_st_loss_ratio = self.calculating_total_weight("st_loss_analysis","accumulate__ratio")
  
	@frappe.whitelist()
	def set_ratio(self):
		for ratio in self.get("production_analysis",filters = {"item":'Go through ratio'}):
			for line in self.get("production_analysis",filters = {"item":'Line Drop Qty'}):
				ratio.today = (self.total_production_qty - line.today)/(self.total_production_qty)
    
			for pqty in self.get("production_analysis",filters = {"item":'Production Qty'}):
				ratio.accumulate = pqty.accumulate - line.accumulate
	@frappe.whitelist()
	def ac_ratio(self):
		for on in self.get("other_man_hour_details",filters = {"item":'Total Man-hour'}) :
			for fac in self.get("production_analysis",filters = {"item":'Factory Efficiency'}):
				fac.accumulate = on.accumulate_sub_total/on.accumulation
    
		for emh in self.get("other_man_hour_details",filters = {"item":'Effective Man-hour'}) :
			for pe in self.get("production_analysis",filters = {"item":'Production efficiency'}):
				pe.accumulate = self.accumulate_sub_total/emh.accumulation
				
	@frappe.whitelist()
	def cal_accumulate(self):
		for cal in self.get("production_manpower",filters = {"particulars" : 'Employee M/P'}):
			for at in self.get("production_analysis",filters = {"item":'Attendance ratio'}):
				at.accumulate = self.normal_accumulate/cal.accumulate
