import frappe
import datetime
import pymssql
# import pyodbc
from frappe.utils import now_datetime
import json
from frappe.utils import now_datetime
from datetime import datetime
# @frappe.whitelist()
# def append_item(self):
#     frappe.throw(str(self))
#     item_list=frappe.get_list("Item",filters={"qr_code_data":self.consumable_item},fields=['item_code','item_name',"stock_uom"])
#     for item in item_list:
#         self.append(
#             "items", {
#                 "item_code":item.item_code,
#                 "item_name":item.item_name,
#                 "qty":1,
#                 "stage":self.stage,
#                 "uom":item.stock_uom
#             }
#         )

# @frappe.whitelist()
# def insert_result_todb(self,row_index):
#         self = json.loads(self)
#         row_index = int(row_index)
#     # if(self.counter==7):
#         # frappe.throw(str(self.get("time_logs")[int(row_index)-1]))
#         server = '103.75.60.120'  
#         user = 'sa'  
#         password = 'Admin@123$'
#         database = 'MerlinNBIoT'  # Corrected database name

#         # Connect to SQL Server
#         try:
#             conn = pymssql.connect(server, user, password, database)
#             cursor = conn.cursor()
            
#             date=str(self.get("time_logs")[row_index-1].from_time)
#             date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
#             date = str(date.strftime("%Y-%m-%d %H:%M:%S"))
#             operatorname=self.get("time_logs")[row_index-1].modified_by
#             barcode=self.get("time_logs")[row_index-1].scan_qr
#             testresult= 0
#             testresulttext=self.get("time_logs")[row_index-1].product_type
#             testtime=str(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#             parentname=self.get("time_logs")[row_index-1].parent
            
#             if testresulttext == "Accept":
#                 testresult = 1
#                 testresulttext="Pass"
#             else:
#                 testresult = 0
#                 testresulttext="Fail"

#             # Check if qr_code exists
#             cursor.execute("SELECT COUNT(*) FROM Merlin_NBIoT_ICT_units WHERE Barcode = %s", (barcode))
#             count = cursor.fetchone()[0]
#             if count > 0:
#                 # If qr_code exists, check if product_type needs to be updated
#                 cursor.execute("SELECT COUNT(*) FROM Merlin_NBIoT_ICT_units WHERE TestResultText = %s AND Barcode = %s", (testresulttext, barcode))
#                 count_product_type = cursor.fetchone()[0]
                
#                 if count_product_type == 0:
#                     # If product_type does not match, update it
#                     cursor.execute("UPDATE Merlin_NBIoT_ICT_units SET TestResultText = %s, TestTime = %s, OperatorName = %s, TestResult = %s WHERE Barcode = %s", (testresulttext, testtime, operatorname, testresult, barcode))
#                     conn.commit()
#                 else:
#                     pass
#             else:
#                 # If qr_code does not exist, insert a new record
#                 cursor.execute("INSERT INTO Merlin_NBIoT_ICT_units (Date,OperatorName,Barcode,TestResult,TestResultText,TestTime,ParentName) VALUES (%d, %s,%s, %s,%s, %d,%s)", (date,operatorname,barcode,testresult,testresulttext,testtime,parentname))
#                 conn.commit()

#         except pymssql.Error as e:
#             print("Error connecting to SQL Server:", e)

#         finally:
#             if 'conn' in locals():
#                 conn.close()
                
@frappe.whitelist()
def pcb(job_card_doc):
    job_card_doc = json.loads(job_card_doc)  # Parse the incoming document JSON
    response = {}
    
    if job_card_doc.get("counter") == 1:
        # Get the related Work Order document
        work_order_doc = frappe.get_doc('Work Order', job_card_doc.get("work_order"))
        
        response.update({
            "shift_incharge": work_order_doc.shift_incharge,
            "incharge_name": work_order_doc.incharge_name,
            "shift": work_order_doc.shift,
            "pcb_details": work_order_doc.get("pcb_details")
        })
    # else:
    #     frappe.msgprint("Conditions not met for PCB processing.")
    
    # frappe.throw(str(response))
    if job_card_doc.get("counter") > 1:
        prev_job_card_list = []
        prev_job_card = frappe.get_doc("Job Card",{"counter":job_card_doc.get("counter")-1,"work_order":job_card_doc.get("work_order")})

        for i in prev_job_card.get("time_logs",{"custom_pcb_test_results":"pass","custom_testing_done":0}):
            prev_job_card_list.append(i)
        
        
        return prev_job_card_list   
    
    return response
@frappe.whitelist()
def get_ict_data(qr):
    ict_log_info = frappe.get_all(
        'ICT Log Info',  # Doctype name
        filters={'qr_code': qr},  # Filter by qr_code
        fields=['qr_code', 'date_time', 'result'],  # Fields to retrieve
        order_by='date_time desc',  # Sort by date_time in descending order (latest first)
        limit_page_length=1  # Only get the latest record
    )

    if ict_log_info:
        # Return the first (latest) record
        return ict_log_info[0]  # ict_log_info[0] is the latest record
    else:
        # Return None or an appropriate message if no record is found
        return None


@frappe.whitelist()
def update_testing_status(job_card_doc):
    """
        Change the flag of the custom_testing_done to true for both ['pass', 'fail'] results
    """
    job_card_doc = json.loads(job_card_doc)
    if job_card_doc.get("counter") > 1:
        prev_job_card = frappe.get_doc("Job Card",{"counter":job_card_doc.get("counter")-1,"work_order":job_card_doc.get("work_order")})
        for j in job_card_doc.get("time_logs"):
            for i in prev_job_card.get("time_logs",{"custom_pcb_test_results":["in",["pass","fail"]],"pcb_qr_code":j.get("pcb_qr_code")}):
                    i.custom_testing_done = 1
        prev_job_card.save()

@frappe.whitelist()
def check_operation_lock_time(doc):
    """
        Check the job started and completion time difference
    """
    doc = json.loads(doc)
    if doc.get("counter") > 1:
        submitted_date_time = frappe.get_value("Job Card",{"work_order":doc.get("work_order"),"docstatus":1,"counter":doc.get("counter")-1},"modified")
        operation = frappe.get_value("Job Card",{"work_order":doc.get("work_order"),"docstatus":1,"counter":doc.get("counter")-1},"operation")
        operation_lock_time = frappe.get_value("Operation",operation,"custom_operation_lock_time")
        if not submitted_date_time:
            frappe.throw(f"Please Complete previous operation")
        # frappe.throw(f"{submitted_date_time} {operation_lock_time} {operation}")
        if operation_lock_time:
            # submitted_date_time = datetime.strptime(submitted_date_time, "%Y-%m-%d %H:%M:%S")
            current_date_time = now_datetime() 
            time_diff = (current_date_time - submitted_date_time).total_seconds() / 60  # in minutes
            
            if time_diff < operation_lock_time:
                frappe.throw(f"Cannot submit document. Lock time of {operation_lock_time} minutes has not completed Yet.")
        else:
            frappe.throw(f"Operation Lock Time is not Set for {operation}") 



@frappe.whitelist()
def get_db_data(job_card_doc,db_name):
    job_card_doc = json.loads(job_card_doc)
    server = frappe.get_value("Renu Settings",{"company":"Renu Electronics Pvt. Ltd"},"server_address")
    user = frappe.get_value("Renu Settings",{"company":"Renu Electronics Pvt. Ltd"},"user")
    password = frappe.get_value("Renu Settings",{"company":"Renu Electronics Pvt. Ltd"},"password")
    database = frappe.get_value("Renu Settings",{"company":"Renu Electronics Pvt. Ltd"},"database")

    # try:
    conn = pymssql.connect(server, user, password, database)
    cursor = conn.cursor()
    results = []
        # frappe.throw(str(job_card_doc.get("time_logs")))
    for j in job_card_doc.get("time_logs"):
        query = str(f"SELECT TOP(1) * FROM {db_name} where Barcode = '{j['pcb_qr_code']}' Order by Date DESC")
        cursor.execute(query)
        data = cursor.fetchall()
        if data:
            results.append(data[0])
        else:
            results.append(None)
    if 'conn' in locals():
        conn.close()
    return results


# @frappe.whitelist()
# def append_data_qrend(doc, pcb_code):
#     doc = frappe.get_doc(json.loads(doc))
#     if pcb_code:
#         flag = 0
#         msg = 0
#         # Get time_logs as a list of child table records from the passed document
#         time_logs = doc.get("time_logs")  # Get time_logs from the passed doc
#         for index in time_logs:
#             if str(pcb_code) == str(index.pcb_qr_code):
#                 msg += 1
#                 flag += 1
#                 if not index.scan_qr or not index.to_time:
#                     # Set values using frappe.db.set_value if fields are not populated
#                     result = datetime.now()
#                     frappe.db.set_value('Job Card Time Log', index.name, "scan_qr", pcb_code)
#                     frappe.db.set_value('Job Card Time Log', index.name, "to_time", result)
                    
#                     # Call subprocess data method (if applicable)
#                     get_subprocess_data(doc,pcb_code)  # Assuming this is a method you have in your DocType
                    
#                     # Swap values between the first and current index using frappe.db.set_value
#                     for field in ["scan_qr", "pcb_qr_code", "to_time", "custom_pcb_test_results", "user", 
#                                   "time_in_mins", "completed_qty", "scan_qr_start", "description", 
#                                   "from_time", "pre_stage_time", "time_diff", "product_type", "honeywell_qr"]:
#                         # Swap between first row and current row
#                         first_row_name = time_logs[0].name
#                         current_row_name = time_logs[index.idx-1].name
                        
#                         # Get field value from first row
#                         field_value = frappe.get_value('Job Card Time Log', first_row_name, field)
                        
#                         # Set field value in the current row
#                         frappe.db.set_value('Job Card Time Log', current_row_name, field, field_value)
                        
#                         # Get field value from current row
#                         field_value = frappe.get_value('Job Card Time Log', current_row_name, field)
                        
#                         # Set field value in the first row
#                         frappe.db.set_value('Job Card Time Log', first_row_name, field, field_value)
#                 else:
#                     frappe.throw("This PCB Already Exist")
#                 if msg == 0:
#                     frappe.throw("This PCB QR not Available")

#         if flag == 0:
#             frappe.throw("This PCB QR not Available")
    
#     # Reset the pcb_code field in the parent Job Card document
#     frappe.db.set_value('Job Card', doc.name, 'pcb_code', None)

# @frappe.whitelist()
# def get_prev_stage_data(doc):
#     doc = frappe.get_doc(json.loads(doc))
#     if doc.counter != '1':
#         # Fetching the previous Job Card based on the counter value
#         job_card = frappe.get_all('Job Card', filters={
#             "work_order": doc.work_order,
#             "counter": ['<', doc.counter],
#             "name": ("!=", doc.name)
#         }, order_by="counter desc", fields=["name", "counter"], limit=1)

#         if job_card:
#             # Fetching the time logs from the previous Job Card where product_type is 'Accept'
#             child_doc = frappe.get_all('Job Card Time Log', filters={
#                 "parent": job_card[0].name,
#                 "product_type": "Accept"
#             }, fields=["from_time", "to_time", "pcb_qr_code", "product_type", "pre_stage_time"])
#             # frappe.throw(f"{child_doc}")

#             if not child_doc:
#                 if len(doc.time_logs) != 0:
#                     for row in child_doc:
#                         if row.pcb_qr_code and row.to_time:
#                             count = 0
#                             starting_time = None
#                             if doc.counter == '2':
#                                 starting_time = row.from_time
#                             else:
#                                 starting_time = row.pre_stage_time
                            
#                             # Check if the PCB QR code already exists in the time logs
#                             for i in doc.get("time_logs"):
#                                 if i.pcb_qr_code == row.pcb_qr_code:
#                                     count = 1
#                                     break
                            
#                             if count == 0:
#                                 # If not present, append the new row in time logs
#                                 doc.append("time_logs", {
#                                     "pre_stage_time": starting_time,
#                                     "pre_stage_qr": row.pcb_qr_code,
#                                     "pcb_qr_code": row.pcb_qr_code,
#                                     "honeywell_qr": row.honeywell_qr,
#                                     "completed_qty": '1',
#                                     "from_time": row.to_time
#                                 })
#                                 # Save the changes to the database
#                                 doc.save()
# @frappe.whitelist()
# def append_to_subprocess_details(doc):
#     # Get the existing operations for comparison
#     doc = frappe.get_doc(json.loads(doc))
#     # frappe.throw(str(doc))
#     existing_opr = set((i.qr_id, i.sub_operation) for i in doc.get("on_work_use"))
    
#     # Loop through each subprocess in the document
#     for i in doc.get("sub_operations"):
#         # Check if the combination of pcb_code and sub_operation is already in the existing operations
#         if (doc.pcb_code, i.sub_operation) not in existing_opr:
#             # If not, append it to the 'on_work_use' table
#             doc.append("on_work_use", {
#                 "qr_id": doc.pcb_code, 
#                 "sub_operation": i.sub_operation
#             })
            
#     # Save the document after modification
#     doc.save()
